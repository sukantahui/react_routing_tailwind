import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – High-Speed Parallel Logical Dumps: Introduction to mysqlpump and mydumper/myloader
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive parallel dump workbench: overcoming single-threaded mysqldump bottlenecks, configuring multi-threaded table chunking in mydumper/myloader, streaming directly to cloud object storage with MySQL Shell Dump/Load, and benchmarking 80% restore time reductions in MySQL 8.0.
 */
const Topic5 = () => {
  // Interactive Parallel State
  const [selectedParallelPhase, setSelectedParallelPhase] = useState("phase1_single_vs_parallel");

  const parallelPhases = {
    phase1_single_vs_parallel: {
      phaseNumber: "Phase 1: Architecture Comparison",
      title: "1. Single-Threaded Bottleneck vs Multi-Core Parallelism",
      badge: "Architecture Evolution",
      badgeColor: "emerald",
      sqlSnippet: `-- 🐢 1. SINGLE-THREADED BOTTLENECK (mysqldump):
-- Uses 1 CPU Core (100% load); 15 other cores sit idle (0% load):
-- 100GB Database: Backup = 52 mins, Restore = 3 hrs 45 mins!

-- 🚀 2. MULTI-THREADED PARALLEL DUMP (mydumper / MySQL Shell):
-- Distributes load across 8 or 16 CPU cores in parallel:
-- 100GB Database: Backup = 9 mins, Restore = 22 mins! (80% Speedup! ⚡)`,
      explanation:
        "Standard mysqldump processes tables sequentially on a single thread. Parallel dump tools distribute workloads across multiple CPU cores, executing concurrent queries and parallel data streams to cut backup and restore windows by over 80%.",
      keyTakeaways: [
        "mysqldump leaves multi-core CPUs largely idle during backup.",
        "mydumper and MySQL Shell drive all CPU cores at peak efficiency.",
        "Reduces restore time on 100GB datasets from hours to minutes."
      ]
    },
    phase2_table_chunking: {
      phaseNumber: "Phase 2: Intra-Table Chunking",
      title: "2. Intra-Table Primary Key Range Chunking (--rows)",
      badge: "Intra-Table Parallelism",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧩 INTRA-TABLE CHUNKING IN ACTION (--rows=250000):
-- mydumper divides a massive 50GB table across multiple worker threads:

-- Thread 1: SELECT * FROM orders WHERE id BETWEEN 1 AND 250000;
-- Thread 2: SELECT * FROM orders WHERE id BETWEEN 250001 AND 500000;
-- Thread 3: SELECT * FROM orders WHERE id BETWEEN 500001 AND 750000;
-- Thread 4: SELECT * FROM orders WHERE id BETWEEN 750001 AND 1000000;

-- Result: All 4 chunks dumped simultaneously in parallel! ⚡`,
      explanation:
        "Without chunking, a single massive table must be dumped sequentially by one thread. The --rows option splits large tables into primary key ranges, enabling multiple worker threads to dump slices of the same table concurrently.",
      keyTakeaways: [
        "--rows splits large tables into discrete integer index ranges.",
        "Allows 8 or 16 threads to dump a single table in parallel.",
        "Prevents long-running single-thread bottlenecks on giant tables."
      ]
    },
    phase3_mydumper_myloader_cli: {
      phaseNumber: "Phase 3: mydumper & myloader CLI",
      title: "3. mydumper & myloader CLI Execution & Modular Files",
      badge: "Open-Source Standard",
      badgeColor: "purple",
      sqlSnippet: `-- 📦 1. PARALLEL BACKUP (mydumper):
mydumper -u root -p \\
  -B kolkata_retail \\
  --threads=8 \\
  --rows=250000 \\
  --compress=ZSTD \\
  --compress-level=3 \\
  --events --routines --triggers \\
  --outputdir=/backups/retail_parallel/

-- 📥 2. PARALLEL RESTORE (myloader):
myloader -u root -p \\
  -B kolkata_retail \\
  --threads=8 \\
  --directory=/backups/retail_parallel/ \\
  --overwrite-tables`,
      explanation:
        "mydumper outputs modular files per table and chunk with native Zstandard compression. myloader opens parallel worker connections to create tables and insert data concurrently, delivering sub-30 minute restore times on enterprise datasets.",
      keyTakeaways: [
        "--threads=8 dedicates 8 concurrent worker connections for dump/restore.",
        "--compress=ZSTD provides high-speed multi-core compression.",
        "myloader --overwrite-tables cleanly replaces existing tables on restore."
      ]
    },
    phase4_mysql_shell_cloud: {
      phaseNumber: "Phase 4: MySQL Shell Cloud Dump",
      title: "4. Modern MySQL Shell Dump & Direct Cloud Streaming",
      badge: "Cloud-Native Dump/Load",
      badgeColor: "rose",
      sqlSnippet: `// 🌐 MYSQL SHELL PARALLEL DUMP & LOAD (JavaScript Mode):

// 1. Parallel Dump with Direct Cloud S3 Streaming:
util.dumpSchemas(['kolkata_finance'], 's3://bank-backups-2026/dump_q3', {
  threads: 16,
  compression: 'zstd',
  chunking: true,
  bytesPerChunk: '128M',
  s3BucketName: 'bank-backups-2026'
});

// 2. High-Speed Resumable Cloud Restore:
util.loadDump('s3://bank-backups-2026/dump_q3', {
  threads: 16,
  resetProgress: false // Resumes automatically if interrupted!
});`,
      explanation:
        "MySQL Shell provides cloud-native parallel dump and load utilities that stream compressed chunks directly to AWS S3, Azure Blob, or OCI Object Storage. It features adaptive chunking and resumable load tracking for seamless disaster recovery.",
      keyTakeaways: [
        "util.dumpSchemas streams parallel chunks directly to cloud object storage.",
        "util.loadDump automatically resumes interrupted loads without restarting.",
        "Standard Oracle replacement for deprecated mysqlpump utility."
      ]
    }
  };

  const currentPhase = parallelPhases[selectedParallelPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 5 of 13
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          High-Speed Parallel Logical Dumps: <span className="text-emerald-400">mydumper/myloader</span> &amp; <span className="text-cyan-400">MySQL Shell</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Overcoming the single-threaded bottleneck of standard mysqldump: implementing multi-threaded table chunking with <code>mydumper</code>/<code>myloader</code>, understanding legacy <code>mysqlpump</code> deprecation, and executing cloud-native parallel streaming with MySQL Shell in MySQL 8.0.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Parallelism Pillars ─────────────────────────── */}
        <section id="parallelism-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Parallel Logical Backups
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How multi-threaded dump and load tools maximize multi-core CPU and high-speed NVMe storage throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Multi-Core Scale</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Utilizes all available CPU cores concurrently, eliminating single-threaded processing bottlenecks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Intra-Table Chunks</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Splits monolithic 100GB tables into primary key ranges (<code>--rows</code>) dumped in parallel.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Modular Layout</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Generates separate schema DDL and chunk files, allowing granular single-table restoration.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Direct Cloud Stream</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                MySQL Shell streams compressed chunks directly to AWS S3/Azure Blob without local disk staging.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Parallel Dump Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe architecture differences, intra-table chunking SQL, mydumper/myloader commands, and MySQL Shell cloud streams.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(parallelPhases).map((phaseKey) => {
              const phase = parallelPhases[phaseKey];
              const isSelected = selectedParallelPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedParallelPhase(phaseKey)}
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

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                CLI Command &amp; Parallel Telemetry:
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
              Parallel dump case studies in Barrackpore and Kolkata demonstrating 6x restore speedups and 30-minute cloud migrations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 40GB Retail POS Restore in 7 Minutes in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  6x Speedup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a 40GB retail store database took 48 minutes to restore with single-threaded <code>mysql &lt; backup.sql</code>. Mamata deployed <code>myloader --threads=8 --directory=/backups/store/</code> on an 8-core server. The parallel loader restored all tables and indexes in 7 minutes 30 seconds, allowing the store to resume billing operations ahead of schedule.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 180GB Cloud Migration in 26 Minutes in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Direct S3 Stream
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, migrating a 180GB financial ledger to AWS RDS had a strict 30-minute maintenance window. Debangshu used MySQL Shell <code>util.dumpSchemas</code> with 16 parallel threads streaming directly to AWS S3 (12 minutes), and restored via <code>util.loadDump</code> (14 minutes). The migration completed in 26 minutes with zero data inconsistency across ₹500 Crores in transactions.
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
              Avoid dangerous thread exhaustion and master production CPU throttling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Over-Allocating Threads on Active Primary Masters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Running <code>mydumper --threads=32</code> on a busy primary master saturates CPU and buffer pool I/O, causing application query latency spikes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Throttle threads to 50% of host cores on masters, or dump from read replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting Intra-Table Chunking (--rows)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting <code>--rows</code> means large monolithic tables are assigned to only one thread, bottlenecking total dump duration on that single table.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always specify --rows=250000 to chunk large tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use MySQL Shell for Cloud Migration
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use MySQL Shell <code>util.dumpSchemas</code> and <code>util.loadDump</code> for cloud migrations to stream directly to AWS S3/Azure Blob with resumable progress.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates intermediate disk staging and survives transient network drops.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Mandate Zstandard Compression
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Configure <code>--compress=ZSTD --compress-level=3</code> in <code>mydumper</code> to achieve maximum multi-threaded compression and decompression throughput.
              </p>
              <div className="text-xs text-slate-400">
                Delivers 70% storage savings with minimal CPU decompression overhead.
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
            title="Topic 5: High-Speed Parallel Logical Dumps: Introduction to mysqlpump and mydumper/myloader"
            content={noteText}
          />

          <Teacher
            note="When database sizes grow beyond 20GB-50GB, single-threaded mysqldump becomes a major bottleneck. Adopt multi-threaded tools like mydumper/myloader and MySQL Shell Dump/Load! Leverage intra-table chunking (--rows) to split giant tables across multiple CPU cores, use Zstandard compression, and stream directly to cloud object storage for lightning-fast migrations and disaster recovery!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of parallel logical dumping, table chunking, myloader concurrency, and MySQL Shell cloud streams.
            </p>
          </div>

          <FAQTemplate
            title="Parallel Logical Dumps &amp; mydumper FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
