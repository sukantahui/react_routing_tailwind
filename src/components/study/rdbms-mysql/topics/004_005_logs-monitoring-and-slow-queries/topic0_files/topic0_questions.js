// topic0_files/topic0_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 0: Overview of MySQL Server Log Architecture and Log Files

const questions = [
  {
    question: "What are the 6 core log subsystems in the MySQL server architecture?",
    shortAnswer: "1. Error Log (`log_error`), 2. General Query Log (`general_log`), 3. Binary Log (`log_bin`), 4. Slow Query Log (`slow_query_log`), 5. Relay Log (Replication), and 6. DDL Log / Metadata Log.",
    explanation: "Each log type addresses a specific operational need: diagnostics, audit logging, replication/PITR, query optimization, replica execution, and crash-safe metadata operations.",
    hint: "Error, General Query, Binary, Slow Query, Relay, and DDL logs.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE '%log%';`
  },
  {
    question: "What is the primary function of the MySQL Error Log?",
    shortAnswer: "It records server startup and shutdown events, diagnostic warnings, critical engine alerts, fatal crashes, and InnoDB background recovery progress.",
    explanation: "The error log is the first destination DBAs inspect when the MySQL daemon fails to start, crashes, or triggers corruption warnings.",
    hint: "Records server lifecycle events, diagnostic warnings, and fatal errors.",
    level: "basic",
    codeExample: `-- View error log file path:
SHOW VARIABLES LIKE 'log_error';`
  },
  {
    question: "Why is enabling the General Query Log in high-throughput production environments strictly discouraged?",
    shortAnswer: "Because it writes an entry for EVERY client connection and EVERY executed SQL query, generating massive disk write I/O and causing a 15% to 30% reduction in Queries Per Second (QPS).",
    explanation: "The general query log is designed exclusively for short-term debugging and development troubleshooting, not sustained production logging.",
    hint: "Causes 15-30% QPS throughput drop due to logging every single query to disk.",
    level: "intermediate",
    codeExample: `-- Enable temporarily for 5 minutes during debugging:
SET GLOBAL general_log = 'ON';
-- Disable immediately afterwards:
SET GLOBAL general_log = 'OFF';`
  },
  {
    question: "What is the role of the `log_output` system variable in MySQL 8.0?",
    shortAnswer: "It specifies the physical storage destination for the General Query Log and Slow Query Log: `FILE` (writes to filesystem text files), `TABLE` (writes to database tables `mysql.general_log` and `mysql.slow_log`), or `NONE`.",
    explanation: "Writing to `FILE` is significantly faster than `TABLE` because `TABLE` uses the CSV storage engine which introduces row-level locking overhead.",
    hint: "Controls whether logs write to filesystem files (FILE) or database tables (TABLE).",
    level: "intermediate",
    codeExample: `SET PERSIST log_output = 'FILE';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS terminal queries suddenly slowed by 25%. What logging misconfiguration caused this issue?",
    shortAnswer: "A developer enabled `general_log = 'ON'` with `log_output = 'TABLE'` to debug a discount code issue, flooding the disk with CSV table writes for 40,000 retail transactions.",
    explanation: "Disabling the general log (`SET GLOBAL general_log = 'OFF';`) immediately restored full sub-millisecond checkout speeds.",
    hint: "Leaving general_log enabled caused severe disk write contention.",
    level: "moderate",
    codeExample: `-- Barrackpore Remediation:
SET GLOBAL general_log = 'OFF';
TRUNCATE TABLE mysql.general_log;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, which log configuration was mandated across their ₹500 Crore core banking cluster?",
    shortAnswer: "Error Log enabled (`log_error_verbosity = 2`), Binary Log enabled with strict durability (`sync_binlog = 1`), Slow Query Log enabled (`long_query_time = 0.5s`, `log_output = 'FILE'`), and General Log permanently disabled.",
    explanation: "This balanced configuration guarantees 100% crash durability and query performance visibility while keeping logging CPU overhead under 3%.",
    hint: "Binary log with sync_binlog=1, slow log at 0.5s, and general log disabled.",
    level: "expert",
    codeExample: `SET PERSIST log_error_verbosity = 2;
SET PERSIST slow_query_log = 'ON';
SET PERSIST long_query_time = 0.5;
SET PERSIST log_output = 'FILE';`
  },
  {
    question: "What is the difference between the Binary Log and the Relay Log in MySQL replication topologies?",
    shortAnswer: "The Binary Log is written by the Source (Master) recording local data modifications; the Relay Log is written by the Replica's I/O thread, caching transactions streamed from the source before the SQL thread applies them.",
    explanation: "Once the replica's SQL thread applies the transactions from the relay log, MySQL automatically purges the old relay log files.",
    hint: "Binary log records changes on master; Relay log caches received changes on replica.",
    level: "intermediate",
    codeExample: `-- On Replica:
SHOW REPLICA STATUS\\G -- Shows Relay_Log_File and Relay_Log_Pos`
  },
  {
    question: "What is the DDL Log (`ddl_log.log`) introduced in MySQL 8.0?",
    shortAnswer: "An internal, crash-safe metadata journal written by InnoDB during multi-step DDL operations (e.g. `ALTER TABLE`, `DROP TABLE`) to guarantee that atomic DDL operations either commit completely or roll back cleanly upon sudden host crashes.",
    explanation: "MySQL 8.0 eliminated non-atomic DDL partial failures by logging DDL metadata steps to `ddl_log.log`.",
    hint: "Internal InnoDB journal that guarantees atomic, crash-safe DDL operations.",
    level: "expert",
    codeExample: `-- Handled internally by InnoDB data dictionary; requires zero manual configuration.`
  },
  {
    question: "How do you check the active status and file paths of all MySQL log files dynamically in SQL?",
    shortAnswer: "Query `SHOW VARIABLES LIKE '%log%';` and `SHOW VARIABLES LIKE 'log_error';`.",
    explanation: "Returns system variable names and their current configured file paths and toggles.",
    hint: "Use SHOW VARIABLES LIKE '%log%'.",
    level: "basic",
    codeExample: `SHOW VARIABLES WHERE Variable_name IN (
  'log_error', 'general_log', 'general_log_file', 
  'slow_query_log', 'slow_query_log_file', 'log_bin'
);`
  },
  {
    question: "What command forces MySQL to close and reopen active log files (e.g. Error Log and General Log) during operating system log rotation?",
    shortAnswer: "Execute `FLUSH LOGS;` in SQL or run `mysqladmin -u root -p flush-logs` from the CLI.",
    explanation: "Notifies the server daemon that external tools (like Linux `logrotate`) have moved the current file, prompting MySQL to create a new log file.",
    hint: "Run FLUSH LOGS or mysqladmin flush-logs.",
    level: "basic",
    codeExample: `FLUSH LOGS;`
  },
  {
    question: "Why does writing logs to `log_output = 'TABLE'` introduce more performance overhead than `log_output = 'FILE'`?",
    shortAnswer: "Because `TABLE` logging requires MySQL to format log entries as relational records and append them to CSV tables (`mysql.general_log` or `mysql.slow_log`), contending for internal table locks and memory buffers.",
    explanation: "Filesystem file writes are handled by kernel OS page cache with zero database lock contention.",
    hint: "CSV table logging introduces database locking and SQL execution overhead.",
    level: "intermediate",
    codeExample: `-- File logging is up to 5x faster than CSV table logging.`
  },
  {
    question: "What is the performance overhead of running the Slow Query Log with `long_query_time = 1.0` in a production database?",
    shortAnswer: "Typically under 1% CPU and disk overhead.",
    explanation: "Because only queries taking longer than 1 second trigger a log write, the vast majority of fast OLTP queries (running in <10ms) bypass the log write completely.",
    hint: "Negligible overhead (<1%) because only slow outlier queries trigger disk writes.",
    level: "basic",
    codeExample: `SET PERSIST slow_query_log = 'ON';
SET PERSIST long_query_time = 1.0;`
  },
  {
    question: "How do you truncate or clear historical records from `mysql.general_log` or `mysql.slow_log` when `log_output = 'TABLE'` is used?",
    shortAnswer: "Temporarily disable the log (`SET GLOBAL general_log = 'OFF';`), run `TRUNCATE TABLE mysql.general_log;`, and re-enable it (`SET GLOBAL general_log = 'ON';`).",
    explanation: "Attempting to truncate an active log table without disabling logging first will fail with a table lock error.",
    hint: "Must disable logging before executing TRUNCATE TABLE on log tables.",
    level: "intermediate",
    codeExample: `SET GLOBAL slow_query_log = 'OFF';
TRUNCATE TABLE mysql.slow_log;
SET GLOBAL slow_query_log = 'ON';`
  },
  {
    question: "What is the role of `log_error_verbosity` in MySQL 8.0?",
    shortAnswer: "It controls the granularity of messages written to the Error Log: `1` = Errors only; `2` = Errors and Warnings (Recommended); `3` = Errors, Warnings, and Informational Notes.",
    explanation: "Setting verbosity to 2 captures critical warnings (like connection aborts and replica lag) without filling disks with verbose connection notes.",
    hint: "1=Errors, 2=Errors+Warnings, 3=Errors+Warnings+Notes.",
    level: "intermediate",
    codeExample: `SET PERSIST log_error_verbosity = 2;`
  },
  {
    question: "What happens if a disk partition containing MySQL log files fills to 100% capacity?",
    shortAnswer: "MySQL will halt all write operations and transactions will freeze (hang) until disk space is freed, or the server will crash if the binary log or InnoDB redo log cannot write.",
    explanation: "Monitoring disk space on log mount partitions is essential to prevent production database freezes.",
    hint: "Database freezes write operations or crashes when log disk partitions fill.",
    level: "basic",
    codeExample: `-- Monitor disk usage: df -h /var/log/mysql/`
  },
  {
    question: "How do you configure the Slow Query Log to capture queries that execute without using an index, regardless of execution time?",
    shortAnswer: "Set `log_queries_not_using_indexes = ON`.",
    explanation: "Flags queries that trigger full table scans or full index scans even if the table is small and executes quickly.",
    hint: "Enable log_queries_not_using_indexes.",
    level: "intermediate",
    codeExample: `SET PERSIST log_queries_not_using_indexes = ON;`
  },
  {
    question: "What is the function of the `log_error_services` variable in MySQL 8.0?",
    shortAnswer: "It defines the component pipeline that processes error log messages (e.g. `log_filter_internal; log_sink_internal; log_sink_json; log_sink_syseventlog`), allowing JSON formatting and syslog forwarding.",
    explanation: "MySQL 8.0's modular logging architecture allows exporting error logs directly in JSON format for automated ingestion by Datadog or ELK.",
    hint: "Configures error log processing pipeline components and JSON sinks.",
    level: "expert",
    codeExample: `SET PERSIST log_error_services = 'log_filter_internal; log_sink_json';`
  },
  {
    question: "How does `sync_binlog = 1` differ from `sync_binlog = 0` in terms of durability and performance?",
    shortAnswer: "`sync_binlog = 1` flushes the binary log to physical disk after every single transaction commit (100% crash-safe); `sync_binlog = 0` relies on the OS cache to flush periodically (faster, but risks losing recent transactions during a power outage).",
    explanation: "Production financial and ecommerce systems mandate `sync_binlog = 1` for zero data loss.",
    hint: "1 flushes to disk on every commit; 0 buffers writes in OS cache.",
    level: "intermediate",
    codeExample: `SET PERSIST sync_binlog = 1;`
  },
  {
    question: "What is the default filename and location of the MySQL Error Log on Linux systems?",
    shortAnswer: "Typically `/var/log/mysql/error.log` (Debian/Ubuntu) or `/var/log/mysqld.log` (RHEL/CentOS), or `<hostname>.err` in the data directory if unspecified.",
    explanation: "Defined by `log_error = /path/to/file` in `my.cnf`.",
    hint: "Usually /var/log/mysql/error.log or /var/log/mysqld.log.",
    level: "basic",
    codeExample: `[mysqld]
log_error = /var/log/mysql/error.log`
  },
  {
    question: "How do you enable the General Query Log dynamically without restarting the MySQL server?",
    shortAnswer: "Execute `SET GLOBAL general_log = 'ON';`.",
    explanation: "System variables for the general log are dynamic and take effect immediately for all active and new client connections.",
    hint: "Run SET GLOBAL general_log = 'ON'.",
    level: "basic",
    codeExample: `SET GLOBAL general_log = 'ON';`
  },
  {
    question: "What is the difference between `SET GLOBAL` and `SET PERSIST` when configuring log variables in MySQL 8.0?",
    shortAnswer: "`SET GLOBAL` applies changes to the running server only and is lost on restart; `SET PERSIST` applies changes immediately AND writes them to `mysqld-auto.cnf` so they survive server reboots.",
    explanation: "Introduced in MySQL 8.0, `SET PERSIST` eliminates the need to manually edit `my.cnf` files for runtime configuration changes.",
    hint: "SET PERSIST saves configuration changes to mysqld-auto.cnf across reboots.",
    level: "basic",
    codeExample: `SET PERSIST slow_query_log = 'ON';`
  },
  {
    question: "How can you prevent `log_queries_not_using_indexes` from flooding the slow query log when hundreds of small tables are queried frequently?",
    shortAnswer: "Configure `log_throttle_queries_not_using_indexes = N` (e.g. `10` or `20` queries per minute).",
    explanation: "Throttles logging to prevent disk saturation while still capturing representative unindexed queries.",
    hint: "Use log_throttle_queries_not_using_indexes to cap log writes per minute.",
    level: "intermediate",
    codeExample: `SET PERSIST log_throttle_queries_not_using_indexes = 20;`
  },
  {
    question: "What is the purpose of the `min_examined_row_limit` variable in slow query logging?",
    shortAnswer: "It prevents queries from being logged to the slow query log unless they examine at least N rows (e.g. `min_examined_row_limit = 100`).",
    explanation: "Filters out queries that took longer than `long_query_time` purely due to lock waits rather than scanning large datasets.",
    hint: "Only logs queries that examine at least N rows.",
    level: "intermediate",
    codeExample: `SET PERSIST min_examined_row_limit = 500;`
  },
  {
    question: "Why should MySQL log files be placed on dedicated physical storage volumes separate from the InnoDB data directory (`/var/lib/mysql`)?",
    shortAnswer: "To prevent heavy sequential write I/O from log flushes from competing with random InnoDB page read/write I/O, and to ensure that if a data drive fails, transaction logs remain intact.",
    explanation: "Isolating log I/O stabilizes query latency and protects disaster recovery capability.",
    hint: "Separates sequential log I/O from random data I/O and prevents single-point disk failure.",
    level: "expert",
    codeExample: `# Dedicated mount layout:
# Data: /data/mysql/
# Logs: /logs/mysql/`
  },
  {
    question: "How do you inspect the last 50 lines of the MySQL Error Log from the Linux terminal in real time?",
    shortAnswer: "Execute `tail -n 50 -f /var/log/mysql/error.log`.",
    explanation: "Streams new diagnostic messages and error traces to the console as they occur.",
    hint: "Use tail -f on the error log file.",
    level: "basic",
    codeExample: `tail -n 50 -f /var/log/mysql/error.log`
  },
  {
    question: "What information does the Slow Query Log record for each slow query?",
    shortAnswer: "Query execution time, Lock time, Rows sent, Rows examined, Client user/host, Schema name, Timestamp, and the full raw SQL query text.",
    explanation: "Provides forensic metrics for database developers to optimize index coverage and refactor slow SQL joins.",
    hint: "Query time, lock time, rows examined, client host, and raw SQL.",
    level: "basic",
    codeExample: `# Time: 2026-08-25T15:00:00.123456Z
# User@Host: root[root] @ localhost []  Id:    12
# Query_time: 4.819200  Lock_time: 0.000120 Rows_sent: 10  Rows_examined: 5000000
SELECT * FROM kolkata_retail.orders WHERE status = 'PENDING';`
  },
  {
    question: "What tool is commonly used to rotate MySQL log files on Linux without stopping the server?",
    shortAnswer: "Linux `logrotate` configured with a postrotate script executing `mysqladmin flush-logs`.",
    explanation: "`logrotate` compresses old log files (e.g. `error.log.1.gz`), purges expired logs after 30 days, and flushes MySQL log handles cleanly.",
    hint: "Linux logrotate with postrotate mysqladmin flush-logs.",
    level: "intermediate",
    codeExample: `/var/log/mysql/*.log {
  daily
  rotate 14
  compress
  postrotate
    mysqladmin flush-logs
  endscript
}`
  },
  {
    question: "How does the Binary Log differ from the Redo Log in purpose and scope?",
    shortAnswer: "The Binary Log is a logical log at the MySQL server layer used for replication and Point-in-Time Recovery; the Redo Log is a physical block-level circular buffer within InnoDB used exclusively for crash recovery upon restart.",
    explanation: "Binary logs persist indefinitely until purged; redo logs overwrite fixed-size circular files continuously.",
    hint: "Binary log is server-level for replication/PITR; Redo log is engine-level circular buffer for crash recovery.",
    level: "intermediate",
    codeExample: `-- Binlog: binlog.000001 (Server layer)
-- Redo log: ib_logfile0 / #ib_redo (InnoDB engine layer)`
  },
  {
    question: "What is the impact of character encoding settings when viewing raw log files with standard text utilities?",
    shortAnswer: "MySQL logs write timestamps in ISO 8601 UTC/system format and SQL strings in their original UTF-8 encoding; ensure terminal pagers (like `less`) support UTF-8 to view multilingual strings accurately.",
    explanation: "Preserves Bengali, Hindi, and special character queries in slow logs.",
    hint: "Use UTF-8 compatible pagers to view multilingual log entries.",
    level: "basic",
    codeExample: `export LESSCHARSET=utf-8
less /var/log/mysql/slow.log`
  },
  {
    question: "What is the primary operational takeaway of Topic 0 in Module 004_005?",
    shortAnswer: "MySQL's logging architecture is the foundation of observability and durability: keep the Error Log and Binary Log enabled in production (`sync_binlog = 1`), configure the Slow Query Log with `long_query_time = 1.0s` and `log_output = 'FILE'`, and keep the General Query Log permanently disabled in production to avoid severe 15-30% QPS performance penalties.",
    explanation: "Configuring the appropriate log levels gives database administrators complete diagnostic visibility into crashes, query bottlenecks, and transactional changes with minimal resource overhead.",
    hint: "Summarize the 6 log types, log_output=FILE, slow log configuration, and general log production hazards.",
    level: "basic",
    codeExample: `-- Master Production Log Configuration:
SET PERSIST log_error_verbosity = 2;
SET PERSIST slow_query_log = 'ON';
SET PERSIST long_query_time = 1.0;
SET PERSIST log_output = 'FILE';
SET PERSIST general_log = 'OFF';`
  }
];

export default questions;
