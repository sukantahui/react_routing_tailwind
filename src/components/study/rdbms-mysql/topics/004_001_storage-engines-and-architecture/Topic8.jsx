import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – B+ Tree Physical Structure: Pages, Extents, Segments, and Page Layout (16KB Page Size)
 * Module: 004_001_storage-engines-and-architecture
 *
 * @component
 * @returns {JSX.Element} Interactive B+ tree physical structure workbench: analyzing the 4-level storage hierarchy (Tablespace, Segment, Extent, Page), the 7 internal sections of a 16KB page, Page Directory binary search mechanics, and sequential vs random UUID page split fragmentation in MySQL.
 */
const Topic8 = () => {
  // Interactive Physical Structure State
  const [selectedStructurePhase, setSelectedStructurePhase] = useState("phase1_hierarchy");

  const structurePhases = {
    phase1_hierarchy: {
      phaseNumber: "Phase 1: Storage Hierarchy",
      title: "1. 4-Level Storage Hierarchy: Tablespace, Segment, Extent & Page",
      badge: "Storage Hierarchy",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏗️ INNODB PHYSICAL ALLOCATION HIERARCHY:
-- 1. Tablespace (.ibd): The physical container on disk.
-- 2. Segment: Logical allocation unit for B+ tree components:
--    - Leaf Segment (Data): Holds all table data rows.
--    - Non-Leaf Segment (Index): Holds B+ tree navigation pages.
--    - Rollback Segment: Holds undo log pages.
-- 3. Extent: 64 contiguous 16KB pages = 1 MB chunk (Optimizes sequential disk I/O).
-- 4. Page: The fundamental 16KB (16,384 bytes) unit of disk I/O and RAM caching.

-- Inspecting tablespace physical allocation:
SELECT space, name, space_type, file_format, row_format 
FROM information_schema.innodb_tablespaces 
WHERE name LIKE '%admissions%';`,
      metricsTable: [
        { level: "1. Tablespace (.ibd)", size: "Variable (MB to TB)", role: "Operating system file holding all table segments" },
        { level: "2. Segments", size: "Leaf & Non-Leaf", role: "Allocates data rows separately from navigation keys" },
        { level: "3. Extents", size: "64 Pages (1 MB)", role: "Contiguous allocation for fast sequential read-ahead" },
        { level: "4. Pages", size: "16 KB (16,384 Bytes)", role: "Atomic unit of Buffer Pool caching and disk read/write" }
      ],
      explanation:
        "InnoDB organizes storage into a strict 4-level hierarchy. Allocating 1MB Extents (64 contiguous pages) ensures that sequential range scans and bulk inserts execute with minimal disk head movement."
    },
    phase2_page_anatomy: {
      phaseNumber: "Phase 2: 16KB Page Anatomy",
      title: "2. The 7 Internal Sections of a 16KB InnoDB Page Frame",
      badge: "Page Byte Map",
      badgeColor: "cyan",
      sqlSnippet: `-- 📄 16KB PAGE INTERNAL BYTE LAYOUT (Total: 16,384 Bytes):
-- 1. File Header (38 B):
--    - Checksum (4B), Page Number (4B), Page LSN (8B), Page Type (2B)
--    - FIL_PAGE_PREV (4B) & FIL_PAGE_NEXT (4B) → Doubly-linked list!
-- 2. Page Header (56 B): Slots count, heap top pointer, number of records.
-- 3. Infimum & Supremum (26 B): Minimum and maximum sentinel boundary records.
-- 4. User Records: Actual data rows with DB_TRX_ID and DB_ROLL_PTR.
-- 5. Free Space: Unallocated byte area for future row insertions.
-- 6. Page Directory: Sparse array of 2-byte slot pointers for in-page binary search.
-- 7. File Trailer (8 B): CRC32 Checksum + Low LSN bytes for torn write detection.`,
      metricsTable: [
        { section: "File Header (38B)", location: "Top of Page", role: "Prev/Next page pointers forming doubly-linked chain" },
        { section: "Page Header (56B)", location: "Header Block", role: "Directory slot counts, record counts, dead space bytes" },
        { section: "Infimum / Supremum (26B)", location: "Sentinel Block", role: "Fixed lowest and highest boundary records on the page" },
        { section: "Page Directory", location: "Bottom of Page", role: "Sparse 2-byte slot pointers for fast binary search" }
      ],
      explanation:
        "Every 16KB page is partitioned into 7 distinct sections. The File Header links adjacent pages in a doubly-linked list, the Page Directory enables in-page binary search, and the File Trailer validates 16KB write integrity."
    },
    phase3_page_directory: {
      phaseNumber: "Phase 3: Page Directory Search",
      title: "3. In-Page Binary Search with the Page Directory",
      badge: "In-Page Lookup",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ IN-PAGE SEARCH ACCELERATION VIA PAGE DIRECTORY:
-- Problem: Rows on a page are single-linked in ascending key order.
-- Scanning 200 rows linearly would require up to 200 memory pointer hops!

-- Solution: The Page Directory groups rows into 'Slots' (4 to 8 rows per slot):
-- 1. Slot 0 points to Infimum record (1 row).
-- 2. Slot 1..N-1 point to intermediate row groups (4-8 rows each).
-- 3. Slot N points to Supremum record.

-- SEARCH WORKFLOW:
-- 1. Perform Binary Search on Page Directory slots → O(log K) complexity.
-- 2. Locate target slot boundary.
-- 3. Traverse at most 4 to 8 rows linearly along the linked list!
-- Result: Sub-microsecond row location within the 16KB RAM frame! ✅`,
      metricsTable: [
        { metric: "Slot Capacity", value: "4 to 8 Rows per Slot", role: "Balances directory size against linear scan length" },
        { metric: "Search Algorithm", value: "Binary Search on Slots", role: "Reduces search time from O(N) to O(log K) inside RAM" },
        { metric: "Directory Location", value: "Grows from bottom upward", role: "Grows toward Free Space from page trailer" },
        { metric: "Row Pointers", value: "Singly-Linked List", role: "Links records in strictly ascending primary key order" }
      ],
      explanation:
        "The Page Directory divides the page's rows into sparse slots. When looking for a key, InnoDB performs a binary search across the Page Directory slots, then scans at most 4 to 8 rows linearly, finding rows in sub-microseconds."
    },
    phase4_page_splits: {
      phaseNumber: "Phase 4: Page Split Mechanics",
      title: "4. Page Splits: Sequential AUTO_INCREMENT vs Random UUID Fragmentation",
      badge: "Page Split Analysis",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 PAGE SPLIT BENCHMARK: SEQUENTIAL VS RANDOM KEYS:

-- SCENARIO A: Sequential AUTO_INCREMENT Primary Key (Optimal):
-- - Rows are appended strictly to the tail of the current page.
-- - Page achieves ~93% fill ratio (15/16ths full) before moving to next page.
-- - ZERO mid-tree page splits; 100% compact storage! ✅

-- SCENARIO B: Random UUID Primary Key (Severe Fragmentation):
-- - Inserts land at random page positions throughout the B+ tree.
-- - When a page fills up, InnoDB performs a 50/50 PAGE SPLIT:
--   Allocates new page → moves 50% of rows → updates parent index!
-- - Result: Leaves pages ~50% empty, doubles disk storage, and causes I/O thrashing! ❌`,
      metricsTable: [
        { keyType: "Sequential AUTO_INCREMENT", fillFactor: "~93% Compact Fill", result: "0 Mid-Tree Page Splits; Minimal I/O ⚡" },
        { keyType: "Random UUID (CHAR(36))", fillFactor: "~50% Fragmented", result: "Constant 50/50 Page Splits; 2x Disk Size ⚠️" },
        { keyType: "Sequential UUIDv7", fillFactor: "~90% Compact Fill", result: "Combines UUID uniqueness with sequential append 🚀" },
        { keyType: "Remediation", value: "OPTIMIZE TABLE", role: "Rebuilds fragmented B+ tree pages contiguously" }
      ],
      explanation:
        "Sequential primary keys append neatly to the last page with a 93% fill factor. Random UUIDs cause frequent 50/50 page splits throughout the tree, leaving pages half-empty, doubling storage requirements, and thrashing Buffer Pool memory."
    }
  };

  const navItems = [
    { id: "hierarchy-overview", label: "1. Storage Hierarchy" },
    { id: "page-diagram", label: "2. 16KB Page Diagram" },
    { id: "interactive-workbench", label: "3. Physical Structure Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. B+ Tree Physical Checklist" },
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
            <span>Topic 8 of 12</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Physical Storage Internals
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            B+ Tree Physical Structure: Pages, Extents, Segments, and Page Layout (16KB Page Size)
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Uncover the internal byte architecture of InnoDB B+ trees: master the 4-level storage hierarchy (Tablespace → Segment → Extent → Page), the 7 structural sections of a 16KB page, Page Directory binary search lookups, and page split fragmentation.
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
        {/* SECTION 1: Storage Hierarchy Overview */}
        <section id="hierarchy-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 4-Level Physical Storage Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How InnoDB organizes billions of row records into structured on-disk containers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Level 1</span>
              <h3 className="font-bold text-white">Tablespace (.ibd)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The operating system file container holding all segments and pages for a table.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Level 2</span>
              <h3 className="font-bold text-white">Segments</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Allocates Leaf Segments (data rows) and Non-Leaf Segments (index navigation).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">Level 3</span>
              <h3 className="font-bold text-white">Extents (1 MB)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                64 contiguous 16KB pages allocated together to maximize sequential I/O speed.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Level 4</span>
              <h3 className="font-bold text-white">Pages (16 KB)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The fundamental 16KB atomic block of disk allocation and Buffer Pool RAM caching.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: 16KB Page Diagram */}
        <section id="page-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: The 7 Sections of a 16KB Page
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Detailed byte layout showing how headers, records, free space, and the Page Directory fit in 16,384 bytes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 8.1: Anatomy of a 16KB InnoDB Page Frame
              </h3>
              <span className="text-xs text-slate-400 font-mono">16,384 Bytes Internal Map</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 380"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                {/* 16KB Page Container */}
                <rect x="50" y="30" width="850" height="320" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="475" y="55" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                  16KB INNODB PAGE FRAME (16,384 BYTES)
                </text>
                <line x1="50" y1="65" x2="900" y2="65" stroke="#334155" />

                {/* Section 1: File Header */}
                <rect x="70" y="80" width="230" height="45" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="80" y="100" fill="#a7f3d0" fontSize="10" fontWeight="bold">1. File Header (38 Bytes)</text>
                <text x="80" y="115" fill="#94a3b8" fontSize="9">FIL_PAGE_PREV &amp; FIL_PAGE_NEXT (Doubly-Linked)</text>

                {/* Section 2: Page Header */}
                <rect x="320" y="80" width="260" height="45" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="330" y="100" fill="#bae6fd" fontSize="10" fontWeight="bold">2. Page Header (56 Bytes)</text>
                <text x="330" y="115" fill="#94a3b8" fontSize="9">Directory slots count, heap top, dead space</text>

                {/* Section 3: Infimum & Supremum */}
                <rect x="600" y="80" width="280" height="45" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="610" y="100" fill="#fde68a" fontSize="10" fontWeight="bold">3. Infimum &amp; Supremum (26 B)</text>
                <text x="610" y="115" fill="#94a3b8" fontSize="9">Minimum &amp; Maximum key boundary sentinels</text>

                {/* Section 4: User Records */}
                <rect x="70" y="140" width="810" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="80" y="162" fill="#34d399" fontSize="11" fontWeight="bold">4. User Records (Data Rows &amp; Hidden System Columns)</text>
                <text x="80" y="180" fill="#bae6fd" fontSize="10">
                  Row 1 [DB_TRX_ID | DB_ROLL_PTR | Data] → Row 2 → Row 3 ... (Singly-linked in ascending key order)
                </text>

                {/* Section 5: Free Space */}
                <rect x="70" y="220" width="810" height="45" rx="4" fill="#1e293b" stroke="#64748b" strokeDasharray="4 4" />
                <text x="475" y="247" fill="#94a3b8" fontSize="11" fontWeight="bold" textAnchor="middle">
                  5. Free Space (Unallocated area for future row insertions before page split)
                </text>

                {/* Section 6: Page Directory */}
                <rect x="70" y="280" width="550" height="50" rx="4" fill="#1e293b" stroke="#f59e0b" />
                <text x="80" y="302" fill="#fbbf24" fontSize="11" fontWeight="bold">6. Page Directory (Sparse 2-Byte Slot Pointers)</text>
                <text x="80" y="318" fill="#94a3b8" fontSize="9">
                  [Slot 0 → Infimum] [Slot 1 → Row 4] [Slot 2 → Row 8] ... [Slot N → Supremum] (Binary Search $O(\log K)$)
                </text>

                {/* Section 7: File Trailer */}
                <rect x="640" y="280" width="240" height="50" rx="4" fill="#1e293b" stroke="#be123c" />
                <text x="650" y="302" fill="#fca5a5" fontSize="11" fontWeight="bold">7. File Trailer (8 Bytes)</text>
                <text x="650" y="318" fill="#94a3b8" fontSize="9">CRC32 Checksum + Low LSN</text>
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Physical Structure Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Physical Structure Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a physical structure phase to inspect byte layouts, binary search execution, and page split benchmarks.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(structurePhases).map((key) => {
              const ph = structurePhases[key];
              const isSelected = selectedStructurePhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStructurePhase(key)}
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
                {structurePhases[selectedStructurePhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  structurePhases[selectedStructurePhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  structurePhases[selectedStructurePhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  structurePhases[selectedStructurePhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  structurePhases[selectedStructurePhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {structurePhases[selectedStructurePhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Physical Storage Inspection Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {structurePhases[selectedStructurePhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Physical Architecture Properties:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Component / Level</th>
                      <th className="py-2.5 px-4">Size &amp; Configuration</th>
                      <th className="py-2.5 px-4">Storage Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {structurePhases[selectedStructurePhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.level || row.section || row.metric || row.keyType}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.size || row.location || row.value || row.fillFactor}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.role || row.result}
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
                {structurePhases[selectedStructurePhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Physical Structure Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Eliminating random UUID fragmentation and optimizing page fill in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's UUIDv7 Refactoring */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 50/50 Page Splits with Sequential UUIDv7 in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  48% Storage Savings
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an e-commerce order table with 20 million rows used random UUIDv4 strings as primary keys, causing constant mid-tree page splits, a 52% page fill factor, and 85 GB of fragmented disk usage. Migrating to time-ordered sequential UUIDv7 increased the page fill ratio to 91%, shrinking the table to 44 GB and accelerating write throughput by 340%.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Page Directory Tuning */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – High-Speed Point Lookups in Kolkata Telemetry Hub
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  0.3ms Point Queries
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, keeping primary key sizes compact (`BIGINT UNSIGNED`) maximized the fan-out of 16KB internal B+ tree navigation pages to over 700 child pointers per page. As a result, 50 million student exam records fit within a 3-level B+ tree, delivering consistent 0.3ms point query lookups in the Buffer Pool.
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
              Avoid physical design and primary key mistakes that destroy B+ tree performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using Random UUIDv4 as Primary Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Random UUIDs trigger constant mid-tree 50/50 page splits, leaving pages half-empty and doubling physical disk storage and Buffer Pool memory requirements.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use sequential AUTO_INCREMENT or time-ordered UUIDv7.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Extremely Wide Primary Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Defining wide composite primary keys (e.g. 5 `VARCHAR` columns) inflates every secondary index on the table and reduces internal B+ tree fan-out.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Keep Primary Keys narrow (BIGINT or INT UNSIGNED).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Understand B+ Tree Depth
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Because 16KB pages have massive fan-out (hundreds of child pointers per page), a 3-to-4 level B+ tree can index tens of millions of records easily.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees O(3-4) maximum disk page reads to locate any row.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Run OPTIMIZE TABLE on Sparse Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If a table has undergone massive deletions, execute `OPTIMIZE TABLE tbl;` to rebuild the B+ tree into clean 93% compact pages.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates fragmented dead space and shrinks .ibd files.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: B+ Tree Physical Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Physical Storage Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key physical layout parameters to verify across production database tables.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Physical Structure Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Sequential Primary Keys</strong> = Ensure tables use monotonic auto-increment or UUIDv7.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Narrow PK Types</strong> = Use `INT UNSIGNED` or `BIGINT UNSIGNED` for primary keys.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Row Format</strong> = Enforce `ROW_FORMAT=DYNAMIC` for efficient off-page BLOB storage.</span>
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
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Page Directory Slots...”</span>
                  Inside a 16KB page, the Page Directory slots allow binary searching across 200 rows in just 6 to 8 CPU operations. That is why in-memory row lookups take nanoseconds!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about B+ Tree Fan-Out...”</span>
                  A compact 8-byte integer primary key allows an internal 16KB index page to hold hundreds of child pointers. A 64-byte string key cuts fan-out by 8x, forcing the B+ tree to grow an extra level deeper and adding an extra disk I/O to every query!
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
              Comprehensive reference questions covering InnoDB B+ Tree Physical Structure and 16KB Page Layout.
            </p>
          </div>

          <FAQTemplate
            title="InnoDB B+ Tree Physical Structure FAQs"
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
            title="B+ Tree Physical Structure: Pages, Extents, Segments, and Page Layout (16KB Page Size)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="When you understand the internal byte anatomy of a 16KB InnoDB page, database design transforms from abstract theory into an exact mechanical engineering discipline. You immediately understand why sequential primary keys achieve a 93% compact fill factor while random UUIDs trigger constant 50/50 page splits that waste half your disk space. You understand why narrow primary keys keep B+ tree depth at only 3 to 4 levels for 50 million records. Master the 16KB page, and you master the database itself!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
