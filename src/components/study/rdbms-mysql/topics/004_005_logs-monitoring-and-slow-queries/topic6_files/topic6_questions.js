// topic6_files/topic6_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 6: Performance Schema Architecture: Memory Storage Engine Tables, Instrumentation, and Consumers

const questions = [
  {
    question: "What is the MySQL Performance Schema and how is its storage architecture implemented?",
    shortAnswer: "It is an internal diagnostic subsystem implemented using the in-memory `PERFORMANCE_SCHEMA` storage engine, which collects runtime execution telemetry in lock-free memory ring buffers with zero disk I/O.",
    explanation: "Because it stores telemetry entirely in system RAM without writing to disk, it monitors queries and server internals with negligible (<1%) overhead.",
    hint: "Internal in-memory diagnostic engine with zero disk I/O.",
    level: "basic",
    codeExample: `SHOW ENGINES;
-- PERFORMANCE_SCHEMA | YES | Memory-allocated performance schema`
  },
  {
    question: "What is the difference between an Instrument and a Consumer in the Performance Schema?",
    shortAnswer: "An **Instrument** (`setup_instruments`) is a probe point embedded in MySQL server code that captures measurements (e.g. `statement/sql/select`); a **Consumer** (`setup_consumers`) is a destination table that stores and aggregates the captured telemetry (e.g. `events_statements_history`).",
    explanation: "Instruments collect the raw telemetry; Consumers filter, aggregate, and store it into queryable tables.",
    hint: "Instruments are code probe sensors; Consumers are destination storage tables.",
    level: "basic",
    codeExample: `-- Check Instruments:
SELECT * FROM performance_schema.setup_instruments LIMIT 5;
-- Check Consumers:
SELECT * FROM performance_schema.setup_consumers;`
  },
  {
    question: "What are the 4 hierarchical statement event tables in the Performance Schema?",
    shortAnswer: "1. `events_statements_current` (currently executing or most recent query per thread); 2. `events_statements_history` (last 10 queries per thread); 3. `events_statements_history_long` (last 10,000 queries globally); 4. `events_statements_summary_by_digest` (aggregated summary grouped by normalized SQL pattern).",
    explanation: "Provides granular real-time per-thread inspection as well as global historical aggregations.",
    hint: "current, history (per thread), history_long (global), and summary_by_digest.",
    level: "intermediate",
    codeExample: `SELECT SQL_TEXT, TIMER_WAIT 
FROM performance_schema.events_statements_current 
WHERE SQL_TEXT IS NOT NULL;`
  },
  {
    question: "In what unit of time are `TIMER_WAIT`, `TIMER_START`, and `TIMER_END` stored in Performance Schema tables, and how do you convert them to seconds?",
    shortAnswer: "They are stored in **picoseconds** (trillionths of a second, $10^{-12}$s); divide by `1000000000000` (1 trillion / $10^{12}$) to convert to seconds, or divide by `1000000000` ($10^9$) to convert to milliseconds.",
    explanation: "High-resolution picosecond counters provide microsecond accuracy for sub-millisecond query benchmarking.",
    hint: "Stored in picoseconds; divide by 1,000,000,000,000 to convert to seconds.",
    level: "basic",
    codeExample: `SELECT 
  DIGEST_TEXT, 
  ROUND(SUM_TIMER_WAIT / 1000000000000, 3) AS total_sec,
  ROUND(AVG_TIMER_WAIT / 1000000000, 2) AS avg_ms
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 5;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a cashier POS query was intermittently hanging for 2 seconds. How did Mamata use `events_statements_current` to catch the hung query live?",
    shortAnswer: "She ran `SELECT THREAD_ID, SQL_TEXT, TIMER_WAIT/1000000000000 AS sec FROM performance_schema.events_statements_current WHERE TIMER_WAIT > 1000000000000;`, instantly revealing a `SELECT ... FOR UPDATE` query waiting on an uncommitted cashier lock.",
    explanation: "Viewing the live in-memory table exposed the exact hung query without waiting for the slow query log to write upon completion.",
    hint: "Queried events_statements_current to catch the actively running transaction.",
    level: "moderate",
    codeExample: `# Barrackpore Live Query Capture:
SELECT THREAD_ID, SQL_TEXT, ROUND(TIMER_WAIT/1000000000000, 2) AS running_sec 
FROM performance_schema.events_statements_current 
WHERE TIMER_WAIT > 2000000000000;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu identify the top 3 most expensive query patterns across ₹500 Crores in transaction volume without enabling the Slow Query Log?",
    shortAnswer: "He queried `performance_schema.events_statements_summary_by_digest` ordered by `SUM_TIMER_WAIT DESC`, which summarized 10 million transactions into normalized digests with zero disk I/O.",
    explanation: "The summary table provided total latency, call counts, row scan ratios, and temporary table counts grouped by query structure.",
    hint: "Queried events_statements_summary_by_digest for in-memory aggregated query statistics.",
    level: "expert",
    codeExample: `SELECT 
  DIGEST_TEXT, COUNT_STAR, 
  ROUND(SUM_TIMER_WAIT/1000000000000, 2) AS total_sec,
  SUM_ROWS_EXAMINED, SUM_CREATED_TMP_DISK_TABLES
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 3;`
  },
  {
    question: "How do you enable a specific instrument dynamically in MySQL 8.0 without restarting the server?",
    shortAnswer: "Execute an `UPDATE` statement on `performance_schema.setup_instruments`: `UPDATE performance_schema.setup_instruments SET ENABLED = 'YES', TIMED = 'YES' WHERE NAME LIKE 'wait/io/table/%';`.",
    explanation: "Changes take effect immediately across all active and newly created connection threads.",
    hint: "Update setup_instruments with ENABLED='YES' and TIMED='YES'.",
    level: "intermediate",
    codeExample: `UPDATE performance_schema.setup_instruments 
SET ENABLED = 'YES', TIMED = 'YES' 
WHERE NAME LIKE 'wait/io/table/%';`
  },
  {
    question: "How do you enable the `events_statements_history_long` consumer dynamically in SQL?",
    shortAnswer: "Execute `UPDATE performance_schema.setup_consumers SET ENABLED = 'YES' WHERE NAME = 'events_statements_history_long';`.",
    explanation: "Activates the global 10,000-statement ring buffer immediately.",
    hint: "Update setup_consumers with ENABLED='YES' for events_statements_history_long.",
    level: "basic",
    codeExample: `UPDATE performance_schema.setup_consumers 
SET ENABLED = 'YES' 
WHERE NAME = 'events_statements_history_long';`
  },
  {
    question: "What is a Performance Schema 'Digest' (`DIGEST_TEXT`)?",
    shortAnswer: "An MD5/SHA256 hash and normalized SQL query string where all literal parameters (numbers, strings, dates) are stripped, allowing MySQL to group identical query patterns into a single aggregated row.",
    explanation: "Digests enable statistical aggregation across thousands of distinct query executions.",
    hint: "Normalized query template with stripped literals grouped by hash.",
    level: "basic",
    codeExample: `-- Normalized Digest:
SELECT * FROM \`orders\` WHERE \`status\` = ? AND \`total_amount\` > ?`
  },
  {
    question: "What information is tracked in `performance_schema.threads`?",
    shortAnswer: "Every server thread (client connections, InnoDB background flushers, replication I/O and SQL threads), linking the internal `THREAD_ID` to the client's `PROCESSLIST_ID`, username, hostname, and active database.",
    explanation: "Provides the bridge between OS threads, MySQL processlist IDs, and Performance Schema event tables.",
    hint: "Maps internal THREAD_IDs to PROCESSLIST_IDs, usernames, and background threads.",
    level: "intermediate",
    codeExample: `SELECT THREAD_ID, PROCESSLIST_ID, PROCESSLIST_USER, PROCESSLIST_HOST 
FROM performance_schema.threads 
WHERE PROCESSLIST_USER IS NOT NULL;`
  },
  {
    question: "What are 'Stage Events' (`events_stages_*`) in the Performance Schema?",
    shortAnswer: "Intermediate execution phases that a query passes through during execution (e.g. `stage/sql/init`, `stage/sql/Creating sort index`, `stage/sql/Sending data`, `stage/sql/executing`).",
    explanation: "Helps developers pinpoint whether a query is spending time sorting, reading disk rows, or waiting on network transmission.",
    hint: "Tracks internal query execution phases like sorting and sending data.",
    level: "intermediate",
    codeExample: `SELECT EVENT_NAME, TIMER_WAIT/1000000000 AS ms 
FROM performance_schema.events_stages_history 
ORDER BY TIMER_START DESC LIMIT 10;`
  },
  {
    question: "What are 'Wait Events' (`events_waits_*`) in the Performance Schema?",
    shortAnswer: "Low-level synchronization and I/O bottlenecks where a thread has to wait for a resource (e.g. `wait/io/file/innodb/innodb_data_file`, `wait/synch/mutex/innodb/buf_pool_mutex`, `wait/lock/table/sql/handler`).",
    explanation: "Identifies whether hardware disk I/O, internal mutex contention, or table locks are causing query latency.",
    hint: "Tracks low-level disk I/O, mutex locks, and table lock wait delays.",
    level: "expert",
    codeExample: `SELECT EVENT_NAME, COUNT_STAR, SUM_TIMER_WAIT/1000000000000 AS wait_sec 
FROM performance_schema.events_waits_summary_global_by_event_name 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 5;`
  },
  {
    question: "What is `performance_schema.memory_summary_global_by_event_name` used for?",
    shortAnswer: "To inspect real-time memory allocations across the entire MySQL server, identifying which internal subsystems (InnoDB buffer pool, connection buffers, table cache) are consuming system RAM.",
    explanation: "Essential for troubleshooting MySQL out-of-memory (OOM) issues and memory leaks.",
    hint: "Tracks real-time RAM memory consumption by internal server subsystems.",
    level: "expert",
    codeExample: `SELECT EVENT_NAME, CURRENT_NUMBER_OF_BYTES_USED / 1024 / 1024 AS MB_used 
FROM performance_schema.memory_summary_global_by_event_name 
ORDER BY CURRENT_NUMBER_OF_BYTES_USED DESC LIMIT 10;`
  },
  {
    question: "How do you reset statistical counters in Performance Schema summary tables without restarting MySQL?",
    shortAnswer: "Execute `TRUNCATE TABLE` on the specific summary table (e.g. `TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;`).",
    explanation: "Clears accumulated counters so you can measure query metrics cleanly during a new benchmark window.",
    hint: "Execute TRUNCATE TABLE on the target summary table.",
    level: "intermediate",
    codeExample: `TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;`
  },
  {
    question: "What is the CPU and memory overhead of running the Performance Schema with default settings in MySQL 8.0?",
    shortAnswer: "Typically under 1% CPU overhead and a fixed 200MB to 400MB RAM memory footprint allocated at server boot.",
    explanation: "MySQL 8.0 heavily refactored instrument probes to use non-blocking atomics and lock-free thread structures.",
    hint: "Under 1% CPU overhead and fixed 200-400MB RAM allocation.",
    level: "basic",
    codeExample: `-- Safe and enabled by default in all MySQL 8.0 installations.`
  },
  {
    question: "How do you verify if the Performance Schema is currently enabled on a MySQL server?",
    shortAnswer: "Check `SHOW VARIABLES LIKE 'performance_schema';` (value should be `ON`).",
    explanation: "The `performance_schema` variable is read-only at runtime and must be configured in `my.cnf` before server startup.",
    hint: "Check performance_schema system variable.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'performance_schema';`
  },
  {
    question: "What is `performance_schema.table_io_waits_summary_by_table`?",
    shortAnswer: "A summary table that aggregates physical read, write, fetch, and delete wait times broken down by schema and table name.",
    explanation: "Instantly reveals which database tables generate the most I/O contention across your entire database cluster.",
    hint: "Aggregates I/O read and write wait times per table.",
    level: "intermediate",
    codeExample: `SELECT OBJECT_SCHEMA, OBJECT_NAME, COUNT_STAR, SUM_TIMER_WAIT/1000000000000 AS wait_sec 
FROM performance_schema.table_io_waits_summary_by_table 
ORDER BY SUM_TIMER_WAIT DESC LIMIT 5;`
  },
  {
    question: "What are 'Transaction Events' (`events_transactions_*`) in the Performance Schema?",
    shortAnswer: "Telemetry tables that track transactional lifecycle metrics: transaction duration, isolation level, read-only vs read-write mode, and whether the transaction ended in `COMMIT` or `ROLLBACK`.",
    explanation: "Provides visibility into long-running transactions and rollback frequency.",
    hint: "Tracks transaction duration, isolation levels, commits, and rollbacks.",
    level: "intermediate",
    codeExample: `SELECT THREAD_ID, STATE, TIMER_WAIT/1000000000 AS ms 
FROM performance_schema.events_transactions_current;`
  },
  {
    question: "What is `performance_schema.data_locks` in MySQL 8.0?",
    shortAnswer: "A real-time table displaying all active InnoDB row-level, gap, and next-key locks held or requested by active transactions.",
    explanation: "Replaces deprecated `information_schema.innodb_locks` in MySQL 8.0 for lock contention diagnostics.",
    hint: "Displays real-time InnoDB row, gap, and table locks.",
    level: "expert",
    codeExample: `SELECT ENGINE_LOCK_ID, ENGINE_TRANSACTION_ID, OBJECT_SCHEMA, OBJECT_NAME, LOCK_TYPE, LOCK_MODE, LOCK_STATUS 
FROM performance_schema.data_locks;`
  },
  {
    question: "What is `performance_schema.data_lock_waits` in MySQL 8.0?",
    shortAnswer: "A table that maps blocked transactions to the exact blocking transaction holding the lock, showing which transaction is causing other transactions to wait.",
    explanation: "Provides instant root-cause identification during transaction lock jams and deadlocks.",
    hint: "Maps waiting blocked transactions to blocking transactions.",
    level: "expert",
    codeExample: `SELECT REQUESTING_ENGINE_TRANSACTION_ID, BLOCKING_ENGINE_TRANSACTION_ID 
FROM performance_schema.data_lock_waits;`
  },
  {
    question: "How do you check which actors (users/hosts) are currently enabled for Performance Schema instrumentation?",
    shortAnswer: "Query `SELECT * FROM performance_schema.setup_actors;`.",
    explanation: "By default, `%` (all users and hosts) are enabled (`ENABLED = 'YES', HISTORY = 'YES'`), but specific background accounts can be excluded.",
    hint: "Inspect setup_actors table.",
    level: "intermediate",
    codeExample: `SELECT * FROM performance_schema.setup_actors;`
  },
  {
    question: "What is the purpose of `performance_schema.setup_objects`?",
    shortAnswer: "It controls which database tables and schemas are monitored by table-level instrumentation (by default, all user tables are monitored while internal system tables are excluded).",
    explanation: "Allows selectively disabling instrumentation on specific high-churn temporary tables if needed.",
    hint: "Controls table and schema monitoring scope.",
    level: "intermediate",
    codeExample: `SELECT * FROM performance_schema.setup_objects;`
  },
  {
    question: "How does the Performance Schema handle thread memory ring buffer overflows?",
    shortAnswer: "It automatically overwrites the oldest event in the ring buffer using FIFO (First-In, First-Out) semantics, ensuring memory usage never expands beyond its pre-allocated boot boundary.",
    explanation: "Fixed ring buffer allocation guarantees the Performance Schema can never cause an Out-Of-Memory (OOM) crash.",
    hint: "Overwrites oldest events using fixed-size FIFO ring buffers.",
    level: "basic",
    codeExample: `-- Memory allocation is strictly bounded and cannot grow unbounded.`
  },
  {
    question: "What is the relationship between the `performance_schema` and the `sys` schema?",
    shortAnswer: "The `performance_schema` provides raw low-level instrumentation tables; the `sys` schema consists of pre-built diagnostic views and stored procedures that format, calculate, and present Performance Schema data in human-readable units (seconds, MB, percentages).",
    explanation: "The `sys` schema is a human-friendly presentation layer on top of the Performance Schema.",
    hint: "sys schema is a human-friendly view layer on top of raw Performance Schema tables.",
    level: "basic",
    codeExample: `-- Raw Performance Schema: SUM_TIMER_WAIT = 4819200000000
-- sys Schema equivalent: latency = '4.82 s'`
  },
  {
    question: "How do you find statements that created temporary disk tables using Performance Schema summary tables?",
    shortAnswer: "Query `events_statements_summary_by_digest WHERE SUM_CREATED_TMP_DISK_TABLES > 0 ORDER BY SUM_CREATED_TMP_DISK_TABLES DESC;`.",
    explanation: "Pinpoints queries that spill temporary result sets to disk due to missing indexes or undersized temporary table memory limits (`tmp_table_size`).",
    hint: "Filter for SUM_CREATED_TMP_DISK_TABLES > 0.",
    level: "intermediate",
    codeExample: `SELECT DIGEST_TEXT, SUM_CREATED_TMP_DISK_TABLES, SUM_CREATED_TMP_TABLES 
FROM performance_schema.events_statements_summary_by_digest 
WHERE SUM_CREATED_TMP_DISK_TABLES > 0 
ORDER BY SUM_CREATED_TMP_DISK_TABLES DESC LIMIT 10;`
  },
  {
    question: "How do you inspect the execution duration of currently active transactions across all threads?",
    shortAnswer: "Query `SELECT THREAD_ID, STATE, TIMER_WAIT/1000000000000 AS duration_sec FROM performance_schema.events_transactions_current WHERE STATE = 'ACTIVE';`.",
    explanation: "Identifies transactions that have been left open without committing or rolling back.",
    hint: "Query events_transactions_current for ACTIVE transactions.",
    level: "basic",
    codeExample: `SELECT THREAD_ID, STATE, ROUND(TIMER_WAIT/1000000000000, 2) AS duration_sec 
FROM performance_schema.events_transactions_current 
WHERE STATE = 'ACTIVE';`
  },
  {
    question: "What is `performance_schema.events_errors_summary_by_user_by_error_number`?",
    shortAnswer: "A summary table that counts SQL syntax errors, constraint violations, and permission denied errors aggregated by database user and error number.",
    explanation: "Helps DBAs identify buggy application services that generate high volumes of failed SQL queries.",
    hint: "Aggregates error counts by user and error number.",
    level: "intermediate",
    codeExample: `SELECT USER, ERROR_NUMBER, ERROR_NAME, COUNT_STAR 
FROM performance_schema.events_errors_summary_by_user_by_error_number 
WHERE COUNT_STAR > 0 
ORDER BY COUNT_STAR DESC LIMIT 10;`
  },
  {
    question: "How do you disable all wait instruments to minimize Performance Schema overhead to near-zero?",
    shortAnswer: "Execute `UPDATE performance_schema.setup_instruments SET ENABLED = 'NO', TIMED = 'NO' WHERE NAME LIKE 'wait/%';`.",
    explanation: "Suppresses granular wait timer instrumentation while keeping statement-level digest aggregation active.",
    hint: "Set ENABLED='NO' and TIMED='NO' for wait/% instruments.",
    level: "intermediate",
    codeExample: `UPDATE performance_schema.setup_instruments 
SET ENABLED = 'NO', TIMED = 'NO' 
WHERE NAME LIKE 'wait/%';`
  },
  {
    question: "What is the primary operational advantage of the Performance Schema over disk-based slow query logging?",
    shortAnswer: "The Performance Schema maintains continuous in-memory aggregated statistics across 100% of queries with zero disk I/O, sub-microsecond precision, and instant SQL queryability.",
    explanation: "Unlike slow logs that require log rotation and external parsing tools, Performance Schema summary tables are queryable in real-time via standard SQL.",
    hint: "Zero disk I/O, continuous in-memory aggregation, and direct SQL queryability.",
    level: "basic",
    codeExample: `-- Instant SQL queryability with zero disk I/O overhead.`
  },
  {
    question: "What is the primary operational takeaway of Topic 6 in Module 004_005?",
    shortAnswer: "The Performance Schema is MySQL's in-memory telemetry engine: keep it enabled in production for real-time observability with <1% overhead, understand the distinction between Instruments (code sensors) and Consumers (storage tables), use `events_statements_summary_by_digest` to identify top query bottlenecks, and inspect `data_locks` and `threads` for real-time concurrency diagnostics.",
    explanation: "Leveraging the Performance Schema gives database administrators continuous, zero-disk-I/O observability into query latency, memory consumption, and lock contention.",
    hint: "Summarize in-memory lock-free architecture, instruments vs consumers, events_statements_summary_by_digest, and zero disk I/O.",
    level: "basic",
    codeExample: `-- Master Performance Schema Blueprint:
SELECT 
  DIGEST_TEXT, COUNT_STAR AS calls,
  ROUND(SUM_TIMER_WAIT/1000000000000, 3) AS total_latency_s,
  ROUND(AVG_TIMER_WAIT/1000000000, 2) AS avg_ms,
  SUM_ROWS_EXAMINED, SUM_CREATED_TMP_DISK_TABLES
FROM performance_schema.events_statements_summary_by_digest
ORDER BY SUM_TIMER_WAIT DESC LIMIT 10;`
  }
];

export default questions;
