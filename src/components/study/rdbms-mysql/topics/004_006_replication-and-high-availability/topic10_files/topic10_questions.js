// topic10_files/topic10_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 10: Monitoring Replication Status: SHOW REPLICA STATUS (SHOW SLAVE STATUS), Seconds_Behind_Master

const questions = [
  {
    question: "What is the primary SQL command used to inspect replication health on a MySQL 8.0 replica?",
    shortAnswer: "**`SHOW REPLICA STATUS\\G`** (or legacy `SHOW SLAVE STATUS\\G`).",
    explanation: "Outputs over 40 diagnostic variables covering thread states, log positions, GTID sets, errors, and replication lag.",
    hint: "SHOW REPLICA STATUS\\G.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G`
  },
  {
    question: "What are the 3 possible states for `Replica_IO_Running` in `SHOW REPLICA STATUS`?",
    shortAnswer: "1. **`Yes`** (Connected to Source and actively streaming binlogs), 2. **`No`** (Stopped or terminated due to fatal network/auth error), and 3. **`Connecting`** (Attempting TCP connection or retrying after network drop).",
    explanation: "Indicates the status of the replication network receiver thread.",
    hint: "Yes (streaming), No (stopped/failed), and Connecting (retrying network connection).",
    level: "basic",
    codeExample: `-- Replica_IO_Running: Yes`
  },
  {
    question: "What are the 2 possible states for `Replica_SQL_Running` in `SHOW REPLICA STATUS`?",
    shortAnswer: "1. **`Yes`** (Actively executing transactions from relay logs into local InnoDB tables), and 2. **`No`** (Halted due to an execution error or manual `STOP REPLICA` command).",
    explanation: "Indicates the status of the replication storage applier thread.",
    hint: "Yes (applying events) and No (halted on error or stopped).",
    level: "basic",
    codeExample: `-- Replica_SQL_Running: Yes`
  },
  {
    question: "What is the difference between `Read_Master_Log_Pos` and `Exec_Master_Log_Pos` in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Read_Master_Log_Pos` is the byte position downloaded from the Source into local relay logs by the **I/O thread**; `Exec_Master_Log_Pos` is the byte position executed and committed to the local database by the **SQL thread**.",
    explanation: "The gap between them represents downloaded transactions waiting in relay logs to be applied.",
    hint: "Read is downloaded by I/O thread; Exec is committed by SQL thread.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G
-- Master_Log_File: binlog.000004 | Read_Master_Log_Pos: 850000
-- Relay_Master_Log_File: binlog.000004 | Exec_Master_Log_Pos: 650000 (200KB unapplied queue!)`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS replication halted on a Saturday morning. Susmita saw `Replica_IO_Running: Yes` but `Replica_SQL_Running: No` with `Last_SQL_Errno: 1062`. How did she diagnose and fix this across ₹1.2 Crores in inventory data?",
    shortAnswer: "`ERROR 1062` is a Duplicate Key constraint violation caused by an accidental manual insert directly on the replica; because GTID was enabled, she injected an empty transaction for the failing GTID (`SET GTID_NEXT = 'uuid:104'; BEGIN; COMMIT; SET GTID_NEXT = 'AUTOMATIC';`), and enforced `super_read_only = ON` to prevent future rogue writes.",
    explanation: "Resolved the replication stall in 30 seconds and protected the replica from local writes.",
    hint: "Diagnosed duplicate key error 1062, injected empty GTID commit, and enabled super_read_only.",
    level: "moderate",
    codeExample: `# Barrackpore SQL Error Remediation:
-- Last_SQL_Error: Error 'Duplicate entry '101' for key 'PRIMARY'' on query...
STOP REPLICA;
SET GTID_NEXT = '3E11FA47-...:104';
BEGIN; COMMIT;
SET GTID_NEXT = 'AUTOMATIC';
START REPLICA;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu use `performance_schema` tables to monitor Multi-Threaded Slave (MTS) worker status across ₹500 Crores in banking records without parsing text output?",
    shortAnswer: "He queried `performance_schema.replication_applier_status_by_worker`, which provided structured relational metrics showing which exact GTID each of the 16 worker threads was applying and their error codes in real time.",
    explanation: "Enables programmatic monitoring and automated alerting without regex parsing of `SHOW REPLICA STATUS` text.",
    hint: "Queried performance_schema.replication_applier_status_by_worker.",
    level: "expert",
    codeExample: `SELECT WORKER_ID, THREAD_ID, SERVICE_STATE, LAST_SEEN_TRANSACTION, LAST_ERROR_NUMBER 
FROM performance_schema.replication_applier_status_by_worker;`
  },
  {
    question: "What does `Last_IO_Errno: 1236` indicate in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Got fatal error 1236 from master when reading data from binary log: 'The slave is connecting using AUTO_POSITION and the first event's GTID ... is not in the master's binlogs'` (The Source has purged binary logs required by the replica).",
    explanation: "Occurs when a replica is offline for too long and the primary purges old binlogs before the replica reconnects.",
    hint: "Fatal Error 1236: Requested binary logs have been purged on the primary.",
    level: "intermediate",
    codeExample: `-- Fatal Error 1236: Required binary log files were deleted by binlog_expire_logs_seconds.`
  },
  {
    question: "What does `Last_IO_Errno: 1045` indicate in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Access denied for user 'repl_user'@'...' (using password: YES)` (Replication authentication failure due to incorrect username, password, or missing `REPLICATION SLAVE` privilege).",
    explanation: "Requires verifying credentials and checking user permissions on the primary.",
    hint: "Authentication failure: invalid replication user credentials or missing grant.",
    level: "basic",
    codeExample: `-- Last_IO_Error: Access denied for user 'repl_user'@'192.168.1.20'`
  },
  {
    question: "What does `Last_IO_Errno: 2003` indicate in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Can't connect to MySQL server on '...' (110 Connection timed out / 111 Connection refused)` (Network firewall blocking port 3306, wrong IP address, or primary MySQL daemon is down).",
    explanation: "Indicates network transport connectivity failure.",
    hint: "Network connectivity error: firewall blocking port 3306 or primary server is offline.",
    level: "basic",
    codeExample: `-- Last_IO_Error: Can't connect to MySQL server on '192.168.1.10' (110)`
  },
  {
    question: "What is `Retrieved_Gtid_Set` vs `Executed_Gtid_Set` in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Retrieved_Gtid_Set` is the complete range of GTIDs downloaded into local Relay Logs by the **I/O thread**; `Executed_Gtid_Set` is the range of GTIDs applied to local database tables by the **SQL thread**.",
    explanation: "Subtracting `Executed_Gtid_Set` from `Retrieved_Gtid_Set` reveals the exact backlog of transactions queued in relay logs.",
    hint: "Retrieved is downloaded in relay logs; Executed is committed to local tables.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G
-- Retrieved_Gtid_Set: 3E11FA47-...:1-500
-- Executed_Gtid_Set:  3E11FA47-...:1-450 (50 transactions queued in relay log!)`
  },
  {
    question: "What does `Auto_Position: 1` confirm in `SHOW REPLICA STATUS`?",
    shortAnswer: "Confirms that the replica is operating in modern GTID-based auto-positioning mode rather than legacy binary log file and byte coordinate mode.",
    explanation: "Verifies that `CHANGE REPLICATION SOURCE TO SOURCE_AUTO_POSITION = 1` is active.",
    hint: "Confirms GTID auto-positioning protocol is active.",
    level: "basic",
    codeExample: `-- Auto_Position: 1`
  },
  {
    question: "What does `Seconds_Behind_Source: 0` mean?",
    shortAnswer: "The replica is 100% caught up with the Source; the SQL applier thread has applied all transactions currently downloaded in the relay logs.",
    explanation: "The ideal operational state for all high-availability replicas.",
    hint: "Replica is fully synchronized with zero replication delay.",
    level: "basic",
    codeExample: `-- Seconds_Behind_Source: 0`
  },
  {
    question: "What does `Seconds_Behind_Source: NULL` indicate?",
    shortAnswer: "Replication is stopped, broken, or not running (`Replica_IO_Running: No` or `Replica_SQL_Running: No`); MySQL cannot calculate lag because replication threads are inactive.",
    explanation: "A critical monitoring condition that must immediately trigger on-call alerts.",
    hint: "Replication is halted or broken; lag cannot be calculated.",
    level: "basic",
    codeExample: `-- Seconds_Behind_Source: NULL (Replication is BROKEN!)`
  },
  {
    question: "What is `performance_schema.replication_connection_status` in MySQL 8.0?",
    shortAnswer: "A relational system table providing real-time telemetry on the replication I/O Receiver thread, including channel name, connection status (`SERVICE_STATE`), last heartbeat timestamp, and network error codes.",
    explanation: "Provides SQL-queryable access to replication network metrics.",
    hint: "System table for inspecting replication I/O receiver thread status.",
    level: "intermediate",
    codeExample: `SELECT CHANNEL_NAME, SERVICE_STATE, LAST_HEARTBEAT_TIMESTAMP 
FROM performance_schema.replication_connection_status;`
  },
  {
    question: "What is `performance_schema.replication_applier_status_by_coordinator` in MySQL 8.0?",
    shortAnswer: "A relational system table providing status and error telemetry for the replication SQL Coordinator thread, including service state, last applied transaction, and remaining replication delay.",
    explanation: "Tracks coordinator applier health in single-threaded and multi-threaded configurations.",
    hint: "System table for inspecting replication SQL coordinator applier status.",
    level: "intermediate",
    codeExample: `SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER, LAST_ERROR_MESSAGE 
FROM performance_schema.replication_applier_status_by_coordinator;`
  },
  {
    question: "How do you check replication status on a specific named channel in Multi-Source replication?",
    shortAnswer: "Append `FOR CHANNEL 'channel_name'`: `SHOW REPLICA STATUS FOR CHANNEL 'mumbai_source'\\G`.",
    explanation: "Displays isolated telemetry metrics for that specific inbound replication channel.",
    hint: "Append FOR CHANNEL 'channel_name' to SHOW REPLICA STATUS.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS FOR CHANNEL 'kolkata_channel'\\G`
  },
  {
    question: "What are the 4 essential Prometheus exporter metrics monitored for MySQL replication?",
    shortAnswer: "1. `mysql_slave_status_slave_io_running` (must be 1), 2. `mysql_slave_status_slave_sql_running` (must be 1), 3. `mysql_slave_status_seconds_behind_master` (<5s), and 4. `mysql_slave_status_last_sql_errno` (must be 0).",
    explanation: "Standard enterprise metrics exposed by `mysqld_exporter` for Grafana dashboards.",
    hint: "slave_io_running, slave_sql_running, seconds_behind_master, and last_sql_errno.",
    level: "intermediate",
    codeExample: `# Prometheus Alert:
mysql_slave_status_slave_sql_running == 0`
  },
  {
    question: "What is `Last_SQL_Errno: 1146` in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Table 'db.table_name' doesn't exist` (The replica's SQL thread attempted to execute a query on a table that is missing from the replica database, often due to improper replication filters or partial backup restores).",
    explanation: "Requires restoring the missing table or injecting an empty GTID skip.",
    hint: "Table doesn't exist on replica due to filtering or incomplete initial backup restore.",
    level: "intermediate",
    codeExample: `-- Last_SQL_Error: Error 'Table 'kolkata_retail.audit_log' doesn't exist' on query...`
  },
  {
    question: "What is `Last_SQL_Errno: 1452` in `SHOW REPLICA STATUS`?",
    shortAnswer: "`Cannot add or update a child row: a foreign key constraint fails` (Occurs when an inserted row references a parent row that does not exist on the replica, often caused by partial database replication filters).",
    explanation: "Replication filters must include both parent and child tables to satisfy relational integrity.",
    hint: "Foreign key constraint failure on replica.",
    level: "intermediate",
    codeExample: `-- Last_SQL_Errno: 1452 (Foreign key constraint violation)`
  },
  {
    question: "What is `Relay_Log_Space` in `SHOW REPLICA STATUS`?",
    shortAnswer: "The total disk space in bytes consumed by all physical relay log files currently stored on the replica's filesystem.",
    explanation: "Monitored to ensure relay logs do not fill up replica disk storage during severe lag episodes.",
    hint: "Total disk space in bytes consumed by relay log files on the replica.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G -- Relay_Log_Space: 104857600 (100MB)`
  },
  {
    question: "What does `Until_Condition` in `SHOW REPLICA STATUS` indicate?",
    shortAnswer: "Indicates whether the replica is configured to stop automatically when it reaches a specific coordinate or GTID (e.g. `START REPLICA UNTIL SQL_BEFORE_GTIDS = 'uuid:105';`).",
    explanation: "Used during point-in-time recovery to stop replication immediately before a disastrous query (like an accidental `DROP TABLE`).",
    hint: "Displays UNTIL stopping criteria for point-in-time disaster recovery replays.",
    level: "expert",
    codeExample: `START REPLICA UNTIL SQL_BEFORE_GTIDS = '3E11FA47-...:105';`
  },
  {
    question: "What is `Replicate_Ignore_Server_Ids` in `SHOW REPLICA STATUS`?",
    shortAnswer: "A list of `server_id` numbers whose binary log events are ignored by this replica.",
    explanation: "Used in multi-master circular replication and disaster recovery topologies to filter events originating from specific servers.",
    hint: "List of server IDs whose events are ignored by this replica.",
    level: "expert",
    codeExample: `CHANGE REPLICATION SOURCE TO IGNORE_SERVER_IDS = (3, 4);`
  },
  {
    question: "How do you calculate the un-applied transaction queue backlog between `Retrieved_Gtid_Set` and `Executed_Gtid_Set` programmatically in SQL?",
    shortAnswer: "Use `GTID_SUBTRACT(Retrieved_Gtid_Set, Executed_Gtid_Set)`: `SELECT GTID_SUBTRACT(@@GLOBAL.gtid_executed, @@GLOBAL.gtid_purged);`.",
    explanation: "Returns the exact set of GTIDs buffered in relay logs awaiting execution by the SQL thread.",
    hint: "Use GTID_SUBTRACT(Retrieved_Set, Executed_Set).",
    level: "expert",
    codeExample: `SELECT GTID_SUBTRACT(
  '3E11FA47-...:1-100', 
  '3E11FA47-...:1-80'
); -- Output: '3E11FA47-...:81-100' (20 transactions in backlog)`
  },
  {
    question: "What is `SQL_Delay` in `SHOW REPLICA STATUS`?",
    shortAnswer: "The intentional replication delay in seconds configured on the replica (e.g. `CHANGE REPLICATION SOURCE TO SOURCE_DELAY = 3600;` for a 1-hour delayed replica).",
    explanation: "Used to maintain a delayed standby replica to protect against accidental human errors (like `DROP DATABASE`).",
    hint: "Intentional replication lag configured via SOURCE_DELAY for human error recovery.",
    level: "intermediate",
    codeExample: `CHANGE REPLICATION SOURCE TO SOURCE_DELAY = 3600; -- 1 Hour Delay`
  },
  {
    question: "What does `SQL_Remaining_Delay` in `SHOW REPLICA STATUS` indicate on a delayed replica?",
    shortAnswer: "The number of seconds remaining before the delayed replica will begin executing the next queued transaction from the relay log.",
    explanation: "Counts down the artificial delay before transaction application.",
    hint: "Countdown timer in seconds before delayed replica applies the next event.",
    level: "intermediate",
    codeExample: `-- SQL_Remaining_Delay: 1800 (30 minutes remaining)`
  },
  {
    question: "What is `Replica_Rows_Search_Algorithms` in `SHOW REPLICA STATUS`?",
    shortAnswer: "The active algorithms (`INDEX_SCAN,HASH_SCAN`) used by the SQL thread to locate rows during Row-Based replication for tables lacking primary keys.",
    explanation: "Prevents full table scan lag spikes on unindexed tables.",
    hint: "Algorithms used to locate rows in tables lacking primary keys.",
    level: "basic",
    codeExample: `-- Replica_Rows_Search_Algorithms: INDEX_SCAN,HASH_SCAN`
  },
  {
    question: "Why should `SHOW REPLICA STATUS` be queried with `\\G` instead of a semicolon `;` in the MySQL CLI?",
    shortAnswer: "Because `SHOW REPLICA STATUS` outputs over 40 wide columns; using `\\G` formats the output vertically with one column per line, making it human-readable on terminal screens.",
    explanation: "Horizontal tabular output wraps across multiple lines and becomes unreadable.",
    hint: "Formats the 40+ output columns vertically for easy terminal reading.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G`
  },
  {
    question: "How do you check if a replication channel is currently executing a large transaction via `sys` schema?",
    shortAnswer: "Query `sys.processlist` or `sys.session` for `program_name LIKE '%replica%'` and inspect `current_statement` and `time`.",
    explanation: "Quickly identifies long-running DDL or monolithic batch operations stalling replication.",
    hint: "Query sys.processlist for replication threads to see current executing statement and duration.",
    level: "intermediate",
    codeExample: `SELECT thd_id, conn_id, user, db, current_statement, time 
FROM sys.processlist 
WHERE user = 'system user';`
  },
  {
    question: "What is the recommended health check query for automated shell scripts monitoring replication?",
    shortAnswer: "Execute `SHOW REPLICA STATUS\\G` and grep for `Replica_IO_Running: Yes` and `Replica_SQL_Running: Yes` with `Seconds_Behind_Source: 0`.",
    explanation: "Validates all 3 core health indicators in a single lightweight command.",
    hint: "Verify Replica_IO_Running: Yes, Replica_SQL_Running: Yes, and Seconds_Behind_Source is numeric.",
    level: "basic",
    codeExample: `mysql -u monitor_user -p -e "SHOW REPLICA STATUS\\G" | grep -E 'Replica_.*_Running|Seconds_Behind_Source'`
  },
  {
    question: "What is the primary operational takeaway of Topic 10 in Module 004_006?",
    shortAnswer: "Monitoring replication health requires systematic telemetry inspection: verify that **`Replica_IO_Running`** and **`Replica_SQL_Running`** are both **Yes**, monitor **`Seconds_Behind_Source`** (with automated alerts at &gt;10s), triage network/auth stalls via **`Last_IO_Error`** (errors 2003, 1045, 1236), triage schema conflicts via **`Last_SQL_Error`** (errors 1062, 1146), query **`performance_schema`** for structured MTS worker metrics, and track GTID queues between `Retrieved_Gtid_Set` and `Executed_Gtid_Set`.",
    explanation: "Mastering `SHOW REPLICA STATUS` and Performance Schema replication tables ensures instant detection and remediation of replication failures across enterprise clusters.",
    hint: "Summarize dual-thread health, Seconds_Behind_Source, I/O vs SQL error triaging, performance_schema tables, and GTID queue tracking.",
    level: "basic",
    codeExample: `-- Master Replication Health Inspection Checklist:
# 1. Quick CLI Inspection:
SHOW REPLICA STATUS\\G

# 2. Performance Schema Relational Query:
SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER, LAST_ERROR_MESSAGE 
FROM performance_schema.replication_connection_status;

SELECT CHANNEL_NAME, SERVICE_STATE, LAST_ERROR_NUMBER, LAST_ERROR_MESSAGE 
FROM performance_schema.replication_applier_status_by_coordinator;

# 3. MTS Worker Workload:
SELECT WORKER_ID, SERVICE_STATE, LAST_SEEN_TRANSACTION 
FROM performance_schema.replication_applier_status_by_worker;`
  }
];

export default questions;
