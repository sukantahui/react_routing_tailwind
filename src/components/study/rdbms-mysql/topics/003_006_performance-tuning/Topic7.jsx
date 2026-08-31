import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Covering Index Strategy: Eliminating Disk Reads with Index-Only Access
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and optimization workbench on MySQL Covering Indexes: index-only scans (Extra = 'Using index'), eliminating clustered table bookmark lookups, implicit Primary Key inclusion, Deferred Joins for deep pagination, and composite index design.
 */
const Topic7 = () => {
  // Interactive Simulator State
  const [selectedCoveringPattern, setSelectedCoveringPattern] = useState("direct_filter_covering");

  const coveringScenarios = {
    direct_filter_covering: {
      title: "1. Direct Filter & Projection Covering: Eliminating All Base Table Reads",
      badge: "Direct Filter Covering",
      badgeColor: "emerald",
      sqlQuery: `-- ⚡ DIRECT COVERING INDEX (Using index):
-- Problem Query: Querying student registration profiles:
SELECT student_id, name, city, gpa, balance_fee 
FROM student_records 
WHERE city = 'Barrackpore' AND status = 'Active';

-- 🛠️ COMPOSITE COVERING INDEX:
-- Includes all filter AND projection columns:
CREATE INDEX idx_student_cov 
ON student_records (city, status, name, gpa, balance_fee);

-- 📋 EXPLAIN Output:
-- type = 'ref'
-- key = 'idx_student_cov'
-- rows = 450
-- Extra = 'Using index' ⚡ (Covering Index!)

-- ⚡ BENEFIT:
-- 1. All requested columns exist inside the B+Tree leaf pages!
-- 2. Zero Clustered Primary Key bookmark lookups (0 random I/O seeks)!
-- 3. Execution time: 0.35 ms (vs 18.5 ms with non-covering index).`,
      resultRows: [
        {
          patternName: "Non-Covering Index (idx_city)",
          indexUsed: "idx_city",
          extraFlag: "Using index condition",
          baseTableLookups: "450 Random Clustered Seeks ⚠️",
          pagesRead: "450 Table Pages",
          latency: "18.50 ms",
          status: "High Random I/O ⚠️"
        },
        {
          patternName: "Covering Index (idx_student_cov)",
          indexUsed: "idx_student_cov",
          extraFlag: "Using index ⚡",
          baseTableLookups: "0 Table Reads (Pure B+Tree) ✅",
          pagesRead: "9 Index Pages",
          latency: "0.35 ms ⚡",
          status: "50x Speedup ✅"
        }
      ],
      explanation:
        "By including both the filtering columns (`city`, `status`) and the retrieved columns (`name`, `gpa`, `balance_fee`) in the composite index, the storage engine fulfills the entire query directly from index leaf nodes, eliminating 450 random disk reads on the clustered table."
    },
    deferred_join_pagination: {
      title: "2. The Deferred Join (Late Row Lookup): Ultra-Fast Deep Pagination",
      badge: "Deferred Join (Deep Offset)",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ THE DEFERRED JOIN PATTERN (Late Row Lookup):
-- Problem Query: Paginating deep into 100,000 active student records:
-- ❌ BAD: Reads 100,020 full clustered table records to discard 100,000 of them!
SELECT * 
FROM student_records 
WHERE status = 'Active' 
ORDER BY registration_date DESC 
LIMIT 100000, 20; -- Takes 450 ms!

-- ⚡ OPTIMIZED DEFERRED JOIN:
-- 1. Subquery uses a Covering Index to scan 100,020 compact Primary Keys.
-- 2. Outer query joins on PK to fetch ONLY the 20 required full rows!
SELECT s.* 
FROM student_records s
JOIN (
    SELECT student_id 
    FROM student_records 
    WHERE status = 'Active' 
    ORDER BY registration_date DESC 
    LIMIT 100000, 20
) AS page ON s.student_id = page.student_id;

-- 📋 EXPLAIN Output for Subquery:
-- key = 'idx_status_reg_id'
-- Extra = 'Using index' ⚡
-- Latency drops from 450 ms → 4.2 ms (100x faster)!`,
      resultRows: [
        {
          patternName: "Standard Pagination (LIMIT 100k, 20)",
          indexUsed: "idx_status",
          extraFlag: "Using filesort",
          baseTableLookups: "100,020 Full Table Row Reads",
          pagesRead: "3,200 Pages",
          latency: "450.00 ms 🚨",
          status: "Severe Latency Spike ❌"
        },
        {
          patternName: "Deferred Join Covering Index",
          indexUsed: "idx_status_reg_id (Subquery)",
          extraFlag: "Using index ⚡",
          baseTableLookups: "Only 20 Clustered Seeks ✅",
          pagesRead: "145 Index Pages",
          latency: "4.20 ms ⚡",
          status: "100x Faster Pagination ✅"
        }
      ],
      explanation:
        "Standard deep pagination reads full row payloads for thousands of discarded records. The Deferred Join leverages a covering index subquery to perform the offset scanning purely in RAM on compact index leaf nodes, reading only the final 20 full table records by Primary Key."
    },
    aggregate_grouping_covering: {
      title: "3. Index-Only Aggregations & Grouping: Zero Temp Tables or Filesort",
      badge: "Covering Aggregations",
      badgeColor: "amber",
      sqlQuery: `-- ⚡ COVERING INDEX FOR AGGREGATIONS & GROUPING:
-- Query: Calculate department statistics across 100,000 students:
SELECT department_id, COUNT(*), AVG(gpa), MAX(balance_fee) 
FROM student_records 
GROUP BY department_id;

-- 🛠️ COVERING INDEX ON (department_id, gpa, balance_fee):
CREATE INDEX idx_dept_stats 
ON student_records (department_id, gpa, balance_fee);

-- 📋 EXPLAIN Output:
-- type = 'index'
-- key = 'idx_dept_stats'
-- Extra = 'Using index' ⚡ (Tight Index Scan!)

-- ⚡ BENEFIT:
-- 1. Pre-sorted index keys allow computing group subtotals on the fly!
-- 2. ZERO temporary tables (Using temporary eliminated!).
-- 3. ZERO filesorts (Using filesort eliminated!).
-- 4. Execution time: ~2.8 ms for 100,000 rows.`,
      resultRows: [
        {
          patternName: "Un-indexed GROUP BY department_id",
          indexUsed: "NULL",
          extraFlag: "Using temporary; Using filesort 🚨",
          baseTableLookups: "100,000 Clustered Rows Read",
          pagesRead: "2,800 Pages",
          latency: "74.00 ms 🚨",
          status: "Double Red Flag ❌"
        },
        {
          patternName: "Covering Index on (dept, gpa, fee)",
          indexUsed: "idx_dept_stats",
          extraFlag: "Using index ⚡",
          baseTableLookups: "0 Table Reads (Tight Index Scan)",
          pagesRead: "120 Index Pages",
          latency: "2.80 ms ⚡",
          status: "Streaming Aggregation ✅"
        }
      ],
      explanation:
        "When an index covers both the grouping column (`department_id`) and the aggregate arguments (`gpa`, `balance_fee`), MySQL computes group summaries in a single linear streaming pass through the pre-sorted B+Tree, completely eliminating temporary tables and filesort passes."
    },
    implicit_primary_key: {
      title: "4. Implicit Primary Key Covering: Free Index-Only Lookups in InnoDB",
      badge: "Implicit PK Inclusion",
      badgeColor: "rose",
      sqlQuery: `-- ⚡ INNODB IMPLICIT PRIMARY KEY INCLUSION:
-- Table Schema:
-- PRIMARY KEY (student_id)
-- SECONDARY INDEX: idx_city (city)

-- Query: Retrieve student IDs for a given city:
SELECT student_id, city 
FROM student_records 
WHERE city = 'Kolkata';

-- 📋 EXPLAIN Output:
-- type = 'ref'
-- key = 'idx_city'
-- Extra = 'Using index' ⚡ (Covering!)

-- 🔍 ARCHITECTURAL REASON:
-- In InnoDB, secondary index leaf nodes physically store:
-- [ Key: 'Kolkata', Value: student_id ]
-- Therefore, student_id is ALWAYS present in every secondary index!
-- You get a Covering Index for FREE without adding student_id to the index definition!`,
      resultRows: [
        {
          patternName: "Querying (city, student_id) via idx_city",
          indexUsed: "idx_city",
          extraFlag: "Using index ⚡",
          baseTableLookups: "0 Table Reads (Implicit PK)",
          pagesRead: "6 Index Pages",
          latency: "0.22 ms ⚡",
          status: "Free Covering Index ✅"
        }
      ],
      explanation:
        "InnoDB secondary indexes automatically store the clustered Primary Key in their leaf nodes as row pointers. Any query requesting only the indexed columns and the Primary Key is automatically a Covering Index with zero table seeks."
    }
  };

  const navItems = [
    { id: "covering-concept", label: "1. Covering Index Core Theory" },
    { id: "two-step-vs-index-only", label: "2. Two-Step vs Index-Only Access" },
    { id: "svg-architecture", label: "3. Visual Architecture SVGs" },
    { id: "interactive-workbench", label: "4. Interactive Covering Workbench" },
    { id: "deferred-joins", label: "5. Deferred Join Deep Pagination" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Deep Questions)" },
    { id: "teacher-notes", label: "10. Printable Note & Teacher's Observation" }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 7 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Index Optimization Mastery
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">
            Covering Index Strategy: Eliminating Disk Reads with Index-Only Access
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the single most impactful optimization technique in relational database engineering: eliminate random disk bookmark lookups on base tables by fulfilling entire queries directly from compact B+Tree index leaf nodes (<code className="text-emerald-400 font-mono">Extra = 'Using index'</code>).
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
        {/* SECTION 1: Covering Index Core Theory */}
        <section id="covering-concept" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Covering Index?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The holy grail of relational read performance: zero clustered base table reads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Definition
              </span>
              <h3 className="font-bold text-white text-base">Index-Only Retrieval</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                A Covering Index is an index design where the index itself contains 100% of the columns requested in the query across `SELECT`, `WHERE`, `JOIN`, `GROUP BY`, and `ORDER BY` clauses.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                EXPLAIN Signature
              </span>
              <h3 className="font-bold text-white text-base">Extra = 'Using index'</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When MySQL detects a covering index, it sets <code className="text-emerald-400 font-mono">Extra = 'Using index'</code>. The execution engine instructs InnoDB to return data directly from the index leaf page without reading clustered table rows.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                InnoDB Superpower
              </span>
              <h3 className="font-bold text-white text-base">Implicit Primary Key</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                InnoDB secondary index leaf nodes always append the table's Primary Key. Querying indexed columns together with the Primary Key yields an automatic covering index for free!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Two-Step vs Index-Only Access */}
        <section id="two-step-vs-index-only" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Physical Mechanics: Two-Step Bookmark Lookup vs Index-Only Access
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why non-covering secondary indexes suffer from random disk seeks and high latency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-rose-950 text-rose-400 border border-rose-800 font-mono text-xs font-bold">
                  Standard Secondary Index (Non-Covering)
                </span>
              </div>
              <h3 className="font-bold text-white text-base">The Two-Step Lookup Bottleneck</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you execute <code className="text-cyan-300 font-mono">SELECT student_id, name, notes FROM students WHERE city = 'Barrackpore'</code> with an index on <code className="text-cyan-300 font-mono">idx_city (city)</code>:
              </p>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside">
                <li><strong className="text-cyan-300">Step 1 (Secondary Index Probe):</strong> Traverses `idx_city` B+Tree to find 500 matching `student_id` Primary Keys.</li>
                <li><strong className="text-rose-400">Step 2 (500 Bookmark Lookups):</strong> Performs 500 separate random I/O seeks into the clustered Primary Key table to retrieve the unindexed `name` and `notes` columns.</li>
              </ol>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-rose-400 font-mono">
                Physical Cost: 1 Index Probe + 500 Random Page Reads = ~18.5 ms ⚠️
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono text-xs font-bold">
                  Covering Index (Using index)
                </span>
              </div>
              <h3 className="font-bold text-white text-base">The Pure Index-Only Stream</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                With a composite index on <code className="text-emerald-300 font-mono">idx_city_name_notes (city, name, notes)</code>:
              </p>
              <ol className="space-y-2 text-xs sm:text-sm text-slate-300 list-decimal list-inside">
                <li><strong className="text-emerald-300">Step 1 (Secondary Index Probe):</strong> Traverses the B+Tree to the start of the `Barrackpore` leaf range.</li>
                <li><strong className="text-emerald-300">Step 2 (Sequential Index Streaming):</strong> Extracts `student_id`, `name`, and `notes` directly from adjacent leaf pages.</li>
              </ol>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
                Physical Cost: 1 Index Probe + 8 Sequential Index Pages = ~0.35 ms ⚡ (50x Faster!)
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Visual Architecture SVGs */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Covering Index vs Bookmark Lookup Pipelines
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Step-by-step visual mapping of physical page reads in InnoDB.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Covering vs Bookmark Lookup */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 7.1: Physical Data Flow: Non-Covering Bookmark Lookups vs Covering Index-Only Access
                </h3>
                <span className="text-xs text-slate-400 font-mono">InnoDB Storage Engine</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 420"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradCovGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradCovRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowCovGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowCovRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                    <marker id="arrowCovBlue" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                    </marker>
                  </defs>

                  {/* Left Container: Non-Covering Index */}
                  <rect x="30" y="40" width="420" height="340" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    1. Non-Covering Index (Two-Step Lookup)
                  </text>
                  <text x="240" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    SELECT id, name, gpa FROM students WHERE city = 'Barrackpore'
                  </text>

                  {/* Secondary Index Tree */}
                  <rect x="50" y="115" width="160" height="70" rx="6" fill="#1e293b" stroke="#64748b" />
                  <text x="130" y="140" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">Secondary B+Tree</text>
                  <text x="130" y="160" fill="#94a3b8" fontSize="9" textAnchor="middle">idx_city (city only)</text>
                  <text x="130" y="175" fill="#38bdf8" fontSize="9" textAnchor="middle">Yields PK: 101, 102, 103...</text>

                  {/* Arrow to Clustered Table */}
                  <path d="M 210 150 Q 250 150 260 210" fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeDasharray="4,3" markerEnd="url(#arrowCovRed)" />
                  <text x="255" y="175" fill="#f43f5e" fontSize="10" fontWeight="bold">Random Seeks!</text>

                  {/* Clustered Primary Key Table */}
                  <rect x="250" y="210" width="180" height="110" rx="6" fill="#1e293b" stroke="#f43f5e" />
                  <text x="340" y="235" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">Clustered Table (PRIMARY)</text>
                  <text x="340" y="255" fill="#e2e8f0" fontSize="9" textAnchor="middle">Page 402: Row 101 (Mamata, 9.4)</text>
                  <text x="340" y="275" fill="#e2e8f0" fontSize="9" textAnchor="middle">Page 890: Row 102 (Debangshu, 8.8)</text>
                  <text x="340" y="295" fill="#e2e8f0" fontSize="9" textAnchor="middle">Page 1420: Row 103 (Susmita, 9.1)</text>

                  <rect x="50" y="335" width="380" height="30" rx="4" fill="#881337" />
                  <text x="240" y="355" fill="#fecdd3" fontSize="10" fontWeight="bold" textAnchor="middle">
                    💥 High Disk Latency (~18.5 ms) &amp; Buffer Pool Eviction
                  </text>

                  {/* Right Container: Covering Index */}
                  <rect x="490" y="40" width="430" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="705" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    2. Covering Index (Index-Only Stream)
                  </text>
                  <text x="705" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    CREATE INDEX idx_cov ON students (city, name, gpa)
                  </text>

                  {/* Composite Covering B+Tree */}
                  <rect x="520" y="115" width="370" height="140" rx="8" fill="#1e293b" stroke="#047857" strokeWidth="2" />
                  <text x="705" y="145" fill="#a7f3d0" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Composite Covering B+Tree Leaf Nodes
                  </text>
                  <text x="705" y="165" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    Leaf 1: [ Barrackpore | Mamata | 9.4 | PK: 101 ] ⚡
                  </text>
                  <text x="705" y="185" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    Leaf 1: [ Barrackpore | Debangshu | 8.8 | PK: 102 ] ⚡
                  </text>
                  <text x="705" y="205" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    Leaf 2: [ Barrackpore | Susmita | 9.1 | PK: 103 ] ⚡
                  </text>
                  <text x="705" y="235" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ALL COLUMNS SATISFIED FROM LEAF PAGES!
                  </text>

                  {/* Stream Direct to Client Arrow */}
                  <path d="M 705 255 L 705 315" fill="none" stroke="#34d399" strokeWidth="3" markerEnd="url(#arrowCovGreen)" />

                  <rect x="520" y="320" width="370" height="45" rx="6" fill="url(#gradCovGreen)" />
                  <text x="705" y="340" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    ⚡ Extra = 'Using index' (Zero Clustered Table Reads)
                  </text>
                  <text x="705" y="356" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    Sub-millisecond latency (0.35 ms) · Zero Disk Seeks
                  </text>
                </svg>
              </div>
            </div>

            {/* SVG 2: Deferred Join Architecture */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 7.2: Deferred Join (Late Row Lookup) Architecture for Deep Pagination
                </h3>
                <span className="text-xs text-slate-400 font-mono">Pagination Optimization</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 900 280"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "650px" }}
                >
                  {/* Step 1: Subquery Box */}
                  <rect x="40" y="40" width="380" height="200" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <text x="230" y="70" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Phase 1: Covering Index Subquery
                  </text>
                  <text x="230" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    SELECT id FROM students WHERE status='Active' LIMIT 100000, 20
                  </text>

                  <rect x="60" y="110" width="340" height="70" rx="6" fill="#1e293b" stroke="#0284c7" />
                  <text x="230" y="135" fill="#bae6fd" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Scans 100,020 Compact Index Keys in RAM
                  </text>
                  <text x="230" y="155" fill="#38bdf8" fontSize="10" textAnchor="middle">
                    Zero Base Table Seeks · Returns 20 Primary Keys ⚡
                  </text>

                  <text x="230" y="215" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Duration: ~3.8 ms (Pure Index Memory Scan)
                  </text>

                  {/* Join Arrow */}
                  <line x1="420" y1="140" x2="480" y2="140" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrowCovBlue)" />
                  <text x="450" y="130" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">JOIN PK</text>

                  {/* Step 2: Outer Join Box */}
                  <rect x="480" y="40" width="380" height="200" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="670" y="70" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">
                    Phase 2: Clustered Table Row Fetch
                  </text>
                  <text x="670" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
                    JOIN ON s.student_id = page.student_id
                  </text>

                  <rect x="500" y="110" width="340" height="70" rx="6" fill="#1e293b" stroke="#047857" />
                  <text x="670" y="135" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Fetches EXACTLY 20 Clustered Rows
                  </text>
                  <text x="670" y="155" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    Reads full columns only for the requested page ⚡
                  </text>

                  <text x="670" y="215" fill="#34d399" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Total Time: ~4.2 ms (vs 450 ms standard query!)
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Covering Index Strategy Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Explore real SQL implementations across direct filters, deferred joins, aggregations, and implicit PK patterns.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(coveringScenarios).map((key) => {
              const scenario = coveringScenarios[key];
              const isSelected = selectedCoveringPattern === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedCoveringPattern(key)}
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
                      scenario.badgeColor === "emerald" && "bg-emerald-400",
                      scenario.badgeColor === "cyan" && "bg-cyan-400",
                      scenario.badgeColor === "amber" && "bg-amber-400",
                      scenario.badgeColor === "rose" && "bg-rose-400"
                    )}
                  />
                  <span>{scenario.badge}</span>
                </button>
              );
            })}
          </div>

          {/* Workbench Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {coveringScenarios[selectedCoveringPattern].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  coveringScenarios[selectedCoveringPattern].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  coveringScenarios[selectedCoveringPattern].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  coveringScenarios[selectedCoveringPattern].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  coveringScenarios[selectedCoveringPattern].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {coveringScenarios[selectedCoveringPattern].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Execution Script &amp; EXPLAIN Plan:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {coveringScenarios[selectedCoveringPattern].sqlQuery}
              </pre>
            </div>

            {/* Metrics Comparison Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Physical Performance Benchmark:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Pattern Variant</th>
                      <th className="py-2.5 px-4">Index Used</th>
                      <th className="py-2.5 px-4">Extra Output</th>
                      <th className="py-2.5 px-4">Clustered Seeks</th>
                      <th className="py-2.5 px-4">Pages Read</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono">
                    {coveringScenarios[selectedCoveringPattern].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white">{row.patternName}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.indexUsed}</td>
                        <td className="py-3 px-4 text-amber-300 font-bold">{row.extraFlag}</td>
                        <td className="py-3 px-4 text-slate-300">{row.baseTableLookups}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{row.pagesRead}</td>
                        <td className="py-3 px-4 font-bold text-emerald-400">{row.latency}</td>
                        <td className="py-3 px-4 text-xs">{row.status}</td>
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
                {coveringScenarios[selectedCoveringPattern].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Deferred Joins */}
        <section id="deferred-joins" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. The Deferred Join Pattern for Deep Pagination
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How to paginate millions of rows with sub-5ms response times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400 font-mono">The Deep Offset Disaster</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                When you execute <code className="text-rose-300 font-mono">LIMIT 100000, 20</code>, MySQL must read 100,020 rows from disk, sort them, and discard the first 100,000 rows. On wide tables, this transfers gigabytes of useless row payloads into memory, causing 500ms+ API timeouts.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-rose-400 font-mono">
                100,020 Clustered Seeks &times; 2 KB Row Payload = ~200 MB Read!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">The Deferred Join Solution</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                By pushing the <code className="text-cyan-300 font-mono">LIMIT / OFFSET</code> into a subquery that only selects the Primary Key using a covering index, MySQL traverses compact 8-byte index keys in memory, fetching full row payloads only for the final 20 rows!
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-emerald-400 font-mono">
                Index Offset (4 ms) + 20 PK Row Seeks (0.2 ms) = 4.2 ms Total ⚡
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Systems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world covering index architectural interventions solving enterprise latency spikes.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Abhronila's Kolkata E-Commerce Order History */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Abhronila's Order History – Eliminating Base Table Reads on ₹ Invoice Queries
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  40x Throughput Boost
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Abhronila's retail portal in Kolkata, the user dashboard displayed order summaries (`order_id`, `order_date`, `total_amount_inr`, `status`) for customer accounts (`customer_id = 4501`). An index on `(customer_id)` caused 1,200 bookmark lookups per page.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Optimization Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Composite Covering Index covering customer filter + invoice projection:
CREATE INDEX idx_customer_orders_cov 
ON customer_orders (customer_id, order_date DESC, total_amount_inr, status);

-- Result: Extra = 'Using index' ⚡ (Zero base table reads; latency drops from 28 ms → 0.4 ms!)`}
                </pre>
              </div>
            </div>

            {/* Case 2: Debangshu & Susmita's Barrackpore Exam Ledger */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Debangshu &amp; Susmita – High-Throughput Merit List Aggregations
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Eliminating Temp Tables
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At the Barrackpore testing center, Debangshu and Susmita computed subject-wise toppers and average scores across 250,000 candidate records. The initial query triggered <code className="text-rose-400 font-mono">Using temporary; Using filesort</code>.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Covering Group-By Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Composite Covering Index on Grouping Key + Aggregate Arguments:
CREATE INDEX idx_exam_merit_cov 
ON exam_scores (subject_code, score_percentage, candidate_id);

-- Result: Extra = 'Using index' (Streams results in pre-sorted B+Tree order in 3.1 ms)!`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous indexing traps that harm write performance or break covering guarantees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Over-Indexing &amp; Wide Index Bloat
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Do not indiscriminately add 15 columns to an index. Wide indexes consume excessive Buffer Pool RAM and add write amplification to every `INSERT`, `UPDATE`, and `DELETE` operation.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Target covering indexes specifically for your top 5-10 high-QPS read queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Lazy SELECT * Anti-Pattern
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">SELECT *</code> instantly destroys covering index optimizations because unindexed columns force MySQL to execute clustered table bookmark lookups.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Explicitly project only the required columns in production queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Follow the 3-Tier Column Ordering Rule
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Order composite covering index columns logically:
                1) Equality `WHERE` columns first,
                2) Range `WHERE` / `ORDER BY` columns second,
                3) `SELECT`-only projection columns last.
              </p>
              <div className="text-xs text-slate-400">
                Maximizes B+Tree pruning while satisfying all output columns.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Exploit InnoDB's Implicit Primary Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never redundantly add the Primary Key column to the end of a secondary index definition. InnoDB physically appends it to every leaf node automatically.
              </p>
              <div className="text-xs text-slate-400">
                Keeps secondary index definitions clean and avoids wasting index metadata.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist &amp; Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for mastering Covering Indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Covering Index Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Extra = 'Using index'</strong> = True covering index (zero base table reads).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Implicit PK</strong> = Secondary index leaves always contain the Primary Key.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Deferred Join</strong> = Covering index subquery for sub-5ms deep pagination.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">No SELECT *</strong> = Always specify explicit columns to maintain covering status.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe the 20% tipping point...”</span>
                  When a query matches 30% of table rows, MySQL disables standard secondary index range scans and falls back to a table scan. A Covering Index eliminates this penalty because there are zero random bookmark lookups!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about COUNT(*)...”</span>
                  In MySQL, `COUNT(*)` automatically uses the smallest covering secondary index in the table rather than scanning the heavy clustered index.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 9: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering Covering Indexes, Deferred Joins, and Index-Only access.
            </p>
          </div>

          <FAQTemplate
            title="Covering Index Strategy FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Covering Index Strategy: Eliminating Disk Reads with Index-Only Access"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic7_note.txt"
          />

          <Teacher
            note="When you master Covering Indexes, you hold the key to building sub-millisecond database applications that can handle millions of users. The magic is in the `Extra` column: whenever you see `Using index`, you know that InnoDB didn't perform a single random seek on the base table. Use Deferred Joins for paginating large transaction tables, leverage the implicit Primary Key in secondary index leaf nodes, and remember to eliminate lazy `SELECT *` queries across your application code!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
