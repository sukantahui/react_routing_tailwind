import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic5_files/topic5_questions";
import noteText from "./topic5_files/topic5_note.txt?raw";

/**
 * Topic5 – Configuring Replication Filters: replicate-do-db, replicate-ignore-db, binlog-do-db
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive replication filtering workbench: evaluating Source vs Replica filtering, exploring cross-database query caveats, testing wildcard table rules (replicate_wild_do_table), and executing dynamic online filter reconfiguration in MySQL 8.0.
 */
const Topic5 = () => {
  // Interactive Filter Phase State
  const [selectedFilterPhase, setSelectedFilterPhase] = useState("phase1_source_vs_replica");

  const filterPhases = {
    phase1_source_vs_replica: {
      phaseNumber: "Phase 1: Source vs Replica Filtering",
      title: "1. Source-Side (binlog_do_db) vs Replica-Side (replicate_do_db)",
      badge: "Architecture Comparison",
      badgeColor: "emerald",
      sqlSnippet: `-- 🛑 1. SOURCE-SIDE FILTERING (/etc/mysql/my.cnf on Primary):
[mysqld]
binlog_do_db = sales
-- ⚠️ Warning: Discards all non-sales events BEFORE binlog! Breaks PITR for other DBs!

-- ✅ 2. REPLICA-SIDE FILTERING (/etc/mysql/my.cnf on Replica):
[mysqld]
replicate_wild_do_table = 'sales.%'
-- 💡 Best Practice: Source logs all data; Replica selectively executes its subset!`,
      explanation:
        "Source-side filtering permanently omits events from the Binary Log, breaking backups and point-in-time recovery for excluded tables. Replica-side filtering is the industry standard for dedicated reporting and analytics nodes.",
      keyTakeaways: [
        "binlog_do_db on Source discards events before writing to binary logs.",
        "replicate_wild_do_table on Replica executes selective subsets locally.",
        "Replica filtering preserves full binary log history on the primary for DR."
      ]
    },
    phase2_cross_db_flaw: {
      phaseNumber: "Phase 2: Cross-DB Flaw & ROW Fix",
      title: "2. Statement-Based Cross-DB Flaw vs Row-Based Solution",
      badge: "Format Caveat",
      badgeColor: "rose",
      sqlSnippet: `-- 💥 STATEMENT FORMAT BUG (binlog_do_db = sales):
USE inventory;  -- Currently active database is 'inventory'
UPDATE sales.orders SET status = 'Shipped' WHERE id = 101;
-- &rarr; In STATEMENT mode, this is DROPPED because active DB is inventory!

-- 🛡️ ROW FORMAT FIX (binlog_format = ROW):
-- Every row event records the exact schema ('sales') and table ('orders').
-- Filter evaluates target table directly regardless of the client's USE database!`,
      explanation:
        "In Statement-based logging, database filters check only the currently active database (USE db), causing cross-database updates to be silently skipped. Row-Based Logging (ROW) evaluates exact table names, eliminating the bug.",
      keyTakeaways: [
        "Statement format filters default USE database, accidentally dropping queries.",
        "Row format records exact modified table names for 100% accurate filtering.",
        "Always enforce binlog_format = ROW when configuring replication filters."
      ]
    },
    phase3_wildcard_rules: {
      phaseNumber: "Phase 3: Wildcard Table Rules",
      title: "3. Table-Level Wildcard Rules (replicate_wild_do_table)",
      badge: "Granular Rules",
      badgeColor: "purple",
      sqlSnippet: `# 📂 MY.CNF WILDCARD TABLE RULES ON REPLICA:
[mysqld]
# Whitelist specific database schemas:
replicate-wild-do-table = 'kolkata_retail.%'
replicate-wild-do-table = 'billing.%'

# Blacklist temporary audit & cache tables:
replicate-wild-ignore-table = '%.temp_%'
replicate-wild-ignore-table = '%.audit_scratch_%'

-- 💡 Ignore rules take precedence over Whitelist rules!`,
      explanation:
        "Wildcard table filtering matches patterns using SQL wildcards (% and _), allowing DBAs to replicate entire database schemas while selectively excluding temporary tables, audit logs, and cache scratch tables.",
      keyTakeaways: [
        "replicate_wild_do_table matches database and table wildcard patterns.",
        "replicate_wild_ignore_table takes precedence over whitelist rules.",
        "Significantly reduces replica disk I/O and buffer pool memory usage."
      ]
    },
    phase4_dynamic_filtering: {
      phaseNumber: "Phase 4: Dynamic Reconfiguration",
      title: "4. Dynamic Online Filtering (CHANGE REPLICATION FILTER)",
      badge: "Zero-Downtime Reconfig",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ ONLINE DYNAMIC REPLICATION FILTER RECONFIGURATION (ZERO DOWNTIME):

-- 1. Pause SQL Applier Thread:
STOP REPLICA SQL_THREAD;

-- 2. Update Filtering Rules Online:
CHANGE REPLICATION FILTER 
  REPLICATE_WILD_DO_TABLE = ('kolkata_retail.%', 'billing.%'),
  REPLICATE_WILD_IGNORE_TABLE = ('kolkata_retail.audit_%'),
  REPLICATE_REWRITE_DB = ((kolkata_prod, kolkata_analytics));

-- 3. Resume SQL Applier:
START REPLICA SQL_THREAD;
SHOW REPLICA STATUS\\G`,
      explanation:
        "MySQL 8.0 allows modifying replication filters dynamically using CHANGE REPLICATION FILTER without restarting the server daemon, enabling online schema filtering and database renaming with zero downtime.",
      keyTakeaways: [
        "CHANGE REPLICATION FILTER modifies rules online without server restarts.",
        "REPLICATE_REWRITE_DB allows renaming schemas between Source and Replica.",
        "Clearing a rule is as simple as passing empty parentheses ()."
      ]
    }
  };

  const currentPhase = filterPhases[selectedFilterPhase];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 5 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Configuring <span className="text-emerald-400">Replication Filters</span>: Rules &amp; <span className="text-cyan-400">Wildcards</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering selective data replication in MySQL 8.0: contrasting Source-side and Replica-side filtering, preventing cross-database query drops with ROW format, configuring wildcard table rules (<code>replicate_wild_do_table</code>), and updating filters dynamically online.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Filtering Pillars ───────────────────────────── */}
        <section id="filter-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Filtering
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Architectural principles governing selective data replication across multi-tier database topologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Replica-Side Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Log everything on the primary for DR safety; selectively execute subsets on reporting replicas.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">ROW Format Fix</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Row-based logging records exact target tables, eliminating cross-database query drop bugs.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Wildcard Matching</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>replicate_wild_do_table</code> matches database and table patterns safely using % and _.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Online Reconfiguration</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                <code>CHANGE REPLICATION FILTER</code> modifies rules and rewrites databases without server restarts.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Replication Filtering Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Source vs Replica filtering rules, cross-DB query evaluations, wildcard patterns, and dynamic filter changes.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(filterPhases).map((phaseKey) => {
              const phase = filterPhases[phaseKey];
              const isSelected = selectedFilterPhase === phaseKey;
              return (
                <button
                  key={phaseKey}
                  onClick={() => setSelectedFilterPhase(phaseKey)}
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
                  Replication Filter Rule
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
                Configuration &amp; SQL Runbook:
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
              Replication filtering case studies in Barrackpore and Kolkata demonstrating 20GB daily storage savings and zero-downtime online reconfiguration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 20GB Daily Storage Savings in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Wildcard Ignore
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashier terminals generated 20GB of temporary audit logs daily in <code>barrackpore_store.temp_audit_logs</code>. Susmita configured <code>replicate_wild_ignore_table = &apos;barrackpore_store.temp_audit_%&apos;</code> on the reporting replica, skipping transient audit records while replicating all ₹1.2 Crores in sales transactions, freeing 20GB of NVMe disk storage daily.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Dynamic Online Filter Reconfig in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Zero Downtime
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required adding a new reporting schema to an analytics replica. Debangshu executed <code>CHANGE REPLICATION FILTER REPLICATE_DO_DB = (kolkata_ledger, reporting_db)</code> online after pausing the SQL thread for 2 seconds, updating active filters without restarting the MySQL daemon or interrupting read queries.
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
              Avoid filtering on primary servers and filtering failover standby nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Using binlog_do_db on Primary
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Omitting tables from the Source binary log breaks Point-in-Time Recovery (PITR) backups and prevents downstream replicas from ever receiving that data.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Avoid binlog_do_db on Source; use replicate_wild_do_table on replicas.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Filtering on HA Failover Standbys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                If a filtered replica is promoted to primary during an outage, all missing excluded tables will be permanently lost for the entire enterprise cluster.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: HA standby failover nodes must NEVER use replication filters.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Always Enforce binlog_format = ROW
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Row-based logging records the exact modified table for every event, completely eliminating cross-database filtering bugs.
              </p>
              <div className="text-xs text-slate-400">
                Ensures 100% deterministic rule evaluation regardless of active database.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use CHANGE REPLICATION FILTER
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Modify filtering rules dynamically via SQL by stopping only the SQL thread, modifying rules, and restarting the applier.
              </p>
              <div className="text-xs text-slate-400">
                Enables zero-downtime replication reconfigurations in production.
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
            title="Topic 5: Configuring Replication Filters: replicate-do-db, replicate-ignore-db, binlog-do-db"
            content={noteText}
          />

          <Teacher
            note="Replication filtering is powerful, but must be configured with precision! Avoid binlog_do_db on the Source because it breaks point-in-time recovery for your backups. Instead, log everything on the Source and use replicate_wild_do_table and replicate_wild_ignore_table on your replicas. Always use binlog_format = ROW to prevent cross-database query drops, and remember: never apply filters to HA standby replicas that might be promoted to primary!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of replication filters, cross-database evaluation rules, wildcard matching, and dynamic CHANGE REPLICATION FILTER syntax.
            </p>
          </div>

          <FAQTemplate
            title="Replication Filters &amp; Wildcards FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic5;
