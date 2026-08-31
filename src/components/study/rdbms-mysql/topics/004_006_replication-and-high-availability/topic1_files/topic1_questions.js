// topic1_files/topic1_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 1: How MySQL Replication Works: Binary Log on Source, I/O Thread, Relay Log, and SQL Thread on Replica

const questions = [
  {
    question: "What are the 3 distinct background threads that drive MySQL Source-Replica replication?",
    shortAnswer: "1. **Binlog Dump Thread** (on the Source), 2. **Replication Receiver Thread / I/O Thread** (on the Replica), and 3. **Replication Applier Thread / SQL Thread** (on the Replica).",
    explanation: "The Dump thread streams binlogs over TCP, the I/O thread writes them to local Relay Logs, and the SQL thread applies them to the database.",
    hint: "Binlog Dump Thread on Source, Receiver (I/O) Thread on Replica, and Applier (SQL) Thread on Replica.",
    level: "basic",
    codeExample: `# Source: Binlog Dump Thread (reads binlog → streams to network)
# Replica: I/O Thread (reads network → writes relay log)
# Replica: SQL Thread (reads relay log → executes in InnoDB)`
  },
  {
    question: "Why did MySQL architect replication with TWO separate threads (I/O Thread and SQL Thread) on the replica instead of a single thread?",
    shortAnswer: "To decouple network transfer speed from physical disk write execution; the fast I/O thread can download and buffer incoming transactions into Relay Logs without waiting for slow SQL execution (like heavy updates or table scans) on the replica.",
    explanation: "If a query takes 10 seconds to execute, the I/O thread can still fetch hundreds of incoming transactions from the Source without dropping network packets.",
    hint: "Decouples network downloading from disk SQL execution for buffering and speed.",
    level: "intermediate",
    codeExample: `-- Fast network buffering (I/O thread) + Independent SQL execution (SQL thread)`
  },
  {
    question: "What is a Relay Log on a MySQL replica, and what is its purpose?",
    shortAnswer: "A set of temporary circular binary log files created on the replica's disk storage by the I/O thread to store transactions received from the Source before they are executed by the SQL thread.",
    explanation: "Relay logs act as a durable on-disk queue between the network receiver and the storage engine applier.",
    hint: "Temporary on-disk transaction queue between the I/O thread and SQL applier thread.",
    level: "basic",
    codeExample: `# Sample Relay Log Files:
# replica-relay-bin.000001
# replica-relay-bin.000002
# replica-relay-bin.index`
  },
  {
    question: "What happens to Relay Log files after the SQL Applier thread finishes executing all transactions in them?",
    shortAnswer: "They are automatically deleted from physical disk by the server if `relay_log_purge = 1` (the default setting in MySQL).",
    explanation: "Prevents replica disk storage from filling up with historical transaction logs.",
    hint: "Automatically purged by relay_log_purge = 1.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'relay_log_purge'; -- Value: ON (1)`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a replica database crashed due to an unexpected power outage. Upon reboot, how did `relay_log_recovery = ON` prevent replication corruption?",
    shortAnswer: "It automatically wiped all partially written local relay logs and re-fetched unapplied transactions directly from the Source starting from the last safely committed SQL position in `mysql.slave_relay_log_info`.",
    explanation: "Guarantees crash-safe replication recovery without manual DBA intervention across ₹1.2 Crores in store inventory.",
    hint: "relay_log_recovery wipes uncommitted relay logs and re-fetches from Source.",
    level: "moderate",
    codeExample: `# my.cnf on Replica:
relay_log_recovery = ON`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu verify that all 3 replication threads were operating normally across ₹500 Crores in banking ledgers?",
    shortAnswer: "On the replica, he ran `SHOW REPLICA STATUS\\G` and verified `Replica_IO_Running: Yes` (I/O thread active), `Replica_SQL_Running: Yes` (SQL thread active), and `Seconds_Behind_Source: 0` (zero lag).",
    explanation: "Both threads showing 'Yes' confirms complete end-to-end replication health.",
    hint: "Verified Replica_IO_Running: Yes and Replica_SQL_Running: Yes in SHOW REPLICA STATUS.",
    level: "expert",
    codeExample: `SHOW REPLICA STATUS\\G
-- Replica_IO_Running: Yes
-- Replica_SQL_Running: Yes
-- Seconds_Behind_Source: 0`
  },
  {
    question: "Where does MySQL 8.0 store replication metadata repositories by default?",
    shortAnswer: "In transactional InnoDB tables inside the `mysql` system schema (`mysql.slave_master_info` and `mysql.slave_relay_log_info`).",
    explanation: "Storing metadata in transactional tables (`master_info_repository = TABLE` and `relay_log_info_repository = TABLE`) guarantees atomic crash-safe replication updates.",
    hint: "In InnoDB system tables: mysql.slave_master_info and mysql.slave_relay_log_info.",
    level: "intermediate",
    codeExample: `SELECT * FROM mysql.slave_master_info;
SELECT * FROM mysql.slave_relay_log_info;`
  },
  {
    question: "What does `Replica_IO_Running: Connecting` indicate in `SHOW REPLICA STATUS`?",
    shortAnswer: "The I/O thread is actively attempting to establish a TCP network connection to the Source host, but has not yet successfully authenticated or connected (often due to wrong IP, firewall block, or bad credentials).",
    explanation: "Indicates network or authentication failure between replica and primary.",
    hint: "I/O thread is trying to connect but failing due to network, firewall, or credentials.",
    level: "basic",
    codeExample: `-- Check Last_IO_Error for exact connection or authentication error message.`
  },
  {
    question: "What does `Replica_IO_Running: No` vs `Replica_SQL_Running: No` signify during a replication failure?",
    shortAnswer: "`Replica_IO_Running: No` indicates network disconnect or invalid binlog coordinates; `Replica_SQL_Running: No` indicates an SQL execution error on the replica (e.g. duplicate key `ERROR 1062` or missing table `ERROR 1146`).",
    explanation: "Isolates whether the failure is in the network transport layer (I/O) or data execution layer (SQL).",
    hint: "IO: No is network/binlog coordinate error; SQL: No is SQL execution/constraint error.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G
-- Check Last_IO_Error vs Last_SQL_Error`
  },
  {
    question: "What internal MySQL protocol command does the Replica I/O thread send to the Source to initiate binlog streaming?",
    shortAnswer: "`COM_BINLOG_DUMP` (for positional binlog replication) or `COM_BINLOG_DUMP_GTID` (for GTID-based replication).",
    explanation: "Instructs the Source server to spawn a Binlog Dump thread and stream binary log events starting from the specified coordinate or GTID set.",
    hint: "COM_BINLOG_DUMP or COM_BINLOG_DUMP_GTID.",
    level: "expert",
    codeExample: `-- Internal network command requesting binary log stream.`
  },
  {
    question: "What is the role of `slave_net_timeout` and replication heartbeats in MySQL?",
    shortAnswer: "The Source sends periodic heartbeat packets across the TCP socket if no new data has been written; if the replica does not receive data or a heartbeat within `slave_net_timeout` seconds (default 60s), it terminates the broken TCP socket and reconnects.",
    explanation: "Detects silent TCP connection drops across firewalls and network routers.",
    hint: "Periodic heartbeat packets detecting silent TCP drops.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'slave_net_timeout';`
  },
  {
    question: "What happens on the Source if multiple replicas connect simultaneously?",
    shortAnswer: "The Source spawns a separate, independent **Binlog Dump Thread** for each connected replica, with each dump thread reading the Binary Log at that replica's specific position.",
    explanation: "Allows 10+ replicas to replicate from the same primary independently.",
    hint: "Spawns a dedicated Binlog Dump thread per connected replica.",
    level: "intermediate",
    codeExample: `SHOW PROCESSLIST;
-- Shows multiple threads with Command: 'Binlog Dump' or 'Binlog Dump GTID'`
  },
  {
    question: "What is `Relay_Master_Log_File` and `Exec_Master_Log_Pos` in `SHOW REPLICA STATUS`?",
    shortAnswer: "They indicate the Source's binary log file and exact position corresponding to the transaction that the replica's **SQL thread** most recently executed.",
    explanation: "Represents the true committed data state of the replica relative to the primary.",
    hint: "The Source binlog coordinates of the most recently executed transaction on replica.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G
-- Relay_Master_Log_File: binlog.000004
-- Exec_Master_Log_Pos: 154829`
  },
  {
    question: "What is `Master_Log_File` and `Read_Master_Log_Pos` in `SHOW REPLICA STATUS`?",
    shortAnswer: "They indicate the Source's binary log file and position corresponding to the transaction that the replica's **I/O thread** most recently received and written to the relay log.",
    explanation: "Comparing `Read_Master_Log_Pos` against `Exec_Master_Log_Pos` shows how much unapplied data is buffered in local relay logs.",
    hint: "The Source binlog coordinates of the most recently received transaction by I/O thread.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G
-- Master_Log_File: binlog.000004
-- Read_Master_Log_Pos: 189200`
  },
  {
    question: "What does the gap between `Read_Master_Log_Pos` and `Exec_Master_Log_Pos` indicate?",
    shortAnswer: "It represents the volume of transactions that have been downloaded over the network by the I/O thread into local relay logs, but are still waiting to be applied by the SQL thread.",
    explanation: "A large gap indicates the SQL applier thread is running slower than the network transfer rate.",
    hint: "Volume of downloaded transactions waiting in relay logs for SQL thread execution.",
    level: "basic",
    codeExample: `-- Gap = Read_Master_Log_Pos - Exec_Master_Log_Pos`
  },
  {
    question: "How do you start only the I/O thread without starting the SQL thread on a replica?",
    shortAnswer: "Execute `START REPLICA IO_THREAD;` (or legacy `START SLAVE IO_THREAD;`).",
    explanation: "Useful when you want the replica to download binlogs over the network while pausing SQL execution for maintenance or backup snapshots.",
    hint: "START REPLICA IO_THREAD.",
    level: "basic",
    codeExample: `START REPLICA IO_THREAD;`
  },
  {
    question: "How do you start only the SQL thread without starting the I/O thread on a replica?",
    shortAnswer: "Execute `START REPLICA SQL_THREAD;` (or legacy `START SLAVE SQL_THREAD;`).",
    explanation: "Allows the replica to apply all downloaded relay logs to catch up without receiving new transactions from the network.",
    hint: "START REPLICA SQL_THREAD.",
    level: "basic",
    codeExample: `START REPLICA SQL_THREAD;`
  },
  {
    question: "What does `Seconds_Behind_Source` (or `Seconds_Behind_Master`) measure in `SHOW REPLICA STATUS`?",
    shortAnswer: "The difference in seconds between the timestamp recorded in the transaction currently being executed by the SQL thread and the current system time on the replica.",
    explanation: "The standard metric for estimating replication delay in seconds.",
    hint: "Time difference between timestamp of transaction being executed and current clock time.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G -- Seconds_Behind_Source: 0`
  },
  {
    question: "Why might `Seconds_Behind_Source` return `NULL` in `SHOW REPLICA STATUS`?",
    shortAnswer: "Because either the I/O thread or the SQL thread is stopped (`Replica_IO_Running: No` or `Replica_SQL_Running: No`), or the replica cannot communicate with the Source.",
    explanation: "`NULL` indicates that lag cannot be calculated because replication is broken or stopped.",
    hint: "Returns NULL when either replication thread is stopped or broken.",
    level: "basic",
    codeExample: `-- Seconds_Behind_Source: NULL → Replication is stopped or broken!`
  },
  {
    question: "What is `max_relay_log_size` in MySQL?",
    shortAnswer: "The maximum file size (in bytes) a single relay log file can reach before MySQL rotates to a new relay log file (e.g. `1GB`).",
    explanation: "If set to 0, MySQL uses the value of `max_binlog_size`.",
    hint: "Maximum size of a relay log file before automatic rotation.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'max_relay_log_size';`
  },
  {
    question: "What is the danger of setting `read_only = OFF` on a read replica in production?",
    shortAnswer: "Application users or background scripts could execute direct `INSERT`/`UPDATE` queries on the replica, causing local data to diverge from the primary and triggering duplicate key conflicts (`ERROR 1062`) that break replication.",
    explanation: "Always configure `read_only = ON` and `super_read_only = ON` on replicas.",
    hint: "Allows local writes that diverge data and cause duplicate key crashes in replication.",
    level: "basic",
    codeExample: `SET GLOBAL read_only = ON;
SET GLOBAL super_read_only = ON;`
  },
  {
    question: "What is `super_read_only` in MySQL 8.0, and how does it differ from standard `read_only`?",
    shortAnswer: "`read_only = ON` prevents standard users from writing but permits users with `SUPER` or `SYSTEM_VARIABLES_ADMIN` privileges to write; `super_read_only = ON` blocks **ALL** users, including root/superusers, from writing (except the internal replication applier thread).",
    explanation: "Essential protection against accidental DBA writes on replicas.",
    hint: "super_read_only blocks everyone including root/superusers from writing.",
    level: "intermediate",
    codeExample: `SET GLOBAL super_read_only = ON;`
  },
  {
    question: "What is `relay_log_space_limit` in MySQL?",
    shortAnswer: "The maximum total disk space (in bytes) that all unpurged relay logs combined can consume on the replica's disk volume.",
    explanation: "If reached, the I/O thread pauses downloading until the SQL thread executes and purges older relay logs, preventing disk full crashes.",
    hint: "Total disk space quota for all relay logs combined to prevent disk exhaustion.",
    level: "expert",
    codeExample: `SET GLOBAL relay_log_space_limit = 50 * 1024 * 1024 * 1024; -- 50GB Limit`
  },
  {
    question: "How does the Source know which Binary Log file to stream to a connecting replica?",
    shortAnswer: "The replica sends its current requested binlog filename and position (or GTID set) during the `COM_BINLOG_DUMP` connection handshake.",
    explanation: "The Source reads its local binlog starting from that exact requested offset.",
    hint: "Replica specifies requested binlog file and offset during handshake.",
    level: "basic",
    codeExample: `-- Handshake specifies: binlog.000002 at pos 154`
  },
  {
    question: "What happens if a DBA manually deletes a binary log file on the Source that a replica has not yet finished reading?",
    shortAnswer: "The replica's I/O thread fails with `Got fatal error 1236 from master when reading data from binary log: 'Could not find first log file...'`, halting replication permanently.",
    explanation: "Requires re-cloning the replica from a fresh backup snapshot.",
    hint: "Triggers fatal error 1236, breaking replication permanently.",
    level: "intermediate",
    codeExample: `-- Fatal Error 1236: Binary log purged before replica read it!`
  },
  {
    question: "How do you inspect the current state of replication threads in `performance_schema` tables?",
    shortAnswer: "Query `performance_schema.replication_connection_status` (I/O thread) and `performance_schema.replication_applier_status` (SQL thread).",
    explanation: "Provides structured relational tables for programmatic monitoring scripts.",
    hint: "Query performance_schema.replication_connection_status and replication_applier_status.",
    level: "expert",
    codeExample: `SELECT * FROM performance_schema.replication_connection_status\\G
SELECT * FROM performance_schema.replication_applier_status\\G`
  },
  {
    question: "What is `sync_relay_log` in MySQL replica configuration?",
    shortAnswer: "The number of relay log write events after which the replica flushes relay logs to disk using `fdatasync()` (default 10,000; set to `1` for strict durability).",
    explanation: "`sync_relay_log = 1` guarantees that every received event is flushed to disk before acknowledgment.",
    hint: "Frequency of fdatasync flushes for relay logs to disk.",
    level: "expert",
    codeExample: `SET GLOBAL sync_relay_log = 1;`
  },
  {
    question: "Why should replicas have `log_replica_updates = ON` (or `log_slave_updates = ON`) enabled?",
    shortAnswer: "To force the replica to write transactions executed by its SQL thread into its own Binary Log, enabling cascading replication topologies (Source → Relay Replica → Edge Replicas) and seamless promotion to primary during failover.",
    explanation: "Required for failover candidate replicas to retain binlogs for downstream nodes.",
    hint: "Writes applied transactions to replica's own binlog for cascading replication and failover.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'log_replica_updates';`
  },
  {
    question: "What is the primary operational difference between `STOP REPLICA;` and `RESET REPLICA;`?",
    shortAnswer: "`STOP REPLICA;` pauses the I/O and SQL threads without modifying coordinates; `RESET REPLICA;` purges all local relay logs and resets replication coordinates (while `RESET REPLICA ALL;` removes all Source connection metadata permanently).",
    explanation: "`RESET REPLICA` is used when re-pointing or re-initializing replication from scratch.",
    hint: "STOP pauses threads; RESET purges relay logs and resets coordinates.",
    level: "basic",
    codeExample: `STOP REPLICA;
RESET REPLICA;`
  },
  {
    question: "What is the primary operational takeaway of Topic 1 in Module 004_006?",
    shortAnswer: "MySQL replication operates across a 3-thread pipeline: the Source **Binlog Dump Thread** streams binary log events over TCP, the Replica **I/O Receiver Thread** buffers them into local on-disk **Relay Logs**, and the Replica **SQL Applier Thread** executes them in InnoDB. Enforcing `relay_log_recovery = ON`, storing metadata in InnoDB `TABLE` repositories, and keeping `super_read_only = ON` on replicas guarantees crash-safe, resilient replication pipelines.",
    explanation: "Understanding the separation of network retrieval from SQL execution is essential for tuning replication throughput, diagnosing lag, and resolving replication failures.",
    hint: "Summarize the 3 threads (Dump, I/O, SQL), Relay Log buffering, crash-safe table repositories, and super_read_only.",
    level: "basic",
    codeExample: `-- Master Replication Health Verification:
SHOW REPLICA STATUS\\G
-- 1. Replica_IO_Running = Yes (I/O thread connected & downloading)
-- 2. Replica_SQL_Running = Yes (SQL thread executing in InnoDB)
-- 3. Seconds_Behind_Source = 0 (Replica fully caught up)`
  }
];

export default questions;
