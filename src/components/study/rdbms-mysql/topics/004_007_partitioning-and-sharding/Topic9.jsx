import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic9_files/topic9_questions";
import noteText from "./topic9_files/topic9_note.txt?raw";

/**
 * Topic9 – Horizontal Sharding Foundations: Application-Level vs Middleware-Level Sharding
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Horizontal Sharding foundations workbench: comparing Partitioning vs Sharding architectures, evaluating Application-Level routing vs Middleware Proxies (ShardingSphere/Vitess), simulating Point Routing vs Scatter-Gather queries, and structuring Global Tables in MySQL 8.0.
 */
const Topic9 = () => {
  // Interactive Sharding State
  const [selectedShardingKey, setSelectedShardingKey] = useState("sharding1_partition_vs_shard");

  const shardingModels = {
    sharding1_partition_vs_shard: {
      modelName: "1. Partitioning vs Sharding",
      title: "1. Table Partitioning (Scale-Up) vs Horizontal Sharding (Scale-Out)",
      badge: "Architecture Comparison",
      badgeColor: "emerald",
      sqlSnippet: `// 🏢 1. TABLE PARTITIONING (Single Server Instance):
// - 1 MySQL Process (mysqld), 1 CPU Socket, 1 RAM Pool, 1 Disk Bus.
// - Splits table into multiple .ibd files on local filesystem.
// - Hardware limit: Saturated at ~2TB - 5TB and ~50k writes/sec.

// 🌐 2. HORIZONTAL SHARDING (Shared-Nothing Multi-Node Cluster):
// - N Autonomous MySQL Server Instances (Each with dedicated CPU/RAM/Disks).
// - Scalability limit: Virtually UNLIMITED scale-out across hundreds of nodes!
// - Blast radius: Failure of Shard 2 affects only 1/N of total customer base!`,
      explanation:
        "Table partitioning scales within a single server using file-level isolation. Horizontal sharding scales across independent autonomous server nodes in a shared-nothing topology with independent CPU, memory, and disk IOPS.",
      keyTakeaways: [
        "Partitioning runs on a single server sharing CPU, RAM, and disk controllers.",
        "Sharding distributes data across independent autonomous server nodes.",
        "Sharding limits failure blast radius to only the affected shard node."
      ]
    },
    sharding2_app_vs_middleware: {
      modelName: "2. App vs Middleware",
      title: "2. Application-Level Routing vs Middleware Database Proxies",
      badge: "Implementation Choice",
      badgeColor: "cyan",
      sqlSnippet: `// ⚡ 1. APPLICATION-LEVEL ROUTING (Direct Connection Pools):
// Backend evaluates shard key and picks connection directly:
const shardId = hash(tenantId) % SHARD_COUNT;
const targetDb = connectionPools[shardId];
await targetDb.query("INSERT INTO orders VALUES (...)");
// → Zero proxy latency! Direct socket connection!

// 🛡️ 2. MIDDLEWARE-LEVEL SHARDING (Apache ShardingSphere / Vitess):
// App connects to standard MySQL port (3307) → Proxy parses SQL & routes:
// Client → [ShardingSphere Proxy] → Dispatches to Shard 0 / Shard 1 → Merges`,
      explanation:
        "Application-level sharding offers zero-latency direct socket connections but requires custom routing logic in code. Middleware sharding intercepts standard SQL transparently, handling distributed routing and result merges automatically.",
      keyTakeaways: [
        "Application sharding provides zero proxy latency with direct connection pools.",
        "Middleware sharding (ShardingSphere/Vitess) preserves transparent standard SQL.",
        "Middleware handles distributed multi-shard query merges automatically."
      ]
    },
    sharding3_point_vs_scatter: {
      modelName: "3. Point vs Scatter-Gather",
      title: "3. Point Routing (1-5ms) vs Scatter-Gather Broadcast Penalties",
      badge: "Query Performance",
      badgeColor: "purple",
      sqlSnippet: `-- 🎯 1. POINT ROUTING (Single Shard Execution - FAST):
-- Query filters on Shard Key (customer_id = 105):
SELECT * FROM orders WHERE customer_id = 105;
-- → Router dispatches ONLY to Shard 1! Returns in 2 milliseconds!

-- 💥 2. SCATTER-GATHER BROADCAST (Omits Shard Key - EXPENSIVE):
SELECT SUM(amount) FROM orders WHERE order_status = 'COMPLETED';
-- → Router MUST broadcast query to ALL Shards (0, 1, 2, 3) in parallel!
-- → Incurs Tail Latency: Bound by slowest responding shard node in cluster!`,
      explanation:
        "Point routing dispatches queries directly to a single shard in 1–5ms. Scatter-gather queries broadcast to all nodes in parallel, multiplying network I/O and binding total query latency to the slowest responding node.",
      keyTakeaways: [
        "Point queries filtering on the Shard Key execute against a single node in 1-5ms.",
        "Scatter-gather queries broadcast to all nodes, consuming cluster-wide CPU.",
        "Scatter-gather latency is bound by the slowest responding shard node."
      ]
    },
    sharding4_global_and_er_groups: {
      modelName: "4. Global & ER Groups",
      title: "4. Global Lookup Tables & Co-Sharded ER Table Groups",
      badge: "Data Modeling",
      badgeColor: "rose",
      sqlSnippet: `-- 🌐 1. GLOBAL (BROADCAST) TABLES:
-- Small reference tables replicated 100% identically on EVERY shard node:
-- Shard 0: [countries, currencies]
-- Shard 1: [countries, currencies]
-- Allows local joins on every shard without cross-node network traffic!

-- 🔗 2. ER TABLE GROUPS (Co-Sharded Parent-Child Entities):
-- Customers, Orders, and Items all share the SAME Shard Key (customer_id):
-- All orders for customer 105 reside on Shard 1 → 100% Local Joins!`,
      explanation:
        "Global tables replicate reference data across all shard nodes for local joins. ER Table Groups co-locate parent and child entities (e.g. customers and orders) onto the same physical node using a shared shard key.",
      keyTakeaways: [
        "Global reference tables replicate across all shards to allow local joins.",
        "ER Table Groups co-locate parent and child entities on the same shard node.",
        "Eliminates slow cross-shard joins and distributed network hops."
      ]
    }
  };

  const currentModel = shardingModels[selectedShardingKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 9 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Horizontal Sharding</span>: Application-Level vs <span className="text-cyan-400">Middleware Proxies</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering distributed database scale-out in MySQL 8.0: understanding Shared-Nothing multi-node clusters, comparing Application routing vs Middleware proxies (ShardingSphere/Vitess), evaluating Point Routing vs Scatter-Gather, and designing Global Tables.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Sharding Pillars ────────────────────────────── */}
        <section id="sharding-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Horizontal Sharding
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core architectural principles enabling horizontal scale-out across independent autonomous database nodes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Shared-Nothing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Autonomous server nodes with independent compute, RAM, and storage controllers.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Point Routing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Queries filtering on the Shard Key route directly to a single node in 1–5ms.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Global Tables</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Replicates reference tables across all shards to enable local joins without network hops.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">ER Co-Sharding</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Co-locates parent and child entities on the same physical shard using a common shard key.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Horizontal Sharding Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Partitioning vs Sharding architectures, Application vs Middleware routing, Point vs Scatter-Gather performance, and Global table models.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(shardingModels).map((modelKey) => {
              const model = shardingModels[modelKey];
              const isSelected = selectedShardingKey === modelKey;
              return (
                <button
                  key={modelKey}
                  onClick={() => setSelectedShardingKey(modelKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {model.modelName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Sharding Architectural Feature
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentModel.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentModel.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentModel.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentModel.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentModel.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentModel.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentModel.explanation}
            </p>

            {/* SQL / Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Routing Architecture &amp; Code Implementation:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentModel.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentModel.keyTakeaways.map((item, i) => (
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
              Horizontal sharding case studies in Barrackpore and Kolkata demonstrating application-level connection routing and ShardingSphere microservice scaling.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Application-Level Routing in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Sub-5ms Sockets
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail store POS sales scaled to 100,000,000 invoices across ₹1.2 Crores in volume. Susmita configured an Application-Level routing data source using <code>store_id % 4</code> to route cashier writes directly to 4 dedicated MySQL servers. Cashier transactions achieved sub-5ms response times with zero proxy network hop overhead, handling 12,000 concurrent writes/sec smoothly.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Apache ShardingSphere in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  40 Microservices
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing digital transaction ledgers across ₹500 Crores in volume, over 40 distinct banking microservices queried the core database. Debangshu deployed Apache ShardingSphere as a transparent database proxy; microservices continued using standard MySQL JDBC drivers while ShardingSphere automatically routed customer queries and merged distributed cross-shard reports.
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
              Avoid frequent cross-shard scatter-gather queries and single-node auto-increment collisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Frequent Scatter-Gather Queries
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Writing queries that omit the Shard Key forces the router to broadcast to all nodes, causing high CPU usage and tail latency delays.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce that 95%+ of transactional queries include the Shard Key.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Local Auto-Increment Key Collisions
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Using local AUTO_INCREMENT columns creates duplicate primary key collisions when Shard 0 and Shard 1 both generate id=101.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Standardize on distributed ID generators (Twitter Snowflake, UUIDv7).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Replicate Global Tables
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Replicate reference and dictionary lookup tables across all shard nodes so join queries execute locally without network hops.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates cross-shard joins for reference data.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Deploy HA Behind Every Shard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Back each logical shard node with a 3-node MySQL InnoDB Cluster or Group Replication pair to guarantee high availability per shard.
              </p>
              <div className="text-xs text-slate-400">
                Ensures hardware failure on one node triggers automated failover.
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
            title="Topic 9: Horizontal Sharding Foundations: Application-Level vs Middleware-Level Sharding"
            content={noteText}
          />

          <Teacher
            note="Horizontal Sharding is the ultimate frontier for scaling relational databases to billions of rows! Always understand the fundamental shift: Table Partitioning runs on a single server sharing CPU/RAM, while Horizontal Sharding is a Shared-Nothing architecture across independent physical server nodes. Choose Application-Level routing when you need zero-latency direct socket connections, or Middleware proxies (ShardingSphere/Vitess) when you have dozens of microservices. Always select a high-cardinality Shard Key to maximize Point Routing, and use distributed Snowflake/UUIDv7 IDs!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Shared-Nothing multi-node clusters, Application vs Middleware routing, Point vs Scatter-Gather, and distributed ID generation.
            </p>
          </div>

          <FAQTemplate
            title="Horizontal Sharding Foundations FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic9;
