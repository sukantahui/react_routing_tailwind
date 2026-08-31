import React, { useState } from "react";
import clsx from "clsx";

// ─── Common Framework Imports ──────────────────────────────────────────
import Teacher from "../../../../../common/TeacherSukantaHui";
import FAQTemplate from "../../../../../common/FAQTemplate";
import PlainTextPrint from "../../../../../common/PlainTextPrint";
import questions from "./topic12_files/topic12_questions";
import noteText from "./topic12_files/topic12_note.txt?raw";

/**
 * Topic12 – Production Case Studies: Designing a Multi-Tenant SaaS Sharded Database & Hybrid Partitioned-Sharded VLDB
 * Module: 004_007_partitioning-and-sharding
 *
 * @component
 * @returns {JSX.Element} Interactive Production Case Studies capstone workbench: evaluating Multi-Tenant SaaS directory routing, designing Hybrid Partitioned-Sharded VLDBs, executing parallel per-shard XtraBackups, and streaming real-time CDC analytics to columnar data warehouses in MySQL 8.0.
 */
const Topic12 = () => {
  // Interactive Case Study State
  const [selectedCaseKey, setSelectedCaseKey] = useState("case1_saas_multi_tenant");

  const caseStudies = {
    case1_saas_multi_tenant: {
      caseName: "1. Multi-Tenant SaaS Blueprint",
      title: "1. Multi-Tenant SaaS Database: Whale Tenants vs Pooled Shards",
      badge: "SaaS Topology",
      badgeColor: "emerald",
      sqlSnippet: `// 🏢 MULTI-TENANT SAAS ROUTING ARCHITECTURE:
// 1. Whale / VIP Enterprise Tenants (Dedicated 3-Node Cluster):
if (tenant.tier === 'ENTERPRISE_VIP') {
  return dedicatedVipCluster; // Isolated CPU, RAM, NVMe (Zero noisy neighbor risk!)
}

// 2. Standard Pooled Tenants (Shared 16-Shard Cluster):
const shardIndex = CRC32(tenant.uuid) % 16;
const targetShard = pooledShards[shardIndex];

// 3. ER Co-Sharded Schema: All tables share tenant_uuid!
CREATE TABLE invoices (
  invoice_id BIGINT UNSIGNED NOT NULL, -- Twitter Snowflake ID
  tenant_uuid VARCHAR(36) NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (invoice_id, tenant_uuid)
);`,
      explanation:
        "Multi-Tenant SaaS architectures isolate VIP enterprise whale tenants onto dedicated database clusters via Redis directory lookups, while distributing thousands of standard business accounts across pooled multi-tenant shards with ER co-sharding.",
      keyTakeaways: [
        "Isolates VIP enterprise whale tenants to dedicated single-tenant clusters.",
        "Distributes standard accounts across 16 pooled shards via Consistent Hashing.",
        "Co-shards all tables on tenant_uuid to ensure 100% local parent-child joins."
      ]
    },
    case2_hybrid_vldb_architecture: {
      caseName: "2. Hybrid VLDB Architecture",
      title: "2. Hybrid Partitioned-Sharded VLDB (16 Nodes + Local RANGE)",
      badge: "Hybrid VLDB Scale",
      badgeColor: "cyan",
      sqlSnippet: `-- 🌐 TIER 1: HORIZONTAL SCALE-OUT ACROSS 16 AUTONOMOUS NODES
-- Sharded by Consistent Hashing on tenant_id → Handles 80,000 writes/second!

-- ⚙️ TIER 2: LOCAL TABLE PARTITIONING INSIDE EACH SHARD NODE:
-- On each of the 16 shard nodes, the orders table is partitioned by RANGE:
CREATE TABLE orders (
  order_id BIGINT UNSIGNED NOT NULL,
  tenant_id INT NOT NULL,
  order_date DATE NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, tenant_id, order_date)
) ENGINE = InnoDB
PARTITION BY RANGE COLUMNS (order_date) (
  PARTITION p2024 VALUES LESS THAN ('2025-01-01'),
  PARTITION p2025 VALUES LESS THAN ('2026-01-01'),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- ⚡ Sub-5ms Instant Yearly Purge across all 16 shards simultaneously:
-- ALTER TABLE orders DROP PARTITION p2024;`,
      explanation:
        "The Hybrid VLDB architecture combines horizontal multi-node sharding for infinite write IOPS scale-out with localized single-server RANGE partitioning for sub-5ms sliding-window data lifecycle archival.",
      keyTakeaways: [
        "Horizontal Sharding across 16 nodes scales writes to >80k transactions/sec.",
        "Table Partitioning inside each node enables sub-5ms sliding-window drops.",
        "Achieves massive horizontal concurrency with automated localized retention."
      ]
    },
    case3_backup_pitr_runbook: {
      caseName: "3. Backup & PITR Runbook",
      title: "3. Per-Shard Parallel XtraBackup & Synchronized Global PITR",
      badge: "Enterprise DR",
      badgeColor: "purple",
      sqlSnippet: `# 📦 1. PARALLEL PER-SHARD PHYSICAL BACKUP (Percona XtraBackup):
# Executes concurrently across all 16 shard instances in under 20 minutes:
for shard in {01..16}; do
  xtrabackup --backup --host=shard$shard --target-dir=/nfs/backups/shard$shard_$(date +%F) --parallel=4 &
done
wait

# 🛡️ 2. SYNCHRONIZED POINT-IN-TIME RECOVERY (PITR):
# All shards restored to the identical synchronized Global Timestamp:
# → mysqlbinlog --stop-datetime="2026-08-25 03:00:00.000000" ...`,
      explanation:
        "Enterprise backup strategies execute non-blocking Percona XtraBackups in parallel across all shard nodes, with synchronized global timestamps or GTID coordinates ensuring consistent point-in-time recovery.",
      keyTakeaways: [
        "Runs Percona XtraBackup concurrently across all shards without write locks.",
        "Synchronized global restore timestamps guarantee cross-shard transaction parity.",
        "Reduces 10TB+ cluster backup windows from 14 hours down to under 20 minutes."
      ]
    },
    case4_observability_cdc_olap: {
      caseName: "4. Observability & CDC OLAP",
      title: "4. Global Fleet Observability & CDC Columnar Analytics Pipeline",
      badge: "Analytics & Monitoring",
      badgeColor: "rose",
      sqlSnippet: `// 📊 1. DISTRIBUTED FLEET OBSERVABILITY (Prometheus + Grafana):
// Monitors real-time QPS, active threads, replication lag, and storage variance
// across all 16 shard clusters with automated skew alerts (>15% deviation).

// 🚀 2. REAL-TIME CDC ANALYTICS PIPELINE (Debezium + ClickHouse):
// 16 Shard Nodes (OLTP) → Debezium CDC → Apache Kafka → ClickHouse OLAP
// → Multi-billion-row global reporting queries execute in 25ms in ClickHouse!
// → Zero scatter-gather queries touch the live production OLTP shards!`,
      explanation:
        "Separating OLTP transactional sharding from OLAP analytical data lakes via real-time Debezium CDC pipelines ensures that multi-billion-row business reports execute in milliseconds without saturating production database nodes.",
      keyTakeaways: [
        "Unified Prometheus & Grafana dashboard monitors QPS and skew across all shards.",
        "Real-time CDC streaming replicates shard binlogs to ClickHouse/Snowflake.",
        "Completely eliminates expensive scatter-gather reporting queries on OLTP nodes."
      ]
    }
  };

  const currentCase = caseStudies[selectedCaseKey];

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 font-sans">
      {/* ─── Header Banner ────────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto mb-10 text-center sm:text-left border-b border-slate-800 pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-3 py-1 bg-emerald-950/80 text-emerald-400 border border-emerald-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Module 004.7: Partitioning &amp; Horizontal Sharding
          </span>
          <span className="px-3 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded-full text-xs font-mono font-semibold uppercase tracking-wider">
            Topic 12 of 12 (Capstone)
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
          <span className="text-emerald-400">Production Case Studies</span>: Multi-Tenant SaaS &amp; <span className="text-cyan-400">Hybrid VLDBs</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-slate-400 max-w-4xl leading-relaxed">
          Mastering production-grade database architectures in MySQL 8.0: designing Multi-Tenant SaaS systems with Whale Tenant isolation, engineering Hybrid Partitioned-Sharded VLDBs, executing parallel XtraBackups, and streaming real-time CDC analytics.
        </p>
      </header>

      <main className="max-w-6xl mx-auto space-y-16">
        {/* ─── SECTION 1: Production Pillars ──────────────────────────── */}
        <section id="production-pillars" className="space-y-6">
          <div className="border-l-4 border-emerald-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              1. The Four Pillars of Production VLDB Architecture
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Core architectural patterns enabling multi-terabyte horizontal scale-out, sub-5ms lifecycle retention, and high availability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold uppercase">Pillar 1</span>
              <h3 className="font-bold text-white text-base">Whale Tenant Isolation</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dedicated single-tenant clusters for enterprise VIPs + pooled shards for standard accounts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold uppercase">Pillar 2</span>
              <h3 className="font-bold text-white text-base">Hybrid VLDB Architecture</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                16-Node Horizontal Sharding for write IOPS + Local RANGE Partitioning for 5ms archival.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-700/60 bg-purple-950/20 space-y-2 shadow-lg shadow-purple-950/40">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase">Pillar 3</span>
              <h3 className="font-bold text-purple-300 text-base">Parallel XtraBackup</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Concurrent non-blocking physical backups across all shards with synchronized PITR timestamps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/90 border border-rose-700/60 bg-rose-950/20 space-y-2">
              <span className="text-xs font-mono text-rose-400 font-bold uppercase">Pillar 4</span>
              <h3 className="font-bold text-rose-300 text-base">CDC OLAP Streaming</h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Debezium binlog streaming to ClickHouse/Snowflake eliminates scatter-gather OLTP load.
              </p>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: Interactive Workbench ───────────────────────── */}
        <section id="interactive-workbench" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              2. Interactive Production Architecture Workbench
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Test and observe Multi-Tenant SaaS routing, Hybrid Partitioned-Sharded VLDB blueprints, parallel XtraBackup scripts, and CDC analytics pipelines.
            </p>
          </div>

          {/* Workbench Tabs */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(caseStudies).map((caseKey) => {
              const item = caseStudies[caseKey];
              const isSelected = selectedCaseKey === caseKey;
              return (
                <button
                  key={caseKey}
                  onClick={() => setSelectedCaseKey(caseKey)}
                  className={clsx(
                    "px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition-all duration-200 border",
                    isSelected
                      ? "bg-emerald-500/10 border-emerald-500 text-emerald-400 shadow-lg shadow-emerald-950/40"
                      : "bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-900"
                  )}
                >
                  {item.caseName}
                </button>
              );
            })}
          </div>

          {/* Dynamic Display Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold uppercase tracking-wider">
                  Production Architecture Blueprint
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                  {currentCase.title}
                </h3>
              </div>
              <span
                className={clsx(
                  "px-3 py-1 rounded-full text-xs font-mono font-semibold border w-fit",
                  currentCase.badgeColor === "emerald" && "bg-emerald-950/80 text-emerald-300 border-emerald-700",
                  currentCase.badgeColor === "cyan" && "bg-cyan-950/80 text-cyan-300 border-cyan-700",
                  currentCase.badgeColor === "purple" && "bg-purple-950/80 text-purple-300 border-purple-700",
                  currentCase.badgeColor === "rose" && "bg-rose-950/80 text-rose-300 border-rose-700"
                )}
              >
                {currentCase.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {currentCase.explanation}
            </p>

            {/* SQL / Script Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architecture Blueprint &amp; Runbook Commands:
              </span>
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-300 overflow-x-auto leading-relaxed">
                {currentCase.sqlSnippet}
              </pre>
            </div>

            {/* Key Takeaways */}
            <div className="space-y-2 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-mono text-slate-400 font-semibold">
                Architectural Takeaways:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
                {currentCase.keyTakeaways.map((item, i) => (
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
              Production case studies in Barrackpore and Kolkata demonstrating Multi-Tenant SaaS co-sharding and Hybrid Partitioned-Sharded banking ledgers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Case 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  Case 1: Mamata &amp; Susmita – Multi-Tenant Retail SaaS in Barrackpore
                </h3>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                  1,200 Retail Stores
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Barrackpore, retail POS SaaS tracked 1,200 retail stores across ₹1.2 Crores in sales. Susmita co-sharded all tables on <code>store_uuid</code> across 8 MySQL nodes, while replicating tax codes and barcodes as Global Tables on all nodes. High-volume enterprise flagship stores were routed to dedicated 3-node InnoDB clusters via Redis directory lookups, achieving sub-4ms cashier checkout speeds.
              </p>
            </div>

            {/* Case 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                  Case 2: Abhronila &amp; Debangshu – Hybrid VLDB in Kolkata Bank
                </h3>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-800">
                  2 Billion Records (₹500 Cr)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                In Kolkata, managing core banking ledgers across ₹500 Crores in volume, Debangshu implemented the Hybrid Partitioned-Sharded VLDB architecture. Horizontal sharding across 16 MySQL nodes scaled writes to 80,000 writes/sec, while localized <code>RANGE (txn_date)</code> table partitioning on each node allowed the bank to drop 3-year-old ledgers in under 5 milliseconds with zero table locking.
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
              Avoid running analytical aggregations directly against live OLTP shards and mutating shard keys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 1: Running OLAP on Live Shards
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Executing heavy cross-shard reporting queries forces scatter-gather scans across all 16 shards, stalling live cashier transactions.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Stream shard binlogs via CDC to ClickHouse / Snowflake for OLAP.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-rose-400 mb-3 flex items-center gap-2">
                <span>⚠️</span> Pitfall 2: Mutating Shard Keys
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Updating a row&apos;s Shard Key requires moving data across physical server nodes over the network, risking partial data loss and corruption.
              </p>
              <div className="text-xs font-mono text-emerald-400 p-2 bg-slate-950 rounded border border-slate-800">
                Rule: Enforce that Shard Keys remain strictly immutable across all tables.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 1: Deploy 3-Node HA per Shard
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Back every logical shard node with a 3-node MySQL InnoDB Cluster running Group Replication to guarantee automated sub-3s failover.
              </p>
              <div className="text-xs text-slate-400">
                Guarantees zero data loss (RPO=0) during server hardware crashes.
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800">
              <h3 className="text-base font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <span>✓</span> Best Practice 2: Standardize on Snowflake IDs
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
                Use 64-bit Twitter Snowflake integers for primary keys to eliminate cross-shard collisions and maintain dense B-Tree index storage.
              </p>
              <div className="text-xs text-slate-400">
                Eliminates random UUID B-Tree page split fragmentation.
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
            title="Topic 12: Production Case Studies: Designing a Multi-Tenant SaaS Sharded Database & Hybrid Partitioned-Sharded VLDB"
            content={noteText}
          />

          <Teacher
            note="Congratulations on mastering Module 004.7 on Table Partitioning & Horizontal Sharding! In production enterprise engineering, the ultimate architecture is the Hybrid Partitioned-Sharded VLDB: use Horizontal Sharding across 16+ nodes to achieve massive write concurrency, and use Table Partitioning inside each node for sub-5ms sliding-window archival. Isolate VIP whale tenants to dedicated clusters, co-shard parent-child entities on your shard key, generate 64-bit Snowflake IDs, and stream real-time CDC binlogs to ClickHouse for lightning-fast analytics!"
          />
        </section>

        {/* ─── SECTION 6: FAQ Accordion ───────────────────────────────── */}
        <section id="faq-section" className="space-y-6">
          <div className="border-l-4 border-cyan-500 pl-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              6. Frequently Asked Questions (30 Deep-Dive Questions)
            </h2>
            <p className="text-slate-400 mt-1 text-sm sm:text-base">
              Master the technical nuances of Multi-Tenant SaaS sharding, Hybrid Partitioned-Sharded VLDBs, parallel XtraBackup scripts, and CDC analytics pipelines.
            </p>
          </div>

          <FAQTemplate
            title="Production Case Studies &amp; Hybrid VLDB FAQs"
            questions={questions}
          />
        </section>
      </main>
    </div>
  );
};

export default Topic12;
