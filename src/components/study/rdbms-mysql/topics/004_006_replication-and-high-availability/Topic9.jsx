import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Multi-Threaded Slave (MTS / Parallel Replication) Configuration
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive Multi-Threaded Slave workbench: comparing DATABASE vs LOGICAL_CLOCK parallelism, configuring WRITESET row-level dependency tracking, analyzing last_committed group commit headers, and enforcing replica_preserve_commit_order in MySQL 8.0.
 */
const Topic9 = () => {
  // Interactive MTS Phase State
  const [selectedMtsPhase, setSelectedMtsPhase] = useState("phase1_evolution");

  const mtsPhases = {
    phase1_evolution: {
      phaseNumber: "Phase 1: MTS Architecture Evolution",
      title: "1. The Evolution of Parallel Replication in MySQL",
      badge: "Architecture Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 📜 1. LEGACY SINGLE-THREADED (1 Worker):
-- Sequential execution bottleneck on multi-core servers.

-- 🗄️ 2. DATABASE MODE (MySQL 5.6):
-- SET GLOBAL replica_parallel_type = 'DATABASE';
-- Only parallelizes across different schemas (useless for 1 DB!).

-- ⚡ 3. LOGICAL_CLOCK + WRITESET (MySQL 8.0 State-of-the-Art):
-- SET GLOBAL replica_parallel_type = 'LOGICAL_CLOCK';
-- Parallelizes all non-conflicting transactions across ANY table!`,
      explanation:
        "Multi-Threaded Slave evolved from schema-level parallelism to group-commit and row-level write-set dependency tracking, allowing modern replicas to match the multi-core write throughput of the primary.",
      keyTakeaways: [
        "DATABASE mode is obsolete and fails on single-schema databases.",
        "LOGICAL_CLOCK re適s transactions committed in the same window.",
        "WRITESET calculates row-level hashes for up to 10x higher concurrency."
      ]
    },
    phase2_logical_clock: {
      phaseNumber: "Phase 2: LOGICAL_CLOCK Group Commit",
      title: "2. LOGICAL_CLOCK & Binary Log Group Commit (BLGC)",
      badge: "Group Commit",
      badgeColor: "cyan",
      sqlSnippet: `# 🔍 INSPECTING BINLOG HEADERS VIA MYSQLBINLOG:
# at 450
# GTID last_committed=10 sequence_number=11 (Tx 1)
# at 520
# GTID last_committed=10 sequence_number=12 (Tx 2)
# at 590
# GTID last_committed=10 sequence_number=13 (Tx 3)

-- 💡 Because Tx 1, 2, and 3 share last_committed = 10, they committed
-- concurrently on Primary without lock conflicts! Replica dispatches them
-- to Worker 1, Worker 2, and Worker 3 in parallel!`,
      explanation:
        "The Source tags transactions with last_committed and sequence_number. Transactions with identical last_committed values executed concurrently without lock conflicts, allowing the replica to replay them across multiple worker threads simultaneously.",
      keyTakeaways: [
        "Identical last_committed values indicate non-conflicting transactions.",
        "Coordinator dispatches matching group commit events to idle workers.",
        "Enables multi-threaded replay across single or multi-database schemas."
      ]
    },
    phase3_writeset_tracking: {
      phaseNumber: "Phase 3: WRITESET Dependency Tracking",
      title: "3. Row-Level WRITESET Dependency Tracking",
      badge: "Maximum Concurrency",
      badgeColor: "purple",
      sqlSnippet: `-- ⚙️ MAXIMUM CONCURRENCY ON PRIMARY (my.cnf):
[mysqld]
transaction_write_set_extraction = XXHASH64
binlog_transaction_dependency_tracking = WRITESET
binlog_transaction_dependency_history_size = 25000

-- 💡 How it works:
-- Primary generates 64-bit row hashes for modified primary/unique keys.
-- Transactions that touch DIFFERENT rows execute in parallel on replicas
-- even if they committed at different points in time!`,
      explanation:
        "WRITESET extracts 64-bit row hashes for modified primary and unique keys. If two transactions do not touch the same rows, the replica executes them in parallel even if they committed in different group commit windows.",
      keyTakeaways: [
        "Extracts cryptographic XXHASH64 row hashes on modified primary keys.",
        "Parallelizes transactions touching different rows across different times.",
        "Requires binlog_format = ROW on the primary server."
      ]
    },
    phase4_commit_order: {
      phaseNumber: "Phase 4: Commit Order Preservation",
      title: "4. replica_preserve_commit_order & Worker Monitoring",
      badge: "Consistency Safety",
      badgeColor: "rose",
      sqlSnippet: `-- 🛡️ STRICT COMMIT ORDER ON REPLICA (my.cnf):
[mysqld]
replica_parallel_workers = 8
replica_parallel_type = LOGICAL_CLOCK
replica_preserve_commit_order = ON

-- 🔍 INSPECTING MTS WORKER THREAD STATUS:
SELECT THREAD_ID, SERVICE_STATE, LAST_SEEN_TRANSACTION, LAST_ERROR_NUMBER 
FROM performance_schema.replication_applier_status_by_worker;`,
      explanation:
        "replica_preserve_commit_order = ON guarantees that parallel worker threads commit transactions to InnoDB in the exact order they were committed on the primary, eliminating phantom gaps and out-of-order state reads.",
      keyTakeaways: [
        "replica_preserve_commit_order = ON prevents out-of-order commit gaps.",
        "Essential for regulatory financial compliance and sequential read views.",
        "performance_schema provides real-time telemetry on per-worker workloads."
      ]
    }
  };

  const currentPhase = mtsPhases[selectedMtsPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Multi-Threaded Slave</span> (MTS) &amp; <span className="text-cyan-400">Parallel Replication</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering parallel transaction replay in MySQL 8.0: understanding <code>LOGICAL_CLOCK</code> group commit headers, configuring row-level <code>WRITESET</code> dependency tracking, sizing parallel worker pools, and enforcing strict commit order consistency.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: MTS Pillars ─────────────────────────────────── */}
        <section id="mts-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Parallel Replication
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Architectural mechanisms enabling multi-core transaction replay across enterprise MySQL clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">LOGICAL_CLOCK</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Replays transactions in parallel based on shared <code>last_committed</code> group commit windows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">WRITESET Tracking</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Calculates XXHASH64 row-level hashes to parallelize non-conflicting writes across time windows.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Preserve Commit Order</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>replica_preserve_commit_order = ON</code> enforces exact primary commit serialization.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Worker Sizing</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Sizing worker pools to 1x-2x CPU cores (4–16 workers) to balance multi-threading with low lock overhead.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Multi-Threaded Slave Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe LOGICAL_CLOCK headers, WRITESET row hashing parameters, commit order enforcement, and worker thread status.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(mtsPhases).map((phaseKey) => {
              const phase = mtsPhases[phaseKey];
              const isSelected = selectedMtsPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedMtsPhase(phaseKey)}
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
                  MTS Parallel Mechanism
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

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Configuration &amp; Binlog Header Snippets:
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
              Parallel replication case studies in Barrackpore and Kolkata demonstrating rush-hour lag elimination and banking commit order consistency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 8-Worker Parallel Replay in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  8x Throughput
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS retail sales transactions surged to 4,000 sales/min during festival shopping across ₹1.2 Crores in inventory. Susmita configured <code>replica_parallel_workers = 8</code> and <code>replica_parallel_type = &apos;LOGICAL_CLOCK&apos;</code>, allowing the replica to replay 8 sales invoices concurrently, eliminating a 15-minute lag backlog and maintaining real-time cashier stock accuracy.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Strict Commit Ordering in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Out-Of-Order Reads
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required parallel replication without risking out-of-order ledger commits. Debangshu configured <code>replica_preserve_commit_order = ON</code> and <code>binlog_transaction_dependency_tracking = WRITESET</code> on 16 workers, achieving 12,000 TPS replay throughput while guaranteeing that credits and debits committed in exact chronological sequence.
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
              Avoid legacy DATABASE mode and running MTS without commit order preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using DATABASE Parallel Type
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Setting <code>replica_parallel_type = DATABASE</code> fails on single-schema applications because all transactions target the same database, routing everything to Worker 1.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure replica_parallel_type = 'LOGICAL_CLOCK'.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Omitting replica_preserve_commit_order
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Disabling commit order preservation allows faster transactions to commit ahead of earlier ones, creating temporary out-of-order phantom reads on replicas.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enable replica_preserve_commit_order = ON.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Enable WRITESET on Primary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>binlog_transaction_dependency_tracking = WRITESET</code> on the primary to maximize parallel replay candidates across independent rows.
              </p>
              <div className="text-xs text-slate-400">
                Yields up to 10x higher parallel replication concurrency.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Size Workers to 1x-2x CPU Cores
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>replica_parallel_workers</code> to between 4 and 16 based on available CPU cores to balance multi-threading with low thread context-switching overhead.
              </p>
              <div className="text-xs text-slate-400">
                Prevents CPU thrashing while saturating available NVMe storage bandwidth.
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
            title="Topic 9: Multi-Threaded Slave (MTS / Parallel Replication) Configuration"
            content={noteText}
          />

          <Teacher
            note="Multi-Threaded Slave (MTS) parallel replication is one of the most transformative performance features in MySQL 8.0! Never run a production replica in single-threaded mode. Configure replica_parallel_workers = 8 and replica_parallel_type = LOGICAL_CLOCK on your replicas, always enforce replica_preserve_commit_order = ON for transactional safety, and enable binlog_transaction_dependency_tracking = WRITESET on your primary to unlock maximum parallel replay throughput!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of LOGICAL_CLOCK group commit headers, WRITESET row hashing, worker sizing, and commit order preservation.
            </p>
          </div>

          <FAQTemplate
            title="Multi-Threaded Slave (MTS) Parallel Replication FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
