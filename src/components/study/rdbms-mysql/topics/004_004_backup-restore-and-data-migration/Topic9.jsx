import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – High-Performance Bulk Data Import: LOAD DATA INFILE and mysqlimport
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive bulk data import workbench: mastering 20x faster CSV imports with LOAD DATA INFILE, performing inline data transformations via @variables, configuring secure_file_priv and local_infile security, and executing multi-threaded mysqlimport pipelines in MySQL 8.0.
 */
const Topic9 = () => {
  // Interactive Import State
  const [selectedImportPhase, setSelectedImportPhase] = useState("phase1_syntax_delimiters");

  const importPhases = {
    phase1_syntax_delimiters: {
      phaseNumber: "Phase 1: Syntax & Delimiters",
      title: "1. Core LOAD DATA INFILE Syntax & Delimiter Control",
      badge: "20x Bulk Engine",
      badgeColor: "emerald",
      sqlSnippet: `-- 📥 HIGH-SPEED BULK CSV IMPORT (20X FASTER THAN INSERT):

LOAD DATA INFILE '/var/lib/mysql-files/kolkata_orders.csv'
INTO TABLE kolkata_retail.orders
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '\\\\'
LINES TERMINATED BY '\\n'
IGNORE 1 LINES
(order_id, customer_name, amount, order_date, status);

-- Result: Inserts 1,000,000 rows in 4.2 seconds! ⚡`,
      explanation:
        "LOAD DATA INFILE bypasses SQL statement compilation and tokenization, parsing raw delimited text directly into InnoDB buffer pool pages. It supports flexible field delimiters, quote enclosures, and escape sequences.",
      keyTakeaways: [
        "Direct engine-level parsing delivers up to 20x faster throughput than INSERT.",
        "OPTIONALLY ENCLOSED BY '\"' parses quoted text while leaving numbers unquoted.",
        "IGNORE 1 LINES safely skips CSV column header rows."
      ]
    },
    phase2_variable_transformations: {
      phaseNumber: "Phase 2: Variable Transforms",
      title: "2. Inline Data Transformations & Throwaway Variables",
      badge: "ETL Transformation",
      badgeColor: "cyan",
      sqlSnippet: `-- 🧹 INLINE STRING CLEANUP, CURRENCY & DATE PARSING:

LOAD DATA INFILE '/var/lib/mysql-files/raw_supplier_feed.csv'
INTO TABLE kolkata_retail.products
FIELDS TERMINATED BY ',' OPTIONALLY ENCLOSED BY '"'
IGNORE 1 LINES
(product_id, title, @raw_price, @dummy_notes, @raw_date)
SET 
  -- 1. Clean Rupee currency formatting ('₹1,250.00' &rarr; 1250.00):
  price = CAST(REPLACE(REPLACE(@raw_price, '₹', ''), ',', '') AS DECIMAL(10,2)),
  -- 2. Discard unwanted notes column (mapped to @dummy_notes):
  -- 3. Transform date format ('25-08-2026' -&gt; '2026-08-25'):
  created_at = STR_TO_DATE(@raw_date, '%d-%m-%Y');`,
      explanation:
        "Mapping CSV columns to user variables (@var) enables inline data scrubbing, currency formatting, date parsing, and discarding unwanted columns (@dummy) directly inside the import engine without intermediate ETL scripts.",
      keyTakeaways: [
        "Assign CSV columns to @variables to clean strings on the fly.",
        "Use SET col = FUNCTION(@var) for date and currency conversions.",
        "Map unwanted columns to throwaway variables (@dummy) to discard them."
      ]
    },
    phase3_security_local_vs_server: {
      phaseNumber: "Phase 3: Security & LOCAL Streaming",
      title: "3. Server-Side vs Client-Side (LOCAL) & secure_file_priv",
      badge: "Security & Permissions",
      badgeColor: "purple",
      sqlSnippet: `-- 🔒 1. SERVER-SIDE IMPORT (Controlled by secure_file_priv):
-- SHOW VARIABLES LIKE 'secure_file_priv';
-- Value: /var/lib/mysql-files/ (Only this folder permitted!)
LOAD DATA INFILE '/var/lib/mysql-files/data.csv' INTO TABLE orders;

-- 🌐 2. CLIENT-SIDE STREAMING (LOAD DATA LOCAL INFILE):
-- Server configuration:
SET PERSIST local_infile = ON;

-- Client connection flag (Mandatory!):
-- mysql --local-infile=1 -u backup_admin -p kolkata_retail
LOAD DATA LOCAL INFILE '/home/user/my_local_data.csv' INTO TABLE orders;`,
      explanation:
        "Server-side imports are restricted to designated directories via secure_file_priv. Client-side LOCAL imports stream files from the user's workstation over TCP, requiring mutual security activation on both the server and client.",
      keyTakeaways: [
        "secure_file_priv restricts server-side imports to safe directories.",
        "LOCAL imports stream files over TCP from client workstations.",
        "Requires local_infile = ON on server and --local-infile=1 on client."
      ]
    },
    phase4_mysqlimport_cli: {
      phaseNumber: "Phase 4: mysqlimport CLI Tool",
      title: "4. Multi-Threaded Parallel Bulk Imports with mysqlimport",
      badge: "Multi-Threaded Import",
      badgeColor: "rose",
      sqlSnippet: `-- ⚡ MULTI-THREADED PARALLEL BULK IMPORT (mysqlimport):

mysqlimport -u root -p \\
  --local \\
  --use-threads=8 \\
  --fields-terminated-by=',' \\
  --fields-optionally-enclosed-by='"' \\
  --lines-terminated-by='\\n' \\
  --ignore-lines=1 \\
  kolkata_retail \\
  /data/csv/orders.csv \\
  /data/csv/order_items.csv \\
  /data/csv/payments.csv

-- Naming Rule: File base name (orders.csv) MUST match table name (orders)!`,
      explanation:
        "mysqlimport is a high-speed command-line wrapper for LOAD DATA INFILE. Using --use-threads=N, it imports multiple CSV files concurrently across parallel worker connections, matching table names to file basenames automatically.",
      keyTakeaways: [
        "mysqlimport wraps LOAD DATA INFILE for command-line scripting.",
        "--use-threads=8 imports multiple tables concurrently in parallel.",
        "File basename must match the destination table name."
      ]
    }
  };

  const currentPhase = importPhases[selectedImportPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          High-Performance Bulk Data Import: <span className="text-emerald-400">LOAD DATA INFILE</span> &amp; <span className="text-cyan-400">mysqlimport</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering ultra-fast bulk data ingestion in MySQL 8.0: understanding 20x speedups over standard INSERTs, configuring delimiter parameters, executing inline data transformations via <code>@variables</code>, managing <code>secure_file_priv</code> security, and automating parallel loads with <code>mysqlimport</code>.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Bulk Loading Pillars ────────────────────────── */}
        <section id="bulk-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of High-Speed Bulk Loading
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How LOAD DATA INFILE eliminates SQL parsing bottlenecks to achieve maximum throughput.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Direct Page Engine</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Bypasses SQL tokenizer and parser, streaming records directly into InnoDB memory buffers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Variable Transforms</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Cleans strings, parses dates, and discards unwanted columns inline during bulk load.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Directory Security</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>secure_file_priv</code> enforces strict directory restrictions against unauthorized file reads.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Parallel Loading</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>mysqlimport --use-threads=8</code> streams multiple CSV files concurrently across worker threads.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Bulk Data Import Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe delimiter syntax, inline transformations, LOCAL streaming security, and mysqlimport parallelism.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(importPhases).map((phaseKey) => {
              const phase = importPhases[phaseKey];
              const isSelected = selectedImportPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedImportPhase(phaseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
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
                SQL DDL &amp; CLI Command Execution:
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
              Bulk import case studies in Barrackpore and Kolkata demonstrating Rupee currency stripping and 2-minute 50-million-row imports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 10M Supplier CSV with Rupee Symbols in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  15-Second Load
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, a retail supplier supplied a 10-million-row product catalog with prices formatted as <code>'₹1,250.00'</code> and dates as <code>'25/08/2026'</code>. Mamata used <code>LOAD DATA LOCAL INFILE</code> with variable transformation clauses. The 10 million rows were cleaned and loaded into MySQL in 15 seconds without writing any external Python ETL scripts.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 50M Ledger Records in 2 Minutes in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  12x Acceleration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, loading 50 million end-of-day bank transactions was taking 25 minutes using standard inserts. Debangshu pre-sorted the CSV by primary key, disabled secondary constraint validation, and ran <code>LOAD DATA INFILE</code> with <code>innodb_flush_log_at_trx_commit = 2</code>. Total import time dropped from 25 minutes to 2 minutes 10 seconds across ₹500 Crores in transaction ledgers.
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
              Avoid dangerous Windows carriage return bugs and unconstrained client permissions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Windows \r\n Line Ending Corruption
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Importing Windows CSV files with <code>LINES TERMINATED BY '\n'</code> leaves trailing <code>\r</code> characters on the last column, causing hidden string bugs and failed joins.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always specify LINES TERMINATED BY '\r\n' for Windows-generated CSV files.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Leaving local_infile ON Globally
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving <code>local_infile = ON</code> globally exposes client applications to malicious server file exfiltration vulnerabilities.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Disable local_infile globally and enable only inside trusted ETL sessions.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Pre-Sort by Primary Key
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Pre-sorting CSV rows by primary key (<code>sort -t',' -k1,1n</code>) enables sequential InnoDB page appends with zero random B-tree page splits.
              </p>
              <div className="text-xs text-slate-400">
                Accelerates bulk insert throughput by over 70%.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Run ANALYZE TABLE Post-Load
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always execute <code>ANALYZE TABLE</code> after bulk loading millions of records to update optimizer index cardinality statistics.
              </p>
              <div className="text-xs text-slate-400">
                Ensures SQL queries utilize optimal index scan execution plans.
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
            title="Topic 9: High-Performance Bulk Data Import: LOAD DATA INFILE and mysqlimport"
            content={noteText}
          />

          <Teacher
            note="When you need to import millions of records into MySQL, never use row-by-row INSERT statements! Master LOAD DATA INFILE: it is up to 20x faster because it parses flat files directly into InnoDB storage pages. Leverage @variables to clean currency and date formats inline, understand secure_file_priv to safeguard your server, pre-sort your CSV by primary key, and always run ANALYZE TABLE once loading finishes!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of bulk loading, variable transformations, secure_file_priv, and mysqlimport parallelism.
            </p>
          </div>

          <FAQTemplate
            title="Bulk Data Import &amp; LOAD DATA INFILE FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
