// topic2_files/topic2_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 2: The General Query Log: Enabling, Inspection, Performance Overhead, and Debugging Use Cases

const questions = [
  {
    question: "What events are recorded by the MySQL General Query Log?",
    shortAnswer: "1. Every client connection establishment (user, IP, thread ID) and disconnection; 2. Every single SQL query received from any connected client, in the exact chronological order received before query execution.",
    explanation: "Unlike the Slow Query Log or Binary Log, the General Query Log records all queries regardless of execution time or whether they modify data (including simple `SELECT` queries).",
    hint: "Records all client connections, disconnections, and every SQL query received.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'general_log%';`
  },
  {
    question: "Why should the General Query Log NEVER be left enabled in a production environment?",
    shortAnswer: "Because it writes to disk for every single SQL query, causing massive disk I/O write saturation, thread contention, and a 15% to 30% drop in overall Queries Per Second (QPS) throughput.",
    explanation: "At high scale (10,000+ QPS), general query logging generates tens of gigabytes of disk writes per hour, degrading database response times.",
    hint: "Causes 15-30% throughput drop due to writing every query to disk.",
    level: "basic",
    codeExample: `-- Keep OFF in production:
SET PERSIST general_log = 'OFF';`
  },
  {
    question: "What major security and compliance hazard is associated with the General Query Log?",
    shortAnswer: "It logs SQL queries in cleartext, meaning statements containing passwords (e.g. `CREATE USER ... IDENTIFIED BY 'secret'`, `SET PASSWORD`) and sensitive customer PII are written unencrypted to disk in plaintext.",
    explanation: "Storing plaintext credentials and PII in world-readable log files violates security compliance standards (PCI-DSS, ISO 27001, GDPR).",
    hint: "Logs plaintext passwords and sensitive customer PII unencrypted on disk.",
    level: "intermediate",
    codeExample: `# General Log entry with sensitive password in plaintext:
# 2026-08-25T15:00:00.123456Z   14 Query  CREATE USER 'mamata'@'%' IDENTIFIED BY 'SecretPass#2026';`
  },
  {
    question: "How do you enable the General Query Log dynamically for 5 minutes during a live debugging session?",
    shortAnswer: "Execute `SET GLOBAL general_log = 'ON';`, perform your test queries, and immediately execute `SET GLOBAL general_log = 'OFF';`.",
    explanation: "Dynamic variables take effect instantly without restarting the MySQL server, allowing short, controlled forensic snapshots.",
    hint: "Use SET GLOBAL general_log = 'ON' and turn OFF when finished.",
    level: "basic",
    codeExample: `SET GLOBAL general_log = 'ON';
-- [Run application debugging test for 5 minutes]
SET GLOBAL general_log = 'OFF';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, a new microservice was crashing database connections. How did Mamata use the General Query Log safely to find the root cause?",
    shortAnswer: "She enabled `general_log = 'ON'` for 60 seconds on a staging replica, revealing that a flawed Node.js loop was opening 500 new TCP connections per second without reusing a connection pool.",
    explanation: "Capturing a 1-minute trace identified the connection leak immediately, allowing developers to configure connection pooling before deploying to production.",
    hint: "Captured a 60-second general log trace to identify rapid unpooled connection loops.",
    level: "moderate",
    codeExample: `# Barrackpore General Log Analysis:
# Connect    app_user@192.168.1.45 on barrackpore_store using TCP/IP (Repeated 500x/sec!)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, an ORM framework was generating hidden N+1 query storms on a ₹500 Crore ledger table. How did Debangshu diagnose this?",
    shortAnswer: "He directed `general_log` to a dedicated NVMe file on a test instance during an API load test, discovering that loading 1,000 accounts triggered 1,000 individual `SELECT * FROM balances WHERE account_id = ?` queries.",
    explanation: "Viewing the sequential general log exposed the ORM's missing eager loading (`JOIN FETCH`), which was refactored into a single batch query.",
    hint: "Identified ORM N+1 query storms by viewing chronological query sequences.",
    level: "expert",
    codeExample: `# General log revealed 1,000 sequential single-row queries:
# Query  SELECT * FROM balances WHERE account_id = 101;
# Query  SELECT * FROM balances WHERE account_id = 102;
# Query  SELECT * FROM balances WHERE account_id = 103;`
  },
  {
    question: "What is the difference between `log_output = 'FILE'` and `log_output = 'TABLE'` when the General Query Log is active?",
    shortAnswer: "`FILE` writes to a text file (e.g. `/var/log/mysql/general.log`) with minimal OS caching overhead; `TABLE` writes to `mysql.general_log` (a CSV engine table), which can be queried with SQL but incurs table-locking overhead.",
    explanation: "Querying `mysql.general_log` allows filtering with SQL `WHERE` clauses, but `FILE` logging offers much higher write throughput.",
    hint: "FILE writes to text files on disk; TABLE writes to the mysql.general_log CSV table.",
    level: "intermediate",
    codeExample: `SET GLOBAL log_output = 'TABLE';
SET GLOBAL general_log = 'ON';
-- Query via SQL:
SELECT event_time, user_host, argument FROM mysql.general_log ORDER BY event_time DESC LIMIT 20;`
  },
  {
    question: "How do you truncate and reclaim disk space from `mysql.general_log` when `log_output = 'TABLE'` is used?",
    shortAnswer: "1. Disable logging: `SET GLOBAL general_log = 'OFF';` 2. Truncate table: `TRUNCATE TABLE mysql.general_log;` 3. Optionally re-enable if still debugging: `SET GLOBAL general_log = 'ON';`.",
    explanation: "Attempting `TRUNCATE TABLE` while `general_log = 'ON'` fails with `ERROR 1556: You can't use locks on log tables`.",
    hint: "Must set general_log = 'OFF' before executing TRUNCATE TABLE.",
    level: "intermediate",
    codeExample: `SET GLOBAL general_log = 'OFF';
TRUNCATE TABLE mysql.general_log;`
  },
  {
    question: "What is the schema structure of the `mysql.general_log` table?",
    shortAnswer: "`event_time` (timestamp), `user_host` (client credentials), `thread_id` (connection ID), `server_id`, `command_type` (Connect/Query/Quit), and `argument` (the raw SQL query text or command payload).",
    explanation: "Provides structured relational columns for querying specific connection threads and command types.",
    hint: "event_time, user_host, thread_id, server_id, command_type, argument.",
    level: "intermediate",
    codeExample: `DESCRIBE mysql.general_log;`
  },
  {
    question: "How does the General Query Log differ from the Binary Log in MySQL 8.0?",
    shortAnswer: "The General Query Log records ALL statements (including `SELECT`) in raw unparsed text for audit/debugging; the Binary Log records ONLY committed data-modifying statements (DML/DDL) with transactional metadata for replication and Point-in-Time Recovery.",
    explanation: "Binary logs are required for replication and recovery; general query logs are purely diagnostic and never used for replication.",
    hint: "General log records all queries including SELECTs; Binary log records data mutations for replication/PITR.",
    level: "basic",
    codeExample: `-- General Log: SELECT, INSERT, UPDATE, DELETE, SET, SHOW
-- Binary Log: INSERT, UPDATE, DELETE, CREATE, ALTER, DROP (Committed only)`
  },
  {
    question: "What modern MySQL 8.0 feature provides zero-overhead query inspection as a superior alternative to the General Query Log?",
    shortAnswer: "The Performance Schema statement event tables (`performance_schema.events_statements_history` and `events_statements_summary_by_digest`).",
    explanation: "The Performance Schema collects statement telemetry in non-blocking memory ring buffers with under 1% CPU overhead, avoiding all disk I/O.",
    hint: "Performance Schema statements history in memory ring buffers.",
    level: "expert",
    codeExample: `SELECT sql_text, timer_wait/1000000000 AS exec_ms 
FROM performance_schema.events_statements_history 
ORDER BY timer_start DESC LIMIT 10;`
  },
  {
    question: "What enterprise MySQL plugin provides compliant, secure audit logging with sensitive data masking instead of using the insecure General Query Log?",
    shortAnswer: "The MySQL Enterprise Audit Plugin (`audit_log`).",
    explanation: "Enterprise Audit provides cryptographically signed XML/JSON audit logs, user-based filtering rules, and automatic data masking of passwords and credit card numbers.",
    hint: "MySQL Enterprise Audit plugin (audit_log) with data masking.",
    level: "expert",
    codeExample: `INSTALL PLUGIN audit_log SONAME 'audit_log.so';`
  },
  {
    question: "How do you specify a custom file path for the General Query Log?",
    shortAnswer: "Set `general_log_file = '/var/log/mysql/custom_general.log'` via `SET GLOBAL` or in `my.cnf`.",
    explanation: "Allows placing the temporary log on a high-speed RAM disk (`tmpfs`) to minimize disk write latency during testing.",
    hint: "Use general_log_file = '/path/to/file'.",
    level: "basic",
    codeExample: `SET GLOBAL general_log_file = '/mnt/ramdisk/mysql_debug.log';
SET GLOBAL general_log = 'ON';`
  },
  {
    question: "What is the command type `Init DB` recorded in the General Query Log?",
    shortAnswer: "It indicates that a client connection executed a `USE dbname;` statement or selected a default schema upon connecting.",
    explanation: "Helps identify when applications switch database contexts dynamically.",
    hint: "Records USE database_name schema selection events.",
    level: "basic",
    codeExample: `# 2026-08-25T15:00:00.123456Z   14 Init DB  kolkata_retail`
  },
  {
    question: "What is the command type `Quit` recorded in the General Query Log?",
    shortAnswer: "It records that a client closed its TCP connection or terminated its database session.",
    explanation: "Used to audit connection durations by comparing the `Connect` timestamp with the `Quit` timestamp for the same `thread_id`.",
    hint: "Records client disconnection and session termination.",
    level: "basic",
    codeExample: `# 2026-08-25T15:00:05.123456Z   14 Quit`
  },
  {
    question: "How do you search the General Query Log for all queries executed by a specific database user?",
    shortAnswer: "If using `FILE`, use grep: `grep 'app_service' /var/log/mysql/general.log`; if using `TABLE`, run `SELECT * FROM mysql.general_log WHERE user_host LIKE '%app_service%';`.",
    explanation: "Isolates statements executed by a single application service or microservice.",
    hint: "Grep the log file or query mysql.general_log with user_host filter.",
    level: "basic",
    codeExample: `SELECT event_time, argument FROM mysql.general_log 
WHERE user_host LIKE 'app_service%' AND command_type = 'Query';`
  },
  {
    question: "Why does the General Query Log log statements BEFORE they are executed, unlike the Slow Query Log?",
    shortAnswer: "To provide an exact chronological record of incoming client requests, allowing developers to see queries that failed syntax validation, crashed the server, or were killed midway.",
    explanation: "Because it logs before execution, it captures crashed or aborted queries that never complete.",
    hint: "Logs prior to execution to capture queries that crash, abort, or fail syntax checks.",
    level: "intermediate",
    codeExample: `-- Slow log captures queries AFTER execution; General log captures BEFORE execution.`
  },
  {
    question: "What is the impact of enabling the General Query Log on flash/SSD storage endurance?",
    shortAnswer: "It causes excessive write wear on SSD flash memory cells by constantly writing hundreds of gigabytes of ephemeral query text per week, shortening SSD hardware lifespan.",
    explanation: "Disabling unnecessary logging preserves enterprise NVMe SSD longevity.",
    hint: "Causes severe SSD write wear from continuous high-volume text writes.",
    level: "intermediate",
    codeExample: `-- Disabling general_log protects SSD write endurance.`
  },
  {
    question: "How can you tail the active General Query Log in real time on Linux?",
    shortAnswer: "Run `tail -f /var/log/mysql/general.log` in the terminal.",
    explanation: "Displays incoming queries and connection handshakes in real-time as they hit the server.",
    hint: "Use tail -f on the general log file path.",
    level: "basic",
    codeExample: `tail -f /var/log/mysql/general.log`
  },
  {
    question: "What happens if the General Query Log text file is deleted with `rm` while MySQL is actively logging to it?",
    shortAnswer: "MySQL keeps writing to the open unlinked file handle in Linux memory (consuming disk space that `ls` cannot see) until `FLUSH LOGS;` is executed to recreate the file on disk.",
    explanation: "Always execute `FLUSH LOGS;` after removing or rotating log files on Linux.",
    hint: "Writes to unlinked file descriptor until FLUSH LOGS is executed.",
    level: "expert",
    codeExample: `rm /var/log/mysql/general.log
mysqladmin -u root -p flush-logs`
  },
  {
    question: "How do you configure MySQL to disable the General Query Log upon server startup in `my.cnf`?",
    shortAnswer: "Set `general_log = 0` (or `general_log = OFF`) in the `[mysqld]` section of `my.cnf`.",
    explanation: "Guarantees the general log does not activate automatically upon server restart.",
    hint: "Set general_log = 0 in my.cnf.",
    level: "basic",
    codeExample: `[mysqld]
general_log = 0`
  },
  {
    question: "What is the performance difference between logging to a ramdisk (`/dev/shm`) versus SSD when temporary general query logging is required?",
    shortAnswer: "Logging to `/dev/shm` (RAM) eliminates physical disk I/O bottlenecks and SSD write wear, reducing the performance penalty of general logging from 30% down to ~5-8%.",
    explanation: "A RAM disk buffers the logging stream entirely in system memory.",
    hint: "RAM disk (/dev/shm) eliminates disk I/O wear and reduces performance drop.",
    level: "expert",
    codeExample: `SET GLOBAL general_log_file = '/dev/shm/mysql_debug.log';
SET GLOBAL general_log = 'ON';`
  },
  {
    question: "How do you filter the General Query Log table (`mysql.general_log`) to find all DDL statements executed today?",
    shortAnswer: "Execute `SELECT * FROM mysql.general_log WHERE argument REGEXP '^(CREATE|ALTER|DROP|TRUNCATE)' AND event_time >= CURDATE();`.",
    explanation: "Allows security auditors to inspect schema alterations made during a specific time window.",
    hint: "Use REGEXP matching on the argument column for DDL keywords.",
    level: "intermediate",
    codeExample: `SELECT event_time, user_host, argument FROM mysql.general_log
WHERE argument REGEXP '^(CREATE|ALTER|DROP|TRUNCATE)'
ORDER BY event_time DESC;`
  },
  {
    question: "Can the General Query Log be filtered to log only specific client IP addresses or user accounts?",
    shortAnswer: "No, the built-in General Query Log has no filtering capabilities; it logs 100% of all connections and queries across the entire server instance.",
    explanation: "To filter by user, IP, or query type, use the MySQL Enterprise Audit Plugin or Performance Schema.",
    hint: "Built-in general log cannot filter; it captures 100% of all queries globally.",
    level: "basic",
    codeExample: `-- Built-in General Log is all-or-nothing.`
  },
  {
    question: "What is the command type `Field List` recorded in the General Query Log?",
    shortAnswer: "It records metadata requests where a client or driver requested column definitions for a table (e.g. `SHOW COLUMNS` or JDBC `DatabaseMetaData.getColumns()`).",
    explanation: "Commonly seen during ORM and framework startup initialization.",
    hint: "Records table column metadata discovery requests from client drivers.",
    level: "intermediate",
    codeExample: `# 2026-08-25T15:00:00.123456Z   14 Field List  orders`
  },
  {
    question: "What is the recommended maximum duration to keep the General Query Log enabled during production troubleshooting?",
    shortAnswer: "No more than 5 to 10 minutes during controlled off-peak diagnostic windows.",
    explanation: "Minimizes the risk of storage exhaustion and limits performance degradation for end users.",
    hint: "Limit to 5-10 minutes during low-traffic diagnostic windows.",
    level: "basic",
    codeExample: `-- Always set a timer to disable general_log after 5 minutes.`
  },
  {
    question: "How do you verify if the General Query Log is currently active via command-line shell script?",
    shortAnswer: "Run `mysql -u root -p -e \"SHOW VARIABLES LIKE 'general_log';\"` and parse for `ON`.",
    explanation: "Useful in monitoring scripts to alert DBAs if `general_log` was accidentally left enabled in production.",
    hint: "Query general_log variable and verify value is OFF.",
    level: "basic",
    codeExample: `STATUS=$(mysql -u root -p -N -e "SELECT @@general_log;")
if [ "$STATUS" -eq 1 ]; then
  echo "CRITICAL: general_log is ON in production!" | mail -s "Log Alert" dba@bank.com
fi`
  },
  {
    question: "What is the impact of character encoding on queries logged in `mysql.general_log`?",
    shortAnswer: "The `argument` column is defined as `mediumtext` in `utf8mb4`, storing multi-byte Unicode, emojis, and Indian regional language queries accurately without character corruption.",
    explanation: "Preserves full international query syntax in log tables.",
    hint: "argument column is utf8mb4 mediumtext, preserving multi-byte characters.",
    level: "basic",
    codeExample: `SELECT argument FROM mysql.general_log WHERE argument LIKE '%ক্রেতা%';`
  },
  {
    question: "Why is the Slow Query Log preferred over the General Query Log for identifying application performance bottlenecks?",
    shortAnswer: "Because the Slow Query Log records only inefficient outlier queries that exceed performance thresholds (saving disk I/O with <1% overhead) and includes execution timing metrics (Query_time, Lock_time, Rows_examined) that the General Query Log lacks.",
    explanation: "The General Query Log only records raw queries without execution timings or row scan statistics.",
    hint: "Slow log includes execution timings and rows examined with <1% overhead.",
    level: "basic",
    codeExample: `-- General Log: Raw query only (No timing metrics)
-- Slow Query Log: Query_time=4.2s, Rows_examined=5,000,000`
  },
  {
    question: "What is the primary operational takeaway of Topic 2 in Module 004_005?",
    shortAnswer: "The General Query Log is a specialized forensic tool that captures 100% of client connections and SQL queries in chronological order: keep it permanently disabled in production to avoid a 15-30% QPS performance penalty and prevent plaintext password exposure, and leverage it only for short 5-minute diagnostic windows (preferably on ramdisks or staging replicas) to debug ORM query storms and connection leaks.",
    explanation: "Understanding the operational hazards and legitimate debugging use cases of the General Query Log prevents catastrophic disk saturation while providing a surgical forensic tool when deep query tracing is required.",
    hint: "Summarize 15-30% QPS drop, security password risks, temporary 5-min debugging, and ramdisk staging.",
    level: "basic",
    codeExample: `-- Master General Query Log Protocol:
# 1. Enable on Ramdisk for 5-min Debugging:
SET GLOBAL general_log_file = '/dev/shm/debug_trace.log';
SET GLOBAL general_log = 'ON';
# 2. Perform Investigation:
-- tail -f /dev/shm/debug_trace.log
# 3. Disable Immediately:
SET GLOBAL general_log = 'OFF';`
  }
];

export default questions;
