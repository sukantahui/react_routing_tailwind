import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic2_files/topic2_questions";
import noteText from "./topic2_files/topic2_note.txt?raw";

/**
 * Topic2 – mysqldump In-Depth: Dumping Entire Instances, Specific Databases, and Individual Tables
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive mysqldump workbench: comparing full instance vs multi-database scopes, filtering tables with --ignore-table, extracting DDL-only vs data-only files, executing --where predicates, and streaming into compression pipelines in MySQL 8.0.
 */
const Topic2 = () => {
  // Interactive Dump Scope State
  const [selectedDumpPhase, setSelectedDumpPhase] = useState("phase1_instance_vs_multidb");

  const dumpPhases = {
    phase1_instance_vs_multidb: {
      phaseNumber: "Phase 1: Instance vs Multi-DB",
      title: "1. Full Instance (--all-databases) vs Multi-DB (--databases)",
      badge: "Instance & DB Scope",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌐 1. FULL INSTANCE DUMP (Includes system schemas & user grants):
mysqldump -u root -p --all-databases \\
  --single-transaction --quick \\
  --routines --triggers --events \\
  --hex-blob --source-data=2 > /backups/full_instance.sql

-- 🏢 2. MULTIPLE SPECIFIC DATABASES (Includes CREATE DATABASE & USE):
mysqldump -u root -p --databases kolkata_retail kolkata_finance \\
  --single-transaction --quick --routines --triggers > /backups/retail_finance.sql`,
      explanation:
        "Using --all-databases (-A) dumps all schemas on the server. Using --databases (-B) ensures that CREATE DATABASE IF NOT EXISTS and USE <dbname> headers are written into the SQL dump file, allowing clean restore with a single mysql command.",
      keyTakeaways: [
        "--all-databases captures all schemas including mysql user tables.",
        "--databases writes CREATE DATABASE and USE statements into the dump.",
        "Omitting --databases requires specifying the target database during restore."
      ]
    },
    phase2_table_and_ignore: {
      phaseNumber: "Phase 2: Table Scope & Ignore",
      title: "2. Specific Table Dumps & Excluding Volatile Tables",
      badge: "Granular Table Filters",
      badgeColor: "cyan",
      sqlSnippet: `-- 🎯 1. DUMP ONLY SPECIFIC TABLES:
mysqldump -u root -p --single-transaction \\
  kolkata_retail orders order_items customers > /backups/core_orders.sql

-- 🚫 2. EXCLUDE VOLATILE LOG / CACHE TABLES (--ignore-table):
mysqldump -u root -p --single-transaction kolkata_retail \\
  --ignore-table=kolkata_retail.web_sessions \\
  --ignore-table=kolkata_retail.cache_search_index > /backups/retail_clean.sql`,
      explanation:
        "Listing table names after the database name dumps only those tables. Using --ignore-table=db.table excludes transient cache or high-volume log tables, keeping backup files compact and restore times fast.",
      keyTakeaways: [
        "Specify table names after the database name for targeted exports.",
        "--ignore-table=db.table excludes transient session or cache tables.",
        "Reduces backup archive size and network transfer bandwidth."
      ]
    },
    phase3_schema_vs_data: {
      phaseNumber: "Phase 3: Schema DDL vs Data Only",
      title: "3. DDL-Only (--no-data) vs Data-Only (--no-create-info)",
      badge: "Component Extraction",
      badgeColor: "purple",
      sqlSnippet: `-- 📐 1. SCHEMA DDL ONLY (--no-data / -d):
-- Extracts table structures, views, triggers, and routines without any rows:
mysqldump -u root -p --no-data --routines --triggers --events \\
  kolkata_finance > /backups/finance_schema_only.sql

-- 📊 2. DATA ONLY (--no-create-info / -t):
-- Extracts INSERT statements without DROP TABLE or CREATE TABLE DDL:
mysqldump -u root -p --no-create-info --single-transaction \\
  kolkata_finance > /backups/finance_data_only.sql`,
      explanation:
        "--no-data (-d) extracts table DDL, stored procedures, and triggers for schema version control (Git). --no-create-info (-t) extracts pure INSERT statements for repopulating existing staging tables.",
      keyTakeaways: [
        "--no-data exports pure DDL for schema auditing and staging setup.",
        "--no-create-info exports raw INSERT statements without dropping tables.",
        "Both flags respect --routines and --triggers options."
      ]
    },
    phase4_where_and_compression: {
      phaseNumber: "Phase 4: WHERE & Compression",
      title: "4. Filtered Rows (--where) & Streaming Multi-Threaded Compression",
      badge: "Advanced Piping",
      badgeColor: "rose",
      sqlSnippet: `-- 🔍 1. DUMP FILTERED ROW SLICE (--where):
mysqldump -u root -p --single-transaction kolkata_retail orders \\
  --where="order_date >= '2026-01-01 00:00:00' AND city = 'Barrackpore'" > barrackpore_2026.sql

-- ⚡ 2. STREAM DIRECTLY INTO PARALLEL ZSTD COMPRESSION:
mysqldump -u root -p --single-transaction --quick --routines --triggers \\
  kolkata_retail | zstd -T4 -3 > /backups/retail_$(date +%F).sql.zst`,
      explanation:
        "The --where flag allows exporting historical data subsets for archival. Piping stdout directly into multi-threaded compressors (zstd, pigz) eliminates intermediate uncompressed disk writes and reduces storage by over 70%.",
      keyTakeaways: [
        "--where appends SQL filter predicates for subset archiving.",
        "Piping into zstd/pigz saves 70% storage without disk bottlenecks.",
        "--quick streams rows row-by-row to prevent client memory OOM errors."
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
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 2 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          mysqldump In-Depth: <span className="text-emerald-400">Instances</span>, <span className="text-cyan-400">Databases</span> &amp; Tables
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering the standard logical backup utility in MySQL 8.0: understanding full instance vs multi-database scoping, filtering tables with <code>--ignore-table</code>, extracting DDL-only vs data-only files, executing custom <code>--where</code> predicates, and streaming into multi-threaded compression pipelines.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Scoping Hierarchy ───────────────────────────── */}
        <section id="scoping-hierarchy" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Scopes of mysqldump
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How mysqldump allows targeting exact database structures from single tables to entire multi-tenant clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Scope 1</span>
              <h3 className="font-bold text-white text-base">Entire Instance</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>--all-databases</code> (-A): Dumps all databases, system users, privilege tables, and stored routines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Scope 2</span>
              <h3 className="font-bold text-white text-base">Multiple Databases</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>--databases</code> (-B): Dumps selected databases and includes <code>CREATE DATABASE</code> and <code>USE</code> statements.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Scope 3</span>
              <h3 className="font-bold text-purple-300 text-base">Single Database</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>mysqldump dbname</code>: Dumps table DDL and DML for one database without database creation headers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Scope 4</span>
              <h3 className="font-bold text-rose-300 text-base">Specific Tables</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>mysqldump db t1 t2</code>: Dumps specified tables or excludes tables using <code>--ignore-table</code>.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive mysqldump Command Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe instance scopes, table filters, schema extraction, and streaming compression pipelines.
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

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                CLI Command &amp; Pipeline Execution:
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
              Backup scoping case studies in Barrackpore and Kolkata demonstrating table exclusion and DDL auditing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Eliminating 75GB of Search Cache Bloat in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  85% Size Reduction
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, the retail database backup grew unexpectedly from 10GB to 85GB due to a temporary product search cache table. Mamata added <code>--ignore-table=barrackpore_store.cache_search_index</code> to the backup script. Backup duration dropped from 22 minutes to 2 minutes 30 seconds, saving 75GB of disk space nightly while preserving all critical customer and order tables.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Instant DDL Audit Dump Across 45 Banking DBs in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  8-Second Audit
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, internal auditors required a complete DDL snapshot of all 45 financial database schemas to verify foreign key constraints and index definitions across ₹500 Crores in ledgers. Debangshu executed <code>mysqldump --all-databases --no-data --routines --triggers</code>. The command skipped millions of transactional rows and delivered a clean 14MB SQL schema audit file in 8 seconds.
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
              Avoid dangerous memory exhaustion and missing stored procedure traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Omitting --quick on Large Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Without <code>--quick</code>, <code>mysqldump</code> buffers the entire table in client RAM before writing to disk, causing Out-Of-Memory (OOM) crashes on large tables.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always include --quick to stream rows row-by-row.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Forgetting --routines and --events
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                By default, <code>mysqldump</code> does NOT dump stored procedures, functions, or scheduled events, causing critical business logic to be lost upon restore.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always explicitly include --routines and --events.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use --hex-blob for Binary Columns
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Include <code>--hex-blob</code> when dumping tables with BLOB, VARBINARY, or encrypted columns to prevent character corruption.
              </p>
              <div className="text-xs text-slate-400">
                Encodes binary columns as clean hexadecimal literals.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use Multi-Threaded Compression
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Pipe <code>mysqldump</code> directly into <code>zstd -T4</code> or <code>pigz</code> to compress backups in real time across multiple CPU cores.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates disk I/O bottlenecks and saves over 70% storage space.
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
            title="Topic 2: mysqldump In-Depth: Dumping Entire Instances, Specific Databases, and Individual Tables"
            content={noteText}
          />

          <Teacher
            note="Mastering mysqldump requires knowing exactly which scope to choose: use --all-databases for full instances, --databases to include CREATE DATABASE headers, list table names for targeted backups, and exclude transient cache tables with --ignore-table. Never forget --single-transaction --quick --routines --triggers on production databases!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of mysqldump scoping, table filters, DDL exports, and streaming compression.
            </p>
          </div>

          <FAQTemplate
            title="mysqldump Scopes &amp; Strategies FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic2;
