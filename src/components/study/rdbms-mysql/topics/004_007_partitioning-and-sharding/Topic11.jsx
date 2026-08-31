import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic11_files/topic11_questions";
import noteText from "./topic11_files/topic11_note.txt?raw";

/**
 * Topic11 – Sharding Challenges: Distributed Transactions, Joins & Global IDs
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Sharding Challenges workbench: evaluating Distributed 2PC vs Saga patterns, deconstructing 64-bit Twitter Snowflake ID structures, resolving Cross-Shard Joins via ER co-sharding, and implementing Redis Global Secondary Index (GSI) caches in MySQL 8.0.
 */
const Topic11 = () => {
  // Interactive Challenge State
  const [selectedChallengeKey, setSelectedChallengeKey] = useState("challenge1_2pc_vs_saga");

  const challengeConfigurations = {
    challenge1_2pc_vs_saga: {
      configName: "1. 2PC vs Saga Pattern",
      title: "1. Distributed 2PC (XA) vs The Saga Pattern & Transactional Outbox",
      badge: "Distributed Transactions",
      badgeColor: "emerald",
      sqlSnippet: `// 💥 1. DISTRIBUTED 2PC (XA) - Slow & Blocking:
// Prepare Phase: Flushes logs and holds row locks across network hops!
// Coordinator Failure: Shards remain BLOCKED indefinitely! (~200 txns/sec limit)

// ⚡ 2. THE SAGA PATTERN + TRANSACTIONAL OUTBOX (High-Throughput >50k txns/sec):
// Step 1: Execute Local ACID Transaction on Shard 0 + Insert Outbox Event:
START TRANSACTION;
UPDATE wallet SET balance = balance - 5000 WHERE user_id = 101;
INSERT INTO outbox_events (event_type, payload) VALUES ('WALLET_DEDUCTED', '{"user_id":101,"amt":5000}');
COMMIT; // Local commit completes in 1ms!

// Step 2: Debezium CDC tails binlog → Streams to Kafka → Executes Deposit on Shard 1!
// If Shard 1 fails: Saga triggers Compensating Refund Transaction on Shard 0!`,
      explanation:
        "Distributed 2PC holds synchronous row locks across network round-trips, severely throttling throughput. The Saga pattern uses local ACID transactions coupled with Compensating Transactions and the Transactional Outbox pattern to achieve eventual consistency at scale.",
      keyTakeaways: [
        "Distributed 2PC holds row locks across network hops, throttling write throughput.",
        "Sagas break workflows into local transactions with Compensating rollbacks.",
        "Transactional Outbox + Debezium CDC guarantees reliable event publishing."
      ]
    },
    challenge2_snowflake_id_structure: {
      configName: "2. Snowflake 64-Bit IDs",
      title: "2. Twitter Snowflake 64-Bit ID Deconstruction & Sortability",
      badge: "Global Primary Keys",
      badgeColor: "cyan",
      sqlSnippet: `// 🧮 TWITTER SNOWFLAKE 64-BIT BINARY LAYOUT:
// +-------+-----------------------------+--------------+------------------+
// | 1 bit | 41 bits (Epoch Milliseconds)| 10 bits Node | 12 bits Sequence |
// +-------+-----------------------------+--------------+------------------+
// 1. Sign Bit (1 bit): Always 0 (Ensures positive BIGINT UNSIGNED integer).
// 2. Timestamp (41 bits): 69 years of millisecond precision from custom epoch.
// 3. Worker Node ID (10 bits): Supports up to 1,024 independent server instances.
// 4. Sequence Number (12 bits): Generates up to 4,096 unique IDs per ms per node!

// 📊 Why it matters in MySQL InnoDB:
// Chronologically sortable → Append-only B-Tree inserts! Zero page splits!`,
      explanation:
        "Random UUIDv4 causes 50%+ B-Tree page split fragmentation. Twitter Snowflake generates 64-bit chronologically sortable integers that fit into BIGINT UNSIGNED, maintaining dense clustered B-Tree index pages.",
      keyTakeaways: [
        "Generates globally unique 64-bit sortable integers without central locks.",
        "Chronological sorting enables append-only B-Tree inserts with zero fragmentation.",
        "Supports 1,024 server nodes generating over 4 million IDs per second per node."
      ]
    },
    challenge3_cross_shard_joins: {
      configName: "3. Cross-Shard Joins",
      title: "3. Eliminating Cross-Shard Joins via ER Co-Sharding & Global Tables",
      badge: "Join Elimination",
      badgeColor: "purple",
      sqlSnippet: `-- 🔗 1. ER TABLE GROUP CO-SHARDING (Co-Locates Related Entities):
-- Customers, Orders, and Items all share the SAME Shard Key (customer_id):
CREATE TABLE orders (order_id BIGINT, customer_id INT, PRIMARY KEY(order_id, customer_id));
CREATE TABLE order_items (item_id BIGINT, customer_id INT, PRIMARY KEY(item_id, customer_id));
-- → All orders & items for Customer 101 reside on the SAME shard node!
-- → 100% of parent-child joins execute locally at sub-millisecond speeds!

-- 🌐 2. GLOBAL BROADCAST TABLES:
-- Replicates reference data (currencies, tax_rates) on 100% of shard nodes!`,
      explanation:
        "SQL joins cannot cross physical server boundaries. ER Table Groups co-locate parent-child entities onto the same physical node using a common shard key, while Global Tables replicate reference lookup data across all nodes.",
      keyTakeaways: [
        "ER Co-Sharding co-locates related parent-child tables using a shared shard key.",
        "Global broadcast tables replicate reference datasets across all shard nodes.",
        "Eliminates 95%+ of cross-shard network join penalties by design."
      ]
    },
    challenge4_gsi_lookup_cache: {
      configName: "4. Global Secondary Index",
      title: "4. Global Secondary Index (GSI) Caching with Redis",
      badge: "Non-Shard Lookups",
      badgeColor: "rose",
      sqlSnippet: `// ⚠️ THE NON-SHARD-KEY LOOKUP PROBLEM:
// Querying by email (WHERE email = 'mamata@bengal.in') forces a broadcast to ALL shards!

// ✅ THE REDIS GSI LOOKUP SOLUTION:
// Step 1: Query high-speed Redis GSI cache (email → customer_id):
const customerId = await redis.get(\`email_idx:\${userEmail}\`); // Returns 105 in 0.4ms!

// Step 2: Compute shard location and execute a Point Query directly to that 1 node:
const targetShard = getShardConnection(customerId);
const profile = await targetShard.query("SELECT * FROM users WHERE customer_id = ?", [customerId]);
// → Converts expensive scatter-gather broadcast into deterministic 1-node point lookup!`,
      explanation:
        "Filtering on non-shard keys normally forces expensive scatter-gather scans across all nodes. Maintaining a Redis Global Secondary Index (GSI) converts secondary lookups into deterministic single-shard point queries.",
      keyTakeaways: [
        "Redis GSI caches map secondary columns (email/phone) to the primary Shard Key.",
        "Resolves secondary lookups in sub-millisecond memory time.",
        "Prevents cluster-wide scatter-gather CPU saturation."
      ]
    }
  };

  const currentChallenge = challengeConfigurations[selectedChallengeKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 11 of 12
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Sharding Challenges</span>: Distributed Sagas, Joins &amp; <span className="text-cyan-400">Global IDs</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Overcoming distributed system hurdles in MySQL 8.0: replacing blocking 2PC with Sagas and Transactional Outboxes, generating 64-bit Twitter Snowflake keys, eliminating cross-shard joins via ER co-sharding, and implementing Redis GSI caches.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Challenge Pillars ───────────────────────────── */}
        <section id="challenge-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Sharding Solutions
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core architectural patterns overcoming distributed transaction bottlenecks, cross-node joins, and primary key collisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Saga &amp; Outbox</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Local ACID transactions + CDC event streaming replace slow blocking 2PC locks.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Twitter Snowflake</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                64-bit chronologically sortable integers eliminate B-Tree page split fragmentation.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">ER Co-Sharding</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Co-locates parent-child entities on the same physical shard to eliminate cross-node joins.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">Redis GSI Cache</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Maps secondary search fields to the primary shard key in memory to prevent broadcast scans.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Sharding Challenges Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe 2PC vs Saga workflows, Twitter Snowflake bit structures, ER Table Group co-sharding, and Redis Global Secondary Index caching.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(challengeConfigurations).map((configKey) => {
              const config = challengeConfigurations[configKey];
              const isSelected = selectedChallengeKey === configKey;
              return (
                <button
                  key={configKey}
                  onClick={() => setSelectedChallengeKey(configKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {config.configName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Distributed System Solution
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentChallenge.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentChallenge.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentChallenge.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentChallenge.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentChallenge.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentChallenge.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentChallenge.explanation}
            </p>

            {/* SQL / Code Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architecture Pattern &amp; Code Runbook:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentChallenge.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentChallenge.keyTakeaways.map((item, i) => (
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
              Sharding challenge case studies in Barrackpore and Kolkata demonstrating Transactional Outbox wallet synchronization and Snowflake ID index optimization.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Transactional Outbox in Barrackpore Retail
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  Transactional Outbox
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail customer wallet transfers processed ₹1.2 Crores in sales. 2PC previously blocked cashier checkouts during network latency between store servers. Susmita replaced 2PC with the Transactional Outbox pattern: wallet deductions and outbox events committed locally in 1ms on Shard 0, and a Debezium CDC pipeline streamed the credit to Shard 1 with automated idempotent retries.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Snowflake IDs in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  Snowflake (64-Bit)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing digital ledgers across ₹500 Crores in volume, random UUIDv4 primary keys caused 50%+ B-Tree page split fragmentation and saturated server SSD write queues. Debangshu standardized on 64-bit Twitter Snowflake IDs; chronological millisecond ordering converted inserts into sequential append-only operations, keeping B-Tree index pages 99% full and speeding up writes by 6x.
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
              Avoid synchronous 2PC in high-write systems and random UUIDv4 strings for primary keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Relying on Distributed 2PC (XA)
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                2PC holds row locks across multiple network round-trips, causing lock queue cascades and throttling throughput to ~200 txns/sec.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Use Sagas with Compensating Transactions and Transactional Outboxes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Random UUIDv4 Primary Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Random UUIDv4 strings shatter B-Tree index locality, causing constant page splits, index bloat, and severe buffer pool churn.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Standardize on Twitter Snowflake (64-bit) or UUIDv7 (128-bit sortable).
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: ER Table Group Co-Sharding
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Force parent and child tables (e.g. customers and orders) to share the same Shard Key so that all joins execute locally on a single server node.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates 90%+ of cross-shard network join penalties.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Global Tables for Lookups
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Replicate reference and dictionary lookup tables across all shard nodes to enable local joins without distributed network hops.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees fast, local reference joins on every shard.
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
            title="Topic 11: Sharding Challenges: Distributed Transactions (2PC, Saga), Cross-Shard Joins, and Global Unique IDs"
            content={noteText}
          />

          <Teacher
            note="Solving the big three challenges of horizontal sharding is what separates junior developers from senior database architects! Never rely on slow, blocking 2PC across network nodes; use asynchronous Sagas with Compensating Transactions and the Transactional Outbox pattern with Debezium CDC. Never use random UUIDv4 for primary keys; standardize on 64-bit Twitter Snowflake or UUIDv7 for sequential B-Tree performance. Co-locate parent-child entities using ER Table Groups to eliminate cross-shard joins!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Distributed 2PC vs Sagas, Transactional Outbox CDC, Twitter Snowflake IDs, ER Co-Sharding, and Redis GSI lookups.
            </p>
          </div>

          <FAQTemplate
            title="Sharding Challenges &amp; Distributed Patterns FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic11;
