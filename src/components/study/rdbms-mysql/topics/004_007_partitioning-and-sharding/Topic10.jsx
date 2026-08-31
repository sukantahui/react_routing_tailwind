import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic10_files/topic10_questions";
import noteText from "./topic10_files/topic10_note.txt?raw";

/**
 * Topic10 – Sharding Algorithms: Hash-Based, Range-Based, List-Based, and Consistent Hashing
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Sharding Algorithms workbench: evaluating Modulo Hash vs Consistent Hash Rings, exploring Virtual Node (VNode) balance math, analyzing Range-Based write hot spots vs List/Directory routing, and executing zero-downtime CDC resharding pipelines.
 */
const Topic10 = () => {
  // Interactive Sharding Algorithm State
  const [selectedAlgoKey, setSelectedAlgoKey] = useState("algo1_modulo_vs_consistent");

  const shardingAlgorithms = {
    algo1_modulo_vs_consistent: {
      algoName: "1. Modulo vs Consistent Hashing",
      title: "1. Modulo Hash (100% Migration) vs Consistent Hash Ring (1/N Migration)",
      badge: "Algorithm Math",
      badgeColor: "emerald",
      sqlSnippet: `// 💥 1. MODULO HASHING (High Data Churn on Cluster Expansion):
// Formula: Node ID = hash(key) % N
// Expanding from N=4 to N=5 changes the divisor for ~100% of all keys!
// Over 80% of cluster data must be moved between servers!

// ⚡ 2. CONSISTENT HASHING (Circular Hash Ring [0, 2^32-1]):
// Key is hashed to position on 32-bit integer ring.
// Assigned to first clockwise server node!
// Adding Node 5 ONLY acquires keys from its immediate neighbor!
// Only 1/N of cluster data moves! Remaining N-1 nodes untouched!`,
      explanation:
        "Modulo hashing forces nearly all data to move when server node counts change. Consistent hashing maps keys and servers onto a circular ring, ensuring that adding a server node only migrates 1/N of existing data from neighboring nodes.",
      keyTakeaways: [
        "Modulo hashing causes ~100% data reorganization during cluster expansion.",
        "Consistent hashing restricts data movement to only 1/N of total keys.",
        "Leaves remaining N-1 server nodes completely untouched during scaling."
      ]
    },
    algo2_virtual_nodes: {
      algoName: "2. Virtual Nodes (VNodes)",
      title: "2. Virtual Nodes (VNodes): Eliminating Hot-Spot Skew on Hash Rings",
      badge: "Ring Balancing",
      badgeColor: "cyan",
      sqlSnippet: `// 🎯 THE VIRTUAL NODE BALANCING MECHANISM:
// Physical Server Node A is mapped to 256 virtual ring positions:
// → NodeA#v1, NodeA#v2, NodeA#v3, ... NodeA#v256
// Physical Server Node B is mapped to 256 virtual ring positions:
// → NodeB#v1, NodeB#v2, NodeB#v3, ... NodeB#v256

// 📊 RESULT:
// Storage variance across physical nodes drops from >35% down to <2%!
// Workload is distributed perfectly uniformly across all physical server drives!`,
      explanation:
        "Virtual Nodes map each physical server to 128–512 points scattered across the hash ring. This eliminates non-uniform data clustering and ensures that all physical servers receive an equal share of data and traffic.",
      keyTakeaways: [
        "Maps 128 to 512 virtual positions per physical server node.",
        "Reduces storage variance between servers to under 2-3%.",
        "Enables weighted capacity allocation for heterogeneous server hardware."
      ]
    },
    algo3_range_vs_list_directory: {
      algoName: "3. Range vs List / Directory",
      title: "3. Range-Based Write Hot Spots vs List/Directory Data Residency",
      badge: "Routing Patterns",
      badgeColor: "purple",
      sqlSnippet: `-- ⚠️ 1. THE RANGE SHARDING "WRITE HOT SPOT" TRAP:
-- Range mapping: Shard 0 (IDs 1-10M), Shard 1 (IDs 10M-20M), Shard 2 (IDs 20M-30M)
-- Problem: ALL new append-only inserts hit ONLY Shard 2 (100% CPU Saturation)!
-- Shard 0 and Shard 1 sit idle while Shard 2 crashes!

-- 🌐 2. LIST & DIRECTORY SHARDING (Data Residency & VIP Tenants):
-- List: Bengal on Shard 0, Delhi on Shard 1 (Satisfies RBI / GDPR Residency).
-- Directory (Redis): tenant_reliance → Shard_03 (Isolates VIP enterprise tenants).`,
      explanation:
        "Range-based sharding creates severe write hot spots on append-only primary keys. List and Directory sharding provide explicit routing for data residency compliance and VIP tenant isolation.",
      keyTakeaways: [
        "Range sharding concentrates all new inserts onto the newest active shard.",
        "List sharding enforces strict legal data residency boundaries per country/region.",
        "Directory sharding (Redis lookup) isolates high-volume VIP enterprise tenants."
      ]
    },
    algo4_cdc_resharding_pipeline: {
      algoName: "4. Zero-Downtime Resharding",
      title: "4. Zero-Downtime Double-Write & CDC Catch-Up Migration",
      badge: "Zero-Downtime Cutover",
      badgeColor: "rose",
      sqlSnippet: `// 🚀 5-STEP ZERO-DOWNTIME RESHARDING WORKFLOW:
// Step 1: Provision new MySQL shard nodes (Shard 4, 5, 6, 7).
// Step 2: Bulk copy baseline snapshot from old shards to new shards.
// Step 3: Establish CDC binlog stream (Debezium/Vitess) to replicate real-time deltas.
// Step 4: Run checksum verification (pt-table-checksum) to verify 100% data parity.
// Step 5: Atomically update router configuration (etcd/ZooKeeper) to cut over traffic!`,
      explanation:
        "Zero-downtime resharding combines baseline snapshot copying with real-time CDC binlog replication catch-up, checksum validation, and atomic router cutover to resize clusters without downtime.",
      keyTakeaways: [
        "Uses CDC binlog streaming to replicate real-time delta modifications.",
        "pt-table-checksum mathematically proves zero data loss before cutover.",
        "Atomically updates router configuration in etcd/ZooKeeper with zero downtime."
      ]
    }
  };

  const currentAlgo = shardingAlgorithms[selectedAlgoKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 10 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Sharding Algorithms</span>: Hash, Range, List &amp; <span className="text-cyan-400">Consistent Hashing</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering distributed routing algorithms in MySQL 8.0: understanding Modulo vs Consistent Hash Rings, balancing keys via Virtual Nodes (VNodes), avoiding Range-Based write hot spots, and executing zero-downtime CDC resharding pipelines.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Algorithm Pillars ───────────────────────────── */}
        <section id="algorithm-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Sharding Algorithms
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core routing strategies governing key-to-node placement, cluster scalability, and data migration overhead.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Consistent Hashing</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Circular hash ring reduces data migration churn to only $1/N$ during node addition/removal.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Virtual Nodes</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Assigns 128–512 virtual points per physical server to eliminate data clustering skew.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Data Residency</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                List/Directory sharding enforces physical storage boundaries per geopolitical territory.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">CDC Resharding</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Real-time binlog replication catch-up and checksum validation enable zero-downtime cutover.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Sharding Algorithms Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Modulo vs Consistent Hash Ring calculations, Virtual Node balancing, Range-based hot spot traps, and CDC resharding pipelines.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(shardingAlgorithms).map((algoKey) => {
              const algo = shardingAlgorithms[algoKey];
              const isSelected = selectedAlgoKey === algoKey;
              return (
                <button
                  key={algoKey}
                  onClick={() => setSelectedAlgoKey(algoKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {algo.algoName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Sharding Routing Algorithm
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentAlgo.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentAlgo.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentAlgo.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentAlgo.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentAlgo.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentAlgo.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentAlgo.explanation}
            </p>

            {/* SQL / Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Algorithm Implementation &amp; Routing Logic:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentAlgo.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentAlgo.keyTakeaways.map((item, i) => (
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
              Sharding algorithm case studies in Barrackpore and Kolkata demonstrating zero-downtime hash ring scaling and avoiding write hot spots on bank ledgers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Consistent Hashing in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  1/6th Migration
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail customer accounts scaled across ₹1.2 Crores in sales transactions. When expanding from 4 to 6 server nodes, Modulo Sharding would have forced 75% of accounts to migrate between servers. Susmita deployed Consistent Hashing with 256 Virtual Nodes per server; adding the 2 new nodes moved only 16.6% ($1/6$) of records online with zero cashier downtime.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Avoiding Hot Spots in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  MurmurHash3 (32 Nodes)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking across ₹500 Crores in volume, Range Sharding on transaction IDs previously caused 100% of active writes to saturate the newest shard node while older shards sat idle. Debangshu converted the cluster to Consistent Hashing using <code>MurmurHash3(account_uuid)</code> across 32 nodes; write traffic was evenly distributed with less than 1.5% variance across all server drives.
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
              Avoid using append-only range sharding for high-write tables and omitting virtual nodes on hash rings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Range Sharding on Sequential IDs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Mapping sequential auto-increment IDs to ranges causes 100% of incoming writes to hit only the newest shard, creating severe write hot spots.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use Consistent Hashing on UUIDs or Account IDs to spread writes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Hash Rings Without Virtual Nodes
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Consistent hashing without virtual nodes causes non-uniform clustering on the ring, leading to 30%+ storage imbalance across server nodes.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Always configure 128 to 512 Virtual Nodes (VNodes) per physical server.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Use CDC for Live Resharding
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use Change Data Capture (CDC) binlog replication catch-up to migrate data to new shards online with zero application downtime.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero downtime and seamless traffic cutover.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Global Secondary Index Caching
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Maintain a Redis GSI cache (e.g. <code>email {"->"} account_uuid</code>) to convert non-shard-key lookups into deterministic point queries.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates expensive cross-shard scatter-gather broadcast scans.
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
            title="Topic 10: Sharding Algorithms: Hash-Based, Range-Based, List-Based, and Consistent Hashing"
            content={noteText}
          />

          <Teacher
            note="Your choice of Sharding Algorithm determines whether your database scales effortlessly or collapses during cluster resizing! Never use naive Modulo Sharding on dynamic clusters because adding a server forces almost 100% of all data to move. Always standardize on Consistent Hashing with 128 to 512 Virtual Nodes (VNodes) per server so adding a node only moves 1/N data. Avoid Range Sharding on sequential IDs to prevent write hot spots, and use CDC binlog replication for zero-downtime resharding migrations!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Modulo vs Consistent Hashing, Virtual Node math, Range write hot spots, List data residency, and zero-downtime CDC resharding.
            </p>
          </div>

          <FAQTemplate
            title="Sharding Algorithms &amp; Consistent Hashing FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic10;
