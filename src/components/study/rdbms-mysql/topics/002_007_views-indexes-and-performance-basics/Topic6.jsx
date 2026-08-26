import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Materialized Views Concept (and MySQL Cache Table Emulation)
 * Module: 002_007_views-indexes-and-performance-basics
 *
 * @component
 * @returns {JSX.Element} Comprehensive interactive tutorial on materialized views, caching strategies, and MySQL emulation techniques.
 */
const Topic6 = () => {
  // Interactive Simulator State
  const [selectedStrategy, setSelectedStrategy] = useState("atomic_table_swap");

  const emulationStrategies = {
    atomic_table_swap: {
      title: "1. Zero-Downtime Atomic Table Swapping (RENAME TABLE)",
      badge: "Zero-Downtime Pipeline",
      badgeColor: "emerald",
      sqlQuery: `-- Step 1: Create and populate the staging summary cache:
CREATE TABLE mv_academy_kpis_staging LIKE mv_academy_kpis_prod;

INSERT INTO mv_academy_kpis_staging
SELECT 
    s.centre_city AS branch_city,
    c.course_title AS stream_title,
    COUNT(DISTINCT en.student_id) AS total_students,
    COALESCE(SUM(p.amount_inr), 0.00) AS gross_tuition_inr,
    NOW() AS last_refreshed_at
FROM students s
JOIN enrollments en ON s.student_id = en.student_id
JOIN courses c ON en.course_id = c.course_id
LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id AND p.status = 'SUCCESS'
GROUP BY s.centre_city, c.course_title;

-- Step 2: Atomically swap tables in a SINGLE operation (Zero Read Outage!):
RENAME TABLE 
    mv_academy_kpis_prod TO mv_academy_kpis_old,
    mv_academy_kpis_staging TO mv_academy_kpis_prod;

-- Step 3: Cleanup old table:
DROP TABLE mv_academy_kpis_old;`,
      resultRows: [
        { branch: "Barrackpore Campus", stream: "React & Redux Pro", students: "65 Enrolled", revenue: "₹16,25,000.00", latency: "0.8 ms (Indexed Seek)", status: "Atomic Swapped (Fresh)" },
        { branch: "Barrackpore Campus", stream: "Java Microservices Pro", students: "48 Enrolled", revenue: "₹12,00,000.00", latency: "0.9 ms (Indexed Seek)", status: "Atomic Swapped (Fresh)" },
        { branch: "Kolkata Central", stream: "Python Data Science", students: "50 Enrolled", revenue: "₹12,50,000.00", latency: "0.7 ms (Indexed Seek)", status: "Atomic Swapped (Fresh)" },
      ],
      explanation:
        "The RENAME TABLE command executes in a single atomic database lock. Active web queries never experience 0-row blips or table-missing errors during the background refresh.",
    },
    scheduled_event_refresh: {
      title: "2. Scheduled Refresh via MySQL Event Scheduler",
      badge: "Automated Cron Job",
      badgeColor: "cyan",
      sqlQuery: `-- 1. Ensure event scheduler is running:
SET GLOBAL event_scheduler = ON;

-- 2. Define recurring hourly cache refresh event:
CREATE EVENT evt_refresh_academy_summary_kpis
ON SCHEDULE EVERY 1 HOUR
STARTS CURRENT_TIMESTAMP
DO
BEGIN
    TRUNCATE TABLE mv_academy_hourly_cache;
    INSERT INTO mv_academy_hourly_cache
    SELECT 
        s.centre_city,
        COUNT(DISTINCT s.student_id),
        COALESCE(SUM(p.amount_inr), 0.00),
        ROUND(AVG(e.marks_pct), 2),
        NOW()
    FROM students s
    JOIN enrollments en ON s.student_id = en.student_id
    LEFT JOIN fee_payments p ON en.enrollment_id = p.enrollment_id AND p.status = 'SUCCESS'
    LEFT JOIN student_exam_scores e ON en.enrollment_id = e.enrollment_id
    GROUP BY s.centre_city;
END;`,
      resultRows: [
        { branch: "Barrackpore Campus", stream: "All Active Streams", students: "113 Students", revenue: "₹28,25,000.00", latency: "1.1 ms (From Cache)", status: "Refreshed via Event" },
        { branch: "Kolkata Central", stream: "All Active Streams", students: "95 Students", revenue: "₹23,75,000.00", latency: "1.0 ms (From Cache)", status: "Refreshed via Event" },
      ],
      explanation:
        "MySQL Event Scheduler executes the analytical rollup in the background every hour, shielding end users from running heavy multi-table joins on every page load.",
    },
    trigger_incremental_maintenance: {
      title: "3. Real-Time Incremental Maintenance via Database Triggers",
      badge: "Real-Time Delta Sync",
      badgeColor: "indigo",
      sqlQuery: `-- Trigger incrementally increments branch turnover on every payment:
CREATE TRIGGER trg_fee_payment_after_insert
AFTER INSERT ON fee_payments
FOR EACH ROW
BEGIN
    IF NEW.status = 'SUCCESS' THEN
        UPDATE mv_branch_realtime_summary s
        JOIN enrollments en ON en.enrollment_id = NEW.enrollment_id
        JOIN students st ON st.student_id = en.student_id
        SET 
            s.total_collected_inr = s.total_collected_inr + NEW.amount_inr,
            s.total_transactions = s.total_transactions + 1,
            s.last_updated_at = NOW()
        WHERE s.centre_city = st.centre_city;
    END IF;
END;`,
      resultRows: [
        { branch: "Barrackpore Campus", stream: "Real-Time Ledger", students: "Live Delta Sync", revenue: "₹28,50,000.00 (+₹25,000)", latency: "0.5 ms (Point Seek)", status: "Incremental Sync" },
      ],
      explanation:
        "Database triggers apply deltas immediately on each transaction, maintaining 100% real-time accuracy in the summary table without requiring full table scans.",
    },
  };

  const navItems = [
    { id: "theory", label: "1. Materialized Views Concept" },
    { id: "virtual-vs-materialized", label: "2. Virtual vs Materialized Matrix" },
    { id: "svg-diagrams", label: "3. Architecture & Swapping SVGs" },
    { id: "interactive-sandbox", label: "4. Live Emulation Sandbox" },
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
            <span>Module 002_007</span>
            <span>•</span>
            <span>Topic 6 of 14</span>
            <span>•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 text-xs">
              Performance Caching Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Materialized Views Concept & MySQL Cache Table Emulation
          </h1>
          <p className="mt-3 text-lg sm:text-xl text-slate-300 max-w-3xl leading-relaxed">
            Overcome MySQL's lack of native materialized views. Learn how to architect sub-millisecond analytical dashboards using{" "}
            <code className="text-emerald-300 font-mono font-bold">Zero-Downtime Table Swapping</code>,{" "}
            <code className="text-cyan-300 font-mono font-bold">MySQL Event Schedulers</code>, and{" "}
            <code className="text-indigo-300 font-mono font-bold">Incremental Triggers</code>.
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
        {/* SECTION 1: Concept */}
        <section id="theory" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. What is a Materialized View?
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Trading slight data freshness for lightning-fast sub-millisecond query performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 font-mono text-xs font-bold border border-cyan-800">
                  VIRTUAL
                </span>
                <h3 className="text-base font-bold text-white">Standard Virtual View</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stores only query text in catalog. Computes dynamically on read.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>100% real-time data freshness.</li>
                <li>Zero physical disk space.</li>
                <li>High CPU/IO latency on heavy 5-table joins.</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 font-mono text-xs font-bold border border-emerald-800">
                  MATERIALIZED
                </span>
                <h3 className="text-base font-bold text-white">Materialized Cache Table</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Stores precomputed result rows in physical disk pages with B-Tree indexes.
              </p>
              <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                <li>Sub-millisecond read latency (O(log N) point seeks).</li>
                <li>Requires physical disk storage.</li>
                <li>Data is periodic (stale between background refreshes).</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: Virtual vs Materialized Comparison Matrix */}
        <section id="virtual-vs-materialized" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Architectural Comparison Matrix
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Evaluating storage, latency, and operational trade-offs.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/60 shadow-xl">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-950 text-slate-100 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-mono text-cyan-400">Engineering Dimension</th>
                  <th className="py-3.5 px-4 font-mono text-white">Standard Virtual View</th>
                  <th className="py-3.5 px-4 font-mono text-emerald-400">Emulated Materialized View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-xs sm:text-sm font-sans">
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Query Execution Time</td>
                  <td className="py-3 px-4 text-rose-400">1,500 ms (Heavy analytical join)</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">0.8 ms (Precomputed index seek)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Disk Storage Consumed</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">0 bytes (Metadata only)</td>
                  <td className="py-3 px-4 text-slate-300">Stores physical row pages + indexes</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">Data Freshness</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Real-Time Live</td>
                  <td className="py-3 px-4 text-amber-400">Snapshot (Stale between refreshes)</td>
                </tr>
                <tr className="hover:bg-slate-800/40">
                  <td className="py-3 px-4 font-bold text-white font-mono">B-Tree Indexing Support</td>
                  <td className="py-3 px-4 text-slate-400">No direct indexes allowed</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">Full Primary & Secondary B-Trees</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: SVG Architecture Diagrams */}
        <section id="svg-diagrams" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Visual Architecture: Zero-Downtime Table Swapping Pipeline
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How the atomic RENAME TABLE pattern guarantees 100% read availability during batch cache refreshes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="text-cyan-400 font-mono">Diagram A:</span> Zero-Downtime Atomic RENAME Swapping Mechanism
            </h3>

            <div className="w-full overflow-x-auto flex justify-center py-4 bg-slate-950 rounded-xl border border-slate-800/80">
              <svg viewBox="0 0 850 250" className="w-full max-w-3xl h-auto" xmlns="http://www.w3.org/2000/svg">
                {/* Step 1: Background Build */}
                <g>
                  <rect x="20" y="30" width="240" height="90" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="140" y="55" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">1. Build in Staging</text>
                  <rect x="35" y="70" width="210" height="35" rx="4" fill="#1e293b" />
                  <text x="140" y="92" fill="#a5b4fc" fontSize="9" textAnchor="middle font-mono">INSERT INTO mv_staging</text>
                </g>

                {/* Step 2: Atomic Swap */}
                <g>
                  <rect x="300" y="20" width="250" height="190" rx="10" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
                  <text x="425" y="45" fill="#34d399" fontSize="12" fontWeight="bold" textAnchor="middle">2. Atomic RENAME SWAP</text>
                  <rect x="315" y="65" width="220" height="40" rx="4" fill="#022c22" />
                  <text x="425" y="85" fill="#a7f3d0" fontSize="8" textAnchor="middle font-mono">RENAME TABLE</text>
                  <text x="425" y="98" fill="#6ee7b7" fontSize="8" textAnchor="middle font-mono">prod TO old, staging TO prod;</text>

                  <rect x="315" y="125" width="220" height="35" rx="4" fill="#0f172a" />
                  <text x="425" y="146" fill="#38bdf8" fontSize="9" textAnchor="middle font-bold">Zero Lock / Zero Downtime</text>
                </g>

                {/* Step 3: Production Reads */}
                <g>
                  <rect x="590" y="30" width="240" height="90" rx="6" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1.5" />
                  <text x="710" y="55" fill="#c7d2fe" fontSize="11" fontWeight="bold" textAnchor="middle">3. Sub-ms Dashboard Reads</text>
                  <rect x="605" y="70" width="210" height="35" rx="4" fill="#020617" />
                  <text x="710" y="92" fill="#34d399" fontSize="9" textAnchor="middle font-mono">SELECT * FROM mv_prod (0.8 ms)</text>
                </g>

                {/* Flow Arrows */}
                <path d="M 260 75 L 300 75" stroke="#38bdf8" strokeWidth="2" />
                <path d="M 550 75 L 590 75" stroke="#10b981" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Interactive Sandbox */}
        <section id="interactive-sandbox" className="space-y-6">
          <div className="border-l-4 border-indigo-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Interactive Materialized View Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test atomic table swapping, scheduled event refreshes, and trigger-based delta sync live.
            </p>
          </div>

          {/* Selector Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(emulationStrategies).map(([key, item]) => {
              const isActive = selectedStrategy === key;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedStrategy(key)}
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
                    {isActive ? "● Active Caching Strategy" : "○ Run Strategy"}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Workbench */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">{emulationStrategies[selectedStrategy].title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{emulationStrategies[selectedStrategy].explanation}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-mono">
                Sub-Millisecond Read Engine
              </span>
            </div>

            {/* SQL Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>MySQL Emulation DDL Script</span>
                <span className="text-emerald-400">Precomputed Physical Index Cache</span>
              </div>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs sm:text-sm font-mono text-cyan-300 border border-slate-800 overflow-x-auto leading-relaxed">
                {emulationStrategies[selectedStrategy].sqlQuery}
              </pre>
            </div>

            {/* Result Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950/60">
              <table className="w-full text-left text-xs sm:text-sm text-slate-300">
                <thead className="bg-slate-900/90 text-slate-100 font-semibold border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4 font-mono text-cyan-400">branch_location</th>
                    <th className="py-3 px-4 font-mono text-white">course_stream</th>
                    <th className="py-3 px-4 font-mono text-emerald-400">total_students</th>
                    <th className="py-3 px-4 font-mono text-cyan-400">gross_tuition_inr</th>
                    <th className="py-3 px-4 font-mono text-indigo-400">query_latency</th>
                    <th className="py-3 px-4 font-mono text-amber-400">Cache State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 font-mono text-xs">
                  {emulationStrategies[selectedStrategy].resultRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40">
                      <td className="py-3 px-4 font-bold text-cyan-300">{row.branch}</td>
                      <td className="py-3 px-4 font-sans font-semibold text-white">{row.stream}</td>
                      <td className="py-3 px-4 text-emerald-300 font-sans">{row.students}</td>
                      <td className="py-3 px-4 text-slate-300 font-bold">{row.revenue}</td>
                      <td className="py-3 px-4 text-indigo-300 font-bold">{row.latency}</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded text-[11px] font-sans font-medium bg-emerald-950 text-emerald-400 border border-emerald-800">
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
              Real-world implementations of materialized caching in education and high-volume e-commerce.
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
                  Academy Executive Dashboard Precomputed Summary Cache
                </h3>
                <span className="text-xs text-slate-400 font-mono">Location: Barrackpore, Kolkata</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Sukanta Hui deploys an hourly atomic table swap pipeline to precompute branch enrollments and tuition collections for Mamata, Susmita, Abhronila, and Debangshu, reducing executive dashboard load times from 2.8 seconds to 0.6 milliseconds!
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-emerald-300 border border-slate-800 overflow-x-auto">
{`CREATE TABLE mv_academy_branch_summary (
    branch_city VARCHAR(50),
    enrolled_candidate_count INT,
    gross_tuition_collected_inr DECIMAL(12,2),
    avg_performance_grade_pct DECIMAL(5,2),
    last_refreshed_at TIMESTAMP,
    PRIMARY KEY (branch_city)
) ENGINE=InnoDB;

-- Exposed via clean virtual view interface:
CREATE OR REPLACE VIEW view_executive_fast_dashboard AS
SELECT * FROM mv_academy_branch_summary;`}
              </pre>
            </div>

            {/* Case Study 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="p-1.5 rounded bg-cyan-950 text-cyan-400 font-mono text-xs border border-cyan-800">
                    CASE 02
                  </span>
                  E-Commerce Hourly Category Sales Leaderboard
                </h3>
                <span className="text-xs text-slate-400 font-mono">High-Traffic E-Commerce</span>
              </div>
              <p className="text-sm text-slate-300 mb-4 leading-relaxed">
                Precalculating top 10 bestselling product categories every 15 minutes to serve millions of homepage mobile app requests without overloading transactional order tables.
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-xs font-mono text-cyan-300 border border-slate-800 overflow-x-auto">
{`CREATE TABLE mv_top_category_leaderboard (
    category_id INT,
    category_name VARCHAR(100),
    units_sold_24h INT,
    gross_gmv_inr DECIMAL(14,2),
    rank_position INT,
    PRIMARY KEY (category_id),
    INDEX idx_rank (rank_position)
);`}
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
              Avoid production cache outages and write amplification bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>❌</span> The TRUNCATE Transient Read Outage
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code className="text-rose-300 font-mono">TRUNCATE TABLE cache_table;</code> directly on a production table empties it immediately. Any user query hitting the dashboard in that 5-second rebuild window sees a blank screen (0 records)!
              </p>
              <div className="text-xs text-slate-400">
                Fix: Always build in a staging table and use atomic <code className="text-emerald-400 font-mono">RENAME TABLE</code> swapping.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Always Index Summary Cache Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Materialized summary tables are physical InnoDB tables. Always add primary keys and B-Tree indexes on columns used in dashboard filters.
              </p>
              <div className="text-xs text-slate-400">
                Enables instantaneous O(log N) point seeks for dashboard metrics.
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
                  <span>Materialized views persist precomputed rows on disk with B-Tree indexes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">02.</span>
                  <span>MySQL does not natively support CREATE MATERIALIZED VIEW; it is emulated.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">03.</span>
                  <span>Use atomic <code className="text-cyan-300 font-mono">RENAME TABLE</code> swapping to eliminate read-downtime.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold font-mono">04.</span>
                  <span>Include a <code className="text-cyan-300 font-mono">last_refreshed_at</code> timestamp for dashboard data freshness auditing.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-cyan-400">💡</span> Senior Developer Hints
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-cyan-400 font-bold block mb-1">“Observe virtual view abstraction...”</span>
                  Always create a standard virtual view pointing to your physical cache table (<code className="text-cyan-300 font-mono">CREATE VIEW v_kpis AS SELECT * FROM mv_kpis</code>). This decouples application code from your caching mechanics.
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-emerald-400 font-bold block mb-1">“Think about event scheduling...”</span>
                  Ensure <code className="text-cyan-300 font-mono">SET GLOBAL event_scheduler = ON;</code> is configured in your MySQL <code className="text-cyan-300 font-mono">my.cnf</code> to ensure background refresh jobs survive server reboots.
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
              Comprehensive reference questions covering materialized views, cache table emulation, atomic swapping, triggers, and event schedulers.
            </p>
          </div>

          <FAQTemplate
            title="Materialized Views & MySQL Emulation FAQs"
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
            title="Materialized Views Concept (and MySQL Cache Table Emulation)"
            stampEnabled={true}
            showDownload={true}
            downloadButtonText="Download Topic Note (.txt)"
            downloadFileName="topic6_note.txt"
          />

          <Teacher
            note="When students ask why their executive dashboard takes 5 seconds to load, explain the difference between a Virtual View and a Materialized View. A virtual view recalculates everything on every click. A materialized view precomputes and indexes the numbers in advance. In MySQL, the atomic RENAME TABLE swap pattern is the industry standard for keeping dashboards blazing fast with zero read-outage."
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
