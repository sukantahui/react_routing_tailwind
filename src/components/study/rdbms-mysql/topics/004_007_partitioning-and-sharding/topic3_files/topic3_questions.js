// topic3_files/topic3_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 3: RANGE Partitioning: Partitioning by Date Ranges, Years, and ID Intervals

const questions = [
  {
    question: "What is RANGE Partitioning in MySQL and how does it determine row placement?",
    shortAnswer: "RANGE Partitioning assigns rows to specific physical partitions based on whether the value of a partitioning expression falls within a **contiguous, non-overlapping range of values** defined by `VALUES LESS THAN (value)` clauses.",
    explanation: "Each partition holds data up to a strictly non-inclusive upper threshold.",
    hint: "Assigns rows based on contiguous value ranges defined by VALUES LESS THAN clauses.",
    level: "basic",
    codeExample: `CREATE TABLE customer_orders (
  order_id INT NOT NULL,
  order_year INT NOT NULL,
  amount DECIMAL(10,2),
  PRIMARY KEY (order_id, order_year)
) ENGINE = InnoDB
PARTITION BY RANGE (order_year) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "What is the difference between `PARTITION BY RANGE (expr)` and `PARTITION BY RANGE COLUMNS (col1, col2, ...)`?",
    shortAnswer: "`RANGE (expr)` requires the partitioning expression to **return an integer** (often requiring helper functions like `YEAR(date)` or `TO_DAYS(date)`); `RANGE COLUMNS` allows direct partitioning on **`DATE`**, **`DATETIME`**, **`VARCHAR`**, or multiple columns **without helper functions**.",
    explanation: "`RANGE COLUMNS` is the modern standard for date and multi-column partitioning.",
    hint: "RANGE requires integer expressions; RANGE COLUMNS supports native DATE, DATETIME, and strings.",
    level: "basic",
    codeExample: `-- RANGE COLUMNS with native DATE literals:
PARTITION BY RANGE COLUMNS (order_date) (
  PARTITION p2025_01 VALUES LESS THAN ('2025-02-01'),
  PARTITION p2025_02 VALUES LESS THAN ('2025-03-01')
);`
  },
  {
    question: "Are the upper boundaries defined by `VALUES LESS THAN (N)` inclusive or non-inclusive?",
    shortAnswer: "**Strictly Non-Inclusive**; `VALUES LESS THAN (2025)` stores values strictly **less than 2025** ($x &lt; 2025$). A value equal to `2025` is routed to the next higher partition.",
    explanation: "Boundary values act as upper limits that are never included in that partition.",
    hint: "Strictly non-inclusive: values less than N are stored; value equal to N moves to next partition.",
    level: "basic",
    codeExample: `-- Year 2024 is stored in p2024 (VALUES LESS THAN 2025). Year 2025 goes to p2025.`
  },
  {
    question: "What rule governs the ordering of partition range boundaries in a `CREATE TABLE` statement?",
    shortAnswer: "Partition ranges **MUST be defined in strictly ascending contiguous order** ($V_0 &lt; V_1 &lt; V_2 &lt; \dots$); defining a partition with a lower value after a higher value results in `ERROR 1493 (HY000): VALUES LESS THAN value must be strictly increasing for each partition`.",
    explanation: "Ensures binary search boundary determination by the storage engine.",
    hint: "Boundary values must be in strictly ascending order without overlaps.",
    level: "basic",
    codeExample: `-- Error 1493 if order is reversed:
-- PARTITION p2025 VALUES LESS THAN (2026),
-- PARTITION p2024 VALUES LESS THAN (2025) -- ❌ SYNTAX ERROR!`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a cashier entered an order dated '2027-01-01', which crashed the POS application with `ERROR 1526 (HY000): Table has no partition for value 2027`. Why did this happen and how did Susmita fix it?",
    shortAnswer: "The original table had partitions only up to `p2026 VALUES LESS THAN (2027)` with no catch-all partition; when a 2027 date was inserted, MySQL had no target partition. Susmita added `PARTITION p_future VALUES LESS THAN MAXVALUE`, providing a safety catch-all for all future dates.",
    explanation: "Always define a MAXVALUE catch-all partition on production RANGE partitioned tables.",
    hint: "Added PARTITION p_future VALUES LESS THAN MAXVALUE to catch all dates exceeding defined ranges.",
    level: "moderate",
    codeExample: `# Barrackpore MAXVALUE Safety Fix:
ALTER TABLE pos_orders REORGANIZE PARTITION p_max INTO (
  PARTITION p2027 VALUES LESS THAN (2028),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, core ledgers tracked 250,000,000 transactions across ₹500 Crores in volume. Why did Debangshu choose monthly `RANGE COLUMNS (txn_date)` partitioning instead of yearly partitioning?",
    shortAnswer: "With 250M rows, yearly partitions would each contain ~60 million records (too large for single-partition memory caching and fast pruning); monthly partitions contained ~5 million records each, allowing individual partition B-Tree indexes to fit 100% in RAM and enabling granular monthly archival via `DROP PARTITION`.",
    explanation: "Optimizes partition size to match the InnoDB buffer pool memory footprint.",
    hint: "Monthly partitions keep individual partition sizes small enough (~5M rows) to fit inside RAM.",
    level: "expert",
    codeExample: `PARTITION BY RANGE COLUMNS (txn_date) (
  PARTITION p2025_01 VALUES LESS THAN ('2025-02-01'),
  PARTITION p2025_02 VALUES LESS THAN ('2025-03-01'),
  PARTITION p2025_03 VALUES LESS THAN ('2025-04-01')
);`
  },
  {
    question: "How does RANGE partitioning handle `NULL` values inserted into the partitioning column?",
    shortAnswer: "`NULL` is treated as **less than any integer or date value**; any row containing a `NULL` partition key is automatically stored in the **lowest-valued partition** (e.g. `p0` / `p_min`).",
    explanation: "Ensures deterministic placement of NULL records without insert errors.",
    hint: "NULL is treated as smaller than any value and is routed to the lowest-valued partition.",
    level: "intermediate",
    codeExample: `-- Row with order_date = NULL is routed to p2024 (the lowest partition).`
  },
  {
    question: "How do you add a new partition to a RANGE partitioned table that already contains a `MAXVALUE` partition?",
    shortAnswer: "You cannot use `ADD PARTITION`; you must use **`ALTER TABLE table_name REORGANIZE PARTITION p_future INTO (PARTITION p_new VALUES LESS THAN (...), PARTITION p_future VALUES LESS THAN MAXVALUE);`**.",
    explanation: "Reorganizes the catch-all MAXVALUE partition into the new range and a retained MAXVALUE partition.",
    hint: "Use ALTER TABLE ... REORGANIZE PARTITION p_future INTO (new_partition, p_future).",
    level: "expert",
    codeExample: `ALTER TABLE sales_records REORGANIZE PARTITION p_future INTO (
  PARTITION p2026 VALUES LESS THAN (2027),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How do you add a new partition to a RANGE partitioned table that does NOT contain a `MAXVALUE` partition?",
    shortAnswer: "Use `ALTER TABLE table_name ADD PARTITION (PARTITION p_new VALUES LESS THAN (value));`, provided the new value is strictly greater than the highest existing partition boundary.",
    explanation: "Appends a new partition to the top of the range hierarchy.",
    hint: "Use ALTER TABLE ... ADD PARTITION with a higher upper boundary.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records ADD PARTITION (
  PARTITION p2027 VALUES LESS THAN (2028)
);`
  },
  {
    question: "What is ID Interval Partitioning and what is its ideal use case?",
    shortAnswer: "Partitioning an auto-incrementing integer Primary Key into discrete numerical ranges (e.g. 1–1,000,000 in `p1`, 1,000,001–2,000,000 in `p2`); ideal for massive append-only logging tables and distributed ID generation systems.",
    explanation: "Provides uniform physical data block sizes across numeric primary keys.",
    hint: "Partitioning by integer ID ranges like 1M, 2M, 3M for append-only tables.",
    level: "basic",
    codeExample: `CREATE TABLE system_events (
  event_id BIGINT NOT NULL AUTO_INCREMENT,
  event_data JSON,
  PRIMARY KEY (event_id)
) ENGINE = InnoDB
PARTITION BY RANGE (event_id) (
  PARTITION p1 VALUES LESS THAN (1000000),
  PARTITION p2 VALUES LESS THAN (2000000),
  PARTITION p3 VALUES LESS THAN (3000000),
  PARTITION p_max VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How does Multi-Column Range Partitioning (`PARTITION BY RANGE COLUMNS (col1, col2)`) evaluate partition boundaries?",
    shortAnswer: "It evaluates column tuples in **lexicographical order**: comparing `col1` first; if `col1` matches the boundary, it evaluates `col2` to determine partition placement.",
    explanation: "Enables composite range partitioning across multiple dimensions (e.g. state code and date).",
    hint: "Evaluates tuples in lexicographical order: col1 first, then col2.",
    level: "expert",
    codeExample: `PARTITION BY RANGE COLUMNS (region_id, order_date) (
  PARTITION p_bengal_2025 VALUES LESS THAN (10, '2026-01-01'),
  PARTITION p_mumbai_2025 VALUES LESS THAN (20, '2026-01-01')
);`
  },
  {
    question: "Why should `TO_DAYS()` be used instead of `YEAR()` for high-volume time-series RANGE partitioning?",
    shortAnswer: "Because `TO_DAYS(date)` maps dates to unique continuous day integers, enabling fine-grained **daily, weekly, or monthly partitions**, whereas `YEAR(date)` only allows coarse annual partitioning.",
    explanation: "Provides precise control over partition interval sizes.",
    hint: "TO_DAYS converts dates to unique integer days for daily and monthly partitioning.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (TO_DAYS(order_date)) (
  PARTITION p2025_01 VALUES LESS THAN (TO_DAYS('2025-02-01')),
  PARTITION p2025_02 VALUES LESS THAN (TO_DAYS('2025-03-01'))
);`
  },
  {
    question: "What is `TO_SECONDS()` in MySQL RANGE partitioning and when should it be used?",
    shortAnswer: "A monotonic function that converts a `DATETIME` value into the number of seconds since year 0; used when tables require **hourly or sub-daily partition granularity** on massive IoT streaming and telemetry tables.",
    explanation: "Enables second-precision time-series partitioning.",
    hint: "Converts datetime to integer seconds for hourly and sub-daily partitioning.",
    level: "expert",
    codeExample: `PARTITION BY RANGE (TO_SECONDS(reading_time)) (
  PARTITION p_morning VALUES LESS THAN (TO_SECONDS('2025-08-25 12:00:00')),
  PARTITION p_evening VALUES LESS THAN (TO_SECONDS('2025-08-26 00:00:00'))
);`
  },
  {
    question: "What happens if an `ALTER TABLE ... DROP PARTITION` command is executed on a RANGE partitioned table?",
    shortAnswer: "The specified partition and **all data stored within it are permanently deleted in milliseconds**, and the boundary definition is removed from the table schema; subsequent inserts for that range will now route into the next higher partition (or fail if no higher partition exists).",
    explanation: "Reconfigures the range boundary mapping dynamically.",
    hint: "Permanently deletes the partition file and data; incoming records route to the next higher partition.",
    level: "intermediate",
    codeExample: `ALTER TABLE customer_orders DROP PARTITION p2024;`
  },
  {
    question: "Can you drop the lowest partition (`p0`) in a RANGE partitioned table without affecting higher partitions?",
    shortAnswer: "**Yes**, executing `ALTER TABLE table DROP PARTITION p0;` drops the oldest historical partition instantly without modifying higher partitions or causing table locks.",
    explanation: "The standard pattern for automated sliding-window rolling data retention.",
    hint: "Yes, dropping the lowest partition instantly removes oldest historical data cleanly.",
    level: "basic",
    codeExample: `ALTER TABLE audit_logs DROP PARTITION p_oldest;`
  },
  {
    question: "What happens if you attempt to drop the ONLY remaining partition in a RANGE partitioned table?",
    shortAnswer: "MySQL rejects the command with `ERROR 1508 (HY000): Cannot remove all partitions, use DROP TABLE instead`.",
    explanation: "A partitioned table must contain at least one defined partition.",
    hint: "Cannot drop all partitions; use DROP TABLE instead.",
    level: "basic",
    codeExample: `-- Error 1508 if attempting to drop the last remaining partition.`
  },
  {
    question: "How do you merge two adjacent historical partitions (e.g. `p2022` and `p2023`) into a single consolidated partition?",
    shortAnswer: "Use `ALTER TABLE table_name REORGANIZE PARTITION p2022, p2023 INTO (PARTITION p_archive_pre2024 VALUES LESS THAN (2024));`.",
    explanation: "Consolidates older partitions into larger historical archives without data loss.",
    hint: "Use REORGANIZE PARTITION to combine adjacent partitions into a single partition.",
    level: "intermediate",
    codeExample: `ALTER TABLE sales_records REORGANIZE PARTITION p2022, p2023 INTO (
  PARTITION p_archive VALUES LESS THAN (2024)
);`
  },
  {
    question: "What is `PARTITION BY RANGE (UNIX_TIMESTAMP(timestamp_col))`'s advantage over `RANGE COLUMNS` for `TIMESTAMP` data types?",
    shortAnswer: "`UNIX_TIMESTAMP()` converts timestamps to UTC integers, ensuring that daylight saving time transitions and session timezone changes do not cause inconsistent partition routing.",
    explanation: "Enforces immutable UTC integer boundaries for timezone-dependent timestamp columns.",
    hint: "Guarantees immutable UTC boundaries regardless of client timezone settings.",
    level: "expert",
    codeExample: `PARTITION BY RANGE (UNIX_TIMESTAMP(log_timestamp)) (
  PARTITION p2025 VALUES LESS THAN (UNIX_TIMESTAMP('2026-01-01 00:00:00'))
);`
  },
  {
    question: "Can an `ALTER TABLE` statement convert an unpartitioned table into a RANGE partitioned table online?",
    shortAnswer: "**Yes**, by executing `ALTER TABLE existing_table PARTITION BY RANGE (YEAR(order_date)) (...);`; MySQL redistributes all existing rows into their respective physical `.ibd` partition files.",
    explanation: "Reorganizes existing data into physical partition files.",
    hint: "Yes, ALTER TABLE table PARTITION BY RANGE (...) partitions existing tables.",
    level: "intermediate",
    codeExample: `ALTER TABLE legacy_orders PARTITION BY RANGE (YEAR(order_date)) (
  PARTITION p2024 VALUES LESS THAN (2025),
  PARTITION p2025 VALUES LESS THAN (2026),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How do you remove partitioning from a table while keeping all existing row data intact?",
    shortAnswer: "Execute **`ALTER TABLE table_name REMOVE PARTITIONING;`**; MySQL merges all individual partition `.ibd` files into a single monolithic table tablespace.",
    explanation: "Converts a partitioned table back into a standard standalone table.",
    hint: "Execute ALTER TABLE table REMOVE PARTITIONING.",
    level: "basic",
    codeExample: `ALTER TABLE sales_records REMOVE PARTITIONING;`
  },
  {
    question: "What is the performance impact of having 1,000+ daily partitions in a RANGE partitioned table?",
    shortAnswer: "While legal (up to 8,192 partitions), having 1,000+ partitions increases file descriptor consumption, increases metadata lock (`MDL`) latency, and slows down unpruned queries due to multi-partition iterator overhead.",
    explanation: "Best practice: Keep partition counts between 10 and 100 per table.",
    hint: "Increases file descriptor consumption and unpruned query planning latency.",
    level: "intermediate",
    codeExample: `-- Keep partition counts under 100 for optimal performance.`
  },
  {
    question: "What query in `information_schema.PARTITIONS` lists all defined boundaries for a RANGE partitioned table?",
    shortAnswer: "`SELECT PARTITION_NAME, PARTITION_DESCRIPTION, TABLE_ROWS FROM information_schema.PARTITIONS WHERE TABLE_NAME = 'sales_records';` (where `PARTITION_DESCRIPTION` holds the `VALUES LESS THAN` expression).",
    explanation: "Displays partition range thresholds programmatically.",
    hint: "Query PARTITION_DESCRIPTION in information_schema.PARTITIONS.",
    level: "basic",
    codeExample: `SELECT PARTITION_NAME, PARTITION_DESCRIPTION, TABLE_ROWS 
FROM information_schema.PARTITIONS 
WHERE TABLE_NAME = 'customer_orders';`
  },
  {
    question: "How does the MySQL optimizer prune a query with `WHERE order_date >= '2025-06-01'` on a table with monthly RANGE partitions?",
    shortAnswer: "The optimizer calculates the lower bound and excludes all partitions prior to `p2025_06` (e.g. prunes `p2025_01` through `p2025_05`), scanning **only `p2025_06` through `p_future`**.",
    explanation: "Eliminates historical partition scans for open-ended future queries.",
    hint: "Prunes all historical partitions prior to June 2025.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM orders WHERE order_date >= '2025-06-01';
-- partitions: p2025_06, p2025_07, ..., p_future`
  },
  {
    question: "What is `ALTER TABLE ... COALESCE PARTITION` and does it work on RANGE partitioned tables?",
    shortAnswer: "**No**, `COALESCE PARTITION` is used only for `HASH` and `KEY` partitioning to reduce bucket counts; for `RANGE` partitioning, you must use **`REORGANIZE PARTITION`** or **`DROP PARTITION`**.",
    explanation: "RANGE partitions have explicit boundaries and cannot be coalesced with a numeric count.",
    hint: "COALESCE PARTITION is for HASH/KEY only; RANGE uses REORGANIZE PARTITION.",
    level: "expert",
    codeExample: `-- COALESCE is invalid for RANGE; use REORGANIZE PARTITION instead.`
  },
  {
    question: "Can a `VARCHAR` column be used in `PARTITION BY RANGE`?",
    shortAnswer: "**Not in standard `RANGE (expr)`** (which requires integer expressions), but **YES in `PARTITION BY RANGE COLUMNS (varchar_col)`**, which evaluates strings lexicographically using collation rules.",
    explanation: "RANGE COLUMNS supports string ranges like alphabetical customer name tiers.",
    hint: "Yes, using RANGE COLUMNS (varchar_col) which compares strings lexicographically.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE COLUMNS (customer_code) (
  PARTITION p_a_m VALUES LESS THAN ('N'),
  PARTITION p_n_z VALUES LESS THAN (MAXVALUE)
);`
  },
  {
    question: "What happens if two partitions in a RANGE definition have the EXACT SAME upper bound?",
    shortAnswer: "MySQL rejects the DDL with `ERROR 1493 (HY000): VALUES LESS THAN value must be strictly increasing for each partition`.",
    explanation: "Range boundaries must be strictly monotonic ($V_i < V_{i+1}$).",
    hint: "Duplicate upper bounds are rejected with Error 1493.",
    level: "basic",
    codeExample: `-- Error 1493: Duplicate partition bounds are illegal.`
  },
  {
    question: "How do you automate the creation of new monthly RANGE partitions in production MySQL 8.0?",
    shortAnswer: "Using the **MySQL Event Scheduler (`CREATE EVENT`)** or an external Python/Bash cron job that runs monthly to execute `ALTER TABLE ... REORGANIZE PARTITION p_future INTO (PARTITION p_next_month VALUES LESS THAN (...), PARTITION p_future VALUES LESS THAN MAXVALUE);`.",
    explanation: "Maintains a rolling forward buffer of upcoming monthly partitions automatically.",
    hint: "Automated monthly cron job or MySQL Event running REORGANIZE PARTITION on p_future.",
    level: "expert",
    codeExample: `CREATE EVENT auto_add_partition_event
ON SCHEDULE EVERY 1 MONTH
STARTS '2026-09-01 00:00:00'
DO
  CALL sp_reorganize_next_month_partition();`
  },
  {
    question: "What is the recommended partition sizing target for InnoDB RANGE partitioned tables?",
    shortAnswer: "Between **2GB and 10GB per partition** (or 2 million to 10 million rows per partition).",
    explanation: "Ensures that each partition B-Tree fits comfortably in memory and can be backed up or optimized quickly.",
    hint: "Target 2GB to 10GB (or 2M to 10M rows) per individual partition.",
    level: "intermediate",
    codeExample: `-- Sizing Rule: 2GB-10GB per partition for optimal buffer pool caching.`
  },
  {
    question: "What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE` on a RANGE partitioned query in MySQL 8.0.18+?",
    shortAnswer: "`EXPLAIN` displays the estimated query plan and pruned partition list; `EXPLAIN ANALYZE` actually executes the query and reports **real execution timings, row counts, and physical iteration times per partition**.",
    explanation: "Provides ground-truth runtime performance telemetry.",
    hint: "EXPLAIN estimates plan; EXPLAIN ANALYZE executes query and measures real elapsed times.",
    level: "intermediate",
    codeExample: `EXPLAIN ANALYZE SELECT * FROM customer_orders WHERE order_date = '2025-06-15';`
  },
  {
    question: "What is the primary operational takeaway of Topic 3 in Module 004_007?",
    shortAnswer: "RANGE Partitioning is the industry standard for time-series and interval data: standardize on **`PARTITION BY RANGE COLUMNS (date_col)`** to eliminate helper function overhead, enforce **strictly ascending non-inclusive bounds** (`VALUES LESS THAN`), always include a **`MAXVALUE` safety partition**, handle `NULL` records (routed to lowest partition $p_0$), and automate forward partition creation via **`REORGANIZE PARTITION`**.",
    explanation: "Mastering RANGE partitioning delivers predictable linear scaling, instant sliding-window data archival, and line-rate query performance across massive time-series datasets.",
    hint: "Summarize RANGE vs RANGE COLUMNS, non-inclusive ascending bounds, MAXVALUE safety, NULL handling, and REORGANIZE PARTITION maintenance.",
    level: "basic",
    codeExample: `-- Master RANGE COLUMNS Partitioning Blueprint:
CREATE TABLE enterprise_billing (
  invoice_id BIGINT NOT NULL,
  billing_date DATE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (invoice_id, billing_date)
) ENGINE = InnoDB
PARTITION BY RANGE COLUMNS (billing_date) (
  PARTITION p2025_01 VALUES LESS THAN ('2025-02-01'),
  PARTITION p2025_02 VALUES LESS THAN ('2025-03-01'),
  PARTITION p2025_03 VALUES LESS THAN ('2025-04-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);

-- Adding upcoming month:
ALTER TABLE enterprise_billing REORGANIZE PARTITION p_future INTO (
  PARTITION p2025_04 VALUES LESS THAN ('2025-05-01'),
  PARTITION p_future  VALUES LESS THAN MAXVALUE
);`
  }
];

export default questions;
