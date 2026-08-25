// topic4_files/topic4_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 4: The Slow Query Log: Configuration (slow_query_log, long_query_time, log_queries_not_using_indexes)

const questions = [
  {
    question: "What is the primary function of the MySQL Slow Query Log?",
    shortAnswer: "To capture queries whose total execution time exceeds `long_query_time` seconds or queries executing without index lookups, providing detailed execution metrics (Query_time, Lock_time, Rows_examined) for query optimization.",
    explanation: "The Slow Query Log is the standard forensic tool for identifying unindexed table scans, inefficient SQL joins, and database latency bottlenecks.",
    hint: "Captures queries exceeding execution thresholds or lacking indexes.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'slow_query%';`
  },
  {
    question: "How do you enable the Slow Query Log dynamically and set the threshold to 500 milliseconds (0.5 seconds)?",
    shortAnswer: "Execute `SET PERSIST slow_query_log = 'ON';` and `SET PERSIST long_query_time = 0.5;`.",
    explanation: "`long_query_time` supports fractional microsecond values (e.g. `0.5` = 500ms, `0.05` = 50ms, `0.001` = 1ms).",
    hint: "Use SET PERSIST slow_query_log = 'ON' and long_query_time = 0.5.",
    level: "basic",
    codeExample: `SET PERSIST slow_query_log = 'ON';
SET PERSIST long_query_time = 0.5;`
  },
  {
    question: "What does setting `long_query_time = 0` do in MySQL?",
    shortAnswer: "It records EVERY single query executed on the server to the slow query log (100% query capture with detailed execution timing and row metrics).",
    explanation: "Useful for capturing complete production query workloads for replay testing or performance profiling during staging benchmarks.",
    hint: "Logs every query regardless of execution duration.",
    level: "intermediate",
    codeExample: `-- Temporary workload capture during staging benchmarks:
SET PERSIST long_query_time = 0.0;`
  },
  {
    question: "What is the purpose of `log_queries_not_using_indexes` in slow query logging?",
    shortAnswer: "It logs queries that perform full table scans or full index scans even if they execute faster than `long_query_time`.",
    explanation: "Helps developers catch missing indexes in development and staging before small tables grow into multi-million-row production bottlenecks.",
    hint: "Logs full table scans regardless of execution time.",
    level: "basic",
    codeExample: `SET PERSIST log_queries_not_using_indexes = 'ON';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a product search query ran in 3.4 seconds during peak checkout. What did the Slow Query Log entry reveal?",
    shortAnswer: "The log showed `Query_time: 3.421000 Rows_sent: 12 Rows_examined: 4,500,000`, proving the query examined all 4.5 million rows due to a missing index on `(status, category)`.",
    explanation: "Adding a composite index `CREATE INDEX idx_status_cat ON products(status, category)` reduced `Rows_examined` from 4,500,000 to 12, dropping query execution time to 1.2 milliseconds.",
    hint: "High Rows_examined (4.5M) vs low Rows_sent (12) proved a missing composite index.",
    level: "moderate",
    codeExample: `# Barrackpore Slow Log Entry:
# Query_time: 3.421000 Lock_time: 0.000120 Rows_sent: 12 Rows_examined: 4500000
SELECT * FROM products WHERE status = 'ACTIVE' AND category = 'Sarees';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did `log_slow_extra = 'ON'` help Debangshu diagnose disk I/O latency spikes on a ₹500 Crore ledger query?",
    shortAnswer: "The enhanced log entry showed `Created_tmp_disk_tables: 1` and `Sort_merge_passes: 14`, revealing the query was spilling temporary sorting tables to physical disk due to an undersized `sort_buffer_size`.",
    explanation: "Increasing `sort_buffer_size` and adding an index matching the `ORDER BY` clause eliminated disk sort passes completely.",
    hint: "log_slow_extra exposed disk temporary tables and sort merge passes.",
    level: "expert",
    codeExample: `# log_slow_extra Telemetry:
# Sort_merge_passes: 14  Created_tmp_disk_tables: 1  Created_tmp_tables: 1`
  },
  {
    question: "What rich forensic metrics are added to the Slow Query Log when `log_slow_extra = 'ON'` is enabled in MySQL 8.0.14+?",
    shortAnswer: "`Thread_id`, `Errno`, `Bytes_sent`, `Bytes_received`, `Sort_merge_passes`, `Sort_range_count`, `Sort_rows`, `Sort_scan_count`, `Created_tmp_disk_tables`, and `Created_tmp_tables`.",
    explanation: "Provides deep engine-level insight into temporary table creation, memory spills, and network serialization overhead for slow queries.",
    hint: "Adds temporary disk tables, sort merge passes, bytes sent, and thread IDs.",
    level: "expert",
    codeExample: `SET PERSIST log_slow_extra = 'ON';`
  },
  {
    question: "How do you prevent `log_queries_not_using_indexes` from flooding the log with entries for tiny 5-row lookup tables?",
    shortAnswer: "Set `min_examined_row_limit = 100` (or `500`).",
    explanation: "MySQL will ignore queries that examine fewer than N rows, eliminating noisy log entries for small static reference tables.",
    hint: "Use min_examined_row_limit to exclude small-table scans.",
    level: "intermediate",
    codeExample: `SET PERSIST min_examined_row_limit = 100;`
  },
  {
    question: "How do you rate-limit the volume of unindexed queries written to the Slow Query Log per minute?",
    shortAnswer: "Set `log_throttle_queries_not_using_indexes = N` (e.g. `10` or `20`).",
    explanation: "Caps unindexed query logging to at most N queries per 60-second window, preventing log file explosion during repeated unindexed loops.",
    hint: "Use log_throttle_queries_not_using_indexes.",
    level: "intermediate",
    codeExample: `SET PERSIST log_throttle_queries_not_using_indexes = 20;`
  },
  {
    question: "What is `log_slow_admin_statements = 'ON'` used for?",
    shortAnswer: "It logs administrative operations that exceed `long_query_time`, such as `ALTER TABLE`, `ANALYZE TABLE`, `CHECK TABLE`, `CREATE INDEX`, `DROP INDEX`, and `OPTIMIZE TABLE`.",
    explanation: "Tracks long-running schema migrations and table maintenance operations.",
    hint: "Logs slow administrative DDL commands like ALTER TABLE and OPTIMIZE TABLE.",
    level: "intermediate",
    codeExample: `SET PERSIST log_slow_admin_statements = 'ON';`
  },
  {
    question: "What is the difference between `Query_time` and `Lock_time` in a Slow Query Log entry?",
    shortAnswer: "`Query_time` is the total wall-clock duration from statement start to finish; `Lock_time` is the duration the query spent waiting to acquire table and row locks.",
    explanation: "If `Query_time` is 10s and `Lock_time` is 9.8s, the query executed in 0.2s but was delayed waiting for locks held by other transactions.",
    hint: "Query_time is total execution duration; Lock_time is time spent waiting for locks.",
    level: "basic",
    codeExample: `# Query_time: 10.042100  Lock_time: 9.812000 Rows_sent: 1 Rows_examined: 1
-- Indicates severe lock contention rather than slow query execution!`
  },
  {
    question: "What does a high ratio of `Rows_examined` compared to `Rows_sent` indicate?",
    shortAnswer: "It indicates an inefficient table scan or missing index where the query had to scan thousands or millions of disk pages to return only a handful of matching rows.",
    explanation: "A healthy indexed lookup typically examines close to the exact number of rows sent (e.g. Rows_examined: 1, Rows_sent: 1).",
    hint: "Indicates an inefficient table scan requiring index optimization.",
    level: "basic",
    codeExample: `# Inefficient: Rows_sent: 5, Rows_examined: 2,000,000
# Optimized:   Rows_sent: 5, Rows_examined: 5`
  },
  {
    question: "What is the recommended storage destination for the Slow Query Log in high-concurrency production environments?",
    shortAnswer: "`log_output = 'FILE'`.",
    explanation: "Writing to OS filesystem text files incurs <1% overhead; writing to `log_output = 'TABLE'` (`mysql.slow_log`) introduces CSV table locking overhead.",
    hint: "Use log_output = 'FILE' for maximum performance.",
    level: "basic",
    codeExample: `SET PERSIST log_output = 'FILE';`
  },
  {
    question: "How do you query the `mysql.slow_log` table when `log_output = 'TABLE'` is enabled?",
    shortAnswer: "Execute standard SQL queries: `SELECT start_time, user_host, query_time, lock_time, rows_sent, rows_examined, sql_text FROM mysql.slow_log ORDER BY query_time DESC LIMIT 10;`.",
    explanation: "Allows SQL-based filtering, grouping by user or query pattern, and sorting by longest execution times.",
    hint: "Query mysql.slow_log directly with SQL SELECT statements.",
    level: "intermediate",
    codeExample: `SELECT query_time, rows_examined, sql_text 
FROM mysql.slow_log 
ORDER BY query_time DESC LIMIT 10;`
  },
  {
    question: "How do you safely truncate and clear the `mysql.slow_log` table?",
    shortAnswer: "1. `SET GLOBAL slow_query_log = 'OFF';` 2. `TRUNCATE TABLE mysql.slow_log;` 3. `SET GLOBAL slow_query_log = 'ON';`.",
    explanation: "The slow query log must be temporarily disabled before running `TRUNCATE TABLE` to avoid table lock conflicts.",
    hint: "Disable slow_query_log before truncating mysql.slow_log.",
    level: "intermediate",
    codeExample: `SET GLOBAL slow_query_log = 'OFF';
TRUNCATE TABLE mysql.slow_log;
SET GLOBAL slow_query_log = 'ON';`
  },
  {
    question: "What command in SQL forces MySQL to close and reopen the Slow Query Log file handle for log rotation?",
    shortAnswer: "Execute `FLUSH SLOW LOGS;` (or `FLUSH LOGS;`).",
    explanation: "Allows Linux `logrotate` to archive and compress old slow logs with zero database downtime.",
    hint: "Run FLUSH SLOW LOGS.",
    level: "basic",
    codeExample: `FLUSH SLOW LOGS;`
  },
  {
    question: "What is `log_slow_replica_statements = 'ON'` in MySQL 8.0?",
    shortAnswer: "It logs slow SQL statements executed by the replica's replication SQL applier thread that exceed `long_query_time`.",
    explanation: "Helps identify replicated queries that cause replication lag on downstream replicas.",
    hint: "Logs slow replicated statements executed by the replica applier thread.",
    level: "expert",
    codeExample: `SET PERSIST log_slow_replica_statements = 'ON';`
  },
  {
    question: "How do you view the active Slow Query Log in real time from the Linux shell?",
    shortAnswer: "Run `tail -f /var/log/mysql/slow_query.log`.",
    explanation: "Streams slow query records to the terminal as they execute and complete.",
    hint: "Use tail -f on the slow query log file.",
    level: "basic",
    codeExample: `tail -f /var/log/mysql/slow_query.log`
  },
  {
    question: "What is the recommended `long_query_time` threshold for high-volume ecommerce and banking production databases?",
    shortAnswer: "Between `0.2` and `1.0` seconds (200ms to 1000ms).",
    explanation: "Captures queries that noticeably impact user response times while keeping the log file lean and actionable.",
    hint: "0.2s to 1.0s (200ms - 1000ms).",
    level: "basic",
    codeExample: `SET PERSIST long_query_time = 0.5; -- 500ms`
  },
  {
    question: "What happens if a query is killed by `KILL QUERY <id>` before it completes?",
    shortAnswer: "If its execution time prior to being killed exceeded `long_query_time`, it is written to the slow query log with `Killed: 1` in the log header.",
    explanation: "Helps DBAs identify runaway queries that had to be manually terminated.",
    hint: "Logs the query with Killed: 1 if elapsed time exceeded threshold.",
    level: "intermediate",
    codeExample: `# Thread_id: 45  Errno: 1317  Killed: 1`
  },
  {
    question: "How does `log_timestamps = 'SYSTEM'` affect the Slow Query Log?",
    shortAnswer: "It formats all log entry timestamps using the local server host timezone instead of default UTC, making incident investigation straightforward without mental timezone conversion.",
    explanation: "Correlates directly with application error logs and system monitoring timestamps.",
    hint: "Outputs timestamps in local server timezone.",
    level: "basic",
    codeExample: `SET PERSIST log_timestamps = 'SYSTEM';`
  },
  {
    question: "What is the impact of character set encoding when slow queries contain Bengali, Hindi, or Unicode strings?",
    shortAnswer: "The Slow Query Log writes raw query text in UTF-8 (`utf8mb4`), preserving international characters and emoji strings accurately.",
    explanation: "Ensures multilingual application queries can be reviewed and analyzed without garbled text.",
    hint: "Writes query text in UTF-8, preserving multilingual characters.",
    level: "basic",
    codeExample: `SELECT * FROM kolkata_retail.orders WHERE customer_name = 'মমতা ব্যানার্জি';`
  },
  {
    question: "Why does the Slow Query Log record queries AFTER they complete execution, unlike the General Query Log?",
    shortAnswer: "Because it must measure the final execution elapsed time (`Query_time`), total lock acquisition time (`Lock_time`), and actual `Rows_examined` before deciding if the query exceeds the slow threshold.",
    explanation: "Execution duration and row scan metrics can only be calculated once the query completes.",
    hint: "Must measure final execution time and rows examined before logging.",
    level: "basic",
    codeExample: `-- Log entry written immediately upon statement completion.`
  },
  {
    question: "How do you configure Linux `logrotate` to rotate the Slow Query Log daily and keep 14 days of compressed archives?",
    shortAnswer: "Create `/etc/logrotate.d/mysql-slow` configured with `daily`, `rotate 14`, `compress`, and `postrotate mysqladmin flush-logs slow endscript`.",
    explanation: "Prevents slow query log files from expanding indefinitely on disk.",
    hint: "Configure logrotate with mysqladmin flush-logs slow in postrotate.",
    level: "intermediate",
    codeExample: `/var/log/mysql/slow_query.log {
  daily
  rotate 14
  compress
  missingok
  postrotate
    mysqladmin -u root -pSecurePass flush-logs slow
  endscript
}`
  },
  {
    question: "What tool can parse, summarize, and aggregate thousands of slow query entries from a Slow Query Log file?",
    shortAnswer: "`mysqldumpslow` (bundled with MySQL) or `pt-query-digest` (Percona Toolkit).",
    explanation: "Groups parameterized queries into normalized digests and sorts them by total cumulative execution time.",
    hint: "Use mysqldumpslow or pt-query-digest.",
    level: "basic",
    codeExample: `mysqldumpslow -s t -t 10 /var/log/mysql/slow_query.log`
  },
  {
    question: "What does `Read_rnd_next` indicate in `log_slow_extra` output?",
    shortAnswer: "The count of requests to read the next row from disk/buffer pool during a full table scan.",
    explanation: "A high `Read_rnd_next` number indicates the query scanned sequential rows across tablespaces because no index was used.",
    hint: "Counts sequential row reads during full table scans.",
    level: "expert",
    codeExample: `# Read_rnd_next: 5000000 (Indicates full table scan of 5M rows)`
  },
  {
    question: "What does `Sort_merge_passes` indicate in `log_slow_extra` output?",
    shortAnswer: "The number of merge passes the sort algorithm had to perform on disk because the data being sorted exceeded the allocated `sort_buffer_size` in RAM.",
    explanation: "Non-zero `Sort_merge_passes` highlights queries that require increasing `sort_buffer_size` or adding an index to avoid file sorts.",
    hint: "Indicates disk-based sorting passes due to sort buffer memory exhaustion.",
    level: "expert",
    codeExample: `# Sort_merge_passes: 8 (Sort spilled to disk 8 times)`
  },
  {
    question: "How do you disable the Slow Query Log dynamically without restarting MySQL?",
    shortAnswer: "Execute `SET PERSIST slow_query_log = 'OFF';` (or `SET GLOBAL slow_query_log = 'OFF';`).",
    explanation: "Instantly ceases slow query logging for all active and new client sessions.",
    hint: "Run SET PERSIST slow_query_log = 'OFF'.",
    level: "basic",
    codeExample: `SET PERSIST slow_query_log = 'OFF';`
  },
  {
    question: "What is the CPU and storage overhead of running the Slow Query Log with `long_query_time = 1.0s` on a server handling 10,000 QPS?",
    shortAnswer: "Typically under 0.5% CPU overhead and negligible disk space (a few megabytes per week).",
    explanation: "Because only slow outlier queries trigger log writes, 99.9% of fast queries bypass the logging code path entirely.",
    hint: "Under 0.5% CPU overhead because fast queries bypass disk writes.",
    level: "basic",
    codeExample: `-- Slow query logging is safe and highly recommended for all production databases.`
  },
  {
    question: "What is the primary operational takeaway of Topic 4 in Module 004_005?",
    shortAnswer: "The Slow Query Log is the primary weapon for query performance optimization: configure `slow_query_log = 'ON'`, set `long_query_time = 0.5s` for microsecond precision, enable `log_slow_extra = 'ON'` in MySQL 8.0 for deep disk sort and temporary table metrics, throttle unindexed logging with `log_throttle_queries_not_using_indexes`, use `log_output = 'FILE'`, and analyze high `Rows_examined` to eliminate full table scans.",
    explanation: "By capturing execution timings and row scan ratios with under 1% overhead, database engineers pinpoint and optimize slow queries before they impact customer response times.",
    hint: "Summarize slow_query_log=ON, long_query_time=0.5s, log_slow_extra, Rows_examined ratios, and log_output=FILE.",
    level: "basic",
    codeExample: `-- Master Production Slow Query Log Blueprint:
SET PERSIST slow_query_log = 'ON';
SET PERSIST slow_query_log_file = '/var/log/mysql/slow_query.log';
SET PERSIST long_query_time = 0.5;
SET PERSIST log_output = 'FILE';
SET PERSIST log_slow_extra = 'ON';
SET PERSIST log_queries_not_using_indexes = 'ON';
SET PERSIST log_throttle_queries_not_using_indexes = 20;
SET PERSIST min_examined_row_limit = 100;`
  }
];

export default questions;
