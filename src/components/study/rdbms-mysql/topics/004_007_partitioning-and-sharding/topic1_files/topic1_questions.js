// topic1_files/topic1_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 1: Partitioning Mechanics: How the Storage Engine Handles Partitioned Tables

const questions = [
  {
    question: "What is the `ha_partition` handler in MySQL and what is its role in table partitioning?",
    shortAnswer: "The `ha_partition` is a specialized **Storage Handler Proxy** inside the MySQL Server layer that intercepts SQL operations on partitioned tables, evaluates the partitioning expression, and delegates read/write operations to the appropriate underlying storage engine instances (`ha_innobase`).",
    explanation: "Acts as a traffic router between the MySQL SQL parser and individual partition tablespaces.",
    hint: "Proxy storage handler that routes SQL operations to individual partition storage engine handlers.",
    level: "basic",
    codeExample: `// SQL Query → ha_partition (Evaluates Partition Function) → ha_innobase (Target Partition)`
  },
  {
    question: "How does the storage engine process an `INSERT` statement into a partitioned table?",
    shortAnswer: "1. The SQL parser passes the row values to `ha_partition`; 2. `ha_partition` evaluates the partitioning expression (e.g. `YEAR(order_date)`) to determine the target partition ID $p_i$; 3. It invokes `ha_innobase::write_row()` on partition $p_i$'s dedicated InnoDB handler instance to write the row into `$table#p#p_i.ibd`.",
    explanation: "Directs new records straight to the correct physical file on disk.",
    hint: "Evaluates partition expression, identifies partition ID, and calls write_row on that partition's handler.",
    level: "intermediate",
    codeExample: `INSERT INTO sales_records (order_id, order_date, amount) VALUES (101, '2025-04-12', 4500.00);
-- ha_partition evaluates YEAR('2025-04-12') = 2025 → Writes to p2025.ibd`
  },
  {
    question: "What exact internal steps occur when an `UPDATE` modifies a row's partition key column to a value belonging to a different partition?",
    shortAnswer: "InnoDB executes an atomic **cross-partition row transfer**: 1. Reads the existing row and acquires an exclusive row lock; 2. Calls `delete_row()` on the original partition handler; 3. Calls `write_row()` on the target partition handler with new values; 4. Commits both operations atomically within the same transaction.",
    explanation: "Transparent to the user, but incurs higher lock and undo log overhead than a single-partition update.",
    hint: "Atomic delete from source partition followed by insert into destination partition within same transaction.",
    level: "expert",
    codeExample: `-- Changes partition from p2024 to p2025:
UPDATE sales_records SET order_date = '2025-02-01' WHERE order_id = 101;`
  },
  {
    question: "What physical file naming convention is used by InnoDB for partitioned tables on disk in MySQL 8.0?",
    shortAnswer: "Each partition is stored as an independent `.ibd` file named **`tableName#p#partitionName.ibd`** inside the database schema directory (e.g. `/var/lib/mysql/retail_db/orders#p#p2025.ibd`).",
    explanation: "Allows the operating system to manage, back up, and allocate disk space per partition independently.",
    hint: "tableName#p#partitionName.ibd inside the database directory.",
    level: "basic",
    codeExample: `# Directory listing in /var/lib/mysql/kolkata_bank:
# -rw-r----- 1 mysql mysql  15728640 Aug 25 15:30 accounts#p#p_north.ibd
# -rw-r----- 1 mysql mysql  18874368 Aug 25 15:30 accounts#p#p_south.ibd`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS cashiers processed ₹1.2 Crores in sales transactions. How did partition-level row locking allow cashier updates in `p2025` without blocking analytical queries reading `p2024`?",
    shortAnswer: "Because InnoDB row-level record locks (`X`/`S` locks) are stored in the buffer pool and associated with specific pages inside `pos_audit_logs#p#p2025.ibd`; analytical queries reading historical data in `pos_audit_logs#p#p2024.ibd` accessed completely independent physical pages with zero lock contention.",
    explanation: "Partition-level physical isolation enables high concurrent write throughput.",
    hint: "Row locks are isolated to the specific partition's pages, allowing concurrent access to other partitions.",
    level: "moderate",
    codeExample: `-- Cashier writes to p2025 while Accountant reads p2024 with ZERO lock wait!`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did the `open_files_limit` setting become critical after RANGE-partitioning 50 core tables into 100 monthly partitions each across ₹500 Crores in banking records?",
    shortAnswer: "Partitioning 50 tables into 100 partitions created $50 \times 100 = 5,000$ independent `.ibd` physical files; because MySQL opens file descriptors for each active partition tablespace, Debangshu had to increase `open_files_limit` to `65536` and `table_open_cache` to `10000` to prevent `Error 24: Too many open files` crashes.",
    explanation: "Partitioned tables multiply filesystem descriptor consumption.",
    hint: "Each partition is a separate .ibd file; requires increasing open_files_limit and table_open_cache.",
    level: "expert",
    codeExample: `[mysqld]
open_files_limit = 65536
table_open_cache = 10000
innodb_open_files = 10000`
  },
  {
    question: "Where is partition metadata stored in MySQL 8.0 vs legacy MySQL 5.7?",
    shortAnswer: "In MySQL 8.0, partition metadata is stored transactionally inside the unified **MySQL Data Dictionary (`mysql.ibd`)**; legacy `.par` (partition definition) and `.frm` files have been completely eliminated.",
    explanation: "Guarantees atomic, crash-safe DDL operations on partitioned tables.",
    hint: "Stored transactionally in the MySQL 8.0 Data Dictionary; legacy .par files are removed.",
    level: "intermediate",
    codeExample: `-- All partition metadata is crash-safe in mysql.ibd.`
  },
  {
    question: "What is `information_schema.PARTITIONS` and what critical columns should be monitored?",
    shortAnswer: "It provides real-time metadata for all partitioned tables; key columns to monitor are: `PARTITION_NAME`, `PARTITION_METHOD`, `PARTITION_EXPRESSION`, `TABLE_ROWS`, `DATA_LENGTH`, `INDEX_LENGTH`, and `DATA_FREE` (fragmentation).",
    explanation: "Enables programmatic health audits and data skew detection.",
    hint: "System catalog view showing TABLE_ROWS, DATA_LENGTH, and DATA_FREE per partition.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, PARTITION_METHOD, TABLE_ROWS, 
       ROUND(DATA_LENGTH / 1024 / 1024, 2) AS DATA_MB,
       ROUND(INDEX_LENGTH / 1024 / 1024, 2) AS INDEX_MB
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'bank_ledgers';`
  },
  {
    question: "How does the storage engine handle secondary indexes on a partitioned table in MySQL?",
    shortAnswer: "All secondary indexes in MySQL are **Local Partitioned Indexes**: every physical partition `.ibd` file contains its own independent secondary B-Tree index covering only the rows residing within that specific partition (MySQL does NOT support Global Indexes).",
    explanation: "Ensures index updates remain localized within a single partition file.",
    hint: "All secondary indexes are strictly Local Partitioned Indexes confined to each partition's .ibd file.",
    level: "intermediate",
    codeExample: `-- Local index: p2025.ibd has an idx_customer covering only 2025 orders.`
  },
  {
    question: "Why does the absence of Global Indexes in MySQL explain why all Unique Keys must include the partition column?",
    shortAnswer: "Because secondary indexes are strictly local to each partition `.ibd` file; if a unique key did not include the partition column, verifying uniqueness during an `INSERT` would require scanning all 100 partitions' local index trees, destroying write performance. Requiring the partition key allows the storage engine to enforce uniqueness locally within that single partition.",
    explanation: "The core architectural rationale behind Error 1503.",
    hint: "Enables enforcing uniqueness locally within the partition without checking all other partitions.",
    level: "expert",
    codeExample: `-- Local uniqueness enforcement requires partition key in unique constraint.`
  },
  {
    question: "What is `ha_partition::index_read_map()` and how is it used during query execution?",
    shortAnswer: "It is the internal C++ handler method called by the storage engine to look up a key in a partition's local B-Tree index; if pruning is active, it is invoked only on the matching partition handler; if unpruned, it is invoked sequentially across all partition handlers.",
    explanation: "The low-level index lookup entry point in MySQL handler architecture.",
    hint: "Internal handler method for performing indexed lookups on specific partition handlers.",
    level: "expert",
    codeExample: `// ha_partition routes index_read_map() to target ha_innobase instance.`
  },
  {
    question: "What happens when a query executes `SELECT ... ORDER BY col LIMIT 10` on an unpruned partitioned table?",
    shortAnswer: "The `ha_partition` handler reads the top 10 rows from **every individual partition handler**, buffers them in memory, and performs a multi-way **Priority Queue Merge Sort** to return the global top 10 rows to the client.",
    explanation: "Increases CPU and temporary memory consumption during unpruned sorted queries.",
    hint: "Reads top rows from every partition and performs a priority queue merge sort.",
    level: "expert",
    codeExample: `-- Multi-partition merge sort across p2023, p2024, p2025, p_future.`
  },
  {
    question: "What is `innodb_file_per_table`'s impact on table partitioning?",
    shortAnswer: "When `innodb_file_per_table = ON` (default), each partition is created as a distinct physical `.ibd` file on disk; if set to `OFF`, all partitions are stored inside the monolithic system tablespace (`ibdata1`), losing the ability to reclaim disk space via `DROP PARTITION`.",
    explanation: "`innodb_file_per_table = ON` is mandatory for effective partition storage management.",
    hint: "Mandatory for creating separate .ibd files per partition and reclaiming space on drop.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'innodb_file_per_table'; -- Must be ON`
  },
  {
    question: "What is `ALTER TABLE ... CHECK PARTITION p1` used for?",
    shortAnswer: "It instructs InnoDB to scan and verify the physical page integrity and B-Tree index structure of partition `p1`, reporting any block corruption or checksum errors without locking other partitions.",
    explanation: "Provides granular per-partition database health checks.",
    hint: "Verifies page integrity and B-Tree consistency for a specific partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records CHECK PARTITION p2025;`
  },
  {
    question: "What is `ALTER TABLE ... OPTIMIZE PARTITION p1` used for?",
    shortAnswer: "It rebuilds the physical `.ibd` tablespace for partition `p1` online, defragmenting clustered and secondary B-Tree pages and reclaiming unused free disk space (`DATA_FREE`) after heavy delete/update churn.",
    explanation: "Reclaims disk space without rebuilding the entire multi-gigabyte table.",
    hint: "Rebuilds and defragments a single partition to reclaim free disk space.",
    level: "intermediate",
    codeExample: `ALTER TABLE sales_records OPTIMIZE PARTITION p2024;`
  },
  {
    question: "What is `ALTER TABLE ... REPAIR PARTITION p1` in MySQL 8.0?",
    shortAnswer: "For InnoDB tables, `REPAIR PARTITION` is treated as a partition rebuild (similar to `OPTIMIZE PARTITION`), verifying and reconstructing index structures for that specific partition.",
    explanation: "InnoDB uses transactional crash recovery, so repair operations rebuild tablespaces.",
    hint: "Rebuilds and reconstructs index structures for the specified partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records REPAIR PARTITION p2024;`
  },
  {
    question: "What is `ALTER TABLE ... ANALYZE PARTITION p1` used for?",
    shortAnswer: "It samples index key distributions inside partition `p1`'s `.ibd` tablespace and updates index cardinality statistics in `mysql.innodb_index_stats`, helping the query optimizer generate accurate execution plans.",
    explanation: "Updates optimizer cardinality statistics for an individual partition.",
    hint: "Updates index statistics and cardinality for a single partition.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records ANALYZE PARTITION p2025;`
  },
  {
    question: "How does `ALTER TABLE ... EXCHANGE PARTITION` work at the storage engine level?",
    shortAnswer: "It **swaps the physical `.ibd` tablespace file** of a partitioned table's partition with a standalone non-partitioned table's `.ibd` file via metadata pointer swaps in **under 10 milliseconds**, enabling instant ETL data ingestion or historical archival.",
    explanation: "High-speed data interchange with zero row-by-row copying.",
    hint: "Swaps physical tablespace pointers between a partition and a standalone table in milliseconds.",
    level: "expert",
    codeExample: `ALTER TABLE sales_records EXCHANGE PARTITION p2024 WITH TABLE orders_2024_archive;`
  },
  {
    question: "What prerequisite is MANDATORY for `ALTER TABLE ... EXCHANGE PARTITION` to succeed?",
    shortAnswer: "The standalone table must have the **exact same table structure, column types, indexes, and storage engine (InnoDB)** as the partitioned table, must NOT be partitioned itself, and all rows in the standalone table must satisfy the partition's boundary rules.",
    explanation: "Guarantees schema symmetry before swapping tablespace pointers.",
    hint: "Identical schema, column types, indexes, storage engine, and row value compliance.",
    level: "expert",
    codeExample: `-- Standalone table must match partitioned table schema exactly.`
  },
  {
    question: "What is the difference between Subpartitioning by HASH vs KEY in storage mechanics?",
    shortAnswer: "`SUBPARTITION BY HASH` uses an explicit integer column or user SQL expression modulo the number of subpartitions; `SUBPARTITION BY KEY` uses MySQL internal hashing (based on MD5/password hash) on any column type (including `VARCHAR`, `UUID`, etc.) to distribute subpartitions.",
    explanation: "KEY subpartitioning handles non-integer column data types natively.",
    hint: "HASH uses integer modulo expressions; KEY uses MySQL internal hash supporting strings and UUIDs.",
    level: "intermediate",
    codeExample: `SUBPARTITION BY KEY (customer_uuid) SUBPARTITIONS 4`
  },
  {
    question: "What happens if an `INSERT` statement provides a row with a `NULL` value in the partitioning column?",
    shortAnswer: "Under `RANGE` partitioning, `NULL` is treated as **less than any non-NULL value**, and the row is automatically stored in the **lowest-valued partition** (e.g. `p0`). Under `LIST` partitioning, the row is rejected unless a partition explicitly lists `NULL` (e.g. `PARTITION p_null VALUES IN (NULL)`).",
    explanation: "Handles NULL values deterministically according to partitioning rules.",
    hint: "RANGE stores NULL in the lowest partition; LIST requires explicit VALUES IN (NULL).",
    level: "intermediate",
    codeExample: `PARTITION p_null VALUES IN (NULL)`
  },
  {
    question: "How does MySQL storage engine allocate Auto-Increment values on partitioned tables?",
    shortAnswer: "Auto-Increment allocation is managed globally at the table level in memory; successive `INSERT` operations receive monotonically increasing IDs regardless of which physical partition the row is routed to.",
    explanation: "Maintains globally unique sequential IDs across all physical partitions.",
    hint: "Auto-increment is managed globally at the table level across all partitions.",
    level: "basic",
    codeExample: `-- order_id increments globally: 1 (p2024), 2 (p2025), 3 (p2024), 4 (p2025)...`
  },
  {
    question: "Can an individual partition have its own unique index that does NOT exist on other partitions?",
    shortAnswer: "**No**, all partitions in a partitioned table share the **exact same table definition, column types, and index schema**; you cannot create an index on `p2025` that does not exist on `p2024`.",
    explanation: "Enforces homogeneous schema across all underlying physical storage files.",
    hint: "All partitions must share the identical index structure and column schema.",
    level: "basic",
    codeExample: `-- Schema changes apply to all partitions uniformly.`
  },
  {
    question: "What is `innodb_buffer_pool_size`'s relationship with partitioned tables during heavy OLTP operations?",
    shortAnswer: "Because each partition's clustered B-Tree is smaller, the active working set (e.g. current month partition) fits completely into the buffer pool RAM; dirty pages are flushed per tablespace, reducing checkpoint flushing pressure across unrelated cold historical partitions.",
    explanation: "Improves buffer pool caching efficiency and reduces I/O write amplification.",
    hint: "Active partition fits inside RAM, reducing dirty page flushing pressure on cold historical data.",
    level: "intermediate",
    codeExample: `[mysqld]
innodb_buffer_pool_size = 32G`
  },
  {
    question: "What is `FLUSH TABLES ... FOR EXPORT`'s behavior on partitioned tables?",
    shortAnswer: "It flushes dirty pages for all partitions to disk, locks the tables, and creates `.cfg` metadata files for **every individual partition**, allowing physical cold-backup extraction of specific partition `.ibd` files.",
    explanation: "Enables transportable tablespace exports for partitioned tables.",
    hint: "Flushes and creates .cfg metadata files for all partition tablespaces.",
    level: "expert",
    codeExample: `FLUSH TABLES sales_records FOR EXPORT;`
  },
  {
    question: "What happens if a disk failure corrupts only one partition `.ibd` file (e.g. `orders#p#p2022.ibd`)?",
    shortAnswer: "Only queries attempting to read from `p2022` will fail with an I/O error; queries accessing other healthy partitions (e.g. `p2025.ibd`) continue to execute normally with **zero downtime for current production operations**.",
    explanation: "Limits blast radius of storage block corruption to the affected partition file.",
    hint: "Isolates storage corruption: healthy partitions continue serving queries without downtime.",
    level: "intermediate",
    codeExample: `-- Corruption in p2022 does not stop active POS billing in p2025!`
  },
  {
    question: "How do you inspect the physical disk space used by each partition on the Linux filesystem?",
    shortAnswer: "Run `ls -lh /var/lib/mysql/<database_name>/<table_name>#p#*.ibd` or query `DATA_LENGTH` in `information_schema.PARTITIONS`.",
    explanation: "Provides instant filesystem-level verification of partition file sizes.",
    hint: "Check file sizes with ls -lh in the database data directory.",
    level: "basic",
    codeExample: `ls -lh /var/lib/mysql/kolkata_retail/sales_records#p#*.ibd`
  },
  {
    question: "Why does `TRUNCATE TABLE` on a partitioned table operate at line speed?",
    shortAnswer: "Because MySQL drops and recreates the physical `.ibd` files for every partition in metadata, taking milliseconds to reset a 500GB table without reading or deleting rows one by one.",
    explanation: "Instant table reset via filesystem recreation.",
    hint: "Recreates physical partition files in metadata instantly without scanning rows.",
    level: "basic",
    codeExample: `TRUNCATE TABLE sales_records;`
  },
  {
    question: "What is the primary operational takeaway of Topic 1 in Module 004_007?",
    shortAnswer: "Table partitioning is orchestrated by the **`ha_partition` proxy handler**, which evaluates the partition expression to route SQL operations to dedicated **`ha_innobase` instances** managing independent **`tableName#p#partitionName.ibd`** tablespaces; this delivers **partition-isolated row locking**, localized secondary indexes, and sub-10ms **`EXCHANGE PARTITION`** data swaps, but requires monitoring **`open_files_limit`** and sizing **`innodb_buffer_pool_size`** for active working partitions.",
    explanation: "Mastering storage engine partitioning mechanics enables DBAs to optimize physical I/O layout and manage high-concurrency VLDB tables with zero lock contention.",
    hint: "Summarize ha_partition proxy, .ibd file layout, local secondary indexes, cross-partition atomic updates, and file descriptor limits.",
    level: "basic",
    codeExample: `-- Master Storage Engine Partition Inspection:
SELECT PARTITION_NAME, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH 
FROM information_schema.PARTITIONS 
WHERE TABLE_SCHEMA = 'kolkata_bank' AND TABLE_NAME = 'ledger';`
  },
  {
    question: "How do you change the storage engine of a partitioned table (e.g. from MyISAM to InnoDB)?",
    shortAnswer: "Execute `ALTER TABLE table_name ENGINE = InnoDB;`; MySQL rebuilds all underlying physical partition files into InnoDB `.ibd` tablespaces online.",
    explanation: "Converts all partitions to the target storage engine uniformly.",
    hint: "Execute ALTER TABLE table_name ENGINE = InnoDB.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records ENGINE = InnoDB;`
  }
];

export default questions;
