import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – Querying Views as Virtual Tables
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on querying database views as first-class relational sources.
 */
const Topic2 = () => {
  // Interactive Simulator State
  const [selectedScenario, setSelectedScenario] = useState("filter_and_sort");

  const queryScenarios = {
    filter_and_sort: {
      title: "1. Filtering, Sorting & Pagination on Virtual Views",
      badge: "Predicate Pushdown Active",
      badgeColor: "emerald",
      sqlQuery: `-- Querying the virtual table with outer filters and pagination:
SELECT 
    student_id,
    full_name,
    course_stream,
    centre_city,
    tuition_fee_inr
FROM view_student_public_directory
WHERE centre_city = 'Barrackpore' 
  AND tuition_fee_inr &ge; 20000.00
ORDER BY tuition_fee_inr DESC, full_name ASC
LIMIT 10 OFFSET 0;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "Barrackpore", fee: "₹25,000.00", badge: "Index Seek: City = 'Barrackpore'" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "Barrackpore", fee: "₹25,000.00", badge: "Index Seek: City = 'Barrackpore'" },
        { id: "STU-105", name: "Mahima Das", stream: "Python Data Science", city: "Barrackpore", fee: "₹22,000.00", badge: "Index Seek: City = 'Barrackpore'" },
      ],
      explanation:
        "The MySQL optimizer merges the outer WHERE clause directly into the base table scan (Predicate Pushdown). If an index on centre_city exists, it performs an index seek rather than a full table scan.",
    },
    join_view_with_table: {
      title: "2. Joining Virtual Views with Physical Base Tables",
      badge: "Relational Join Composition",
      badgeColor: "cyan",
      sqlQuery: `-- Joining virtual view 'view_active_students' with physical table 'fee_transactions':
SELECT 
    v.student_id,
    v.full_name,
    v.course_stream,
    p.transaction_id,
    p.amount_paid_inr,
    p.payment_mode,
    p.payment_date
FROM view_student_public_directory v
JOIN fee_transactions p ON v.student_id = p.student_id
WHERE p.payment_status = 'SUCCESS'
ORDER BY p.payment_date DESC;`,
      resultRows: [
        { id: "STU-101", name: "Mamata Hui", stream: "React Fullstack", city: "TXN-9081 (UPI)", fee: "₹25,000.00", badge: "Live Joined with Base Table" },
        { id: "STU-102", name: "Susmita Sen", stream: "Java Enterprise", city: "TXN-9082 (NetBanking)", fee: "₹25,000.00", badge: "Live Joined with Base Table" },
        { id: "STU-103", name: "Abhronila Saha", stream: "Python Data Science", city: "TXN-9083 (Card)", fee: "₹25,000.00", badge: "Live Joined with Base Table" },
      ],
      explanation:
        "Virtual views act as first-class relational sources in SQL JOIN operations, allowing clean integration between pre-sanitized views and transaction tables.",
    },
    aggregation_over_view: {
      title: "3. Statistical Aggregations & Grouping over Views",
      badge: "Multi-Level Aggregation",
      badgeColor: "indigo",
      sqlQuery: `-- Computing campus-wide revenue KPIs directly from the virtual table:
SELECT 
    centre_city AS campus_location,
    COUNT(student_id) AS active_candidates,
    SUM(tuition_fee_inr) AS gross_tuition_inr,
    ROUND(AVG(tuition_fee_inr), 2) AS mean_fee_inr
FROM view_student_public_directory
GROUP BY centre_city
HAVING COUNT(student_id) >= 1
ORDER BY gross_tuition_inr DESC;`,
      resultRows: [
        { id: "Barrackpore Campus", name: "62 Candidates", stream: "React, Java, Python", city: "Barrackpore", fee: "₹15,50,000.00", badge: "Aggregated Stream" },
        { id: "Kolkata Central", name: "72 Candidates", stream: "React, Java, Python", city: "Kolkata", fee: "₹18,00,000.00", badge: "Aggregated Stream" },
        { id: "Ichapur Tech Hub", name: "30 Candidates", stream: "React, Python", city: "Ichapur", fee: "₹7,50,000.00", badge: "Aggregated Stream" },
      ],
      explanation:
        "You can run GROUP BY, HAVING, and aggregate formulas on views seamlessly. The engine aggregates dynamically across the dynamically retrieved tuples.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Querying Views Overview" },
    { id: "predicate-pushdown", label: "2. Predicate Pushdown & View Merging" },
    { id: "svg-diagrams", label: "3. Optimization & Join Pipelines" },
    { id: "interactive-sandbox", label: "4. Live Querying Sandbox" },
    { id: "case-studies", label: "5. Production Case Studies" },
    { id: "pitfalls-rules", label: "6. Senior Pitfalls & Optimizer Behavior" },
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
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 2 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Query Execution & Optimization
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Querying Views as Virtual Tables
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Interact with views as seamless relational sources. Understand how the MySQL optimizer applies{" "}
            <code className="text-cyan-300 font-mono font-bold">View Merging</code> and{" "}
            <code className="text-emerald-300 font-mono font-bold">Predicate Pushdown</code> to execute lightning-fast B-Tree seeks on physical base tables.
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
        {/* SECTION 1: Overview */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. Seamless Relational Interactivity
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              To the calling application, a database view behaves 100% identically to a base table.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
              <div className="text-cyan-400 font-mono text-xs font-bold uppercase mb-2">01. Standard Clauses</div>
              <h3 className="text-base font-bold text-white mb-2">WHERE, ORDER BY & LIMIT</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Filter rows, sort columns, and paginate through records using identical SQL semantics without knowing the underlying schema.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 shadow-xl">
              <div className="text-emerald-400 font-mono text-xs font-bold uppercase mb-2">02. Composition</div>
              <h3 className="text-base font-bold text-white mb-2">Multi-Table & View JOINs</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Join views with base transaction tables or other views to build layered, highly modular reporting pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/30 transition-all duration-300 shadow-xl">
              <div className="text-indigo-400 font-mono text-xs font-bold uppercase mb-2">03. Subqueries & CTEs</div>
              <h3 className="text-base font-bold text-white mb-2">Nested Subquery Sources</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Use views inside CTE <code className="text-indigo-300 font-mono">WITH</code> blocks, <code className="text-indigo-300 font-mono">IN</code> subqueries, or window functions.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: Predicate Pushdown & View Merging */}
        <section id="predicate-pushdown" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. How the Optimizer Executes View Queries: Predicate Pushdown
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why querying a view does not waste memory by materializing full tables first.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <span>🔍</span> Step-by-Step View Merging Process
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">1.</span>
                  <span><strong>Parser Expansion:</strong> The database engine replaces the view name with its internal SQL query definition.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">2.</span>
                  <span><strong>Predicate Folding:</strong> Outer <code className="text-cyan-300 font-mono">WHERE</code> conditions are merged with view conditions using <code className="text-emerald-300 font-mono">AND</code>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">3.</span>
                  <span><strong>Index Pushdown:</strong> The optimizer utilizes base table B-Tree indexes directly, reading only qualifying disk pages.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400">Mathematical Optimization Equivalence</h3>
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
                <div className="text-slate-500">-- What you write:</div>
                <div className="text-cyan-300">SELECT * FROM view_students WHERE city = 'Barrackpore';</div>
                <div className="text-slate-500">-- What MySQL actually compiles & executes:</div>
                <div className="text-emerald-300">
                  SELECT id, name, city FROM base_students<br />
                  WHERE is_active = 1 <span className="text-amber-300 font-bold">AND</span> city = 'Barrackpore';
                </div>
              </div>
              <p className="text-xs text-slate-400">
                Result: Zero intermediate table overhead; executes with native index seek speed!
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Predicate Pushdown & Join Execution
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Inspect how query filters flow directly down to the physical B-Tree index structure.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Diagram A:</span> Predicate Pushdown through Virtual Lens to Physical B-Tree
            </h3>
            <p className="text-xs text-slate-400">
              The outer filter <code className="text-cyan-300 font-mono">WHERE campus = 'Barrackpore'</code> penetrates the view layer and performs an index seek.
            </p>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 260" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Top: Caller Query */}
                <g>
                  <rect x="250" y="15" width="350" height="45" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <text x="425" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Caller Query with Filter</text>
                  <text x="425" y="50" fill="#94a3b8" fontSize="9" textAnchor="middle font-mono">SELECT * FROM v_students WHERE city = 'Barrackpore'</text>
                </g>

                {/* Middle: Virtual View Layer */}
                <g>
                  <rect x="180" y="90" width="490" height="50" rx="8" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" strokeDasharray="4 2" />
                  <text x="425" y="112" fill="#c7d2fe" fontSize="12" fontWeight="bold" textAnchor="middle">VIRTUAL VIEW: v_students</text>
                  <text x="425" y="128" fill="#a5b4fc" fontSize="9" textAnchor="middle font-mono">Internal: SELECT id, name, city FROM base_students WHERE status = 'ACTIVE'</text>
                </g>

                {/* Flow Arrow Caller &rarr; View */}
                <path d="M 425 60 L 425 90" stroke="#38bdf8" strokeWidth="2" />

                {/* Bottom: Base Table B-Tree Index */}
                <g>
                  <rect x="120" y="170" width="610" height="70" rx="8" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="425" y="195" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">⚡ Physical InnoDB B-Tree Index (idx_city_status)</text>
                  <text x="425" y="215" fill="#a7f3d0" fontSize="10" textAnchor="middle font-mono">
                    Predicate Pushdown: Evaluates status = 'ACTIVE' AND city = 'Barrackpore' directly in index seek!
                  </text>
                  <text x="425" y="230" fill="#6ee7b7" fontSize="9" textAnchor="middle">
                    Result: Reads ONLY 3 matching rows from disk (Zero Full Table Scan)
                  </text>
                </g>

                {/* Flow Arrow View &rarr; B-Tree */}
                <path d="M 425 140 L 425 170" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive View Querying Sandbox
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Execute live query patterns against virtual tables and inspect the execution outcomes.
            </p>
          </div>

          {/* Scenario Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(queryScenarios).map(([key, item]) => {
              const isActive = selectedScenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedScenario(key)}
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
                        item.badgeColor === "indigo" && "bg-indigo-950 text-indigo-400 border border-indigo-800"
                      )}
                    >
                      {item.badge}
                    </span>
                    <h3 className="text-sm font-semibold text-white mt-2 leading-snug">{item.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 mt-3 flex items-center gap-1 font-mono">
                    {isActive ? "● Active Query" : "○ Run Query"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{queryScenarios[selectedScenario].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{queryScenarios[selectedScenario].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Engine: View Merging Active
              </span>
            </div>

            {/* SQL Query Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Caller SQL Statement</span>
                <span className="text-emerald-400">Predicate Pushdown Active</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {queryScenarios[selectedScenario].sqlQuery}
              </pre>
            </div>

            {/* Results Grid */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">student_id</th>
                    <th className="py-3 px-4 font-mono text-white">full_name / volume</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">course_stream</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">campus / payment_info</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">tuition_fee_inr</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Optimizer Execution</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {queryScenarios[selectedScenario].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.id}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.name}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.stream}</td>
                      <td className="py-3 px-4 text-slate-300">{row.city}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.fee}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
                          {row.badge}
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
              Real-world querying patterns in high-throughput education and billing architectures.
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
                  Academy Paginated Student Portal Search
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Frontend applications query the sanitized student view with dynamic search filters, sort criteria, and pagination offsets for student records (Mamata, Susmita, Abhronila, Debangshu).
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    student_id,
    full_name,
    course_stream,
    centre_city,
    tuition_fee_inr
FROM view_student_public_directory
WHERE (full_name LIKE '%Hui%' OR full_name LIKE '%Sen%')
  AND centre_city IN ('Barrackpore', 'Kolkata')
ORDER BY full_name ASC
LIMIT 20 OFFSET 0;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Multi-Channel Order Fulfillment View Join
                </h3>
                <span className="text-xs text-slate-400 font-mono">Retail Logistics: West Bengal</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Joining pre-aggregated customer order summaries with real-time delivery logistics dispatch tables to track parcel shipping statuses.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`SELECT 
    v_ord.order_id,
    v_ord.customer_name,
    v_ord.total_bill_amount_inr,
    d.courier_name,
    d.tracking_number,
    d.dispatch_status
FROM view_customer_completed_orders v_ord
JOIN logistics_dispatches d ON v_ord.order_id = d.order_id
WHERE d.dispatch_status = 'IN_TRANSIT'
ORDER BY v_ord.total_bill_amount_inr DESC;`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Senior Pitfalls & Best Practices */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Senior Pitfalls & Optimizer Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid hidden query performance traps when querying views.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> The Unindexed TEMPTABLE Trap
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If a view contains <code className="text-rose-300 font-mono">GROUP BY</code> or <code className="text-rose-300 font-mono">DISTINCT</code>, MySQL materializes a temporary table in memory. Adding <code className="text-cyan-300 font-mono">WHERE</code> filters in the outer query cannot use base table indexes on that temporary table!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Filter raw data directly before grouping, or build specialized parameterized queries.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Base Table Indexing for Views
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always ensure the <strong>physical base tables</strong> have B-Tree indexes on the columns frequently filtered or sorted by callers of the view.
              </p>
              <div className="text-xs text-slate-400">
                With proper indexes, Predicate Pushdown enables O(log N) index lookups through the view.
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
                  <span>Views can be queried with SELECT, WHERE, ORDER BY, GROUP BY, and LIMIT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>Predicate Pushdown merges outer WHERE conditions into the base table scan.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Outer ORDER BY clauses always take precedence over internal view sorting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Views can be joined seamlessly with base tables and other views.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe EXPLAIN query plans...”</span>
                  Always run <code className="text-cyan-300 font-mono">EXPLAIN SELECT * FROM your_view WHERE ...</code> to confirm that MySQL is inlining the view and using base table indexes.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about table elimination...”</span>
                  In MySQL 8.0, if a view LEFT JOINs an unreferenced table on a unique key, the optimizer automatically eliminates that table from the execution plan!
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
              Comprehensive reference questions covering view queries, predicate pushdown, indexing, and join optimization.
            </p>
          </div>

          <FAQTemplate
            title="Querying Views as Virtual Tables FAQs"
            questions={questions}
          />
        </section>

        {/* SECTION 9: PlainTextPrint & Teacher's Note */}
        <section id="teacher-notes" className="space-y-8">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              9. Printable Topic Note & Teacher's Observation
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download clean text documentation for revision and study Sukanta Hui's direct pedagogical insights.
            </p>
          </div>

          <PlainTextPrint
            content={noteText}
            title="Querying Views as Virtual Tables"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic2_note.txt"
          />

          <Teacher
            note="When students query views, they often assume the database runs the view query in full and then filters the result in memory. Teach them how Predicate Pushdown works: the database optimizer pushes their WHERE filter directly into the base table's B-tree index seek. This is why a well-designed view over a 10-million row table can respond in less than 2 milliseconds!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
