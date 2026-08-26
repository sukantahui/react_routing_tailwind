import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic6_files/topic6_questions";
import noteText from "./topic6_files/topic6_note.txt?raw";

/**
 * Topic6 – Replication Topologies: Master-Slave, Multi-Source Replication, Master-Master (Dual-Master), Tree Replication
 * Module: 004_006_replication-and-high-availability
 *
 * @component
 * @returns {JSX.Element} Interactive replication topologies workbench: exploring Fan-Out scaling, Cascading Relay trees (log_replica_updates), Multi-Source named channels (FOR CHANNEL), and Dual-Master auto-increment collision mitigation in MySQL 8.0.
 */
const Topic6 = () => {
  // Interactive Topology State
  const [selectedTopologyKey, setSelectedTopologyKey] = useState("topology1_fan_out");

  const replicationTopologies = {
    topology1_fan_out: {
      topologyName: "1. Standard Fan-Out",
      title: "1. Standard Fan-Out (1 Primary &rarr; N Replicas)",
      badge: "Read Scaling",
      badgeColor: "emerald",
      sqlSnippet: `-- 🌐 STANDARD FAN-OUT ARCHITECTURE:
-- [Primary (RW)] ───┬───&gt; [Read Replica 1 (RO)]
--                   ├───> [Read Replica 2 (RO)]
--                   └───> [Read Replica 3 (RO)]

-- ⚙️ Configuration:
-- Primary writes to binlog; each replica runs independent I/O and SQL threads.
-- Load balancer (ProxySQL / HAProxy) routes SELECT queries across replicas.`,
      explanation:
        "Standard Fan-Out is the most common replication topology, allowing horizontal scaling of read-intensive workloads across multiple read replicas while directing all write traffic to a single primary.",
      keyTakeaways: [
        "1 Primary handles writes; N Replicas scale SELECT queries.",
        "Replicas are placed behind a database load balancer (ProxySQL).",
        "Source spawns 1 Binlog Dump thread per connected replica."
      ]
    },
    topology2_cascading_tree: {
      topologyName: "2. Cascading (Tree)",
      title: "2. Cascading Relay Replica (Tree Architecture)",
      badge: "Bandwidth Offload",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌳 CASCADING TREE TOPOLOGY:
-- [Primary] ───> [Relay Replica] ───┬───> [Edge Replica 1]
--                                   ├───> [Edge Replica 2]
--                                   └───> [Edge Replica 20+]

-- ⚙️ MANDATORY SETTING ON RELAY REPLICA (/etc/mysql/my.cnf):
[mysqld]
log_bin = mysql-bin
log_replica_updates = ON   # Re-writes applied events to own binlog!`,
      explanation:
        "When supporting 20+ read replicas, streaming binary logs from a single primary saturates its network interface. A Cascading Relay Replica receives 1 stream and fans it out to edge nodes, protecting the primary.",
      keyTakeaways: [
        "Protects primary network bandwidth when serving dozens of replicas.",
        "Mandates log_replica_updates = ON on the intermediate relay node.",
        "Ideal for distributing data across geographic regions and datacenters."
      ]
    },
    topology3_multi_source: {
      topologyName: "3. Multi-Source (Fan-In)",
      title: "3. Multi-Source Fan-In Replication (Named Channels)",
      badge: "Data Warehouse",
      badgeColor: "purple",
      sqlSnippet: `-- 🏢 MULTI-SOURCE CONSOLIDATION INTO CENTRAL WAREHOUSE:
-- [Mumbai Source]   ──┐
-- [Kolkata Source]  ──┼──> [Central DWH Replica]
-- [Delhi Source]    ──┘

-- ⚙️ NAMED CHANNELS CONFIGURATION ON CENTRAL REPLICA:
CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '10.0.1.10', SOURCE_AUTO_POSITION = 1 
  FOR CHANNEL 'mumbai_channel';

CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '10.0.2.10', SOURCE_AUTO_POSITION = 1 
  FOR CHANNEL 'kolkata_channel';

START REPLICA FOR CHANNEL 'mumbai_channel';`,
      explanation:
        "Multi-Source replication consolidates disparate regional primary databases into a single central data warehouse replica using independent Named Replication Channels (FOR CHANNEL).",
      keyTakeaways: [
        "Replicates from multiple sources into a single replica simultaneously.",
        "Independent I/O and SQL threads per configured replication channel.",
        "Supports up to 256 distinct named channels in MySQL 8.0."
      ]
    },
    topology4_dual_master: {
      topologyName: "4. Dual-Master (Master-Master)",
      title: "4. Dual-Master & Auto-Increment Offset Mitigation",
      badge: "Active-Passive",
      badgeColor: "rose",
      sqlSnippet: `-- ⚖️ DUAL-MASTER CLUSTER: [Node A] <──────> [Node B]

-- 🛡️ AUTO-INCREMENT COLLISION MITIGATION (my.cnf):
-- On Node A:
auto_increment_increment = 2
auto_increment_offset = 1   # Generates IDs: 1, 3, 5, 7...

-- On Node B:
auto_increment_increment = 2
auto_increment_offset = 2   # Generates IDs: 2, 4, 6, 8...

-- ⚠️ BEST PRACTICE: Deploy strictly in Active-Passive mode (Node B super_read_only = ON)!`,
      explanation:
        "Dual-Master replicates bidirectionally between two nodes for rapid maintenance switchover. Deploying in Active-Passive mode with auto-increment offsets prevents write collisions and data divergence.",
      keyTakeaways: [
        "Active-Passive mode provides instantaneous role switchovers.",
        "auto_increment_offset prevents primary key collisions.",
        "replicate_same_server_id = 0 prevents infinite circular replication loops."
      ]
    }
  };

  const currentTopology = replicationTopologies[selectedTopologyKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.6: Replication, High Availability &amp; Failover
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 6 of 14
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
          MySQL <span className="text-emerald-400">Replication Topologies</span>: Fan-Out, Tree &amp; <span className="text-cyan-400">Multi-Source</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering enterprise database architectures in MySQL 8.0: deploying Standard Fan-Out for read scaling, Cascading Relay trees for bandwidth protection, Multi-Source named channels for data warehousing, and Dual-Master topologies with auto-increment offset mitigation.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Topologies Pillars ──────────────────────────── */}
        <section id="topologies-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Replication Topologies
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Architectural blueprints for scaling read throughput, consolidating regional data, and enabling rapid maintenance switchovers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Topology 1</span>
              <h3 className="font-bold text-white text-base">Standard Fan-Out</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                1 Primary routes writes; N Replicas behind ProxySQL load balancers scale read throughput.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Topology 2</span>
              <h3 className="font-bold text-white text-base">Cascading Tree</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Relay Replicas with <code>log_replica_updates = ON</code> protect primary network bandwidth.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Topology 3</span>
              <h3 className="font-bold text-purple-300 text-base">Multi-Source Fan-In</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Consolidates regional branch databases into a central data warehouse via Named Channels.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Topology 4</span>
              <h3 className="font-bold text-rose-300 text-base">Active-Passive Dual</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Bidirectional replication with auto-increment offsets for instant zero-repointing switchovers.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Topologies Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Fan-Out architectures, Cascading Relay trees, Multi-Source channel configurations, and Dual-Master offset math.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(replicationTopologies).map((topoKey) => {
              const topo = replicationTopologies[topoKey];
              const isSelected = selectedTopologyKey === topoKey;
              return (
                <button
                  key={topoKey}
                  onClick={() => setSelectedTopologyKey(topoKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                &gt;
                  {topo.topologyName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Replication Architecture
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentTopology.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentTopology.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentTopology.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentTopology.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentTopology.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentTopology.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentTopology.explanation}
            </p>

            {/* SQL Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Configuration &amp; SQL Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentTopology.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentTopology.keyTakeaways.map((item, i) => (
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
              Replication topology case studies in Barrackpore and Kolkata demonstrating Multi-Source regional consolidation and Dual-Master offset protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Multi-Store Consolidation in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Multi-Source Channels
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, managing 3 regional retail outlets in Barrackpore, Shyamnagar, and Naihati required centralizing sales data into a central analytics database. Susmita configured 3 named replication channels on the central server, streaming all ₹1.2 Crores in daily sales transactions concurrently into dedicated regional schemas with zero manual batch exports.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Active-Passive Dual Master in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Auto-Increment Offsets
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in daily volume required performing quarterly operating system patches with zero downtime. Debangshu configured an Active-Passive Dual-Master cluster with <code>auto_increment_increment = 2</code>, enabling seamless zero-repointing traffic switchovers during maintenance windows without primary key collisions.
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
              Avoid Active-Active dual master write collisions and forgetting log_replica_updates on relay nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Active-Active Dual Master Collisions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Allowing concurrent writes to both masters without distributed conflict detection causes silent data divergence and un-resolvable row update conflicts.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce Active-Passive Dual-Master with super_read_only on Node B.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Omitting log_replica_updates on Relay Nodes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Without <code>log_replica_updates = ON</code>, an intermediate relay replica does not log applied events, preventing downstream edge replicas from receiving transactions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always enable log_replica_updates = ON on cascading relay nodes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use Cascading Trees for Scale
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Deploy Cascading Relay Replicas when scaling to &gt;10 read replicas to protect the primary server&apos;s network bandwidth and CPU context switching.
              </p>
              <div className="text-xs text-slate-400">
                Fans out binary log streams efficiently without primary saturation.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Leverage Named Channels for DWH
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use <code>FOR CHANNEL</code> in MySQL 8.0 to consolidate regional microservices and branch databases into a centralized real-time reporting warehouse.
              </p>
              <div className="text-xs text-slate-400">
                Provides granular per-channel thread management and fault isolation.
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
            title="Topic 6: Replication Topologies: Master-Slave, Multi-Source Replication, Master-Master (Dual-Master), Tree Replication"
            content={noteText}
          />

          <Teacher
            note="Selecting the right replication topology is fundamental to enterprise database architecture! Use Standard Fan-Out for horizontal read scaling behind ProxySQL, Cascading Relay Replicas (with log_replica_updates = ON) to protect primary bandwidth when serving dozens of edge nodes, Multi-Source Named Channels for real-time data warehousing, and Active-Passive Dual-Master with auto-increment offsets for instant zero-downtime maintenance switchovers!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Fan-Out scaling, Cascading relay nodes, Multi-Source channels, and Dual-Master offset configuration.
            </p>
          </div>

          <FAQTemplate
            title="Replication Topologies FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic6;
