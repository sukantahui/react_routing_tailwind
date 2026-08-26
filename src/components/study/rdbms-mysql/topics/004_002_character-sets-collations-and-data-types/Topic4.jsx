import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic4_files/topic4_questions";
import noteText from "./topic4_files/topic4_note.txt?raw";

/**
 * Topic4 – String Data Types Deep Dive: CHAR vs VARCHAR vs TEXT vs BLOB (Storage, Truncation, Limits)
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive string data types workbench: analyzing physical byte storage of CHAR vs VARCHAR, the 4-tier TEXT/BLOB capacity matrix, off-page overflow pointers, prefix indexing rules, and avoiding Error 1406 data truncation in MySQL.
 */
const Topic4 = () => {
  // Interactive String Types State
  const [selectedStringPhase, setSelectedStringPhase] = useState("phase1_char_vs_varchar");

  const stringPhases = {
    phase1_char_vs_varchar: {
      phaseNumber: "Phase 1: CHAR vs VARCHAR",
      title: "1. Storage Mechanics: CHAR(M) vs VARCHAR(M)",
      badge: "Storage Engine Layout",
      badgeColor: "emerald",
      sqlSnippet: `-- 📦 CHAR VS VARCHAR PHYSICAL STORAGE COMPARISON:
-- 1. CHAR(10) storing 'Kolkata':
--    - Stores 7 characters + 3 padding spaces = EXACTLY 10 Bytes allocated.
--    - Zero length-prefix overhead.
--    - Trailing spaces are stripped upon retrieval!

-- 2. VARCHAR(10) utf8mb4 storing 'Kolkata':
--    - Stores 7 characters ('Kolkata' = 7 bytes).
--    - Adds 2-byte length prefix (since 10 * 4 = 40 max bytes &le; 255 -&gt; 1-byte prefix!).
--    - Total on-disk = 1 byte prefix + 7 bytes = 8 Bytes!
--    - Trailing spaces are preserved!

CREATE TABLE code_examples (
    country_code CHAR(2) NOT NULL,            -- Fixed 2 bytes (Optimal! ⚡)
    user_city VARCHAR(50) NOT NULL            -- Variable (Saves space! 📦)
);`,
      metricsTable: [
        { type: "CHAR(M)", lengthBehavior: "Fixed (0 - 255 chars)", overhead: "0 bytes (pads spaces)", bestUse: "Country codes, MD5 hashes, UUIDs" },
        { type: "VARCHAR(M)", lengthBehavior: "Variable (0 - 65,535 B)", overhead: "1 or 2 bytes prefix", bestUse: "Names, emails, descriptions" },
        { type: "Trailing Spaces", lengthBehavior: "CHAR strips; VARCHAR keeps", overhead: "N/A", bestUse: "Preserves user-entered whitespace" },
        { type: "Update Fragmentation", lengthBehavior: "CHAR has 0 fragmentation", overhead: "Zero row shift", bestUse: "High-frequency updated fixed fields" }
      ],
      explanation:
        "`CHAR` allocates fixed space with space padding, ideal for fixed-length strings like country codes and hashes. `VARCHAR` allocates only the actual string length plus a 1-byte or 2-byte length prefix, saving disk space for variable-length text."
    },
    phase2_text_vs_blob: {
      phaseNumber: "Phase 2: TEXT vs BLOB",
      title: "2. The 4-Tier TEXT and BLOB Capacity Matrix",
      badge: "LOB Storage Matrix",
      badgeColor: "cyan",
      sqlSnippet: `-- 📚 THE 4-TIER TEXT AND BLOB STORAGE HIERARCHY:
-- 1. TINYTEXT / TINYBLOB   : Up to 255 Bytes (1-byte length prefix)
-- 2. TEXT / BLOB           : Up to 64 KB (65,535 Bytes, 2-byte prefix)
-- 3. MEDIUMTEXT / MEDIUMBLOB: Up to 16 MB (16,777,215 Bytes, 3-byte prefix)
-- 4. LONGTEXT / LONGBLOB   : Up to 4 GB (4,294,967,295 Bytes, 4-byte prefix)

-- KEY DIFFERENCE:
-- TEXT columns have Character Set & Collation (Case-Insensitive if _ci).
-- BLOB columns store raw Binary Bytes without encoding (Case-Sensitive byte order).

CREATE TABLE documents (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,
    article_body LONGTEXT CHARACTER SET utf8mb4, -- Human-readable text
    pdf_attachment LONGBLOB                       -- Raw binary PDF file
);`,
      metricsTable: [
        { lobType: "TINYTEXT / TINYBLOB", maxCapacity: "255 Bytes", prefixSize: "1 Byte", role: "Short summaries / icon binaries" },
        { lobType: "TEXT / BLOB", maxCapacity: "64 KB (65,535 B)", prefixSize: "2 Bytes", role: "Comments, reviews / thumbnails" },
        { lobType: "MEDIUMTEXT / MEDIUMBLOB", maxCapacity: "16 MB", prefixSize: "3 Bytes", role: "Articles, HTML pages / audio files" },
        { lobType: "LONGTEXT / LONGBLOB", maxCapacity: "4 GB", prefixSize: "4 Bytes", role: "Books, logs / high-res videos" }
      ],
      explanation:
        "`TEXT` and `BLOB` offer four tiered capacities from 255 bytes to 4 GB. `TEXT` supports character sets and linguistic collation sorting, while `BLOB` stores unencoded binary data (like images or encrypted payloads)."
    },
    phase3_off_page_indexing: {
      phaseNumber: "Phase 3: Off-Page Overflow",
      title: "3. Off-Page Overflow Storage & Prefix Indexing",
      badge: "InnoDB Internals",
      badgeColor: "amber",
      sqlSnippet: `-- 📄 OFF-PAGE OVERFLOW STORAGE IN INNODB DYNAMIC FORMAT:
-- When a row exceeds ~8KB (half a 16KB page), InnoDB offloads
-- wide TEXT and BLOB data to external 16KB Overflow Pages!
-- The B+ tree leaf page stores only a compact 20-byte pointer!

-- 🔍 PREFIX INDEXING REQUIREMENT:
-- Because TEXT/BLOB columns can be 4GB, you CANNOT index the full column!
-- You MUST specify an explicit prefix length (e.g. 100 characters):
CREATE TABLE blog_posts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    INDEX idx_content_prefix (content(100)) -- Indexes first 100 characters! ✅
);

-- ⚠️ NEVER write 'SELECT *' on tables with large TEXT columns!
-- Fetching off-page overflow pages causes heavy random disk I/O!`,
      metricsTable: [
        { feature: "B+ Tree Pointer", size: "20 Bytes in Leaf Page", role: "Points to external overflow page chain" },
        { feature: "Prefix Indexing", size: "INDEX (col(N))", role: "Limits index key size within 3072-byte max" },
        { feature: "Temp Table Impact", size: "Spills to Disk", role: "Queries sorting TEXT/BLOB cannot use MEMORY engine" },
        { feature: "Best Practice", size: "Explicit Column Selection", role: "Select only needed columns, avoiding SELECT *" }
      ],
      explanation:
        "InnoDB's DYNAMIC row format offloads wide `TEXT`/`BLOB` columns to external 16KB overflow pages, leaving a 20-byte pointer in the B+ tree leaf. Indexing requires an explicit prefix length (`INDEX (content(100))`)."
    },
    phase4_sizing_calculator: {
      phaseNumber: "Phase 4: Sizing & Truncation",
      title: "4. Sizing Calculations & Error 1406 Truncation Prevention",
      badge: "DBA Calculations",
      badgeColor: "rose",
      sqlSnippet: `-- 🧮 ROW SIZE SIZING CALCULATIONS:
-- Maximum InnoDB Row Size = 65,535 Bytes.
-- In utf8mb4 (4 bytes/char), VARCHAR(255) consumes:
--   255 * 4 = 1,020 Bytes max!

-- 💥 ERROR 1406: DATA TOO LONG FOR COLUMN:
-- If SQL mode includes STRICT_TRANS_TABLES (Default):
-- Inserting 256 characters into VARCHAR(255) throws:
-- Error 1406 (22001): Data too long for column 'user_city' at row 1!

-- 💡 MEDIA STORAGE ARCHITECTURAL RULE:
-- Never store multi-megabyte images/videos inside MySQL LONGBLOB!
-- Store media files in Cloud Object Storage (AWS S3 / Cloud Storage)
-- and store only the URL string in a VARCHAR(500) column! 🚀`,
      metricsTable: [
        { metric: "Max Row Limit", value: "65,535 Bytes", role: "Total limit across all in-page table columns" },
        { metric: "Error 1406", value: "Data too long for column", role: "Enforced by strict SQL mode on string overflow" },
        { metric: "VARCHAR(255) RAM", value: "1,020 Bytes in Sort Buffer", role: "Reserves worst-case N * 4 bytes in RAM" },
        { metric: "Media Storage", value: "Store URLs in VARCHAR", role: "Offload binary media to Cloud Object Storage" }
      ],
      explanation:
        "Total row size cannot exceed 65,535 bytes. Strict SQL mode prevents silent data truncation by throwing Error 1406. For large media files, storing URLs in `VARCHAR` and offloading files to cloud object storage is the enterprise standard."
    }
  };

  const navItems = [
    { id: "types-overview", label: "1. String Types Overview" },
    { id: "layout-diagram", label: "2. Physical Byte Diagram" },
    { id: "interactive-workbench", label: "3. String Types Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. String Types Audit Checklist" },
    { id: "faq-section", label: "7. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "8. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 004_002</span>
            <span>•</span>
            <span>Topic 4 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              String Data Types
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            String Data Types Deep Dive: CHAR vs VARCHAR vs TEXT vs BLOB (Storage, Truncation, Limits)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Uncover the physical storage internals of MySQL string types: master fixed-length <code className="text-emerald-400 font-mono">CHAR</code> vs variable-length <code className="text-cyan-400 font-mono">VARCHAR</code>, the 4-tier <code className="text-amber-400 font-mono">TEXT/BLOB</code> hierarchy, off-page overflow pointers, and prefix indexing.
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
        {/* SECTION 1: Types Overview */}
        <section id="types-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. String Data Type Spectrum
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Selecting the optimal string representation based on length predictability and binary encoding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. CHAR(M)</span>
              <h3 className="font-bold text-white">Fixed-Length</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                0-255 characters. Fixed space with padding. Ideal for country codes and hashes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. VARCHAR(M)</span>
              <h3 className="font-bold text-white">Variable-Length</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Up to 65,535 bytes. Stores actual length + 1-2 byte prefix. Saves disk space.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. TEXT Types</span>
              <h3 className="font-bold text-white">Large Text (LOB)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Up to 4 GB. Has character set/collation. Offloaded to overflow pages in InnoDB.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. BLOB Types</span>
              <h3 className="font-bold text-white">Binary Large Object</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Up to 4 GB. Raw binary bytes without character set. Stores PDFs and byte payloads.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Physical Layout Diagram */}
        <section id="layout-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: CHAR vs VARCHAR &amp; Off-Page Overflow
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing in-page byte allocations and external 16KB overflow page pointer mechanics.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 4.1: Byte Layout of 'Kolkata' in CHAR(10) vs VARCHAR(10) &amp; Overflow Page
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
                  <marker id="arrLobCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: CHAR(10) */}
                <rect x="20" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="160" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. CHAR(10) [FIXED 10 BYTES]
                </text>
                <line x1="20" y1="85" x2="300" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="250" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="127" fill="#a7f3d0" fontSize="11" fontWeight="bold">['K','o','l','k','a','t','a'] (7B)</text>
                <text x="45" y="143" fill="#94a3b8" fontSize="9">Actual string characters</text>

                <rect x="35" y="165" width="250" height="50" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="45" y="187" fill="#bae6fd" fontSize="11" fontWeight="bold">[' ', ' ', ' '] (3 Bytes Padding)</text>
                <text x="45" y="203" fill="#94a3b8" fontSize="9">Right-padded with spaces upon storage</text>

                <rect x="35" y="225" width="250" height="45" rx="4" fill="#1e293b" stroke="#334155" />
                <text x="45" y="245" fill="#34d399" fontSize="10" fontWeight="bold">Total on Disk = Exactly 10 Bytes</text>
                <text x="45" y="258" fill="#94a3b8" fontSize="9">Trailing spaces stripped on read</text>

                {/* Box 2: VARCHAR(10) */}
                <rect x="335" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. VARCHAR(10) [VARIABLE 8 BYTES]
                </text>
                <line x1="335" y1="85" x2="615" y2="85" stroke="#334155" />

                <rect x="350" y="105" width="250" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="360" y="127" fill="#bae6fd" fontSize="11" fontWeight="bold">[0x07] (1-Byte Length Prefix)</text>
                <text x="360" y="143" fill="#94a3b8" fontSize="9">Records string length = 7 bytes</text>

                <rect x="350" y="165" width="250" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="360" y="187" fill="#a7f3d0" fontSize="11" fontWeight="bold">['K','o','l','k','a','t','a'] (7B)</text>
                <text x="360" y="203" fill="#94a3b8" fontSize="9">Actual string data (No space padding!)</text>

                <rect x="350" y="225" width="250" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="360" y="245" fill="#34d399" fontSize="10" fontWeight="bold">Total on Disk = 1B + 7B = 8 Bytes ✅</text>
                <text x="360" y="258" fill="#bae6fd" fontSize="9">Saves 2 bytes compared to CHAR(10)</text>

                {/* Box 3: Off-Page Overflow Pointer */}
                <rect x="650" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="790" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. INNODB OFF-PAGE OVERFLOW
                </text>
                <line x1="650" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="665" y="105" width="250" height="60" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="675" y="127" fill="#fde68a" fontSize="10" fontWeight="bold">B+ Tree Leaf Page (RAM/Disk)</text>
                <text x="675" y="145" fill="#34d399" fontSize="10" fontWeight="bold">Stores 20-Byte Overflow Pointer</text>

                <rect x="665" y="180" width="250" height="85" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="675" y="200" fill="#a7f3d0" fontSize="10" fontWeight="bold">External 16KB Overflow Pages</text>
                <text x="675" y="218" fill="#94a3b8" fontSize="9">Stores full TEXT / BLOB content</text>
                <text x="675" y="235" fill="#fca5a5" fontSize="9">⚠️ SELECT * forces extra disk reads!</text>

                <path d="M 615 135 L 665 135" fill="none" stroke="#38bdf8" strokeWidth="2.5" markerEnd="url(#arrLobCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: String Types Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive String Types Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a string type phase to inspect DDL definitions, prefix indexing rules, and row size calculations.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(stringPhases).map((key) => {
              const ph = stringPhases[key];
              const isSelected = selectedStringPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStringPhase(key)}
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
                {stringPhases[selectedStringPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  stringPhases[selectedStringPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  stringPhases[selectedStringPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  stringPhases[selectedStringPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  stringPhases[selectedStringPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {stringPhases[selectedStringPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                DDL &amp; Physical Storage Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {stringPhases[selectedStringPhase].sqlSnippet}
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
                      <th className="py-2.5 px-4">Data Type / Property</th>
                      <th className="py-2.5 px-4">Storage Allocation &amp; Capacity</th>
                      <th className="py-2.5 px-4">Architectural Role &amp; Best Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {stringPhases[selectedStringPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.type || row.lobType || row.feature || row.metric}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.lengthBehavior || row.maxCapacity || row.size || row.value}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.bestUse || row.role}
                        </td>
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
                {stringPhases[selectedStringPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World String Types Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Optimizing fixed-length codes and eliminating database media bloat in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's CHAR Optimization */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating Row Fragmentation with CHAR(6) Pincodes in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Zero Fragmentation
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a student registry table with 5 million rows used `VARCHAR(255)` for 6-digit postal pincodes (e.g. '700120'). Refactoring the column to `CHAR(6) CHARACTER SET ascii` eliminated length prefix byte overhead, reduced table storage by 1.8 GB, and stopped in-page row fragmentation during student address updates.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Media Offload */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Offloading 400 GB Student Photos to S3 in Kolkata Portal
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  92% Storage Freed
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, storing student admission ID photos directly in `LONGBLOB` columns swelled the database tablespace to 460 GB, choking the Buffer Pool and causing nightly backups to take 6 hours. Migrating the images to Cloud Object Storage and storing only S3 URL strings in `VARCHAR(255)` shrunk the database to 38 GB and accelerated backups to 8 minutes.
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
              Avoid row size overflow and disk temporary table performance traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Blindly using VARCHAR(255) Everywhere
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining every column as `VARCHAR(255)` forces MySQL to reserve $255 \times 4 = 1,020 bytes$ per row in RAM during in-memory query sorting.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Size VARCHAR columns realistically based on domain constraints.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Storing Media Files in LONGBLOB
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Storing multi-megabyte images or PDFs inside database tables bloats tablespaces and destroys Buffer Pool caching efficiency.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Store media files in Object Storage (S3) and URLs in VARCHAR.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use CHAR for Fixed-Length Codes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use `CHAR(2)` for country/state codes, `CHAR(6)` for pincodes, `CHAR(32)` for MD5, and `CHAR(36)` for UUIDs to eliminate length-prefix overhead.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes storage density and prevents update row shifts.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Specify Prefix Length on TEXT Indexes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                When indexing `TEXT` columns, specify a selective prefix (e.g. `INDEX (description(50))`) to keep index entries within manageable B+ tree bounds.
              </p>
              <div className="text-xs text-slate-400">
                Maintains fast index scans without exceeding 3072-byte key limits.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: String Types Audit Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA String Types Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify optimal string schema design across database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Schema Audit Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Fixed Codes in CHAR</strong> = Use `CHAR` for fixed-length codes and hashes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Realistic VARCHAR</strong> = Size VARCHARs according to actual business maximums.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Prefix Indexed TEXT</strong> = Ensure `TEXT` indexes use explicit prefix lengths.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">No In-DB Media</strong> = Offload binary files &gt; 1MB to cloud object storage.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe VARCHAR Length Prefixes...”</span>
                  If a `VARCHAR` column's maximum byte size exceeds 255 bytes (which happens for `VARCHAR(64)` and above in `utf8mb4`), MySQL uses a 2-byte length prefix instead of 1-byte!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about SELECT * on TEXT Tables...”</span>
                  When you write `SELECT *` on a table with a `TEXT` column, InnoDB must read external overflow pages from disk even if your application only needed the user ID and email! Always select only the columns you need!
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
              Comprehensive reference questions covering CHAR, VARCHAR, TEXT, and BLOB data types.
            </p>
          </div>

          <FAQTemplate
            title="String Data Types (CHAR, VARCHAR, TEXT, BLOB) FAQs"
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
            title="String Data Types Deep Dive: CHAR vs VARCHAR vs TEXT vs BLOB (Storage, Truncation, Limits)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic4_note.txt"
          />

          <Teacher
            note="String data type selection is one of the most critical decisions in schema design. A developer who uses VARCHAR(255) for every single text field may think it doesn't matter, but in MySQL, memory sort buffers allocate worst-case bytes (up to 1,020 bytes per row in utf8mb4), quickly consuming hundreds of megabytes of RAM during analytical queries. Use CHAR for fixed-length codes, size VARCHAR realistically, use prefix indexes on TEXT, and always store large images in cloud object storage rather than database BLOBs!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic4;
