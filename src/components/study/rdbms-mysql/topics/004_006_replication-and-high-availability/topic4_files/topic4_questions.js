// topic4_files/topic4_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 4: Setting Up Source-Replica (Master-Slave) Replication Step-by-Step

const questions = [
  {
    question: "What are the essential configuration parameters required in `my.cnf` on the Source (Primary) server for MySQL 8.0 replication?",
    shortAnswer: "`server_id` (unique integer), `log_bin = mysql-bin`, `binlog_format = ROW`, `gtid_mode = ON`, `enforce_gtid_consistency = ON`, and `log_replica_updates = ON`.",
    explanation: "These parameters enable binary logging, row-based logging format, and global transaction identifiers for crash-safe replication.",
    hint: "server_id, log_bin, binlog_format=ROW, gtid_mode=ON, enforce_gtid_consistency=ON.",
    level: "basic",
    codeExample: `[mysqld]
server_id = 1
log_bin = mysql-bin
binlog_format = ROW
gtid_mode = ON
enforce_gtid_consistency = ON
log_replica_updates = ON`
  },
  {
    question: "What privilege must be granted to the dedicated replication user on the Source server?",
    shortAnswer: "The **`REPLICATION SLAVE`** global privilege (e.g. `GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'%';`).",
    explanation: "Allows the replica's I/O thread to connect to the Source and request binary log event streams.",
    hint: "GRANT REPLICATION SLAVE ON *.*.",
    level: "basic",
    codeExample: `CREATE USER 'repl_user'@'192.168.1.%' IDENTIFIED BY 'ReplPass#2026' REQUIRE SSL;
GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'192.168.1.%';
FLUSH PRIVILEGES;`
  },
  {
    question: "Why should `server_id` NEVER be identical across any two servers in the same replication topology?",
    shortAnswer: "If a replica shares the same `server_id` as the Source or another node, the Source terminates the connection or the replica silently discards incoming transactions (believing it generated them itself), breaking replication.",
    explanation: "Each MySQL instance in a cluster must have a distinct, non-zero 32-bit integer `server_id`.",
    hint: "Identical server_id causes connection termination or silent transaction discarding.",
    level: "basic",
    codeExample: `-- Source: server_id = 1
-- Replica 1: server_id = 2
-- Replica 2: server_id = 3`
  },
  {
    question: "What is the fastest, modern method to seed initial database data from Source to Replica in MySQL 8.0 without using `mysqldump`?",
    shortAnswer: "The native **MySQL Clone Plugin** (`CLONE INSTANCE FROM 'clone_user'@'source_ip':3306 IDENTIFIED BY 'password';`), which performs high-speed physical tablespace cloning and auto-configures GTID coordinates.",
    explanation: "Transfers hundreds of gigabytes at raw NVMe network speeds in minutes with zero manual export/import steps.",
    hint: "Use the MySQL 8.0 Clone Plugin (CLONE INSTANCE FROM).",
    level: "intermediate",
    codeExample: `INSTALL PLUGIN clone SONAME 'mysql_clone.so';
CLONE INSTANCE FROM 'clone_user'@'192.168.1.10':3306 IDENTIFIED BY 'ClonePass#2026';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, how did Susmita provision a fresh read replica for 50GB of POS billing data in 4 minutes using the Clone Plugin?",
    shortAnswer: "She installed the `clone` plugin on both nodes and executed `CLONE INSTANCE FROM 'clone_user'@'192.168.1.10':3306`, which cloned the physical 50GB tablespace, restarted the replica, and synced GTID coordinates automatically across ₹1.2 Crores in inventory data.",
    explanation: "Eliminated the 45-minute delay of traditional `mysqldump` export and restore.",
    hint: "Executed CLONE INSTANCE FROM to clone 50GB physically in 4 minutes.",
    level: "moderate",
    codeExample: `# Barrackpore Fast Replica Provisioning:
INSTALL PLUGIN clone SONAME 'mysql_clone.so';
CLONE INSTANCE FROM 'clone_user'@'192.168.1.10':3306 IDENTIFIED BY 'SecretPass#2026';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu seed a replica for a ₹500 Crore banking database using `mysqldump` without locking online transactions?",
    shortAnswer: "He ran `mysqldump` with `--single-transaction --triggers --routines --events --set-gtid-purged=ON --all-databases`, ensuring an atomic InnoDB snapshot with zero read locks while embedding exact GTID purge coordinates.",
    explanation: "The `--single-transaction` flag relies on MVCC to provide a consistent snapshot without blocking online `INSERT`/`UPDATE` transactions.",
    hint: "Used mysqldump with --single-transaction and --set-gtid-purged=ON.",
    level: "expert",
    codeExample: `mysqldump -u root -p --single-transaction --triggers --routines --events \
  --set-gtid-purged=ON --all-databases > bank_cluster_dump.sql`
  },
  {
    question: "What is the complete SQL command syntax on the replica to connect to the Source in MySQL 8.0?",
    shortAnswer: "`CHANGE REPLICATION SOURCE TO SOURCE_HOST = 'ip', SOURCE_PORT = 3306, SOURCE_USER = 'repl_user', SOURCE_PASSWORD = 'password', SOURCE_AUTO_POSITION = 1, SOURCE_SSL = 1;`.",
    explanation: "Configures host connection metadata and enables GTID auto-positioning and SSL encryption.",
    hint: "CHANGE REPLICATION SOURCE TO with SOURCE_HOST, SOURCE_USER, SOURCE_PASSWORD, SOURCE_AUTO_POSITION=1.",
    level: "basic",
    codeExample: `CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.10',
  SOURCE_PORT = 3306,
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplSecurePass#2026',
  SOURCE_AUTO_POSITION = 1,
  SOURCE_SSL = 1;`
  },
  {
    question: "What command starts replication threads on a replica in MySQL 8.0?",
    shortAnswer: "`START REPLICA;` (or legacy `START SLAVE;`).",
    explanation: "Launches both the I/O Receiver thread and SQL Applier thread concurrently.",
    hint: "START REPLICA.",
    level: "basic",
    codeExample: `START REPLICA;`
  },
  {
    question: "What 3 metrics in `SHOW REPLICA STATUS` confirm that replication is 100% healthy?",
    shortAnswer: "1. `Replica_IO_Running: Yes`, 2. `Replica_SQL_Running: Yes`, and 3. `Seconds_Behind_Source: 0` (with `Last_IO_Errno: 0` and `Last_SQL_Errno: 0`).",
    explanation: "Confirms that the network receiver is streaming, the SQL applier is executing, and the replica is completely caught up.",
    hint: "Replica_IO_Running: Yes, Replica_SQL_Running: Yes, and Seconds_Behind_Source: 0.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G`
  },
  {
    question: "Why should `read_only = ON` and `super_read_only = ON` be configured in `my.cnf` on all replicas?",
    shortAnswer: "To prevent application users, developers, or background cron jobs from executing direct write queries on the replica, which would cause data divergence and duplicate key crashes (`ERROR 1062`).",
    explanation: "Replicas should only receive writes from their internal replication applier thread.",
    hint: "Prevents accidental direct writes that cause data divergence and duplicate key errors.",
    level: "basic",
    codeExample: `[mysqld]
read_only = ON
super_read_only = ON`
  },
  {
    question: "What happens if a firewall blocks TCP port 3306 between the Replica and Source?",
    shortAnswer: "The replica's I/O thread gets stuck in `Replica_IO_Running: Connecting`, and `Last_IO_Error` shows `ERROR 2003 (HY000): Can't connect to MySQL server on '...' (110 Connection timed out)`. ",
    explanation: "Requires opening firewall rules or security groups on port 3306 for the replica's IP address.",
    hint: "Replica_IO_Running stays 'Connecting' with connection timed out error.",
    level: "basic",
    codeExample: `-- Last_IO_Error: Can't connect to MySQL server on '192.168.1.10' (110)`
  },
  {
    question: "What error occurs if the replication user password is wrong or the user was not granted permissions?",
    shortAnswer: "`Last_IO_Error` displays `ERROR 1045 (28000): Access denied for user 'repl_user'@'...' (using password: YES)`. ",
    explanation: "Requires verifying credentials and running `GRANT REPLICATION SLAVE ON *.*` on the Source.",
    hint: "Access denied error 1045 in Last_IO_Error.",
    level: "basic",
    codeExample: `-- Last_IO_Error: Access denied for user 'repl_user'@'192.168.1.20'`
  },
  {
    question: "How do you enforce SSL/TLS encryption for replication data in transit?",
    shortAnswer: "Create the replication user with `REQUIRE SSL` on the Source, and configure `SOURCE_SSL = 1` in the `CHANGE REPLICATION SOURCE TO` command on the replica.",
    explanation: "Encrypts all binary log streams across the network, protecting sensitive data from packet sniffing.",
    hint: "REQUIRE SSL on user and SOURCE_SSL = 1 on replication connection.",
    level: "intermediate",
    codeExample: `CHANGE REPLICATION SOURCE TO SOURCE_SSL = 1;`
  },
  {
    question: "What is the purpose of `relay_log_recovery = ON` in replica configuration?",
    shortAnswer: "If the replica server crashes unexpectedly, upon reboot it automatically purges all uncommitted relay logs and re-fetches missing transactions directly from the Source, ensuring crash-safe recovery.",
    explanation: "Eliminates relay log corruption risks after power outages.",
    hint: "Automatically recovers from corrupted relay logs on replica crash.",
    level: "intermediate",
    codeExample: `[mysqld]
relay_log_recovery = ON`
  },
  {
    question: "What repository setting in MySQL 8.0 ensures replication coordinates survive server crashes?",
    shortAnswer: "`master_info_repository = TABLE` and `relay_log_info_repository = TABLE`.",
    explanation: "Stores replication state in transactional InnoDB tables (`mysql.slave_master_info` and `mysql.slave_relay_log_info`) rather than flat text files.",
    hint: "Setting repositories to TABLE stores metadata in InnoDB tables.",
    level: "intermediate",
    codeExample: `[mysqld]
master_info_repository = TABLE
relay_log_info_repository = TABLE`
  },
  {
    question: "What does `binlog_format = ROW` ensure in MySQL 8.0 replication?",
    shortAnswer: "It records exact row-level data modifications (before and after images) in the binary log rather than raw SQL statements, guaranteeing 100% deterministic replication for non-deterministic functions (like `NOW()`, `UUID()`, or `RAND()`).",
    explanation: "Statement-based replication (`STATEMENT`) can cause data divergence on non-deterministic queries.",
    hint: "Records exact row modifications, ensuring deterministic replication for functions like NOW() and UUID().",
    level: "basic",
    codeExample: `SET GLOBAL binlog_format = 'ROW';`
  },
  {
    question: "How do you stop replication cleanly on a replica before performing maintenance?",
    shortAnswer: "Execute `STOP REPLICA;`.",
    explanation: "Pauses both the I/O receiver thread and SQL applier thread gracefully.",
    hint: "STOP REPLICA.",
    level: "basic",
    codeExample: `STOP REPLICA;`
  },
  {
    question: "How do you reset all replication connection settings permanently on a replica?",
    shortAnswer: "Execute `STOP REPLICA;` followed by `RESET REPLICA ALL;`.",
    explanation: "`RESET REPLICA ALL` purges all relay logs and clears the connection credentials from `mysql.slave_master_info`.",
    hint: "RESET REPLICA ALL.",
    level: "basic",
    codeExample: `STOP REPLICA;
RESET REPLICA ALL;`
  },
  {
    question: "What is `binlog_do_db` vs `replicate_do_db`?",
    shortAnswer: "`binlog_do_db` filters which database changes are written to the Binary Log on the **Source**; `replicate_do_db` filters which database events are executed by the SQL thread on the **Replica**.",
    explanation: "Filtering on the Source prevents logging; filtering on the replica logs everything but selectively executes.",
    hint: "binlog_do_db is on Source; replicate_do_db is on Replica.",
    level: "intermediate",
    codeExample: `-- Source: binlog_do_db = sales
-- Replica: replicate_do_db = sales`
  },
  {
    question: "What is the danger of setting `binlog_do_db` on the Source with cross-database queries?",
    shortAnswer: "In Statement-based logging, `binlog_do_db` filters based on the *currently selected database* (`USE db`), causing updates to other tables in cross-database queries (`UPDATE other_db.table SET ...`) to be accidentally ignored and omitted from replication.",
    explanation: "Always use `binlog_format = ROW` if database filtering is configured.",
    hint: "Filters on default USE database, which can drop cross-database query updates.",
    level: "expert",
    codeExample: `-- USE db1; UPDATE db2.users SET active=1; -> Skipped if binlog_do_db=db2 under STATEMENT format!`
  },
  {
    question: "How do you verify on the Source which replicas are currently connected?",
    shortAnswer: "Run `SHOW REPLICAS;` (or legacy `SHOW SLAVE HOSTS;`) or query `performance_schema.replication_connection_status`.",
    explanation: "Displays connected replica server IDs, hostnames, ports, and UUIDs.",
    hint: "Run SHOW REPLICAS on the Source.",
    level: "basic",
    codeExample: `SHOW REPLICAS;`
  },
  {
    question: "What does `Auto_Position: 1` indicate in `SHOW REPLICA STATUS`?",
    shortAnswer: "Confirms that the replica is using GTID-based auto-positioning protocol to negotiate binary log streams rather than file and byte offsets.",
    explanation: "Verifies modern GTID replication configuration.",
    hint: "Confirms GTID auto-positioning is active.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G -- Auto_Position: 1`
  },
  {
    question: "How do you configure a replica to ignore errors on a specific table during emergency recovery?",
    shortAnswer: "Configure `replicate_wild_ignore_table = 'db_name.table_name'` in `my.cnf` and restart MySQL (or restart replication).",
    explanation: "Prevents replication from halting on non-critical broken tables.",
    hint: "replicate_wild_ignore_table in my.cnf.",
    level: "intermediate",
    codeExample: `[mysqld]
replicate_wild_ignore_table = 'analytics.temp_logs%'`
  },
  {
    question: "What is `log_replica_updates = ON` and why should it be set on all replicas?",
    shortAnswer: "It instructs the replica to write transactions executed by its SQL applier thread into its own Binary Log, enabling cascading replication and allowing the replica to be promoted to primary during failover.",
    explanation: "Essential for multi-tier replication and high-availability topologies.",
    hint: "Writes applied transactions to replica's own binlog for cascading replication and promotion.",
    level: "intermediate",
    codeExample: `[mysqld]
log_replica_updates = ON`
  },
  {
    question: "What is the role of `SHOW MASTER STATUS` / `SHOW BINARY LOG STATUS` on the Source?",
    shortAnswer: "It displays the current binary log filename, current byte offset, and the complete set of executed GTIDs (`Executed_Gtid_Set`) on the Source.",
    explanation: "Used to inspect the Source's current transaction position.",
    hint: "Displays current binlog filename, position, and Executed_Gtid_Set on Source.",
    level: "basic",
    codeExample: `SHOW BINARY LOG STATUS;`
  },
  {
    question: "What is `rpl_stop_slave_timeout` in MySQL 8.0?",
    shortAnswer: "The maximum time in seconds that `STOP REPLICA` will wait for a long-running transaction to finish before forcefully interrupting it (default 31536000s; recommended 60s).",
    explanation: "Prevents `STOP REPLICA` from hanging indefinitely on massive batch transactions.",
    hint: "Timeout before STOP REPLICA forcefully interrupts long-running transactions.",
    level: "expert",
    codeExample: `SET GLOBAL rpl_stop_slave_timeout = 60;`
  },
  {
    question: "How do you test network latency between Source and Replica before initiating replication?",
    shortAnswer: "Use `ping` or `traceroute` from the command line, or run `mysql -h source_ip -u repl_user -p -e 'SELECT 1;'` from the replica node.",
    explanation: "Validates TCP connectivity, DNS resolution, and MySQL authentication before configuring replication.",
    hint: "Test connection using mysql client with repl_user from the replica node.",
    level: "basic",
    codeExample: `mysql -h 192.168.1.10 -u repl_user -p -e "SELECT @@server_id, @@server_uuid;"`
  },
  {
    question: "What happens if you run `START REPLICA;` without configuring `CHANGE REPLICATION SOURCE TO` first?",
    shortAnswer: "MySQL returns `ERROR 1200 (HY000): The server is not configured as replica; fix in config file or with CHANGE REPLICATION SOURCE TO`.",
    explanation: "Replication parameters must be set before threads can start.",
    hint: "Returns error 1200; connection metadata must be configured first.",
    level: "basic",
    codeExample: `-- ERROR 1200: Server is not configured as replica.`
  },
  {
    question: "What is the recommended health check frequency for `SHOW REPLICA STATUS` in automated monitoring?",
    shortAnswer: "Every **5 to 15 seconds** via Prometheus `mysqld_exporter` or Percona PMM.",
    explanation: "Provides immediate detection of replication errors or rising lag.",
    hint: "Every 5 to 15 seconds.",
    level: "basic",
    codeExample: `# Scrape interval: 10s`
  },
  {
    question: "What is the primary operational takeaway of Topic 4 in Module 004_006?",
    shortAnswer: "Setting up robust MySQL Source-Replica replication requires a disciplined 6-step runbook: configure unique `server_id` and GTID parameters on all nodes, create a dedicated `REPLICATION SLAVE` user with `REQUIRE SSL`, seed initial data via the ultra-fast MySQL Clone Plugin or consistent `mysqldump`, enforce `super_read_only = ON` and `relay_log_recovery = ON` on the replica, connect using `SOURCE_AUTO_POSITION = 1`, and verify that `Replica_IO_Running` and `Replica_SQL_Running` are both **Yes** with zero lag.",
    explanation: "Following this standardized deployment runbook eliminates common replication setup mistakes and establishes a production-grade high availability foundation.",
    hint: "Summarize the 6 setup steps, Clone Plugin seeding, super_read_only, SOURCE_AUTO_POSITION = 1, and status verification.",
    level: "basic",
    codeExample: `-- Master 6-Step Setup Summary:
# 1. Source my.cnf: server_id=1, gtid_mode=ON, enforce_gtid_consistency=ON, log_bin=mysql-bin
# 2. Source User: CREATE USER 'repl_user'@'%' IDENTIFIED BY 'Pass' REQUIRE SSL; GRANT REPLICATION SLAVE ON *.* TO 'repl_user'@'%';
# 3. Clone Replica: CLONE INSTANCE FROM 'clone_user'@'source_ip':3306;
# 4. Replica my.cnf: server_id=2, super_read_only=ON, relay_log_recovery=ON
# 5. Connect: CHANGE REPLICATION SOURCE TO SOURCE_HOST='source_ip', SOURCE_AUTO_POSITION=1, SOURCE_SSL=1;
# 6. Start & Verify: START REPLICA; SHOW REPLICA STATUS\\G`
  }
];

export default questions;
