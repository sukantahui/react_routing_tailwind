import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic8_files/topic8_questions";
import noteText from "./topic8_files/topic8_note.txt?raw";

/**
 * Topic8 – Sargable Queries: Avoiding Function Wrapping on Indexed Columns in WHERE Clauses
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and optimization workbench on MySQL Sargability (Search Argument Able): avoiding function wrapping, refactoring date intervals, eliminating implicit type casting, isolating mathematical expressions, and leveraging MySQL 8.0 functional indexes.
 */
const Topic8 = () => {
  // Interactive Simulator State
  const [selectedSargableScenario, setSelectedSargableScenario] = useState("date_function_refactor");

  const sargableScenarios = {
    date_function_refactor: {
      title: "1. Date / Time Functions: Transforming YEAR() into Explicit Date Ranges",
      badge: "Date Function Refactoring",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ NON-SARGABLE (YEAR() function wraps indexed column):
-- Forces MySQL to compute YEAR() on all 100,000 rows -> Full Table Scan (ALL)!
SELECT student_id, name, registration_date 
FROM student_records 
WHERE YEAR(registration_date) = 2026;

-- 📋 Non-Sargable EXPLAIN:
-- type = 'ALL', key = NULL, rows = 100000, Extra = 'Using where' (78.0 ms) 🚨

-- ⚡ SARGABLE REFACTOR (Isolate raw column with boundary dates):
-- Allows B+Tree to perform an index range probe directly on 'registration_date'!
SELECT student_id, name, registration_date 
FROM student_records 
WHERE registration_date >= '2026-01-01 00:00:00' 
  AND registration_date < '2027-01-01 00:00:00';

-- 📋 Sargable EXPLAIN:
-- type = 'range', key = 'idx_reg_date', rows = 1200, Extra = 'Using index condition'
-- ⚡ Execution time drops from 78.0 ms -> 0.65 ms (120x faster)!`,
      resultRows: [
        {
          variant: "Non-Sargable WHERE YEAR(reg_date) = 2026",
          accessType: "ALL (Table Scan)",
          indexUsed: "NULL (Ignored)",
          rowsExamined: "100,000 rows",
          cpuLoad: "100,000 Function Calls 🚨",
          latency: "78.00 ms",
          status: "Severe CPU & I/O Waste ❌"
        },
        {
          variant: "Sargable WHERE reg_date >= '2026-01-01'...",
          accessType: "range (Index Range Scan)",
          indexUsed: "idx_reg_date",
          rowsExamined: "1,200 rows",
          cpuLoad: "0 Function Calls ⚡",
          latency: "0.65 ms ⚡",
          status: "120x Faster Range Scan ✅"
        }
      ],
      explanation:
        "The B+Tree index stores literal datetime timestamps. Wrapping `registration_date` in `YEAR()` forces MySQL to invoke the function row-by-row on every record. Converting the predicate into half-open date boundaries (`>= '2026-01-01' AND < '2027-01-01'`) allows direct B+Tree range navigation."
    },
    implicit_type_cast: {
      title: "2. Implicit Type Conversion: VARCHAR Column vs Numeric Literal",
      badge: "Implicit Type Casting",
      badgeColor: "rose",
      sqlQuery: `-- ❌ NON-SARGABLE (VARCHAR column compared against integer):
-- Table has column: phone_number VARCHAR(15) with index: idx_phone (phone_number)
-- Because 9830012345 is an integer, MySQL converts column via CAST(phone_number AS DOUBLE)!
SELECT student_id, name, phone_number 
FROM student_records 
WHERE phone_number = 9830012345; -- Notice: Unquoted integer!

-- 📋 Non-Sargable EXPLAIN:
-- type = 'ALL', key = NULL, rows = 100000, Extra = 'Using where' (82.0 ms) 🚨

-- ⚡ SARGABLE REFACTOR (Pass quoted string literal):
SELECT student_id, name, phone_number 
FROM student_records 
WHERE phone_number = '9830012345'; -- Quoted string matches column type!

-- 📋 Sargable EXPLAIN:
-- type = 'ref', key = 'idx_phone', rows = 1, Extra = NULL
-- ⚡ Execution time: 0.04 ms (2,000x faster)!`,
      resultRows: [
        {
          variant: "Unquoted Literal (WHERE phone = 9830012345)",
          accessType: "ALL (Table Scan)",
          indexUsed: "NULL (Ignored)",
          rowsExamined: "100,000 rows",
          cpuLoad: "100,000 String-to-Double Casts 🚨",
          latency: "82.00 ms",
          status: "Implicit Cast Disaster ❌"
        },
        {
          variant: "Quoted Literal (WHERE phone = '9830012345')",
          accessType: "ref (Const / Unique Probe)",
          indexUsed: "idx_phone",
          rowsExamined: "1 row",
          cpuLoad: "0 Conversions ⚡",
          latency: "0.04 ms ⚡",
          status: "Instant 0.04ms Lookup ✅"
        }
      ],
      explanation:
        "MySQL type conversion rules dictate that comparing a string column to an integer forces the string column to be cast to a number on every row (`CAST(phone_number AS DOUBLE)`), destroying the index. Quoting the literal ensures matching types and instant B+Tree seeks."
    },
    arithmetic_isolation: {
      title: "3. Arithmetic Expressions on Indexed Columns: Algebraic Reduction",
      badge: "Arithmetic Column Isolation",
      badgeColor: "amber",
      sqlQuery: `-- ❌ NON-SARGABLE (Arithmetic operation applied directly to indexed column):
-- Query: Finding students with tuition balance exceeding ₹10,000 including 18% GST:
SELECT student_id, name, balance_fee 
FROM student_records 
WHERE balance_fee * 1.18 > 10000;

-- 📋 Non-Sargable EXPLAIN:
-- type = 'ALL', key = NULL, rows = 100000, Extra = 'Using where' (64.0 ms) 🚨

-- ⚡ SARGABLE REFACTOR (Algebraic Reduction - Isolate column on left side):
-- Move the constant multiplication to the right side of the comparison:
SELECT student_id, name, balance_fee 
FROM student_records 
WHERE balance_fee > 10000 / 1.18; -- Evaluated ONCE at parse time: 8474.58

-- 📋 Sargable EXPLAIN:
-- type = 'range', key = 'idx_balance_fee', rows = 650, Extra = 'Using index condition'
-- ⚡ Execution time: 0.42 ms (150x faster)!`,
      resultRows: [
        {
          variant: "WHERE balance_fee * 1.18 > 10000",
          accessType: "ALL (Table Scan)",
          indexUsed: "NULL (Ignored)",
          rowsExamined: "100,000 rows",
          cpuLoad: "100,000 Multiplications on CPU",
          latency: "64.00 ms",
          status: "Unnecessary Table Scan ❌"
        },
        {
          variant: "WHERE balance_fee > 10000 / 1.18",
          accessType: "range (Index Range Scan)",
          indexUsed: "idx_balance_fee",
          rowsExamined: "650 rows",
          cpuLoad: "1 Constant Division at Parse Time ⚡",
          latency: "0.42 ms ⚡",
          status: "Instant Range Seek ✅"
        }
      ],
      explanation:
        "Applying arithmetic (`+`, `-`, `*`, `/`) to the column forces MySQL to evaluate the mathematical expression for every row. Moving the calculation to the right-hand constant side allows MySQL to compute the scalar value once and probe the B+Tree directly."
    },
    string_functional_index: {
      title: "4. String Manipulation & Functional Indexes in MySQL 8.0+",
      badge: "Functional Indexes & LIKE",
      badgeColor: "cyan",
      sqlQuery: `-- ❌ NON-SARGABLE (SUBSTRING function on application code):
SELECT student_id, name, student_code 
FROM student_records 
WHERE SUBSTRING(student_code, 1, 3) = 'BKP';

-- ⚡ REFACTOR PATTERN A (Rewrite with Sargable Prefix LIKE):
-- Fixed prefix allows B+Tree to navigate lower/upper bounds:
SELECT student_id, name, student_code 
FROM student_records 
WHERE student_code LIKE 'BKP%';

-- ⚡ REFACTOR PATTERN B (MySQL 8.0+ Functional Key Part Index):
-- If application code CANNOT be modified, index the expression directly!
CREATE INDEX idx_student_code_prefix ON student_records ((SUBSTRING(student_code, 1, 3)));

-- Result: Queries using SUBSTRING(student_code, 1, 3) = 'BKP' now use the index!`,
      resultRows: [
        {
          variant: "SUBSTRING(student_code, 1, 3) = 'BKP' (No Functional Index)",
          accessType: "ALL (Table Scan)",
          indexUsed: "NULL (Ignored)",
          rowsExamined: "100,000 rows",
          cpuLoad: "100,000 Substring Computations",
          latency: "71.00 ms",
          status: "Table Scan Bottleneck ❌"
        },
        {
          variant: "Sargable LIKE 'BKP%' or Functional Index",
          accessType: "range / ref",
          indexUsed: "idx_student_code / idx_student_code_prefix",
          rowsExamined: "320 rows",
          cpuLoad: "Direct B+Tree Search ⚡",
          latency: "0.38 ms ⚡",
          status: "Sub-millisecond Search ✅"
        }
      ],
      explanation:
        "String functions like `SUBSTRING()`, `LOWER()`, and `CONCAT()` destroy standard index lookups. You can either refactor the query using sargable prefix patterns (`LIKE 'BKP%'`) or create a MySQL 8.0+ Functional Index on the exact expression."
    }
  };

  const navItems = [
    { id: "sargability-concept", label: "1. What is Sargability?" },
    { id: "sargable-matrix", label: "2. Sargable vs Non-Sargable Matrix" },
    { id: "svg-architecture", label: "3. Visual Execution Pathways" },
    { id: "interactive-workbench", label: "4. Live Sargable Workbench" },
    { id: "functional-indexes", label: "5. MySQL 8.0 Functional Indexes" },
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
            <span>Topic 8 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Query Refactoring &amp; Sargability
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Sargable Queries: Avoiding Function Wrapping on Indexed Columns
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the art of writing <strong>SARGable</strong> (Search Argument Able) SQL: eliminate hidden function calls, isolate algebraic expressions, prevent implicit type casting, and transform slow full table scans into instant sub-millisecond B+Tree index seeks.
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
        {/* SECTION 1: What is Sargability? */}
        <section id="sargability-concept" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a SARGable Query?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The fundamental principle of index-friendly SQL predicates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                Origin &amp; Meaning
              </span>
              <h3 className="font-bold text-white text-base">Search Argument ABLE</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Coined by IBM relational researchers, a predicate is <strong>Sargable</strong> if the query engine can use an index directly to probe lower/upper bounds via B+Tree binary search rather than evaluating every single row in the tablespace.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                The Non-Sargable Trap
              </span>
              <h3 className="font-bold text-white text-base">Function Wrapping</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Applying any function (e.g. `YEAR()`, `LOWER()`, `SUBSTRING()`, `IFNULL()`) or mathematical operator (`+`, `*`) directly to an indexed column disables B+Tree traversal, forcing a 100x slower Full Table Scan (`ALL`).
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                The Golden Rule
              </span>
              <h3 className="font-bold text-white text-base">Naked Column Isolation</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Always keep the indexed column completely "naked" and isolated on the left side of the comparison: <code className="text-cyan-300 font-mono">column_name OPERATOR constant_expression</code>.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Sargable vs Non-Sargable Matrix */}
        <section id="sargable-matrix" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Sargable vs Non-Sargable Transformation Cheat Sheet
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Common SQL anti-patterns and their high-performance sargable refactorings.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Pattern Category</th>
                  <th className="py-3 px-4 text-rose-400">❌ Non-Sargable Anti-Pattern (Table Scan)</th>
                  <th className="py-3 px-4 text-emerald-400">⚡ Sargable Refactoring (Index Seek)</th>
                  <th className="py-3 px-4">Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Date Year</td>
                  <td className="py-3 px-4 text-rose-300">WHERE YEAR(reg_date) = 2026</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE reg_date &gt;= '2026-01-01' AND reg_date &lt; '2027-01-01'</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">120x</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Date Day / Today</td>
                  <td className="py-3 px-4 text-rose-300">WHERE DATE(created_at) = CURDATE()</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE created_at &gt;= CURDATE() AND created_at &lt; CURDATE() + INTERVAL 1 DAY</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">95x</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Math on Column</td>
                  <td className="py-3 px-4 text-rose-300">WHERE balance_fee * 1.18 &gt; 10000</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE balance_fee &gt; 10000 / 1.18</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">150x</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Type Casting</td>
                  <td className="py-3 px-4 text-rose-300">WHERE phone = 9830012345 (VARCHAR)</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE phone = '9830012345' (Quoted)</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">2,000x</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">String Prefix</td>
                  <td className="py-3 px-4 text-rose-300">WHERE SUBSTRING(code, 1, 3) = 'BKP'</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE code LIKE 'BKP%'</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">180x</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-white font-sans">Nullable Fallback</td>
                  <td className="py-3 px-4 text-rose-300">WHERE IFNULL(discount, 0) &gt; 10</td>
                  <td className="py-3 px-4 text-emerald-300">WHERE discount &gt; 10</td>
                  <td className="py-3 px-4 font-bold text-emerald-400">80x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Execution Pathways */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Non-Sargable vs Sargable Execution Pathways
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing CPU function evaluation on every row vs instant B+Tree index navigation.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Non-Sargable vs Sargable Pipeline */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 8.1: Physical Data Flow: Row-by-Row Function Evaluation vs B+Tree Binary Search
                </h3>
                <span className="text-xs text-slate-400 font-mono">Query Execution Engine</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 400"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradSargGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradSargRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowSargGreen" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowSargRed" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Left Box: Non-Sargable */}
                  <rect x="30" y="40" width="420" height="320" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ❌ Non-Sargable (YEAR(reg_date) = 2026)
                  </text>
                  <text x="240" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Forces Sequential Read of All 100,000 Table Rows
                  </text>

                  <g transform="translate(60, 110)">
                    <rect x="0" y="0" width="100" height="70" rx="6" fill="#1e293b" stroke="#64748b" />
                    <text x="50" y="30" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Row 1: 2024-05-12</text>
                    <text x="50" y="55" fill="#f43f5e" fontSize="9" textAnchor="middle">YEAR() = 2024 ❌</text>

                    <rect x="130" y="0" width="100" height="70" rx="6" fill="#1e293b" stroke="#64748b" />
                    <text x="180" y="30" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Row 2: 2025-11-20</text>
                    <text x="180" y="55" fill="#f43f5e" fontSize="9" textAnchor="middle">YEAR() = 2025 ❌</text>

                    <rect x="260" y="0" width="100" height="70" rx="6" fill="#1e293b" stroke="#64748b" />
                    <text x="310" y="30" fill="#e2e8f0" fontSize="10" fontWeight="bold" textAnchor="middle">Row N: 2026-04-15</text>
                    <text x="310" y="55" fill="#34d399" fontSize="9" textAnchor="middle">YEAR() = 2026 ✅</text>
                  </g>

                  <rect x="50" y="200" width="380" height="50" rx="6" fill="#1e293b" stroke="#f43f5e" />
                  <text x="240" y="225" fill="#fca5a5" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Server CPU Layer: 100,000 Function Evaluations
                  </text>
                  <text x="240" y="242" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                    Index is 100% IGNORED! High Buffer Pool Churn (78 ms) 🚨
                  </text>

                  <rect x="50" y="270" width="380" height="65" rx="6" fill="url(#gradSargRed)" />
                  <text x="240" y="295" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Outcome: type = ALL (Full Table Scan)
                  </text>
                  <text x="240" y="315" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    100,000 rows read from disk/RAM · High Latency (78.0 ms)
                  </text>

                  {/* Right Box: Sargable */}
                  <rect x="490" y="40" width="430" height="320" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="705" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ⚡ Sargable (reg_date &gt;= '2026-01-01'...)
                  </text>
                  <text x="705" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    B+Tree Binary Search to Lower Bound + Range Scan
                  </text>

                  {/* B+Tree Range Tree */}
                  <rect x="520" y="110" width="370" height="75" rx="8" fill="#1e293b" stroke="#047857" strokeWidth="1.5" />
                  <text x="705" y="135" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    B+Tree Index Root &rarr; Branch &rarr; Leaf Navigation
                  </text>
                  <text x="705" y="155" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    1. Probe Start: '2026-01-01 00:00:00' (3 page reads in RAM)
                  </text>
                  <text x="705" y="172" fill="#6ee7b7" fontSize="10" textAnchor="middle">
                    2. Stream Leaves sequentially until '2027-01-01' ⚡
                  </text>

                  <rect x="520" y="200" width="370" height="50" rx="6" fill="#1e293b" stroke="#10b981" />
                  <text x="705" y="225" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    Zero Row-by-Row Function Evaluations!
                  </text>
                  <text x="705" y="242" fill="#cbd5e1" fontSize="9" textAnchor="middle">
                    Reads only the 1,200 matching records (0.65 ms)!
                  </text>

                  <rect x="520" y="270" width="370" height="65" rx="6" fill="url(#gradSargGreen)" />
                  <text x="705" y="295" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Outcome: type = range (Index Range Scan)
                  </text>
                  <text x="705" y="315" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    120x Latency Reduction · 0.65 ms execution time
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Sargable Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Sargability Refactoring Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between real-world scenarios to compare non-sargable anti-patterns with optimized sargable SQL.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(sargableScenarios).map((key) => {
              const scenario = sargableScenarios[key];
              const isSelected = selectedSargableScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedSargableScenario(key)}
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

          {/* Workbench Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {sargableScenarios[selectedSargableScenario].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  sargableScenarios[selectedSargableScenario].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  sargableScenarios[selectedSargableScenario].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  sargableScenarios[selectedSargableScenario].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  sargableScenarios[selectedSargableScenario].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {sargableScenarios[selectedSargableScenario].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Comparison Script &amp; EXPLAIN Plan:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {sargableScenarios[selectedSargableScenario].sqlQuery}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Execution Metrics &amp; CPU Footprint:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Query Variant</th>
                      <th className="py-2.5 px-4">Access Type</th>
                      <th className="py-2.5 px-4">Index Used</th>
                      <th className="py-2.5 px-4">Rows Examined</th>
                      <th className="py-2.5 px-4">CPU Cost</th>
                      <th className="py-2.5 px-4">Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {sargableScenarios[selectedSargableScenario].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.variant}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.accessType}</td>
                        <td className="py-3 px-4 text-slate-300">{row.indexUsed}</td>
                        <td className="py-3 px-4 text-amber-300">{row.rowsExamined}</td>
                        <td className="py-3 px-4 text-slate-400 text-xs">{row.cpuLoad}</td>
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
                {sargableScenarios[selectedSargableScenario].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Functional Indexes in MySQL 8.0 */}
        <section id="functional-indexes" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. MySQL 8.0+ Functional Key Part Indexes
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How to index SQL expressions directly when legacy application queries cannot be refactored.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-amber-400 font-mono">The Legacy Code Dilemma</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In large enterprise codebases, changing SQL queries (e.g. queries generated by third-party ORMs or legacy stored routines using `WHERE LOWER(email) = '...'`) can require weeks of QA regression testing.
              </p>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                MySQL 8.0 introduces <strong>Functional Indexes</strong>, allowing you to index the expression itself without changing application SQL!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Functional Index Syntax</h3>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
{`-- Double parentheses denote functional expression:
CREATE INDEX idx_user_lower_email 
ON users (((LOWER(email))));

-- Query using LOWER(email) now uses the index!
EXPLAIN SELECT * FROM users WHERE LOWER(email) = 'mamata@example.com';
-- type = 'ref', key = 'idx_user_lower_email' ⚡`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Ichapur Systems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world sargable refactoring solving critical server CPU spikes.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Mahima's Barrackpore Student Fee Alert */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Mahima – Tuning Quarterly Fee Due Date Filters
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  CPU Dropped from 92% to 4%
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At the Barrackpore academy, automated SMS alerts checked for overdue tuition fees using <code className="text-rose-400 font-mono">WHERE DATEDIFF(NOW(), due_date) &gt; 30</code> across 150,000 student accounts every morning, pegging database CPU at 92%.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Sargable Refactoring:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Refactor date math from column side to constant parameter side:
SELECT student_id, student_name, balance_fee 
FROM student_ledgers 
WHERE due_date < DATE_SUB(NOW(), INTERVAL 30 DAY);

-- Result: type = range on idx_due_date (Duration dropped from 115 ms -> 0.72 ms)!`}
                </pre>
              </div>
            </div>

            {/* Case 2: Debangshu & Abhronila's Ichapur Exam System */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Debangshu &amp; Abhronila – Fixing Implicit Phone Number Type Casts
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Instant 0.04ms Lookups
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Ichapur examination verification portal, candidates looked up hall tickets by mobile number. An API bug passed the number as an unquoted integer literal (`9830099887`) against a `VARCHAR` column, turning every student login into a 100,000-row table scan.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Parameter Quoting Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Enforce string parameter binding in backend repository:
SELECT candidate_id, hall_ticket_no, exam_center 
FROM candidate_registrations 
WHERE mobile_no = '9830099887'; -- Explicit string literal!

-- Result: type = const on uq_mobile_no (Latency dropped from 89 ms -> 0.04 ms)!`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              7. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid dangerous anti-patterns that unintentionally destroy sargability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Column Concatenations in WHERE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">WHERE CONCAT(first_name, ' ', last_name) = 'Mamata Hui'</code> concatenates strings row-by-row on CPU. Always separate into individual predicates: <code className="text-emerald-300 font-mono">WHERE first_name = 'Mamata' AND last_name = 'Hui'</code>.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use composite indexes (first_name, last_name) instead of CONCAT().
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Negation Operators (!= / NOT)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Predicates like <code className="text-rose-300 font-mono">WHERE status != 'Active'</code> prevent direct B+Tree equality seeks. If possible, rewrite with positive equality matches on the remaining statuses.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Prefer positive equality matching over negative exclusions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Half-Open Timestamp Intervals
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                For `DATETIME` or `TIMESTAMP` columns, always query date ranges using half-open intervals: <code className="text-cyan-300 font-mono">&gt;= start AND &lt; next_day</code>. Avoid `DATE(col) = ?` or `BETWEEN` with incomplete times.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees exact millisecond precision and 100% sargable range seeks.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Sanitize at Write Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Never use `TRIM()` or `LOWER()` in `WHERE` clauses to clean dirty data during reads. Enforce whitespace trimming and case normalization during application write/insert time.
              </p>
              <div className="text-xs text-slate-400">
                Keeps your read queries naked, sargable, and ultra-fast.
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
              Key takeaways for writing sargable queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> Sargability Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">Naked Columns</strong> = Never wrap indexed column names in functions or math.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Date Ranges</strong> = Replace `YEAR()`, `MONTH()`, `DATE()` with `&gt;=` and `&lt;`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Type Matching</strong> = Quote string literals on `VARCHAR` columns to prevent implicit cast.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">Prefix LIKE</strong> = Use `LIKE 'prefix%'` (avoid leading wildcards `%text`).</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe math on constants...”</span>
                  Expressions on constants (e.g. `WHERE price &gt; 5000 * 1.18`) are completely fine! The optimizer folds constants into a single scalar value at parse time. Just keep the column itself naked!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about functional indexes...”</span>
                  In MySQL 8.0, if third-party legacy code insists on querying `WHERE LOWER(username) = '...'`, create `CREATE INDEX idx ON tbl (((LOWER(username))))` to restore index usage without changing code.
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
              Comprehensive reference questions covering Sargability, function wrapping, and query refactoring.
            </p>
          </div>

          <FAQTemplate
            title="Sargable Queries FAQs"
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
            title="Sargable Queries: Avoiding Function Wrapping on Indexed Columns in WHERE Clauses"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic8_note.txt"
          />

          <Teacher
            note="Sargability is the #1 rule that separates junior database programmers from seasoned performance architects. You can create the most beautiful composite indexes in the world, but the moment you write `WHERE YEAR(created_at) = 2026` or forget quotes around a string phone number, MySQL is forced to throw away your index and scan every row in the table! Always keep your indexed column naked on one side of the operator, rewrite date functions into boundary ranges, and let the B+Tree do what it was designed to do—locate records in fractions of a millisecond."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic8;
