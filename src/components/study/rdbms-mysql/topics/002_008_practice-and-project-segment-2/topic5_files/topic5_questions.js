// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the purpose of the MySQL Slow Query Log?",
    shortAnswer: "To automatically log all SQL queries whose execution time exceeds `long_query_time` seconds, helping administrators identify database bottlenecks.",
    explanation: "Essential production tool for capturing slow queries in production.",
    hint: "Captures queries exceeding a defined long_query_time threshold.",
    level: "basic"
  },
  {
    question: "What does `type: ALL` mean in MySQL `EXPLAIN` output?",
    shortAnswer: "A Full Table Scan ($O(N)$), where the database engine must physically read every single page in the table from disk/buffer pool.",
    explanation: "The most expensive access method for large tables.",
    hint: "Full Table Scan reading every row in the table.",
    level: "basic"
  },
  {
    question: "What does `type: const` mean in `EXPLAIN` output?",
    shortAnswer: "A single point lookup that matches at most one row because the query filters on a Primary Key or UNIQUE index with constant values.",
    explanation: "The fastest possible lookup type in MySQL.",
    hint: "Single-row lookup via Primary Key or UNIQUE constraint.",
    level: "basic"
  },
  {
    question: "What is the hierarchy of `EXPLAIN` join types from fastest to slowest?",
    shortAnswer: "`system` > `const` > `eq_ref` > `ref` > `range` > `index` > `ALL`.",
    explanation: "Knowing this hierarchy allows evaluating execution plan quality at a glance.",
    hint: "const → eq_ref → ref → range → index → ALL.",
    level: "basic"
  },
  {
    question: "What does 'SARGable' stand for in database query optimization?",
    shortAnswer: "'Search Argument Able' — a WHERE clause predicate that can directly leverage an index B-Tree search without wrapping columns in functions.",
    explanation: "Non-SARGable queries disable index lookups and trigger full table scans.",
    hint: "Search Argument Able: allows direct B-Tree index traversal.",
    level: "basic"
  },
  {
    question: "Why is `WHERE YEAR(created_at) = 2026` non-SARGable?",
    shortAnswer: "Because applying `YEAR()` forces the MySQL engine to compute the function on every row's timestamp, preventing a direct B-Tree range seek.",
    explanation: "Function calls on index columns blind the optimizer.",
    hint: "Function call on column prevents B-Tree index seek.",
    level: "basic"
  },
  {
    question: "How do you refactor `WHERE YEAR(created_at) = 2026` to make it SARGable?",
    shortAnswer: "`WHERE created_at >= '2026-01-01 00:00:00' AND created_at < '2027-01-01 00:00:00'`",
    explanation: "Enables an efficient B-Tree `type: range` index seek.",
    hint: "Use an explicit date range: >= '2026-01-01' AND < '2027-01-01'.",
    level: "basic"
  },
  {
    question: "What causes `Extra: Using filesort` in an `EXPLAIN` plan?",
    shortAnswer: "When the database cannot satisfy the `ORDER BY` clause using the index's physical ordering and must sort rows in RAM (sort buffer) or temp disk files.",
    explanation: "Filesort indicates an in-memory or on-disk sort operation.",
    hint: "Sort buffer operation when index cannot provide requested ordering.",
    level: "moderate"
  },
  {
    question: "How do you eliminate `Using filesort` for `WHERE customer_id = 101 ORDER BY order_date DESC`?",
    shortAnswer: "Create a composite index on `(customer_id, order_date DESC)` (or ASC).",
    explanation: "Allows the engine to seek matching customer rows already physically ordered by date.",
    hint: "Create a composite index on (customer_id, order_date).",
    level: "moderate"
  },
  {
    question: "What does `Extra: Using index` mean in `EXPLAIN` output?",
    shortAnswer: "The query is fully satisfied using only the secondary index B-Tree pages (Covering Index) without ever reading physical table data pages.",
    explanation: "Eliminates the secondary-to-clustered double lookup bookmark step.",
    hint: "Covering index: all requested columns exist in the secondary index.",
    level: "moderate"
  },
  {
    question: "What does `Extra: Using temporary` mean in `EXPLAIN` output?",
    shortAnswer: "The server must create an internal temporary table in memory (or on disk if size exceeds buffer) to hold intermediate results for `GROUP BY` or `DISTINCT`.",
    explanation: "Can cause severe latency if temporary tables spill to disk.",
    hint: "Intermediate temporary table created for GROUP BY or DISTINCT.",
    level: "moderate"
  },
  {
    question: "Why does `WHERE phone_number = 9830098214` cause a full table scan on a `VARCHAR(15)` column?",
    shortAnswer: "Implicit Type Conversion: MySQL converts every string in the column to a number before comparison, blinding the B-Tree index.",
    explanation: "Data type mismatches break index lookups.",
    hint: "Implicit type conversion converts every row to a number.",
    level: "moderate"
  },
  {
    question: "What is the difference between `EXPLAIN` and `EXPLAIN ANALYZE` in MySQL 8.0+?",
    shortAnswer: "`EXPLAIN` shows the optimizer's estimated plan without running the query; `EXPLAIN ANALYZE` actually executes the query and prints exact measured times and row counts.",
    explanation: "EXPLAIN ANALYZE reveals actual runtime iterators and latency.",
    hint: "EXPLAIN is estimated; EXPLAIN ANALYZE executes and measures actual runtime.",
    level: "expert"
  },
  {
    question: "What is Index Condition Pushdown (ICP) indicated by `Using index condition`?",
    shortAnswer: "An optimization where the storage engine (InnoDB) evaluates WHERE conditions directly on index columns before reading complete data rows, reducing table reads.",
    explanation: "Reduces communication between the storage engine and server layer.",
    hint: "Storage engine filters index conditions before fetching full rows.",
    level: "expert"
  },
  {
    question: "What does `rows` column indicate in MySQL `EXPLAIN` output?",
    shortAnswer: "The optimizer's statistical estimate of how many rows it must examine to execute the query.",
    explanation: "Lower row counts generally correlate with faster query execution.",
    hint: "Estimated number of rows the engine expects to examine.",
    level: "basic"
  },
  {
    question: "What does `filtered` column indicate in MySQL `EXPLAIN` output?",
    shortAnswer: "The estimated percentage of examined rows that will satisfy the remaining filtering conditions (100% is ideal; 1% means 99% of examined rows are discarded).",
    explanation: "Low filtered percentages suggest missing composite index columns.",
    hint: "Percentage of examined rows that will match filtering criteria.",
    level: "moderate"
  },
  {
    question: "What is the 'Leading Wildcard Trap' with the `LIKE` operator?",
    shortAnswer: "`LIKE '%react'` cannot use a standard B-Tree index because the starting characters are unknown, forcing a Full Table Scan.",
    explanation: "Trailing wildcards (`LIKE 'react%'`) are SARGable; leading wildcards are not.",
    hint: "Leading wildcards (%text) disable B-Tree seeks; use trailing wildcards.",
    level: "basic"
  },
  {
    question: "How do you enable MySQL Slow Query Log dynamically in a running server?",
    shortAnswer: "`SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 1.0;`",
    explanation: "Enables logging without requiring a MySQL server restart.",
    hint: "SET GLOBAL slow_query_log = 'ON'; SET GLOBAL long_query_time = 1.0;",
    level: "basic"
  },
  {
    question: "What does `key_len` column reveal in `EXPLAIN` output?",
    shortAnswer: "The exact number of bytes of the index that are actively used by the query to perform tree traversal.",
    explanation: "Helps verify how many columns of a composite index are active.",
    hint: "Number of bytes of the composite index actively utilized.",
    level: "moderate"
  },
  {
    question: "What is an Invisible Index in MySQL 8.0+?",
    shortAnswer: "An index that is maintained by the storage engine on writes but ignored by the query optimizer on reads (`ALTER TABLE t ALTER INDEX idx INVISIBLE;`).",
    explanation: "Allows testing whether an index is needed before permanently dropping it.",
    hint: "Maintained on writes but hidden from the query optimizer.",
    level: "moderate"
  },
  {
    question: "How do you detect unused indexes across a MySQL production database?",
    shortAnswer: "Query `sys.schema_unused_indexes` or `information_schema.table_io_waits_summary_by_index_usage`.",
    explanation: "Identifies dead indexes consuming write I/O and RAM.",
    hint: "Query the sys.schema_unused_indexes view.",
    level: "expert"
  },
  {
    question: "What is the consequence of having too many unused indexes on a table?",
    shortAnswer: "Severe Write Amplification ('Index Tax') on every INSERT, UPDATE, and DELETE, plus wasted memory in the InnoDB Buffer Pool.",
    explanation: "Every write must update all secondary B-Trees.",
    hint: "Degrades write performance and wastes buffer pool RAM.",
    level: "basic"
  },
  {
    question: "Why should `OR` conditions across different columns be monitored closely in query tuning?",
    shortAnswer: "`WHERE colA = 1 OR colB = 2` often prevents single-index seeks, forcing an `Index Merge` or Full Table Scan unless composite or union structures are used.",
    explanation: "OR logic is harder for optimizers to navigate than AND logic.",
    hint: "OR conditions across different columns can trigger full table scans.",
    level: "moderate"
  },
  {
    question: "How can a slow `OR` query be refactored for better performance?",
    shortAnswer: "Rewrite as a `UNION ALL` combining two fast index-seeking queries: `SELECT ... WHERE colA = 1 UNION ALL SELECT ... WHERE colB = 2 AND colA != 1;`",
    explanation: "Enables independent B-Tree seeks on each index.",
    hint: "Rewrite as a UNION ALL of two index-seeking queries.",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN FORMAT=JSON` provide over standard tabular `EXPLAIN`?",
    shortAnswer: "It displays detailed cost estimates (query cost), memory buffer allocations, attached subquery conditions, and sort costs.",
    explanation: "Gives granular insight into optimizer cost decisions.",
    hint: "Provides numeric query cost metrics and detailed condition structures.",
    level: "expert"
  },
  {
    question: "How do slow queries for Mamata, Susmita, Abhronila, and Debangshu demonstrate performance tuning?",
    shortAnswer: "By reducing student academic transcript lookups from 500,000 scanned rows (2.4s) to a 3-row covering index seek (1.2ms) via composite indexing.",
    explanation: "Demonstrates 2,000x performance acceleration on production academy data.",
    hint: "Reduces student transcript query from 2.4s to 1.2ms using covering indexes.",
    level: "basic"
  },
  {
    question: "What command refreshes InnoDB index cardinality statistics when an execution plan seems sub-optimal?",
    shortAnswer: "`ANALYZE TABLE table_name;`",
    explanation: "Samples index pages to update cardinality estimates for the optimizer.",
    hint: "ANALYZE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What is the danger of `SELECT *` in high-throughput query design?",
    shortAnswer: "It forces clustered index lookups for all columns, preventing the optimizer from using fast Covering Indexes (`Using index`).",
    explanation: "Select only required columns to enable index-only scans.",
    hint: "Prevents covering index optimization by requesting all columns.",
    level: "basic"
  },
  {
    question: "What index is required to optimize `WHERE branch_id = 1 AND status = 'ACTIVE' ORDER BY admission_date DESC`?",
    shortAnswer: "A composite index following the `(Equality, Range, Sort)` rule: `CREATE INDEX idx_branch_status_date ON admissions (branch_id, status, admission_date DESC);`",
    explanation: "Handles both equality filters and sorting in a single B-Tree seek.",
    hint: "Composite index on (branch_id, status, admission_date DESC).",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for debugging slow queries?",
    shortAnswer: "Capture slow queries with the slow query log, profile with `EXPLAIN ANALYZE`, eliminate non-SARGable expressions, create composite covering indexes adhering to the (Equality, Range, Sort) formula, and prune unused indexes.",
    explanation: "The complete end-to-end performance tuning blueprint.",
    hint: "Slow log → EXPLAIN ANALYZE → SARGable predicates → Composite covering indexes.",
    level: "expert"
  }
];

export default questions;
