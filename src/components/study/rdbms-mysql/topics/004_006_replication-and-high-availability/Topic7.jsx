import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic7_files/topic7_questions";
import noteText from "./topic7_files/topic7_note.txt?raw";

/**
 * Topic7 – Read/Write Splitting Architectures using ProxySQL and MySQL Router
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive Read/Write splitting workbench: configuring ProxySQL Hostgroups, writing regex query routing rules, testing automated replication lag shunning, and exploring MySQL Router in InnoDB Cluster.
 */
const Topic7 = () => {
  // Interactive Proxy Architecture State
  const [selectedArchKey, setSelectedArchKey] = useState("arch1_hostgroups");

  const proxyArchitectures = {
    arch1_hostgroups: {
      archName: "1. ProxySQL Hostgroups",
      title: "1. Hostgroup Definition: Writers (10) vs Readers (20)",
      badge: "Server Pools",
      badgeColor: "emerald",
      sqlSnippet: `-- 🏢 DEFINING SERVERS IN PROXYSQL ADMIN (Port 6032):
INSERT INTO mysql_servers (hostgroup_id, hostname, port, max_replication_lag, weight) 
VALUES 
  (10, '192.168.1.10', 3306, 0, 100),   -- Primary Writer
  (20, '192.168.1.20', 3306, 5, 100),   -- Replica Reader 1
  (20, '192.168.1.30', 3306, 5, 100);   -- Replica Reader 2

-- 🚀 Deploy to Runtime and Persist to Disk:
LOAD MYSQL SERVERS TO RUNTIME;
SAVE MYSQL SERVERS TO DISK;`,
      explanation:
        "ProxySQL divides cluster nodes into logical Hostgroups. Hostgroup 10 holds the single writable primary, while Hostgroup 20 holds the pool of read-only replicas with weighted load balancing.",
      keyTakeaways: [
        "Hostgroup 10: Primary writer server.",
        "Hostgroup 20: Read-only replica pool.",
        "LOAD TO RUNTIME activates changes instantly without restarting the proxy."
      ]
    },
    arch2_query_rules: {
      archName: "2. Transparent Query Rules",
      title: "2. Regex Query Routing Rules (mysql_query_rules)",
      badge: "Query Splitting",
      badgeColor: "cyan",
      sqlSnippet: `-- ⚡ TRANSPARENT QUERY ROUTING RULES:

-- Rule 1: Route SELECT ... FOR UPDATE strictly to Writer Hostgroup 10!
INSERT INTO mysql_query_rules (rule_id, active, match_pattern, destination_hostgroup, apply) 
VALUES (1, 1, '^SELECT.*FOR UPDATE', 10, 1);

-- Rule 2: Route all general SELECT queries to Reader Hostgroup 20:
INSERT INTO mysql_query_rules (rule_id, active, match_pattern, destination_hostgroup, apply) 
VALUES (2, 1, '^SELECT', 20, 1);

LOAD MYSQL QUERY RULES TO RUNTIME;
SAVE MYSQL QUERY RULES TO DISK;`,
      explanation:
        "ProxySQL inspects incoming SQL queries via regex. Locking reads (`SELECT ... FOR UPDATE`) are routed to the Writer hostgroup to acquire authoritative row locks, while general `SELECT` queries are balanced across readers.",
      keyTakeaways: [
        "Locking reads (FOR UPDATE) MUST hit the writer hostgroup.",
        "^SELECT routes general read traffic to the replica pool.",
        "apply = 1 stops evaluating subsequent rules once matched."
      ]
    },
    arch3_lag_shunning: {
      archName: "3. Lag Shunning & OFFLINE_SOFT",
      title: "3. Automated Lag Shunning & Connection Draining",
      badge: "Lag Protection",
      badgeColor: "purple",
      sqlSnippet: `-- 🛡️ AUTOMATED REPLICATION LAG SHUNNING:
-- If Seconds_Behind_Source > max_replication_lag (5s), ProxySQL marks node SHUNNED!
SELECT hostgroup_id, hostname, status, max_replication_lag FROM mysql_servers;
-- Output: Hostgroup 20 | 192.168.1.20 | SHUNNED | 5 (Lag: 12s → Shunted!)

-- 🧹 ZERO-DOWNTIME MAINTENANCE (OFFLINE_SOFT):
UPDATE mysql_servers SET status = 'OFFLINE_SOFT' WHERE hostname = '192.168.1.20';
LOAD MYSQL SERVERS TO RUNTIME; -- Drains active transactions gracefully!`,
      explanation:
        "ProxySQL continuously monitors replica lag. If a replica lags beyond its threshold, ProxySQL shunts it from the reader pool to prevent stale reads. OFFLINE_SOFT allows zero-downtime server maintenance.",
      keyTakeaways: [
        "max_replication_lag automatically shunts lagging replicas to prevent stale reads.",
        "OFFLINE_SOFT drains existing client connections before server restarts.",
        "Fallback routing sends reads to primary if all replicas are shunned."
      ]
    },
    arch4_mysql_router: {
      archName: "4. MySQL Router (InnoDB Cluster)",
      title: "4. MySQL Router in MySQL InnoDB Cluster",
      badge: "Native Middleware",
      badgeColor: "rose",
      sqlSnippet: `# 🚀 BOOTSTRAP MYSQL ROUTER TO INNODB CLUSTER:
mysqlrouter --bootstrap cluster_admin@192.168.1.10:3306 --user=mysqlrouter

# 🌐 APPLICATION CONNECTION PORTS:
# Port 6446: Read-Write (Directs all transactions to active Primary)
# Port 6447: Read-Only (Round-robin load balanced across secondaries)

-- App writes: mysql -h 127.0.0.1 -P 6446 -u app_user -p
-- App reads:  mysql -h 127.0.0.1 -P 6447 -u app_user -p`,
      explanation:
        "MySQL Router is a lightweight, zero-configuration middleware for MySQL InnoDB Cluster, dynamically discovering primary elections and exposing Port 6446 for read-write and Port 6447 for round-robin read-only queries.",
      keyTakeaways: [
        "Native routing middleware tailored for MySQL InnoDB Cluster.",
        "Port 6446 for primary writes; Port 6447 for replica reads.",
        "Auto-discovers failover promotions from Group Replication metadata."
      ]
    }
  };

  const currentArch = proxyArchitectures[selectedArchKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 7 of 14
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Read/Write Splitting</span> Architectures: <span className="text-cyan-400">ProxySQL</span> &amp; MySQL Router
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering database proxy routing layers in MySQL 8.0: defining ProxySQL hostgroups, writing regex query rules, shielding users from replication lag with automated shunning, multiplexing client connections, and deploying MySQL Router for InnoDB Clusters.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Proxy Pillars ───────────────────────────────── */}
        <section id="proxy-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Database Proxy Routing
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Decoupling application database logic from backend cluster topologies for transparent scaling and high availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Hostgroup Pools</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Separates primary writers (Hostgroup 10) from read replica pools (Hostgroup 20).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Transparent Rules</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Routes <code>SELECT ... FOR UPDATE</code> to writers and general reads to reader pools.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Lag Shunning</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Automatically shunts lagging replicas to protect users from reading stale records.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">MySQL Router</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Native InnoDB Cluster routing on Port 6446 (RW) and Port 6447 (RO round-robin).
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Read/Write Splitting Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Hostgroup definitions, regex query rules, lag shunning telemetry, and MySQL Router bootstrap commands.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(proxyArchitectures).map((archKey) => {
              const arch = proxyArchitectures[archKey];
              const isSelected = selectedArchKey === archKey;
              return (
                <button
                  key={archKey}
                  onClick={() => setSelectedArchKey(archKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {arch.archName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Proxy Routing Mechanism
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentArch.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentArch.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentArch.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentArch.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentArch.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentArch.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentArch.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Configuration &amp; SQL Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentArch.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentArch.keyTakeaways.map((item, i) => (
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
              Proxy routing case studies in Barrackpore and Kolkata demonstrating lag shunning and dual-port banking routing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Real-Time Lag Shunning in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Lag Shielded
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, POS cashiers processed ₹1.2 Crores in retail billing. During evening rush hour, an unindexed analytical query caused Replica 1 to lag by 15 seconds. Because Susmita configured <code>max_replication_lag = 5</code> in ProxySQL, the proxy automatically shunted Replica 1, redirecting stock verification queries to Replica 2 in under 50ms and preventing cashiers from overselling out-of-stock items.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Dual-Port Routing in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  MySQL Router
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required strict query isolation. Debangshu configured MySQL Router to expose Port 6446 for atomic money transfer writes (routed to the Group Replication primary) and Port 6447 for account statement downloads (round-robin balanced across 3 secondary nodes), cutting transaction response latency by 45%.
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
              Avoid routing SELECT FOR UPDATE to read replicas and leaving single-proxy SPOF vulnerabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Routing SELECT FOR UPDATE to Readers
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Routing locking reads to read replicas fails to acquire exclusive locks on the primary, allowing concurrent write conflicts and race conditions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce a dedicated rule routing ^SELECT.*FOR UPDATE to Writer Hostgroup 10.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Single Point of Failure (SPOF) Proxy
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deploying only a single ProxySQL node creates an infrastructure SPOF; if the proxy crashes, the entire application loses database access.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Deploy two redundant ProxySQL nodes behind Keepalived Virtual IP (VIP).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Configure max_replication_lag
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set <code>max_replication_lag = 5</code> on all reader nodes so ProxySQL automatically shunts lagging replicas to prevent users from reading stale data.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees application read consistency during heavy batch updates.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Use OFFLINE_SOFT for Maintenance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Set a server to <code>OFFLINE_SOFT</code> before performing upgrades to drain active connections without dropping in-flight client transactions.
              </p>
              <div className="text-xs text-slate-400">
                Enables true zero-downtime database maintenance operations.
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
            title="Topic 7: Read/Write Splitting Architectures using ProxySQL and MySQL Router"
            content={noteText}
          />

          <Teacher
            note="Read/Write splitting is what elevates a MySQL cluster into an enterprise-scale architecture! Instead of complicating your application code with dual data sources, put ProxySQL or MySQL Router in front. Define Hostgroup 10 for Writers and Hostgroup 20 for Readers, configure regex query rules (and always route SELECT FOR UPDATE to the writer!), set max_replication_lag = 5 to automatically shunt lagging replicas, and use Keepalived VIPs for proxy redundancy!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of ProxySQL hostgroups, query rules, connection multiplexing, lag shunning, and MySQL Router bootstrap procedures.
            </p>
          </div>

          <FAQTemplate
            title="Read/Write Splitting &amp; ProxySQL FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic7;
