// topic7_files/topic7_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 7: The sys Schema: Pre-built Diagnostic Views for Memory, Lock Contention, Index Usage, and Heavy Statements

const questions = [
  {
    question: "What is the MySQL `sys` schema and what architectural problem does it solve?",
    shortAnswer: "The `sys` schema is a collection of pre-built diagnostic views, stored procedures, and formatting functions that translate raw, low-level Performance Schema numbers (picoseconds, byte counts) into human-readable metrics (`seconds`, `MB/GB`, percentages).",
    explanation: "It eliminates the need for DBAs to write complex SQL joins and manual picosecond math over raw Performance Schema tables.",
    hint: "Human-readable diagnostic view layer on top of Performance Schema.",
    level: "basic",
    codeExample: `SELECT * FROM sys.statement_analysis LIMIT 5;`
  },
  {
    question: "What is the difference between standard formatted `sys` views and raw `sys.x$` views?",
    shortAnswer: "Standard views (e.g. `sys.statement_analysis`) format values with text unit strings (`5.42 s`, `12.50 MiB`) for human DBAs; raw `x$` views (e.g. `sys.x$statement_analysis`) output raw integer picoseconds and bytes for programmatic scraping by Prometheus and Grafana.",
    explanation: "Monitoring exporters require pure numeric datatypes to compute rates, deltas, and gauge charts without regex string parsing.",
    hint: "Standard views are human-readable text; x$ views are raw integers for monitoring tools.",
    level: "basic",
    codeExample: `-- Human view: total_latency = '4.82 s'
SELECT query, total_latency FROM sys.statement_analysis LIMIT 1;
-- Raw view for Prometheus: total_latency = 4820000000000
SELECT query, total_latency FROM sys.x$statement_analysis LIMIT 1;`
  },
  {
    question: "Why should Prometheus MySQL Exporter and Grafana dashboards query `sys.x$` views instead of standard `sys` views?",
    shortAnswer: "Because `sys.x$` views return raw integer numbers that time-series databases can mathematically aggregate, compute derivates on, and plot as graphs without string parsing errors.",
    explanation: "Parsing strings like `'1.45 GiB'` or `'350.20 ms'` in Prometheus metric collectors fails or causes high CPU overhead.",
    hint: "x$ views provide raw numeric types needed for mathematical metric graphs.",
    level: "intermediate",
    codeExample: `SELECT * FROM sys.x$memory_global_by_current_bytes LIMIT 5;`
  },
  {
    question: "What does the `sys.statement_analysis` view provide?",
    shortAnswer: "A comprehensive summary of normalized SQL queries ranked by total execution latency, detailing total calls, average latency, 95th percentile runtime, rows examined, rows sent, and temporary disk table creation.",
    explanation: "This is the primary diagnostic view used by MySQL performance engineers to triage heavy queries.",
    hint: "Top queries ranked by total execution time with scan and temporary table metrics.",
    level: "basic",
    codeExample: `SELECT query, exec_count, total_latency, avg_latency, rows_examined_avg 
FROM sys.statement_analysis 
ORDER BY total_latency DESC LIMIT 5;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS checkout slowed during a weekend festival sale. How did Mamata find the top 3 unindexed queries in 5 seconds using the `sys` schema?",
    shortAnswer: "She ran `SELECT query, exec_count, total_latency, rows_examined, rows_sent FROM sys.statements_with_full_table_scans ORDER BY total_latency DESC LIMIT 3;`.",
    explanation: "The view immediately identified 3 queries scanning hundreds of thousands of rows without indexes across ₹1.2 Crores in retail inventory.",
    hint: "Queried sys.statements_with_full_table_scans for instant unindexed query triage.",
    level: "moderate",
    codeExample: `# Barrackpore Full Table Scan Triage:
SELECT query, exec_count, total_latency, rows_examined_avg 
FROM sys.statements_with_full_table_scans 
LIMIT 3;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu reclaim 85GB of buffer pool RAM from useless indexes on a ₹500 Crore ledger database?",
    shortAnswer: "He queried `sys.schema_unused_indexes`, which listed indexes that had received 0 read lookups since server boot, allowing the team to safely drop 14 redundant indexes.",
    explanation: "Dropping unused indexes eliminated write amplification on `INSERT`/`UPDATE` queries and reclaimed 85GB of buffer pool memory.",
    hint: "Queried sys.schema_unused_indexes to locate and drop zero-lookup indexes.",
    level: "expert",
    codeExample: `SELECT object_schema, object_name, index_name 
FROM sys.schema_unused_indexes 
WHERE object_schema = 'kolkata_core_banking';`
  },
  {
    question: "What does the `sys.innodb_lock_waits` view show during a transaction deadlock or lock jam?",
    shortAnswer: "It displays active InnoDB lock conflicts: the waiting transaction ID, waiting query, waiting user/host, and the blocking transaction ID, blocking query, blocking user/host, and duration of the wait.",
    explanation: "Gives DBAs instant visibility into which user or background job is holding the blocking lock.",
    hint: "Maps waiting blocked queries directly to the blocking query and transaction.",
    level: "intermediate",
    codeExample: `SELECT 
  waiting_trx_id, waiting_query, waiting_account,
  blocking_trx_id, blocking_query, blocking_account,
  wait_age_secs 
FROM sys.innodb_lock_waits;`
  },
  {
    question: "What does `sys.memory_global_by_current_bytes` display?",
    shortAnswer: "A breakdown of server memory consumption by internal event name (e.g. `memory/innodb/buffer_pool`, `memory/sql/THD::main_mem_root`), sorted by current RAM usage in human-readable units (MiB/GiB).",
    explanation: "Identifies whether memory is being consumed by InnoDB buffers, connection threads, or temporary query memory structures.",
    hint: "Displays server RAM consumption breakdown by internal subsystem.",
    level: "intermediate",
    codeExample: `SELECT event_name, current_alloc, high_alloc 
FROM sys.memory_global_by_current_bytes 
LIMIT 10;`
  },
  {
    question: "What is `CALL sys.diagnostics(duration, interval, auto_config)` and when should it be used?",
    shortAnswer: "A built-in diagnostic stored procedure that collects a comprehensive operational health report over a specified duration (e.g. 120s) sampled at intervals (e.g. 30s), outputting CPU, memory, locks, and top queries.",
    explanation: "Creates an all-in-one performance snapshot during active incidents for deep post-mortem analysis.",
    hint: "Built-in stored procedure that generates a comprehensive diagnostic health report.",
    level: "expert",
    codeExample: `CALL sys.diagnostics(120, 30, 'current');`
  },
  {
    question: "What does `sys.statements_with_runtimes_in_95th_percentile` expose?",
    shortAnswer: "Normalized SQL statements whose execution latency falls in the top 5% slowest executions across the entire workload.",
    explanation: "Isolates tail-latency queries that cause sporadic slow response times for end users.",
    hint: "Identifies 95th-percentile tail-latency query outliers.",
    level: "intermediate",
    codeExample: `SELECT query, exec_count, avg_latency, 95th_percentile_avg_latency 
FROM sys.statements_with_runtimes_in_95th_percentile;`
  },
  {
    question: "What does `sys.schema_redundant_indexes` show?",
    shortAnswer: "Indexes that are completely redundant because another index on the same table shares the same leading prefix columns (e.g. an index on `(a)` is redundant if an index on `(a, b)` exists).",
    explanation: "Identifies duplicate index structures that waste disk space and slow down `INSERT`/`UPDATE` operations.",
    hint: "Identifies redundant prefix indexes that duplicate existing composite indexes.",
    level: "intermediate",
    codeExample: `SELECT table_schema, table_name, redundant_index_name, dominant_index_name 
FROM sys.schema_redundant_indexes;`
  },
  {
    question: "What does `sys.statements_with_temp_tables` expose?",
    shortAnswer: "Queries that generate temporary tables in memory and on physical disk, showing the ratio of disk temporary tables to memory temporary tables.",
    explanation: "High disk temporary table counts highlight queries that require index optimization or increasing `tmp_table_size`.",
    hint: "Identifies queries creating in-memory and on-disk temporary tables.",
    level: "intermediate",
    codeExample: `SELECT query, exec_count, memory_tmp_tables, disk_tmp_tables, tmp_disk_tables_percent 
FROM sys.statements_with_temp_tables 
WHERE disk_tmp_tables > 0 
ORDER BY disk_tmp_tables DESC;`
  },
  {
    question: "What helper function in `sys` converts raw picoseconds to a formatted text string?",
    shortAnswer: "`sys.format_time(picoseconds)`.",
    explanation: "Converts numbers like `4819200000000` into `'4.82 s'` or `250000000` into `'250.00 us'` automatically.",
    hint: "sys.format_time converts picoseconds to formatted strings.",
    level: "basic",
    codeExample: `SELECT sys.format_time(4819200000000); -- Returns: '4.82 s'`
  },
  {
    question: "What helper function in `sys` converts raw byte counts to human-readable size strings (`KiB`, `MiB`, `GiB`)?",
    shortAnswer: "`sys.format_bytes(bytes)`.",
    explanation: "Converts numbers like `1073741824` into `'1.00 GiB'` automatically.",
    hint: "sys.format_bytes converts byte integers to KiB/MiB/GiB.",
    level: "basic",
    codeExample: `SELECT sys.format_bytes(10737418240); -- Returns: '10.00 GiB'`
  },
  {
    question: "What is `sys.host_summary` used for?",
    shortAnswer: "To inspect total query counts, statement latency, file I/O latency, and memory allocations aggregated by client IP address / hostname.",
    explanation: "Identifies rogue application servers or microservice instances that generate excessive database traffic.",
    hint: "Summarizes latency, I/O, and query volume grouped by client host IP.",
    level: "basic",
    codeExample: `SELECT host, statements, statement_latency, table_scans 
FROM sys.host_summary 
ORDER BY statement_latency DESC;`
  },
  {
    question: "What is `sys.user_summary` used for?",
    shortAnswer: "To inspect query execution volume, total latency, table scans, and file I/O aggregated by database username.",
    explanation: "Pinpoints which application service account is driving database resource consumption.",
    hint: "Summarizes database activity and latency grouped by database user.",
    level: "basic",
    codeExample: `SELECT user, statements, statement_latency, table_scans 
FROM sys.user_summary 
ORDER BY statement_latency DESC;`
  },
  {
    question: "What does `sys.schema_table_lock_waits` show?",
    shortAnswer: "Metadata and table-level locks currently causing thread stalls, displaying the waiting session ID, blocking session ID, and locked table name.",
    explanation: "Essential for troubleshooting DDL lock stalls where an `ALTER TABLE` is blocked by a long-running `SELECT`.",
    hint: "Shows table-level and metadata lock contention stalls.",
    level: "intermediate",
    codeExample: `SELECT object_schema, object_name, waiting_account, blocking_account 
FROM sys.schema_table_lock_waits;`
  },
  {
    question: "What is `sys.memory_by_thread_by_current_bytes`?",
    shortAnswer: "A view that lists current memory allocations broken down by connection thread ID and client account.",
    explanation: "Identifies specific long-lived connection sessions that are holding large memory buffers.",
    hint: "Displays memory allocated per connection thread.",
    level: "intermediate",
    codeExample: `SELECT thread_id, user, current_allocated 
FROM sys.memory_by_thread_by_current_bytes 
ORDER BY current_allocated DESC LIMIT 10;`
  },
  {
    question: "How do you view currently enabled Performance Schema instruments and consumers using a `sys` stored procedure?",
    shortAnswer: "Execute `CALL sys.ps_setup_show_enabled(TRUE, TRUE);`.",
    explanation: "Displays tables showing all currently active instruments and consumers in a single call.",
    hint: "Use CALL sys.ps_setup_show_enabled.",
    level: "basic",
    codeExample: `CALL sys.ps_setup_show_enabled(TRUE, TRUE);`
  },
  {
    question: "What does `sys.statements_with_errors_or_warnings` show?",
    shortAnswer: "SQL statements that resulted in database errors (e.g. foreign key failures, syntax errors) or warnings (truncation, data conversion), ranked by error count.",
    explanation: "Helps developers locate buggy queries before errors affect application functionality.",
    hint: "Lists queries that trigger SQL errors or warnings.",
    level: "basic",
    codeExample: `SELECT query, exec_count, errors, warnings, first_seen, last_seen 
FROM sys.statements_with_errors_or_warnings 
WHERE errors > 0 
ORDER BY errors DESC LIMIT 10;`
  },
  {
    question: "What is `sys.schema_index_statistics` used for?",
    shortAnswer: "To inspect read, write, fetch, and delete statistics for every index across all user tables.",
    explanation: "Helps evaluate whether the read performance benefit of an index outweighs its write maintenance overhead.",
    hint: "Tracks read and write usage statistics per index.",
    level: "intermediate",
    codeExample: `SELECT table_schema, table_name, index_name, rows_selected, rows_inserted, rows_updated 
FROM sys.schema_index_statistics 
WHERE table_schema = 'kolkata_retail';`
  },
  {
    question: "What does `sys.version` return?",
    shortAnswer: "The version number of the `sys` schema installed on the server along with the MySQL server version.",
    explanation: "Verifies the `sys` schema version and compatibility.",
    hint: "Returns installed sys schema version.",
    level: "basic",
    codeExample: `SELECT * FROM sys.version;`
  },
  {
    question: "Is the `sys` schema installed by default in MySQL 8.0?",
    shortAnswer: "Yes, the `sys` schema is bundled and enabled by default in all standard MySQL 8.0 installations without requiring manual installation.",
    explanation: "It is maintained as a core system schema alongside `mysql`, `information_schema`, and `performance_schema`.",
    hint: "Yes, included and enabled by default in MySQL 8.0.",
    level: "basic",
    codeExample: `SHOW DATABASES LIKE 'sys';`
  },
  {
    question: "How do you find statements with sorting operations that spilled to disk using `sys` views?",
    shortAnswer: "Query `sys.statements_with_sorting` and filter for `sort_merge_passes > 0`.",
    explanation: "Identifies queries requiring larger `sort_buffer_size` or index optimization to eliminate disk merges.",
    hint: "Query sys.statements_with_sorting for sort_merge_passes > 0.",
    level: "intermediate",
    codeExample: `SELECT query, exec_count, total_latency, sort_merge_passes 
FROM sys.statements_with_sorting 
WHERE sort_merge_passes > 0 
ORDER BY sort_merge_passes DESC;`
  },
  {
    question: "What is `sys.io_global_by_file_by_bytes`?",
    shortAnswer: "A view that ranks physical disk files (InnoDB tablespaces, redo logs, undo tablespaces) by total bytes read and written.",
    explanation: "Pinpoints which specific `.ibd` table files generate the heaviest disk I/O load on the host storage.",
    hint: "Ranks physical disk files by read/write byte volume.",
    level: "intermediate",
    codeExample: `SELECT file, total_read, total_written, total 
FROM sys.io_global_by_file_by_bytes 
LIMIT 10;`
  },
  {
    question: "What does `sys.io_by_thread_by_latency` show?",
    shortAnswer: "Total file I/O wait latency broken down by server thread ID and user connection.",
    explanation: "Identifies which client connections are waiting the longest for physical disk I/O.",
    hint: "Displays file I/O latency per server thread.",
    level: "expert",
    codeExample: `SELECT thread_id, user, total_latency, min_latency, max_latency 
FROM sys.io_by_thread_by_latency 
ORDER BY total_latency DESC LIMIT 5;`
  },
  {
    question: "How can you disable all `sys` views from formatting values if you want pure numeric columns?",
    shortAnswer: "Simply query the corresponding `x$` view (e.g. query `sys.x$statement_analysis` instead of `sys.statement_analysis`).",
    explanation: "Every formatted view has an exact `x$` raw counterpart.",
    hint: "Query the corresponding x$ view name.",
    level: "basic",
    codeExample: `SELECT query, total_latency, avg_latency FROM sys.x$statement_analysis LIMIT 5;`
  },
  {
    question: "What does `sys.metrics` provide in MySQL 8.0?",
    shortAnswer: "A combined view that aggregates global status variables, system variables, and Performance Schema metrics into a single unified telemetry view.",
    explanation: "Provides a one-stop-shop for server telemetry and health audits.",
    hint: "Combined view aggregating global status and Performance Schema metrics.",
    level: "expert",
    codeExample: `SELECT Variable_name, Variable_value, Type FROM sys.metrics LIMIT 20;`
  },
  {
    question: "What permissions are required for a database user to query the `sys` schema?",
    shortAnswer: "The user requires `SELECT` privileges on the `sys` schema and underlying `performance_schema` tables (or the `PROCESS` global privilege).",
    explanation: "Standard application users should not be granted access to `sys` views to prevent schema and telemetry leakage.",
    hint: "Requires SELECT on sys and performance_schema tables, or PROCESS privilege.",
    level: "basic",
    codeExample: `GRANT SELECT ON sys.* TO 'dba_monitor'@'%';`
  },
  {
    question: "What is the primary operational takeaway of Topic 7 in Module 004_005?",
    shortAnswer: "The `sys` schema is MySQL's human-friendly diagnostic cockpit: use `sys.statement_analysis` to pinpoint heavy queries, `sys.schema_unused_indexes` to reclaim memory by dropping dead indexes, `sys.innodb_lock_waits` to resolve transaction lock jams live, `sys.diagnostics` to generate all-in-one incident reports, and point Prometheus monitoring tools to raw `sys.x$` views for automated metric graphing.",
    explanation: "Mastering the `sys` schema transforms complex Performance Schema tables into instant, actionable performance intelligence.",
    hint: "Summarize statement_analysis, unused indexes, innodb_lock_waits, sys.diagnostics, and x$ raw views for Prometheus.",
    level: "basic",
    codeExample: `-- Master sys Schema Diagnostic Recipe:
# 1. Heavy Statements:
SELECT query, exec_count, total_latency, avg_latency, rows_examined_avg 
FROM sys.statement_analysis LIMIT 5;

# 2. Unused Indexes:
SELECT object_schema, object_name, index_name FROM sys.schema_unused_indexes;

# 3. Live Lock Waits:
SELECT waiting_query, blocking_query, wait_age_secs FROM sys.innodb_lock_waits;`
  }
];

export default questions;
