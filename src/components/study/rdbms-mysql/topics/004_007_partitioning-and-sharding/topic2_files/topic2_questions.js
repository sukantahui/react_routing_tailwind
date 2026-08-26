// topic2_files/topic2_questions.js
// Module 004_007: Table Partitioning & Horizontal Sharding Strategies
// Topic 2: Partition Pruning: How the Optimizer Skips Irrelevant Partitions to Boost Query Speed

const questions = [
  {
    question: "What is Partition Pruning in MySQL and why is it essential for query performance?",
    shortAnswer: "Partition Pruning is an optimization technique where the MySQL Cost-Based Optimizer (CBO) analyzes query `WHERE` predicates and **completely excludes (prunes) physical partitions that cannot contain matching rows**, reading only the specific relevant `.ibd` files and skipping up to 99% of total table data.",
    explanation: "Eliminates unnecessary disk I/O, reduces memory buffer consumption, and speeds up query execution.",
    hint: "Optimizer reads only physical partition files matching query WHERE clauses, skipping irrelevant files.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM sales WHERE order_date >= '2025-01-01' AND order_date < '2025-02-01';
-- Optimizer accesses only partition 'p2025_01', skipping all other years/months!`
  },
  {
    question: "What is the difference between Static Partition Pruning and Dynamic Partition Pruning?",
    shortAnswer: "**Static Pruning** occurs during the query compilation/optimization phase when `WHERE` predicates contain **constant literal values** (e.g. `WHERE year = 2025`); **Dynamic Pruning** occurs at runtime when partition boundaries depend on **subqueries, JOIN predicates, or prepared statement parameters** evaluated during execution.",
    explanation: "Static pruning is pre-calculated; dynamic pruning is evaluated dynamically on each row/step.",
    hint: "Static is evaluated at compile time with literals; Dynamic is evaluated at runtime with subqueries/joins.",
    level: "intermediate",
    codeExample: `-- Static Pruning (Compile time):
SELECT * FROM orders WHERE order_date = '2025-06-15';

-- Dynamic Pruning (Runtime execution):
SELECT * FROM orders WHERE order_date = (SELECT MAX(audit_date) FROM audit_log);`
  },
  {
    question: "What comparison operators in SQL `WHERE` clauses support Partition Pruning in MySQL 8.0?",
    shortAnswer: "1. Equality (`=`); 2. Relational inequalities (`<`, `>`, `<=`, `>=`); 3. Range interval (`BETWEEN ... AND ...`); 4. Set membership (`IN (...)`); 5. Null checks (`IS NULL`); 6. Inequality (`<>` or `!=` can prune specific partitions under LIST partitioning).",
    explanation: "These operators allow the optimizer to mathematically bound partition intervals.",
    hint: "=, <, >, <=, >=, BETWEEN, IN, and IS NULL.",
    level: "basic",
    codeExample: `SELECT * FROM sales_records WHERE order_date BETWEEN '2025-01-01' AND '2025-03-31';`
  },
  {
    question: "Why does `WHERE DATE_FORMAT(order_date, '%Y') = '2025'` FAIL to prune partitions on a table partitioned by `YEAR(order_date)`?",
    shortAnswer: "Because `DATE_FORMAT()` is a general string formatting function that the optimizer cannot mathematically invert; wrapping the column in an un-supported function forces MySQL to evaluate the function row-by-row across **every physical partition (Full Table Scan)**, completely destroying partition pruning.",
    explanation: "Never wrap partition columns in custom or non-invertible SQL functions.",
    hint: "DATE_FORMAT is not an invertible partitioning function, forcing a full table scan across all partitions.",
    level: "intermediate",
    codeExample: `-- ❌ FAILS PRUNING (Scans ALL partitions):
SELECT * FROM orders WHERE DATE_FORMAT(order_date, '%Y') = '2025';

-- ✅ ENABLES PRUNING (Scans ONLY p2025):
SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an unoptimized sales report ran for 38 seconds across ₹1.2 Crores in inventory data. How did Susmita refactor the query to achieve 15ms response time using partition pruning?",
    shortAnswer: "The original query used `WHERE YEAR(order_date) = 2025`, which caused function evaluation overhead; Susmita refactored the predicate to explicit date bounds (`WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01'`); the optimizer pruned the search to the single 2025 partition, cutting execution time from 38 seconds to 15 milliseconds.",
    explanation: "Direct date interval bounds enable the fastest deterministic partition pruning.",
    hint: "Replaced YEAR(order_date) = 2025 with explicit date range bounds >= and <.",
    level: "moderate",
    codeExample: `# Barrackpore Query Refactoring:
-- Before (38s): SELECT * FROM pos_sales WHERE YEAR(order_date) = 2025;
-- After (15ms): SELECT * FROM pos_sales WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did adding partition keys to JOIN conditions prevent an $N \times M$ partition scan across ₹500 Crores in banking records?",
    shortAnswer: "When joining `accounts` (10 partitions) with `transactions` (10 partitions), omitting the partition key caused MySQL to evaluate all 10 account partitions against all 10 transaction partitions ($10 \times 10 = 100$ partition cross-scans). Debangshu added `AND a.branch_id = t.branch_id` to the `JOIN ON` clause, allowing MySQL to perform **Partition-Wise Joins** (joining matching partitions $1:1$), reducing query I/O by 90%.",
    explanation: "Partition-wise joins align corresponding partitions, eliminating cross-partition joins.",
    hint: "Added partition key to JOIN ON predicates to enable 1:1 partition-wise joins.",
    level: "expert",
    codeExample: `-- Partition-Wise Join:
SELECT a.account_number, t.amount 
FROM accounts a 
JOIN transactions t ON a.account_id = t.account_id AND a.branch_id = t.branch_id 
WHERE a.branch_id = 101;`
  },
  {
    question: "What deterministic date/time functions ARE supported for partition pruning in MySQL 8.0?",
    shortAnswer: "**`YEAR()`**, **`TO_DAYS()`**, **`TO_SECONDS()`**, **`DAYOFYEAR()`**, **`QUARTER()`**, **`MONTH()`**, **`HOUR()`**, **`MINUTE()`**, **`SECOND()`**, and **`UNIX_TIMESTAMP()`** (on `TIMESTAMP` columns only).",
    explanation: "These functions have monotonic mathematical properties that the MySQL optimizer can evaluate for range boundaries.",
    hint: "Monotonic functions like YEAR, TO_DAYS, TO_SECONDS, and UNIX_TIMESTAMP.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (TO_DAYS(order_date)) (...)`
  },
  {
    question: "How do you inspect partition pruning in MySQL 8.0 using `EXPLAIN`?",
    shortAnswer: "Execute `EXPLAIN SELECT ...` and inspect the **`partitions`** column; in MySQL 8.0, the `partitions` column is included in default `EXPLAIN` output (legacy `EXPLAIN PARTITIONS` is deprecated).",
    explanation: "A healthy pruned query lists only the specific target partitions rather than all partitions.",
    hint: "Inspect the 'partitions' column in standard EXPLAIN output.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM sales_records WHERE order_date = '2025-05-20'\\G
-- partitions: p2025`
  },
  {
    question: "What does `EXPLAIN FORMAT=TREE` display for a partitioned query?",
    shortAnswer: "It displays the physical iterator tree showing the exact partition iterators being executed (e.g. `-> Index lookup on sales_records (p2025) using idx_date ...`), confirming that un-targeted partition tablespaces are completely excluded from the execution tree.",
    explanation: "Provides the clearest visual representation of physical engine iterators.",
    hint: "Displays physical iterator tree showing exact partition index lookups.",
    level: "intermediate",
    codeExample: `EXPLAIN FORMAT=TREE SELECT * FROM sales_records WHERE order_date = '2025-05-20';`
  },
  {
    question: "How does Implicit Type Conversion break partition pruning?",
    shortAnswer: "If a partition column is an integer (e.g. `customer_id INT`) but the query filters with a string literal containing non-numeric characters (or vice-versa), MySQL must convert every stored row value at runtime to evaluate comparisons, preventing mathematical partition pruning and triggering a full scan.",
    explanation: "Always match data types strictly between query literals and column definitions.",
    hint: "Type mismatches force runtime per-row conversions, preventing partition pruning.",
    level: "intermediate",
    codeExample: `-- ❌ If branch_id is INT, filtering with string forces type conversion:
SELECT * FROM branches WHERE branch_id = '101-KOLKATA';`
  },
  {
    question: "What is `PARTITION BY RANGE COLUMNS(...)` and how does it improve partition pruning for multi-column keys and non-integers?",
    shortAnswer: "`RANGE COLUMNS` allows partitioning directly on **`DATE`**, **`DATETIME`**, **`VARCHAR`**, or multiple columns **without requiring wrapping functions like `TO_DAYS()` or `YEAR()`**, allowing the optimizer to prune partitions directly against native string and date literals.",
    explanation: "Eliminates function overhead and enables multi-column range pruning.",
    hint: "Allows partitioning directly on DATE, DATETIME, and VARCHAR without helper functions.",
    level: "expert",
    codeExample: `CREATE TABLE audit_trail (
  log_id INT NOT NULL,
  log_date DATE NOT NULL,
  PRIMARY KEY (log_id, log_date)
) PARTITION BY RANGE COLUMNS (log_date) (
  PARTITION p2024 VALUES LESS THAN ('2025-01-01'),
  PARTITION p2025 VALUES LESS THAN ('2026-01-01'),
  PARTITION p_future VALUES LESS THAN MAXVALUE
);`
  },
  {
    question: "How does partition pruning operate when a query uses an `IN (...)` predicate?",
    shortAnswer: "The optimizer evaluates each value in the `IN` list individually, maps each value to its corresponding physical partition, and prunes all other partitions, scanning **only the distinct union of partitions containing the specified values**.",
    explanation: "Example: `WHERE order_date IN ('2024-05-01', '2025-05-01')` accesses only `p2024` and `p2025`.",
    hint: "Evaluates each value in IN list and accesses only the union of matching partitions.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM orders WHERE order_date IN ('2024-06-01', '2025-06-01');
-- partitions: p2024, p2025`
  },
  {
    question: "What happens if a query filters on a subpartition key but omits the primary partition key in a composite partitioned table?",
    shortAnswer: "MySQL performs **Subpartition Pruning without Primary Pruning**: it prunes to that specific subpartition across *all* primary partitions (e.g. accesses subpartition 1 in `p2024`, `p2025`, and `p2026`), reducing the search space by $1 / \text{subpartition\_count}$ but still scanning multiple primary partitions.",
    explanation: "Partial pruning still provides performance gains compared to a full table scan.",
    hint: "Prunes subpartitions across all primary partitions, providing partial I/O reduction.",
    level: "expert",
    codeExample: `-- Scans subpartition 2 across all year partitions.`
  },
  {
    question: "What happens if a query filters on BOTH the primary partition key and the subpartition key?",
    shortAnswer: "MySQL achieves **Full Two-Dimensional Pruning**: it pinpoints the exact single physical subpartition tablespace on disk (e.g. `p2025_sp2`), eliminating 95%+ of both primary and subpartition search spaces.",
    explanation: "The optimal execution path for composite partitioned tables.",
    hint: "Pinpoints the exact single physical subpartition tablespace on disk.",
    level: "expert",
    codeExample: `EXPLAIN SELECT * FROM sales WHERE order_date = '2025-04-10' AND customer_id = 1002;
-- partitions: p2025_sp2`
  },
  {
    question: "Why should `TIMESTAMP` columns used in RANGE partitioning always use `UNIX_TIMESTAMP(timestamp_col)`?",
    shortAnswer: "Because `TIMESTAMP` values are subject to session timezone conversions (`time_zone` variable); `UNIX_TIMESTAMP()` converts timestamps to deterministic UTC seconds, enabling the optimizer to prune partitions consistently regardless of client session timezones.",
    explanation: "Ensures deterministic mathematical range boundaries for timezone-aware columns.",
    hint: "Converts timezone-aware timestamps to deterministic UTC seconds for pruning.",
    level: "intermediate",
    codeExample: `PARTITION BY RANGE (UNIX_TIMESTAMP(created_at)) (
  PARTITION p2025 VALUES LESS THAN (UNIX_TIMESTAMP('2026-01-01 00:00:00'))
);`
  },
  {
    question: "Can Prepared Statements benefit from Dynamic Partition Pruning in MySQL 8.0?",
    shortAnswer: "**Yes**, when executing a prepared statement (`EXECUTE stmt USING @param`), MySQL re-evaluates partition pruning at execution time based on the bound parameter values, pruning irrelevant partitions before index lookups.",
    explanation: "Ensures microservices using parameterized queries achieve line-rate partition pruning speed.",
    hint: "Yes, MySQL evaluates dynamic pruning at execution time using bound parameter values.",
    level: "basic",
    codeExample: `PREPARE stmt FROM 'SELECT * FROM orders WHERE order_date = ?';
SET @target_date = '2025-08-25';
EXECUTE stmt USING @target_date; -- Prunes dynamically to p2025!`
  },
  {
    question: "How does `IS NULL` predicate interact with partition pruning under LIST partitioning?",
    shortAnswer: "If a partition explicitly defines `PARTITION p_null VALUES IN (NULL)`, a query with `WHERE col IS NULL` prunes the search to scan **only `p_null`**; if no partition defines `NULL`, the query returns an empty set immediately with zero partition scans.",
    explanation: "Handles NULL lookups with zero unnecessary I/O.",
    hint: "Scans only the partition defined with VALUES IN (NULL).",
    level: "intermediate",
    codeExample: `EXPLAIN SELECT * FROM clients WHERE region_code IS NULL;
-- partitions: p_null`
  },
  {
    question: "What is `EXPLAIN FORMAT=JSON`'s `partitions` field structure?",
    shortAnswer: "It contains a JSON array listing the partition names evaluated by the query optimizer (e.g. `\"partitions\": [\"p2025\"]`), along with detailed cost computations and attached condition strings.",
    explanation: "Standard machine-readable telemetry for continuous database performance monitoring.",
    hint: "JSON array containing partition names and optimizer cost metrics.",
    level: "basic",
    codeExample: `EXPLAIN FORMAT=JSON SELECT * FROM orders WHERE order_date = '2025-06-15';`
  },
  {
    question: "What happens if a query uses an `OR` condition combining a partition key with a non-partitioned column (e.g. `WHERE order_date = '2025-05-01' OR customer_name = 'Mamata'`)?",
    shortAnswer: "**Partition Pruning is completely DISABLED (Scans All Partitions)**; because `customer_name = 'Mamata'` could exist in any historical partition, the optimizer cannot safely exclude any partition and must execute a full table scan across all partitions.",
    explanation: "OR conditions with non-partitioned columns disable pruning.",
    hint: "OR conditions with non-partitioned columns force MySQL to search all partitions.",
    level: "intermediate",
    codeExample: `-- ❌ Scans ALL partitions due to OR condition with unpartitioned column:
SELECT * FROM orders WHERE order_date = '2025-05-01' OR customer_name = 'Mamata';`
  },
  {
    question: "How do you refactor an `OR` query across partitioned tables to re-enable partition pruning?",
    shortAnswer: "Split the query into two separate queries combined with **`UNION`** (or `UNION ALL`): `SELECT * FROM orders WHERE order_date = '2025-05-01' UNION SELECT * FROM orders WHERE customer_name = 'Mamata'`; the first branch achieves 100% partition pruning.",
    explanation: "Allows the optimizer to prune partitions on the partition-filtered branch independently.",
    hint: "Split into separate queries combined with UNION so the partition-filtered branch prunes cleanly.",
    level: "intermediate",
    codeExample: `SELECT * FROM orders WHERE order_date = '2025-05-01' -- Pruned to p2025!
UNION
SELECT * FROM orders WHERE customer_name = 'Mamata';`
  },
  {
    question: "Can user-defined Stored Functions (UDFs) be used in partitioning expressions to support pruning?",
    shortAnswer: "**No**, MySQL partitioning expressions only support built-in deterministic SQL functions; custom Stored Functions, Stored Procedures, and non-deterministic functions (like `NOW()`, `RAND()`, or `UUID()`) are strictly forbidden.",
    explanation: "Partitioning expressions must be deterministic and built into the core server engine.",
    hint: "Stored functions and non-deterministic functions (NOW(), RAND()) are forbidden.",
    level: "basic",
    codeExample: `-- Custom stored functions cannot be used in PARTITION BY.`
  },
  {
    question: "How does partition pruning interact with `INSERT ... ON DUPLICATE KEY UPDATE`?",
    shortAnswer: "The `INSERT` portion evaluates the partition expression to write to the target partition; if a duplicate key conflict occurs, the `UPDATE` is applied within that same partition (or moves the row cross-partition if the partition key is modified).",
    explanation: "Maintains partition routing consistency during upsert operations.",
    hint: "Routes insert to target partition and applies update locally or moves row if key changes.",
    level: "intermediate",
    codeExample: `INSERT INTO sales_records VALUES (101, '2025-04-12', 5000) 
ON DUPLICATE KEY UPDATE amount = 5000;`
  },
  {
    question: "What is `optimizer_prune_level` in MySQL system variables?",
    shortAnswer: "A query optimizer tuning variable that controls whether the optimizer uses heuristic pruning to skip unpromising partial query plans during join order evaluation (default 1 / enabled).",
    explanation: "Accelerates query plan generation for complex multi-table joins.",
    hint: "Controls heuristic pruning during optimizer query plan generation.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'optimizer_prune_level'; -- Default: 1`
  },
  {
    question: "What happens if a query filters on a RANGE partitioned table using `<>` (not equal, e.g. `WHERE YEAR(order_date) <> 2024`)?",
    shortAnswer: "The optimizer prunes `p2024` and scans all remaining partitions (`p2023, p2025, p2026, p_future`), reading only the partitions that can satisfy the inequality.",
    explanation: "Demonstrates inequality pruning capability.",
    hint: "Prunes the excluded partition and scans all remaining partitions.",
    level: "basic",
    codeExample: `EXPLAIN SELECT * FROM orders WHERE YEAR(order_date) <> 2024;
-- partitions: p2023, p2025, p2026, p_future`
  },
  {
    question: "Why does `WHERE order_date + INTERVAL 1 DAY > '2025-01-01'` fail to prune partitions?",
    shortAnswer: "Because adding an interval expression to the column on the left side of the comparison operator prevents the optimizer from isolating the bare column name for range boundary evaluation.",
    explanation: "Always isolate the bare partition column on the left-hand side of the comparison operator.",
    hint: "Keep the partition column isolated on the left side: order_date > '2025-01-01' - INTERVAL 1 DAY.",
    level: "intermediate",
    codeExample: `-- ❌ Bad: WHERE order_date + INTERVAL 1 DAY > '2025-01-01'
-- ✅ Good: WHERE order_date > '2025-01-01' - INTERVAL 1 DAY`
  },
  {
    question: "How does partition pruning affect `COUNT(*)` queries with a partition filter?",
    shortAnswer: "MySQL calculates `COUNT(*)` by scanning index pages only within the matching pruned partitions, completing aggregate counts in milliseconds rather than reading hundreds of millions of historical rows.",
    explanation: "Dramatically accelerates partition-scoped summary analytics.",
    hint: "Scans only index pages within matching pruned partitions for fast aggregate counting.",
    level: "basic",
    codeExample: `SELECT COUNT(*) FROM sales_records WHERE order_date >= '2025-01-01' AND order_date < '2026-01-01';`
  },
  {
    question: "What is `PARTITION BY LIST COLUMNS(...)` and how does it support pruning on string categories?",
    shortAnswer: "`LIST COLUMNS` allows partitioning on discrete string values (e.g. `region VARCHAR(20)`), allowing the optimizer to prune partitions directly when queries filter on categorical string literals (`WHERE region = 'Kolkata'`).",
    explanation: "Eliminates integer mapping tables for categorical data.",
    hint: "Allows partitioning directly on string categories like region codes for direct string pruning.",
    level: "basic",
    codeExample: `PARTITION BY LIST COLUMNS (region) (
  PARTITION p_bengal VALUES IN ('Kolkata', 'Barrackpore', 'Howrah'),
  PARTITION p_north VALUES IN ('Delhi', 'Noida', 'Gurgaon')
);`
  },
  {
    question: "How does the MySQL optimizer handle partition pruning when a query contains conflicting impossible conditions (e.g. `WHERE order_date >= '2025-01-01' AND order_date < '2024-01-01'`)?",
    shortAnswer: "The optimizer detects `Impossible WHERE` during static optimization, prunes **ALL partitions (zero partitions scanned)**, and returns an empty result set instantly with zero disk reads.",
    explanation: "Instant execution for mathematically impossible predicates.",
    hint: "Prunes all partitions and returns empty result set instantly (Impossible WHERE).",
    level: "intermediate",
    codeExample: `EXPLAIN SELECT * FROM orders WHERE order_date >= '2025-01-01' AND order_date < '2024-01-01';
-- Extra: Impossible WHERE (zero partitions read)`
  },
  {
    question: "What is the single most effective technique to guarantee that application developers write queries that enable partition pruning?",
    shortAnswer: "Enforcing static code analysis (linter/CI rules) and query performance audits that require every query against a partitioned table to include the partitioning column in its `WHERE` or `JOIN ON` clause, accompanied by automated `EXPLAIN` verification tests.",
    explanation: "Prevents accidental scatter-gather queries from reaching production databases.",
    hint: "CI/CD query linting and automated EXPLAIN tests verifying that queries filter on the partition key.",
    level: "basic",
    codeExample: `# CI Test: Assert EXPLAIN partitions != 'p2022,p2023,p2024,p2025,p_future'`
  },
  {
    question: "What is the primary operational takeaway of Topic 2 in Module 004_007?",
    shortAnswer: "Partition Pruning is the ultimate query acceleration engine of MySQL table partitioning: by inspecting `WHERE` predicates (`=`, `<`, `>`, `BETWEEN`, `IN`), the optimizer skips non-matching physical `.ibd` files (reducing I/O by 90%+), but it requires **isolating bare partition columns**, using **deterministic monotonic functions** (or `RANGE/LIST COLUMNS`), including partition keys in **JOIN conditions**, and validating pruning via **`EXPLAIN`** (checking the `partitions` column).",
    explanation: "Mastering partition pruning ensures queries on 500-million row tables execute in milliseconds with zero buffer pool thrashing.",
    hint: "Summarize optimizer pruning mechanics, supported operators, bare column isolation, partition-wise joins, and EXPLAIN verification.",
    level: "basic",
    codeExample: `-- Master Partition Pruning Checklist:
# 1. Inspect execution plan:
EXPLAIN SELECT * FROM enterprise_ledger 
WHERE txn_date BETWEEN '2025-01-01' AND '2025-03-31';

# 2. Check output:
# partitions: p2025_q1 (1 partition read, 95% pruned!)`
  }
];

export default questions;
