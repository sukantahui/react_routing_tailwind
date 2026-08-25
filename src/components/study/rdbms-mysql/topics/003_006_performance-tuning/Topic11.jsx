import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Identifying and Eliminating N+1 Query Anti-Patterns
 * Module: 003_006_performance-tuning
 *
 * @component
 * @returns {JSX.Element} Deep-dive interactive tutorial and architectural workbench on eliminating N+1 database queries: understanding ORM lazy loading bottlenecks, eager JOIN loading, batch WHERE IN patterns, DataLoader architectures, and MySQL 8.0 JSON aggregation.
 */
const Topic11 = () => {
  // Interactive Simulator State
  const [selectedN1Scenario, setSelectedN1Scenario] = useState("eager_join_strategy");

  const n1Scenarios = {
    eager_join_strategy: {
      title: "1. Strategy 1: Eager Loading with JOIN (1 Single Network Round-Trip)",
      badge: "Eager JOIN Loading",
      badgeColor: "emerald",
      sqlQuery: `-- ❌ THE N+1 ANTI-PATTERN (ORM Lazy Loading in Application Loop):
-- Query 1 (Fetch 50 Courses):
SELECT course_id, course_name, department_id FROM courses WHERE department_id = 1;
-- Subsequent 50 Queries (Looping inside backend application):
-- for (let c of courses) { SELECT * FROM enrollments WHERE course_id = ?; }
-- Total Queries: 1 + 50 = 51 Separate Database Network Round-Trips (185.0 ms) 🚨

-- ⚡ STRATEGY 1: EAGER LOADING WITH JOIN (1 Single Query):
SELECT 
    c.course_id, 
    c.course_name, 
    e.enrollment_id, 
    s.student_id, 
    s.name AS student_name, 
    e.fee_paid_inr
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
LEFT JOIN student_records s ON e.student_id = s.student_id
WHERE c.department_id = 1;

-- ⚡ BENEFIT:
-- 1. Exactly ONE database query executed.
-- 2. Network round-trips drop from 51 -> 1.
-- 3. Execution time drops from 185.0 ms -> 2.1 ms (90x faster)!`,
      resultRows: [
        {
          strategy: "N+1 Lazy Loading Loop",
          queryCount: "51 Queries (1 + 50)",
          networkRoundTrips: "51 Network RTTs 🚨",
          dbConnHoldTime: "185.00 ms (High)",
          latency: "185.00 ms",
          status: "Connection Pool Saturation ❌"
        },
        {
          strategy: "Eager JOIN (1 Query)",
          queryCount: "1 Single Query ⚡",
          networkRoundTrips: "1 Network RTT ⚡",
          dbConnHoldTime: "2.10 ms (Instant)",
          latency: "2.10 ms ⚡",
          status: "90x Faster Pipeline ✅"
        }
      ],
      explanation:
        "By replacing sequential lazy query loops with a single `LEFT JOIN`, the application fetches both parent courses and child student enrollments in a single network round-trip, eliminating 50 individual TCP round-trips."
    },
    batch_in_strategy: {
      title: "2. Strategy 2: Batch IN (...) Loading (2-Query Pattern / DataLoader)",
      badge: "Batch WHERE IN (2 Queries)",
      badgeColor: "cyan",
      sqlQuery: `-- ⚡ STRATEGY 2: BATCH IN (...) LOADING (The 2-Query Pattern):
-- Used when Eager JOINs cause massive Cartesian product duplication on wide parent tables.

-- Step 1: Query 1 (Fetch all 50 courses):
SELECT course_id, course_name, department_id, description, syllabus_notes 
FROM courses 
WHERE department_id = 1;
-- (Application extracts list of 50 course IDs: [101, 102, 103, ... 150])

-- Step 2: Query 2 (Fetch all enrollments for all 50 courses in 1 single batch):
SELECT enrollment_id, course_id, student_id, fee_paid_inr 
FROM enrollments 
WHERE course_id IN (101, 102, 103, 104, 105, 106, 107, 108 /* ... 150 */);

-- ⚡ BENEFIT:
-- 1. Exactly 2 queries instead of 51 queries (96% fewer queries!).
-- 2. Zero parent column data duplication in network packets!
-- 3. Total latency: 3.4 ms.`,
      resultRows: [
        {
          strategy: "N+1 Individual Queries",
          queryCount: "51 Queries",
          networkRoundTrips: "51 Network RTTs 🚨",
          dbConnHoldTime: "185.00 ms",
          latency: "185.00 ms",
          status: "Serial Loop Bottleneck ❌"
        },
        {
          strategy: "Batch IN (...) Pattern",
          queryCount: "2 Queries Total ⚡",
          networkRoundTrips: "2 Network RTTs ⚡",
          dbConnHoldTime: "3.40 ms",
          latency: "3.40 ms ⚡",
          status: "Optimal Payload & Speed ✅"
        }
      ],
      explanation:
        "The Batch `IN (...)` pattern collects all parent IDs from the first query and fetches all related child records in a single second query. This eliminates 49 queries while avoiding the duplicate parent data overhead of wide multi-table joins."
    },
    json_aggregation_strategy: {
      title: "3. Strategy 3: MySQL 8.0 JSON Aggregation (Nested Objects in 1 Query)",
      badge: "JSON_ARRAYAGG in 1 Query",
      badgeColor: "amber",
      sqlQuery: `-- ⚡ STRATEGY 3: MYSQL 8.0+ JSON AGGREGATION (JSON_ARRAYAGG):
-- Assembles nested child arrays directly inside the database engine in a single query!

SELECT 
    c.course_id, 
    c.course_name, 
    c.department_id,
    COALESCE(
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'enrollment_id', e.enrollment_id,
                'student_id', s.student_id,
                'student_name', s.name,
                'fee_inr', e.fee_paid_inr
            )
        ), 
        JSON_ARRAY()
    ) AS enrolled_students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
LEFT JOIN student_records s ON e.student_id = s.student_id
WHERE c.department_id = 1
GROUP BY c.course_id, c.course_name, c.department_id;

-- ⚡ BENEFIT:
-- 1. 1 Single Query returning ready-to-consume nested JSON objects!
-- 2. Zero backend JavaScript/Java stitching loops required!
-- 3. Exactly 1 row per parent course (Zero row duplication).`,
      resultRows: [
        {
          strategy: "N+1 Loops with App Stitching",
          queryCount: "51 Queries",
          networkRoundTrips: "51 Network RTTs 🚨",
          dbConnHoldTime: "185.00 ms",
          latency: "185.00 ms",
          status: "High CPU Stitching ❌"
        },
        {
          strategy: "MySQL 8.0 JSON_ARRAYAGG",
          queryCount: "1 Single Query ⚡",
          networkRoundTrips: "1 Network RTT ⚡",
          dbConnHoldTime: "2.40 ms",
          latency: "2.40 ms ⚡",
          status: "Engine-Assembled JSON ✅"
        }
      ],
      explanation:
        "`JSON_ARRAYAGG()` and `JSON_OBJECT()` allow the MySQL storage engine to bundle child records into nested JSON arrays per parent row. The backend receives pre-structured hierarchical domain objects in a single fast query with zero mapping loops."
    },
    batch_write_n1_strategy: {
      title: "4. Strategy 4: Eliminating N+1 Write Anti-Patterns (Batch INSERT / UPDATE)",
      badge: "Batch Write Refactoring",
      badgeColor: "rose",
      sqlQuery: `-- ❌ WRITE N+1 ANTI-PATTERN (Updating 500 records individually in a loop):
-- for (let s of students) {
--     UPDATE student_ledgers SET status = 'Verified' WHERE student_id = ?; -- 500 times!
-- }
-- 💥 DANGER: 500 individual transactions, 500 Redo Log flushes, 500 disk syncs (1.8 sec)!

-- ⚡ REFACTORED PATTERN A (Single Batch UPDATE with WHERE IN):
UPDATE student_ledgers 
SET status = 'Verified', updated_at = NOW() 
WHERE student_id IN (101, 102, 103, 104, 105 /* ... 500 IDs */);

-- ⚡ REFACTORED PATTERN B (Bulk UPDATE with varying values via CASE):
UPDATE student_ledgers 
SET scholarship_fee_inr = CASE student_id 
    WHEN 101 THEN 5000 
    WHEN 102 THEN 7500 
    WHEN 103 THEN 10000 
END 
WHERE student_id IN (101, 102, 103);

-- ⚡ BENEFIT:
-- 1 single transaction, 1 Redo Log flush, 1 network round-trip (Duration: 8.5 ms vs 1,800 ms)!`,
      resultRows: [
        {
          strategy: "500 Individual UPDATEs in Loop",
          queryCount: "500 Transactions 🚨",
          networkRoundTrips: "500 Network RTTs",
          dbConnHoldTime: "1,800.00 ms (1.8s)",
          latency: "1800.00 ms",
          status: "Redo Log Churn ❌"
        },
        {
          strategy: "Single Batch UPDATE WHERE IN",
          queryCount: "1 Transaction ⚡",
          networkRoundTrips: "1 Network RTT ⚡",
          dbConnHoldTime: "8.50 ms",
          latency: "8.50 ms ⚡",
          status: "200x Faster Write ✅"
        }
      ],
      explanation:
        "Executing writes in a loop generates hundreds of individual transactions and disk fsync flushes. Batching updates into a single statement with `WHERE IN (...)` or `CASE` expressions bundles the entire operation into a single atomic transaction."
    }
  };

  const navItems = [
    { id: "n1-anatomy", label: "1. Anatomy of the N+1 Anti-Pattern" },
    { id: "strategies-matrix", label: "2. The 3 Elimination Strategies" },
    { id: "svg-architecture", label: "3. Visual Network Waterfalls" },
    { id: "interactive-workbench", label: "4. Live N+1 Elimination Workbench" },
    { id: "detection-tools", label: "5. Detecting N+1 in Production" },
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
            <span>Topic 11 of 15</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Application Architecture Tuning
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Identifying and Eliminating N+1 Query Anti-Patterns
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Eliminate the #1 cause of application latency spikes and connection pool starvation: understand how ORM lazy loading triggers <code className="text-rose-400 font-mono">1 + N</code> query storms, and master eager joins, batch <code className="text-cyan-400 font-mono">WHERE IN</code> loading, and MySQL 8.0 <code className="text-emerald-400 font-mono">JSON_ARRAYAGG</code> solutions.
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
        {/* SECTION 1: Anatomy of the N+1 Anti-Pattern */}
        <section id="n1-anatomy" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Anatomy of the N+1 Query Problem
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Why sequential database loops destroy API response times and starve server threads.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase tracking-wider">
                The Core Flaw
              </span>
              <h3 className="font-bold text-white text-base">The 1 + N Multiplier</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                The application fires 1 query to fetch $N$ parent records, and then iterates through a loop firing 1 query per parent to fetch child relations. Fetching 100 courses triggers <strong>101 separate queries</strong>!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                Root Cause
              </span>
              <h3 className="font-bold text-white text-base">ORM Lazy Loading</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Frameworks like Hibernate, Prisma, TypeORM, and Django ORM default to lazy loading. Accessing a relation property (e.g. `course.students`) inside a loop silently triggers a new database network query.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
                The Real Bottleneck
              </span>
              <h3 className="font-bold text-white text-base">Network Round-Trip Time</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Even if each query takes only 0.5 ms on MySQL, 200 sequential network round-trips (RTT) add 200ms to 800ms of pure TCP socket wait time, holding connections open and exhausting connection pools.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: The 3 Elimination Strategies Matrix */}
        <section id="strategies-matrix" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. The 3 Proven Architectural Elimination Strategies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Comparing Eager Joins, Batch IN Loading, and MySQL 8.0 JSON Aggregation.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60">
            <table className="w-full text-left text-xs sm:text-sm text-slate-300 border-collapse">
              <thead className="bg-slate-900/90 text-cyan-400 font-mono uppercase text-[11px] sm:text-xs border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Strategy</th>
                  <th className="py-3 px-4">Query Count</th>
                  <th className="py-3 px-4">Network Round-Trips</th>
                  <th className="py-3 px-4">Data Duplication Risk</th>
                  <th className="py-3 px-4">Best Use Case</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 font-mono text-xs">
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-emerald-400 font-sans">1. Eager JOIN</td>
                  <td className="py-3 px-4 text-emerald-300">1 Query</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">1 RTT ⚡</td>
                  <td className="py-3 px-4 text-amber-300">Moderate (Parent cols repeated)</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">1-to-1 or narrow 1-to-many joins</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cyan-400 font-sans">2. Batch IN (...)</td>
                  <td className="py-3 px-4 text-cyan-300">2 Queries</td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">2 RTTs ⚡</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">Zero Duplication ✅</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">Wide parent tables / GraphQL DataLoaders</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-amber-400 font-sans">3. JSON_ARRAYAGG</td>
                  <td className="py-3 px-4 text-amber-300">1 Query</td>
                  <td className="py-3 px-4 text-amber-300 font-bold">1 RTT ⚡</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">Zero Duplication ✅</td>
                  <td className="py-3 px-4 text-slate-300 font-sans">REST API endpoints &amp; nested DTOs</td>
                </tr>
                <tr className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-rose-400 font-sans">❌ N+1 Lazy Loops</td>
                  <td className="py-3 px-4 text-rose-400">1 + N Queries</td>
                  <td className="py-3 px-4 text-rose-400 font-bold">1 + N RTTs 🚨</td>
                  <td className="py-3 px-4 text-rose-400">Severe Latency Multiplier</td>
                  <td className="py-3 px-4 text-rose-400 font-sans">Never in production!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: Visual Network Waterfalls */}
        <section id="svg-architecture" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: N+1 Network Waterfall vs Eager Batch Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Visualizing network packet round-trips between application server and MySQL.
            </p>
          </div>

          <div className="space-y-8">
            {/* SVG 1: Network Waterfall Comparison */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-cyan-300">
                  Figure 11.1: The N+1 Network Round-Trip Waterfall vs Single-Query Eager Join
                </h3>
                <span className="text-xs text-slate-400 font-mono">TCP / Network Layer</span>
              </div>

              <div className="w-full overflow-x-auto bg-slate-950 p-4 rounded-xl border border-slate-800">
                <svg
                  viewBox="0 0 950 400"
                  className="w-full max-w-4xl mx-auto block font-sans"
                  style={{ minWidth: "700px" }}
                >
                  <defs>
                    <linearGradient id="gradN1Green" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#065f46" />
                      <stop offset="100%" stopColor="#047857" />
                    </linearGradient>
                    <linearGradient id="gradN1Red" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="100%" stopColor="#e11d48" />
                    </linearGradient>
                    <marker id="arrowN1Green" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#34d399" />
                    </marker>
                    <marker id="arrowN1Red" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                      <polygon points="0 0, 8 4, 0 8" fill="#f43f5e" />
                    </marker>
                  </defs>

                  {/* Left Box: N+1 Network Waterfall */}
                  <rect x="30" y="40" width="420" height="320" rx="10" fill="#0f172a" stroke="#f43f5e" strokeWidth="1.5" />
                  <text x="240" y="70" fill="#fb7185" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ❌ N+1 Network Waterfall (1 + 50 Queries)
                  </text>
                  <text x="240" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Application Server &harr; MySQL Database (Serial TCP Loops)
                  </text>

                  {/* Waterfall Bars */}
                  <g transform="translate(60, 110)">
                    <rect x="0" y="0" width="120" height="18" rx="3" fill="#38bdf8" />
                    <text x="60" y="13" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">Query 1: Get Courses</text>

                    <rect x="40" y="25" width="90" height="16" rx="3" fill="#f43f5e" />
                    <text x="85" y="37" fill="#ffffff" fontSize="8" textAnchor="middle">Query 2: Students(C1)</text>

                    <rect x="80" y="45" width="90" height="16" rx="3" fill="#f43f5e" />
                    <text x="125" y="57" fill="#ffffff" fontSize="8" textAnchor="middle">Query 3: Students(C2)</text>

                    <rect x="120" y="65" width="90" height="16" rx="3" fill="#f43f5e" />
                    <text x="165" y="77" fill="#ffffff" fontSize="8" textAnchor="middle">Query 4: Students(C3)</text>

                    <text x="200" y="105" fill="#fca5a5" fontSize="11" fontWeight="bold">. . . 47 MORE QUERIES . . .</text>
                  </g>

                  <rect x="50" y="250" width="380" height="90" rx="6" fill="url(#gradN1Red)" />
                  <text x="240" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Total Duration: 185.0 ms · 51 Network RTTs
                  </text>
                  <text x="240" y="295" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    Holds DB Connection Open for 185ms &rarr; Starves Connection Pool!
                  </text>
                  <text x="240" y="315" fill="#fecdd3" fontSize="10" textAnchor="middle">
                    Severe thread starvation under 500 concurrent users 🚨
                  </text>

                  {/* Right Box: Single Eager Join */}
                  <rect x="490" y="40" width="430" height="320" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="705" y="70" fill="#34d399" fontSize="14" fontWeight="bold" textAnchor="middle">
                    ⚡ Eager JOIN / Batch IN (1 Single Query)
                  </text>
                  <text x="705" y="90" fill="#94a3b8" fontSize="11" textAnchor="middle">
                    Single Atomic TCP Request &amp; Response Packet
                  </text>

                  <g transform="translate(520, 120)">
                    <rect x="0" y="0" width="370" height="55" rx="6" fill="#1e293b" stroke="#047857" />
                    <text x="185" y="25" fill="#a7f3d0" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Single Eager Query Dispatched
                    </text>
                    <text x="185" y="42" fill="#6ee7b7" fontSize="9" textAnchor="middle">
                      SELECT * FROM courses LEFT JOIN enrollments...
                    </text>

                    <rect x="0" y="75" width="370" height="35" rx="4" fill="#047857" />
                    <text x="185" y="97" fill="#ffffff" fontSize="11" fontWeight="bold" textAnchor="middle">
                      Complete Tabular Payload Returned in 1 Packet ⚡
                    </text>
                  </g>

                  <rect x="520" y="250" width="370" height="90" rx="6" fill="url(#gradN1Green)" />
                  <text x="705" y="275" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">
                    Total Duration: 2.1 ms · Exactly 1 Network RTT!
                  </text>
                  <text x="705" y="295" fill="#ecfdf5" fontSize="10" textAnchor="middle">
                    Connection released back to pool in 2.1ms (90x Concurrency Boost!)
                  </text>
                  <text x="705" y="315" fill="#a7f3d0" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Zero Connection Pool Saturation ✅
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live N+1 Elimination Workbench */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive N+1 Elimination Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Toggle between real-world architectural strategies to inspect SQL scripts, network metrics, and latency benchmarks.
            </p>
          </div>

          {/* Scenario Tab Buttons */}
          <div className="flex flex-wrap gap-2.5">
            {Object.keys(n1Scenarios).map((key) => {
              const scenario = n1Scenarios[key];
              const isSelected = selectedN1Scenario === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedN1Scenario(key)}
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
                {n1Scenarios[selectedN1Scenario].title}
              </h3>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-bold self-start sm:self-auto",
                  n1Scenarios[selectedN1Scenario].badgeColor === "emerald" &&
                    "bg-emerald-950 text-emerald-300 border border-emerald-800",
                  n1Scenarios[selectedN1Scenario].badgeColor === "cyan" &&
                    "bg-cyan-950 text-cyan-300 border border-cyan-800",
                  n1Scenarios[selectedN1Scenario].badgeColor === "amber" &&
                    "bg-amber-950 text-amber-300 border border-amber-800",
                  n1Scenarios[selectedN1Scenario].badgeColor === "rose" &&
                    "bg-rose-950 text-rose-300 border border-rose-800"
                )}
              >
                {n1Scenarios[selectedN1Scenario].badge}
              </span>
            </div>

            {/* SQL Script Block */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                SQL Implementation &amp; Pattern Comparison:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm font-mono text-cyan-300 overflow-x-auto leading-relaxed scrollbar-thin scrollbar-thumb-slate-700">
                {n1Scenarios[selectedN1Scenario].sqlQuery}
              </pre>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                Network Round-Trip &amp; Latency Footprint:
              </span>
              <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
                <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                  <thead className="bg-slate-900/80 text-cyan-400 font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-2.5 px-4">Pattern Variant</th>
                      <th className="py-2.5 px-4">Query Count</th>
                      <th className="py-2.5 px-4">Network RTTs</th>
                      <th className="py-2.5 px-4">Conn Hold Time</th>
                      <th className="py-2.5 px-4">Total Latency</th>
                      <th className="py-2.5 px-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 font-mono text-xs">
                    {n1Scenarios[selectedN1Scenario].resultRows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/50">
                        <td className="py-3 px-4 font-bold text-white font-sans">{row.strategy}</td>
                        <td className="py-3 px-4 text-cyan-300">{row.queryCount}</td>
                        <td className="py-3 px-4 text-amber-300">{row.networkRoundTrips}</td>
                        <td className="py-3 px-4 text-slate-300">{row.dbConnHoldTime}</td>
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
                {n1Scenarios[selectedN1Scenario].explanation}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 5: Detecting N+1 in Production */}
        <section id="detection-tools" className="space-y-6">
          <div className="border-l-4 border-amber-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. How to Detect N+1 Queries in Production
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Diagnostic queries and observability tools to catch N+1 storms before they cause outages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-cyan-400 font-mono">Performance Schema Statement Digests</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Query `events_statements_summary_by_digest` to find query templates with massive execution counts (`COUNT_STAR`) and low latency per execution:
              </p>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
{`SELECT 
    SCHEMA_NAME, 
    DIGEST_TEXT, 
    COUNT_STAR, 
    AVG_TIMER_WAIT/1000000000 AS avg_latency_ms 
FROM performance_schema.events_statements_summary_by_digest 
ORDER BY COUNT_STAR DESC 
LIMIT 5;`}
              </pre>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h3 className="text-base font-bold text-emerald-400 font-mono">Application CI/CD Query Assertions</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Add automated query count assertions in unit/integration tests to ensure no developer accidentally merges a lazy loading loop:
              </p>
              <pre className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
{`// Automated Integration Test Assertion:
const queryLog = [];
db.on('query', q => queryLog.push(q));

await request(app).get('/api/departments/1/courses');
expect(queryLog.length).toBeLessThanOrEqual(2);`}
              </pre>
            </div>
          </div>
        </section>

        {/* SECTION 6: Production Case Studies */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Production Case Studies: Barrackpore &amp; Kolkata Systems
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Real-world N+1 elimination eliminating connection pool exhaustion.
            </p>
          </div>

          <div className="space-y-6">
            {/* Case 1: Mamata & Susmita's Barrackpore Course Catalog */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing Prisma ORM N+1 on 120 Course Offerings
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Pool Saturation Resolved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Barrackpore student portal, loading the course catalog fired 1 query for 120 courses, and then mapped over each course to query enrolled student counts, firing 121 queries per HTTP request and crashing the Node.js connection pool under 200 concurrent users.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-emerald-400 font-bold block">Batch Aggregation Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Refactored from 121 serial queries to 1 single aggregated JOIN:
SELECT 
    c.course_id, 
    c.course_name, 
    c.department_id, 
    COUNT(e.enrollment_id) AS total_enrolled,
    COALESCE(SUM(e.fee_paid_inr), 0) AS total_fees_collected_inr
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
WHERE c.department_id = 1
GROUP BY c.course_id, c.course_name, c.department_id;

-- Result: Latency dropped from 420 ms -> 3.2 ms (130x faster)!`}
                </pre>
              </div>
            </div>

            {/* Case 2: Abhronila & Debangshu's Kolkata ₹ Billing Invoices */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Batching 500 Serial ₹ Fee Receipt Updates
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Write N+1 Eliminated
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In the Kolkata corporate office, a daily automated reconciliation script looped through 500 fee transaction receipts, firing individual `UPDATE fee_receipts SET status = 'Reconciled' WHERE id = ?` statements, locking tables for 4.2 seconds.
              </p>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-cyan-400 font-bold block">Batch UPDATE Fix:</span>
                <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`-- Batched 500 individual statements into 1 atomic transaction:
UPDATE fee_receipts 
SET status = 'Reconciled', reconciled_at = NOW() 
WHERE receipt_id IN (/* 500 receipt IDs passed as array parameter */);

-- Result: Execution dropped from 4,200 ms -> 12.0 ms (350x speedup)!`}
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
              Avoid dangerous anti-patterns when designing application data access layers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Queries Inside Array.prototype.map()
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing <code className="text-rose-300 font-mono">await Promise.all(items.map(async i =&gt; db.query(...)))</code> fires dozens of concurrent queries simultaneously, flooding connection pool queues and causing database thread spikes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Fix: Collect IDs into an array and fire a single WHERE id IN (...) query.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Multi-Level N+1 Explosions (1 + N + M)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Nesting loops across 3 entity tiers (Department &rarr; Course &rarr; Student &rarr; Fee) causes an exponential query storm: 10 depts &times; 20 courses &times; 50 students = <strong>10,201 queries</strong> for 1 page view!
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Fix: Use DataLoader batching or MySQL 8.0 JSON aggregation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use DataLoaders in GraphQL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                In GraphQL or microservice backends, wrap entity resolvers in DataLoaders to coalesce individual item requests across the event loop tick into a single batch `WHERE id IN (...)` query.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero N+1 queries regardless of GraphQL query nesting depth.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Assert Query Counts in CI Tests
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Integrate database query interceptors into your automated test suite to verify that list endpoints execute at most 1 or 2 queries.
              </p>
              <div className="text-xs text-slate-400">
                Catches accidental lazy-loading regressions before they reach production.
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
              Key takeaways for eliminating N+1 queries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-amber-400">✓</span> N+1 Elimination Checklist
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">01.</span>
                  <span><strong className="text-emerald-400">No Queries in Loops</strong> = Never fire database queries inside `for`, `map`, or `forEach`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold font-mono">02.</span>
                  <span><strong className="text-cyan-400">Eager JOINs</strong> = Fetch parent and child records in a single `LEFT JOIN` query.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-amber-400 font-bold font-mono">03.</span>
                  <span><strong className="text-amber-400">Batch WHERE IN</strong> = Use 2-query pattern to eliminate Cartesian product duplication.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold font-mono">04.</span>
                  <span><strong className="text-rose-400">JSON Aggregation</strong> = Use `JSON_ARRAYAGG` in MySQL 8.0 for nested DTOs.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe connection pool health...”</span>
                  When an API endpoint suffers from N+1, the database CPU may look normal (5%), but connection pool queues explode because connections are held open waiting for network round-trips!
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about batch writes...”</span>
                  N+1 applies to writes too! Never execute `UPDATE` in a loop. Collect IDs and execute a single batch `UPDATE ... WHERE id IN (...)` to save hundreds of disk fsyncs!
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
              Comprehensive reference questions covering the N+1 problem, ORM lazy loading, and batching architectures.
            </p>
          </div>

          <FAQTemplate
            title="N+1 Query Anti-Patterns FAQs"
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
            title="Identifying and Eliminating N+1 Query Anti-Patterns"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic11_note.txt"
          />

          <Teacher
            note="The N+1 query problem is the single greatest performance killer in modern full-stack web applications. It rarely shows up in small test databases with 5 records, but the moment you deploy to production with thousands of students in Barrackpore or Kolkata, your server connection pool collapses under hundreds of sequential network round-trips. Always remember: the database is a set-based engine built to join and aggregate millions of rows in milliseconds. Never force it to act as a key-value store inside a programming loop—use eager joins, batch `WHERE IN` queries, or MySQL 8.0 JSON aggregations!"
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
