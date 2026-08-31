// topic0_files/topic0_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 0: Why and When to Partition Tables in Large-Scale Databases (VLDB)

const questions = [
  {
    question: "What is Table Partitioning in MySQL and how does it fundamentally work?",
    shortAnswer: "Table Partitioning is a database design technique where a single logical table is divided into multiple smaller, independent physical storage files (partitions) managed transparently by the MySQL storage engine while presenting a single unified table schema to client queries.",
    explanation: "Applications execute standard SQL queries against the table name, while MySQL routes reads and writes to specific underlying physical partition files.",
    hint: "Divides a single logical table into multiple smaller physical files transparently.",
    level: "basic",
    codeExample: `CREATE TABLE sales_records (
  order_id INT NOT NULL,
  order_date DATE NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, order_date)
) ENGINE = InnoDB
PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "What is a Very Large Database (VLDB) and at what scale does traditional monolithic table indexing become a bottleneck?",
    shortAnswer: "A VLDB refers to tables with tens of millions to billions of rows (typically &gt; 10GB to 500GB+ in size); at this scale, monolithic B-Tree index depths increase, index caches exceed available RAM (`innodb_buffer_pool_size`), and bulk `DELETE` operations lock the database.",
    explanation: "Partitioning divides massive multi-gigabyte tables into manageable smaller chunks that fit inside memory buffers.",
    hint: "Massive tables (>10GB/50M+ rows) where index lookups and deletions exhaust memory and disk I/O.",
    level: "basic",
    codeExample: `-- Monolithic 500M-row table → Index lookups cause buffer pool thrashing & random I/O.`
  },
  {
    question: "What is 'Partition Pruning' and why is it the primary performance advantage of table partitioning?",
    shortAnswer: "Partition Pruning is an optimization where the MySQL query optimizer examines the `WHERE` clause conditions and **skips (prunes) all physical partitions that cannot contain matching rows**, scanning only the specific relevant partition and eliminating 90%+ of disk I/O.",
    explanation: "Converts massive multi-million row table scans into ultra-fast, localized partition scans.",
    hint: "Optimizer reads only the physical partitions that match query WHERE predicates, skipping the rest.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM sales_records WHERE order_date = '2025-06-15';
-- Optimizer accesses ONLY partition 'p2025', ignoring p2024 and p_future!`
  },
  {
    question: "Why is `ALTER TABLE ... DROP PARTITION` dramatically faster than executing a bulk `DELETE FROM table WHERE ...` query?",
    shortAnswer: "Because `DROP PARTITION` simply unlinks and deletes the physical partition file (`.ibd`) from the filesystem in **under 5 milliseconds**, generating **zero undo log entries, zero redo log overhead, and zero row-level lock contention**, whereas `DELETE` writes every deleted row to undo logs and takes hours.",
    explanation: "The ultimate tool for instant historical data lifecycle purging in high-throughput applications.",
    hint: "Unlinks physical disk file instantly without undo logging or row locking, unlike DELETE.",
    level: "intermediate",
    codeExample: `-- Deletes 50,000,000 historical records in 5 milliseconds:
ALTER TABLE sales_records DROP PARTITION p2023;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS audit logs reached 80,000,000 rows across ₹1.2 Crores in sales transactions. Why did partitioning by `YEAR(log_date)` eliminate their midnight system slowdown?",
    shortAnswer: "Susmita partitioned the audit log by year; when purging 3-year-old records, instead of running a 45-minute `DELETE` query that locked cashiers out of billing, she executed `ALTER TABLE audit_logs DROP PARTITION p2022;`, completing the purge in 4ms with zero lock contention on active POS sales.",
    explanation: "Eliminated transaction lock contention and undo log saturation.",
    hint: "Used instant DROP PARTITION for historical log purging instead of heavy DELETE queries.",
    level: "moderate",
    codeExample: `# Barrackpore Instant Log Purge:
ALTER TABLE pos_audit_logs DROP PARTITION p2022;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, core ledger transactions scaled to 250,000,000 rows for ₹500 Crores in banking volume. How did RANGE partitioning by `account_branch_id` boost statement generation query speed by 12x?",
    shortAnswer: "Because daily balance queries always filtered by `account_branch_id = 101`, MySQL's query optimizer pruned the search space to scan only the single 15-million-row branch partition, allowing the B-Tree index to fit 100% inside the InnoDB buffer pool RAM with zero disk reads.",
    explanation: "Partition pruning ensured active branch working sets remained cached in memory.",
    hint: "Partition pruning restricted index searches to the specific branch partition cached in RAM.",
    level: "expert",
    codeExample: `SELECT * FROM bank_ledgers WHERE account_branch_id = 101 AND txn_date = '2026-08-25';
-- Prunes 235 million rows across other branch partitions instantly!`
  },
  {
    question: "What is the 'Scatter-Gather Penalty' in table partitioning, and when can a partitioned table perform WORSE than an unpartitioned table?",
    shortAnswer: "When a query **omits the partition key in its `WHERE` clause**, MySQL cannot prune partitions and must execute a Scatter-Gather scan across **every single physical partition**, opening multiple index handles and incurring higher CPU/disk overhead than a single monolithic B-Tree search.",
    explanation: "Partitioning is detrimental if queries frequently filter on non-partitioned columns.",
    hint: "Cross-partition search overhead when query WHERE clauses do not filter on the partition key.",
    level: "intermediate",
    codeExample: `-- Scatter-Gather Penalty: Must search p2022, p2023, p2024, p2025, p_future!
SELECT * FROM sales_records WHERE customer_name = 'Mamata Roy';`
  },
  {
    question: "What is the mandatory Primary Key and Unique Key rule for partitioned tables in MySQL?",
    shortAnswer: "**Every Unique Key (including the Primary Key) on a partitioned table MUST contain every column present in the table's partitioning expression**; if a table has a primary key on `(id)` and partitions by `created_at`, MySQL will reject the table creation with `ERROR 1503 (HY000)`.",
    explanation: "Enables MySQL to enforce unique constraints locally within a partition without cross-partition lock checks.",
    hint: "Every primary/unique key must include all columns used in the partitioning expression.",
    level: "expert",
    codeExample: `-- Correct: Primary Key includes the partitioning column (order_date):
CREATE TABLE orders (
  order_id INT NOT NULL,
  order_date DATE NOT NULL,
  PRIMARY KEY (order_id, order_date)
) PARTITION BY RANGE (YEAR(order_date)) (...);`
  },
  {
    question: "What physical files are created on disk for an InnoDB partitioned table when `innodb_file_per_table = ON`?",
    shortAnswer: "MySQL creates a separate `.ibd` tablespace file on disk for **each individual partition** (e.g. `sales_records#p#p2024.ibd`, `sales_records#p#p2025.ibd`).",
    explanation: "Allows operating system level file management, space reclamation, and independent storage tiering.",
    hint: "Individual .ibd tablespace files created per partition.",
    level: "basic",
    codeExample: `# Filesystem storage:
# sales_records#p#p2024.ibd (12 GB)
# sales_records#p#p2025.ibd (18 GB)`
  },
  {
    question: "How does table partitioning reduce InnoDB Buffer Pool thrashing on multi-terabyte databases?",
    shortAnswer: "Instead of caching pages from a massive 500GB monolithic B-Tree index, queries only access the active partition (e.g. the 20GB current month partition), allowing the active working set to fit entirely inside the InnoDB buffer pool RAM with high buffer pool hit ratios (>99%).",
    explanation: "Concentrates memory caching on hot data while cold historical partitions remain on disk.",
    hint: "Keeps the hot active partition's compact B-Tree cached entirely inside RAM.",
    level: "intermediate",
    codeExample: `-- 2026 Hot Partition: Fits in 32GB Buffer Pool.
-- 2020-2025 Cold Partitions: Remain on NVMe storage without evicting RAM cache.`
  },
  {
    question: "What are the 4 standard partitioning types supported natively in MySQL 8.0?",
    shortAnswer: "1. **`RANGE`** (values fall within specified intervals), 2. **`LIST`** (values match discrete categorical sets), 3. **`HASH`** (values distributed based on user-defined integer modulus), and 4. **`KEY`** (values distributed via MySQL internal MD5-based hash).",
    explanation: "Provides tailored physical data layouts for diverse query patterns.",
    hint: "RANGE, LIST, HASH, and KEY partitioning.",
    level: "basic",
    codeExample: `-- 4 Core Partitioning Strategies:
-- PARTITION BY RANGE (...)
-- PARTITION BY LIST (...)
-- PARTITION BY HASH (...)
-- PARTITION BY KEY (...)`
  },
  {
    question: "When should you NOT partition a database table?",
    shortAnswer: "1. Small tables (&lt; 5 million rows or &lt; 5GB); 2. Tables where queries rarely filter on a common partition key; 3. Tables with multiple unrelated unique constraints that cannot include the partition column; 4. Highly transactional OLTP tables requiring frequent cross-partition updates.",
    explanation: "Partitioning adds query planning and metadata overhead; only apply when datasets justify it.",
    hint: "Small tables, non-partition key query patterns, or conflicting unique keys.",
    level: "basic",
    codeExample: `-- Small 50k-row lookup tables should NEVER be partitioned.`
  },
  {
    question: "How do you verify whether a query benefits from Partition Pruning using `EXPLAIN`?",
    shortAnswer: "Run `EXPLAIN SELECT ...` (or `EXPLAIN PARTITIONS SELECT ...`) and inspect the **`partitions`** column; if it lists only the targeted partition (e.g. `p2025`) rather than all partitions (`p2023,p2024,p2025,p_future`), pruning is working.",
    explanation: "Mandatory verification step when developing partition-aware queries.",
    hint: "Check the 'partitions' column in EXPLAIN output.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';
-- partitions column shows: p2025`
  },
  {
    question: "What is the maximum number of partitions allowed per table in MySQL 8.0?",
    shortAnswer: "Up to **8,192 partitions** (including subpartitions).",
    explanation: "While 8,192 is the theoretical limit, production best practices recommend keeping partition counts between 10 and 100 to avoid file descriptor and memory overhead.",
    hint: "Up to 8,192 partitions maximum.",
    level: "basic",
    codeExample: `-- Maximum 8192 partitions per table in MySQL 8.0.`
  },
  {
    question: "What is `MAXVALUE` in RANGE partitioning and why is it recommended to include a catch-all partition?",
    shortAnswer: "`MAXVALUE` represents a constant greater than any possible integer value; including a `PARTITION p_future VALUES LESS THAN MAXVALUE` prevents `INSERT` statements from failing with `ERROR 1526 (HY000): Table has no partition for value ...` when new data exceeds existing ranges.",
    explanation: "Acts as a safety catch-all boundary for incoming records.",
    hint: "Catch-all partition preventing insert failures for values higher than defined ranges.",
    level: "intermediate",
    codeExample: `PARTITION p_future VALUES LESS THAN MAXVALUE`
  },
  {
    question: "What happens when an `UPDATE` statement modifies a row's partition key column to a value belonging to a different partition?",
    shortAnswer: "MySQL automatically performs an **atomic cross-partition row movement**: it deletes the row from the old physical partition and inserts the updated row into the new physical partition within the same transaction.",
    explanation: "Transparent to the application, though cross-partition updates incur higher lock overhead.",
    hint: "Deletes from old partition and inserts into new partition atomically.",
    level: "intermediate",
    codeExample: `-- Moves row from p2024.ibd to p2025.ibd automatically:
UPDATE sales_records SET order_date = '2025-01-10' WHERE order_id = 101;`
  },
  {
    question: "Can Foreign Keys reference or be defined on partitioned tables in MySQL 8.0 InnoDB?",
    shortAnswer: "**No**, MySQL InnoDB does NOT support foreign keys on partitioned tables, nor can a partitioned table be referenced by foreign keys on other tables.",
    explanation: "Relational integrity across partitioned tables must be enforced at the application or service layer.",
    hint: "Foreign keys are not supported on partitioned tables in MySQL InnoDB.",
    level: "expert",
    codeExample: `-- Foreign key constraints cannot be created on partitioned tables in MySQL.`
  },
  {
    question: "What is the impact of table partitioning on full-text indexes (`FULLTEXT`) and spatial indexes (`SPATIAL`) in MySQL 8.0?",
    shortAnswer: "Full-text indexes and spatial indexes are **not supported** on partitioned tables in MySQL 8.0.",
    explanation: "Use dedicated search engines (Elasticsearch/OpenSearch) or unpartitioned tables for full-text search.",
    hint: "FULLTEXT and SPATIAL indexes are not supported on partitioned tables.",
    level: "intermediate",
    codeExample: `-- FULLTEXT indexes cannot be defined on partitioned tables.`
  },
  {
    question: "What is 'Composite Partitioning' (or Subpartitioning) in MySQL?",
    shortAnswer: "A two-tier partitioning strategy where each primary partition (e.g. partitioned by `RANGE` on date) is further split into secondary subpartitions (e.g. subpartitioned by `HASH` on customer ID).",
    explanation: "Provides multi-dimensional physical data distribution across time and entity keys.",
    hint: "Two-tier partitioning: primary partition divided into secondary subpartitions.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (YEAR(order_date))
SUBPARTITION BY HASH (customer_id)
SUBPARTITIONS 4 (...)`
  },
  {
    question: "What is `information_schema.PARTITIONS` and how is it used to monitor partition health?",
    shortAnswer: "A system catalog table providing metadata for all partitioned tables, including partition names, partitioning methods, row counts (`TABLE_ROWS`), data length (`DATA_LENGTH`), and index length (`INDEX_LENGTH`) per partition.",
    explanation: "Essential for detecting data skew across partitions.",
    hint: "System catalog view showing row counts and storage size for every partition.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS, DATA_LENGTH/1024/1024 AS DATA_MB 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'sales_records';`
  },
  {
    question: "How does table partitioning enable Storage Tiering across different disk drives in Linux?",
    shortAnswer: "By specifying `DATA DIRECTORY = '/path/to/fast_nvme'` on hot active partitions and `DATA DIRECTORY = '/path/to/cold_hdd'` on historical partitions, allowing cost-effective hybrid storage architectures.",
    explanation: "Optimizes hardware storage costs for multi-terabyte datasets.",
    hint: "Assigning individual partitions to different physical disks via DATA DIRECTORY.",
    level: "expert",
    codeExample: `PARTITION p2026 VALUES LESS THAN (2027) DATA DIRECTORY = '/mnt/fast_nvme',
PARTITION p2022 VALUES LESS THAN (2023) DATA DIRECTORY = '/mnt/cold_storage'`
  },
  {
    question: "What is `ALTER TABLE ... TRUNCATE PARTITION` and how does it differ from `DROP PARTITION`?",
    shortAnswer: "`TRUNCATE PARTITION` deletes all row data inside the partition while **retaining the partition definition** in the table schema; `DROP PARTITION` deletes both the data and the partition definition entirely.",
    explanation: "Used to empty a partition for reuse without altering table schema ranges.",
    hint: "Empties data but keeps the partition structure, whereas DROP PARTITION deletes both.",
    level: "intermediate",
    codeExample: `ALTER TABLE audit_logs TRUNCATE PARTITION p2024;`
  },
  {
    question: "Why should time-based RANGE partitions be partitioned by day or month instead of single years on massive datasets?",
    shortAnswer: "Because on a 100-million row/year table, a yearly partition contains 100M rows (still too large for fast scans and memory caching); monthly partitions contain ~8M rows, enabling instant pruning and fine-grained monthly archival.",
    explanation: "Sizes individual partitions to fit comfortably within the InnoDB buffer pool.",
    hint: "Monthly partitions keep individual partition sizes small enough to fit inside RAM.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (TO_DAYS(order_date)) (
  PARTITION p2025_01 VALUES LESS THAN (TO_DAYS('2025-02-01')),
  PARTITION p2025_02 VALUES LESS THAN (TO_DAYS('2025-03-01'))
);`
  },
  {
    question: "What is `ALTER TABLE ... REORGANIZE PARTITION` used for?",
    shortAnswer: "It allows splitting an existing partition into multiple smaller partitions (e.g. splitting `p_future` into `p2026` and a new `p_future`) or merging multiple historical partitions without losing table data.",
    explanation: "Enables dynamic partition lifecycle maintenance online.",
    hint: "Splits or merges existing partitions without data loss.",
    level: "intermediate",
    codeExample: `ALTER TABLE sales_records REORGANIZE PARTITION p_future INTO (
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "Can Temporary Tables be partitioned in MySQL 8.0?",
    shortAnswer: "No, MySQL does not support partitioning on temporary tables (`CREATE TEMPORARY TABLE`).",
    explanation: "Temporary tables reside in memory or temporary files and cannot be partitioned.",
    hint: "Temporary tables cannot be partitioned.",
    level: "basic",
    codeExample: `-- Temporary tables cannot use PARTITION BY.`
  },
  {
    question: "How does table partitioning affect query locks (`LOCK TABLES` / Row Locks)?",
    shortAnswer: "InnoDB row-level locks remain confined to the specific partition holding the modified rows, preventing lock contention with concurrent queries operating on other partitions.",
    explanation: "Improves concurrent write throughput across separate partitions.",
    hint: "Row locks are isolated to the specific partition being modified.",
    level: "intermediate",
    codeExample: `-- Tx 1 modifying p2025 does not block Tx 2 reading p2024.`
  },
  {
    question: "What is the difference between Table Partitioning and Horizontal Database Sharding?",
    shortAnswer: "**Table Partitioning** is managed internally by a **single MySQL database instance** across multiple local disk files; **Horizontal Sharding** distributes data across **multiple independent physical database servers/nodes**, requiring an external query routing layer (like Vitess or Citus).",
    explanation: "Partitioning scales within a single server; Sharding scales horizontally across a server fleet.",
    hint: "Partitioning splits tables on a single server; Sharding distributes tables across multiple servers.",
    level: "basic",
    codeExample: `# Partitioning: 1 Server, Multiple .ibd files
# Sharding: 10 Servers, Distributed database shards`
  },
  {
    question: "What is `EXPLAIN FORMAT=JSON`'s advantage when analyzing partition pruning?",
    shortAnswer: "It outputs structured JSON detailing the exact list of evaluated partitions, filtered row percentages, cost estimates, and query execution plan metrics.",
    explanation: "Provides machine-readable telemetry for automated query optimization tools.",
    hint: "Returns detailed JSON output of evaluated partitions and optimizer cost calculations.",
    level: "intermediate",
    codeExample: `EXPLAIN FORMAT=JSON SELECT * FROM sales_records WHERE order_date = '2025-05-01';`
  },
  {
    question: "What is the single most important rule when designing queries for partitioned tables?",
    shortAnswer: "**Always include the partitioning column in the `WHERE` clause** of every high-frequency query to guarantee that the MySQL optimizer performs Partition Pruning rather than a full cluster Scatter-Gather scan.",
    explanation: "Ensures optimal query execution speed and minimal disk I/O.",
    hint: "Always include the partitioning key in query WHERE filters to enable partition pruning.",
    level: "basic",
    codeExample: `-- ALWAYS filter by partition key:
SELECT * FROM sales_records WHERE order_date BETWEEN '2025-01-01' AND '2025-01-31';`
  },
  {
    question: "What is the primary operational takeaway of Topic 0 in Module 004_007?",
    shortAnswer: "Table Partitioning divides massive multi-million row VLDB tables into smaller physical chunks (.ibd files) managed transparently under a single logical schema; its core superpowers are **Partition Pruning** (skipping 95%+ of table data during `WHERE` evaluation) and **instant sub-5ms lifecycle archival via `DROP PARTITION`**, but it requires including the partition column in all unique keys and query filters to avoid the severe **Scatter-Gather scan penalty**.",
    explanation: "Mastering why and when to partition empowers DBAs to maintain ultra-fast query latency and instant data purging on datasets scaling beyond 100 million rows.",
    hint: "Summarize logical vs physical division, partition pruning, instant DROP PARTITION archival, primary key rules, and scatter-gather avoidance.",
    level: "basic",
    codeExample: `-- Master VLDB Partitioning Template:
CREATE TABLE enterprise_ledger (
  txn_id BIGINT NOT NULL,
  txn_date DATE NOT NULL,
  account_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (txn_id, txn_date)
) ENGINE = InnoDB
PARTITION BY RANGE (YEAR(txn_date)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);

-- Pruned Query:
SELECT * FROM enterprise_ledger WHERE txn_date = '2025-08-25';

-- Instant Archival:
ALTER TABLE enterprise_ledger DROP PARTITION p2024;`
  }
];

export default questions;
