// topic8_files/topic8_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 8: Key sys Views: sys.statement_analysis, sys.schema_unused_indexes, sys.schema_table_lock_waits, sys.memory_global_by_current_bytes

const questions = [
  {
    question: "What are the four cornerstone diagnostic views in the MySQL `sys` schema?",
    shortAnswer: "1. `sys.statement_analysis` (query performance ranking), 2. `sys.schema_unused_indexes` (identifying zero-lookup indexes), 3. `sys.schema_table_lock_waits` (metadata & table lock stall triage), and 4. `sys.memory_global_by_current_bytes` (server RAM consumption breakdown).",
    explanation: "These four views cover the primary pillars of database administration: query latency, index efficiency, concurrency locks, and memory health.",
    hint: "Statement analysis, unused indexes, table lock waits, and global memory allocations.",
    level: "basic",
    codeExample: `SELECT * FROM sys.statement_analysis LIMIT 1;
SELECT * FROM sys.schema_unused_indexes LIMIT 1;
SELECT * FROM sys.schema_table_lock_waits LIMIT 1;
SELECT * FROM sys.memory_global_by_current_bytes LIMIT 1;`
  },
  {
    question: "What critical query performance metrics are aggregated in `sys.statement_analysis`?",
    shortAnswer: "`query` (normalized template), `exec_count` (total calls), `total_latency` (cumulative runtime), `avg_latency`, `lock_latency`, `rows_sent_avg`, `rows_examined_avg`, `tmp_tables`, `tmp_disk_tables`, and `sort_merge_passes`.",
    explanation: "Provides an all-in-one performance card for every unique SQL statement executed on the server.",
    hint: "Normalized query, call count, total/avg latency, rows examined, tmp disk tables, sort passes.",
    level: "basic",
    codeExample: `SELECT query, exec_count, total_latency, avg_latency, rows_examined_avg 
FROM sys.statement_analysis 
ORDER BY total_latency DESC LIMIT 5;`
  },
  {
    question: "How does `sys.schema_unused_indexes` determine that an index has not been used?",
    shortAnswer: "It queries the Performance Schema table I/O index statistics (`table_io_waits_summary_by_index_usage`) to find indexes with `COUNT_STAR = 0` (zero read fetch operations) since the server was started.",
    explanation: "If an index has never been traversed by the optimizer for read queries, it is flagged as unused.",
    hint: "Finds indexes with zero read I/O operations recorded since server startup.",
    level: "intermediate",
    codeExample: `SELECT object_schema, object_name, index_name 
FROM sys.schema_unused_indexes 
WHERE object_schema = 'kolkata_retail';`
  },
  {
    question: "Why must database administrators NEVER drop indexes identified by `sys.schema_unused_indexes` immediately after a server restart?",
    shortAnswer: "Because Performance Schema telemetry counters reset to zero upon server reboot; an index vital for quarterly or monthly financial reporting will show 0 usage until that periodic report actually runs.",
    explanation: "Best practice is to evaluate unused indexes only after the server has maintained continuous uptime through an entire business reporting cycle (at least 30 to 90 days).",
    hint: "Counters reset on reboot; must observe server over an entire business reporting cycle.",
    level: "intermediate",
    codeExample: `-- Only evaluate after checking Uptime in SHOW GLOBAL STATUS:
SHOW GLOBAL STATUS LIKE 'Uptime';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, an `ALTER TABLE products ADD COLUMN discount_tier INT;` was hanging indefinitely, freezing all cashier checkouts. How did Mamata resolve it in 10 seconds using `sys.schema_table_lock_waits`?",
    shortAnswer: "She queried `sys.schema_table_lock_waits`, which identified an uncommitted cashier reporting session blocking the DDL lock, and executed the view's auto-generated `sql_kill_blocking_connection` command (`KILL 142`).",
    explanation: "Killing the blocking session immediately released the metadata lock, allowing the `ALTER TABLE` to complete instantly across ₹1.2 Crores in store inventory.",
    hint: "Executed the auto-generated sql_kill_blocking_connection command to terminate the blocker.",
    level: "moderate",
    codeExample: `# Barrackpore Lock Resolution:
SELECT waiting_account, blocking_account, sql_kill_blocking_connection 
FROM sys.schema_table_lock_waits;
-- Output: KILL 142;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, the MySQL server was consuming 94% of host RAM on a 128GB node. How did Debangshu use `sys.memory_global_by_current_bytes` to prevent an Out-Of-Memory crash?",
    shortAnswer: "The view revealed that `memory/sql/THD::main_mem_root` had ballooned to 42GB because an analytics microservice opened 2,000 idle connections with oversized session memory buffers.",
    explanation: "Configuring connection pool timeouts and reducing `max_connections` immediately freed 38GB of RAM, restoring safe memory headroom for the ₹500 Crore banking database.",
    hint: "Identified 42GB of connection memory bloat across 2,000 unpooled idle connections.",
    level: "expert",
    codeExample: `SELECT event_name, current_alloc, high_alloc 
FROM sys.memory_global_by_current_bytes 
LIMIT 5;`
  },
  {
    question: "What unique auto-generated helper columns are included in `sys.schema_table_lock_waits`?",
    shortAnswer: "`sql_kill_blocking_query` (e.g. `KILL QUERY 104`) and `sql_kill_blocking_connection` (e.g. `KILL 104`).",
    explanation: "These columns generate ready-to-execute SQL kill statements, eliminating the need for DBAs to manually look up processlist IDs during high-stress production outages.",
    hint: "Auto-generates ready-to-run KILL QUERY and KILL connection SQL statements.",
    level: "basic",
    codeExample: `SELECT sql_kill_blocking_query, sql_kill_blocking_connection 
FROM sys.schema_table_lock_waits;`
  },
  {
    question: "Why do `PRIMARY` keys and `UNIQUE` constraints with foreign key dependencies never appear in `sys.schema_unused_indexes`?",
    shortAnswer: "Because `sys.schema_unused_indexes` explicitly filters out `PRIMARY` keys and unique constraint indexes required for foreign key relational integrity, preventing accidental dropping of core schema constraints.",
    explanation: "Primary keys are essential for table identity and InnoDB clustered storage even if secondary lookups do not occur.",
    hint: "Explicitly excludes PRIMARY keys and unique foreign key constraints for safety.",
    level: "intermediate",
    codeExample: `-- PRIMARY keys and unique constraints are protected and never shown.`
  },
  {
    question: "What does the `full_scan` column indicate in `sys.statement_analysis`?",
    shortAnswer: "A binary flag (`*` or empty) indicating whether executions of this query performed full table scans without index lookups.",
    explanation: "An asterisk (`*`) immediately flags queries that scan entire tables from start to finish.",
    hint: "Flag indicating whether the query executes full table scans.",
    level: "basic",
    codeExample: `SELECT query, exec_count, full_scan, rows_examined_avg 
FROM sys.statement_analysis 
WHERE full_scan = '*' 
LIMIT 5;`
  },
  {
    question: "How do you find queries that spill temporary result sets to physical disk using `sys.statement_analysis`?",
    shortAnswer: "Query `sys.statement_analysis` filtering for `tmp_disk_tables > 0` ordered by `tmp_disk_tables DESC`.",
    explanation: "Isolates queries that exhaust in-memory temporary table buffers (`tmp_table_size` / `max_heap_table_size`) and trigger disk I/O.",
    hint: "Filter for tmp_disk_tables > 0 in sys.statement_analysis.",
    level: "basic",
    codeExample: `SELECT query, exec_count, tmp_tables, tmp_disk_tables 
FROM sys.statement_analysis 
WHERE tmp_disk_tables > 0 
ORDER BY tmp_disk_tables DESC LIMIT 10;`
  },
  {
    question: "What does `sort_merge_passes` indicate in `sys.statement_analysis`?",
    shortAnswer: "The total number of times the sorting engine had to write intermediate sort runs to temporary disk files because the result set exceeded `sort_buffer_size` in RAM.",
    explanation: "Non-zero sort merge passes highlight queries that benefit from index-based ordering or larger sort buffers.",
    hint: "Counts disk-based sorting merge passes due to sort buffer exhaustion.",
    level: "intermediate",
    codeExample: `SELECT query, exec_count, total_latency, sort_merge_passes 
FROM sys.statement_analysis 
WHERE sort_merge_passes > 0 
ORDER BY sort_merge_passes DESC;`
  },
  {
    question: "How does `sys.memory_global_by_current_bytes` differ from the Linux OS `free -m` or `top` command?",
    shortAnswer: "`free -m` only shows aggregate OS RAM usage; `sys.memory_global_by_current_bytes` provides internal database-level attribution, showing exactly how many megabytes are allocated to the InnoDB buffer pool, Adaptive Hash Index, connection threads, and join buffers.",
    explanation: "Enables granular attribution of which internal database subsystem is driving RAM consumption.",
    hint: "Provides internal subsystem attribution (buffer pool, join buffers, connection threads).",
    level: "intermediate",
    codeExample: `SELECT event_name, current_alloc, high_alloc 
FROM sys.memory_global_by_current_bytes 
WHERE event_name LIKE '%innodb%' LIMIT 5;`
  },
  {
    question: "What is `high_alloc` in `sys.memory_global_by_current_bytes`?",
    shortAnswer: "The peak (watermark) memory allocation reached by that specific subsystem since MySQL server startup.",
    explanation: "Helps DBAs determine if memory usage recently spiked during peak transactional volume even if current allocation has dropped.",
    hint: "Tracks the historical peak memory watermark reached since server startup.",
    level: "intermediate",
    codeExample: `SELECT event_name, current_alloc, high_alloc 
FROM sys.memory_global_by_current_bytes 
ORDER BY high_alloc DESC LIMIT 5;`
  },
  {
    question: "How do you filter `sys.statement_analysis` to only show queries executed against a specific database schema?",
    shortAnswer: "Add a `WHERE db = 'schema_name'` clause to the query.",
    explanation: "Isolates query performance metrics for a single application database.",
    hint: "Filter by the db column in WHERE clause.",
    level: "basic",
    codeExample: `SELECT query, exec_count, total_latency, avg_latency 
FROM sys.statement_analysis 
WHERE db = 'kolkata_retail' 
ORDER BY total_latency DESC LIMIT 5;`
  },
  {
    question: "What does `rows_examined_avg` vs `rows_sent_avg` in `sys.statement_analysis` reveal about query efficiency?",
    shortAnswer: "If `rows_examined_avg` is drastically higher than `rows_sent_avg` (e.g. 500,000 examined vs 10 sent), the query lacks an effective index and is scanning thousands of unnecessary rows.",
    explanation: "A high examination-to-sent ratio is the definitive signature of a missing index.",
    hint: "High examined-to-sent ratio indicates missing index and inefficient row scanning.",
    level: "basic",
    codeExample: `# Examined: 2,500,000  Sent: 1  → Needs Index!
SELECT query, rows_examined_avg, rows_sent_avg 
FROM sys.statement_analysis 
ORDER BY (rows_examined_avg / (rows_sent_avg + 1)) DESC LIMIT 5;`
  },
  {
    question: "What is the difference between `sys.schema_table_lock_waits` and `sys.innodb_lock_waits`?",
    shortAnswer: "`sys.schema_table_lock_waits` focuses on table-level and metadata locks (e.g. DDL blocking DML); `sys.innodb_lock_waits` focuses on row-level, gap, and next-key record locks within the InnoDB storage engine.",
    explanation: "Use `schema_table_lock_waits` for DDL stalls and `innodb_lock_waits` for row-level transaction deadlocks.",
    hint: "schema_table_lock_waits is table/metadata locks; innodb_lock_waits is row-level transaction locks.",
    level: "intermediate",
    codeExample: `-- Table/Metadata locks:
SELECT * FROM sys.schema_table_lock_waits;
-- Row-level InnoDB locks:
SELECT * FROM sys.innodb_lock_waits;`
  },
  {
    question: "What is `first_seen` and `last_seen` in `sys.statement_analysis`?",
    shortAnswer: "Timestamps recording the exact date and time the query template was first executed after server boot and when it was most recently executed.",
    explanation: "Helps verify whether a slow query was introduced recently after a new software deployment.",
    hint: "Timestamps of first and most recent query execution.",
    level: "basic",
    codeExample: `SELECT query, exec_count, first_seen, last_seen 
FROM sys.statement_analysis 
ORDER BY last_seen DESC LIMIT 5;`
  },
  {
    question: "How do you check for memory allocated to client connection threads using `sys.memory_global_by_current_bytes`?",
    shortAnswer: "Filter for `event_name LIKE 'memory/sql/THD%'`.",
    explanation: "Measures RAM consumed by per-thread connection memory structures.",
    hint: "Filter for memory/sql/THD% event names.",
    level: "expert",
    codeExample: `SELECT event_name, current_count, current_alloc 
FROM sys.memory_global_by_current_bytes 
WHERE event_name LIKE 'memory/sql/THD%';`
  },
  {
    question: "How do you identify statements with high lock wait latency in `sys.statement_analysis`?",
    shortAnswer: "Sort by `lock_latency DESC`: `SELECT query, exec_count, total_latency, lock_latency FROM sys.statement_analysis ORDER BY lock_latency DESC LIMIT 10;`.",
    explanation: "Highlights queries that suffer from transactional concurrency contention rather than slow indexing.",
    hint: "Sort by lock_latency DESC.",
    level: "intermediate",
    codeExample: `SELECT query, exec_count, total_latency, lock_latency 
FROM sys.statement_analysis 
ORDER BY lock_latency DESC LIMIT 5;`
  },
  {
    question: "What is the impact of dropping an index that is falsely assumed to be unused?",
    shortAnswer: "Queries relying on that index will degrade to full table scans, causing CPU utilization to spike to 100%, query response times to skyrocket from milliseconds to seconds, and potential application outages.",
    explanation: "Always verify that the server has been running through an entire business quarter before dropping unused indexes.",
    hint: "Degrades queries to full table scans, causing severe CPU and latency spikes.",
    level: "basic",
    codeExample: `-- Never drop without verifying complete 90-day server uptime.`
  },
  {
    question: "How do you find the raw unformatted version of `sys.schema_unused_indexes` for custom automation scripts?",
    shortAnswer: "`sys.x$schema_unused_indexes` (or query `performance_schema.table_io_waits_summary_by_index_usage`).",
    explanation: "Provides pure raw table names and index identifiers for automated schema cleanup tools.",
    hint: "Query sys.x$schema_unused_indexes.",
    level: "basic",
    codeExample: `SELECT * FROM sys.x$schema_unused_indexes;`
  },
  {
    question: "What does `err_count` and `warn_count` indicate in `sys.statement_analysis`?",
    shortAnswer: "The cumulative count of SQL errors (e.g. constraint violations, duplicate keys) and warnings (e.g. data truncations, division by zero) generated by that query template.",
    explanation: "Exposes application queries that fail repeatedly in production.",
    hint: "Counts cumulative SQL errors and warnings per query pattern.",
    level: "basic",
    codeExample: `SELECT query, exec_count, err_count, warn_count 
FROM sys.statement_analysis 
WHERE err_count > 0 
ORDER BY err_count DESC LIMIT 5;`
  },
  {
    question: "What is `sys.memory_global_total` and how is it calculated?",
    shortAnswer: "A single-row summary view that calculates the total amount of RAM currently allocated by all Performance Schema memory instruments combined.",
    explanation: "Provides an instant one-line summary of total server memory usage.",
    hint: "Single-row summary of total server RAM allocated across all subsystems.",
    level: "basic",
    codeExample: `SELECT * FROM sys.memory_global_total;`
  },
  {
    question: "How do you identify queries that examine more than 100,000 rows on average using `sys.statement_analysis`?",
    shortAnswer: "Execute `SELECT query, exec_count, total_latency, rows_examined_avg FROM sys.statement_analysis WHERE rows_examined_avg > 100000 ORDER BY rows_examined_avg DESC;`.",
    explanation: "Pinpoints heavy table scans that scan massive datasets on every invocation.",
    hint: "Filter for rows_examined_avg > 100000 in sys.statement_analysis.",
    level: "basic",
    codeExample: `SELECT query, exec_count, total_latency, rows_examined_avg 
FROM sys.statement_analysis 
WHERE rows_examined_avg > 100000 
ORDER BY rows_examined_avg DESC LIMIT 5;`
  },
  {
    question: "What does `waiting_query_secs` represent in `sys.schema_table_lock_waits`?",
    shortAnswer: "The total number of seconds the blocked query has been waiting for the metadata or table lock to be released.",
    explanation: "Allows DBAs to identify transactions that have been stalled for long durations.",
    hint: "Seconds the blocked transaction has spent waiting for the lock.",
    level: "basic",
    codeExample: `SELECT waiting_account, waiting_query, waiting_query_secs 
FROM sys.schema_table_lock_waits;`
  },
  {
    question: "Why does `sys.statement_analysis` group queries by digest rather than raw SQL text?",
    shortAnswer: "Because grouping by normalized digest merges thousands of individual queries with different parameter literals into a single aggregated row, providing meaningful statistical sample sizes.",
    explanation: "Prevents log fragmentation where identical queries with different IDs appear on separate lines.",
    hint: "Merges queries with different literals into unified statistical digests.",
    level: "basic",
    codeExample: `-- Normalizes WHERE id=1 and WHERE id=2 into WHERE id=?`
  },
  {
    question: "How can you reset statistics in `sys.statement_analysis` before running a performance benchmark?",
    shortAnswer: "Execute `TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;`.",
    explanation: "Because `sys.statement_analysis` is a view over `events_statements_summary_by_digest`, truncating the underlying table resets the view immediately.",
    hint: "Truncate performance_schema.events_statements_summary_by_digest.",
    level: "intermediate",
    codeExample: `TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;`
  },
  {
    question: "What is `current_avg_alloc` in `sys.memory_global_by_current_bytes`?",
    shortAnswer: "The average byte size per memory allocation block for that specific event subsystem.",
    explanation: "Helps identify whether memory is fragmented across millions of tiny blocks or a few massive contiguous buffers.",
    hint: "Average byte size per allocated memory block.",
    level: "expert",
    codeExample: `SELECT event_name, current_alloc, current_avg_alloc 
FROM sys.memory_global_by_current_bytes 
LIMIT 5;`
  },
  {
    question: "What is the primary operational advantage of `sys.statement_analysis` over the Slow Query Log in production monitoring?",
    shortAnswer: "`sys.statement_analysis` maintains in-memory aggregated statistics across 100% of queries continuously without writing to disk, eliminates log file rotation management, and is directly queryable with SQL filters in real-time.",
    explanation: "Unlike slow logs that require external parsing tools, `sys.statement_analysis` is instantly available inside the MySQL client.",
    hint: "Instant SQL queryability, continuous in-memory aggregation, and zero disk I/O.",
    level: "basic",
    codeExample: `-- Instant SQL queryability inside mysql client.`
  },
  {
    question: "What is the primary operational takeaway of Topic 8 in Module 004_005?",
    shortAnswer: "The four cornerstone `sys` views form the essential diagnostic toolkit for MySQL DBAs: use `sys.statement_analysis` to rank queries by cumulative server impact, query `sys.schema_unused_indexes` to safely reclaim RAM after 90 days of uptime, resolve metadata lock stalls live using `sys.schema_table_lock_waits` auto-generated `KILL` commands, and monitor `sys.memory_global_by_current_bytes` to prevent Linux kernel OOM crashes.",
    explanation: "Mastering these four views provides comprehensive command over query performance, indexing efficiency, transactional concurrency, and memory stability.",
    hint: "Summarize statement_analysis for query ranking, unused_indexes for RAM reclamation, schema_table_lock_waits for KILL commands, and memory_global for OOM prevention.",
    level: "basic",
    codeExample: `-- Master 4-View Production Diagnostic Dashboard:
SELECT '1. Top Heavy Queries' AS title;
SELECT query, exec_count, total_latency, avg_latency FROM sys.statement_analysis LIMIT 3;

SELECT '2. Unused Indexes' AS title;
SELECT object_schema, object_name, index_name FROM sys.schema_unused_indexes LIMIT 3;

SELECT '3. Live Lock Waits' AS title;
SELECT waiting_account, blocking_account, sql_kill_blocking_connection FROM sys.schema_table_lock_waits;

SELECT '4. Global Memory Allocations' AS title;
SELECT event_name, current_alloc FROM sys.memory_global_by_current_bytes LIMIT 3;`
  }
];

export default questions;
