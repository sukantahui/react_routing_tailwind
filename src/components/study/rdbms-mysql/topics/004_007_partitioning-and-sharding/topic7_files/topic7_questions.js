// topic7_files/topic7_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 7: Composite Partitioning (Subpartitioning): RANGE-HASH and LIST-KEY Subpartitions

const questions = [
  {
    question: "What is Composite Partitioning (Subpartitioning) in MySQL and what architectural problem does it solve?",
    shortAnswer: "Composite Partitioning is a two-tier data distribution strategy where a table is divided logically by a primary method (**`RANGE`** or **`LIST`**) along a high-level business dimension (e.g. Date or Region), and each primary partition is then further split physically into sub-buckets using **`HASH`** or **`KEY`** to balance write I/O across storage drives.",
    explanation: "Combines high-level lifecycle archiving with low-level write load balancing.",
    hint: "Two-tier partitioning: primary partition (RANGE/LIST) divided into secondary subpartitions (HASH/KEY).",
    level: "basic",
    codeExample: `CREATE TABLE billing_ledger (
  bill_id BIGINT NOT NULL,
  bill_date DATE NOT NULL,
  user_id INT NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (bill_id, bill_date, user_id)
) ENGINE = InnoDB
PARTITION BY RANGE (YEAR(bill_date))
SUBPARTITION BY HASH (user_id)
SUBPARTITIONS 4 (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "What subpartitioning methods are supported in MySQL 8.0?",
    shortAnswer: "MySQL 8.0 only supports **`HASH`**, **`KEY`**, **`LINEAR HASH`**, and **`LINEAR KEY`** as subpartitioning methods; it does **NOT** support subpartitioning by `RANGE` or `LIST` (e.g. RANGE-RANGE or LIST-LIST is illegal).",
    explanation: "Subpartitioning must always be a hashing algorithm in MySQL.",
    hint: "Only HASH, KEY, LINEAR HASH, and LINEAR KEY are valid subpartitioning methods.",
    level: "basic",
    codeExample: `-- Supported: RANGE-HASH, RANGE-KEY, LIST-HASH, LIST-KEY.`
  },
  {
    question: "How many physical `.ibd` tablespace files are created on disk for a table with 5 RANGE partitions and 4 HASH subpartitions?",
    shortAnswer: "A total of **20 physical `.ibd` files** ($5 \\times 4 = 20$), named in the format `tableName#p#primaryPartitionName#sp#subpartitionName.ibd`.",
    explanation: "Physical file count equals Primary Partitions multiplied by Subpartitions.",
    hint: "5 primary x 4 subpartitions = 20 individual .ibd physical files.",
    level: "basic",
    codeExample: `# Files on disk:
# billing_ledger#p#p2024#sp#p2024sp0.ibd
# billing_ledger#p#p2024#sp#p2024sp1.ibd
# ... up to 20 files!`
  },
  {
    question: "What is 'Full Two-Dimensional (2D) Partition Pruning' and how is it achieved?",
    shortAnswer: "When a query's `WHERE` clause filters on **both the primary partition column (e.g. `bill_date`) and the subpartition column (e.g. `user_id`)**, MySQL prunes the search space across both axes, opening and scanning **exactly ONE single physical `.ibd` subpartition file on disk** (skipping 95%+ of all files).",
    explanation: "The ultimate query optimization path for composite partitioned tables.",
    hint: "Filtering on both primary and subpartition keys prunes to a single physical subpartition file.",
    level: "intermediate",
    codeExample: `EXPLAIN SELECT * FROM billing_ledger WHERE bill_date = '2025-06-15' AND user_id = 105;
-- partitions: p2025_p2025sp1 (Reads only 1 single subpartition file!)`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS sales reached 60,000,000 invoices across ₹1.2 Crores in inventory. Why did Susmita configure RANGE-HASH composite partitioning with `YEAR(order_date)` and `HASH(cashier_id) SUBPARTITIONS 4`?",
    shortAnswer: "The primary RANGE partition allowed Susmita to instantly drop 3-year-old historical data in 5ms (`DROP PARTITION p2022`), while the secondary HASH subpartitions distributed concurrent POS cashier writes across 4 separate disk files, eliminating disk write head queue contention during peak shopping hours.",
    explanation: "Combined sub-millisecond data lifecycle pruning with parallel cashier write throughput.",
    hint: "RANGE enabled instant yearly drops; HASH distributed cashier writes across 4 disk files.",
    level: "moderate",
    codeExample: `# Barrackpore Composite Architecture:
PARTITION BY RANGE (YEAR(order_date))
SUBPARTITION BY HASH (cashier_id)
SUBPARTITIONS 4 (...)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, corporate accounts supported multi-tenant banking across ₹500 Crores in volume. Why did Debangshu implement LIST-KEY composite partitioning?",
    shortAnswer: "The primary `LIST COLUMNS (region)` separated account records into distinct regional legal compliance boundaries (Bengal, Delhi, Mumbai), while secondary `KEY (account_uuid) SUBPARTITIONS 8` evenly balanced millions of random UUID client accounts across 8 NVMe storage threads in each region.",
    explanation: "Achieved regulatory regional data tiering combined with scalable UUID hash balancing.",
    hint: "LIST provided regional compliance boundaries; KEY provided UUID load balancing.",
    level: "expert",
    codeExample: `PARTITION BY LIST COLUMNS (region_name)
SUBPARTITION BY KEY (account_uuid)
SUBPARTITIONS 8 (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore'),
  PARTITION p_delhi  VALUES IN ('New Delhi', 'Noida')
);`
  },
  {
    question: "What is the mandatory Primary Key and Unique Key rule for Composite Partitioned tables in MySQL?",
    shortAnswer: "**Every Primary Key and Unique Key MUST contain ALL columns used in BOTH the primary partitioning expression and the subpartitioning expression**; if a table partitions by RANGE on `order_date` and subpartitions by HASH on `user_id`, the Primary Key must contain `(id, order_date, user_id)`.",
    explanation: "Enables local uniqueness verification within each subpartition without cross-file locks.",
    hint: "Every unique key must include both the primary partition column and subpartition column.",
    level: "expert",
    codeExample: `-- Correct: Primary Key includes both order_date and user_id:
PRIMARY KEY (order_id, order_date, user_id)`
  },
  {
    question: "What happens during query execution if a query filters on the primary partition key (`WHERE bill_date = '2025-06-15'`) but OMITS the subpartition key?",
    shortAnswer: "MySQL achieves **1D Primary Pruning**: it skips all other yearly partitions and reads **only the 4 subpartition files belonging to `p2025`** (e.g. `p2025sp0`, `p2025sp1`, `p2025sp2`, `p2025sp3`), skipping all other years.",
    explanation: "Still reduces the query search space by the primary partition fraction.",
    hint: "Prunes to all subpartitions within that single primary partition.",
    level: "intermediate",
    codeExample: `EXPLAIN SELECT * FROM billing_ledger WHERE bill_date = '2025-06-15';
-- partitions: p2025_p2025sp0, p2025_p2025sp1, p2025_p2025sp2, p2025_p2025sp3`
  },
  {
    question: "What happens during query execution if a query filters on the subpartition key (`WHERE user_id = 105`) but OMITS the primary partition key?",
    shortAnswer: "MySQL achieves **1D Subpartition Pruning**: it calculates `MOD(105, 4) = 1` and reads **subpartition index 1 across ALL primary partitions** (e.g. reads `p2024sp1`, `p2025sp1`, `p2026sp1`), reducing disk reads by $75\\%$ compared to a full table scan.",
    explanation: "Demonstrates vertical pruning across subpartition columns.",
    hint: "Prunes that specific subpartition across all primary partitions, reducing I/O by 1/N.",
    level: "expert",
    codeExample: `EXPLAIN SELECT * FROM billing_ledger WHERE user_id = 105;
-- partitions: p2024_p2024sp1, p2025_p2025sp1, p2026_p2026sp1`
  },
  {
    question: "What is the difference between Anonymous Subpartitioning and Explicit Named Subpartitioning?",
    shortAnswer: "**Anonymous Subpartitioning** defines `SUBPARTITIONS N` globally and lets MySQL generate subpartition names automatically (`p0sp0`, `p0sp1`); **Explicit Named Subpartitioning** defines each subpartition explicitly within every partition block, allowing custom names and individual `DATA DIRECTORY` paths per subpartition.",
    explanation: "Explicit naming enables fine-grained storage placement on distinct disk drives.",
    hint: "Anonymous uses SUBPARTITIONS N; Explicit defines each subpartition block with custom names and storage paths.",
    level: "intermediate",
    codeExample: `-- Explicit Subpartition Naming:
PARTITION p2025 VALUES LESS THAN (2026) (
  SUBPARTITION p2025_sp0 DATA DIRECTORY = '/mnt/nvme1',
  SUBPARTITION p2025_sp1 DATA DIRECTORY = '/mnt/nvme2'
)`
  },
  {
    question: "If you define explicit subpartitions on one partition, must you define them on ALL partitions?",
    shortAnswer: "**Yes**, in MySQL 8.0, if explicit subpartitions are defined on any single partition, they **MUST be defined explicitly on every partition** across the entire table, and each partition must have the exact same number of subpartitions.",
    explanation: "Enforces homogeneous physical topology across all primary partitions.",
    hint: "Yes, explicit subpartitions must be defined across all partitions with identical counts.",
    level: "expert",
    codeExample: `-- All partitions must define the identical number of subpartition blocks.`
  },
  {
    question: "What happens when you execute `ALTER TABLE table DROP PARTITION p2024;` on a composite partitioned table?",
    shortAnswer: "MySQL unlinks and **permanently deletes all 4 subpartition `.ibd` files** (`p2024sp0.ibd`, `p2024sp1.ibd`, `p2024sp2.ibd`, `p2024sp3.ibd`) in **under 5 milliseconds**, deleting all data stored for that year with zero undo log overhead.",
    explanation: "Drops the entire primary partition and all its underlying subpartitions atomically.",
    hint: "Deletes all underlying subpartition files for that primary partition in milliseconds.",
    level: "basic",
    codeExample: `ALTER TABLE billing_ledger DROP PARTITION p2024;`
  },
  {
    question: "Can an individual subpartition (e.g. `p2025sp0`) be dropped independently using `DROP PARTITION`?",
    shortAnswer: "**No**, individual subpartitions cannot be dropped; you can only drop the parent primary partition (`p2025`), which drops all its subpartitions together.",
    explanation: "Subpartitions maintain symmetric bucket cardinality across all primary partitions.",
    hint: "Individual subpartitions cannot be dropped independently.",
    level: "intermediate",
    codeExample: `-- DROP SUBPARTITION is illegal in MySQL.`
  },
  {
    question: "How do you inspect composite subpartitions in `information_schema.PARTITIONS`?",
    shortAnswer: "Query `SELECT PARTITION_NAME, SUBPARTITION_NAME, SUBPARTITION_METHOD, TABLE_ROWS FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'billing_ledger';`.",
    explanation: "Displays row counts and storage metrics for every individual subpartition.",
    hint: "Query SUBPARTITION_NAME and SUBPARTITION_METHOD in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, SUBPARTITION_NAME, SUBPARTITION_METHOD, TABLE_ROWS, DATA_LENGTH 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'billing_ledger';`
  },
  {
    question: "What is `ALTER TABLE ... TRUNCATE PARTITION p2025`'s behavior on a composite partitioned table?",
    shortAnswer: "It deletes all rows across all subpartitions of `p2025` instantly while keeping the partition and subpartition structures intact in the schema.",
    explanation: "Empties an entire primary partition and all its subpartitions.",
    hint: "Empties all subpartitions belonging to the specified primary partition.",
    level: "basic",
    codeExample: `ALTER TABLE billing_ledger TRUNCATE PARTITION p2025;`
  },
  {
    question: "Can you use `EXCHANGE PARTITION` on an individual subpartition of a composite table?",
    shortAnswer: "**Yes**, MySQL 8.0 supports **`ALTER TABLE table EXCHANGE SUBPARTITION p2025sp0 WITH TABLE staging_table;`**, swapping a single physical subpartition tablespace with a standalone table in milliseconds.",
    explanation: "High-speed data interchange for fine-grained subpartition buckets.",
    hint: "Yes, ALTER TABLE ... EXCHANGE SUBPARTITION swaps a single subpartition with a standalone table.",
    level: "expert",
    codeExample: `ALTER TABLE billing_ledger EXCHANGE SUBPARTITION p2025sp0 WITH TABLE user_101_staging;`
  },
  {
    question: "What is the maximum allowed total subpartition count per table in MySQL 8.0?",
    shortAnswer: "The total number of subpartitions (calculated as $\\text{Primary Partitions} \\times \\text{Subpartitions}$) cannot exceed **8,192**.",
    explanation: "Example: 100 primary partitions with 8 subpartitions each = 800 total subpartitions (well within the 8,192 limit).",
    hint: "Total primary x subpartitions cannot exceed 8,192.",
    level: "basic",
    codeExample: `-- Maximum 8192 total subpartition files per table.`
  },
  {
    question: "Why should subpartition counts always be chosen as powers of two (2, 4, 8, 16)?",
    shortAnswer: "Because both standard modulo math on binary CPUs and the LINEAR HASH/KEY bitwise algorithms achieve their **most statistically balanced data distribution with zero skew when $N$ is a power of 2**.",
    explanation: "Guarantees that all subpartition `.ibd` files remain roughly equal in size.",
    hint: "Powers of two (4, 8, 16) maximize hash entropy and eliminate storage skew.",
    level: "intermediate",
    codeExample: `-- Recommended: SUBPARTITIONS 4, 8, or 16.`
  },
  {
    question: "What happens if an `UPDATE` changes a row's `bill_date` from `2024-12-31` to `2025-01-01` and `user_id` from `101` to `102`?",
    shortAnswer: "InnoDB executes an atomic **2-dimensional cross-subpartition row transfer**: deletes the row from `p2024sp1.ibd` and inserts it into `p2025sp2.ibd` within the same transaction.",
    explanation: "Automatic cross-file row relocation managed transparently by the storage engine.",
    hint: "Atomically deletes from source subpartition and inserts into destination subpartition.",
    level: "expert",
    codeExample: `UPDATE billing_ledger SET bill_date = '2025-01-01', user_id = 102 WHERE bill_id = 5001;`
  },
  {
    question: "How does composite partitioning affect memory buffer pool allocation in InnoDB?",
    shortAnswer: "Queries targeting specific dates and users load only the targeted subpartition B-Tree pages into `innodb_buffer_pool_size`, keeping hot active working sets compact and memory hit ratios high (>99%).",
    explanation: "Concentrates memory caching on ultra-compact subpartition trees.",
    hint: "Loads only targeted subpartition pages into RAM, maximizing cache efficiency.",
    level: "intermediate",
    codeExample: `-- 2D pruned query loads only 50MB subpartition B-Tree into RAM.`
  },
  {
    question: "Can `LIST-HASH` composite partitioning be used to balance multi-tenant SaaS workloads?",
    shortAnswer: "**Yes**, partitioning by `LIST COLUMNS (tenant_id)` keeps each tenant in its own regional partition, while `SUBPARTITION BY HASH (customer_id) SUBPARTITIONS 8` distributes that tenant's high-volume customer records across 8 storage buckets.",
    explanation: "The architectural gold standard for large-scale multi-tenant enterprise applications.",
    hint: "Yes, isolates tenants via LIST and balances customer write traffic via HASH subpartitions.",
    level: "basic",
    codeExample: `PARTITION BY LIST COLUMNS (tenant_id)
SUBPARTITION BY HASH (customer_id)
SUBPARTITIONS 8 (...)`
  },
  {
    question: "What happens if a subpartitioning expression returns `NULL`?",
    shortAnswer: "For `SUBPARTITION BY HASH`, `NULL` is evaluated as `0` and the row is routed to **Subpartition 0 (`sp0`)**; for `SUBPARTITION BY KEY`, the internal hash function routes `NULL` deterministically to `sp0`.",
    explanation: "Ensures deterministic placement of NULL subpartition keys.",
    hint: "NULL values route to Subpartition 0 (sp0).",
    level: "basic",
    codeExample: `-- user_id = NULL routes to Subpartition 0 (sp0).`
  },
  {
    question: "What is `ALTER TABLE ... REORGANIZE PARTITION`'s behavior on composite partitioned tables?",
    shortAnswer: "When splitting or reorganizing primary partitions (e.g. splitting `p_future`), MySQL creates the new primary partitions along with their **complete complement of subpartitions** and redistributes data automatically.",
    explanation: "Maintains symmetric subpartition topology during online lifecycle expansions.",
    hint: "Reorganizes primary partitions while automatically constructing all child subpartitions.",
    level: "expert",
    codeExample: `ALTER TABLE billing_ledger REORGANIZE PARTITION p_future INTO (
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How does `ALTER TABLE ... OPTIMIZE PARTITION p2025` affect subpartitions?",
    shortAnswer: "InnoDB rebuilds and defragments **all subpartitions belonging to `p2025`** online, reclaiming unused disk space across all 4 subpartition `.ibd` files.",
    explanation: "Reclaims storage space across all subpartitions of the specified primary partition.",
    hint: "Rebuilds and defragments all subpartitions within the specified primary partition.",
    level: "basic",
    codeExample: `ALTER TABLE billing_ledger OPTIMIZE PARTITION p2025;`
  },
  {
    question: "What is the impact of Composite Partitioning on `open_files_limit`?",
    shortAnswer: "Because each subpartition is an independent physical `.ibd` file on disk, a composite table with 50 primary partitions and 8 subpartitions creates $50 \\times 8 = 400$ physical files; DBAs must ensure `open_files_limit` and `table_open_cache` are sized appropriately.",
    explanation: "Filesystem descriptors multiply with composite partitioning.",
    hint: "Multiplies physical .ibd files on disk, requiring higher open_files_limit in my.cnf.",
    level: "intermediate",
    codeExample: `[mysqld]
open_files_limit = 65536
table_open_cache = 10000`
  },
  {
    question: "Can secondary indexes be defined specifically on a subpartition?",
    shortAnswer: "**No**, secondary indexes are defined at the table level and are automatically instantiated as **Local Indexes inside every single physical subpartition `.ibd` file**.",
    explanation: "All subpartitions share the identical index and column schema.",
    hint: "Secondary indexes are automatically created locally inside every subpartition file.",
    level: "basic",
    codeExample: `-- Index idx_user is created locally inside all 20 subpartition .ibd files.`
  },
  {
    question: "How does `EXPLAIN FORMAT=JSON` display composite partition execution plans?",
    shortAnswer: "The `partitions` array lists the exact composite subpartition names evaluated by the query (e.g. `\"partitions\": [\"p2025_p2025sp1\"]`), confirming that 2D pruning is active.",
    explanation: "Provides machine-readable verification of 2D partition pruning.",
    hint: "Lists exact subpartition names in the JSON partitions array.",
    level: "basic",
    codeExample: `EXPLAIN FORMAT=JSON SELECT * FROM billing_ledger WHERE bill_date = '2025-05-01' AND user_id = 105;`
  },
  {
    question: "Why should you avoid defining excessive subpartition counts (e.g. 64 subpartitions per month across 10 years)?",
    shortAnswer: "Because $120 \\times 64 = 7,680$ physical files creates severe metadata locking (`MDL`) latency, exhausts operating system file descriptor limits, and degrades unpruned query performance due to thousands of file iterator handles.",
    explanation: "Best practice: Keep total subpartition counts per table between 20 and 200.",
    hint: "Causes file descriptor exhaustion and query planning latency on unpruned queries.",
    level: "intermediate",
    codeExample: `-- Avoid excessive file multiplication: Keep total subpartitions under 200.`
  },
  {
    question: "How do you remove subpartitioning from a table?",
    shortAnswer: "Execute **`ALTER TABLE table_name REMOVE PARTITIONING;`** to convert the entire table back to a single monolithic tablespace, or redefine the table with primary-only partitioning using `ALTER TABLE ... PARTITION BY RANGE (...)`.",
    explanation: "Reorganizes all subpartition files back into standard storage.",
    hint: "Use ALTER TABLE table REMOVE PARTITIONING.",
    level: "basic",
    codeExample: `ALTER TABLE billing_ledger REMOVE PARTITIONING;`
  },
  {
    question: "What is the primary operational takeaway of Topic 7 in Module 004_007?",
    shortAnswer: "Composite Partitioning (Subpartitioning) delivers two-tier physical data division by combining **`RANGE` or `LIST` primary partitioning** (for business lifecycle and regional management) with **`HASH` or `KEY` subpartitioning** (for write I/O distribution and concurrency); it enables **Full Two-Dimensional (2D) Pruning** to scan a single `.ibd` subpartition file, sub-5ms **`DROP PARTITION`** historical purges, and sub-10ms **`EXCHANGE SUBPARTITION`** swaps, but requires including both primary and subpartition keys in all **Unique/Primary Keys**.",
    explanation: "Mastering composite partitioning allows enterprise architects to build multi-dimensional VLDB systems with scalable write throughput and instant lifecycle maintenance.",
    hint: "Summarize two-tier division (RANGE-HASH, LIST-KEY), 2D pruning, instant drop of primary partitions, and primary key composite requirements.",
    level: "basic",
    codeExample: `-- Master Composite Subpartitioning Blueprint:
CREATE TABLE enterprise_financial_ledger (
  txn_id BIGINT NOT NULL,
  txn_date DATE NOT NULL,
  account_uuid VARCHAR(36) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (txn_id, txn_date, account_uuid)
) ENGINE = InnoDB
PARTITION BY RANGE COLUMNS (txn_date)
SUBPARTITION BY KEY (account_uuid)
SUBPARTITIONS 4 (
  PARTITION p2025_q1 VALUES LESS THAN ('2025-04-01'),
  PARTITION p2025_q2 VALUES LESS THAN ('2025-07-01'),
  PARTITION p2025_q3 VALUES LESS THAN ('2025-10-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);

-- Full 2D Pruned Query:
SELECT * FROM enterprise_financial_ledger 
WHERE txn_date = '2025-05-15' AND account_uuid = '3e11fa47-0b1a-4f5e-8b9a-123456789abc';`
  }
];

export default questions;
