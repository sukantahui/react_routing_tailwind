import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic1_files/topic1_questions";
import noteText from "./topic1_files/topic1_note.txt?raw";

/**
 * Topic1 – Generating Execution Plans using EXPLAIN, EXPLAIN FORMAT=JSON, and EXPLAIN FORMAT=TREE
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial and query workbench on generating MySQL execution plans: Traditional Tabular, FORMAT=JSON cost metrics, FORMAT=TREE Volcano iterator hierarchies, and SHOW WARNINGS optimizer rewrites.
 */
const Topic1 = () => {
  // Interactive Simulator State
  const [selectedExplainScenario, setSelectedExplainScenario] = useState("tabular_explain_view");

  const explainScenarios = {
    tabular_explain_view: {
      title: "1. Traditional Tabular EXPLAIN: Classic 12-Column Analysis",
      badge: "EXPLAIN Tabular",
      badgeColor: "cyan",
      sqlQuery: `-- 📊 TRADITIONAL TABULAR EXPLAIN:
EXPLAIN SELECT s.student_id, s.name, e.course_name 
FROM students s 
JOIN enrollments e ON s.student_id = e.student_id 
WHERE s.city = 'Barrackpore';

-- 🔍 12-Column Tabular Result Structure:
-- id | select_type | table | partitions | type   | possible_keys  | key         | key_len | ref             | rows | filtered | Extra
-- 1  | SIMPLE      | s     | NULL       | ref    | idx_city       | idx_city    | 152     | const           | 120  | 100.00   | NULL
-- 1  | SIMPLE      | e     | NULL       | ref    | idx_student_id | idx_student | 4       | db.s.student_id | 2    | 100.00   | NULL`,
      resultRows: [
        { id: "1", selectType: "SIMPLE", table: "s (students)", accessType: "ref", keyUsed: "idx_city", rowsExamined: "120", filtered: "100.00%", extraInfo: "NULL (Clean Index Match)", status: "Optimal Ref Scan ✅" },
        { id: "1", selectType: "SIMPLE", table: "e (enrollments)", accessType: "ref", keyUsed: "idx_student_id", rowsExamined: "2", filtered: "100.00%", extraInfo: "NULL (Clean Join Match)", status: "Optimal Join ✅" },
      ],
      explanation:
        "The traditional tabular `EXPLAIN` format outputs 12 standard columns. It reveals that the optimizer starts by filtering students in Barrackpore using `idx_city` (examining 120 rows) and then joins enrollments via `idx_student_id` (2 rows per student).",
    },
    json_cost_breakdown: {
      title: "2. Deep Cost Analysis (FORMAT=JSON): Optimizer Cost Metrics",
      badge: "EXPLAIN FORMAT=JSON",
      badgeColor: "emerald",
      sqlQuery: `-- 🧮 DEEP COST ANALYSIS WITH FORMAT=JSON:
EXPLAIN FORMAT=JSON 
SELECT s.name, a.balance 
FROM students s 
JOIN student_accounts a ON s.student_id = a.student_id 
WHERE s.status = 'ACTIVE';

-- 📋 JSON Cost Output Excerpt:
{
  "query_block": {
    "select_id": 1,
    "cost_info": {
      "query_cost": "14.25"  // Total estimated I/O + CPU Cost!
    },
    "table": {
      "table_name": "s",
      "access_type": "ref",
      "possible_keys": ["idx_status"],
      "key": "idx_status",
      "rows_examined_per_scan": 10,
      "cost_info": {
        "read_cost": "1.00",
        "eval_cost": "1.00",
        "prefix_cost": "2.00",
        "data_read_per_join": "1KB"
      }
    }
  }
}`,
      resultRows: [
        { id: "query_cost", selectType: "Overall Query Cost", table: "All Tables", accessType: "Total Math Metric", keyUsed: "Cost Calculation", rowsExamined: "10 Total", filtered: "100%", extraInfo: "Total Cost = 14.25 units", status: "Low Cost Plan ⚡" },
        { id: "read_cost", selectType: "Page Read I/O", table: "s (students)", accessType: "Storage I/O", keyUsed: "idx_status", rowsExamined: "10 Rows", filtered: "100%", extraInfo: "read_cost = 1.00", status: "Buffer Pool Read ✅" },
        { id: "eval_cost", selectType: "CPU Evaluation", table: "s (students)", accessType: "CPU Processing", keyUsed: "Row Comparison", rowsExamined: "10 Rows", filtered: "100%", extraInfo: "eval_cost = 1.00", status: "Minimal CPU ✅" },
      ],
      explanation:
        "`EXPLAIN FORMAT=JSON` exposes explicit mathematical cost metrics (`query_cost`, `read_cost`, `eval_cost`, `prefix_cost`), providing unambiguous numerical indicators for automated CI/CD performance testing.",
    },
    tree_iterator_model: {
      title: "3. Volcano Iterator Model (FORMAT=TREE): Visual Data Flow Hierarchy",
      badge: "EXPLAIN FORMAT=TREE",
      badgeColor: "rose",
      sqlQuery: `-- 🌳 VOLCANO ITERATOR TREE (MySQL 8.0.16+ Default):
EXPLAIN FORMAT=TREE 
SELECT s.name, d.department_name, e.grade 
FROM students s 
JOIN departments d ON s.department_id = d.department_id 
JOIN exam_scores e ON s.student_id = e.student_id 
WHERE s.city = 'Barrackpore';

-- 📋 Indented Iterator Output:
-- -> Nested loop inner join  (cost=18.40 rows=24)
--     -> Nested loop inner join  (cost=10.00 rows=12)
--         -> Index lookup on s using idx_city (city='Barrackpore')  (cost=1.20 rows=12)
--         -> Single-row index lookup on d using PRIMARY (department_id=s.department_id)  (cost=0.73 rows=1)
--     -> Index lookup on e using idx_student_id (student_id=s.student_id)  (cost=0.70 rows=2)`,
      resultRows: [
        { id: "Node 1 (Root)", selectType: "Nested loop join", table: "Join with exam_scores", accessType: "Loop Iterator", keyUsed: "idx_student_id", rowsExamined: "24 Estimated", filtered: "100%", extraInfo: "Root Iterator (Cost: 18.40)", status: "Root Node 🌳" },
        { id: "Node 2 (Middle)", selectType: "Nested loop join", table: "Join with departments", accessType: "Loop Iterator", keyUsed: "PRIMARY", rowsExamined: "12 Estimated", filtered: "100%", extraInfo: "Child Iterator (Cost: 10.00)", status: "Intermediate Node" },
        { id: "Node 3 (Leaf)", selectType: "Index lookup", table: "s (students)", accessType: "eq_ref / ref", keyUsed: "idx_city", rowsExamined: "12 Estimated", filtered: "100%", extraInfo: "Driving Table Scan (Cost: 1.20)", status: "Leaf Driving Node ⚡" },
      ],
      explanation:
        "`EXPLAIN FORMAT=TREE` visually depicts the hierarchical Volcano iterator execution model. Read bottom-up: MySQL begins by looking up students in Barrackpore (`idx_city`), joins their department via `PRIMARY`, and streams rows to match `exam_scores`.",
    },
    query_rewrite_inspection: {
      title: "4. Query Rewriting Inspection: SHOW WARNINGS Normalization",
      badge: "SHOW WARNINGS",
      badgeColor: "amber",
      sqlQuery: `-- 🔍 QUERY REWRITE & NORMALIZATION INSPECTION:
EXPLAIN SELECT * FROM students WHERE student_id IN (SELECT student_id FROM scholarship_awards);
SHOW WARNINGS;

-- 📋 Normalized Rewritten SQL in Warnings Message:
-- /* select#1 */ select \`school\`.\`students\`.\`student_id\` AS \`student_id\`, ...
-- from \`school\`.\`students\` 
-- semi join (\`school\`.\`scholarship_awards\`) 
-- where (\`school\`.\`students\`.\`student_id\` = \`school\`.\`scholarship_awards\`.\`student_id\`);
-- ⚡ Optimizer automatically transformed subquery IN into an optimal SEMI-JOIN!`,
      resultRows: [
        { id: "Transformation", selectType: "Subquery to Semi-Join", table: "students + scholarship_awards", accessType: "Semi-Join Optimization", keyUsed: "B+Tree Key Match", rowsExamined: "Single Pass", filtered: "100%", extraInfo: "Subquery IN unnested into Semi-Join", status: "Rewritten Optimally ⚡" },
      ],
      explanation:
        "Executing `EXPLAIN` followed immediately by `SHOW WARNINGS` displays the normalized, rewritten SQL query, proving whether subqueries were flattened into semi-joins or expressions were constant-folded.",
    },
  };

  const navItems = [
    { id: "formats-overview", label: "1. The 3 EXPLAIN Formats" },
    { id: "volcano-model", label: "2. Volcano Iterator Model" },
    { id: "svg-diagrams", label: "3. Formats & Tree SVGs" },
    { id: "interactive-sandbox", label: "4. Live EXPLAIN Workbench" },
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
            <span>Topic 1 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Execution Plans
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Generating Execution Plans: Tabular, JSON &amp; TREE
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Master the three execution plan formats in MySQL 8.0: Traditional 12-Column Tabular, mathematical <code className="text-cyan-300 font-mono">FORMAT=JSON</code> cost breakdowns, hierarchical <code className="text-cyan-300 font-mono">FORMAT=TREE</code> Volcano iterator models, and query rewriting forensics via <code className="text-cyan-300 font-mono">SHOW WARNINGS</code>.
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
        {/* SECTION 1: The 3 EXPLAIN Formats */}
        <section id="formats-overview" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three EXPLAIN Formats in MySQL 8.0
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing Tabular, JSON, and TREE execution plan diagnostic representations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-cyan-400 font-bold text-xs uppercase">Format 1</span>
              <h3 className="font-bold text-white">Traditional Tabular</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Classic 12-column grid (`id`, `select_type`, `table`, `type`, `key`, `rows`, `Extra`). Quick human readability for simple joins and index verification.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-emerald-400 font-bold text-xs uppercase">Format 2</span>
              <h3 className="font-bold text-white">FORMAT=JSON</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Exposes granular numerical cost metrics: `query_cost`, `read_cost`, `eval_cost`, and `prefix_cost`. Perfect for automated CI/CD performance testing.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="font-mono text-rose-400 font-bold text-xs uppercase">Format 3</span>
              <h3 className="font-bold text-white">FORMAT=TREE</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Visualizes the Volcano iterator execution hierarchy with indentation. Shows exact parent-child data flow and join execution sequence.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Volcano Iterator Model */}
        <section id="volcano-model" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The Volcano Iterator Execution Model
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              The engine architecture underpinning MySQL 8.0's execution plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-cyan-400 font-mono">How Volcano Iterators Work</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Every query execution step (index lookup, table scan, filter, join, sort) is an iterator. Each parent iterator calls `Read()` on its child iterator, streaming rows upwards one at a time with minimal memory footprint.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Query Normalization (SHOW WARNINGS)</h3>
              <p className="text-slate-300 text-xs leading-relaxed">
                Running `EXPLAIN` followed by `SHOW WARNINGS;` prints the internal transformed SQL string, revealing constant folding, subquery-to-semijoin flattening, and dead-condition elimination.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: EXPLAIN Formats &amp; Volcano Iterator Hierarchy
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing the 3 EXPLAIN formats and bottom-up Volcano iterator data flows.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Formats Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-cyan-400 font-mono">Diagram A:</span> Comparison of the 3 EXPLAIN Output Formats
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Tabular */}
                  <g>
                    <rect x="20" y="30" width="250" height="100" rx="8" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
                    <text x="145" y="55" fill="#67e8f9" fontSize="10" fontWeight="bold" textAnchor="middle">1. TRADITIONAL TABULAR</text>
                    <rect x="30" y="70" width="230" height="40" rx="4" fill="#0f172a" />
                    <text x="145" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">12-Column Grid (type, key, rows)</text>
                    <text x="145" y="102" fill="#bae6fd" fontSize="7 font-mono" textAnchor="middle">Best for Quick Terminal Check</text>
                  </g>

                  {/* JSON */}
                  <g>
                    <rect x="300" y="30" width="250" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
                    <text x="425" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">2. FORMAT=JSON</text>
                    <rect x="310" y="70" width="230" height="40" rx="4" fill="#022c22" />
                    <text x="425" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">query_cost, eval_cost, read_cost</text>
                    <text x="425" y="102" fill="#34d399" fontSize="7 font-mono" textAnchor="middle">Best for Automated Testing &amp; CI/CD</text>
                  </g>

                  {/* TREE */}
                  <g>
                    <rect x="580" y="30" width="250" height="100" rx="8" fill="#450a0a" stroke="#ef4444" strokeWidth="2" />
                    <text x="705" y="55" fill="#fca5a5" fontSize="10" fontWeight="bold" textAnchor="middle">3. FORMAT=TREE</text>
                    <rect x="590" y="70" width="230" height="40" rx="4" fill="#1e293b" />
                    <text x="705" y="88" fill="#f87171" fontSize="8 font-mono font-bold" textAnchor="middle">-&gt; Nested Loop -&gt; Index Lookup</text>
                    <text x="705" y="102" fill="#fca5a5" fontSize="7 font-mono" textAnchor="middle">Best for Visual Data Flow &amp; Joins 🌳</text>
                  </g>
                </svg>
              </div>
            </div>

            {/* SVG 2: Volcano Iterator Flow */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="text-rose-400 font-mono">Diagram B:</span> Bottom-Up Volcano Iterator Data Flow
              </h3>

              <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
                <svg viewBox="0 0 850 160" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                  {/* Leaf Node */}
                  <g>
                    <rect x="30" y="30" width="240" height="100" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                    <text x="150" y="55" fill="#c7d2fe" fontSize="10" fontWeight="bold" textAnchor="middle">1. Leaf: Index Lookup (s)</text>
                    <rect x="40" y="70" width="220" height="40" rx="4" fill="#0f172a" />
                    <text x="150" y="88" fill="#38bdf8" fontSize="8 font-mono" textAnchor="middle">Index Lookup on idx_city (Barrackpore)</text>
                    <text x="150" y="102" fill="#94a3b8" fontSize="7 font-mono" textAnchor="middle">Produces student rows</text>
                  </g>

                  {/* Intermediate Join */}
                  <g>
                    <rect x="310" y="30" width="240" height="100" rx="8" fill="#451a03" stroke="#f59e0b" strokeWidth="1.5" />
                    <text x="430" y="55" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">2. Nested Loop Join (d)</text>
                    <rect x="320" y="70" width="220" height="40" rx="4" fill="#1e293b" />
                    <text x="430" y="88" fill="#fbbf24" fontSize="8 font-mono" textAnchor="middle">Lookup d on PRIMARY (dept_id)</text>
                    <text x="430" y="102" fill="#fde68a" fontSize="7 font-mono" textAnchor="middle">Streams matched pairs</text>
                  </g>

                  {/* Root Iterator */}
                  <g>
                    <rect x="590" y="30" width="230" height="100" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                    <text x="705" y="55" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">3. Root: Output Stream</text>
                    <rect x="600" y="70" width="210" height="40" rx="4" fill="#022c22" />
                    <text x="705" y="88" fill="#a7f3d0" fontSize="8 font-mono font-bold" textAnchor="middle">Root Iterator Streams to Client</text>
                    <text x="705" y="102" fill="#34d399" fontSize="7 font-bold" textAnchor="middle">⚡ Zero Intermediate Temp Tables</text>
                  </g>

                  {/* Arrows */}
                  <path d="M 270 80 L 310 80" stroke="#818cf8" strokeWidth="1.5" />
                  <path d="M 550 80 L 590 80" stroke="#f59e0b" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Execution Plan Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test traditional tabular EXPLAIN, FORMAT=JSON mathematical cost breakdowns, FORMAT=TREE Volcano iterator hierarchies, and SHOW WARNINGS normalizations live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(explainScenarios).map(([key, item]) => {
              const isActive = selectedExplainScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedExplainScenario(key)}
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
                        item.badgeColor === "emerald" && "bg-emerald-950 text-emerald-400 border border-emerald-800",
                        item.badgeColor === "rose" && "bg-rose-950 text-rose-400 border border-rose-800",
                        item.badgeColor === "amber" && "bg-amber-950 text-amber-400 border border-amber-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Format" : "○ Run EXPLAIN Test"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{explainScenarios[selectedExplainScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{explainScenarios[selectedExplainScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                EXPLAIN Inspector
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Execution Plan Syntax &amp; Output</span>
                <span className="text-emerald-400">Plan Analysis</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {explainScenarios[selectedExplainScenario].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800 font-mono">
                  <tr>
                    <th className="py-3 px-4 text-cyan-400">id / Metric</th>
                    <th className="py-3 px-4 text-white">Select Type</th>
                    <th className="py-3 px-4 text-emerald-400">Target Table</th>
                    <th className="py-3 px-4 text-amber-400">Access Type</th>
                    <th className="py-3 px-4 text-cyan-400">Key / Index</th>
                    <th className="py-3 px-4 text-white">Rows Examined</th>
                    <th className="py-3 px-4 text-emerald-400">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {explainScenarios[selectedExplainScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 text-slate-300">{row.selectType}</td>
                      <td className="py-3 px-4 text-white">{row.table}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono">{row.accessType}</td>
                      <td className="py-3 px-4 text-cyan-300 font-mono">{row.keyUsed}</td>
                      <td className="py-3 px-4 text-emerald-300 font-mono">{row.rowsExamined}</td>
                      <td className="py-3 px-4">
                        <span
                          className={clsx(
                            "px-2 py-0.5 rounded text-[11px] font-sans font-medium border",
                            row.status.includes("Optimal") || row.status.includes("Low") || row.status.includes("Node") || row.status.includes("Rewritten") || row.status.includes("Read") || row.status.includes("Minimal")
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
              Diagnosing hidden hash joins and setting up CI/CD cost regression gates in Kolkata.
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
                  Automated CI/CD Query Cost Regression Gates with EXPLAIN FORMAT=JSON
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Kolkata EdTech Fintech Engineering</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui architected an automated pull-request validation check for all database migrations: The CI/CD pipeline executed <code className="text-emerald-300 font-mono">EXPLAIN FORMAT=JSON</code> on all critical API queries. If a developer accidentally dropped an index or wrote an un-sargable predicate that caused `query_cost` to surge from 15.0 to 8,500.0, the CI/CD build failed automatically, preventing catastrophic performance regressions from reaching production!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`-- CI/CD Automated Regression Script:
SET @plan_json = (EXPLAIN FORMAT=JSON SELECT ...);
-- Parse query_cost using MySQL 8.0 JSON Functions:
SELECT JSON_EXTRACT(@plan_json, '$.query_block.cost_info.query_cost') INTO @total_cost;
-- If @total_cost > 100.0 -> Fail Pipeline!`}
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
              Never confuse estimated rows with actual rows and use FORMAT=TREE for complex multi-table joins.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> Confusing Estimated rows with Returned Rows
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                The `rows` column in `EXPLAIN` represents the estimated number of rows examined per table scan, NOT the final number of rows returned to the user!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Multiply rows along join trees or use `EXPLAIN ANALYZE` for actual row counts!
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Primary Visual Diagnostic: FORMAT=TREE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Adopt <code className="text-emerald-400 font-mono">EXPLAIN FORMAT=TREE</code> as your primary visual diagnostic tool in MySQL 8.0 to inspect iterator hierarchies and join orders without ambiguity.
              </p>
              <div className="text-xs text-slate-400">
                Reveals the exact bottom-up parent-child data flow of the Volcano iterator model.
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
              Key takeaways for Generating Execution Plans.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> EXPLAIN Formats Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-cyan-300">Tabular EXPLAIN</strong> gives a fast 12-column terminal summary.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-300">FORMAT=JSON</strong> exposes explicit mathematical <code className="text-emerald-300 font-mono">query_cost</code> metrics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span><strong className="text-cyan-300">FORMAT=TREE</strong> visualizes the Volcano iterator execution model.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span><strong className="text-cyan-300">SHOW WARNINGS</strong> displays normalized optimizer query rewrites.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe EXPLAIN on DML...”</span>
                  You can run `EXPLAIN UPDATE ...` and `EXPLAIN DELETE ...` to verify which index will be used without actually modifying any data!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about live query inspection...”</span>
                  Use `EXPLAIN FOR CONNECTION &lt;thread_id&gt;` to inspect the execution plan of a long-running query active in another connection!
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
              Comprehensive reference questions covering execution plans in MySQL 8.0: Traditional Tabular, FORMAT=JSON cost metrics, FORMAT=TREE Volcano iterator hierarchies, and SHOW WARNINGS optimizer rewrites.
            </p>
          </div>

          <FAQTemplate
            title="Generating Execution Plans FAQs"
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
            title="Generating Execution Plans using EXPLAIN, EXPLAIN FORMAT=JSON, and EXPLAIN FORMAT=TREE"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic1_note.txt"
          />

          <Teacher
            note="Never optimize a query blind! The EXPLAIN statement is your x-ray machine into MySQL's Cost-Based Optimizer. In MySQL 8.0, always make EXPLAIN FORMAT=TREE your primary visual tool—it reads from the bottom-up, exactly showing how the Volcano iterator model streams rows through filters and joins. Use FORMAT=JSON to track exact numerical costs in CI/CD, and use SHOW WARNINGS to see how MySQL secretly rewrites your SQL!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic1;
