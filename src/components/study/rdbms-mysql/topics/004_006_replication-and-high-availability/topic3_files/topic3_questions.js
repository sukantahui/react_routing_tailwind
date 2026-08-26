// topic3_files/topic3_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 3: Global Transaction Identifier (GTID) Based Replication: Architecture and Advantages over Binary Log Coordinates

const questions = [
  {
    question: "What is a Global Transaction Identifier (GTID) in MySQL, and what is its internal format?",
    shortAnswer: "A GTID is a unique identifier assigned to every committed transaction across a replication topology, formatted as `<server_uuid>:<transaction_id>` (e.g. `3E11FA47-71CA-11E1-9E33-C80AA9429562:1042`).",
    explanation: "`server_uuid` identifies the originating server, and `transaction_id` is a monotonically increasing integer sequence.",
    hint: "server_uuid:transaction_id.",
    level: "basic",
    codeExample: `SELECT @@GLOBAL.gtid_executed;
-- Output: 3E11FA47-71CA-11E1-9E33-C80AA9429562:1-1042`
  },
  {
    question: "What is the primary operational advantage of GTID-based replication (`SOURCE_AUTO_POSITION = 1`) over legacy positional replication (`SOURCE_LOG_FILE` / `SOURCE_LOG_POS`)?",
    shortAnswer: "It eliminates the need for DBAs to calculate and track exact binary log filenames and byte offsets during failover; the replica simply sends its executed GTID set to the new Source, which automatically streams all missing transactions.",
    explanation: "Makes failover, topology restructuring, and replica re-pointing 100% automated and error-free.",
    hint: "Automatic negotiation of missing transactions without manual binlog file and offset calculations.",
    level: "basic",
    codeExample: `CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.10',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplPass#2026',
  SOURCE_AUTO_POSITION = 1;`
  },
  {
    question: "How does the Source determine which transactions to stream to a replica under `SOURCE_AUTO_POSITION = 1`?",
    shortAnswer: "The replica sends its executed GTID set ($S_{\\text{replica}}$) during handshake; the Source calculates the mathematical set difference: $\\text{Missing} = S_{\\text{source}} \\setminus S_{\\text{replica}}$, and streams all missing GTID events.",
    explanation: "Guarantees that every missing transaction is streamed without sending duplicates.",
    hint: "Calculates the set difference between Source.gtid_executed and Replica.gtid_executed.",
    level: "intermediate",
    codeExample: `# If Source has 1-100 and Replica has 1-80:
# Source streams exactly transactions 81-100.`
  },
  {
    question: "How does GTID replication guarantee idempotency and prevent duplicate transaction execution?",
    shortAnswer: "Before executing any incoming transaction, the replica's SQL applier thread checks if the transaction's GTID is already present in its local `gtid_executed` set; if it exists, the replica automatically skips it without executing duplicate writes.",
    explanation: "Eliminates duplicate key errors and data divergence when replaying or re-pointing replication.",
    hint: "Transactions with GTIDs already present in local gtid_executed are automatically skipped.",
    level: "basic",
    codeExample: `-- Idempotent auto-skip: Already executed GTIDs are ignored safely.`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a primary node crashed. How did GTID replication allow Susmita to re-point 3 edge read replicas to the newly promoted primary in 5 seconds?",
    shortAnswer: "Because `SOURCE_AUTO_POSITION = 1` was configured, she simply issued `CHANGE REPLICATION SOURCE TO SOURCE_HOST = 'new-primary-ip'; START REPLICA;` on each replica without looking up any binary log positions across ₹1.2 Crores in store inventory.",
    explanation: "Replicas automatically negotiated their missing GTIDs with the new primary in milliseconds.",
    hint: "Executed CHANGE REPLICATION SOURCE with auto-positioning without calculating log offsets.",
    level: "moderate",
    codeExample: `# Barrackpore Instant Re-pointing:
STOP REPLICA;
CHANGE REPLICATION SOURCE TO SOURCE_HOST = '192.168.1.11';
START REPLICA;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu skip a corrupted schema transaction blocking replication on a ₹500 Crore ledger replica using GTID empty commits?",
    shortAnswer: "He injected an empty transaction with the failing GTID: `SET GTID_NEXT = 'uuid:105'; BEGIN; COMMIT; SET GTID_NEXT = 'AUTOMATIC';`, causing the replica to record the GTID as executed and resume replication immediately.",
    explanation: "Empty GTID commits allow safe transaction skipping without breaking the GTID execution set.",
    hint: "Injected an empty commit with the target GTID using SET GTID_NEXT.",
    level: "expert",
    codeExample: `STOP REPLICA;
SET GTID_NEXT = '3E11FA47-71CA-11E1-9E33-C80AA9429562:105';
BEGIN; COMMIT;
SET GTID_NEXT = 'AUTOMATIC';
START REPLICA;`
  },
  {
    question: "Why does `SET GLOBAL sql_slave_skip_counter = 1` FAIL on a GTID-enabled MySQL server?",
    shortAnswer: "Because `sql_slave_skip_counter` is explicitly disabled in GTID mode to prevent creating undetected transactional gaps in the GTID sequence; MySQL requires using the explicit empty transaction method instead.",
    explanation: "Ensures that every skipped transaction is deliberately recorded in `gtid_executed`.",
    hint: "sql_slave_skip_counter is incompatible with GTID mode to prevent undetected sequence gaps.",
    level: "intermediate",
    codeExample: `-- ERROR 1858 (HY000): sql_slave_skip_counter is not supported when @@GLOBAL.GTID_MODE = ON.`
  },
  {
    question: "What is `enforce_gtid_consistency = ON` and why is it mandatory for GTID replication in MySQL 8.0?",
    shortAnswer: "It instructs the MySQL server to reject SQL statements that cannot be safely logged in a transactionally consistent way with GTIDs (such as `CREATE TABLE ... SELECT` statements or mixing non-transactional MyISAM tables in transactions).",
    explanation: "Prevents split transactions and guarantees that every statement maps to exactly one deterministic GTID.",
    hint: "Rejects unsafe non-transactional statements to ensure 100% deterministic GTID generation.",
    level: "intermediate",
    codeExample: `SET GLOBAL enforce_gtid_consistency = ON;`
  },
  {
    question: "What does `gtid_executed` represent in `SHOW GLOBAL STATUS` / `SHOW REPLICA STATUS`?",
    shortAnswer: "The complete set of all GTIDs that have been committed locally on this server or received and executed by the replication SQL thread from all sources.",
    explanation: "Represents the total historical transaction set applied to the database instance.",
    hint: "The comprehensive set of all GTIDs committed or applied on the node.",
    level: "basic",
    codeExample: `SELECT @@GLOBAL.gtid_executed;`
  },
  {
    question: "What does `gtid_purged` represent in MySQL?",
    shortAnswer: "The set of GTIDs whose corresponding transaction events have been deleted (purged) from physical binary log files on disk.",
    explanation: "If a connecting replica requests a GTID that is contained within `gtid_purged`, the Source cannot stream it from disk, triggering fatal error 1236.",
    hint: "Set of GTIDs that have been deleted from on-disk binary logs.",
    level: "intermediate",
    codeExample: `SELECT @@GLOBAL.gtid_purged;`
  },
  {
    question: "What is the `mysql.gtid_executed` table in MySQL 8.0?",
    shortAnswer: "A persistent InnoDB system table that stores all executed GTIDs in a crash-safe manner, updated atomically alongside transaction commits even when binary logging is disabled.",
    explanation: "Ensures the server knows its exact executed GTIDs upon reboot without having to scan all binary log files.",
    hint: "Crash-safe InnoDB system table storing the node's executed GTIDs.",
    level: "intermediate",
    codeExample: `SELECT * FROM mysql.gtid_executed LIMIT 5;`
  },
  {
    question: "What common virtual machine / cloud cloning disaster occurs if `/var/lib/mysql/auto.cnf` is copied without regeneration?",
    shortAnswer: "Cloned instances end up with identical `server_uuid` values, causing MySQL to reject replication connections with `A slave with the same server_uuid as this master has connected` or silently dropping transactions due to duplicate GTID collision.",
    explanation: "Always delete `auto.cnf` on cloned template images so MySQL generates a unique UUID on first boot.",
    hint: "Duplicate server_uuid causes replication handshake rejections or silent transaction drops.",
    level: "expert",
    codeExample: `# Solution on cloned VM:
# rm /var/lib/mysql/auto.cnf
# sudo systemctl restart mysqld`
  },
  {
    question: "What is a GTID Set format when multiple Sources have committed transactions on a server?",
    shortAnswer: "A comma-separated list of UUID intervals (e.g. `3E11FA47-71CA-11E1-9E33-C80AA9429562:1-50,6B22FA47-81CB-22E2-8F44-D90BA9429563:1-120`).",
    explanation: "Allows a single replica or multi-source receiver to track transactions originating from multiple distinct primaries.",
    hint: "Comma-separated list of UUIDs with integer ranges (uuid1:1-50,uuid2:1-100).",
    level: "basic",
    codeExample: `-- Multi-source GTID Set:
-- 'a1b2c3d4-0001:1-100,e5f6g7h8-0002:1-250'`
  },
  {
    question: "What does `Retrieved_Gtid_Set` vs `Executed_Gtid_Set` in `SHOW REPLICA STATUS` indicate?",
    shortAnswer: "`Retrieved_Gtid_Set` lists all GTIDs downloaded by the I/O receiver thread into local relay logs; `Executed_Gtid_Set` lists all GTIDs applied to the local database by the SQL thread.",
    explanation: "The difference between them represents transactions buffered in relay logs awaiting execution.",
    hint: "Retrieved is downloaded by I/O thread; Executed is applied by SQL thread.",
    level: "intermediate",
    codeExample: `SHOW REPLICA STATUS\\G
-- Retrieved_Gtid_Set: 3E11FA47-...:1-150
-- Executed_Gtid_Set:  3E11FA47-...:1-120 (30 transactions pending in relay log!)`
  },
  {
    question: "What are the 4 possible values for `gtid_mode` during an online zero-downtime migration to GTID?",
    shortAnswer: "1. `OFF`, 2. `OFF_PERMISSIVE` (generates anonymous, accepts both), 3. `ON_PERMISSIVE` (generates GTIDs, accepts both), and 4. `ON` (enforces GTIDs strictly).",
    explanation: "Allows transitioning existing legacy replication topologies to GTID mode without taking the database offline.",
    hint: "OFF -> OFF_PERMISSIVE -> ON_PERMISSIVE -> ON.",
    level: "expert",
    codeExample: `SET GLOBAL gtid_mode = OFF_PERMISSIVE;
SET GLOBAL gtid_mode = ON_PERMISSIVE;
SET GLOBAL gtid_mode = ON;`
  },
  {
    question: "What happens if a replica configured with `SOURCE_AUTO_POSITION = 1` requests a GTID that has been purged on the Source?",
    shortAnswer: "The Source cannot supply the binary log event and the replica's I/O thread halts with `Got fatal error 1236 from master when reading data from binary log: 'The slave is connecting using AUTO_POSITION and the first event's GTID ... is not in the master's binlogs'`. ",
    explanation: "Requires restoring a newer backup snapshot onto the replica or provisioning with MySQL Shell Clone.",
    hint: "Fatal Error 1236: Requested GTID has already been purged from the Source's binlogs.",
    level: "intermediate",
    codeExample: `-- Fatal Error 1236: Source binary log purged before replica requested it.`
  },
  {
    question: "How do you check if a specific GTID subset has been executed on a server using built-in functions?",
    shortAnswer: "Use `GTID_SUBSET(set1, set2)`: `SELECT GTID_SUBSET('uuid:1-10', @@GLOBAL.gtid_executed);` (returns `1` if all GTIDs in set1 are contained in set2, otherwise `0`).",
    explanation: "Provides programmatic verification of transaction consistency.",
    hint: "Use the GTID_SUBSET(subset, superset) built-in SQL function.",
    level: "intermediate",
    codeExample: `SELECT GTID_SUBSET('3E11FA47-71CA-11E1-9E33-C80AA9429562:1-50', @@GLOBAL.gtid_executed);`
  },
  {
    question: "What function calculates the missing GTIDs between two GTID sets?",
    shortAnswer: "`GTID_SUBTRACT(set1, set2)` (returns the set of GTIDs that are in set1 but not in set2).",
    explanation: "Used in orchestration scripts to determine exact replication lag sets.",
    hint: "Use the GTID_SUBTRACT(set1, set2) function.",
    level: "intermediate",
    codeExample: `SELECT GTID_SUBTRACT(
  '3E11FA47-71CA-11E1-9E33-C80AA9429562:1-100',
  '3E11FA47-71CA-11E1-9E33-C80AA9429562:1-80'
); -- Returns: '3E11FA47-71CA-11E1-9E33-C80AA9429562:81-100'`
  },
  {
    question: "Why should `server_id` still be configured on every node even when GTID replication is enabled?",
    shortAnswer: "Because `server_id` is still used by the replication transport protocol to identify server instances, prevent infinite replication loops in circular/ring topologies, and negotiate filter rules.",
    explanation: "`server_id` and `server_uuid` are both required in MySQL 8.0.",
    hint: "server_id is required to prevent circular replication loops and identify network nodes.",
    level: "basic",
    codeExample: `SHOW VARIABLES LIKE 'server_id';`
  },
  {
    question: "How do you initialize `gtid_purged` on a newly restored replica from a physical backup?",
    shortAnswer: "Set `gtid_purged` using `SET GLOBAL gtid_purged = 'uuid:1-N';` before starting replication.",
    explanation: "Tells the replica that transactions 1 through N were already included in the physical data snapshot and do not need to be re-executed.",
    hint: "Set gtid_purged with the backup snapshot's GTID set before starting replication.",
    level: "expert",
    codeExample: `SET GLOBAL gtid_purged = '3E11FA47-71CA-11E1-9E33-C80AA9429562:1-500000';`
  },
  {
    question: "What is `WAIT_FOR_EXECUTED_GTID_SET(gtid_set, timeout)` and how is it used in web applications?",
    shortAnswer: "A SQL function that blocks the client connection until the local replica has applied the specified GTID set (or timeout expires), enabling 'Read-Your-Own-Writes' consistency by having the client wait for its write to replicate before querying.",
    explanation: "Guarantees that a user reading from a replica sees their freshly written transaction.",
    hint: "Blocks client until replica has executed the specified GTID set, guaranteeing fresh reads.",
    level: "expert",
    codeExample: `SELECT WAIT_FOR_EXECUTED_GTID_SET('3E11FA47-71CA-11E1-9E33-C80AA9429562:1042', 5);`
  },
  {
    question: "Can a transaction committed on the primary with GTID contain multiple SQL statements inside a `BEGIN ... COMMIT` block?",
    shortAnswer: "Yes, an entire multi-statement transaction (e.g. 5 `INSERT`s and 2 `UPDATE`s inside a `BEGIN ... COMMIT`) is assigned **exactly one GTID** upon commit.",
    explanation: "GTIDs represent atomic business transactions, not individual SQL statements.",
    hint: "An entire multi-statement transaction receives exactly one atomic GTID.",
    level: "basic",
    codeExample: `BEGIN;
INSERT INTO orders VALUES (1, 100);
INSERT INTO order_items VALUES (1, 5, 20);
COMMIT; -- Entire block receives exactly 1 GTID (e.g. uuid:45)`
  },
  {
    question: "What happens if a DDL statement (e.g. `CREATE TABLE`) is executed under GTID mode?",
    shortAnswer: "Because DDL statements in MySQL trigger an implicit commit, each individual DDL statement receives its own unique GTID.",
    explanation: "Implicit commits generate standalone atomic GTIDs.",
    hint: "DDL triggers implicit commits, each receiving its own GTID.",
    level: "basic",
    codeExample: `CREATE TABLE test (id INT); -- Receives 1 GTID automatically`
  },
  {
    question: "How does GTID replication simplify Multi-Source replication into a central data warehouse?",
    shortAnswer: "A central replica can replicate from 5 different regional Source servers simultaneously; each Source has its own UUID, so transactions from all 5 sources merge cleanly into the warehouse's `gtid_executed` set without coordinate collisions.",
    explanation: "UUID namespacing prevents collision across multiple distinct primary databases.",
    hint: "UUID namespacing prevents coordinate collisions across multiple source databases.",
    level: "intermediate",
    codeExample: `# Central Warehouse has gtid_executed:
# 'mumbai_uuid:1-1000,kolkata_uuid:1-800,delhi_uuid:1-1200'`
  },
  {
    question: "What is `binlog_gtid_simple_recovery = ON` in MySQL 8.0?",
    shortAnswer: "An optimization that speeds up MySQL server startup by inspecting only the oldest and newest binary log files to initialize `gtid_executed` and `gtid_purged`, rather than scanning thousands of historical binlog files on disk.",
    explanation: "Reduces crash recovery boot time from minutes to seconds.",
    hint: "Scans only oldest and newest binlogs on startup for fast crash recovery.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'binlog_gtid_simple_recovery'; -- Default: ON`
  },
  {
    question: "What is the danger of setting `SET GTID_NEXT` to a manual UUID without resetting it to `AUTOMATIC`?",
    shortAnswer: "The current session will fail on the next transaction with `ERROR 1783: When @@SESSION.GTID_NEXT is set to a GTID, you must execute exactly one transaction and then reset GTID_NEXT to AUTOMATIC`.",
    explanation: "Always reset `SET GTID_NEXT = 'AUTOMATIC';` immediately after injecting an empty transaction.",
    hint: "Session will fail on next query unless reset to AUTOMATIC.",
    level: "intermediate",
    codeExample: `SET GTID_NEXT = 'AUTOMATIC';`
  },
  {
    question: "How do you verify whether GTID mode is fully active across all nodes in a cluster?",
    shortAnswer: "Run `SELECT @@GLOBAL.gtid_mode;` (must return `ON`) and `SELECT @@GLOBAL.enforce_gtid_consistency;` (must return `ON` or `1`).",
    explanation: "Both variables must be `ON` across all members for complete GTID compliance.",
    hint: "Check that gtid_mode is ON and enforce_gtid_consistency is ON.",
    level: "basic",
    codeExample: `SELECT @@GLOBAL.gtid_mode, @@GLOBAL.enforce_gtid_consistency;`
  },
  {
    question: "Why does GTID replication make Point-in-Time Recovery (PITR) safer?",
    shortAnswer: "Because `mysqlbinlog --include-gtids` or `--exclude-gtids` allows extracting or skipping exact transaction sets without relying on error-prone file and byte offset calculations.",
    explanation: "Eliminates byte-level offset mistakes during high-stress disaster recovery replays.",
    hint: "Allows exact GTID set filtering during mysqlbinlog extraction.",
    level: "intermediate",
    codeExample: `mysqlbinlog --include-gtids='3E11FA47-...:1-500' binlog.000001 | mysql -u root -p`
  },
  {
    question: "What is the recommended `my.cnf` configuration to enforce GTID replication permanently?",
    shortAnswer: "Add `gtid_mode = ON` and `enforce_gtid_consistency = ON` under `[mysqld]`.",
    explanation: "Ensures every server boot starts with full GTID enforcement.",
    hint: "gtid_mode = ON and enforce_gtid_consistency = ON in my.cnf.",
    level: "basic",
    codeExample: `[mysqld]
gtid_mode = ON
enforce_gtid_consistency = ON
log_bin = mysql-bin
log_replica_updates = ON`
  },
  {
    question: "What is the primary operational takeaway of Topic 3 in Module 004_006?",
    shortAnswer: "GTID-based replication is the foundational standard for modern MySQL high availability: it replaces error-prone file and byte coordinates with unique `<server_uuid>:<transaction_id>` identifiers, enables instant automated failover and replica re-pointing via `SOURCE_AUTO_POSITION = 1`, guarantees transaction idempotency, and eliminates duplicate transaction execution across multi-tier topologies.",
    explanation: "Mastering GTID architecture is mandatory for operating MySQL InnoDB Cluster, Group Replication, and enterprise automated failover frameworks.",
    hint: "Summarize GTID format, auto-positioning set difference math, failover simplification, and empty commit transaction skipping.",
    level: "basic",
    codeExample: `-- Master GTID Replication Setup:
# 1. Enforce GTID on all nodes:
SET GLOBAL enforce_gtid_consistency = ON;
SET GLOBAL gtid_mode = ON;

# 2. Connect Replica with Auto-Positioning:
CHANGE REPLICATION SOURCE TO 
  SOURCE_HOST = '192.168.1.10',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'ReplPass#2026',
  SOURCE_AUTO_POSITION = 1;
START REPLICA;`
  }
];

export default questions;
