import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Analyzing Slow Queries using the mysqldumpslow Utility
 * Module: 004_005_logs-monitoring-and-slow-queries
 *
 * @component
 * @returns {JSX.Element} Interactive mysqldumpslow workbench: parsing and aggregating slow query logs, abstracting parameter literals (N/'S'), sorting by cumulative total time (-s t) vs average execution time (-s at), regex pattern filtering (-g), and executing complete EXPLAIN ANALYZE tuning workflows.
 */
const Topic5 = () => {
  // Interactive mysqldumpslow State
  const [selectedDumpPhase, setSelectedDumpPhase] = useState("phase1_total_time_triage");

  const dumpPhases = {
    phase1_total_time_triage: {
      phaseNumber: "Phase 1: Total Time Triage (-s t)",
      title: "1. Prioritizing Highest Cumulative Server Impact (-s t -t 10)",
      badge: "Primary Triage Recipe",
      badgeColor: "emerald",
      sqlSnippet: `# 🏆 RECIPE 1: TOP 10 QUERIES BY TOTAL CUMULATIVE SERVER TIME:
mysqldumpslow -s t -t 10 /var/log/mysql/slow_query.log

# 📊 SAMPLE OUTPUT DIGEST:
# Count: 8000  Time=0.60s (4800s)  Lock=0.00s (0s)  Rows=1.0 (8000), app[app]@localhost
SELECT price, stock FROM kolkata_retail.products WHERE barcode = 'S';

# Analysis:
# - Query ran 8,000 times at 0.60s avg → 4,800s total CPU time consumed!
# - Optimizing this saves 80 minutes of server load daily! ⚡`,
      explanation:
        "Sorting by total cumulative execution time (-s t) identifies high-frequency queries that drain the greatest total CPU and I/O capacity over time, delivering the largest compound server performance gains.",
      keyTakeaways: [
        "-s t sorts by total cumulative execution time across all query runs.",
        "-t 10 limits the output to the Top 10 most impactful query digests.",
        "Abstracts numbers to N and strings to 'S' to group identical query templates."
      ]
    },
    phase2_avg_time_outliers: {
      phaseNumber: "Phase 2: Single Outliers (-s at)",
      title: "2. Finding Single Slowest Analytics Outliers (-s at -t 10)",
      badge: "Latency Outliers",
      badgeColor: "cyan",
      sqlSnippet: `# 🐢 RECIPE 2: TOP 10 SINGLE SLOWEST RUNAWAY QUERIES:
mysqldumpslow -s at -t 10 /var/log/mysql/slow_query.log

# 📊 SAMPLE OUTPUT DIGEST:
# Count: 2  Time=48.50s (97s)  Lock=0.01s (0s)  Rows=50000.0 (100000), analyst[analyst]@localhost
SELECT o.id, c.name, SUM(o.amount) 
FROM orders o JOIN customers c ON o.customer_id = c.id 
WHERE o.order_date BETWEEN 'S' AND 'S' 
GROUP BY o.id, c.name;`,
      explanation:
        "Sorting by average execution time (-s at) isolates extreme individual slow queries (like unindexed batch reports or cartesian joins taking 40+ seconds) that cause latency spikes for connected users.",
      keyTakeaways: [
        "-s at sorts by average execution time per individual query invocation.",
        "Catches heavy reporting queries that lock memory and scan millions of rows.",
        "Ideal for identifying queries that should be offloaded to read replicas."
      ]
    },
    phase3_regex_table_filtering: {
      phaseNumber: "Phase 3: Regex Filtering (-g)",
      title: "3. Targeted Table & Pattern Filtering (-g 'pattern')",
      badge: "Targeted Inspection",
      badgeColor: "purple",
      sqlSnippet: `# 🎯 RECIPE 3: FILTERING SLOW QUERIES FOR A SPECIFIC TABLE:
mysqldumpslow -s t -t 5 -g "orders" /var/log/mysql/slow_query.log

# 🎯 RECIPE 4: FILTERING BY APPLICATION SERVICE USER:
mysqldumpslow -s t -t 5 -g "app_billing" /var/log/mysql/slow_query.log

# 🎯 RECIPE 5: PARSING GZIPPED ROTATED ARCHIVES:
zcat /var/log/mysql/slow_query.log.1.gz | mysqldumpslow -s t -t 10 -`,
      explanation:
        "The -g flag filters digests using regular expressions, allowing developers to isolate slow queries touching specific tables, users, or schema names. Piping through zcat enables parsing compressed historical logs.",
      keyTakeaways: [
        "-g 'pattern' filters query digests by regex match.",
        "Piping with '-' reads from standard input for gzipped log analysis.",
        "Enables targeted performance audits for specific microservices."
      ]
    },
    phase4_explain_analyze_workflow: {
      phaseNumber: "Phase 4: Full Tuning Workflow",
      title: "4. End-to-End Tuning: mysqldumpslow → EXPLAIN ANALYZE",
      badge: "Optimization Runbook",
      badgeColor: "rose",
      sqlSnippet: `# 🛠️ END-TO-END QUERY OPTIMIZATION RUNBOOK:

-- Step 1: Extract Top Digest from mysqldumpslow:
-- SELECT * FROM orders WHERE status = 'S' AND total > N ORDER BY order_date DESC;

-- Step 2: Plug in realistic production parameters & run EXPLAIN ANALYZE:
EXPLAIN ANALYZE
SELECT * FROM kolkata_retail.orders 
WHERE status = 'PENDING' AND total_amount > 5000 
ORDER BY order_date DESC LIMIT 10;

-- Step 3: Add targeted composite index to eliminate filesort & scan:
CREATE INDEX idx_status_total_date ON kolkata_retail.orders(status, total_amount, order_date DESC);

-- Step 4: Re-run EXPLAIN ANALYZE & verify index lookup in <1ms! ⚡`,
      explanation:
        "The complete query tuning runbook: extract top digests with mysqldumpslow, substitute test parameters into EXPLAIN ANALYZE to inspect execution costs, create covering composite indexes, and verify sub-millisecond execution.",
      keyTakeaways: [
        "Extract query templates directly from mysqldumpslow digests.",
        "Use EXPLAIN ANALYZE to pinpoint exact table scan and sort iterators.",
        "Deploy covering indexes to achieve sub-millisecond execution speeds."
      ]
    }
  };

  const currentPhase = dumpPhases[selectedDumpPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.5: Server Logs, Slow Queries &amp; Performance Schema
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 5 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          Analyzing Slow Queries using <span className="text-emerald-400">mysqldumpslow</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the definitive slow query log aggregator in MySQL: abstracting parameter literals (<code>N</code> and <code>&apos;S&apos;</code>), sorting by total cumulative server impact (<code>-s t</code>) vs average latency (<code>-s at</code>), filtering by table regex (<code>-g</code>), and executing end-to-end <code>EXPLAIN ANALYZE</code> tuning runbooks.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: mysqldumpslow Pillars ───────────────────────── */}
        <section id="dump-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of mysqldumpslow Analysis
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How mysqldumpslow converts raw multi-gigabyte log files into actionable, prioritized optimization blueprints.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Literal Abstraction</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replaces integers with <code>N</code> and strings with <code>&apos;S&apos;</code> to group queries by statement structure.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Total Time (-s t)</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sorts by cumulative server impact, prioritizing queries that drain the most total CPU and disk resources.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Regex Filter (-g)</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Filters output to target specific tables, microservices, or problematic application workflows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">EXPLAIN Pipeline</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Directly feeds extracted query templates into <code>EXPLAIN ANALYZE</code> to design composite indexes.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive mysqldumpslow CLI Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Total Time triage (-s t), Average Time outliers (-s at), regex pattern filters (-g), and EXPLAIN ANALYZE workflows.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(dumpPhases).map((phaseKey) => {
              const phase = dumpPhases[phaseKey];
              const isSelected = selectedDumpPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedDumpPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {phase.phaseNumber}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  {currentPhase.phaseNumber}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentPhase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentPhase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentPhase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentPhase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentPhase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentPhase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentPhase.explanation}
            </p>

            {/* CLI Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                CLI Command Recipes &amp; Digest Outputs:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentPhase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentPhase.keyTakeaways.map((item, i) => (
                  <li key={i} className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/60 flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: Real-World Case Studies ─────────────────────── */}
        <section id="case-studies" className="space-y-6">
          <div className="border-l-4 border-purple-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              3. Real-World Engineering Scenarios in Bengal
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              mysqldumpslow case studies in Barrackpore and Kolkata demonstrating high-frequency triage and lock wait discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 80 Minutes of Daily Latency in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  4,800s Saved
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS terminals were experiencing occasional micro-delays. Mamata ran <code>mysqldumpslow -s t -t 5</code> and discovered a barcode price lookup query running 8,000 times daily with 0.6s average latency, consuming 4,800 cumulative seconds of CPU time. Adding a covering index dropped latency to 1ms, saving 79 minutes of server capacity daily across ₹1.2 Crores in retail checkout volume.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Lock Contention Triage (-s l) in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Lock Contention Cleared
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing ₹500 Crores in banking assets required auditing lock contention. Debangshu executed <code>mysqldumpslow -s l -t 5</code> to sort digests by total lock wait time. The report exposed an unindexed batch reconciliation report that was locking ledger tables for 3,200 cumulative seconds. Offloading the report to a read replica cleared all primary locking contention.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: Senior Pitfalls & Best Practices ────────────── */}
        <section id="pitfalls-rules" className="space-y-6">
          <div className="border-l-4 border-rose-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              4. Senior Pitfalls &amp; Production Best Practices
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Avoid wasting engineering effort on low-impact queries and neglecting high-frequency bottlenecks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Optimizing Single Outliers Instead of Total Time
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Spending days optimizing a 5-second query that runs once a week saves only 5 seconds, while optimizing a 0.5s query run 20,000 times saves 10,000 seconds of server processing.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always prioritize queries sorted by Total Time (-s t) first.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Neglecting Parameter Abstraction
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Searching raw slow logs with grep without normalizing parameter literals spreads identical query patterns across thousands of lines, obscuring the primary bottleneck.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use mysqldumpslow to group queries into unified digests.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Automate Daily Cron Digests
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Schedule a daily cron job running <code>mysqldumpslow -s t -t 10</code> to email a daily slow query digest to database and backend teams.
              </p>
              <div className="text-xs text-slate-400">
                Enables proactive detection of newly deployed query regressions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Pair with EXPLAIN ANALYZE
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Plug extracted <code>mysqldumpslow</code> digests into <code>EXPLAIN ANALYZE</code> with realistic parameters to inspect actual tree iterators and row scan costs.
              </p>
              <div className="text-xs text-slate-400">
                Pinpoints exact missing composite indexes and filesort bottlenecks.
              </div>
            </div>
          </div>
        </section>

        {/* ─── SECTION 5: Printable Note & Teacher Advice ──────────────── */}
        <section id="printable-note" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              5. Printable Study Note &amp; Teacher Advice
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Download complete printable notes and review key takeaways from Sir Sukanta Hui.
            </p>
          </div>

          <PlainTextPrint
            title="Topic 5: Analyzing Slow Queries using the mysqldumpslow Utility"
            content={noteText}
          />

          <Teacher
            note="Never analyze a multi-gigabyte slow query log by hand with a text editor! Always use mysqldumpslow! Remember the golden triage command: mysqldumpslow -s t -t 10 /path/to/slow.log. Sorting by Total Time (-s t) ensures you target the queries that consume the highest cumulative CPU and I/O time. Once you find the top offender, substitute parameters and run EXPLAIN ANALYZE to design the perfect composite index!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of mysqldumpslow flags, sort options (-s t, -s at, -s l), literal abstraction, and EXPLAIN ANALYZE workflows.
            </p>
          </div>

          <FAQTemplate
            title="mysqldumpslow Analysis &amp; Triage FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
