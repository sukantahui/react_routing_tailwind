// topic9_files/topic9_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 9: Inspecting Real-Time Server Health using SHOW GLOBAL STATUS and SHOW GLOBAL VARIABLES

const questions = [
  {
    question: "What is the core difference between `SHOW GLOBAL STATUS` and `SHOW GLOBAL VARIABLES` in MySQL?",
    shortAnswer: "`SHOW GLOBAL STATUS` reports runtime operational telemetry and cumulative performance counters (e.g. queries executed, active threads, disk reads); `SHOW GLOBAL VARIABLES` reports active system configuration settings (e.g. `max_connections`, `innodb_buffer_pool_size`).",
    explanation: "STATUS shows what the server is *doing*; VARIABLES shows how the server is *configured*.",
    hint: "STATUS is operational telemetry/counters; VARIABLES is system configuration settings.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Threads_%';
SHOW GLOBAL VARIABLES LIKE 'max_connections';`
  },
  {
    question: "What is the difference between `GLOBAL` and `SESSION` scope for status counters?",
    shortAnswer: "`GLOBAL` status aggregates counters across all client connections since server startup; `SESSION` status counts events generated exclusively by the current connection thread since it connected.",
    explanation: "For example, `SHOW SESSION STATUS LIKE 'Handler_read%'` measures how many rows the current query scanned, while `GLOBAL` measures all queries server-wide.",
    hint: "GLOBAL is server-wide across all clients; SESSION is scoped to the current connection.",
    level: "basic",
    codeExample: `-- Current session only:
SHOW SESSION STATUS LIKE 'Questions';
-- Entire database instance:
SHOW GLOBAL STATUS LIKE 'Questions';`
  },
  {
    question: "How do you query global status counters as a relational SQL table in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.global_status`: `SELECT VARIABLE_NAME, VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME IN ('Threads_connected', 'Threads_running', 'Uptime');`.",
    explanation: "Allows filtering, sorting, mathematical joins, and aggregation that standard `SHOW` commands cannot perform.",
    hint: "Query the performance_schema.global_status table directly.",
    level: "intermediate",
    codeExample: `SELECT VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Uptime', 'Threads_connected', 'Threads_running', 'Questions');`
  },
  {
    question: "What is the difference between the `Questions` and `Queries` status counters in MySQL?",
    shortAnswer: "`Questions` counts only statements sent to the server by client applications; `Queries` counts statements sent by clients PLUS internal statements executed within stored procedures, triggers, and events.",
    explanation: "`Questions` is the preferred metric for calculating application client Queries Per Second (QPS).",
    hint: "Questions is client statements; Queries includes internal stored procedure/trigger statements.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS WHERE Variable_name IN ('Questions', 'Queries');`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, checkout terminals began throwing `ERROR 1040: Too many connections`. How did Mamata diagnose the root cause using status and variable inspection?",
    shortAnswer: "She compared `Threads_connected` (500) from `SHOW GLOBAL STATUS` against `max_connections` (500) from `SHOW GLOBAL VARIABLES`, discovering that connection pool exhaustion occurred due to unclosed Node.js microservice connections.",
    explanation: "Temporarily running `SET GLOBAL max_connections = 1000;` resolved the immediate outage across ₹1.2 Crores in daily checkout volume.",
    hint: "Compared Threads_connected against max_connections to identify pool exhaustion.",
    level: "moderate",
    codeExample: `# Barrackpore Connection Triage:
SHOW GLOBAL STATUS LIKE 'Threads_connected'; -- 500
SHOW GLOBAL VARIABLES LIKE 'max_connections'; -- 500
SET GLOBAL max_connections = 1000;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, high transaction volume was causing latency. How did Debangshu use `mysqladmin extended-status -r -i 1` to observe live per-second rate changes?",
    shortAnswer: "He ran `mysqladmin -u root -p -i 1 -r extended-status | grep -E 'Queries|Threads_running'`, which printed the live per-second delta rate, revealing a sudden spike from 2,000 QPS to 18,000 QPS caused by a rogue batch job.",
    explanation: "The `-r` flag calculates the delta difference between consecutive 1-second intervals (`-i 1`), displaying live second-by-second rates.",
    hint: "Used mysqladmin -r -i 1 to display live per-second delta rates.",
    level: "expert",
    codeExample: `mysqladmin -u root -p -i 1 -r extended-status | grep -E "Queries|Threads_running|Innodb_buffer_pool_reads"`
  },
  {
    question: "What does `Threads_running` indicate in `SHOW GLOBAL STATUS`, and why is it a critical health indicator?",
    shortAnswer: "It indicates the number of client connection threads that are actively executing queries on the CPU at that exact instant (excluding idle/sleeping connections).",
    explanation: "If `Threads_running` exceeds the number of physical CPU cores (e.g. 64 active threads on a 16-core CPU), it indicates CPU thread starvation and severe query queuing.",
    hint: "Number of threads actively executing queries on CPU right now.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Threads_running';`
  },
  {
    question: "What does `Threads_connected` indicate in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The total number of currently open client TCP/IP and socket connections (both active queries and idle sleeping connections).",
    explanation: "Used to monitor connection pool sizing and prevent `Too many connections` errors.",
    hint: "Total currently open client connections (active + idle).",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Threads_connected';`
  },
  {
    question: "What does `Uptime` in `SHOW GLOBAL STATUS` represent, and in what unit is it measured?",
    shortAnswer: "The number of seconds the MySQL server daemon has been running continuously since its last startup or restart.",
    explanation: "Dividing cumulative counters (like `Questions`) by `Uptime` gives the historical average Queries Per Second since boot.",
    hint: "Number of seconds since server boot.",
    level: "basic",
    codeExample: `SELECT VARIABLE_VALUE AS uptime_seconds, 
       ROUND(VARIABLE_VALUE / 86400, 1) AS uptime_days 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME = 'Uptime';`
  },
  {
    question: "What command displays a quick one-line server health summary from the command-line interface?",
    shortAnswer: "`mysqladmin -u root -p status`.",
    explanation: "Outputs Uptime, Threads, Questions, Slow queries, Opens, Flush tables, Open tables, and Average Queries per second.",
    hint: "Run mysqladmin status.",
    level: "basic",
    codeExample: `mysqladmin -u root -p status
# Output: Uptime: 432000  Threads: 24  Questions: 15482910  Slow queries: 4  QPS avg: 35.84`
  },
  {
    question: "What is `Innodb_buffer_pool_reads` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative count of logical 16KB page read requests that could NOT be satisfied from the in-memory buffer pool and had to read physical pages from disk storage.",
    explanation: "A high rate of buffer pool physical reads indicates memory starvation and heavy disk I/O.",
    hint: "Count of physical disk page reads required when buffer pool misses.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_reads';`
  },
  {
    question: "What is `Innodb_buffer_pool_read_requests` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative total number of logical 16KB page read requests made by queries to the InnoDB buffer pool.",
    explanation: "Represents total read demand before determining if pages are cached in RAM or read from disk.",
    hint: "Total logical page read requests made to the buffer pool.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read_requests';`
  },
  {
    question: "What does `FLUSH STATUS;` do in MySQL?",
    shortAnswer: "It resets most session-level status counters to zero and clears key global communication counters, allowing fresh measurement intervals.",
    explanation: "Useful when benchmarking a specific query workload without restarting MySQL.",
    hint: "Resets session status counters and clears communication counters.",
    level: "intermediate",
    codeExample: `FLUSH STATUS;`
  },
  {
    question: "How do you calculate the historical average Queries Per Second (QPS) using `SHOW GLOBAL STATUS`?",
    shortAnswer: "Divide `Questions` by `Uptime`: $\\text{QPS} = \\frac{\\text{Questions}}{\\text{Uptime}}$.",
    explanation: "Calculates average query throughput across the lifetime of the current server process.",
    hint: "Divide Questions by Uptime.",
    level: "basic",
    codeExample: `SELECT 
  q.VARIABLE_VALUE AS total_questions,
  u.VARIABLE_VALUE AS uptime_secs,
  ROUND(q.VARIABLE_VALUE / u.VARIABLE_VALUE, 2) AS avg_qps
FROM performance_schema.global_status q 
JOIN performance_schema.global_status u ON u.VARIABLE_NAME = 'Uptime'
WHERE q.VARIABLE_NAME = 'Questions';`
  },
  {
    question: "What does `Slow_queries` in `SHOW GLOBAL STATUS` represent?",
    shortAnswer: "The cumulative number of queries that exceeded `long_query_time` seconds (or did not use indexes if configured) since server boot.",
    explanation: "Allows DBAs to monitor the rate of slow query generation over time.",
    hint: "Cumulative count of queries exceeding long_query_time.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Slow_queries';`
  },
  {
    question: "What is `Aborted_connects` in `SHOW GLOBAL STATUS` and what does a rising count indicate?",
    shortAnswer: "The number of failed connection attempts to the server, indicating incorrect client passwords, unauthorized client IP access, or network firewall connection drops.",
    explanation: "A rapid increase in `Aborted_connects` may indicate a brute-force authentication attack or network infrastructure failure.",
    hint: "Count of failed connection attempts; spikes indicate bad passwords or network drops.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Aborted_connects';`
  },
  {
    question: "What is `Aborted_clients` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of connections that were established successfully but terminated abnormally without properly closing the connection (e.g. client crashed, network timeout, or exceeded `wait_timeout`).",
    explanation: "Helps identify application services that crash or drop TCP connections ungracefully.",
    hint: "Count of connections dropped abnormally without proper socket disconnect.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Aborted_clients';`
  },
  {
    question: "What does `Created_tmp_disk_tables` in `SHOW GLOBAL STATUS` indicate?",
    shortAnswer: "The total number of internal temporary tables created on physical disk storage because the temporary table exceeded `tmp_table_size` or `max_heap_table_size` in RAM.",
    explanation: "A high ratio of `Created_tmp_disk_tables` to `Created_tmp_tables` indicates memory threshold exhaustion or missing indexes on `GROUP BY`/`DISTINCT` queries.",
    hint: "Count of temporary tables that spilled to physical disk.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Created_tmp_disk_tables';`
  },
  {
    question: "How do you check current network bandwidth consumption in `SHOW GLOBAL STATUS`?",
    shortAnswer: "Inspect `Bytes_received` (total bytes received from clients) and `Bytes_sent` (total bytes transmitted to clients).",
    explanation: "Dividing bytes sent by uptime calculates average network egress bandwidth in bytes per second.",
    hint: "Bytes_received and Bytes_sent.",
    level: "basic",
    codeExample: `SELECT 
  VARIABLE_NAME, 
  ROUND(VARIABLE_VALUE / 1024 / 1024 / 1024, 2) AS GB_transferred 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Bytes_received', 'Bytes_sent');`
  },
  {
    question: "What does `Open_tables` vs `Opened_tables` in `SHOW GLOBAL STATUS` signify?",
    shortAnswer: "`Open_tables` is the number of table cache descriptors currently open in memory; `Opened_tables` is the cumulative count of times MySQL had to open a table file from disk.",
    explanation: "A rapidly growing `Opened_tables` count indicates the `table_open_cache` variable is undersized and causing cache evictions.",
    hint: "Open_tables is currently cached in RAM; Opened_tables is cumulative disk opens.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Open%tables%';
SHOW GLOBAL VARIABLES LIKE 'table_open_cache';`
  },
  {
    question: "What is `Innodb_row_lock_waits` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative number of times a transaction had to wait to acquire an InnoDB row lock held by another concurrent transaction.",
    explanation: "High row lock wait counts signal application transactional concurrency conflicts.",
    hint: "Count of times transactions had to wait for row locks.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_row_lock_waits';`
  },
  {
    question: "What is `Innodb_row_lock_time_avg` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The average time in milliseconds spent waiting for an InnoDB row lock when lock contention occurs.",
    explanation: "Long lock wait averages indicate long-running uncommitted transactions.",
    hint: "Average row lock wait time in milliseconds.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_row_lock_time_avg';`
  },
  {
    question: "How do you verify if MySQL is running with SSL/TLS encryption for client connections in `SHOW GLOBAL STATUS`?",
    shortAnswer: "Check `Ssl_cipher` and `Ssl_version` (if non-empty, SSL is active for the current connection) and `Ssl_accepts` (total SSL connections accepted).",
    explanation: "Verifies secure client-to-server data-in-transit encryption.",
    hint: "Check Ssl_cipher, Ssl_version, and Ssl_accepts.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Ssl_%';`
  },
  {
    question: "What does `Com_select`, `Com_insert`, `Com_update`, and `Com_delete` indicate in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative count of times each specific SQL command type (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) has been executed.",
    explanation: "Allows calculating the read-to-write ratio (e.g. 80% Reads vs 20% Writes) of your application workload.",
    hint: "Command counters for calculating workload read/write ratios.",
    level: "basic",
    codeExample: `SELECT VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Com_select', 'Com_insert', 'Com_update', 'Com_delete');`
  },
  {
    question: "How does `performance_schema.session_variables` differ from `performance_schema.global_variables`?",
    shortAnswer: "`session_variables` shows effective configuration settings for the current connection (including session overrides like `sql_mode` or `autocommit`); `global_variables` shows default settings applied to new connections.",
    explanation: "Allows inspecting connection-specific overrides.",
    hint: "session_variables shows connection-specific overrides; global_variables shows server defaults.",
    level: "intermediate",
    codeExample: `SELECT * FROM performance_schema.session_variables WHERE VARIABLE_NAME = 'autocommit';`
  },
  {
    question: "What does `Max_used_connections` in `SHOW GLOBAL STATUS` represent?",
    shortAnswer: "The peak (highest watermark) number of concurrent connections active simultaneously since the server was started.",
    explanation: "Helps DBAs evaluate if `max_connections` is sized appropriately for peak traffic spikes.",
    hint: "Peak concurrent connection watermark reached since server startup.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Max_used_connections';`
  },
  {
    question: "What is `Select_full_join` in `SHOW GLOBAL STATUS` and why is a non-zero count a performance concern?",
    shortAnswer: "The number of joins that performed a full table scan of the second table because no index was available on the join condition.",
    explanation: "Indicates missing foreign key or join column indexes.",
    hint: "Count of joins performing full table scans due to missing join indexes.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Select_full_join';`
  },
  {
    question: "What is `Select_scan` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of joins or queries that performed a full scan of the first table.",
    explanation: "Expected for small reference tables, but a rapidly rising count indicates missing indexes on leading query tables.",
    hint: "Count of queries performing full scans on the first table.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Select_scan';`
  },
  {
    question: "How do you calculate the active connection saturation percentage in MySQL?",
    shortAnswer: "Divide `Threads_connected` by `max_connections` and multiply by 100: $\\text{Saturation} = \\left(\\frac{\\text{Threads\\_connected}}{\\text{max\\_connections}}\\right) \\times 100\\%$.",
    explanation: "If saturation exceeds 80%, connection pool limits or application connection leaks require immediate remediation.",
    hint: "(Threads_connected / max_connections) * 100.",
    level: "basic",
    codeExample: `SELECT 
  c.VARIABLE_VALUE AS connected,
  m.VARIABLE_VALUE AS max_allowed,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS saturation_pct
FROM performance_schema.global_status c
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
WHERE c.VARIABLE_NAME = 'Threads_connected';`
  },
  {
    question: "What is the primary operational takeaway of Topic 9 in Module 004_005?",
    shortAnswer: "`SHOW GLOBAL STATUS` and `SHOW GLOBAL VARIABLES` are the twin pillars of MySQL runtime observability: inspect `Threads_running` vs CPU core counts to catch thread starvation, track `Threads_connected` vs `max_connections` to prevent connection exhaustion, query `performance_schema.global_status` for relational SQL filtering, and stream live per-second rate deltas using `mysqladmin extended-status -r -i 1`.",
    explanation: "Mastering real-time status and variable inspection enables rapid diagnosis of concurrency spikes, memory exhaustion, and I/O bottlenecks without installing external tools.",
    hint: "Summarize status vs variables, Threads_running CPU starvation, connection saturation calculation, and mysqladmin -r -i 1 streaming.",
    level: "basic",
    codeExample: `-- Master Live Health Inspection Blueprint:
# 1. Terminal One-Liner Status:
mysqladmin -u root -p status

# 2. Live Per-Second Delta Rate Streaming:
mysqladmin -u root -p -i 1 -r extended-status | grep -E "Queries|Threads_running|Innodb_buffer_pool_reads"

# 3. Relational Health Query:
SELECT VARIABLE_NAME, VARIABLE_VALUE FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Uptime', 'Threads_connected', 'Threads_running', 'Questions');`
  }
];

export default questions;
