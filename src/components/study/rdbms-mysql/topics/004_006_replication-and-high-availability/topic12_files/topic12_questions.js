// topic12_files/topic12_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 12: MySQL InnoDB Cluster: Group Replication + MySQL Router + MySQL Shell AdminAPI

const questions = [
  {
    question: "What is MySQL InnoDB Cluster and what three Oracle technologies compose it?",
    shortAnswer: "MySQL InnoDB Cluster is Oracle's official integrated high-availability solution, composed of: 1. **MySQL Shell AdminAPI** (declarative administrative interface), 2. **MySQL Group Replication** (Paxos multi-node clustering engine), and 3. **MySQL Router** (transparent application connection router).",
    explanation: "Provides an end-to-end, out-of-the-box HA and read-write routing architecture for MySQL 8.0.",
    hint: "Combines MySQL Shell AdminAPI, Group Replication, and MySQL Router.",
    level: "basic",
    codeExample: `// MySQL Shell (JS Mode):
var cluster = dba.createCluster('prodCluster');`
  },
  {
    question: "What is MySQL Shell AdminAPI and why is it preferred over manual Group Replication configuration?",
    shortAnswer: "AdminAPI is a programmatic JavaScript/Python API built into MySQL Shell (`dba.*` and `cluster.*`) that automates cluster validation, GTID configuration, node bootstrapping, user provisioning, and state transfers with simple high-level commands, completely eliminating error-prone manual `my.cnf` edits.",
    explanation: "Replaces dozens of complex manual SQL and configuration steps with declarative single-line commands.",
    hint: "Declarative JS/Python API automating cluster setup and maintenance.",
    level: "basic",
    codeExample: `dba.configureInstance('admin@192.168.1.10:3306');
var cluster = dba.createCluster('kolkataCluster');
cluster.addInstance('admin@192.168.1.20:3306');`
  },
  {
    question: "What does `dba.checkInstanceConfiguration()` do in MySQL Shell?",
    shortAnswer: "It inspects a target MySQL server instance to verify that all prerequisites for InnoDB Cluster (such as `gtid_mode = ON`, `binlog_format = ROW`, primary keys, and memory limits) are satisfied, reporting any configuration errors before cluster deployment.",
    explanation: "Pre-flight validation ensuring cluster compatibility.",
    hint: "Performs pre-flight validation of all MySQL server prerequisites.",
    level: "basic",
    codeExample: `dba.checkInstanceConfiguration('admin@192.168.1.20:3306');`
  },
  {
    question: "What does `dba.configureInstance()` do when preparing a node for InnoDB Cluster?",
    shortAnswer: "It automatically creates the cluster administration accounts, configures all mandatory `my.cnf` settings (GTID, ROW logging, Group Replication parameters), and can persist these changes directly to the instance's `mysqld-auto.cnf` file.",
    explanation: "Configures all cluster prerequisites automatically without manual file editing.",
    hint: "Automatically configures prerequisites and creates cluster admin accounts.",
    level: "intermediate",
    codeExample: `dba.configureInstance('admin@192.168.1.10:3306', {restart: true});`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail business, store sales across ₹1.2 Crores in inventory required deploying a 3-node HA cluster. How did Susmita use AdminAPI to deploy the complete cluster in under 3 minutes?",
    shortAnswer: "She connected to Node 1 in MySQL Shell, executed `dba.createCluster('barrackporeRetail')`, and added Node 2 and Node 3 using `cluster.addInstance('admin@node2:3306', {recoveryMethod: 'clone'})`; MySQL Shell cloned the full database at NVMe line speed and initialized Group Replication automatically.",
    explanation: "Eliminated hours of manual backup restoration and binlog coordinate configuration.",
    hint: "Used dba.createCluster and cluster.addInstance with clone recovery method.",
    level: "moderate",
    codeExample: `# Barrackpore Fast Deployment:
var cluster = dba.createCluster('barrackporeRetail');
cluster.addInstance('admin@192.168.1.20:3306', {recoveryMethod: 'clone'});
cluster.addInstance('admin@192.168.1.30:3306', {recoveryMethod: 'clone'});
cluster.status();`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did MySQL Router simplify application connectivity for ₹500 Crores in banking records?",
    shortAnswer: "They colocated MySQL Router on each application web server; applications connected to `localhost:6446` for write transactions (routed to the active Primary) and `localhost:6447` for read queries (round-robin balanced across secondaries), with Router automatically redirecting connections during failovers in under 3 seconds.",
    explanation: "Eliminated the need for application code changes or hardcoded database IPs.",
    hint: "Colocated MySQL Router exposing Port 6446 (RW) and Port 6447 (RO round-robin).",
    level: "expert",
    codeExample: `# Application database connection string:
DATABASE_URL="mysql://app_user:Pass@127.0.0.1:6446/kolkata_bank"`
  },
  {
    question: "What are the default ports exposed by MySQL Router for InnoDB Cluster?",
    shortAnswer: "Port **`6446`** (Classic MySQL protocol Read-Write Primary), Port **`6447`** (Classic MySQL protocol Read-Only Replicas), Port **`6448`** (X-Protocol Read-Write), and Port **`6449`** (X-Protocol Read-Only).",
    explanation: "Applications connect to 6446 for writes and 6447 for reads.",
    hint: "Port 6446 for Primary writes; Port 6447 for Replica reads.",
    level: "basic",
    codeExample: `# Port 6446: Primary RW
# Port 6447: Secondary RO (Round-Robin)`
  },
  {
    question: "How do you bootstrap MySQL Router against an active InnoDB Cluster?",
    shortAnswer: "Execute `mysqlrouter --bootstrap cluster_admin@192.168.1.10:3306 --user=mysqlrouter --directory /etc/mysqlrouter`.",
    explanation: "Router connects to the cluster, creates a dedicated routing account, downloads the cluster metadata schema, and writes its configuration file.",
    hint: "Run mysqlrouter --bootstrap with cluster connection credentials.",
    level: "intermediate",
    codeExample: `mysqlrouter --bootstrap admin@192.168.1.10:3306 --user=mysqlrouter`
  },
  {
    question: "What are the two `recoveryMethod` options available in `cluster.addInstance()` and which is fastest for large databases?",
    shortAnswer: "1. **`clone`** (Fastest: Uses the MySQL Clone Plugin to copy raw physical InnoDB tablespaces at NVMe speed), and 2. **`incremental`** (Replays missing transactions from binary logs).",
    explanation: "Clone is recommended for large multi-gigabyte databases because it transfers raw storage blocks directly.",
    hint: "clone (physical NVMe snapshot) and incremental (binlog replay); clone is fastest.",
    level: "intermediate",
    codeExample: `cluster.addInstance('admin@192.168.1.20:3306', {recoveryMethod: 'clone'});`
  },
  {
    question: "What command in MySQL Shell displays the complete real-time topology, node health, and lag status of an InnoDB Cluster?",
    shortAnswer: "**`cluster.status()`**.",
    explanation: "Returns a structured JSON document detailing cluster name, primary node, member roles, connection status, and transaction lag.",
    hint: "cluster.status().",
    level: "basic",
    codeExample: `cluster.status();`
  },
  {
    question: "What does `cluster.setPrimaryInstance('instance_address')` do in MySQL Shell?",
    shortAnswer: "It performs a graceful, controlled primary role switchover, promoting the specified node to Primary and demoting the existing Primary to a read-only Secondary without data loss or application downtime.",
    explanation: "Essential for planned operating system upgrades and database maintenance.",
    hint: "Gracefully switches the primary role to a designated secondary node.",
    level: "intermediate",
    codeExample: `cluster.setPrimaryInstance('admin@192.168.1.20:3306');`
  },
  {
    question: "What does `cluster.rejoinInstance('instance_address')` do in MySQL Shell?",
    shortAnswer: "It reintegrates a node that had crashed or was disconnected back into the active cluster, executing distributed recovery to synchronize missing transactions before transitioning its state to `ONLINE`.",
    explanation: "Restores cluster redundancy after repairing a failed node.",
    hint: "Rejoins a recovered node back into the active cluster.",
    level: "basic",
    codeExample: `cluster.rejoinInstance('admin@192.168.1.30:3306');`
  },
  {
    question: "What does `cluster.rescan()` do in MySQL Shell?",
    shortAnswer: "It scans the cluster topology to detect external changes or configuration drift (such as nodes that were manually added or removed outside AdminAPI), updating the cluster metadata schema accordingly.",
    explanation: "Reconciles metadata with actual physical cluster state.",
    hint: "Scans cluster topology to detect and fix configuration drift.",
    level: "intermediate",
    codeExample: `cluster.rescan();`
  },
  {
    question: "What is `mysql_innodb_cluster_metadata` in MySQL InnoDB Cluster?",
    shortAnswer: "A dedicated metadata schema stored inside the database that maintains cluster definitions, registered MySQL Router instances, group topology history, and failover preferences.",
    explanation: "Enables MySQL Router and MySQL Shell to discover cluster topology dynamically.",
    hint: "Internal database schema storing cluster configuration and router metadata.",
    level: "expert",
    codeExample: `SHOW SCHEMAS LIKE 'mysql_innodb_cluster_metadata';`
  },
  {
    question: "What is the recommended deployment pattern for MySQL Router in high-traffic production environments?",
    shortAnswer: "**Colocate MySQL Router directly on each Application Server** (web/microservice host) and have application instances connect via `localhost` (127.0.0.1 or Unix socket).",
    explanation: "Eliminates network proxy hops, distributes proxy CPU load, and removes central load balancer bottlenecks.",
    hint: "Colocate MySQL Router on each application host connecting via localhost.",
    level: "intermediate",
    codeExample: `# App -> Localhost Router (Port 6446) -> Fast direct connection to Primary Node`
  },
  {
    question: "How does MySQL Router know when a Primary has crashed and a new node is elected in under 5 seconds?",
    shortAnswer: "MySQL Router maintains persistent metadata monitoring connections to all cluster nodes; when Group Replication elects a new Primary, the Router receives the topology notification and instantly redirects all Port 6446 connections to the new Primary.",
    explanation: "Automatic metadata-driven client reconnection.",
    hint: "Monitors cluster metadata and immediately shifts Port 6446 traffic to the newly elected primary.",
    level: "intermediate",
    codeExample: `# Automatic Router redirection in <3 seconds without application restart.`
  },
  {
    question: "How do you perform a Zero-Downtime Rolling Upgrade of MySQL from 8.0.35 to 8.0.36 across a 3-node InnoDB Cluster?",
    shortAnswer: "1. Upgrade Secondary Node 3 and rejoin cluster; 2. Upgrade Secondary Node 2 and rejoin cluster; 3. Execute `cluster.setPrimaryInstance(node2)` to move Primary role to Node 2; 4. Upgrade the former Primary Node 1 and rejoin cluster.",
    explanation: "Guarantees continuous 100% database availability throughout the upgrade process.",
    hint: "Upgrade secondaries first, switch primary role to upgraded node, then upgrade the former primary.",
    level: "expert",
    codeExample: `# Rolling Upgrade Order:
# 1. Upgrade Node 3 -> 2. Upgrade Node 2 -> 3. Switch Primary to Node 2 -> 4. Upgrade Node 1.`
  },
  {
    question: "What does `cluster.removeInstance('instance_address')` do in MySQL Shell?",
    shortAnswer: "It safely and gracefully removes a node from the cluster, updating the metadata schema and unregistering it from Group Replication consensus.",
    explanation: "Used when permanently decommissioning or resizing a cluster node.",
    hint: "Gracefully unregisters and removes a node from the cluster.",
    level: "basic",
    codeExample: `cluster.removeInstance('admin@192.168.1.30:3306');`
  },
  {
    question: "What does `cluster.dissolve()` do in MySQL Shell?",
    shortAnswer: "It unbinds and removes the InnoDB Cluster configuration and metadata from all nodes, converting the members back into standalone standalone MySQL database instances without deleting user table data.",
    explanation: "Used to decommission an entire cluster safely.",
    hint: "Decommissions the cluster metadata, converting nodes back to standalone instances.",
    level: "expert",
    codeExample: `cluster.dissolve({force: true});`
  },
  {
    question: "What is `cluster.describe()` in MySQL Shell?",
    shortAnswer: "Displays the static structural topology of the cluster (cluster name, members, default primary mode, and topology type) without polling dynamic member states.",
    explanation: "Provides quick structural inspection.",
    hint: "Displays static cluster structure and member list.",
    level: "basic",
    codeExample: `cluster.describe();`
  },
  {
    question: "What is `dba.dropMetadataSchema()` in MySQL Shell?",
    shortAnswer: "A cleanup command that deletes the `mysql_innodb_cluster_metadata` schema from an instance if previous cluster creation failed or was corrupted.",
    explanation: "Resets an instance to a clean state for new cluster creation.",
    hint: "Deletes cluster metadata schema to reset instance state.",
    level: "expert",
    codeExample: `dba.dropMetadataSchema();`
  },
  {
    question: "What happens if a network partition splits a 3-node InnoDB Cluster into a 2-node majority and a 1-node minority?",
    shortAnswer: "The 2-node majority continues processing transactions normally; the isolated 1-node minority sets itself to read-only; MySQL Routers connected to the minority detect the split and automatically redirect application queries to the healthy 2-node majority.",
    explanation: "Guarantees complete split-brain immunity and automated client failover.",
    hint: "Majority continues processing writes; Routers redirect clients away from isolated node.",
    level: "intermediate",
    codeExample: `-- Quorum majority maintains continuous cluster availability.`
  },
  {
    question: "What is `cluster.switchToMultiPrimaryMode()` in MySQL Shell AdminAPI?",
    shortAnswer: "A declarative AdminAPI method that transitions the cluster from Single-Primary to Multi-Primary mode, allowing all members to accept concurrent write transactions.",
    explanation: "Reconfigures all nodes online without cluster restarts.",
    hint: "Switches cluster to Multi-Primary mode via AdminAPI.",
    level: "intermediate",
    codeExample: `cluster.switchToMultiPrimaryMode();`
  },
  {
    question: "What is `cluster.switchToSinglePrimaryMode('instance_address')` in MySQL Shell AdminAPI?",
    shortAnswer: "A declarative AdminAPI method that transitions the cluster from Multi-Primary to Single-Primary mode, designating the specified node as Primary and locking other nodes in read-only mode.",
    explanation: "Enforces single-primary write serialization.",
    hint: "Switches cluster to Single-Primary mode designating a specific primary node.",
    level: "intermediate",
    codeExample: `cluster.switchToSinglePrimaryMode('admin@192.168.1.10:3306');`
  },
  {
    question: "What is MySQL InnoDB ClusterSet and how does it extend InnoDB Cluster?",
    shortAnswer: "InnoDB ClusterSet links **multiple geographically distributed InnoDB Clusters** (e.g. Primary Cluster in Kolkata and Disaster Recovery Cluster in Mumbai) via asynchronous GTID replication with automated cross-region disaster recovery runbooks.",
    explanation: "Delivers multi-region disaster recovery for enterprise business continuity.",
    hint: "Links multiple InnoDB Clusters across geographic regions for disaster recovery.",
    level: "expert",
    codeExample: `var clusterSet = dba.createClusterSet('kolkataMumbaiClusterSet');`
  },
  {
    question: "What is MySQL InnoDB Read Replica (Read Replica Instance) in InnoDB Cluster?",
    shortAnswer: "An asynchronous read replica attached outside the Group Replication Paxos quorum, used to scale read-heavy reporting queries without adding Paxos consensus message overhead to the core cluster.",
    explanation: "Scales read throughput to dozens of nodes without impacting write latency.",
    hint: "Asynchronous read replica attached outside Paxos quorum for reporting read scaling.",
    level: "intermediate",
    codeExample: `cluster.addReadReplicaInstance('admin@192.168.1.40:3306');`
  },
  {
    question: "What is `dba.rebootClusterFromCompleteOutage()` in MySQL Shell?",
    shortAnswer: "An emergency recovery command used to restore an InnoDB Cluster after a catastrophic datacenter power failure where all nodes went down simultaneously; it identifies the node with the most up-to-date GTID set and re-bootstraps the cluster safely.",
    explanation: "Automates disaster recovery after total power outages.",
    hint: "Restores cluster after complete datacenter power failure using the most up-to-date GTID node.",
    level: "expert",
    codeExample: `dba.rebootClusterFromCompleteOutage('kolkataCluster');`
  },
  {
    question: "How do you inspect the routing performance and connection count of MySQL Router?",
    shortAnswer: "Query MySQL Router's internal **HTTP REST API** on Port `8443` or inspect `/var/log/mysqlrouter/mysqlrouter.log`.",
    explanation: "Provides real-time metrics on active connections and routed query latency.",
    hint: "Query MySQL Router REST API on port 8443 or check router log files.",
    level: "intermediate",
    codeExample: `curl -u admin:Pass http://localhost:8443/api/20190715/routes`
  },
  {
    question: "What is the recommended health check query to ensure an InnoDB Cluster is in optimal state?",
    shortAnswer: "Execute `cluster.status().defaultReplicaSet.status` in MySQL Shell; it should return **`'OK'`** with all members showing `status: 'ONLINE'`.",
    explanation: "Confirms that all cluster nodes are fully synchronized and participating in consensus.",
    hint: "Verify cluster.status() returns status: 'OK' with all members ONLINE.",
    level: "basic",
    codeExample: `// JS:
var status = cluster.status();
print(status.defaultReplicaSet.status); // Output: OK`
  },
  {
    question: "What is the primary operational takeaway of Topic 12 in Module 004_006?",
    shortAnswer: "MySQL InnoDB Cluster is Oracle's premier enterprise high-availability framework, integrating **MySQL Shell AdminAPI** for declarative cluster management (`dba.createCluster()`, `cluster.addInstance({recoveryMethod: 'clone'})`), **Group Replication** for zero-data-loss Paxos consensus, and **MySQL Router** for transparent client routing (Port 6446 Primary RW, Port 6447 Replicas RO), delivering automated sub-5-second failover and seamless zero-downtime rolling upgrades.",
    explanation: "Mastering InnoDB Cluster empowers DBAs to deploy and manage production-grade, self-healing database architectures with zero manual scripting.",
    hint: "Summarize the 3 technologies, AdminAPI declarative deployment, clone recovery, Router port mapping (6446/6447), and rolling upgrade workflows.",
    level: "basic",
    codeExample: `-- Master InnoDB Cluster Deployment Blueprint:
# 1. In MySQL Shell:
dba.configureInstance('admin@192.168.1.10:3306');
dba.configureInstance('admin@192.168.1.20:3306');
dba.configureInstance('admin@192.168.1.30:3306');

var cluster = dba.createCluster('kolkataProductionCluster');
cluster.addInstance('admin@192.168.1.20:3306', {recoveryMethod: 'clone'});
cluster.addInstance('admin@192.168.1.30:3306', {recoveryMethod: 'clone'});
cluster.status();

# 2. On App Server:
mysqlrouter --bootstrap admin@192.168.1.10:3306 --user=mysqlrouter
systemctl start mysqlrouter`
  }
];

export default questions;
