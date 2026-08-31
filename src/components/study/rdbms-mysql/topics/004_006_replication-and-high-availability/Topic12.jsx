import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – MySQL InnoDB Cluster: Group Replication + MySQL Router + MySQL Shell AdminAPI
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive InnoDB Cluster workbench: exploring AdminAPI declarative deployment, configuring MySQL Router port mapping (6446 RW / 6447 RO), testing controlled primary switchovers, and executing zero-downtime rolling upgrades in MySQL 8.0.
 */
const Topic12 = () => {
  // Interactive Cluster Architecture State
  const [selectedClusterKey, setSelectedClusterKey] = useState("cluster1_adminapi");

  const clusterArchitectures = {
    cluster1_adminapi: {
      archName: "1. AdminAPI Deployment",
      title: "1. Declarative Cluster Deployment via MySQL Shell AdminAPI",
      badge: "Declarative Setup",
      badgeColor: "emerald",
      sqlSnippet: `// 🚀 DEPLOYING INNODB CLUSTER IN MYSQL SHELL (JS MODE):
// Step 1: Pre-flight configuration validation:
dba.configureInstance('admin@192.168.1.10:3306');
dba.configureInstance('admin@192.168.1.20:3306');
dba.configureInstance('admin@192.168.1.30:3306');

// Step 2: Create the cluster:
var cluster = dba.createCluster('kolkataProductionCluster');

// Step 3: Add nodes using high-speed NVMe physical clone:
cluster.addInstance('admin@192.168.1.20:3306', {recoveryMethod: 'clone'});
cluster.addInstance('admin@192.168.1.30:3306', {recoveryMethod: 'clone'});

// Step 4: Verify health status:
cluster.status();`,
      explanation:
        "MySQL Shell AdminAPI replaces error-prone manual configuration with high-level declarative commands. It provisions user accounts, validates prerequisites, and clones nodes at line speed.",
      keyTakeaways: [
        "dba.createCluster() initializes the cluster metadata and Group Replication.",
        "recoveryMethod: 'clone' provisions nodes at raw NVMe disk speed.",
        "cluster.status() returns complete real-time JSON topology telemetry."
      ]
    },
    cluster2_mysql_router: {
      archName: "2. MySQL Router",
      title: "2. Transparent Application Routing via MySQL Router",
      badge: "Client Middleware",
      badgeColor: "cyan",
      sqlSnippet: `# 🚀 BOOTSTRAP MYSQL ROUTER ON APPLICATION SERVERS:
mysqlrouter --bootstrap admin@192.168.1.10:3306 --user=mysqlrouter --directory /etc/mysqlrouter
systemctl start mysqlrouter

# 🌐 EXPOSED CLIENT PORTS:
# Port 6446: Read-Write (Directs all write transactions to active Primary)
# Port 6447: Read-Only (Round-robin load balanced across secondaries)

-- App writes: mysql -h 127.0.0.1 -P 6446 -u app_user -p
-- App reads:  mysql -h 127.0.0.1 -P 6447 -u app_user -p`,
      explanation:
        "MySQL Router is colocated on application servers, exposing Port 6446 for primary writes and Port 6447 for round-robin read balancing. When failover occurs, Router redirects traffic in under 3 seconds.",
      keyTakeaways: [
        "Colocated on app servers to eliminate extra network hops.",
        "Port 6446 for Primary writes; Port 6447 for Replica reads.",
        "Dynamically tracks primary elections via cluster metadata schema."
      ]
    },
    cluster3_switchover: {
      archName: "3. Controlled Switchovers",
      title: "3. Controlled Primary Role Switchover (Zero Downtime)",
      badge: "Maintenance Switch",
      badgeColor: "purple",
      sqlSnippet: `// 👑 CONTROLLED PRIMARY SWITCHOVER IN MYSQL SHELL:
// Switch primary role to Node 2 gracefully before maintaining Node 1:
cluster.setPrimaryInstance('admin@192.168.1.20:3306');

// 🔍 Verify new topology:
cluster.status();
// Output: Node 2 (PRIMARY) | Node 1 (SECONDARY) | Node 3 (SECONDARY)

// 💡 MySQL Router instantly redirects Port 6446 write traffic to Node 2!`,
      explanation:
        "cluster.setPrimaryInstance() performs a controlled role switchover, promoting a chosen secondary to Primary and demoting the old primary to Secondary without data loss or application restarts.",
      keyTakeaways: [
        "cluster.setPrimaryInstance() performs clean zero-downtime role handoffs.",
        "Essential for planned operating system kernel patching.",
        "MySQL Router shifts write traffic immediately to the new primary."
      ]
    },
    cluster4_rolling_upgrades: {
      archName: "4. Rolling Upgrades",
      title: "4. Zero-Downtime Rolling Upgrade Workflow",
      badge: "Zero Downtime",
      badgeColor: "rose",
      sqlSnippet: `# 🔄 STEP-BY-STEP ROLLING UPGRADE RUNBOOK (e.g. 8.0.35 → 8.0.36):

# Step 1: Upgrade Secondary Node 3 → Start mysqld → cluster.status() shows ONLINE.
# Step 2: Upgrade Secondary Node 2 → Start mysqld → cluster.status() shows ONLINE.

# Step 3: Switch Primary to upgraded Node 2:
cluster.setPrimaryInstance('admin@192.168.1.20:3306');

# Step 4: Upgrade the former Primary Node 1 → Start mysqld → cluster.status() shows ONLINE.
# ✅ Complete cluster upgraded with 100% continuous application availability!`,
      explanation:
        "Upgrading secondaries first, performing a controlled primary switchover to an upgraded secondary, and upgrading the old primary guarantees 100% continuous database availability during version upgrades.",
      keyTakeaways: [
        "Upgrade secondary nodes first while primary continues processing writes.",
        "Switch primary role to an upgraded secondary node.",
        "Upgrade the former primary last to achieve true zero-downtime maintenance."
      ]
    }
  };

  const currentCluster = clusterArchitectures[selectedClusterKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 12 of 14
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          MySQL <span className="text-emerald-400">InnoDB Cluster</span>: Group Replication, <span className="text-cyan-400">Router</span> &amp; AdminAPI
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering Oracle&apos;s unified high-availability database framework in MySQL 8.0: deploying declarative clusters via MySQL Shell AdminAPI, configuring MySQL Router port routing, executing controlled primary switchovers, and performing zero-downtime rolling upgrades.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Cluster Pillars ─────────────────────────────── */}
        <section id="cluster-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Three Pillars of MySQL InnoDB Cluster
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Integrated technologies delivering automated high availability, declarative management, and transparent routing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">MySQL Shell AdminAPI</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Declarative JS/Python CLI for single-command cluster creation, node additions, and health audits.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Group Replication</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Paxos distributed consensus engine guaranteeing zero data loss (RPO = 0) and automated failover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">MySQL Router</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Transparent client routing on Port 6446 (Primary RW) and Port 6447 (Secondary RO round-robin).
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Clone Recovery</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Automated node provisioning using raw physical InnoDB tablespace cloning at NVMe line speed.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive InnoDB Cluster Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe AdminAPI deployment commands, MySQL Router bootstrap configuration, primary switchovers, and rolling upgrade workflows.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(clusterArchitectures).map((clusterKey) => {
              const arch = clusterArchitectures[clusterKey];
              const isSelected = selectedClusterKey === clusterKey;
              return (
                <button
                  key={clusterKey}
                  onClick={() => setSelectedClusterKey(clusterKey)}
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
                  InnoDB Cluster Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentCluster.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentCluster.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentCluster.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentCluster.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentCluster.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentCluster.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCluster.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                AdminAPI &amp; Shell Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentCluster.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentCluster.keyTakeaways.map((item, i) => (
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
              InnoDB Cluster case studies in Barrackpore and Kolkata demonstrating rapid AdminAPI deployment and zero-downtime rolling database upgrades.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – 3-Minute Deployment in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  AdminAPI Setup
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS cashiers required deploying a 3-node HA cluster across ₹1.2 Crores in inventory data. Susmita executed <code>dba.createCluster(&apos;barrackporeRetail&apos;)</code> and added nodes using <code>&#123;recoveryMethod: &apos;clone&apos;&#125;</code>, provisioning the complete cluster in under 3 minutes with zero manual configuration files.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Zero-Downtime Upgrades in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Rolling Upgrade
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required performing a minor version upgrade from MySQL 8.0.35 to 8.0.36. Debangshu upgraded the secondaries first, used <code>cluster.setPrimaryInstance()</code> to switch the primary role in under 2 seconds, and upgraded the former primary last, maintaining 100% continuous customer banking availability.
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
              Avoid manual configuration edits outside AdminAPI and centralizing MySQL Router proxies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Editing my.cnf Manually
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Modifying Group Replication settings manually causes configuration drift with the <code>mysql_innodb_cluster_metadata</code> schema, causing AdminAPI errors.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Perform all cluster modifications strictly through MySQL Shell AdminAPI.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Centralized Router SPOF
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deploying a single central MySQL Router creates a network choke point and single point of failure.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Colocate MySQL Router directly on each Application Server host.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use recoveryMethod: &apos;clone&apos;
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Always specify <code>&#123;recoveryMethod: &apos;clone&apos;&#125;</code> when adding new nodes to provision data at raw physical NVMe line speed.
              </p>
              <div className="text-xs text-slate-400">
                Transfers 100GB+ tablespaces in minutes without binlog replay overhead.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Regular cluster.status() Audits
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Incorporate <code>cluster.status()</code> telemetry into automated Prometheus monitoring to verify <code>status: &apos;OK&apos;</code> across all cluster members.
              </p>
              <div className="text-xs text-slate-400">
                Ensures instantaneous detection of network partitions or split-brain events.
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
            title="Topic 12: MySQL InnoDB Cluster: Group Replication + MySQL Router + MySQL Shell AdminAPI"
            content={noteText}
          />

          <Teacher
            note="MySQL InnoDB Cluster is Oracle's complete, production-ready high availability stack! It unifies MySQL Shell AdminAPI for declarative management, Group Replication for zero-data-loss Paxos consensus, and MySQL Router for transparent application routing on Port 6446 (Primary RW) and Port 6447 (Replica RO). Use AdminAPI to create your cluster, use clone recovery for rapid node provisioning, and follow the rolling upgrade runbook to achieve zero-downtime maintenance!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of MySQL Shell AdminAPI, clone recovery, MySQL Router bootstrap, primary switchovers, and rolling upgrade procedures.
            </p>
          </div>

          <FAQTemplate
            title="MySQL InnoDB Cluster &amp; AdminAPI FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
