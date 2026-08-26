import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Generated Columns: Virtual Columns vs Stored Columns on JSON Fields
 * Module: 004_002_character-sets-collations-and-data-types
 *
 * @component
 * @returns {JSX.Element} Interactive generated columns workbench: mastering computed column definitions, comparing VIRTUAL (0-byte disk storage) vs STORED (materialized), bridging JSON documents to relational B+ tree secondary indexes, and applying UNIQUE and CHECK constraints to JSON in MySQL.
 */
const Topic10 = () => {
  // Interactive Generated Column State
  const [selectedGenPhase, setSelectedGenPhase] = useState("phase1_virtual_vs_stored");

  const genPhases = {
    phase1_virtual_vs_stored: {
      phaseNumber: "Phase 1: VIRTUAL vs STORED",
      title: "1. VIRTUAL vs STORED Generated Columns: Architecture & Storage",
      badge: "Storage Engine Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 🔬 VIRTUAL VS STORED GENERATED COLUMNS:
CREATE TABLE ecommerce_orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    unit_price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    
    -- 1. VIRTUAL Column (Default): Consumes 0 Bytes on Disk!
    -- Computed in RAM on-the-fly during SELECT queries:
    total_bill_virtual DECIMAL(12, 2) 
      GENERATED ALWAYS AS (unit_price * quantity) VIRTUAL,
      
    -- 2. STORED Column: Physically written to disk row payload!
    -- Computed upon INSERT / UPDATE:
    total_bill_stored DECIMAL(12, 2) 
      GENERATED ALWAYS AS (unit_price * quantity) STORED
);

-- BOTH can be indexed with B+ Trees in InnoDB! ⚡`,
      metricsTable: [
        { feature: "Disk Space", virtualCol: "0 Bytes (Not stored in row) ✅", storedCol: "Materialized in row payload" },
        { feature: "Computation Time", virtualCol: "At READ time in CPU RAM", storedCol: "At WRITE time on INSERT/UPDATE" },
        { feature: "Write Overhead", virtualCol: "Zero CPU / Disk I/O cost", storedCol: "Evaluates & writes bytes on disk" },
        { feature: "InnoDB Indexing", virtualCol: "Fully Indexable in B+ Tree! ⚡", storedCol: "Fully Indexable in B+ Tree! ⚡" }
      ],
      explanation:
        "`VIRTUAL` generated columns consume 0 bytes of disk space in the main table row and are evaluated dynamically in RAM. `STORED` generated columns write computed bytes physically to disk upon insertion. In MySQL InnoDB, both can be indexed directly with B+ tree indexes."
    },
    phase2_json_extraction: {
      phaseNumber: "Phase 2: JSON Extraction",
      title: "2. Bridging JSON Fields to Relational Columns",
      badge: "Relational Bridge",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌉 EXTRACTING JSON FIELDS INTO TYPED VIRTUAL COLUMNS:
CREATE TABLE student_registrations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    student_payload JSON NOT NULL,
    
    -- Extracting student name as a typed VARCHAR:
    student_name VARCHAR(100) 
      GENERATED ALWAYS AS (student_payload &rarr; &gt;'$.name') VIRTUAL,
      
    -- Extracting city location:
    city VARCHAR(50) 
      GENERATED ALWAYS AS (student_payload &rarr;&rarr; '$.address.city') VIRTUAL,
      
    -- Extracting numeric age:
    student_age TINYINT UNSIGNED 
      GENERATED ALWAYS AS (CAST(student_payload->>'$.age' AS UNSIGNED)) VIRTUAL
);

-- Query using clean relational column names:
SELECT id, student_name, city, student_age 
FROM student_registrations
WHERE city = 'Barrackpore' AND student_age &ge; 18;`,
      metricsTable: [
        { extractedCol: "student_name", sourceType: "student_payload->>'$.name'", relationalType: "VARCHAR(100)", role: "Clean relational column interface" },
        { extractedCol: "city", sourceType: "student_payload->>'$.address.city'", relationalType: "VARCHAR(50)", role: "Enables standard relational filters" },
        { extractedCol: "student_age", sourceType: "CAST(payload->>'$.age' AS INT)", relationalType: "TINYINT UNSIGNED", role: "Enables numeric range comparisons" },
        { extractedCol: "Storage Cost", sourceType: "VIRTUAL Modifier", relationalType: "0 Extra Bytes", role: "Zero table row bloat" }
      ],
      explanation:
        "Generated columns create a clean relational abstraction layer over flexible JSON documents. Extracting properties like `city` or `student_age` allows applications to write standard SQL queries with strong type safety while consuming zero additional disk space."
    },
    phase3_indexing_bridge: {
      phaseNumber: "Phase 3: Indexing Bridge",
      title: "3. Indexing JSON Data via VIRTUAL Generated Columns",
      badge: "B+ Tree Index Seek",
      badgeColor: "amber",
      sqlSnippet: `-- ⚡ ACCELERATING JSON QUERIES FROM O(N) TO O(log N):
-- Step 1: Add a secondary index on the VIRTUAL column:
ALTER TABLE student_registrations 
ADD INDEX idx_student_city (city);

-- Step 2: Query using either the virtual column OR original JSON path:
EXPLAIN SELECT * FROM student_registrations 
WHERE student_payload->>'$.address.city' = 'Barrackpore';

-- MYSQL QUERY OPTIMIZER MAGIC:
-- The optimizer automatically recognizes that 'student_payload->>$.address.city'
-- matches the expression of 'city' and EXECUTES A FAST INDEX REF SEEK! 🚀
-- [type: ref | key: idx_student_city | rows: 1]`,
      metricsTable: [
        { metric: "Unindexed JSON Query", queryType: "Full Table Scan", complexity: "O(N) Scans entire table ⏳", diskIo: "High disk I/O reads" },
        { metric: "Indexed Virtual Column", queryType: "B+ Tree Seek", complexity: "O(log N) Instant lookup ⚡", diskIo: "1-2 page memory seeks" },
        { metric: "Optimizer Rewrite", queryType: "Automatic Match", complexity: "Matches original path syntax", diskIo: "Transparent performance gain" },
        { metric: "Index Storage", queryType: "Secondary Leaf Pages", complexity: "Stores only extracted values", diskIo: "Compact B+ tree pages" }
      ],
      explanation:
        "Indexing a `VIRTUAL` column materializes only the extracted scalar values inside the secondary B+ tree index. The MySQL optimizer automatically routes queries using both the virtual column name and the original JSON path to the B+ tree index, accelerating queries from $O(N)$ full table scans to $O(\\log N)$ seeks."
    },
    phase4_relational_constraints: {
      phaseNumber: "Phase 4: Constraints on JSON",
      title: "4. Enforcing Relational Constraints (UNIQUE, NOT NULL, CHECK) on JSON",
      badge: "Schema Integrity",
      badgeColor: "rose",
      sqlSnippet: `-- 🔒 ENFORCING RELATIONAL CONSTRAINTS ON JSON DOCUMENTS:
CREATE TABLE bank_customers (
    customer_id INT PRIMARY KEY AUTO_INCREMENT,
    account_doc JSON NOT NULL,
    
    -- 1. UNIQUE Constraint on JSON Field:
    -- Guarantees account_number inside JSON is globally unique!
    account_number VARCHAR(30) 
      GENERATED ALWAYS AS (account_doc->>'$.account_no') VIRTUAL,
    UNIQUE INDEX uq_account_no (account_number),
    
    -- 2. NOT NULL Constraint on JSON Field:
    -- Rejects documents missing the 'account_no' key!
    mandatory_email VARCHAR(150) 
      GENERATED ALWAYS AS (account_doc->>'$.email') VIRTUAL NOT NULL,
      
    -- 3. CHECK Constraint on JSON Field:
    -- Validates that customer age inside JSON is at least 18:
    customer_age INT GENERATED ALWAYS AS (CAST(account_doc->>'$.age' AS SIGNED)) VIRTUAL,
    CONSTRAINT chk_adult_age CHECK (customer_age >= 18)
);`,
      metricsTable: [
        { constraintType: "UNIQUE Index", target: "account_doc->>'$.account_no'", behavior: "Rejects duplicate account numbers across JSON docs 🔒" },
        { constraintType: "NOT NULL", target: "account_doc->>'$.email'", behavior: "Rejects JSON documents missing the email property" },
        { constraintType: "CHECK Constraint", target: "account_doc->>'$.age'", behavior: "Enforces business validation rules (age >= 18)" },
        { constraintType: "Foreign Key", target: "STORED Generated Column", behavior: "Can participate in relational foreign key constraints" }
      ],
      explanation:
        "Generated columns allow you to apply strict relational constraints (`UNIQUE`, `NOT NULL`, `CHECK`) directly to nested JSON properties, bringing complete relational integrity and validation to schema-less document data."
    }
  };

  const navItems = [
    { id: "gen-overview", label: "1. Generated Columns Overview" },
    { id: "bridge-diagram", label: "2. Indexing Bridge Diagram" },
    { id: "interactive-workbench", label: "3. Generated Columns Workbench" },
    { id: "case-studies", label: "4. Real-World Case Studies" },
    { id: "pitfalls-rules", label: "5. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "6. Generated Columns Checklist" },
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
            <span>Topic 10 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Generated Columns
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Generated Columns: Virtual Columns vs Stored Columns on JSON Fields
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the architectural bridge between schema-less JSON and relational indexing: compare zero-byte <code className="text-emerald-400 font-mono">VIRTUAL</code> columns with materialized <code className="text-cyan-400 font-mono">STORED</code> columns, build B+ tree secondary indexes on nested JSON keys, and enforce <code className="text-rose-400 font-mono">UNIQUE</code> and <code className="text-amber-400 font-mono">CHECK</code> constraints.
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
        {/* SECTION 1: Generated Columns Overview */}
        <section id="gen-overview" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Architecture of Generated Columns
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How computed columns bridge flexible JSON documents to high-speed relational B+ tree indexing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">1. VIRTUAL (Default)</span>
              <h3 className="font-bold text-white">0 Bytes on Disk</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Evaluated in RAM on read. Zero write overhead. Fully indexable in InnoDB!
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">2. STORED</span>
              <h3 className="font-bold text-white">Materialized on Disk</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Computed on INSERT/UPDATE. Physically stored in table row payload.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase">3. B+ Tree Indexing</span>
              <h3 className="font-bold text-white">O(log N) JSON Seeks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Secondary index stores scalar values in B+ tree. Instant point lookups.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">4. JSON Constraints</span>
              <h3 className="font-bold text-white">UNIQUE &amp; CHECK</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enforces uniqueness, NOT NULL, and CHECK validation rules on JSON fields.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Bridge Diagram */}
        <section id="bridge-diagram" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Visual Anatomy: The JSON-to-Relational Indexing Bridge
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How VIRTUAL generated columns extract JSON keys and materialize them into secondary B+ trees.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-cyan-300">
                Figure 10.1: VIRTUAL Generated Column Indexing Pipeline
              </h3>
              <span className="text-xs text-slate-400 font-mono">Indexing Architecture</span>
            </div>

            <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
              <svg
                viewBox="0 0 950 360"
                className="w-full max-w-4xl mx-auto block font-sans"
                style={{ minWidth: "700px" }}
              >
                <defs>
                  <marker id="arrGenCyan" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                    <polygon points="0 0, 8 4, 0 8" fill="#38bdf8" />
                  </marker>
                </defs>

                {/* Box 1: Clustered Table Row */}
                <rect x="20" y="40" width="270" height="280" rx="8" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                <text x="155" y="70" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">
                  1. CLUSTERED ROW (TABLE DATA)
                </text>
                <line x1="20" y1="85" x2="290" y2="85" stroke="#334155" />

                <rect x="35" y="105" width="240" height="50" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="127" fill="#bae6fd" fontSize="10" fontWeight="bold">id: 101 (Primary Key)</text>
                <text x="45" y="143" fill="#94a3b8" fontSize="9">Standard INT column</text>

                <rect x="35" y="165" width="240" height="75" rx="4" fill="#1e293b" stroke="#0284c7" />
                <text x="45" y="187" fill="#bae6fd" fontSize="10" fontWeight="bold">profile (Native JSON):</text>
                <text x="45" y="203" fill="#34d399" fontSize="9">{"{\"city\": \"Barrackpore\", ...}"}</text>
                <text x="45" y="223" fill="#94a3b8" fontSize="8">Stored in internal binary format</text>

                <rect x="35" y="250" width="240" height="45" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="45" y="270" fill="#34d399" fontSize="10" fontWeight="bold">city VIRTUAL: [0 BYTES DISK] ✅</text>
                <text x="45" y="283" fill="#94a3b8" fontSize="8">Not stored in table row!</text>

                {/* Box 2: Virtual Column Extraction Engine */}
                <rect x="325" y="40" width="280" height="280" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                <text x="465" y="70" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">
                  2. VIRTUAL EXTRACTION ENGINE
                </text>
                <line x1="325" y1="85" x2="605" y2="85" stroke="#334155" />

                <rect x="340" y="105" width="250" height="60" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="350" y="127" fill="#a7f3d0" fontSize="10" fontWeight="bold">Formula Definition:</text>
                <text x="350" y="145" fill="#34d399" fontSize="10">AS (profile-&gt;&gt;'$.city') VIRTUAL</text>

                <rect x="340" y="175" width="250" height="70" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="350" y="197" fill="#a7f3d0" fontSize="10" fontWeight="bold">In-Memory Read Evaluation:</text>
                <text x="350" y="213" fill="#bae6fd" fontSize="9">Evaluates dynamically in RAM</text>
                <text x="350" y="230" fill="#34d399" fontSize="9">Zero write I/O penalty!</text>

                <rect x="340" y="255" width="250" height="40" rx="4" fill="#1e293b" stroke="#047857" />
                <text x="350" y="278" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">
                  Typed SQL VARCHAR(50) Interface
                </text>

                {/* Box 3: Secondary B+ Tree Index */}
                <rect x="640" y="40" width="290" height="280" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="785" y="70" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">
                  3. SECONDARY B+ TREE INDEX
                </text>
                <line x1="640" y1="85" x2="930" y2="85" stroke="#334155" />

                <rect x="655" y="105" width="260" height="70" rx="4" fill="#1e293b" stroke="#d97706" />
                <text x="665" y="127" fill="#fde68a" fontSize="10" fontWeight="bold">INDEX idx_city (city):</text>
                <text x="665" y="145" fill="#34d399" fontSize="10">['Barrackpore'] &rarr; PK: 101</text>
                <text x="665" y="160" fill="#bae6fd" fontSize="9">['Kolkata'] &rarr; PK: 102</text>

                <rect x="655" y="185" width="260" height="65" rx="4" fill="#1e293b" stroke="#10b981" />
                <text x="665" y="205" fill="#34d399" fontSize="10" fontWeight="bold">Query Execution:</text>
                <text x="665" y="220" fill="#bae6fd" fontSize="9">WHERE city = 'Barrackpore'</text>
                <text x="665" y="235" fill="#34d399" fontSize="9" fontWeight="bold">O(log N) Instant B+ Tree Seek! ⚡</text>

                <path d="M 290 140 L 340 140" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrGenCyan)" />
                <path d="M 605 140 L 655 140" fill="none" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrGenCyan)" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 3: Generated Columns Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Interactive Generated Columns Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Select a phase to inspect VIRTUAL definitions, JSON extraction formulas, B+ tree indexing, and relational constraints.
            </p>
          </div>

          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(genPhases).map((key) => {
              const ph = genPhases[key];
              const isSelected = selectedGenPhase === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedGenPhase(key)}
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
                {genPhases[selectedGenPhase].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  genPhases[selectedGenPhase].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  genPhases[selectedGenPhase].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  genPhases[selectedGenPhase].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  genPhases[selectedGenPhase].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {genPhases[selectedGenPhase].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Generated Column DDL &amp; Query Script:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {genPhases[selectedGenPhase].sqlSnippet}
              </pre>
            </div>

            {/* Metrics Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Generated Column Specifications:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Feature / Column</th>
                      <th className="py-2.5 px-4">Virtual / Source Definition</th>
                      <th className="py-2.5 px-4">Stored / Target Behavior</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {genPhases[selectedGenPhase].metricsTable.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">
                          {row.feature || row.extractedCol || row.metric || row.constraintType}
                        </td>
                        <td className="py-3 px-4 text-cyan-300">
                          {row.virtualCol || row.sourceType || row.queryType || row.target}
                        </td>
                        <td className="py-3 px-4 text-slate-300 font-sans">
                          {row.storedCol || row.relationalType || row.complexity || row.behavior}
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
                {genPhases[selectedGenPhase].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Real-World Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Real-World Generated Columns Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Accelerating document search queries and enforcing JSON uniqueness in West Bengal systems.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Index Speedup */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Transforming 10-Second Candidate Scans to 2ms in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  5,000x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, searching 2 million candidate profiles by city (<code>{"WHERE profile &rarr; &gt;'$.city' = 'Barrackpore'"}</code>) took 11.2 seconds due to unindexed full table scans. Adding a `VIRTUAL` generated column for `city` and attaching a standard B+ tree index reduced query response times to 2 milliseconds with zero disk space increase on the main table rows.
              </p>
            </div>

            {/* Case 2: Abhronila & Debangshu's Unique JSON Constraint */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Enforcing Unique PAN Numbers in Kolkata Fintech Document Store
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Unique Integrity Enforced
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, a financial verification system storing KYC data in native JSON needed to prevent duplicate Indian PAN card registrations. Creating a `VIRTUAL` generated column on <code>{"kyc_doc &rarr; &gt;'$.pan_number'"}</code> with a `UNIQUE INDEX` enforced database-level uniqueness, preventing duplicate account creations with 100% ACID reliability.
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
              Avoid non-deterministic expressions and unnecessary STORED column disk overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using STORED When VIRTUAL is Sufficient
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using `STORED` instead of `VIRTUAL` writes duplicate bytes to table rows, swelling tablespace size and slowing down write transactions unnecessarily.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Default to VIRTUAL for indexing JSON fields.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Non-Deterministic Functions in Expressions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attempting to use `NOW()`, `RAND()`, or subqueries in generated column expressions triggers Error 3763 because calculations must be strictly deterministic.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use only deterministic functions and column references.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Index VIRTUAL Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Attach standard B+ tree indexes to `VIRTUAL` generated columns to enable instant $O(\\log N)$ seeks on nested JSON document properties.
              </p>
              <div className="text-xs text-slate-400">
                Stores extracted values in secondary index B+ trees only.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Apply NOT NULL &amp; CHECK Constraints
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Add `NOT NULL` or `CHECK` constraints to generated columns to enforce schema requirements and range validations on incoming JSON payloads.
              </p>
              <div className="text-xs text-slate-400">
                Rejects malformed or incomplete documents at write time.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 6: Generated Columns Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. DBA Generated Columns Checklist
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key checks to verify optimal computed column and index design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Computed Column Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">VIRTUAL by Default</strong> = Use `VIRTUAL` for JSON field extraction to save disk space.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Index Hot Keys</strong> = Add secondary indexes to generated columns used in `WHERE`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Deterministic Expressions</strong> = Verify formulas do not call `NOW()` or `RAND()`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Relational Constraints</strong> = Add `UNIQUE` or `CHECK` to validate JSON fields.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe Optimizer Index Rewrites...”</span>
                  Even if your legacy application code executes <code>{"WHERE profile &rarr; &gt;'$.city' = 'Barrackpore'"}</code>, MySQL 8.0's optimizer will automatically recognize that an index on <code>{"city AS (profile &rarr; &gt;'$.city') VIRTUAL"}</code> exists and use the B+ tree index!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about 0 Disk Space...”</span>
                  `VIRTUAL` generated columns cost literally 0 extra bytes in the main table data pages! You get all the benefits of clean relational typing and B+ tree search speeds without tablespace bloat!
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
              Comprehensive reference questions covering Generated Columns, Virtual vs Stored, and JSON Indexing.
            </p>
          </div>

          <FAQTemplate
            title="Generated Columns (VIRTUAL vs STORED) FAQs"
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
            title="Generated Columns: Virtual Columns vs Stored Columns on JSON Fields"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic10_note.txt"
          />

          <Teacher
            note="Generated columns are the crown jewel of MySQL's hybrid relational-document architecture. Many developers mistakenly believe that storing data in JSON means giving up B+ tree indexing and relational constraints. By defining a VIRTUAL generated column on a nested JSON property (costing 0 bytes on disk) and creating a secondary index, you achieve instant O(log N) lookup speeds, enforce UNIQUE constraints, and write clean SQL queries on schema-less document data!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
