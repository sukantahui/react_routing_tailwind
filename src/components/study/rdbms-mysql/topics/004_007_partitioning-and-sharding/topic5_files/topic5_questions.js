// topic5_files/topic5_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 5: HASH Partitioning & LINEAR HASH: Distributing Rows Evenly across Fixed Buckets

const questions = [
  {
    question: "What is HASH Partitioning in MySQL and when is it most effectively used?",
    shortAnswer: "HASH Partitioning distributes rows evenly across a **fixed number of physical partitions** based on a user-defined SQL expression returning an integer; it is ideal when data lacks natural date ranges or discrete categories and needs to be evenly spread across multiple disk files to eliminate write hot spots.",
    explanation: "Provides uniform pseudorandom data distribution without artificial business logic boundaries.",
    hint: "Distributes rows evenly across fixed buckets based on an integer hashing expression.",
    level: "basic",
    codeExample: `CREATE TABLE user_logs (
  log_id BIGINT NOT NULL,
  user_id INT NOT NULL,
  message TEXT,
  PRIMARY KEY (log_id, user_id)
) ENGINE = InnoDB
PARTITION BY HASH (user_id)
PARTITIONS 4;`
  },
  {
    question: "What mathematical formula does Standard HASH partitioning use to determine the target partition ID?",
    shortAnswer: "It uses the **Modulo (Remainder) Algorithm**: $\\text{Partition ID} = \\text{MOD}(|\\text{expr}|, N)$, where $\\text{expr}$ is the user integer expression and $N$ is the total number of partitions (numbered $0$ to $N-1$).",
    explanation: "Guarantees mathematically uniform distribution across all $N$ partition files.",
    hint: "Partition ID = MOD(ABS(expr), N).",
    level: "basic",
    codeExample: `-- If user_id = 105 and PARTITIONS 4: MOD(105, 4) = 1 -> Routes to Partition 1 (p1).`
  },
  {
    question: "What is LINEAR HASH Partitioning and what mathematical algorithm powers it?",
    shortAnswer: "LINEAR HASH is an advanced hashing method based on a **linear powers-of-two bitwise algorithm**: it finds the smallest power of 2 ($P \\ge N$), calculates $V = F(\\text{expr})$, sets $\\text{Partition ID} = V \\ \\& \\ (P - 1)$; if $\\text{Partition ID} \\ge N$, it sets $\\text{Partition ID} = V \\ \\& \\ ((P/2) - 1)$.",
    explanation: "Minimizes data movement during partition addition and reduction.",
    hint: "Powers-of-two bitwise algorithm enabling low-overhead partition resizing.",
    level: "expert",
    codeExample: `CREATE TABLE sensor_readings (
  reading_id BIGINT NOT NULL,
  sensor_id INT NOT NULL,
  reading_val DOUBLE,
  PRIMARY KEY (reading_id, sensor_id)
) ENGINE = InnoDB
PARTITION BY LINEAR HASH (sensor_id)
PARTITIONS 8;`
  },
  {
    question: "Why is adding a partition to a Standard HASH partitioned table an extremely heavy operation on large datasets?",
    shortAnswer: "Because changing the divisor $N$ in $\\text{MOD}(\\text{expr}, N)$ changes the target partition for **nearly 100% of all existing rows in the entire table**, forcing MySQL to read, delete, and redistribute virtually every row across all `.ibd` files.",
    explanation: "Standard HASH resizing causes massive disk I/O churn on multi-gigabyte tables.",
    hint: "Changing N in MOD(expr, N) redistributes almost all rows across the entire table.",
    level: "intermediate",
    codeExample: `-- Changing from 4 to 5 partitions redistributes ~100% of existing rows!`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, customer session tokens scaled across ₹1.2 Crores in sales transactions. Why did Susmita choose `LINEAR HASH` instead of Standard `HASH` when provisioning 4 initial partitions?",
    shortAnswer: "Because Susmita anticipated scaling the cluster to 8 partitions during Diwali peak sales; with `LINEAR HASH`, adding partitions only split and moved rows from the single affected partition ($1/N$ data movement), whereas standard HASH would have locked the entire 50-million row table to redistribute all rows.",
    explanation: "LINEAR HASH enabled zero-downtime partition expansion during high-traffic festivals.",
    hint: "LINEAR HASH only moves 1/N rows during partition additions, avoiding full table reorganization.",
    level: "moderate",
    codeExample: `# Barrackpore Fast Partition Scaling:
ALTER TABLE customer_sessions ADD PARTITION PARTITIONS 4;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, IoT ATM telemetry scaled to 500,000,000 rows across ₹500 Crores in volume. Why did Debangshu size LINEAR HASH partition counts as powers of two (8, 16, 32)?",
    shortAnswer: "Because the LINEAR HASH algorithm achieves its **most statistically uniform data distribution when the partition count $N$ is an exact power of 2 ($2^k$)**; non-power-of-two counts create slight data skew where lower-indexed partitions hold twice as many rows as higher-indexed partitions.",
    explanation: "Power-of-two partition sizing guarantees perfectly balanced storage file sizes in LINEAR HASH.",
    hint: "Exact powers of 2 (4, 8, 16, 32) eliminate data skew in LINEAR HASH.",
    level: "expert",
    codeExample: `-- Recommended LINEAR HASH Partition Counts: 4, 8, 16, 32, 64.`
  },
  {
    question: "How do you add 2 new partitions to a HASH partitioned table in MySQL?",
    shortAnswer: "Execute **`ALTER TABLE table_name ADD PARTITION PARTITIONS 2;`**; MySQL increments the partition count by 2 and redistributes the corresponding rows.",
    explanation: "Increases total partition count dynamically.",
    hint: "ALTER TABLE table ADD PARTITION PARTITIONS N.",
    level: "basic",
    codeExample: `ALTER TABLE user_logs ADD PARTITION PARTITIONS 2;`
  },
  {
    question: "How do you reduce the partition count of a HASH partitioned table in MySQL?",
    shortAnswer: "Execute **`ALTER TABLE table_name COALESCE PARTITION 2;`**; MySQL merges data from 2 partitions into the remaining partitions (e.g. reducing partition count from 6 to 4).",
    explanation: "`COALESCE PARTITION` is the exclusive method for reducing HASH and KEY partition counts.",
    hint: "ALTER TABLE table COALESCE PARTITION N (where N is the number of partitions to remove).",
    level: "intermediate",
    codeExample: `ALTER TABLE user_logs COALESCE PARTITION 2;`
  },
  {
    question: "Does Partition Pruning work for range queries (`WHERE id BETWEEN 100 AND 200`) on a HASH partitioned table?",
    shortAnswer: "**No**, HASH partitioning does NOT support range pruning; because consecutive integer IDs are scattered pseudorandomly across different modulo buckets, MySQL must execute a full scan across **every single physical partition**.",
    explanation: "HASH partitioning is designed for point queries (`=`), not range scans.",
    hint: "No, range queries cannot prune HASH partitions because consecutive IDs are scattered across all buckets.",
    level: "intermediate",
    codeExample: `-- Scans ALL partitions (Scatter-Gather):
SELECT * FROM user_logs WHERE user_id BETWEEN 100 AND 200;`
  },
  {
    question: "What types of query predicates DO trigger Partition Pruning on HASH partitioned tables?",
    shortAnswer: "1. Exact equality lookups (**`WHERE user_id = 105`**); 2. Set membership lists (**`WHERE user_id IN (101, 105, 204)`**); 3. Equality joins on the partition column.",
    explanation: "The optimizer calculates `MOD(105, N)` and accesses only the single matching partition.",
    hint: "Exact equality (=) and IN lists prune HASH partitions.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM user_logs WHERE user_id = 105;
-- partitions: p1 (Only 1 partition read!)`
  },
  {
    question: "What is the requirement for the expression inside `PARTITION BY HASH (expr)`?",
    shortAnswer: "The expression **MUST return a deterministic non-constant integer** (e.g. `user_id`, `YEAR(date_col)`, `CRC32(uuid)`), and cannot contain subqueries, non-deterministic functions, or column references outside the table.",
    explanation: "Enables mathematical modulo evaluation for each row.",
    hint: "Must return a deterministic non-constant integer.",
    level: "basic",
    codeExample: `PARTITION BY HASH (YEAR(created_at)) PARTITIONS 4`
  },
  {
    question: "Can `VARCHAR` or string columns be used directly in `PARTITION BY HASH`?",
    shortAnswer: "**Not directly in standard HASH** (which requires integer-returning functions like `CRC32(str)` or `ASCII(str)`), but **YES in `PARTITION BY KEY`**, which natively hashes strings using MySQL internal hashing.",
    explanation: "Use `KEY` partitioning for direct string hashing.",
    hint: "Requires wrapping in integer functions like CRC32() or using KEY partitioning.",
    level: "intermediate",
    codeExample: `PARTITION BY HASH (CRC32(email_address)) PARTITIONS 8`
  },
  {
    question: "How does HASH partitioning distribute rows when the partitioning column contains `NULL` values?",
    shortAnswer: "`NULL` is evaluated as **`0`** by the hashing function, and the row is routed to **Partition 0 (`p0`)**.",
    explanation: "Handles NULL values deterministically without insert errors.",
    hint: "NULL is treated as 0 and stored in Partition 0 (p0).",
    level: "basic",
    codeExample: `-- Row with user_id = NULL routes to Partition 0 (p0).`
  },
  {
    question: "What happens if you execute `ALTER TABLE ... DROP PARTITION` on a HASH partitioned table?",
    shortAnswer: "MySQL rejects the command with `ERROR 1506 (HY000): DROP PARTITION can only be used on RANGE/LIST partitions`; you must use **`COALESCE PARTITION`** to reduce partition counts safely without losing row data.",
    explanation: "HASH partitions cannot be dropped individually because data is mathematically distributed across all buckets.",
    hint: "DROP PARTITION is illegal on HASH tables; use COALESCE PARTITION instead.",
    level: "intermediate",
    codeExample: `-- DROP PARTITION p1 fails; use COALESCE PARTITION 1 instead.`
  },
  {
    question: "What happens if a HASH partitioned table defines no partition count (e.g. `PARTITION BY HASH (user_id);`)?",
    shortAnswer: "MySQL defaults to creating exactly **1 partition** (`PARTITIONS 1`).",
    explanation: "Always explicitly declare the partition count (e.g. `PARTITIONS 8`).",
    hint: "Defaults to 1 partition if count is omitted.",
    level: "basic",
    codeExample: `-- Always specify explicit partition count: PARTITIONS 8`
  },
  {
    question: "How does `ALTER TABLE ... TRUNCATE PARTITION p1` behave on a HASH partitioned table?",
    shortAnswer: "It deletes all rows that hash to partition `p1` instantly while retaining the partition structure and leaving rows in all other partitions intact.",
    explanation: "Empties a single hash bucket without affecting other partitions.",
    hint: "Deletes all rows stored in the specified hash bucket.",
    level: "intermediate",
    codeExample: `ALTER TABLE user_logs TRUNCATE PARTITION p1;`
  },
  {
    question: "What is `information_schema.PARTITIONS`'s `PARTITION_ORDINAL_POSITION` in HASH partitioning?",
    shortAnswer: "An integer indicating the 1-indexed physical position of the partition (from 1 up to $N$), corresponding to partition names `p0`, `p1`, `p2`, ..., `p(N-1)`.",
    explanation: "Used for programmatic partition inventory and inspection.",
    hint: "1-indexed numeric position of the partition within the table.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, PARTITION_ORDINAL_POSITION, TABLE_ROWS 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'user_logs';`
  },
  {
    question: "Can an `AUTO_INCREMENT` column be used as the partition key in `PARTITION BY HASH`?",
    shortAnswer: "**Yes**, partitioning an auto-incrementing Primary Key by HASH evenly distributes successive inserts across all physical `.ibd` files in round-robin fashion, eliminating concurrent I/O bottlenecks on disk.",
    explanation: "The standard pattern for high-throughput write-heavy logging tables.",
    hint: "Yes, auto-increment columns can be hashed to distribute write I/O across disk files.",
    level: "basic",
    codeExample: `CREATE TABLE event_stream (
  event_id BIGINT NOT NULL AUTO_INCREMENT,
  payload JSON,
  PRIMARY KEY (event_id)
) PARTITION BY HASH (event_id) PARTITIONS 8;`
  },
  {
    question: "What happens if a user-defined hashing expression returns a negative integer (e.g. `-105`)?",
    shortAnswer: "MySQL takes the **absolute value** of the expression before applying modulo: $\\text{MOD}(|-105|, 4) = 1$, routing the row deterministically to Partition 1.",
    explanation: "Prevents negative array index errors in internal partition routing.",
    hint: "MySQL takes the absolute value before applying modulo.",
    level: "basic",
    codeExample: `-- -105 -> ABS(-105) = 105 -> MOD(105, 4) = 1 (routes to p1).`
  },
  {
    question: "How do you detect Data Skew across partitions in a HASH partitioned table?",
    shortAnswer: "Query `SELECT PARTITION_NAME, TABLE_ROWS FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'user_logs';`; if one partition has significantly more rows than others, the hashing expression lacks sufficient cardinality or entropy.",
    explanation: "Ensures that data is distributed evenly across all physical files.",
    hint: "Compare TABLE_ROWS across all partitions in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, TABLE_ROWS 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'user_logs';`
  },
  {
    question: "What is the impact of HASH partitioning on `INSERT ... SELECT` batch operations?",
    shortAnswer: "`ha_partition` evaluates the hashing function for each incoming row and distributes rows across all partition buffer pools in parallel, speeding up bulk load operations by utilizing multiple storage engine threads.",
    explanation: "Improves parallel write throughput during large data migrations.",
    hint: "Distributes rows across all partition tablespaces, improving parallel write throughput.",
    level: "intermediate",
    codeExample: `INSERT INTO user_logs SELECT * FROM staging_logs;`
  },
  {
    question: "What happens if an `UPDATE` statement modifies the column used in `PARTITION BY HASH`?",
    shortAnswer: "If the new value produces a different hash modulo, InnoDB deletes the row from the old partition `.ibd` file and inserts it into the new partition `.ibd` file atomically within the same transaction.",
    explanation: "Maintains partition routing consistency automatically.",
    hint: "Atomic cross-partition row transfer if the new value changes the hash bucket.",
    level: "intermediate",
    codeExample: `UPDATE user_logs SET user_id = 204 WHERE log_id = 101;`
  },
  {
    question: "Why should low-cardinality columns (e.g. `gender ENUM('M', 'F')`) NEVER be used in HASH partitioning?",
    shortAnswer: "Because a low-cardinality column only produces 2 distinct hash values; on a table with 8 partitions, all rows would crowd into only 2 partitions while the other 6 partitions remain completely empty, causing severe data skew.",
    explanation: "Hash partitioning requires high-cardinality input columns to achieve uniform distribution.",
    hint: "Low-cardinality columns only map to a few buckets, leaving other partitions completely empty.",
    level: "intermediate",
    codeExample: `-- ❌ Severe Skew: Only 2 partitions receive data in an 8-partition table!`
  },
  {
    question: "How does `EXCHANGE PARTITION` work with HASH partitioned tables in MySQL 8.0?",
    shortAnswer: "It swaps a single hash partition's `.ibd` tablespace with a standalone staging table in milliseconds, provided all rows in the staging table hash to that exact partition ID.",
    explanation: "Allows rapid partition-level maintenance for individual hash buckets.",
    hint: "Swaps tablespace pointers with a standalone table whose rows match the partition's hash rule.",
    level: "expert",
    codeExample: `ALTER TABLE user_logs EXCHANGE PARTITION p0 WITH TABLE user_logs_p0_backup;`
  },
  {
    question: "Can HASH partitioning be used as a secondary subpartitioning strategy inside RANGE partitions?",
    shortAnswer: "**Yes**, this is the classic **Composite Partitioning (RANGE-HASH)** pattern: partitioning primarily by `RANGE` on date and subpartitioning each year/month by `HASH` on user ID across 4 buckets.",
    explanation: "Combines time-series archival with even horizontal write distribution.",
    hint: "Yes, RANGE-HASH composite partitioning is widely used in high-volume architectures.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (YEAR(order_date))
SUBPARTITION BY HASH (user_id)
SUBPARTITIONS 4 (...)`
  },
  {
    question: "What is the maximum number of partitions allowed for a HASH partitioned table in MySQL 8.0?",
    shortAnswer: "Up to **8,192 partitions**.",
    explanation: "Production best practices recommend keeping partition counts between 8 and 64 for optimal CPU and file descriptor efficiency.",
    hint: "Up to 8,192 partitions maximum.",
    level: "basic",
    codeExample: `-- Maximum 8192 partitions.`
  },
  {
    question: "How do you optimize `innodb_buffer_pool_size` for HASH partitioned tables?",
    shortAnswer: "Because point queries access specific hash buckets, ensuring that the total combined working set across all active partitions fits inside `innodb_buffer_pool_size` prevents buffer pool page thrashing.",
    explanation: "Balances memory allocation across all active partition tablespaces.",
    hint: "Ensure total active working set across all hash buckets fits comfortably in buffer pool RAM.",
    level: "intermediate",
    codeExample: `[mysqld]
innodb_buffer_pool_size = 32G`
  },
  {
    question: "What happens if a query uses an `IN (...)` list containing values that hash to the SAME partition (e.g. `WHERE user_id IN (4, 8, 12)` on `PARTITIONS 4`)?",
    shortAnswer: "All values evaluate to $\\text{MOD}(x, 4) = 0$; the optimizer detects that all queried values belong to Partition 0 and prunes the search to **scan ONLY `p0`**, achieving 100% single-partition pruning.",
    explanation: "Demonstrates mathematical set intersection in hash pruning.",
    hint: "Optimizer detects all values hash to the same bucket and scans only that single partition.",
    level: "expert",
    codeExample: `EXPLAIN SELECT * FROM user_logs WHERE user_id IN (4, 8, 12, 16);
-- partitions: p0 (All values map to p0!)`
  },
  {
    question: "What is the difference between HASH partitioning vs KEY partitioning?",
    shortAnswer: "**HASH** uses a user-defined SQL expression returning an integer (using standard modulus or powers-of-two bitwise); **KEY** uses MySQL's internal MD5/password hashing function and natively supports non-integer columns (like `VARCHAR`, `UUID`, `BLOB`) without helper functions.",
    explanation: "KEY partitioning handles non-numeric data types natively.",
    hint: "HASH requires user integer expressions; KEY uses MySQL internal hashing for non-integer columns.",
    level: "basic",
    codeExample: `-- HASH: Requires integer expression
-- KEY: Supports strings and UUIDs directly`
  },
  {
    question: "What is the primary operational takeaway of Topic 5 in Module 004_007?",
    shortAnswer: "HASH Partitioning distributes rows evenly across $N$ physical storage buckets to eliminate write bottlenecks and spread sequential IDs across storage: use **Standard HASH (`MOD(expr, N)`)** for perfectly balanced static datasets, standardize on **`LINEAR HASH`** with power-of-two partition counts (4, 8, 16, 32) for tables requiring online partition resizing (`ADD / COALESCE PARTITION`), ensure the hashing column has **high cardinality**, and remember that HASH supports point equality pruning (`=`, `IN`) but **cannot prune range queries**.",
    explanation: "Mastering HASH and LINEAR HASH partitioning allows DBAs to achieve balanced disk I/O distribution and scalable write throughput on multi-million row datasets.",
    hint: "Summarize Standard HASH vs LINEAR HASH, powers-of-two sizing, ADD/COALESCE partition management, and equality vs range pruning behavior.",
    level: "basic",
    codeExample: `-- Master LINEAR HASH Blueprint:
CREATE TABLE enterprise_events (
  event_id BIGINT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  event_type VARCHAR(50),
  PRIMARY KEY (event_id, user_id)
) ENGINE = InnoDB
PARTITION BY LINEAR HASH (user_id)
PARTITIONS 8;

-- Adding 4 new partitions online with 1/N data movement:
ALTER TABLE enterprise_events ADD PARTITION PARTITIONS 4;`
  }
];

export default questions;
