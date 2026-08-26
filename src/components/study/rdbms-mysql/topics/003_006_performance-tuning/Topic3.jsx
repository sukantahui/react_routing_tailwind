import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic3_files/topic3_questions";
import noteText from "./topic3_files/topic3_note.txt?raw";

/**
 * Topic3 – Interpreting Key EXPLAIN Output Columns: select_type, table, partitions, type, possible_keys, key, key_len, ref, rows, filtered, Extra
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on interpreting the 12 columns of MySQL EXPLAIN: select_type, table, partitions, type, possible_keys, key, key_len byte calculations, ref, rows, filtered %, and Extra flags.
 */
const Topic3 = () => {
  // Interactive Simulator State
  const [selectedColumnScenario, setSelectedColumnScenario] = useState("composite_key_len_math");

  const columnScenarios = {
    composite_key_len_math: {
      title: "1. key_len Byte Math: Verifying Composite Index Column Utilization",
      badge: "key_len Byte Calculation",
      badgeColor: "emerald",
      sqlQuery: `-- 🧮 COMPOSITE INDEX KEY_LEN VERIFICATION:
-- Table Definition (Character set: utf8mb4):
-- student_id INT NOT NULL (4 bytes)
-- city VARCHAR(30) NOT NULL (30 * 4 + 2 length bytes = 122 bytes)
-- status CHAR(1) NOT NULL (1 * 4 = 4 bytes)
-- INDEX idx_composite (student_id, city, status) &rarr; Total Max Length = 130 bytes!

-- Query 1 (Matches student_id ONLY):
EXPLAIN SELECT * FROM student_records WHERE student_id = 101;
-- 📊 key = 'idx_composite' | key_len = 4 (Uses Column 1 ONLY!)

-- Query 2 (Matches student_id AND city):
EXPLAIN SELECT * FROM student_records WHERE student_id = 101 AND city = 'Barrackpore';
-- 📊 key = 'idx_composite' | key_len = 126 (4 + 122 -&gt; Uses Columns 1 & 2!)

-- Query 3 (Matches student_id, city AND status):
EXPLAIN SELECT * FROM student_records WHERE student_id = 101 AND city = 'Barrackpore' AND status = 'A';
-- 📊 key = 'idx_composite' | key_len = 130 (4 + 122 + 4 -> USES FULL 3-COLUMN COMPOSITE INDEX! ⚡)`,
      resultRows: [
        { queryCase: "Query 1 (id = 101)", keyChosen: "idx_composite", keyLenOutput: "4 bytes", columnsUsed: "student_id (Col 1 only)", compositeEfficiency: "Partial Prefix (3%)", status: "Partial Match ⚠️" },
        { queryCase: "Query 2 (id + city)", keyChosen: "idx_composite", keyLenOutput: "126 bytes", columnsUsed: "student_id + city (Cols 1 & 2)", compositeEfficiency: "2 Columns (97%)", status: "Good Match ✅" },
        { queryCase: "Query 3 (id + city + status)", keyChosen: "idx_composite", keyLenOutput: "130 bytes", columnsUsed: "student_id + city + status (All 3)", compositeEfficiency: "Full Composite (100%)", status: "Optimal Match ⚡" },
      ],
      explanation:
        "`key_len` reveals the exact number of bytes utilized from the index. In `utf8mb4`, calculating $4 + (30 \\times 4 + 2) + 4 = 130$ bytes proves whether MySQL is using all columns of a composite index or only a partial leftmost prefix.",
    },
    filtered_join_multiplier: {
      title: "2. filtered % & Downstream Rows: Calculating Join Multipliers",
      badge: "filtered % & Rows",
      badgeColor: "cyan",
      sqlQuery: `-- 📊 FILTERED % & INTERMEDIATE JOIN ROW VOLUME:
EXPLAIN SELECT s.name, e.grade 
FROM students s 
JOIN exam_scores e ON s.student_id = e.student_id 
WHERE s.city = 'Barrackpore' AND s.age > 20;

-- 🔍 12-Column Output:
-- table | type | key      | rows  | filtered | Extra
-- s     | ref  | idx_city | 1,000 | 10.00    | Using where
-- e     | ref  | idx_sid  | 5     | 100.00   | NULL

-- 🧮 DOWNSTREAM JOIN CALCULATION:
-- 1. Table 's' examines 1,000 rows matching city = 'Barrackpore'.
-- 2. filtered = 10.00% means only 10% satisfy age > 20!
-- 3. Effective Rows passed to next join = 1,000 * 10% = 100 students!
-- 4. Table 'e' will be probed for 100 students * 5 rows = 500 total lookups!`,
      resultRows: [
        { queryCase: "Table s (students)", keyChosen: "idx_city", keyLenOutput: "122 bytes", columnsUsed: "1,000 Examined", compositeEfficiency: "filtered = 10.00%", status: "100 Effective Rows ⚡" },
        { queryCase: "Table e (exam_scores)", keyChosen: "idx_sid", keyLenOutput: "4 bytes", columnsUsed: "5 Per Student", compositeEfficiency: "filtered = 100.00%", status: "500 Total Inner Probes ✅" },
      ],
      explanation:
        "The `filtered` percentage estimates how many rows survive non-index `WHERE` filters. Multiplying $\rows \\times (\filtered / 100)$ calculates the exact intermediate row volume fed into downstream join iterators.",
    },
    select_type_dependent_subquery: {
      title: "3. select_type Danger: DEPENDENT SUBQUERY vs DERIVED",
      badge: "select_type Comparison",
      badgeColor: "rose",
      sqlQuery: `-- 🚨 SELECT_TYPE: DEPENDENT SUBQUERY (O(N) Killer):
EXPLAIN SELECT s.name, 
  (SELECT MAX(amount) FROM fee_payments WHERE student_id = s.student_id) 
FROM students s;

-- 📋 EXPLAIN Result:
-- id | select_type        | table        | type | rows
-- 1  | PRIMARY            | s            | ALL  | 10,000
-- 2  | DEPENDENT SUBQUERY | fee_payments | ref  | 1
-- 💥 DISASTER: Subquery 2 runs 10,000 SEPARATE TIMES! (O(N) Execution Loop!)

-- ⚡ OPTIMIZATION FIX: REWRITE AS DERIVED TABLE / JOIN:
EXPLAIN SELECT s.name, f.max_fee 
FROM students s 
LEFT JOIN (SELECT student_id, MAX(amount) AS max_fee FROM fee_payments GROUP BY student_id) f 
ON s.student_id = f.student_id;
-- 📊 id=1 (PRIMARY), id=2 (DERIVED) -> Executes ONCE in a single pass!`,
      resultRows: [
        { queryCase: "Correlated Subquery", keyChosen: "idx_student_id", keyLenOutput: "4 bytes", columnsUsed: "select_type = DEPENDENT SUBQUERY", compositeEfficiency: "Runs 10,000x Loops", status: "O(N) Bottleneck 🚨" },
        { queryCase: "Rewritten Derived Join", keyChosen: "idx_student_id", keyLenOutput: "4 bytes", columnsUsed: "select_type = DERIVED", compositeEfficiency: "Runs 1x Single Pass", status: "O(1) Pass Succeeded ⚡" },
      ],
      explanation:
        "`select_type = 'DEPENDENT SUBQUERY'` indicates a correlated subquery executing repeatedly for every outer row. Refactoring into a `DERIVED` table or `JOIN` converts $O(N)$ repetitive lookups into a single pass.",
    },
    extra_flags_diagnostic: {
      title: "4. Extra Column Diagnostics: Covering Index vs Filesort / Temp Table",
      badge: "Extra Flags Diagnostic",
      badgeColor: "amber",
      sqlQuery: `-- 🔍 EXTRA COLUMN FLAGS COMPARISON:
-- Case A: COVERING INDEX (Optimal):
EXPLAIN SELECT student_id, city FROM student_records WHERE student_id BETWEEN 100 AND 200;
-- 📊 Extra = 'Using index' (Zero base table disk reads! Pure B+Tree leaf read! ⚡)

-- Case B: SERVER-SIDE FILTER:
EXPLAIN SELECT * FROM student_records WHERE student_id = 101 AND phone LIKE '983%';
-- 📊 Extra = 'Using where' (Phone evaluated by server after index lookup)

-- Case C: SLOW FILESORT & TEMPORARY TABLE:
EXPLAIN SELECT city, COUNT(*) FROM student_records WHERE age > 18 GROUP BY city ORDER BY COUNT(*);
-- 📊 Extra = 'Using where; Using temporary; Using filesort' ⚠️`,
      resultRows: [
        { queryCase: "Case A: Covering Index", keyChosen: "idx_id_city", keyLenOutput: "126 bytes", columnsUsed: "Direct B+Tree Leaf", compositeEfficiency: "Zero Base Table Disk I/O", status: "Using index ⚡" },
        { queryCase: "Case B: Predicate Filter", keyChosen: "PRIMARY", keyLenOutput: "4 bytes", columnsUsed: "Server Layer Filter", compositeEfficiency: "Evaluates Non-Indexed Col", status: "Using where" },
        { queryCase: "Case C: Temp Sort", keyChosen: "idx_age", keyLenOutput: "1 byte", columnsUsed: "Disk/Mem Temp Buffer", compositeEfficiency: "Un-indexed Group & Sort", status: "Using temporary; filesort ⚠️" },
      ],
      explanation:
        "The `Extra` column reveals critical engine operations: `Using index` signifies a high-speed Covering Index; `Using where` indicates server-layer filtering; `Using temporary; Using filesort` flags expensive sorting buffers.",
    },
  };

  const navItems = [
    { id: "columns-overview", label: "1. The 12 EXPLAIN Columns" },
    { id: "keylen-math", label: "2. key_len Byte Mathematics" },
    { id: "svg-diagrams", label: "3. Columns Anatomy & Byte SVGs" },
    { id: "interactive-sandbox", label: "4. Live Column Workbench" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Best Practices" },
    { id: "checklist", label: "7. Student Checklist" },
    { id: "faq-section", label: "8. FAQs (30 Questions)" },
    { id: "teacher-notes", label: "9. Teacher's Note & Raw Script" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-900 pb-20">
      {/* Header Banner */}
      <header className="border-b border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 text-cyan-400 text-sm font-semibold tracking-wider uppercase mb-2">
            <span>Module 003_006</span>
            <span>•</span>
            <span>Topic 3 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              EXPLAIN Diagnostics
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Interpreting Key EXPLAIN Output Columns
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the diagnostic interpretation of all 12 EXPLAIN columns: <code className="text-cyan-300 font-mono">select_type</code>, <code className="text-cyan-300 font-mono">table</code>, <code className="text-cyan-300 font-mono">type</code>, <code className="text-cyan-300 font-mono">key</code>, <code className="text-cyan-300 font-mono">key_len</code> byte mathematics, <code className="text-cyan-300 font-mono">ref</code>, <code className="text-cyan-300 font-mono">rows</code>, <code className="text-cyan-300 font-mono">filtered %</code>, and critical <code className="text-cyan-300 font-mono">Extra</code> flags.
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
        {/* SECTION 1: The 12 EXPLAIN Columns */}
        <section id="columns-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The 12 Columns of Traditional EXPLAIN
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental schema diagnostic metrics provided in tabular execution plans.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Column 1-3</span>
              <h3 className="font-bold text-white">id, select_type, table</h3>
              <p className="text-slate-300 text-xs">Query block sequence ID, query complexity (`SIMPLE`/`PRIMARY`/`DERIVED`), and target table.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Column 4-6</span>
              <h3 className="font-bold text-white">partitions, type, possible_keys</h3>
              <p className="text-slate-300 text-xs">Partition pruning target, access method (`const` $\to$ `ALL`), and candidate indexes.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-amber-400 font-bold text-xs uppercase">Column 7-9</span>
              <h3 className="font-bold text-white">key, key_len, ref</h3>
              <p className="text-slate-300 text-xs">Actually chosen index, byte length utilized (verifies composite key usage), and join references.</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Column 10-12</span>
              <h3 className="font-bold text-white">rows, filtered, Extra</h3>
              <p className="text-slate-300 text-xs">Examined row estimates, % passing remaining filters, and operational flags (`Using index`, `Using filesort`).</p>
            </div>
          </div>
        </section>

        {/* SECTION 2: key_len Byte Mathematics */}
        <section id="keylen-math" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. key_len Byte Mathematics (utf8mb4)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Calculating exact index byte sizes to verify full vs partial composite index coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-cyan-400 font-mono">Integer Types</h3>
              <ul className="text-slate-300 text-xs space-y-1">
                <li>• <code className="text-cyan-300 font-mono">TINYINT NOT NULL</code> = 1 byte</li>
                <li>• <code className="text-cyan-300 font-mono">INT NOT NULL</code> = 4 bytes</li>
                <li>• <code className="text-cyan-300 font-mono">BIGINT NOT NULL</code> = 8 bytes</li>
                <li>• <strong className="text-amber-300 font-mono">+1 byte</strong> if column is <code className="text-amber-300 font-mono">NULL</code>!</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-emerald-400 font-mono">Character Types (utf8mb4)</h3>
              <ul className="text-slate-300 text-xs space-y-1">
                <li>• Multiplier: <strong className="text-emerald-300">4 bytes per character</strong></li>
                <li>• <code className="text-emerald-300 font-mono">CHAR(N) NOT NULL</code> = $N \times 4$ bytes</li>
                <li>• <code className="text-emerald-300 font-mono">VARCHAR(N) NOT NULL</code> = $N \times 4 + 2$ bytes</li>
                <li>• <strong className="text-amber-300 font-mono">+1 byte</strong> if column is <code className="text-amber-300 font-mono">NULL</code>!</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="font-bold text-amber-400 font-mono">Date / Time Types</h3>
              <ul className="text-slate-300 text-xs space-y-1">
                <li>• <code className="text-amber-300 font-mono">DATE NOT NULL</code> = 3 bytes</li>
                <li>• <code className="text-amber-300 font-mono">DATETIME NOT NULL</code> = 5 bytes</li>
                <li>• <code className="text-amber-300 font-mono">TIMESTAMP NOT NULL</code> = 4 bytes</li>
                <li>• <strong className="text-amber-300 font-mono">+1 byte</strong> if column is <code className="text-amber-300 font-mono">NULL</code>!</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: 12 Columns Grid &amp; Composite key_len Math
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 12-column execution structure and composite index byte dissection.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: 12 Columns Overview */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> The 12 Columns of MySQL Traditional EXPLAIN
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Row of 4 grouped blocks */}
                  <g>
                    {/* Group 1 */}
                    <rect x="20" y="30" width="190" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="115" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">1. IDENTIFIERS</text>
                    <rect x="30" y="70" width="170" height="40" rx="4" fill="#0f172a" />
                    <text x="115" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">id · select_type · table</text>
                    <text x="115" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Execution hierarchy &amp; target</text>
                  </g>

                  <g>
                    {/* Group 2 */}
                    <rect x="225" y="30" width="190" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="320" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. ACCESS TYPE &amp; KEYS</text>
                    <rect x="235" y="70" width="170" height="40" rx="4" fill="#022c22" />
                    <text x="320" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">type · possible_keys · key</text>
                    <text x="320" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Join efficiency &amp; index chosen</text>
                  </g>

                  <g>
                    {/* Group 3 */}
                    <rect x="430" y="30" width="190" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="525" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">3. BYTES &amp; REFS</text>
                    <rect x="440" y="70" width="170" height="40" rx="4" fill="#1e293b" />
                    <text x="525" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">key_len · ref</text>
                    <text x="525" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Composite usage &amp; constants</text>
                  </g>

                  <g>
                    {/* Group 4 */}
                    <rect x="635" y="30" width="195" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="732" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">4. VOLUME &amp; FLAGS</text>
                    <rect x="645" y="70" width="175" height="40" rx="4" fill="#1e293b" />
                    <text x="732" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">rows · filtered · Extra</text>
                    <text x="732" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Row estimates &amp; sorting/temp</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: key_len Composite Math */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-emerald-400 font-mono">Diagram B:</span> Composite Index key_len Byte Mathematics (utf8mb4)
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Col 1 */}
                  <g>
                    <rect x="30" y="30" width="230" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">Col 1: student_id INT</text>
                    <rect x="40" y="70" width="210" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">4 Bytes (NOT NULL)</text>
                    <text x="145" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Prefix match: key_len = 4</text>
                  </g>

                  {/* Col 2 */}
                  <g>
                    <rect x="290" y="30" width="260" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="420" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Col 2: city VARCHAR(30)</text>
                    <rect x="300" y="70" width="240" height="40" rx="4" fill="#022c22" />
                    <text x="420" y="88" fill="#a7f3d0" fontSize="8 font-mono" textAnchor="middle">30 * 4 + 2 = 122 Bytes</text>
                    <text x="420" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">Cumulative: key_len = 126 (4 + 122)</text>
                  </g>

                  {/* Col 3 */}
                  <g>
                    <rect x="580" y="30" width="240" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="2" />
                    <text x="700" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Col 3: status CHAR(1)</text>
                    <rect x="590" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="700" y="88" fill="#fbbf24" fontSize="8 font-mono font-bold" textAnchor="middle">1 * 4 = 4 Bytes</text>
                    <text x="700" y="102" fill="#fde68a" fontSize="7 font-bold" textAnchor="middle">⚡ FULL INDEX: key_len = 130 Bytes</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 260 80 L 290 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 580 80" stroke="#10b981" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive EXPLAIN Columns Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test composite index key_len byte calculations, filtered % downstream join multipliers, select_type subquery diagnostics, and Extra flags live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(columnScenarios).map(([key, item]) => {
              const isActive = selectedColumnScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedColumnScenario(key)}
                  className={clsx(
                    "p-4 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                    isActive
                      ? "bg-indigo-950/60 border-cyan-500 shadow-lg shadow-cyan-950/40 scale-[1.02]"
                      : "bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850"
                  )}
                &gt;
                  <div>
                    <span
                      className={clsx(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "cyan" && "bg-cyan-950 text-cyan-400 border border-cyan-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Column Test" : "○ Run Column Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{columnScenarios[selectedColumnScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{columnScenarios[selectedColumnScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                12-Column Evaluator
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>SQL Diagnostic Script</span>
                <span className="text-emerald-400">EXPLAIN Column Trace</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {columnScenarios[selectedColumnScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">Query Case / Column</th>
                    <th className="py-3 px-4 text-white">Chosen Key</th>
                    <th className="py-3 px-4 text-emerald-400 font-bold">key_len Byte Length</th>
                    <th className="py-3 px-4 text-amber-400">Columns / Volume Used</th>
                    <th className="py-3 px-4 text-slate-300">Efficiency / Multiplier</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {columnScenarios[selectedColumnScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.queryCase}</td>
                      <td className="py-3 px-4 font-mono text-white">{row.keyChosen}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono font-bold">{row.keyLenOutput}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.columnsUsed}</td>
                      <td className="py-3 px-4 text-slate-300 font-sans">{row.compositeEfficiency}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Good") || row.status.includes("Pass") || row.status.includes("Effective") || row.status.includes("Probes") || row.status.includes("index")
                              ? "bg-emerald-950 text-emerald-400 border-emerald-800"
                              : "bg-rose-950 text-rose-400 border-rose-800"
                          )}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* SECTION 5: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Production Industry Case Studies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Diagnosing partial composite index matches and correlated subquery loops in Barrackpore.
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
                  Detecting Partial Composite Index Truncation via key_len in Barrackpore
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore Student Verification Portal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui audited a slow student search API on an index `(student_id, roll_no, exam_center)`: The query was `WHERE student_id = 101 AND exam_center = 'Kolkata_01'`. The developer assumed the 3-column composite index was working because `key = 'idx_student_roll_center'` appeared in `EXPLAIN`. Inspecting <code className="text-emerald-300 font-mono">key_len = 4</code> proved that because `roll_no` was skipped in the `WHERE` clause, MySQL only used the first column (`student_id`), completely ignoring `exam_center`! Reordering the composite index to `(student_id, exam_center, roll_no)` increased `key_len` to <strong>126 bytes</strong>, speeding up the search by <strong>85x</strong>!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- Before: Leftmost prefix rule blocked 3rd column:
-- Index: (student_id, roll_no, exam_center)
-- Query: WHERE student_id = 101 AND exam_center = 'Kolkata_01' &rarr; key_len = 4 bytes only!

-- After Performance Tuning Fix: Matching query predicate order:
ALTER TABLE student_records DROP INDEX idx_student_roll_center;
ALTER TABLE student_records ADD INDEX idx_id_center_roll (student_id, exam_center, roll_no);
-- Now key_len = 126 bytes! Both columns utilized!`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Never assume a composite index is fully used without checking key_len and eliminate DEPENDENT SUBQUERY loops.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Assuming key Name Guarantees Full Index Usage
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Just because the `key` column shows your composite index does not mean all columns are utilized! You MUST verify `key_len` byte math to ensure subsequent columns were not truncated by the leftmost prefix rule.
              </p>
              <div className="text-xs text-slate-400">
                Fix: Add column byte sizes together to verify full composite key coverage!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Eliminate select_type = DEPENDENT SUBQUERY
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Whenever `select_type = 'DEPENDENT SUBQUERY'` appears in your execution plan, immediately rewrite the correlated subquery into a `LEFT JOIN` or `DERIVED` table to convert $O(N)$ repeated lookups into a single pass.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees $O(1)$ single-pass join execution rather than per-row repeated subquery calls.
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Student Checklist */}
        <section id="checklist" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Mini Checklist & Senior Developer Hints
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Key takeaways for Interpreting EXPLAIN Output Columns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> 12 Columns Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><code className="text-cyan-300 font-mono">type</code>: Aim for <code className="text-emerald-300 font-mono">const</code> / <code className="text-emerald-300 font-mono">ref</code> / <code className="text-emerald-300 font-mono">range</code>; eliminate <code className="text-rose-400 font-mono">ALL</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><code className="text-cyan-300 font-mono">key_len</code>: Use byte math to verify full composite key coverage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><code className="text-cyan-300 font-mono">filtered %</code>: Downstream rows = $rows \times (filtered/100)$.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><code className="text-cyan-300 font-mono">Extra</code>: Seek <strong className="text-emerald-300">Using index</strong>; eliminate <strong className="text-rose-400">Using filesort/temporary</strong>.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Remember utf8mb4 4-byte math...”</span>
                  In `utf8mb4`, every character in a `VARCHAR(50)` requires $50 \times 4 + 2 = 202$ bytes. Add 1 extra byte if the column is nullable!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about ref = const...”</span>
                  When `ref` shows `const`, it proves the optimizer treats the predicate as a fixed constant lookup, enabling maximum B+Tree seek speed!
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: FAQ Template */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              8. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comprehensive reference questions covering all 12 tabular EXPLAIN columns in MySQL 8.0: select_type, table, partitions, type, possible_keys, key, key_len byte calculations, ref, rows, filtered %, and Extra flags.
            </p>
          </div>

          <FAQTemplate
            title="EXPLAIN Output Columns FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note &amp; Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Interpreting Key EXPLAIN Output Columns: select_type, table, partitions, type, possible_keys, key, key_len, ref, rows, filtered, Extra"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic3_note.txt"
          />

          <Teacher
            note="To read an execution plan like a master architect, you must look beyond just the `key` column! Always verify `key_len` with exact byte math to prove that your composite index isn't being truncated by the leftmost prefix rule. Watch out for `select_type = 'DEPENDENT SUBQUERY'`—it is a silent killer in nested queries. And always strive for `Extra: Using index` (Covering Index), which eliminates physical table lookups entirely!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic3;
