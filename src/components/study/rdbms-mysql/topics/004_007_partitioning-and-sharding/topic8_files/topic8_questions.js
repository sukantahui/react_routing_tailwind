// topic8_files/topic8_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 8: Managing Partitions: ALTER TABLE ... ADD, DROP, TRUNCATE, REORGANIZE & Maintenance

const questions = [
  {
    question: "What is `ALTER TABLE ... DROP PARTITION` and why is it the fastest method for historical data purging in MySQL?",
    shortAnswer: "`DROP PARTITION` unlinks and deletes the physical partition `.ibd` file directly from the filesystem in **under 5 milliseconds**, deleting millions of records with **zero undo log generation, zero redo log overhead, zero row-level lock contention, and zero table fragmentation**.",
    explanation: "Replaces slow, blocking bulk DELETE statements entirely in time-series database architectures.",
    hint: "Unlinks physical .ibd file directly from disk in <5ms without undo logs or row locks.",
    level: "basic",
    codeExample: `ALTER TABLE audit_logs DROP PARTITION p2022;`
  },
  {
    question: "What is the difference between `DROP PARTITION` and `TRUNCATE PARTITION` in MySQL?",
    shortAnswer: "`DROP PARTITION` permanently deletes the physical file, data, and **removes the partition definition from the table schema**; `TRUNCATE PARTITION` deletes all rows inside the partition while **retaining the partition definition and boundary mappings** in the table schema.",
    explanation: "TRUNCATE empties the partition for reuse; DROP removes the partition structure entirely.",
    hint: "DROP deletes data and schema definition; TRUNCATE empties data but preserves definition.",
    level: "basic",
    codeExample: `-- Empties data for p2025 but keeps p2025 in table schema:
ALTER TABLE sales_records TRUNCATE PARTITION p2025;`
  },
  {
    question: "How does `ALTER TABLE ... REORGANIZE PARTITION` split an existing `MAXVALUE` partition to add new upcoming monthly ranges?",
    shortAnswer: "It splits the existing catch-all `p_future` partition into the new upcoming month partition and a retained `p_future` partition online without losing existing records: `ALTER TABLE table REORGANIZE PARTITION p_future INTO (PARTITION p_new VALUES LESS THAN (...), PARTITION p_future VALUES LESS THAN MAXVALUE);`.",
    explanation: "The standard online method for forward partition expansion.",
    hint: "Splits p_future into new monthly partition and a retained p_future catch-all.",
    level: "intermediate",
    codeExample: `ALTER TABLE financial_ledger REORGANIZE PARTITION p_future INTO (
  PARTITION p2026_09 VALUES LESS THAN ('2026-10-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS audit logs scaled across ₹1.2 Crores in sales transactions. How did Susmita automate a 12-month rolling sliding window using partition management?",
    shortAnswer: "Susmita scheduled a monthly cron job executing two commands: 1. `ALTER TABLE pos_logs DROP PARTITION p_oldest;` (purging data older than 12 months in 4ms); 2. `ALTER TABLE pos_logs REORGANIZE PARTITION p_future INTO (PARTITION p_next_month VALUES LESS THAN (...), PARTITION p_future VALUES LESS THAN MAXVALUE);`, maintaining a constant 12-month rolling data retention window with zero DBA intervention.",
    explanation: "Automated rolling partition windows eliminate manual cleanup and storage bloat.",
    hint: "Scheduled monthly drop of oldest partition and reorganization of p_future for upcoming month.",
    level: "moderate",
    codeExample: `# Barrackpore Automated Sliding Window Script:
# Step 1: Purge oldest month
ALTER TABLE pos_logs DROP PARTITION p2024_08;
# Step 2: Provision upcoming month
ALTER TABLE pos_logs REORGANIZE PARTITION p_future INTO (
  PARTITION p2025_09 VALUES LESS THAN ('2025-10-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did setting `lock_wait_timeout = 5` prevent a transaction bottleneck when running `ALTER TABLE ... DROP PARTITION` across ₹500 Crores in banking operations?",
    shortAnswer: "Because `ALTER TABLE` partition DDL requires an exclusive **Metadata Lock (`MDL`)**; if a long-running reporting query held a shared read lock, the DDL would queue and block all subsequent client transactions. Setting `lock_wait_timeout = 5` ensured that if the DDL could not acquire an MDL within 5 seconds, it aborted safely without stalling production cashier billing.",
    explanation: "Protects high-throughput OLTP systems from metadata lock cascades.",
    hint: "Short lock_wait_timeout prevents partition DDL from queuing and blocking client transactions.",
    level: "expert",
    codeExample: `SET SESSION lock_wait_timeout = 5;
ALTER TABLE bank_ledgers DROP PARTITION p2022_q1;`
  },
  {
    question: "What is `ALTER TABLE ... OPTIMIZE PARTITION p1` and when should it be executed?",
    shortAnswer: "It rebuilds and defragments the physical `.ibd` tablespace file for partition `p1` online, reorganizing clustered B-Tree pages and reclaiming unused free disk space (`DATA_FREE`) after heavy `UPDATE` or batch delete churn.",
    explanation: "Reclaims disk space on a single partition without rebuilding the entire 500GB table.",
    hint: "Rebuilds and defragments a single partition online to reclaim free disk space.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records OPTIMIZE PARTITION p2025_08;`
  },
  {
    question: "What is `ALTER TABLE ... ANALYZE PARTITION p1` used for?",
    shortAnswer: "It samples index key distributions inside partition `p1` and updates index cardinality statistics in `mysql.innodb_index_stats`, helping the query optimizer generate accurate execution plans for queries targeting that partition.",
    explanation: "Mandatory maintenance step after bulk data loading into a partition.",
    hint: "Updates index statistics and cardinality for a single partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records ANALYZE PARTITION p2025_08;`
  },
  {
    question: "What is `ALTER TABLE ... CHECK PARTITION p1` used for?",
    shortAnswer: "It scans the physical pages and B-Tree index headers of partition `p1` to verify page checksums and detect any storage block corruption without locking unrelated partitions.",
    explanation: "Enables granular per-partition health diagnostics.",
    hint: "Verifies page checksums and B-Tree structural integrity for a single partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records CHECK PARTITION p2025_08;`
  },
  {
    question: "What is `ALTER TABLE ... REPAIR PARTITION p1` for InnoDB tables in MySQL 8.0?",
    shortAnswer: "For InnoDB tables, `REPAIR PARTITION` performs a partition rebuild (identical to `OPTIMIZE PARTITION`), verifying and reconstructing index structures for that specific partition.",
    explanation: "Reconstructs partition storage structures transactionally.",
    hint: "Reconstructs and rebuilds index structures for the specified partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records REPAIR PARTITION p2025_08;`
  },
  {
    question: "How do you merge two adjacent historical partitions (e.g. `p2022` and `p2023`) into a single consolidated archive partition?",
    shortAnswer: "Execute `ALTER TABLE table_name REORGANIZE PARTITION p2022, p2023 INTO (PARTITION p_archive_pre2024 VALUES LESS THAN (2024));`.",
    explanation: "Consolidates older partitions into larger historical archives online without data loss.",
    hint: "Use REORGANIZE PARTITION to combine adjacent partitions into a single partition.",
    level: "intermediate",
    codeExample: `ALTER TABLE financial_ledger REORGANIZE PARTITION p2022, p2023 INTO (
  PARTITION p_archive_pre2024 VALUES LESS THAN ('2024-01-01')
);`
  },
  {
    question: "How do you add a new partition to a RANGE partitioned table that does NOT have a `MAXVALUE` partition?",
    shortAnswer: "Execute `ALTER TABLE table_name ADD PARTITION (PARTITION p_new VALUES LESS THAN (value));`, provided the new boundary is strictly greater than the highest existing partition.",
    explanation: "Appends a new partition to the top of the range hierarchy.",
    hint: "Use ALTER TABLE ... ADD PARTITION with a higher upper boundary.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records ADD PARTITION (
  PARTITION p2027 VALUES LESS THAN (2028)
);`
  },
  {
    question: "Why does `ALTER TABLE ... ADD PARTITION` FAIL if a `MAXVALUE` partition already exists?",
    shortAnswer: "Because `MAXVALUE` already covers all possible values up to positive infinity; you cannot add a partition with a boundary higher than `MAXVALUE`. You must use **`REORGANIZE PARTITION`** to split `MAXVALUE` instead.",
    explanation: "A fundamental rule of RANGE partition maintenance.",
    hint: "Cannot add partition above MAXVALUE; must split MAXVALUE using REORGANIZE PARTITION.",
    level: "intermediate",
    codeExample: `-- Error 1481 if using ADD PARTITION when MAXVALUE exists. Use REORGANIZE PARTITION.`
  },
  {
    question: "How do you add a new regional category to a LIST partitioned table?",
    shortAnswer: "Execute `ALTER TABLE table_name ADD PARTITION (PARTITION p_south VALUES IN ('Bengaluru', 'Chennai', 'Hyderabad'));`, provided none of the new values exist in any other partition list.",
    explanation: "Appends a new disjoint category set online.",
    hint: "Use ALTER TABLE ... ADD PARTITION with the new VALUES IN list.",
    level: "basic",
    codeExample: `ALTER TABLE regional_accounts ADD PARTITION (
  PARTITION p_south VALUES IN ('Bengaluru', 'Chennai', 'Hyderabad')
);`
  },
  {
    question: "How do you add 4 new partitions to a HASH or KEY partitioned table?",
    shortAnswer: "Execute **`ALTER TABLE table_name ADD PARTITION PARTITIONS 4;`**; MySQL increases the total partition count by 4 and redistributes rows accordingly.",
    explanation: "Increments the hash bucket count dynamically.",
    hint: "ALTER TABLE table ADD PARTITION PARTITIONS N.",
    level: "basic",
    codeExample: `ALTER TABLE user_events ADD PARTITION PARTITIONS 4;`
  },
  {
    question: "How do you reduce the partition count of a HASH or KEY partitioned table by 2?",
    shortAnswer: "Execute **`ALTER TABLE table_name COALESCE PARTITION 2;`**; MySQL merges rows from 2 partitions into the remaining partitions safely without data loss.",
    explanation: "`COALESCE PARTITION` is the exclusive command for reducing HASH/KEY bucket counts.",
    hint: "ALTER TABLE table COALESCE PARTITION N.",
    level: "intermediate",
    codeExample: `ALTER TABLE user_events COALESCE PARTITION 2;`
  },
  {
    question: "How does `ALTER TABLE ... EXCHANGE PARTITION` work at the storage engine level?",
    shortAnswer: "It **swaps physical `.ibd` tablespace file pointers** between a partitioned table's partition and an identically structured standalone non-partitioned table in **under 10 milliseconds**, enabling instant bulk ETL ingestion or partition archiving.",
    explanation: "Zero-copy tablespace swap completed in metadata.",
    hint: "Swaps tablespace file pointers with a standalone table in metadata in <10ms.",
    level: "expert",
    codeExample: `ALTER TABLE sales_records EXCHANGE PARTITION p2024 WITH TABLE orders_2024_archive;`
  },
  {
    question: "What prerequisite validation is mandatory before executing `ALTER TABLE ... EXCHANGE PARTITION`?",
    shortAnswer: "1. The standalone table must have the **exact same column types, names, and index schema**; 2. The standalone table must NOT be partitioned; 3. All rows in the standalone table must satisfy the partition's boundary rules; 4. Neither table can have foreign keys.",
    explanation: "Ensures structural and data integrity before swapping tablespaces.",
    hint: "Identical schema, unpartitioned standalone table, and row boundary compliance.",
    level: "expert",
    codeExample: `-- Standalone table must match partitioned table schema exactly.`
  },
  {
    question: "What is `WITHOUT VALIDATION` in `ALTER TABLE ... EXCHANGE PARTITION` (MySQL 8.0.14+)?",
    shortAnswer: "Adding `WITHOUT VALIDATION` instructs MySQL to **skip checking whether every row in the standalone table satisfies the partition boundaries**, completing the tablespace swap in under 1 millisecond on multi-gigabyte datasets (use only when ETL source data is guaranteed compliant).",
    explanation: "Accelerates high-volume batch data ingestion by bypassing row-by-row boundary scans.",
    hint: "Skips row boundary validation, completing the tablespace swap instantly.",
    level: "expert",
    codeExample: `ALTER TABLE sales_records EXCHANGE PARTITION p2025_08 
WITH TABLE orders_staging WITHOUT VALIDATION;`
  },
  {
    question: "How do you remove partitioning from a table while keeping all existing row data intact?",
    shortAnswer: "Execute **`ALTER TABLE table_name REMOVE PARTITIONING;`**; MySQL merges all individual partition `.ibd` files into a single monolithic tablespace.",
    explanation: "Converts a partitioned table back into a standard standalone table.",
    hint: "Execute ALTER TABLE table REMOVE PARTITIONING.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records REMOVE PARTITIONING;`
  },
  {
    question: "What query in `information_schema.PARTITIONS` monitors fragmented free disk space (`DATA_FREE`) across partitions?",
    shortAnswer: "`SELECT PARTITION_NAME, TABLE_ROWS, ROUND(DATA_LENGTH/1024/1024, 2) AS DATA_MB, ROUND(DATA_FREE/1024/1024, 2) AS FREE_MB FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'sales_records';`.",
    explanation: "Identifies partitions that require defragmentation via OPTIMIZE PARTITION.",
    hint: "Query DATA_FREE in information_schema.PARTITIONS to detect fragmentation.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS, 
       ROUND(DATA_LENGTH/1024/1024, 2) AS DATA_MB,
       ROUND(DATA_FREE/1024/1024, 2) AS FREE_MB
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'financial_ledger';`
  },
  {
    question: "What happens if a disk failure corrupts a single partition `.ibd` file on a partitioned table?",
    shortAnswer: "You can run `ALTER TABLE table_name CHECK PARTITION p_corrupt;` to identify the damage, and if needed, execute `DROP PARTITION p_corrupt` or restore only that single `.ibd` file from backup, while **all other healthy partitions continue serving production queries with zero downtime**.",
    explanation: "Limits blast radius and simplifies targeted disaster recovery.",
    hint: "Isolates recovery: check, drop, or restore only the corrupted partition file.",
    level: "intermediate",
    codeExample: `ALTER TABLE sales_records CHECK PARTITION p2022;`
  },
  {
    question: "How does `ALTER TABLE ... DISCARD PARTITION TABLESPACE` work in MySQL 8.0 InnoDB?",
    shortAnswer: "It severs the connection between the partition metadata and its physical `.ibd` file on disk, allowing DBAs to copy a restored `.ibd` file into place before executing `IMPORT PARTITION TABLESPACE`.",
    explanation: "Enables transportable tablespace restores for individual partitions.",
    hint: "Discards the physical tablespace connection for transportable partition restores.",
    level: "expert",
    codeExample: `ALTER TABLE sales_records DISCARD PARTITION p2024 TABLESPACE;`
  },
  {
    question: "How does `ALTER TABLE ... IMPORT PARTITION TABLESPACE` work in MySQL 8.0?",
    shortAnswer: "It attaches a restored physical `.ibd` partition file into the partitioned table schema online, verifying tablespace headers and making the partition immediately readable.",
    explanation: "Completes partition-level physical backup restores.",
    hint: "Imports a restored .ibd partition tablespace file online.",
    level: "expert",
    codeExample: `ALTER TABLE sales_records IMPORT PARTITION p2024 TABLESPACE;`
  },
  {
    question: "Why should `OPTIMIZE PARTITION` be run during off-peak maintenance hours?",
    shortAnswer: "Because rebuilding a multi-gigabyte partition tablespace generates intensive sequential disk read/write I/O and acquires an exclusive metadata lock at the completion phase to swap file pointers.",
    explanation: "Minimizes I/O contention on active production transactions.",
    hint: "Rebuilding tablespaces generates heavy disk I/O and requires brief metadata locks.",
    level: "intermediate",
    codeExample: `-- Schedule OPTIMIZE PARTITION during off-peak maintenance windows.`
  },
  {
    question: "What is `innodb_online_alter_log_max_size`'s role during partition reorganization?",
    shortAnswer: "It defines the maximum memory buffer size allocated to record concurrent DML modifications (`INSERT`, `UPDATE`, `DELETE`) occurring while a partition is being reorganized online; if concurrent DML exceeds this size, the `ALTER TABLE` operation fails.",
    explanation: "Ensure this buffer is sized adequately (e.g. 512MB) on high-write systems.",
    hint: "Buffer holding concurrent DML during online partition alterations.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_online_alter_log_max_size = 536870912; -- 512MB`
  },
  {
    question: "What happens if you execute `ALTER TABLE ... REORGANIZE PARTITION` on a non-existent partition name?",
    shortAnswer: "MySQL rejects the command with `ERROR 1507 (HY000): Error in list of partitions to REORGANIZE`.",
    explanation: "All partition names specified in REORGANIZE must exist in the table schema.",
    hint: "Fails with Error 1507 if any specified partition name does not exist.",
    level: "basic",
    codeExample: `-- Error 1507: Partition name must exist.`
  },
  {
    question: "Can an individual subpartition in a composite partitioned table be truncated?",
    shortAnswer: "**Yes**, MySQL 8.0 supports `ALTER TABLE table_name TRUNCATE SUBPARTITION p2025sp0;`, emptying that single subpartition file instantly without affecting other subpartitions.",
    explanation: "Provides granular data clearing at the subpartition level.",
    hint: "Yes, ALTER TABLE ... TRUNCATE SUBPARTITION empties a single subpartition file.",
    level: "intermediate",
    codeExample: `ALTER TABLE billing_ledger TRUNCATE SUBPARTITION p2025sp0;`
  },
  {
    question: "What is the recommended tool to automate rolling partition maintenance in cloud/container environments?",
    shortAnswer: "Using the **MySQL Event Scheduler (`CREATE EVENT`)** or automated Kubernetes/Cron sidecar scripts running a stored procedure like `sp_manage_rolling_partitions()` to execute `DROP` and `REORGANIZE` commands monthly.",
    explanation: "Guarantees automated hands-off partition lifecycle management.",
    hint: "MySQL Event Scheduler or Kubernetes cron sidecar executing stored procedures.",
    level: "basic",
    codeExample: `CREATE EVENT evt_monthly_partition_maintenance
ON SCHEDULE EVERY 1 MONTH
STARTS '2026-09-01 00:00:00'
DO
  CALL sp_maintain_monthly_partitions();`
  },
  {
    question: "What query verifies that all partitions are healthy and functioning in MySQL 8.0?",
    shortAnswer: "`CHECK TABLE sales_records;` or `SELECT PARTITION_NAME, TABLE_ROWS, DATA_LENGTH, CHECK_TIME FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'sales_records';`.",
    explanation: "Provides an instant status check across all partitions.",
    hint: "Run CHECK TABLE or query information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `CHECK TABLE sales_records;`
  },
  {
    question: "What is the primary operational takeaway of Topic 8 in Module 004_007?",
    shortAnswer: "Effective partition management relies on a complete operational toolkit: use **`DROP PARTITION`** for sub-5ms zero-lock data lifecycle purging, **`REORGANIZE PARTITION`** to split `p_future` for upcoming monthly additions, **`TRUNCATE PARTITION`** to empty buckets while preserving schemas, **`EXCHANGE PARTITION`** for sub-10ms ETL tablespace swaps, and **`OPTIMIZE / ANALYZE PARTITION`** for localized per-file maintenance, while always setting **`lock_wait_timeout`** to prevent metadata lock (`MDL`) queuing.",
    explanation: "Mastering partition management commands ensures DBAs maintain automated sliding-window lifecycle retention, defragment storage, and scale VLDB tables online with zero downtime.",
    hint: "Summarize ADD, DROP, TRUNCATE, REORGANIZE, EXCHANGE, OPTIMIZE, and MDL lock_wait_timeout safety.",
    level: "basic",
    codeExample: `-- Master Partition Management Runbook:
# 1. Purge oldest partition in 5ms:
ALTER TABLE enterprise_ledger DROP PARTITION p2023_01;

# 2. Add upcoming month online:
ALTER TABLE enterprise_ledger REORGANIZE PARTITION p_future INTO (
  PARTITION p2026_09 VALUES LESS THAN ('2026-10-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);

# 3. Swap staging data in 10ms:
ALTER TABLE enterprise_ledger EXCHANGE PARTITION p2026_09 WITH TABLE ledger_staging WITHOUT VALIDATION;

# 4. Defragment active partition:
ALTER TABLE enterprise_ledger OPTIMIZE PARTITION p2026_08;`
  }
];

export default questions;
