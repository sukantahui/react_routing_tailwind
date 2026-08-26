import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Exporting Query Results to CSV / Text Files using SELECT ... INTO OUTFILE
 * Module: 004_004_backup-restore-and-data-migration
 *
 * @component
 * @returns {JSX.Element} Interactive query export workbench: mastering server-side CSV exports with SELECT ... INTO OUTFILE, formatting custom delimiters and quote enclosures, prepending column headers with UNION ALL, enforcing secure_file_priv directory security, and executing client-side batch alternatives in MySQL 8.0.
 */
const Topic10 = () => {
  // Interactive Export State
  const [selectedExportPhase, setSelectedExportPhase] = useState("phase1_server_export");

  const exportPhases = {
    phase1_server_export: {
      phaseNumber: "Phase 1: Server-Side Export",
      title: "1. High-Speed Server-Side Export (INTO OUTFILE)",
      badge: "Direct Engine Export",
      badgeColor: "emerald",
      sqlSnippet: `-- 📤 HIGH-SPEED SERVER-SIDE CSV EXPORT:

SELECT 
  order_id,
  customer_name,
  amount,
  status,
  DATE_FORMAT(order_date, '%Y-%m-%d %H:%i:%s')
FROM kolkata_retail.orders
WHERE order_date &ge; '2026-01-01'
INTO OUTFILE '/var/lib/mysql-files/q1_orders.csv'
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
ESCAPED BY '\\\\'
LINES TERMINATED BY '\\n';

-- Result: Exports 20,000,000 rows to CSV in 8.2 seconds! ⚡`,
      explanation:
        "SELECT ... INTO OUTFILE writes query result sets directly from the MySQL server memory to local disk, bypassing network socket serialization and client-side rendering bottlenecks to achieve line-rate NVMe export speed.",
      keyTakeaways: [
        "Direct server-side disk writes eliminate client rendering lag.",
        "OPTIONALLY ENCLOSED BY '\"' formats standard RFC 4180 CSV files.",
        "Allows exporting filtered query subsets and aggregate summaries."
      ]
    },
    phase2_header_rows: {
      phaseNumber: "Phase 2: Prepending Headers",
      title: "2. Prepending CSV Column Headers with UNION ALL",
      badge: "Header Generation",
      badgeColor: "cyan",
      sqlSnippet: `-- 🏷️ PREPENDING COLUMN HEADERS TO CSV EXPORT:

SELECT 'Order ID', 'Customer Name', 'Amount (₹)', 'Status', 'Order Date'
UNION ALL
SELECT 
  order_id, 
  customer_name, 
  CAST(amount AS CHAR), 
  status, 
  DATE_FORMAT(order_date, '%Y-%m-%d')
FROM kolkata_retail.orders
INTO OUTFILE '/var/lib/mysql-files/orders_with_headers.csv'
FIELDS TERMINATED BY ',' 
OPTIONALLY ENCLOSED BY '"' 
LINES TERMINATED BY '\\n';`,
      explanation:
        "By default, INTO OUTFILE exports raw row data without column names. Using UNION ALL with string literals prepends a standard header row to the CSV file, ensuring compatibility with business intelligence tools like Tableau and Excel.",
      keyTakeaways: [
        "UNION ALL with string literals prepends standard column headers.",
        "Cast non-string columns (e.g. CAST(amount AS CHAR)) to match types.",
        "Creates clean, self-documenting CSV reports for external analytics."
      ]
    },
    phase3_security_and_privs: {
      phaseNumber: "Phase 3: Directory Security",
      title: "3. secure_file_priv & File Overwrite Prevention",
      badge: "Security & Permissions",
      badgeColor: "purple",
      sqlSnippet: `-- 🔒 1. DIRECTORY RESTRICTION VIA secure_file_priv:
-- SHOW VARIABLES LIKE 'secure_file_priv';
-- Value: /var/lib/mysql-files/ (Writing outside this folder is blocked!)

-- 🛡️ 2. FILE OVERWRITE PREVENTION:
-- If '/var/lib/mysql-files/q1_orders.csv' already exists:
-- ERROR 1086 (HY000): File already exists (Prevents accidental destruction!)

-- 🔑 3. REQUIRED PRIVILEGE:
GRANT FILE ON *.* TO 'reporting_svc'@'localhost';`,
      explanation:
        "MySQL restricts all file export paths to the directory specified by secure_file_priv and requires the global FILE privilege. Crucially, MySQL will never overwrite an existing file (throwing Error 1086), preventing accidental data loss.",
      keyTakeaways: [
        "secure_file_priv confines exports to authorized secure directories.",
        "Error 1086 prevents accidental overwriting of existing files.",
        "Output files are created with ownership mysql:mysql and 0640 permissions."
      ]
    },
    phase4_client_alternatives: {
      phaseNumber: "Phase 4: Client Alternatives",
      title: "4. Client-Side Exports & mysqldump --tab Integration",
      badge: "Remote Export Pipeline",
      badgeColor: "rose",
      sqlSnippet: `-- 💻 1. CLIENT-SIDE EXPORT WITHOUT SERVER HOST ACCESS:
mysql -h db.kolkata.internal -u user -p -B \\
  -e "SELECT * FROM kolkata_retail.orders;" | \\
  tr '\\t' ',' &gt; /local_client/orders.csv

-- 📦 2. STRUCTURE + DATA DUMP VIA mysqldump --tab:
-- Generates .sql (schema DDL) + .txt (raw data via INTO OUTFILE) per table:
mysqldump -u root -p --tab=/var/lib/mysql-files/ \\
  --single-transaction kolkata_retail`,
      explanation:
        "When users lack local filesystem access to the database host, the mysql CLI client with --batch (-B) streams query results over the network to a local CSV file. The mysqldump --tab utility combines DDL portability with high-speed flat-file data dumps.",
      keyTakeaways: [
        "mysql -B -e allows remote client-side CSV extraction.",
        "mysqldump --tab separates schema DDL (.sql) from raw data (.txt).",
        "Provides flexible export paths for developers without SSH server access."
      ]
    }
  };

  const currentPhase = exportPhases[selectedExportPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.4: Backup, PITR &amp; Data Migration
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 10 of 13
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Exporting Query Results: <span className="text-emerald-400">SELECT ... INTO OUTFILE</span> &amp; CSV
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering server-side query result export in MySQL 8.0: understanding high-speed flat-file generation, formatting delimiters and quotes, prepending CSV headers with <code>UNION ALL</code>, enforcing <code>secure_file_priv</code> restrictions, and executing remote client batch streams.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Export Pillars ──────────────────────────────── */}
        <section id="export-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Server-Side Query Export
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              How SELECT ... INTO OUTFILE delivers high-speed, direct-to-disk data extracts for analytics and reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Direct Disk Write</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Writes results directly from server RAM to disk, avoiding client network serialization bottlenecks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Header Prepending</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                <code>UNION ALL</code> prepends self-documenting column title rows for BI and spreadsheet tools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Directory Locking</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>secure_file_priv</code> confines file exports to designated directories, blocking system file tampering.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Overwrite Safe</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Error 1086 guarantees that existing files are never overwritten, protecting against data destruction.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Query Export Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe export queries, header prepending, security directory enforcement, and client-side streaming.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(exportPhases).map((phaseKey) => {
              const phase = exportPhases[phaseKey];
              const isSelected = selectedExportPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedExportPhase(phaseKey)}
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
                SQL DDL &amp; Pipeline Execution:
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
              Export case studies in Barrackpore and Kolkata demonstrating secure directory enforcement and 8-second 20M row extracts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Fixing secure_file_priv Error in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Directory Enforced
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, an accountant tried exporting all ₹1,000+ orders to <code>/home/mamata/report.csv</code>, triggering a permission denial error. Mamata updated the query path to <code>/var/lib/mysql-files/barrackpore_q3_report.csv</code>, allowing MySQL to export 45,000 rows with custom column headers in under 1 second.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – 20M Transaction Audit CSV in 8 Seconds in Kolkata
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  1.8GB in 8.2s
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, auditors required an immediate CSV extract of 20 million ledger transactions for ₹500 Crores in banking records. Running a Python client script took over 18 minutes. Debangshu executed <code>SELECT ... INTO OUTFILE</code> directly to NVMe storage. The 1.8GB CSV was written in 8.2 seconds with zero network contention on the primary database cluster.
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
              Avoid dangerous file overwrite collisions and plain-text PII storage traps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Leaving Exported PII CSVs in Plaintext
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Leaving exported CSV files in <code>/var/lib/mysql-files/</code> exposes customer names, phone numbers, and financial data in unencrypted plaintext on disk.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: GPG encrypt or upload to S3 and delete local CSV files immediately.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Running Heavy Exports on Primary Masters
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Exporting 50 million rows on the primary master causes heavy disk read I/O and buffer pool churn, degrading active user OLTP transaction speeds.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always execute heavy analytical exports on read replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Prepend Headers via UNION ALL
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Prepend column header titles using <code>UNION ALL</code> so that generated CSV files are self-documenting and immediately usable in BI tools.
              </p>
              <div className="text-xs text-slate-400">
                Ensures compatibility with Tableau, PowerBI, and Python pandas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Format Dates Explicitly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>DATE_FORMAT(col, '%Y-%m-%d %H:%i:%s')</code> to guarantee standard ISO timestamp formatting across all downstream data pipelines.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates regional date parsing discrepancies (DD/MM/YYYY vs MM/DD/YYYY).
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
            title="Topic 10: Exporting Query Results to CSV / Text Files using SELECT ... INTO OUTFILE"
            content={noteText}
          />

          <Teacher
            note="When you need to export millions of rows from MySQL, SELECT ... INTO OUTFILE is your fastest tool because it writes directly from engine RAM to local disk. Remember to prepend headers using UNION ALL, understand that secure_file_priv confines where files can be written, and know that Error 1086 protects existing files from being overwritten. For large analytical exports, always run them on read replicas to keep your primary database blazing fast!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of server-side exports, CSV header formatting, secure_file_priv permissions, and client alternatives.
            </p>
          </div>

          <FAQTemplate
            title="SELECT ... INTO OUTFILE &amp; CSV Export FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
