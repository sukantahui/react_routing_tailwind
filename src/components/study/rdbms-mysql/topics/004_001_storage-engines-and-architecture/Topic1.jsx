import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Comparing Storage Engines: InnoDB, MyISAM, MEMORY, CSV, ARCHIVE, BLACKHOLE
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive storage engine comparison workbench: evaluating transactions, locking mechanisms, crash recovery algorithms, in-memory volatile storage, and workload-specific engine selection criteria in MySQL.
 */
const Topic1 = () => {
  // Interactive Engine Selection State
  const [selectedEngineProfile, setSelectedEngineProfile] = useState("profile_innodb");

  const engineProfiles = {
    profile_innodb: {
      profileName: "InnoDB (Default OLTP)",
      title: "1. InnoDB: Enterprise Transactional Storage Engine",
      badge: "ACID & Row Locks",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛡️ INNODB: TRANSACTIONAL ORDER PROCESSING WITH MVCC:
CREATE TABLE customer_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_total_inr DECIMAL(10,2) CHECK (order_total_inr &ge; 0),
    order_status ENUM('Pending', 'Paid', 'Shipped') DEFAULT 'Pending'
) ENGINE=InnoDB;

-- Transaction with atomic rollback guarantee:
START TRANSACTION;
UPDATE customer_orders SET order_status = 'Paid' WHERE order_id = 1;
-- If server crashes right now, WAL Redo Log ensures 100% crash recovery!
COMMIT;`,
      metricsTable: [
        { feature: "ACID Transactions", support: "Full Support (COMMIT, ROLLBACK, SAVEPOINT)", rating: "100% ACID ✅" },
        { feature: "Locking Granularity", support: "Row-Level Locking + MVCC (Non-blocking reads)", rating: "High Concurrency ⚡" },
        { feature: "Crash Recovery", support: "Automatic Write-Ahead Redo Log (WAL)", rating: "Self-Healing 🛡️" },
        { feature: "Physical Layout", support: "Clustered B+ Tree on Primary Key (.ibd)", rating: "16KB Pages 📁" }
      ],
      explanation:
        "InnoDB is the universal standard engine for 99% of database tables. It combines row-level locking, non-blocking MVCC reads, foreign keys, and automatic crash recovery via Write-Ahead Redo Logs."
    },
    profile_myisam: {
      profileName: "MyISAM (Legacy)",
      title: "2. MyISAM: Non-Transactional Legacy Flat-File Storage",
      badge: "Legacy Table Locks",
      badgeColor: "rose",
      sqlSnippet: `-- ⚠️ MYISAM: TABLE-LEVEL LOCKING & MANUAL REPAIR:
CREATE TABLE legacy_articles (
    article_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    body_text TEXT
) ENGINE=MyISAM;

-- ❌ CONCURRENCY BOTTLENECK:
-- Any write query locks the ENTIRE table, blocking all concurrent readers!
-- Any server crash requires manual recovery:
REPAIR TABLE legacy_articles;

-- Converting legacy table to modern InnoDB:
ALTER TABLE legacy_articles ENGINE = InnoDB;`,
      metricsTable: [
        { feature: "ACID Transactions", support: "No Support (Cannot ROLLBACK)", rating: "Non-ACID ❌" },
        { feature: "Locking Granularity", support: "Table-Level Locks (Bottleneck on writes)", rating: "Low Concurrency ⚠️" },
        { feature: "Crash Recovery", support: "Requires manual REPAIR TABLE / myisamchk", rating: "Manual Repair 🛠️" },
        { feature: "Physical Layout", support: "Separate .MYD (data) and .MYI (index) files", rating: "Flat File Heap 📄" }
      ],
      explanation:
        "MyISAM is a legacy engine lacking transactions, foreign keys, and automatic crash recovery. Its table-level locking makes it a severe concurrency bottleneck under concurrent write traffic."
    },
    profile_memory: {
      profileName: "MEMORY / HEAP",
      title: "3. MEMORY (HEAP): Volatile In-Memory Microsecond Caching",
      badge: "100% In-RAM",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ MEMORY: VOLATILE IN-RAM HASH LOOKUP TABLE:
CREATE TABLE user_active_tokens (
    token_hash VARCHAR(64) PRIMARY KEY,
    user_id INT NOT NULL,
    expires_at TIMESTAMP NOT NULL
) ENGINE=MEMORY;

-- Uses O(1) Hash Index for instant exact-match token lookups:
SELECT user_id FROM user_active_tokens WHERE token_hash = 'a9b8c7...';

-- ⚠️ VOLATILE NATURE:
-- If the MySQL daemon restarts, all rows disappear instantly (RAM cleared),
-- but the table schema structure is preserved in the data dictionary!`,
      metricsTable: [
        { feature: "Data Location", support: "100% Resident in Volatile RAM", rating: "Microsecond Latency 🚀" },
        { feature: "Index Algorithm", support: "HASH Index (O(1) exact lookups) & B-Tree", rating: "Hash + B-Tree ⚡" },
        { feature: "Persistence", support: "Data lost on server restart (Empty on boot)", rating: "Volatile ⚠️" },
        { feature: "Size Ceiling", support: "Capped by max_heap_table_size variable", rating: "RAM Bounded 💾" }
      ],
      explanation:
        "The MEMORY engine stores rows strictly in RAM using fixed-width format and hash indexes. It delivers microsecond lookup speeds for transient session tokens, but all data is lost upon server restart."
    },
    profile_archive_csv: {
      profileName: "ARCHIVE & CSV",
      title: "4. ARCHIVE & CSV: Compressed Logs & Plaintext Interoperability",
      badge: "Logs & CSV",
      badgeColor: "cyan",
      sqlSnippet: `-- 🗜️ ARCHIVE: ZLIB COMPRESSED APPEND-ONLY LOGS:
CREATE TABLE network_firewall_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    event_message TEXT NOT NULL,
    logged_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=ARCHIVE;
-- Supports INSERT & SELECT; rejects UPDATE and DELETE!

-- 📄 CSV: PLAINTEXT COMMA-SEPARATED SPREADSHEET FILES:
CREATE TABLE external_product_export (
    sku VARCHAR(30) NOT NULL,
    price_inr DECIMAL(10,2) NOT NULL,
    qty INT NOT NULL
) ENGINE=CSV;
-- Backed by external_product_export.csv directly on the filesystem!`,
      metricsTable: [
        { feature: "ARCHIVE Purpose", support: "70-80% zlib compressed append-only log ingestion", rating: "High Compression 🗜️" },
        { feature: "ARCHIVE Mutability", support: "Supports INSERT & SELECT; NO UPDATE / DELETE", rating: "Append-Only 🔒" },
        { feature: "CSV Purpose", support: "Plaintext .csv on disk readable by Python/Excel", rating: "File Interop 📄" },
        { feature: "CSV Constraints", support: "Requires NOT NULL on all columns, no indexes", rating: "Full Scan Only 🔍" }
      ],
      explanation:
        "ARCHIVE provides high-ratio zlib compression for immutable audit trails and telemetry. CSV stores standard comma-separated text files on disk for seamless export to external analytics pipelines."
    },
    profile_blackhole: {
      profileName: "BLACKHOLE",
      title: "5. BLACKHOLE: Replication Relay & Filtering Router",
      badge: "Zero Disk Storage",
      badgeColor: "indigo",
      sqlSnippet: `-- 🕳️ BLACKHOLE: THE '/dev/null' REPLICATION ENGINE:
CREATE TABLE replication_relay_node (
    event_id INT AUTO_INCREMENT PRIMARY KEY,
    payload TEXT NOT NULL
) ENGINE=BLACKHOLE;

-- Writes are immediately discarded (0 bytes stored on disk):
INSERT INTO replication_relay_node (payload) VALUES ('Event Log Payload');
SELECT * FROM replication_relay_node; -- Output: Empty set (0 rows)!

-- PURPOSE:
-- The write is recorded in the Binary Log!
-- Used on intermediate replication relay nodes to filter/route events
-- without consuming local SSD disk space!`,
      metricsTable: [
        { feature: "Disk Storage", support: "Discards all row data immediately (/dev/null)", rating: "0 Bytes on Disk 🕳️" },
        { feature: "Binary Logging", support: "Records all write events to Binary Log", rating: "Binlog Active 📝" },
        { feature: "Primary Use Case", support: "Replication routing, filtering, and audit hooks", rating: "Replication Node 🌐" },
        { feature: "Query Behavior", support: "SELECT statements always return 0 rows", rating: "Ephemeral 💨" }
      ],
      explanation:
        "BLACKHOLE acts as a `/dev/null` sink that discards data on disk while logging statements to the binary log, allowing DBAs to construct multi-tier replication relay architectures without disk space overhead."
    }
  };

  const navItems = [
    { id: "engine-overview", label: "1. Comparative Matrix" },
    { id: "physical-diagram", label: "2. Physical Storage Layout" },
    { id: "interactive-workbench", label: "3. Engine Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Engine Selection Checklist" },
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
            <span>Topic 1 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Storage Engine Matrix
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Comparing Storage Engines: InnoDB, MyISAM, MEMORY, CSV, ARCHIVE, BLACKHOLE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete MySQL storage engine landscape: compare ACID transactions, row vs table locking, crash recovery mechanisms, RAM-volatile memory tables, compressed log archives, and replication relay routers.
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
        {/* SECTION 1: Engine Overview Matrix */}
        <section id="engine-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Storage Engine Comparative Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              A comprehensive technical comparison across all major MySQL storage engines.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Storage Engine</th>
                  <th className="py-3 px-4">ACID Transactions</th>
                  <th className="py-3 px-4">Locking Level</th>
                  <th className="py-3 px-4">Crash Recovery</th>
                  <th className="py-3 px-4">Primary Workload</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">InnoDB (Default)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">YES (Full ACID)</td>
                  <td className="py-3 px-4 text-cyan-400">Row-Level (MVCC)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Auto Redo Log (WAL)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Enterprise OLTP, Banking, E-Commerce</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">MyISAM</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO</td>
                  <td className="py-3 px-4 text-amber-400">Table-Level</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Manual REPAIR TABLE</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Legacy read-heavy applications</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">MEMORY (HEAP)</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO</td>
                  <td className="py-3 px-4 text-amber-400">Table-Level</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">None (RAM Volatile)</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Ephemeral cache, session lookups</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-sans">ARCHIVE</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO</td>
                  <td className="py-3 px-4 text-cyan-400">Row-Level (Insert)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Append-Only Check</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Compressed log &amp; audit ingestion</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-indigo-400 font-sans">BLACKHOLE</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">NO</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">N/A (Discards data)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Binlog Only</td>
                  <td className="py-3 px-4 text-slate-400 font-sans">Replication router &amp; relay nodes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Physical Storage Layout */}
        <section id="physical-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Physical Storage Architecture Comparison
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing InnoDB's Clustered B+ Tree vs MyISAM's Flat Heap File vs MEMORY's RAM Hash Table.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 1.1: Physical On-Disk &amp; In-Memory Layouts
              </h3>
              <span className="text-xs text-slate-400 font-mono">Storage Structures</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrEngCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: InnoDB Clustered Index */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">1. INNODB (Clustered Index)</text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />
                <rect x="40" y="105" width="240" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="125" fill="#a7f3d0" fontSize="10" fontWeight="bold">Root B+ Tree Page (16KB)</text>
                <text x="50" y="138" fill="#94a3b8" fontSize="9">Key Ranges: [1-100] [101-200]</text>

                <rect x="40" y="160" width="240" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="50" y="180" fill="#a7f3d0" fontSize="10" fontWeight="bold">Internal Index Node Pages</text>

                <rect x="40" y="215" width="240" height="55" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                <text x="50" y="235" fill="#34d399" fontSize="10" fontWeight="bold">Leaf Pages (Data Rows Stored Here!)</text>
                <text x="50" y="250" fill="#bae6fd" fontSize="9">Row data physically embedded in leaf nodes</text>

                {/* Box 2: MyISAM Non-Clustered */}
                <rect x="335" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                <text x="475" y="70" fill="#fb7185" fontSize="12" fontWeight="bold" textAnchor="middle">2. MYISAM (Separate Files)</text>
                <line x1="335" y1="85" x2="615" y2="85" stroke="#334155" />
                
                <rect x="355" y="105" width="240" height="60" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="365" y="125" fill="#fca5a5" fontSize="10" fontWeight="bold">.MYI Index File (B-Tree)</text>
                <text x="365" y="142" fill="#94a3b8" fontSize="9">Stores Key &rarr; Byte Offset Pointer</text>

                <path d="M 475 165 L 475 205" fill="none" stroke="#f43f5e" strokeWidth="2" markerEnd="url(#arrEngCyan)" />

                <rect x="355" y="215" width="240" height="55" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="365" y="235" fill="#fca5a5" fontSize="10" fontWeight="bold">.MYD Data File (Flat Heap)</text>
                <text x="365" y="250" fill="#94a3b8" fontSize="9">Unordered flat row data heap</text>

                {/* Box 3: MEMORY Engine */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="790" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">3. MEMORY (RAM Hash Table)</text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />
                
                <rect x="670" y="105" width="240" height="65" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="680" y="125" fill="#fde68a" fontSize="10" fontWeight="bold">In-Memory Hash Buckets (O(1))</text>
                <text x="680" y="142" fill="#94a3b8" fontSize="9">Hash(Key) &rarr; Memory Pointer</text>

                <rect x="670" y="190" width="240" height="80" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="680" y="210" fill="#fde68a" fontSize="10" fontWeight="bold">Fixed-Width Row Arrays in RAM</text>
                <text x="680" y="228" fill="#94a3b8" fontSize="9">Zero Disk I/O (Fastest Read/Write)</text>
                <text x="680" y="246" fill="#f87171" fontSize="9">⚠️ Cleared on Server Restart!</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Interactive Engine Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Storage Engine Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select an engine profile to inspect DDL table creation, transactional capabilities, and physical metrics.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(engineProfiles).map((key) => {
              const prof = engineProfiles[key];
              const isSelected = selectedEngineProfile === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedEngineProfile(key)}
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
                      prof.badgeColor === "emerald" && "bg-emerald-400",
                      prof.badgeColor === "rose" && "bg-rose-400",
                      prof.badgeColor === "amber" && "bg-amber-400",
                      prof.badgeColor === "cyan" && "bg-cyan-400",
                      prof.badgeColor === "indigo" && "bg-indigo-400"
                    )}
                  />
                  <span>{prof.profileName}</span>
                </button>
              );
            })}
          </div>

          {/* Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {engineProfiles[selectedEngineProfile].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  engineProfiles[selectedEngineProfile].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  engineProfiles[selectedEngineProfile].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800",
                  engineProfiles[selectedEngineProfile].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  engineProfiles[selectedEngineProfile].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  engineProfiles[selectedEngineProfile].badgeColor === "indigo" &&
                    "bg-indigo-950 text-indigo-300 border border-indigo-800"
                )}
              >
                {engineProfiles[selectedEngineProfile].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Storage Engine Demonstration Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {engineProfiles[selectedEngineProfile].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Technical Capabilities &amp; Storage Characteristics:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Architecture Feature</th>
                      <th className="py-2.5 px-4">Support Details</th>
                      <th className="py-2.5 px-4">Operational Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {engineProfiles[selectedEngineProfile].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.feature}</td>
                        <td className="py-3 px-4 text-slate-300 font-sans">{row.support}</td>
                        <td className="py-3 px-4 text-emerald-400">{row.rating}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Explanation Box */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
                Architectural Assessment:
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {engineProfiles[selectedEngineProfile].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Storage Engine Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Workload-specific engine deployments in Barrackpore and Kolkata enterprises.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Migration from MyISAM */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Table Lock Timeouts in Barrackpore E-Commerce
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  MyISAM &rarr; InnoDB Migration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a legacy retail catalog using MyISAM suffered from severe connection timeouts during Diwali sales because every inventory update locked the entire table. Converting all 12 tables to InnoDB (`ALTER TABLE tbl ENGINE=InnoDB`) enabled row-level locking, instantly increasing concurrent checkout throughput by 850%.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Telemetry Archival */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Archiving 50 Million Server Logs in Kolkata Data Center
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  78% Disk Savings
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, storing 50 million raw IoT and server access logs in standard InnoDB tables consumed over 120 GB of SSD space. Moving the historical logs to `ENGINE=ARCHIVE` compressed the dataset to just 26 GB using native zlib compression, saving significant storage infrastructure costs while preserving fast sequential query access.
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
              Avoid dangerous storage engine selection mistakes in enterprise systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Storing Critical Business Data in MEMORY
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Placing non-reproducible records (like user accounts or billing invoices) in `MEMORY` tables causes permanent data loss whenever the server restarts or reboots.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use MEMORY exclusively for ephemeral caches and session state.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Expecting Transactions in MyISAM
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing `START TRANSACTION ... ROLLBACK` on MyISAM tables leaves changes permanently applied because MyISAM ignores transaction commands.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always use InnoDB for transactional applications.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Default to InnoDB for 99% of Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                InnoDB is the battle-tested, crash-safe engine that provides the optimal balance of concurrency, reliability, and performance.
              </p>
              <div className="text-xs text-slate-400">
                Only diverge to specialized engines for proven, specialized workloads.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage ARCHIVE for Compliance Logs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `ENGINE=ARCHIVE` for append-only audit tables (PCI-DSS/GDPR compliance logs) to gain 75%+ zlib disk compression.
              </p>
              <div className="text-xs text-slate-400">
                Drastically cuts storage costs for multi-terabyte log archives.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Engine Selection Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Storage Engine Selection Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Decision guide for selecting the optimal engine for any database entity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Workload Matching Guide
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">InnoDB</strong> = Core transactional data, financial ledgers, user accounts, orders.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">02.</span>
                  <span><strong className="text-amber-400">MEMORY</strong> = Ephemeral session tokens, high-traffic transient caches.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-400">ARCHIVE</strong> = Historical compliance audit logs, IoT sensor telemetry.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-indigo-400 font-bold font-mono">04.</span>
                  <span><strong className="text-indigo-400">BLACKHOLE</strong> = Replication filtering, relay nodes, multi-tier distribution.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe online engine conversion...”</span>
                  In MySQL 8.0, running `ALTER TABLE tbl ENGINE=InnoDB, ALGORITHM=INPLACE, LOCK=NONE;` converts legacy MyISAM tables online without locking users out!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about CSV engine for data exchange...”</span>
                  If you create a `CSV` table and drop a `data.csv` file directly into the MySQL data directory, the table is instantly populated without running an import script!
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
              Comprehensive reference questions covering MySQL Storage Engine comparison and architecture trade-offs.
            </p>
          </div>

          <FAQTemplate
            title="MySQL Storage Engines Comparison FAQs"
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
            title="Comparing Storage Engines: InnoDB, MyISAM, MEMORY, CSV, ARCHIVE, BLACKHOLE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="One of the greatest architectural strengths of MySQL is that you are never locked into a single physical storage model. You can run InnoDB for your transactional e-commerce core, MEMORY for ultra-fast transient session tokens, ARCHIVE for multi-gigabyte compliance audit trails, and CSV for effortless spreadsheet exports—all within the same database schema! As a database architect, knowing the strengths and limitations of each storage engine empowers you to build systems that achieve maximum performance, concurrency, and cost-efficiency!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
