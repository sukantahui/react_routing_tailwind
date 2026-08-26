import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic13_files/topic13_questions";
import noteText from "./topic13_files/topic13_note.txt?raw";

/**
 * Topic13 – Creating, Dropping, and Inspecting Indexes (SHOW INDEX FROM ...)
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on index DDL management, SHOW INDEX inspection, Invisible Indexes, and Performance Schema audits.
 */
const Topic13 = () => {
  // Interactive Simulator State
  const [selectedInspectionView, setSelectedInspectionView] = useState("show_index_inspection");

  const inspectionViews = {
    show_index_inspection: {
      title: "1. Complete SHOW INDEX FROM students Inspection",
      badge: "Catalog Introspection",
      badgeColor: "cyan",
      sqlQuery: `-- Inspect all indexes defined on the student table:
SHOW INDEX FROM student_master;

-- Returns detailed catalog metadata:
-- Table | Non_unique | Key_name | Seq_in_index | Column_name | Cardinality | Index_type | Visible`,
      resultRows: [
        { keyName: "PRIMARY", nonUnique: "0 (Unique)", col: "student_id", seq: "1", card: "100,000", type: "BTREE", visible: "YES" },
        { keyName: "idx_uq_aadhaar", nonUnique: "0 (Unique)", col: "aadhaar_number", seq: "1", card: "100,000", type: "BTREE", visible: "YES" },
        { keyName: "idx_cohort", nonUnique: "1 (Secondary)", col: "centre_city", seq: "1", card: "3", type: "BTREE", visible: "YES" },
        { keyName: "idx_cohort", nonUnique: "1 (Secondary)", col: "course_stream", seq: "2", card: "18", type: "BTREE", visible: "YES" },
        { keyName: "idx_cohort", nonUnique: "1 (Secondary)", col: "admission_status", seq: "3", card: "45", type: "BTREE", visible: "YES" },
      ],
      explanation:
        "`SHOW INDEX` reveals non-uniqueness flags, column sequence ordering within composite indexes, sampling cardinality estimates, and optimizer visibility.",
    },
    invisible_index_management: {
      title: "2. Invisible Indexes: Zero-Risk Index Decommissioning (MySQL 8.0+)",
      badge: "Zero-Risk Decommission",
      badgeColor: "amber",
      sqlQuery: `-- Step 1: Hide the index from query optimizer without deleting it:
ALTER TABLE student_master ALTER INDEX idx_student_phone INVISIBLE;

-- Status: Index B-Tree is still maintained on writes, but optimizer ignores it!
-- Monitor queries for 48 hours. If no regressions occur:
-- Step 2: Permanently drop:
DROP INDEX idx_student_phone ON student_master;

-- (Or re-enable instantly if queries slow down):
-- ALTER TABLE student_master ALTER INDEX idx_student_phone VISIBLE;`,
      resultRows: [
        { keyName: "idx_student_phone", nonUnique: "1", col: "phone_number", seq: "1", card: "98,000", type: "BTREE", visible: "NO (Invisible)" },
        { keyName: "idx_student_email", nonUnique: "0", col: "email_address", seq: "1", card: "100,000", type: "BTREE", visible: "YES" },
      ],
      explanation:
        "Invisible indexes allow testing the impact of index removal safely in production. If a query slows down, toggling it back to VISIBLE is instantaneous.",
    },
    information_schema_audit: {
      title: "3. System-Wide Auditing via information_schema.STATISTICS",
      badge: "Database-Wide Audit",
      badgeColor: "emerald",
      sqlQuery: `-- Query index definitions across all tables in the database:
SELECT 
    TABLE_NAME,
    INDEX_NAME,
    NON_UNIQUE,
    COLUMN_NAME,
    SEQ_IN_INDEX,
    CARDINALITY,
    INDEX_TYPE,
    IS_VISIBLE
FROM information_schema.STATISTICS
WHERE TABLE_SCHEMA = 'acco_tax_academy_db'
ORDER BY TABLE_NAME, INDEX_NAME, SEQ_IN_INDEX;`,
      resultRows: [
        { keyName: "PRIMARY", nonUnique: "0", col: "enrollment_id", seq: "1", card: "250,000", type: "BTREE", visible: "YES" },
        { keyName: "idx_fk_student", nonUnique: "1", col: "student_id", seq: "1", card: "100,000", type: "BTREE", visible: "YES" },
        { keyName: "idx_fk_course", nonUnique: "1", col: "course_id", seq: "1", card: "45", type: "BTREE", visible: "YES" },
      ],
      explanation:
        "Querying `information_schema.STATISTICS` allows DBAs to audit index coverage, identify redundant composite prefixes, and find missing foreign key indexes programmatically.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Index DDL Syntax" },
    { id: "show-index-columns", label: "2. SHOW INDEX Columns Decoded" },
    { id: "svg-diagrams", label: "3. Metadata & Invisible SVGs" },
    { id: "interactive-sandbox", label: "4. Live Inspection Workbench" },
    { id: "invisible-indexes", label: "5. Invisible Indexes Workflow" },
    { id: "case-studies", label: "6. Production Case Studies" },
    { id: "pitfalls-rules", label: "7. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "8. Student Checklist" },
    { id: "faq-section", label: "9. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "10. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 13 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Index Administration
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Creating, Dropping, and Inspecting Indexes
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the complete DDL lifecycle of database indexes. Decode every column of{" "}
            <code className="text-cyan-300 font-mono font-bold">SHOW INDEX FROM table</code>, safely decommission indexes with{" "}
            <code className="text-amber-300 font-mono font-bold">Invisible Indexes</code>, and refresh cardinality statistics.
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
        {/* SECTION 1: Index DDL Syntax */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Complete Index DDL Command Reference
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The standard SQL statements for creating, altering, and dropping indexes in MySQL.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">Creating & Adding Indexes</h3>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
{`-- Standard Secondary Index:
CREATE INDEX idx_city ON students (centre_city);

-- Composite Index:
CREATE INDEX idx_stream ON students (course_stream, admission_status);

-- Unique Index:
CREATE UNIQUE INDEX idx_uq_email ON students (email_address);

-- Via ALTER TABLE:
ALTER TABLE students ADD INDEX idx_phone (phone_number);`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-rose-400">Dropping & Altering Indexes</h3>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-rose-300 overflow-x-auto">
{`-- Dropping Secondary Index:
DROP INDEX idx_city ON students;

-- Dropping via ALTER TABLE:
ALTER TABLE students DROP INDEX idx_phone;

-- Dropping Primary Key:
ALTER TABLE students DROP PRIMARY KEY;

-- Renaming Index (MySQL 5.7+):
ALTER TABLE students RENAME INDEX idx_old TO idx_new;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 2: SHOW INDEX Columns Decoded */}
        <section id="show-index-columns" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. SHOW INDEX FROM Columns Decoded
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Understanding the meaning of each field in MySQL's index introspection catalog.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                <tr>
                  <th className="py-3.5 px-4 text-cyan-400">Catalog Column</th>
                  <th className="py-3.5 px-4 text-white">Possible Values</th>
                  <th className="py-3.5 px-4 text-emerald-400">Architectural Significance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Non_unique</td>
                  <td className="py-3 px-4 font-mono">0 or 1</td>
                  <td className="py-3 px-4">0 = UNIQUE / PRIMARY KEY; 1 = Standard secondary index allowing duplicate keys.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Seq_in_index</td>
                  <td className="py-3 px-4 font-mono">1, 2, 3...</td>
                  <td className="py-3 px-4">Column sequence number inside a composite multi-column index.</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Cardinality</td>
                  <td className="py-3 px-4 font-mono">Integer Estimate</td>
                  <td className="py-3 px-4">Estimated count of distinct values in the index (updated via <code className="text-cyan-300 font-mono">ANALYZE TABLE</code>).</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-cyan-300 font-mono">Visible</td>
                  <td className="py-3 px-4 font-mono">'YES' or 'NO'</td>
                  <td className="py-3 px-4">Controls whether MySQL Query Optimizer can use the index during execution.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: SHOW INDEX Breakdown & Invisible Index Lifecycle
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              See the structural output of SHOW INDEX and the safe decommissioning lifecycle of Invisible Indexes.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: SHOW INDEX Structural Layout */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> `SHOW INDEX FROM students` Metadata Breakdown
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 200" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Table Header */}
                  <g>
                    <rect x="20" y="20" width="810" height="35" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                    <text x="70" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Key_name</text>
                    <text x="180" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Non_unique</text>
                    <text x="290" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Seq_in_index</text>
                    <text x="410" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Column_name</text>
                    <text x="540" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Cardinality</text>
                    <text x="650" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Index_type</text>
                    <text x="750" y="42" fill="#38bdf8" fontSize="9" fontWeight="bold">Visible</text>
                  </g>

                  {/* Row 1: PRIMARY */}
                  <g>
                    <rect x="20" y="60" width="810" height="30" rx="3" fill="#064e3b" />
                    <text x="70" y="80" fill="#a7f3d0" fontSize="8 font-mono">PRIMARY</text>
                    <text x="180" y="80" fill="#a7f3d0" fontSize="8 font-mono">0 (Unique)</text>
                    <text x="290" y="80" fill="#a7f3d0" fontSize="8 font-mono">1</text>
                    <text x="410" y="80" fill="#a7f3d0" fontSize="8 font-mono">student_id</text>
                    <text x="540" y="80" fill="#a7f3d0" fontSize="8 font-mono">100,000</text>
                    <text x="650" y="80" fill="#a7f3d0" fontSize="8 font-mono">BTREE</text>
                    <text x="750" y="80" fill="#34d399" fontSize="8 font-mono font-bold">YES</text>
                  </g>

                  {/* Row 2: Composite Col 1 */}
                  <g>
                    <rect x="20" y="95" width="810" height="30" rx="3" fill="#1e1b4b" />
                    <text x="70" y="115" fill="#c7d2fe" fontSize="8 font-mono">idx_cohort</text>
                    <text x="180" y="115" fill="#c7d2fe" fontSize="8 font-mono">1 (Secondary)</text>
                    <text x="290" y="115" fill="#c7d2fe" fontSize="8 font-mono font-bold">1</text>
                    <text x="410" y="115" fill="#c7d2fe" fontSize="8 font-mono">centre_city</text>
                    <text x="540" y="115" fill="#c7d2fe" fontSize="8 font-mono">3</text>
                    <text x="650" y="115" fill="#c7d2fe" fontSize="8 font-mono">BTREE</text>
                    <text x="750" y="115" fill="#34d399" fontSize="8 font-mono font-bold">YES</text>
                  </g>

                  {/* Row 3: Composite Col 2 */}
                  <g>
                    <rect x="20" y="130" width="810" height="30" rx="3" fill="#1e1b4b" />
                    <text x="70" y="150" fill="#c7d2fe" fontSize="8 font-mono">idx_cohort</text>
                    <text x="180" y="150" fill="#c7d2fe" fontSize="8 font-mono">1 (Secondary)</text>
                    <text x="290" y="150" fill="#c7d2fe" fontSize="8 font-mono font-bold">2</text>
                    <text x="410" y="150" fill="#c7d2fe" fontSize="8 font-mono">course_stream</text>
                    <text x="540" y="150" fill="#c7d2fe" fontSize="8 font-mono">18</text>
                    <text x="650" y="150" fill="#c7d2fe" fontSize="8 font-mono">BTREE</text>
                    <text x="750" y="150" fill="#34d399" fontSize="8 font-mono font-bold">YES</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Invisible Index Safe Decommissioning Lifecycle */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-amber-400 font-mono">Diagram B:</span> Zero-Risk Index Decommissioning Lifecycle
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Step 1 */}
                  <g>
                    <rect x="30" y="30" width="220" height="90" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="140" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">1. Production Index</text>
                    <rect x="45" y="70" width="190" height="25" rx="3" fill="#022c22" />
                    <text x="140" y="86" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">Visible: YES (Active Queries)</text>
                  </g>

                  {/* Step 2 */}
                  <g>
                    <rect x="310" y="30" width="230" height="90" rx="6" fill="#1e1b4b" stroke="#f59e0b" strokeWidth="2" />
                    <text x="425" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. ALTER INDEX INVISIBLE</text>
                    <rect x="325" y="70" width="200" height="25" rx="3" fill="#0f172a" />
                    <text x="425" y="86" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Optimizer Ignores (48h Test)</text>
                  </g>

                  {/* Step 3 */}
                  <g>
                    <rect x="600" y="30" width="220" height="90" rx="6" fill="#450a0a" stroke="#ef4444" strokeWidth="1.5" />
                    <text x="710" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. DROP INDEX</text>
                    <rect x="615" y="70" width="190" height="25" rx="3" fill="#1e293b" />
                    <text x="710" y="86" fill="#f87171" fontSize="8 font-mono" textAnchor="middle">Permanent Safe Removal</text>
                  </g>

                  {/* Flow Arrows */}
                  <path d="M 250 75 L 310 75" stroke="#10b981" strokeWidth="2" />
                  <path d="M 540 75 L 600 75" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Index Introspection Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test `SHOW INDEX` metadata decoding, Invisible Index toggles, and system-wide audits live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(inspectionViews).map(([key, item]) => {
              const isActive = selectedInspectionView === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedInspectionView(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                >
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Inspection" : "○ Run Inspection"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{inspectionViews[selectedInspectionView].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{inspectionViews[selectedInspectionView].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Catalog Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Introspection Statement</span>
                <span className="text-emerald-400">InnoDB Statistics Sampling</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {inspectionViews[selectedInspectionView].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Key_name</th>
                    <th className="py-3 px-4 text-white">Non_unique</th>
                    <th className="py-3 px-4 text-emerald-400">Column_name</th>
                    <th className="py-3 px-4 text-cyan-400">Seq</th>
                    <th className="py-3 px-4 text-indigo-400">Cardinality</th>
                    <th className="py-3 px-4 text-amber-400">Index_type</th>
                    <th className="py-3 px-4 text-emerald-400">Visible</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {inspectionViews[selectedInspectionView].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.keyName}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.nonUnique}</td>
                      <td className="py-3 px-4 text-emerald-300">{row.col}</td>
                      <td className="py-3 px-4 text-white">{row.seq}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.card}</td>
                      <td className="py-3 px-4 text-slate-300">{row.type}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.visible.includes("YES")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-amber-950 text-amber-400 border-amber-800"
                          )}
                        >
                          {row.visible}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Invisible Indexes Workflow */}
        <section id="invisible-indexes" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. The 3-Step Invisible Index Decommissioning Workflow
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How senior database administrators prevent accidental production outages when cleaning up dead indexes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-amber-400 font-bold uppercase font-mono">Step 1: Set INVISIBLE</span>
              <p className="text-slate-300 leading-relaxed">
                <code className="text-cyan-300 font-mono">ALTER INDEX idx INVISIBLE;</code> hides the index from the query optimizer without deleting the physical tree pages.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold uppercase font-mono">Step 2: Monitor for 48 Hours</span>
              <p className="text-slate-300 leading-relaxed">
                Observe slow query logs and application response times. If any query regresses, re-enable in 0.1 ms with <code className="text-emerald-300 font-mono">VISIBLE</code>.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
              <span className="text-emerald-400 font-bold uppercase font-mono">Step 3: Permanent Drop</span>
              <p className="text-slate-300 leading-relaxed">
                If no performance regressions occur across peak traffic cycles, run <code className="text-rose-300 font-mono">DROP INDEX idx</code> to permanently reclaim disk space.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world index administration, cardinality sampling, and zero-downtime removals.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case Study 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-emerald-950 text-emerald-400 font-mono text-xs border border-emerald-800">
                    CASE 01
                  </span>
                  Auditing Index Health across Academy Portals
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audits the student registration tables for Mamata, Susmita, Abhronila, and Debangshu using <code className="text-cyan-300 font-mono">SHOW INDEX FROM student_master</code> and runs <code className="text-emerald-300 font-mono">ANALYZE TABLE</code> to refresh stale cardinality estimates, preventing the optimizer from choosing slow table scans!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Refreshing index statistics in catalog:
ANALYZE TABLE student_master;

-- Inspecting refreshed cardinality numbers:
SHOW INDEX FROM student_master;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  Prefix Indexing on Wide Indian Addresses
                </h3>
                <span className="text-xs text-slate-400 font-mono">Wide String Optimization</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Instead of indexing a 500-character residential address column, creating a prefix index on the first 35 characters saves 80% B-Tree memory while retaining 98% index selectivity.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE INDEX idx_address_prefix ON student_master (residential_address(35));`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid AUTO_INCREMENT key deletion errors and stale cardinality traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Dropping PRIMARY KEY on AUTO_INCREMENT Column
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code className="text-rose-300 font-mono">ALTER TABLE t DROP PRIMARY KEY;</code> on an AUTO_INCREMENT column throws <strong>Error 1075</strong> because MySQL requires every AUTO_INCREMENT column to be indexed!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Remove AUTO_INCREMENT attribute with MODIFY COLUMN before dropping the key.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Refresh Statistics after Bulk Loads
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                After inserting millions of rows via CSV, run <code className="text-emerald-400 font-mono">ANALYZE TABLE</code> to update index cardinality. Otherwise, the optimizer may use stale statistics and choose full table scans.
              </p>
              <div className="text-xs text-slate-400">
                Ensures the query optimizer has accurate row distribution statistics.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for exams and technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Student Exam Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">SHOW INDEX FROM table;</code> displays complete index metadata.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">Non_unique = 0</code> indicates a Primary Key or UNIQUE index.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">ANALYZE TABLE</code> recalculates sampled index cardinality.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Invisible Indexes allow testing index decommissioning safely in MySQL 8.0+.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Invisible Indexes...”</span>
                  Never drop an index immediately on production. Always mark it <code className="text-cyan-300 font-mono">INVISIBLE</code> first, monitor your application for 48 hours, and only drop if no queries complain!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about prefix indexing...”</span>
                  For columns like URLs, emails, or addresses, specify a prefix length <code className="text-cyan-300 font-mono">col(30)</code> to keep B-Tree leaf pages small and increase page fan-out!
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
              Comprehensive reference questions covering index DDL syntax, SHOW INDEX introspection, Cardinality sampling, Invisible Indexes, and Performance Schema auditing.
            </p>
          </div>

          <FAQTemplate
            title="Creating, Dropping & Inspecting Indexes FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 10: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              10. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Creating, Dropping, and Inspecting Indexes (SHOW INDEX FROM ...)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic13_note.txt"
          />

          <Teacher
            note="Teach students that SHOW INDEX is their X-ray vision into the database. Look at Non_unique to check uniqueness, Seq_in_index to verify composite ordering, and Cardinality to ensure the optimizer has fresh statistics. And always teach the MySQL 8.0 Invisible Index workflow — it saves DBAs from disastrous production outages when cleaning up legacy tables!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic13;
