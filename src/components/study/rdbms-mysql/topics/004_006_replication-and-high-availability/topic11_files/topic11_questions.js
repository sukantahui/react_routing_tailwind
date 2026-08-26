// topic11_files/topic11_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 11: MySQL Group Replication: Paxos-Based Synchronous Consensus and Multi-Primary Modes

const questions = [
  {
    question: "What is MySQL Group Replication (MGR) and what consensus protocol powers it?",
    shortAnswer: "MySQL Group Replication is a high-availability, fault-tolerant replication plugin that provides synchronous multi-node state machine replication powered by a **Paxos-based distributed consensus protocol** (via the Group Communication System / GCS layer).",
    explanation: "Guarantees that a majority quorum of nodes must agree on transaction ordering before any transaction is committed.",
    hint: "Paxos-based distributed consensus replication plugin providing zero data loss (RPO = 0).",
    level: "basic",
    codeExample: `INSTALL PLUGIN group_replication SONAME 'group_replication.so';`
  },
  {
    question: "What is the fault tolerance formula for a MySQL Group Replication cluster, and what is the minimum recommended cluster size?",
    shortAnswer: "The formula is **$N = 2F + 1$**, where $N$ is total nodes and $F$ is the maximum number of tolerable node failures; the minimum recommended cluster size is **3 nodes** (tolerating $F = 1$ failure with a quorum majority of 2).",
    explanation: "A 2-node cluster cannot survive a network partition because neither partition can form a strict majority quorum (>50%).",
    hint: "N = 2F + 1; minimum 3 nodes to tolerate 1 failure.",
    level: "basic",
    codeExample: `# Cluster Node Sizing:
# 3 Nodes -> Tolerate 1 Failure (Quorum = 2)
# 5 Nodes -> Tolerate 2 Failures (Quorum = 3)
# 7 Nodes -> Tolerate 3 Failures (Quorum = 4)`
  },
  {
    question: "How does the Transaction Certification Phase work in MySQL Group Replication?",
    shortAnswer: "When a transaction commits, its Write Set (XXHASH64 row hashes) is broadcast to all nodes via Paxos; every node compares the incoming write set against its local in-flight certification database; if no concurrent transactions have modified the same rows, it passes certification and commits; otherwise, the later conflicting transaction **aborts and rolls back** (First-Committer-Wins).",
    explanation: "Deterministic total order broadcast guarantees that all nodes certify transactions in the exact same sequence.",
    hint: "Compares row write hashes across nodes; non-conflicting transactions commit, conflicting ones rollback.",
    level: "expert",
    codeExample: `-- First-Committer-Wins conflict resolution algorithm.`
  },
  {
    question: "What is the difference between Single-Primary Mode and Multi-Primary Mode in Group Replication?",
    shortAnswer: "In **Single-Primary Mode** (default), exactly one node is designated as the read-write Primary while other nodes are `super_read_only` secondaries (electing a new primary automatically if the primary crashes); in **Multi-Primary Mode**, all nodes in the cluster simultaneously accept write transactions from applications.",
    explanation: "Single-Primary is the recommended production standard because it eliminates concurrent write-conflict certification rollbacks.",
    hint: "Single-Primary has 1 writable node with auto-failover; Multi-Primary allows writes on all nodes.",
    level: "basic",
    codeExample: `[mysqld]
# Single-Primary Mode (Recommended):
group_replication_single_primary_mode = ON

# Multi-Primary Mode:
group_replication_single_primary_mode = OFF
group_replication_enforce_update_everywhere_checks = ON`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS billing operated 24/7 across ₹1.2 Crores in inventory. When Node 1 experienced a hardware power outage, how did Group Replication handle failover with zero human intervention?",
    shortAnswer: "The remaining two nodes detected the missing heartbeat within 5 seconds, formed a quorum (2/3 majority), automatically elected Node 2 as the new read-write Primary, and disabled `super_read_only` on Node 2, achieving zero data loss (RPO = 0) and under 5-second recovery (RTO < 5s).",
    explanation: "Demonstrated automated Paxos quorum consensus and instant primary election.",
    hint: "Formed 2/3 majority quorum, auto-elected Node 2 as primary in <5 seconds with RPO = 0.",
    level: "moderate",
    codeExample: `# Barrackpore Cluster Health Verification:
SELECT MEMBER_HOST, MEMBER_STATE, MEMBER_ROLE 
FROM performance_schema.replication_group_members;
-- Output: Node 1 (UNREACHABLE) | Node 2 (ONLINE / PRIMARY) | Node 3 (ONLINE / SECONDARY)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, why did Debangshu mandate Single-Primary mode instead of Multi-Primary mode for ₹500 Crores in daily banking transactions?",
    shortAnswer: "Because Multi-Primary mode causes certification conflicts when two branches update the same account balance simultaneously, resulting in `ERROR 3098 (HY000): The table does not comply with the requirements by an external plugin` or transaction rollbacks; Single-Primary serializes writes through standard InnoDB row locks without certification aborts.",
    explanation: "Financial core ledgers require deterministic serialization rather than optimistic concurrency rollbacks.",
    hint: "Single-Primary prevents write-conflict rollbacks and guarantees deterministic transaction serialization.",
    level: "expert",
    codeExample: `SET GLOBAL group_replication_single_primary_mode = ON;`
  },
  {
    question: "What dedicated network port does MySQL Group Replication use for Paxos consensus communication?",
    shortAnswer: "Port **`33061`** (configured via `group_replication_local_address = '192.168.1.10:33061'`).",
    explanation: "This internal GCS port must be open between all cluster nodes on a secure, low-latency private network.",
    hint: "Port 33061 (group_replication_local_address).",
    level: "basic",
    codeExample: `group_replication_local_address = "192.168.1.10:33061"
group_replication_group_seeds = "192.168.1.10:33061,192.168.1.20:33061,192.168.1.30:33061"`
  },
  {
    question: "What are the 7 mandatory prerequisites in `my.cnf` before enabling MySQL Group Replication?",
    shortAnswer: "1. `gtid_mode = ON`, 2. `enforce_gtid_consistency = ON`, 3. `binlog_format = ROW`, 4. `log_replica_updates = ON`, 5. `master_info_repository = TABLE`, 6. `relay_log_info_repository = TABLE`, and 7. `transaction_write_set_extraction = XXHASH64`.",
    explanation: "These parameters provide the cryptographic row hashing, GTID consistency, and crash-safe metadata tables required by MGR.",
    hint: "GTID ON, ROW binlog, log_replica_updates, TABLE repositories, and XXHASH64 write sets.",
    level: "intermediate",
    codeExample: `[mysqld]
gtid_mode = ON
enforce_gtid_consistency = ON
binlog_format = ROW
log_replica_updates = ON
master_info_repository = TABLE
relay_log_info_repository = TABLE
transaction_write_set_extraction = XXHASH64`
  },
  {
    question: "What is `group_replication_group_name` in MySQL configuration?",
    shortAnswer: "A globally unique **UUID** (e.g. `aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee`) that identifies the cluster; all nodes must share the exact same group name to join and communicate in the cluster.",
    explanation: "Generated via `uuidgen` or `SELECT UUID();`.",
    hint: "A cluster-wide UUID identifying the Group Replication cluster.",
    level: "basic",
    codeExample: `group_replication_group_name = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"`
  },
  {
    question: "How do you bootstrap the very first node of a new MySQL Group Replication cluster?",
    shortAnswer: "On Node 1: Execute `SET GLOBAL group_replication_bootstrap_group = ON;`, run `START GROUP_REPLICATION;`, and immediately set `SET GLOBAL group_replication_bootstrap_group = OFF;`.",
    explanation: "Bootstrapping instructs the node to create the cluster rather than searching for existing group seeds.",
    hint: "Set group_replication_bootstrap_group = ON, START GROUP_REPLICATION, then set bootstrap_group = OFF.",
    level: "intermediate",
    codeExample: `SET GLOBAL group_replication_bootstrap_group = ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group = OFF;`
  },
  {
    question: "How do subsequent nodes (Node 2 and Node 3) join an existing Group Replication cluster?",
    shortAnswer: "Simply execute `START GROUP_REPLICATION;` (without bootstrapping); the node connects to `group_replication_group_seeds`, executes distributed recovery via the Clone Plugin or binlogs, and transitions to `ONLINE`.",
    explanation: "Automatic peer discovery and state transfer initialization.",
    hint: "Execute START GROUP_REPLICATION without bootstrapping.",
    level: "basic",
    codeExample: `START GROUP_REPLICATION;`
  },
  {
    question: "How do you monitor member status in a Group Replication cluster?",
    shortAnswer: "Query `performance_schema.replication_group_members`.",
    explanation: "Displays member ID, host, port, current state (`ONLINE`, `RECOVERING`, `OFFLINE`, `UNREACHABLE`), and role (`PRIMARY`, `SECONDARY`).",
    hint: "Query performance_schema.replication_group_members.",
    level: "basic",
    codeExample: `SELECT MEMBER_ID, MEMBER_HOST, MEMBER_PORT, MEMBER_STATE, MEMBER_ROLE 
FROM performance_schema.replication_group_members;`
  },
  {
    question: "What are the 5 possible member states in `performance_schema.replication_group_members`?",
    shortAnswer: "1. **`ONLINE`** (Healthy & participating in consensus), 2. **`RECOVERING`** (Catching up on missing transactions via distributed recovery), 3. **`OFFLINE`** (Plugin loaded but not connected), 4. **`UNREACHABLE`** (Failed heartbeat pings / suspected crash), and 5. **`ERROR`** (Encountered a fatal recovery or certification error).",
    explanation: "Reflects real-time state machine membership.",
    hint: "ONLINE, RECOVERING, OFFLINE, UNREACHABLE, and ERROR.",
    level: "intermediate",
    codeExample: `-- Target state for all healthy cluster nodes is ONLINE.`
  },
  {
    question: "How does Group Replication choose which secondary node to promote when the Primary crashes in Single-Primary mode?",
    shortAnswer: "Based on 3 sequential criteria: 1. **`group_replication_member_weight`** (highest integer weight wins), 2. **MySQL Server Version** (oldest version preferred for backward compatibility), and 3. **`server_uuid` Lexicographical Order** (lowest UUID alphabetically).",
    explanation: "Allows DBAs to designate preferred failover candidates using member weights.",
    hint: "Highest member weight, followed by MySQL version, followed by server UUID order.",
    level: "expert",
    codeExample: `[mysqld]
# On Preferred Primary Candidate:
group_replication_member_weight = 90

# On Secondary Nodes:
group_replication_member_weight = 50`
  },
  {
    question: "What is `group_replication_flow_control_mode` and what problem does it solve?",
    shortAnswer: "A throttling mechanism that monitors transaction queues across all nodes; if a secondary falls behind and its queue grows, Flow Control throttles write throughput on the Primary to allow the lagging secondary to catch up, preventing unbounded cluster lag.",
    explanation: "Maintains cluster equilibrium under extreme write bursts.",
    hint: "Throttles primary writes when secondaries fall behind to prevent runaway lag.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'group_replication_flow_control_mode'; -- Value: QUOTA`
  },
  {
    question: "What is the requirement for Primary Keys in MySQL Group Replication?",
    shortAnswer: "**Every table MUST have an explicit Primary Key** (or non-null Unique Key); tables lacking primary keys cannot extract write sets (`XXHASH64`) and will be blocked from modification with `ERROR 3098`.",
    explanation: "Primary keys are mandatory for row hash conflict detection during certification.",
    hint: "Every table must have an explicit primary key for write set hashing.",
    level: "basic",
    codeExample: `-- Tables lacking primary keys are rejected by Group Replication.`
  },
  {
    question: "What storage engine is MANDATORY for tables in MySQL Group Replication?",
    shortAnswer: "**InnoDB**; non-transactional storage engines like MyISAM or MEMORY do not support atomic multi-version concurrency control and are blocked from writes.",
    explanation: "Group Replication relies entirely on InnoDB row-level locking and MVCC rollbacks.",
    hint: "InnoDB is mandatory; MyISAM is blocked.",
    level: "basic",
    codeExample: `CREATE TABLE orders (...) ENGINE = InnoDB;`
  },
  {
    question: "What is `group_replication_communication_debug_options` used for?",
    shortAnswer: "Enabling detailed GCS Paxos communication logging in the MySQL error log to diagnose network partition issues or consensus packet drops between nodes.",
    explanation: "Used by senior DBAs during cluster network troubleshooting.",
    hint: "Enables verbose GCS Paxos debugging in error log.",
    level: "expert",
    codeExample: `SET GLOBAL group_replication_communication_debug_options = 'GCS_DEBUG_ALL';`
  },
  {
    question: "What happens if a Group Replication cluster loses network connectivity between 2 nodes in a 3-node cluster (Split-Brain scenario)?",
    shortAnswer: "The single isolated node realizes it cannot reach a majority quorum (&lt;50%), transitions its state to `UNREACHABLE`, and blocks all client write transactions; the remaining 2 nodes form a 2/3 majority quorum and continue processing writes seamlessly with **zero split-brain divergence**.",
    explanation: "Paxos majority consensus mathematically eliminates split-brain data divergence.",
    hint: "Isolated minority node blocks writes; majority partition continues processing with zero split-brain.",
    level: "intermediate",
    codeExample: `-- Quorum majority prevents split-brain automatically.`
  },
  {
    question: "What is `group_replication_unreachable_majority_timeout`?",
    shortAnswer: "The number of seconds (default 0 / disabled, or e.g. 30s) an isolated minority partition will wait before expelling unreachable members or terminating pending client connections.",
    explanation: "Prevents client queries from hanging indefinitely on network-partitioned nodes.",
    hint: "Timeout before minority partition drops pending transactions during network isolation.",
    level: "expert",
    codeExample: `SET GLOBAL group_replication_unreachable_majority_timeout = 30;`
  },
  {
    question: "How do you manually promote a specific secondary node to Primary in Single-Primary mode?",
    shortAnswer: "Execute `SELECT group_replication_set_as_primary('server_uuid');` using the Group Replication UDF functions.",
    explanation: "Performs a clean, zero-downtime primary switchover for scheduled server maintenance.",
    hint: "Execute SELECT group_replication_set_as_primary('server_uuid').",
    level: "intermediate",
    codeExample: `SELECT group_replication_set_as_primary('3e11fa47-71ca-11eb-a510-0800271b87d4');`
  },
  {
    question: "How do you switch an entire cluster from Single-Primary mode to Multi-Primary mode dynamically?",
    shortAnswer: "Execute `SELECT group_replication_switch_to_multi_primary_mode();`.",
    explanation: "Reconfigures all nodes online without cluster restarts.",
    hint: "Execute SELECT group_replication_switch_to_multi_primary_mode().",
    level: "intermediate",
    codeExample: `SELECT group_replication_switch_to_multi_primary_mode();`
  },
  {
    question: "How do you switch a cluster from Multi-Primary mode to Single-Primary mode dynamically?",
    shortAnswer: "Execute `SELECT group_replication_switch_to_single_primary_mode('target_primary_uuid');`.",
    explanation: "Elects the specified node as primary and locks all other members in `super_read_only` mode.",
    hint: "Execute SELECT group_replication_switch_to_single_primary_mode('uuid').",
    level: "intermediate",
    codeExample: `SELECT group_replication_switch_to_single_primary_mode('3e11fa47-...-0800271b87d4');`
  },
  {
    question: "What is `performance_schema.replication_group_member_stats` used for?",
    shortAnswer: "It displays real-time transaction queue metrics for each member, including `COUNT_TRANSACTIONS_IN_QUEUE`, `COUNT_TRANSACTIONS_CHECKED`, `COUNT_CONFLICTS_DETECTED`, and `COUNT_TRANSACTIONS_ROWS_VALIDATING`.",
    explanation: "Essential for detecting replication certification bottlenecks and flow control triggers.",
    hint: "Displays queue depths, conflicts detected, and certification throughput per member.",
    level: "expert",
    codeExample: `SELECT MEMBER_ID, COUNT_TRANSACTIONS_IN_QUEUE, COUNT_CONFLICTS_DETECTED 
FROM performance_schema.replication_group_member_stats;`
  },
  {
    question: "What is `group_replication_autorejoin_tries` in MySQL 8.0?",
    shortAnswer: "The number of times an expelled node will automatically attempt to rejoin the group after experiencing transient network disconnects (default 3 tries with 5-minute intervals).",
    explanation: "Enables self-healing for nodes affected by temporary network blips.",
    hint: "Number of auto-rejoin attempts after a node is expelled by network hiccups (default 3).",
    level: "basic",
    codeExample: `SET GLOBAL group_replication_autorejoin_tries = 3;`
  },
  {
    question: "What is `group_replication_exit_state_action` in MySQL 8.0?",
    shortAnswer: "The action a node takes upon being expelled from the cluster: `READ_ONLY` (sets `super_read_only = ON` to block writes), `ABORT_SERVER` (shuts down the MySQL daemon immediately to prevent rogue reads), or `OFFLINE_MODE`.",
    explanation: "`ABORT_SERVER` or `READ_ONLY` guarantees that partitioned nodes cannot accept invalid write transactions.",
    hint: "Action taken upon expulsion: READ_ONLY, ABORT_SERVER, or OFFLINE_MODE.",
    level: "expert",
    codeExample: `SET GLOBAL group_replication_exit_state_action = 'READ_ONLY';`
  },
  {
    question: "What is the maximum number of nodes supported in a single MySQL Group Replication cluster?",
    shortAnswer: "Up to **9 nodes** per group.",
    explanation: "Because Paxos message complexity grows quadratically with cluster size ($O(N^2)$), 9 nodes provides optimal balance between high fault tolerance (tolerating up to 4 node failures) and sub-millisecond consensus latency.",
    hint: "Up to 9 nodes per cluster.",
    level: "basic",
    codeExample: `-- Maximum 9 nodes per MGR group.`
  },
  {
    question: "How does Distributed Recovery work when a new node joins an active Group Replication cluster?",
    shortAnswer: "The joining node selects a healthy donor member, transfers data using the **MySQL Clone Plugin** (physical snapshot at NVMe speed) followed by binary log event catch-up, and transitions from `RECOVERING` to `ONLINE` automatically.",
    explanation: "Completely automated state transfer with zero manual dump/restore.",
    hint: "Uses MySQL Clone Plugin for physical snapshot followed by binlog catch-up.",
    level: "intermediate",
    codeExample: `-- State transitions: OFFLINE -> RECOVERING -> ONLINE.`
  },
  {
    question: "What is the difference between MySQL Group Replication vs Galera Cluster?",
    shortAnswer: "Both provide synchronous multi-primary replication with certification, but Group Replication is natively integrated into MySQL 8.0 codebase by Oracle, uses Paxos (GCS), native GTID auto-positioning, and MySQL Router; Galera is a third-party wsrep plugin using Total Order Isolation and Galera Arbitrator (`garbd`).",
    explanation: "Group Replication is the foundational clustering engine behind MySQL InnoDB Cluster.",
    hint: "Group Replication is Oracle's native Paxos-based clustering engine; Galera is a wsrep plugin.",
    level: "intermediate",
    codeExample: `-- Native Oracle MGR vs third-party Galera.`
  },
  {
    question: "What is the primary operational takeaway of Topic 11 in Module 004_006?",
    shortAnswer: "MySQL Group Replication (MGR) delivers fault-tolerant, zero-data-loss (RPO = 0) database clustering powered by **Paxos distributed consensus**: transactions are certified via Total Order Broadcast of **XXHASH64 write sets**, clusters require an odd number of nodes ($N = 2F + 1$, minimum 3 nodes) for quorum majority, **Single-Primary mode** is the production standard for zero-rollback write safety, and member health is tracked via `performance_schema.replication_group_members`.",
    explanation: "Mastering Group Replication enables building self-healing, highly available MySQL clusters capable of sub-5-second automated failovers without data divergence.",
    hint: "Summarize Paxos consensus, N = 2F + 1 quorum formula, XXHASH64 certification, Single-Primary mode, and performance_schema monitoring.",
    level: "basic",
    codeExample: `-- Master Group Replication Blueprint:
# 1. Cluster Prerequisites (my.cnf on all 3 nodes):
[mysqld]
gtid_mode = ON
enforce_gtid_consistency = ON
binlog_format = ROW
log_replica_updates = ON
transaction_write_set_extraction = XXHASH64
group_replication_group_name = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
group_replication_single_primary_mode = ON

# 2. Bootstrap Node 1:
SET GLOBAL group_replication_bootstrap_group = ON;
START GROUP_REPLICATION;
SET GLOBAL group_replication_bootstrap_group = OFF;

# 3. Join Node 2 & 3:
START GROUP_REPLICATION;

# 4. Verify Cluster Health:
SELECT MEMBER_HOST, MEMBER_STATE, MEMBER_ROLE 
FROM performance_schema.replication_group_members;`
  }
];

export default questions;
