// topic12_files/topic12_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 12: Production Case Studies: Designing a Multi-Tenant SaaS Sharded Database & Hybrid Partitioned-Sharded VLDB

const questions = [
  {
    question: "What is a 'Hybrid Partitioned-Sharded Architecture' in enterprise database engineering?",
    shortAnswer: "An advanced architecture that combines **Horizontal Sharding across multiple autonomous MySQL server nodes** (for compute, memory, and write IOPS scale-out) with **Table Partitioning inside each individual shard node** (for localized sub-5ms data lifecycle archival, index compactness, and fast range scans).",
    explanation: "The architectural gold standard for multi-terabyte Very Large Database (VLDB) systems.",
    hint: "Combines horizontal multi-node sharding with local table partitioning inside each node.",
    level: "basic",
    codeExample: `// Sharding Tier: 16 MySQL Nodes (Sharded by tenant_id)
// Local Partitioning Tier: orders table on each node PARTITION BY RANGE (YEAR(order_date))`
  },
  {
    question: "In a Multi-Tenant SaaS platform, what is the 'Whale Tenant' problem and how is it solved using Hybrid Directory Sharding?",
    shortAnswer: "A 'Whale Tenant' is a massive enterprise customer whose traffic and data volume (e.g. 50M rows/day) would overwhelm a shared multi-tenant shard; **Hybrid Directory Sharding** uses a Redis lookup directory to route that VIP tenant to its own **Dedicated Single-Tenant Shard Cluster**, while routing thousands of smaller tenants to **Pooled Multi-Tenant Shards**.",
    explanation: "Prevents noisy neighbor performance degradation for standard customers.",
    hint: "Whale tenants are routed to dedicated single-tenant shard clusters via Redis directory lookups.",
    level: "intermediate",
    codeExample: `if (tenant.tier === 'ENTERPRISE_VIP') {
  return dedicatedVipCluster; // Dedicated 3-node InnoDB Cluster
} else {
  return pooledShardNodes[CRC32(tenant.id) % 16];
}`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail POS SaaS, 1,200 retail stores scaled across ₹1.2 Crores in daily sales volume. How did Susmita design the multi-tenant database topology?",
    shortAnswer: "Susmita co-sharded all tables (`stores`, `cashiers`, `orders`, `order_items`) on **`store_uuid`** across 8 MySQL server instances; all joins for a store executed locally on that store's assigned node, while reference tables (`tax_rates`, `barcodes`) were replicated as Global Tables across all 8 nodes, achieving sub-4ms checkout times.",
    explanation: "Co-sharding on store_uuid eliminated 100% of cross-shard joins for cashier POS terminals.",
    hint: "Co-sharded on store_uuid across 8 nodes; replicated tax and barcode reference data as Global Tables.",
    level: "moderate",
    codeExample: `# Barrackpore SaaS Co-Sharding Schema:
CREATE TABLE pos_orders (
  order_id BIGINT UNSIGNED NOT NULL,
  store_uuid VARCHAR(36) NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, store_uuid)
);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, core ledgers managed 2,000,000,000 records across ₹500 Crores in volume. Why did Debangshu implement the Hybrid Partitioned-Sharded VLDB architecture?",
    shortAnswer: "Horizontal Sharding across 16 MySQL nodes scaled the bank's write throughput to **80,000 writes/second**, while Table Partitioning by `RANGE (order_date)` inside each node allowed the bank to purge 3-year-old historical ledgers in **under 5 milliseconds via `ALTER TABLE ... DROP PARTITION` on all 16 shards simultaneously** with zero lock contention.",
    explanation: "Achieved massive horizontal write concurrency coupled with instantaneous sliding-window archival.",
    hint: "16 sharded nodes scaled writes to 80k/s; local RANGE partitioning enabled 5ms drops of old years.",
    level: "expert",
    codeExample: `-- On each of the 16 Shard Nodes:
PARTITION BY RANGE COLUMNS (txn_date) (
  PARTITION p2024 VALUES LESS THAN ('2025-01-01'),
  PARTITION p2025 VALUES LESS THAN ('2026-01-01'),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How do you execute physical backups across a 16-node sharded MySQL cluster?",
    shortAnswer: "By running **Percona XtraBackup in parallel across all 16 shard nodes** simultaneously during off-peak hours; each node generates a non-blocking physical binary backup (`.ibd` files + redo logs) stored in dedicated S3/NFS backup vaults.",
    explanation: "Enables fast parallel backup completion without table locks or transaction delays.",
    hint: "Run Percona XtraBackup concurrently across all shard instances.",
    level: "intermediate",
    codeExample: `xtrabackup --backup --target-dir=/backups/shard01_$(date +%F) --parallel=4`
  },
  {
    question: "What is the 'Global Point-in-Time Recovery (PITR)' challenge in a sharded cluster and how is it solved?",
    shortAnswer: "Restoring individual shards to slightly different timestamps creates cross-shard data corruption (e.g. money deducted on Shard 0 but not yet deposited on Shard 1); solved by taking **synchronized distributed snapshots or using a Global Transaction Timestamp Coordinator** that aligns GTID positions across all shards to the exact same global microsecond.",
    explanation: "Ensures that all restored shards reflect the identical global point in time.",
    hint: "Aligns GTID restore targets across all shards to the exact same global timestamp.",
    level: "expert",
    codeExample: `-- Consistent PITR: All shards restored to exact timestamp '2026-08-25 03:00:00.000000'`
  },
  {
    question: "How does an engineering team monitor cluster health and data skew across 32 MySQL shards?",
    shortAnswer: "Using **Percona Monitoring and Management (PMM)** or **Prometheus + Grafana with mysqld_exporter**; dashboards visualize real-time QPS, active threads, disk I/O, replication lag, and `information_schema.TABLES` data size across all 32 shard nodes simultaneously.",
    explanation: "Provides unified single-pane-of-glass observability across the entire sharded fleet.",
    hint: "Prometheus + Grafana or Percona PMM aggregating metrics from mysqld_exporter on all nodes.",
    level: "basic",
    codeExample: `// Grafana Alert: Trigger if any single shard storage deviates >15% from cluster average.`
  },
  {
    question: "What is 'Vitess Multi-Cell' deployment for Cross-Region Disaster Recovery?",
    shortAnswer: "Deploying Vitess `VTTablet` and MySQL clusters across multiple geographic regions (e.g. Primary Cell in Kolkata DC, Replica Cell in Mumbai DC); reads are served locally from the nearest cell, and asynchronous replication keeps the secondary cell ready for automated regional failover.",
    explanation: "Provides active-active regional read scalability with high-speed disaster recovery.",
    hint: "Deploys Vitess VTTablets across multiple data centers with automated cross-cell failover.",
    level: "expert",
    codeExample: `// Cell 1: kolkata-dc (Primary Shards) <--- Async Group Replication ---> Cell 2: mumbai-dc (Replica Shards)`
  },
  {
    question: "How should an enterprise migrate a monolithic 5TB unpartitioned MySQL table into a Hybrid Sharded cluster with zero downtime?",
    shortAnswer: "1. Provision the 16-node sharded cluster; 2. Bulk copy historical data using `mysqldump` / XtraBackup; 3. Enable real-time CDC binlog replication (Debezium / Vitess vreplication) to catch up delta changes; 4. Validate data parity via `pt-table-checksum`; 5. Switch application router pointers to the sharded cluster; 6. Decommission the monolith.",
    explanation: "The standard enterprise cutover migration playbook.",
    hint: "Bulk copy -> Stream binlogs via CDC -> Checksum verification -> Atomic traffic cutover.",
    level: "expert",
    codeExample: `// Monolith (5TB) -> Debezium CDC Streaming -> 16 Shard Cluster -> Cutover`
  },
  {
    question: "What is the recommended High Availability configuration for EACH individual shard in a production cluster?",
    shortAnswer: "A **3-Node MySQL InnoDB Cluster** (1 Primary + 2 Secondary Replicas running MySQL Group Replication + MySQL Router); if the Primary node on Shard 4 fails, Group Replication promotes a secondary replica in under 3 seconds automatically with zero data loss.",
    explanation: "Guarantees that individual shard hardware failures never cause data loss or cluster downtime.",
    hint: "A 3-node MySQL InnoDB Cluster per shard with Group Replication and MySQL Router.",
    level: "basic",
    codeExample: `Shard 0: [Primary 0A, Replica 0B, Replica 0C]
Shard 1: [Primary 1A, Replica 1B, Replica 1C]`
  },
  {
    question: "Why should analytical reporting queries (OLAP) NEVER run directly against the live sharded OLTP database fleet?",
    shortAnswer: "Because heavy analytical queries trigger scatter-gather scans across all 16+ shards, saturating CPU, disk I/O, and proxy memory across the entire cluster, degrading transactional checkout latency for live online users.",
    explanation: "Separation of OLTP transactions and OLAP analytics is a mandatory architectural rule.",
    hint: "Scatter-gather analytics saturate all shards; stream data to an OLAP data lake instead.",
    level: "basic",
    codeExample: `-- Stream shard binlogs to ClickHouse / Snowflake for 20ms analytical aggregations.`
  },
  {
    question: "How do you handle schema changes (`ALTER TABLE`) across all 16 shards in a production environment?",
    shortAnswer: "Using **Gh-ost** or **pt-online-schema-change** orchestrated by a CI/CD deployment pipeline; the pipeline applies the schema migration to Shard 0 first (Canary validation), verifies replication lag and error logs, and then rolls out the DDL across remaining shards in parallel batches.",
    explanation: "Ensures zero-downtime, non-blocking schema evolution with automated canary rollbacks.",
    hint: "Automated canary rollout using gh-ost or pt-online-schema-change across shard batches.",
    level: "intermediate",
    codeExample: `gh-ost --host=shard01 --database=saas_db --table=orders --alter="ADD COLUMN notes TEXT"`
  },
  {
    question: "What is the 'Noisy Neighbor' problem in multi-tenant sharding and how do dynamic resource limits solve it?",
    shortAnswer: "When one standard tenant on a shared multi-tenant shard runs abusive bulk queries, consuming all CPU/IOPS on that shard and degrading service for other co-located tenants; solved by configuring **MySQL Resource Groups** or proxy-level rate limiting to cap per-tenant concurrency.",
    explanation: "Isolates CPU and thread consumption per tenant.",
    hint: "When one tenant monopolizes shard resources; solved by MySQL Resource Groups and proxy rate limits.",
    level: "intermediate",
    codeExample: `CREATE RESOURCE GROUP rg_standard_tenants TYPE = USER VCPU = 2-4;`
  },
  {
    question: "What happens when a tenant upgrades from Standard Tier to Enterprise VIP Tier in a SaaS sharded system?",
    shortAnswer: "The system triggers an automated **Tenant Migration Workflow**: 1. Copies the tenant's data from the shared multi-tenant shard to the dedicated VIP cluster; 2. Tails the source shard binlog to sync delta changes; 3. Updates the Redis Directory Shard Pointer (`tenant_uuid -> dedicated_vip_cluster`) in under 1ms.",
    explanation: "Provides seamless live upgrades for high-growth enterprise customers.",
    hint: "Copies data to dedicated cluster, catches up delta changes via binlog, updates Redis directory pointer.",
    level: "expert",
    codeExample: `await redis.set(\`shard_map:\${tenantUuid}\`, "vip-cluster-01.internal");`
  },
  {
    question: "What is the role of Global Tables in reducing network traffic in a multi-tenant SaaS cluster?",
    shortAnswer: "By replicating static reference tables (e.g. `currency_rates`, `tax_codes`, `timezones`) to every shard, application queries can join orders and items with tax codes **locally within the same shard node**, eliminating distributed network join hops.",
    explanation: "Keeps 99%+ of multi-tenant application queries 100% localized to single shard nodes.",
    hint: "Replicates reference data to all shards so lookups execute locally without network traffic.",
    level: "basic",
    codeExample: `-- Global reference tables exist locally on all 16 shards.`
  },
  {
    question: "Why should `innodb_buffer_pool_size` on each shard node be sized to hold that shard's active working set?",
    shortAnswer: "Because each shard node handles only $1/N$ of the total customer base; sizing the buffer pool to cover that specific node's hot working set guarantees high buffer pool hit ratios (>99%) and ensures that 95%+ of point queries execute purely in RAM.",
    explanation: "Maximizes memory caching efficiency by dividing working sets across nodes.",
    hint: "Each shard holds 1/N of data; sizing buffer pool per node keeps hot data cached in RAM (>99% hit ratio).",
    level: "intermediate",
    codeExample: `[mysqld]
innodb_buffer_pool_size = 64G # Sized for 1 shard's active working set`
  },
  {
    question: "What is the recommended strategy for generating unique Primary Keys in a multi-tenant sharded SaaS platform?",
    shortAnswer: "Standardize on **Twitter Snowflake (64-bit unsigned integers)** or **UUIDv7 (128-bit timestamp-ordered strings)**; both guarantee global uniqueness across all shards while maintaining chronological sorting for optimal B-Tree index performance.",
    explanation: "Eliminates multi-node primary key collision bugs without central locking.",
    hint: "Twitter Snowflake or UUIDv7 for globally unique, chronologically sortable keys.",
    level: "basic",
    codeExample: `CREATE TABLE invoices (
  invoice_id BIGINT UNSIGNED NOT NULL, -- Twitter Snowflake ID
  tenant_uuid VARCHAR(36) NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (invoice_id, tenant_uuid)
);`
  },
  {
    question: "How does the Transactional Outbox Pattern ensure reliable cross-shard event synchronization in multi-tenant architectures?",
    shortAnswer: "When an order is created on Shard 2, an `OrderCreated` event is written into a local `outbox` table on Shard 2 in the **same ACID transaction**; Debezium CDC reads the binlog and streams the event to Kafka, which updates search caches and notification services reliably.",
    explanation: "Eliminates dual-write inconsistency between the sharded database and message queues.",
    hint: "Writes event to local outbox table in same transaction; CDC streams to Kafka for other services.",
    level: "intermediate",
    codeExample: `START TRANSACTION;
INSERT INTO invoices VALUES (...);
INSERT INTO outbox_events VALUES ('INVOICE_GENERATED', ...);
COMMIT;`
  },
  {
    question: "How do you automate the rolling partition sliding window on all 16 shard nodes in a hybrid cluster?",
    shortAnswer: "Deploy a centralized Cron job or Kubernetes CronJob that connects to all 16 shard nodes on the 1st of every month to execute `ALTER TABLE ... DROP PARTITION` on the oldest month and `ALTER TABLE ... REORGANIZE PARTITION p_future` for the upcoming month.",
    explanation: "Ensures uniform storage retention across all cluster nodes automatically.",
    hint: "Centralized monthly cron job connecting to all 16 shards to execute DROP and REORGANIZE.",
    level: "basic",
    codeExample: `// Kubernetes CronJob: Iterates Shard 0 to Shard 15 and executes partition maintenance.`
  },
  {
    question: "What is the 'Split-Brain' risk in a sharded database cluster and how is it prevented?",
    shortAnswer: "When a network partition isolates a replica node and it mistakenly promotes itself to Primary, resulting in two nodes accepting conflicting writes on the same shard; prevented by deploying **odd-numbered nodes (3 or 5 nodes) with Paxos/Raft consensus (MySQL Group Replication)** requiring a strict majority quorum.",
    explanation: "Consensus quorums guarantee that isolated minority partitions cannot accept writes.",
    hint: "Prevented by odd-numbered nodes (3 or 5) using Group Replication Paxos majority quorum.",
    level: "expert",
    codeExample: `-- Group Replication: Requires (N/2)+1 votes to elect Primary and accept writes.`
  },
  {
    question: "What is the impact of cross-shard pagination (`LIMIT 1000, 20`) on proxy memory in a 16-node cluster?",
    shortAnswer: "The proxy must request `LIMIT 0, 1020` from all 16 shards ($16 \\times 1020 = 16,320$ rows transferred over network), buffer all rows in proxy RAM, merge sort them, and discard the first 1,000 rows (the 'Deep Pagination Penalty'); solved by using **Cursor-Based / Keyset Pagination** (`WHERE id > last_seen_id LIMIT 20`).",
    explanation: "Keyset pagination eliminates deep offset network data transfer completely.",
    hint: "Deep offset fetches from all shards; replace with Keyset pagination (WHERE id > last_seen_id).",
    level: "expert",
    codeExample: `-- Keyset Pagination:
SELECT * FROM orders WHERE tenant_id = 101 AND order_id > 18446744073709551000 LIMIT 20;`
  },
  {
    question: "Why is Sharding Key immutability a mandatory architectural rule in SaaS databases?",
    shortAnswer: "Because modifying a row's Shard Key (e.g. changing `tenant_id`) requires moving the row from one physical server node to another over the network (cross-node delete + cross-node insert), which cannot be done within a local transaction and risks data corruption.",
    explanation: "Shard keys must remain strictly immutable throughout the lifecycle of an entity.",
    hint: "Updating a shard key requires cross-node deletion and insertion, which cannot be done atomically.",
    level: "basic",
    codeExample: `-- ❌ Updating shard key is forbidden in production: UPDATE users SET tenant_id = 205;`
  },
  {
    question: "How do you handle schema versioning in a sharded cluster with zero downtime?",
    shortAnswer: "By following the **Expand-and-Contract (Parallel Run) Pattern**: 1. (Expand) Add new nullable column across all shards; 2. Update application code to write to both columns and read from new column; 3. Backfill historical data; 4. (Contract) Drop old column across all shards.",
    explanation: "Guarantees backward and forward compatibility across code deployments.",
    hint: "Expand-and-contract pattern: add nullable column, double-write, backfill, drop old column.",
    level: "intermediate",
    codeExample: `// Phase 1: ADD COLUMN new_col (Nullable) -> Phase 2: Deploy App -> Phase 3: DROP COLUMN old_col`
  },
  {
    question: "What is the primary benefit of deploying ProxySQL in front of a sharded MySQL fleet?",
    shortAnswer: "ProxySQL provides high-performance **Connection Pooling, Query Routing by Hostgroup, Read/Write Splitting, and Query Caching**, shielding backend MySQL instances from client connection spikes and reducing connection latency to sub-millisecond speeds.",
    explanation: "Essential middleware component for managing large connection fleets in production.",
    hint: "Provides connection pooling, read/write splitting, and hostgroup routing to protect shard nodes.",
    level: "basic",
    codeExample: `// 1,000 App Threads -> ProxySQL (50 Pooled Connections) -> MySQL Shard Instance`
  },
  {
    question: "How does a SaaS application implement Shard-Aware Connection Pooling?",
    shortAnswer: "The application maintains a separate dedicated connection pool for each physical shard node (e.g. Pool 0 for Shard 0, Pool 1 for Shard 1); when a request arrives, the router computes the shard index and borrows a connection directly from that specific pool.",
    explanation: "Prevents cross-shard connection contention inside the application process.",
    hint: "Maintains dedicated connection pools per shard node, borrowing connections based on shard index.",
    level: "intermediate",
    codeExample: `const pool = shardPools[getShardIndex(tenantUuid)];
const conn = await pool.getConnection();`
  },
  {
    question: "What is `information_schema.PARTITIONS`'s role in verifying partition health in a hybrid cluster?",
    shortAnswer: "Querying `information_schema.PARTITIONS` across all shard nodes verifies that partition row counts, data lengths, and free space are balanced across all physical files, alerting DBAs to partition skew or defragmentation requirements.",
    explanation: "Essential automated health diagnostic query.",
    hint: "Query information_schema.PARTITIONS on all shards to verify row counts, sizes, and defragmentation.",
    level: "basic",
    codeExample: `SELECT TABLE_NAME, PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS MB 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'financial_ledger';`
  },
  {
    question: "What is the blast radius advantage of a Hybrid Sharded VLDB during a ransomware or storage controller failure?",
    shortAnswer: "If a storage drive fails on Shard 3, **only 1/16th (6.25%) of tenants are affected**, while the remaining 93.75% of tenants across all other 15 shards experience zero downtime and continue operating normally.",
    explanation: "Shared-nothing sharding dramatically isolates failure blast radiuses.",
    hint: "Failure on Shard 3 impacts only 6.25% of users; all other 15 shards operate with zero downtime.",
    level: "basic",
    codeExample: `-- Shard 3 offline -> Only 6.25% of customer base affected; 93.75% unaffected.`
  },
  {
    question: "Why should Change Data Capture (CDC) pipelines stream shard binlogs to a Columnar Data Warehouse (ClickHouse / Snowflake)?",
    shortAnswer: "Because OLAP data warehouses store data by column with 10x compression and vectorized execution, allowing multi-billion-row analytical queries (`GROUP BY`, `SUM`, `AVG`) across the entire company to complete in 20–50ms without touching the production OLTP sharded cluster.",
    explanation: "The ultimate architecture for separating transactional workloads from analytical reporting.",
    hint: "Columnar OLAP engines execute cross-shard aggregations in milliseconds without impacting OLTP.",
    level: "basic",
    codeExample: `// Shard Binlogs -> Kafka -> ClickHouse Columnar Engine (Global Analytics in 30ms)`
  },
  {
    question: "What is the primary operational takeaway of Topic 12 and the entire Module 004_007?",
    shortAnswer: "Mastering Table Partitioning & Horizontal Sharding enables scaling MySQL 8.0 to billions of rows: use **Table Partitioning (RANGE / LIST / HASH / KEY / Composite)** within a single server for sub-5ms lifecycle archival (`DROP PARTITION`) and partition pruning; deploy **Horizontal Sharding across independent nodes** via **Consistent Hashing** when data exceeds single-server limits; eliminate cross-shard joins via **ER Co-Sharding** and **Global Tables**; use **Twitter Snowflake IDs** for clustered B-Tree efficiency; and implement the **Hybrid Partitioned-Sharded VLDB Architecture** backed by **3-Node InnoDB Clusters** and **CDC pipelines**.",
    explanation: "The capstone blueprint that enables senior database architects to design, deploy, and operate planetary-scale relational database systems with zero downtime.",
    hint: "Summarize Table Partitioning within nodes, Horizontal Sharding across nodes, ER co-sharding, Snowflake IDs, and the Hybrid VLDB architecture.",
    level: "basic",
    codeExample: `-- Master Hybrid Architecture Capstone Blueprint:
# 1. Sharding Tier: 16 MySQL Server Nodes (Consistent Hashing on tenant_uuid)
# 2. Local Tier: On each node, tables PARTITION BY RANGE COLUMNS (txn_date)
# 3. High Availability: 3-Node MySQL InnoDB Cluster per Shard
# 4. Primary Keys: 64-bit Twitter Snowflake (BIGINT UNSIGNED)
# 5. Joins: ER Table Groups co-sharded on tenant_uuid + Replicated Global Tables
# 6. Lifecycle: Sub-5ms automated monthly DROP PARTITION sliding window
# 7. Analytics: CDC binlog streaming to ClickHouse / Snowflake OLAP`
  },
  {
    question: "What is the difference between Shared-Disk vs Shared-Nothing architecture in sharded systems?",
    shortAnswer: "**Shared-Disk**: Multiple database compute nodes share a common centralized storage SAN/NAS (creating a storage I/O bottleneck); **Shared-Nothing**: Every database node has its own dedicated CPU, RAM, and independent physical NVMe storage, scaling horizontally with zero storage bus contention.",
    explanation: "Shared-Nothing is the architecture underlying all true horizontal sharding systems.",
    hint: "Shared-Disk shares centralized storage; Shared-Nothing gives every node independent CPU, RAM, and disk.",
    level: "intermediate",
    codeExample: `-- Shared-Nothing: Shard 0 (Node A + NVMe A), Shard 1 (Node B + NVMe B)`
  }
];

export default questions;
