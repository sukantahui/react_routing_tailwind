// topic7_files/topic7_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 7: Read/Write Splitting Architectures using ProxySQL and MySQL Router

const questions = [
  {
    question: "What is Read/Write Splitting in a database cluster, and what problem does it solve?",
    shortAnswer: "It routes all write transactions (`INSERT`, `UPDATE`, `DELETE`, `DDL`) to the primary database while distributing read queries (`SELECT`) across multiple read replicas, maximizing throughput and preventing read-heavy reporting from exhausting primary server resources.",
    explanation: "Allows scaling read capacity horizontally without increasing hardware load on the single write master.",
    hint: "Routes writes to primary and balances SELECT reads across read replicas.",
    level: "basic",
    codeExample: `# App writes → Primary (Node 1)
# App reads  → Replica Pool (Node 2, Node 3, Node 4)`
  },
  {
    question: "What is the primary advantage of Proxy-level Read/Write splitting (ProxySQL) over Application-level splitting (Dual DataSources)?",
    shortAnswer: "Application code remains completely agnostic of the database topology and connects to a single endpoint (`port 6033`); ProxySQL transparently inspects SQL statements, routes writes and reads, handles connection pooling, and shunts lagging replicas without requiring application restarts.",
    explanation: "Eliminates application code complexity and hardcoded database connection pools.",
    hint: "Single virtual endpoint; transparent routing and lag protection without modifying application code.",
    level: "basic",
    codeExample: `// App connects to single endpoint:
const pool = mysql.createPool({ host: 'proxysql-vip', port: 6033 });`
  },
  {
    question: "What are ProxySQL Hostgroups and how are they typically configured for Read/Write splitting?",
    shortAnswer: "Hostgroups are logical pools of database servers; typically, **Hostgroup 10** contains the Writer (Primary) server, and **Hostgroup 20** contains the pool of Reader (Replica) servers.",
    explanation: "Query rules assign matching queries to specific destination hostgroups.",
    hint: "Logical server pools: e.g. Hostgroup 10 for Writers and Hostgroup 20 for Readers.",
    level: "basic",
    codeExample: `INSERT INTO mysql_servers (hostgroup_id, hostname, port) 
VALUES (10, '192.168.1.10', 3306),  -- Writer
       (20, '192.168.1.20', 3306),  -- Reader 1
       (20, '192.168.1.30', 3306);  -- Reader 2`
  },
  {
    question: "Why MUST `SELECT ... FOR UPDATE` and `SELECT ... LOCK IN SHARE MODE` queries be routed to the Writer hostgroup rather than the Reader hostgroup?",
    shortAnswer: "Because locking reads require row-level exclusive or shared locks in InnoDB that must be acquired on the authoritative primary server where subsequent write transactions will commit; acquiring locks on a read replica does not protect transactions on the primary.",
    explanation: "Routing locking reads to read replicas violates transactional concurrency controls.",
    hint: "Locking reads must acquire locks on the primary where writes occur.",
    level: "intermediate",
    codeExample: `INSERT INTO mysql_query_rules (rule_id, active, match_pattern, destination_hostgroup, apply) 
VALUES (1, 1, '^SELECT.*FOR UPDATE', 10, 1);`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS cashiers processed ₹1.2 Crores in sales transactions. How did ProxySQL prevent cashiers from reading stale inventory stock when a read replica lagged by 12 seconds?",
    shortAnswer: "Because Susmita had configured `max_replication_lag = 5` in `mysql_servers`, ProxySQL automatically detected the 12-second lag, marked the replica as `SHUNNED`, and redirected stock queries to healthy replicas and the primary instantly.",
    explanation: "Protected customers from purchasing out-of-stock items due to replication lag.",
    hint: "ProxySQL marked lagging replica as SHUNNED based on max_replication_lag threshold.",
    level: "moderate",
    codeExample: `# Barrackpore Lag Protection in ProxySQL:
UPDATE mysql_servers SET max_replication_lag = 5 WHERE hostgroup_id = 20;
LOAD MYSQL SERVERS TO RUNTIME;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did deploying MySQL Router with MySQL InnoDB Cluster streamline read-write routing for ₹500 Crores in banking ledgers?",
    shortAnswer: "Applications connected to MySQL Router on **Port 6446** for core banking write transactions and **Port 6447** for account balance statements, with Router automatically discovering primary promotions and load-balancing reads across all secondaries.",
    explanation: "Eliminated manual configuration of replica pools during automated failovers.",
    hint: "Used Port 6446 for RW primary and Port 6447 for RO replica load balancing.",
    level: "expert",
    codeExample: `# Core Banking: mysql -h 127.0.0.1 -P 6446 (Primary Writes)
# Statements:    mysql -h 127.0.0.1 -P 6447 (Replica Reads)`
  },
  {
    question: "What are the default ports used by ProxySQL for traffic vs administration?",
    shortAnswer: "Port **`6033`** for incoming application database traffic (MySQL protocol), and Port **`6032`** for the ProxySQL Admin interface (SQLite relational configuration engine).",
    explanation: "DBAs manage ProxySQL configuration dynamically via standard SQL commands on port 6032.",
    hint: "Port 6033 for app traffic; Port 6032 for admin interface.",
    level: "basic",
    codeExample: `mysql -u radmin -p -h 127.0.0.1 -P 6032 # Admin Interface
mysql -u app_user -p -h 127.0.0.1 -P 6033 # Traffic Port`
  },
  {
    question: "What is the 3-tier configuration architecture in ProxySQL (Memory, Runtime, Disk)?",
    shortAnswer: "1. **In-Memory (CONFIG)**: Modified by `INSERT`/`UPDATE` statements; 2. **RUNTIME**: Active configuration loaded into execution engine (`LOAD ... TO RUNTIME`); 3. **DISK**: Persistent storage saved across restarts (`SAVE ... TO DISK`).",
    explanation: "Allows testing configuration changes in memory before promoting them to active runtime and persisting them to disk.",
    hint: "Config (Memory) → Runtime (Active Execution) → Disk (Persistent SQLite DB).",
    level: "intermediate",
    codeExample: `LOAD MYSQL QUERY RULES TO RUNTIME;
SAVE MYSQL QUERY RULES TO DISK;`
  },
  {
    question: "What regular expression in `mysql_query_rules` routes all standard `SELECT` queries to Reader Hostgroup 20?",
    shortAnswer: "`^SELECT ` (with `destination_hostgroup = 20` and `apply = 1`).",
    explanation: "Matches all queries beginning with SELECT that were not intercepted by earlier priority rules (like SELECT FOR UPDATE).",
    hint: "match_pattern = '^SELECT' with destination_hostgroup = 20.",
    level: "basic",
    codeExample: `INSERT INTO mysql_query_rules (rule_id, active, match_pattern, destination_hostgroup, apply) 
VALUES (2, 1, '^SELECT', 20, 1);`
  },
  {
    question: "What is `apply = 1` in ProxySQL `mysql_query_rules`?",
    shortAnswer: "It instructs the ProxySQL query routing engine to **stop evaluating further query rules** once this rule matches, immediately dispatching the query to the designated destination hostgroup.",
    explanation: "Acts as a `break` statement in the query rules evaluation loop.",
    hint: "Stops evaluating further rules once matched.",
    level: "intermediate",
    codeExample: `-- apply = 1 stops rule chaining immediately.`
  },
  {
    question: "What is ProxySQL Connection Multiplexing and what performance advantage does it provide?",
    shortAnswer: "It decouples client frontend connections from backend MySQL server connections; thousands of client connections share a small, highly optimized pool of backend database connections, reducing server thread memory and context-switching overhead.",
    explanation: "Allows a single MySQL server to handle 10,000+ application connections effortlessly.",
    hint: "Multiplexes thousands of client connections over a small pool of backend connections.",
    level: "intermediate",
    codeExample: `SHOW VARIABLES LIKE 'mysql-multiplexing'; -- Default: 1 (Enabled)`
  },
  {
    question: "What triggers ProxySQL to temporarily disable Connection Multiplexing for a specific client session?",
    shortAnswer: "Executing session-state modifying commands, such as `SET @variable = ...`, `LOCK TABLES`, creating temporary tables, or opening an explicit transaction (`START TRANSACTION`).",
    explanation: "ProxySQL binds the client to a dedicated backend connection until the transaction or session state completes.",
    hint: "Explicit transactions, user variables, or temporary tables bind dedicated connections.",
    level: "expert",
    codeExample: `-- START TRANSACTION disables multiplexing until COMMIT / ROLLBACK.`
  },
  {
    question: "What is `mysql_replication_hostgroups` in ProxySQL?",
    shortAnswer: "A configuration table that pairs a Writer Hostgroup (`writer_hostgroup`) with a Reader Hostgroup (`reader_hostgroup`); ProxySQL dynamically checks `read_only` on all nodes and automatically moves the writable primary to the writer hostgroup and read-only replicas to the reader hostgroup.",
    explanation: "Provides automatic topology self-healing during primary failover.",
    hint: "Pairs writer and reader hostgroups and auto-moves nodes based on read_only status.",
    level: "expert",
    codeExample: `INSERT INTO mysql_replication_hostgroups (writer_hostgroup, reader_hostgroup, comment) 
VALUES (10, 20, 'Production Cluster HA');
LOAD MYSQL SERVERS TO RUNTIME; SAVE MYSQL SERVERS TO DISK;`
  },
  {
    question: "What status values can a backend server have in ProxySQL `mysql_servers`?",
    shortAnswer: "1. `ONLINE` (Healthy & accepting queries), 2. `SHUNNED` (Temporarily disabled due to lag or connection errors), 3. `OFFLINE_SOFT` (Draining existing connections), and 4. `OFFLINE_HARD` (Immediately disconnected).",
    explanation: "Allows graceful maintenance and automatic fault isolation.",
    hint: "ONLINE, SHUNNED, OFFLINE_SOFT, and OFFLINE_HARD.",
    level: "intermediate",
    codeExample: `SELECT hostgroup_id, hostname, port, status, max_replication_lag FROM mysql_servers;`
  },
  {
    question: "How does `OFFLINE_SOFT` enable zero-downtime database maintenance in ProxySQL?",
    shortAnswer: "When set to `OFFLINE_SOFT`, ProxySQL stops routing new queries to that server while allowing currently executing transactions to complete gracefully; once all connections drain, the DBA can safely restart or upgrade the server.",
    explanation: "Prevents dropping in-flight user transactions during planned maintenance.",
    hint: "Drains existing transactions without sending new queries before maintenance.",
    level: "basic",
    codeExample: `UPDATE mysql_servers SET status = 'OFFLINE_SOFT' WHERE hostname = '192.168.1.20';
LOAD MYSQL SERVERS TO RUNTIME;`
  },
  {
    question: "What is ProxySQL Query Caching and how is it configured?",
    shortAnswer: "ProxySQL can cache the result sets of repetitive `SELECT` queries in its memory cache by setting `cache_ttl = <milliseconds>` in `mysql_query_rules`, returning results in microseconds without hitting the backend database.",
    explanation: "Offloads high-frequency identical read queries from database replicas.",
    hint: "Caches query result sets in proxy memory using cache_ttl in query rules.",
    level: "intermediate",
    codeExample: `INSERT INTO mysql_query_rules (rule_id, active, match_pattern, cache_ttl, apply) 
VALUES (10, 1, '^SELECT.*FROM categories', 60000, 1); -- Cache for 60s`
  },
  {
    question: "How do you configure high availability for the ProxySQL layer itself to prevent a Single Point of Failure (SPOF)?",
    shortAnswer: "Deploy at least two redundant ProxySQL nodes paired with **Keepalived Virtual IP (VIP)** or cloud network load balancers (AWS NLB / GCP Load Balancer), with ProxySQL Cluster enabled for automated SQLite configuration sync.",
    explanation: "Ensures proxy layer redundancy with instant failover if a proxy node crashes.",
    hint: "Deploy multiple ProxySQL nodes behind Keepalived Virtual IP with ProxySQL Cluster sync.",
    level: "intermediate",
    codeExample: `# Keepalived provides Virtual IP (VIP): 192.168.1.100 → Active ProxySQL Node`
  },
  {
    question: "What is the primary difference between ProxySQL and MySQL Router?",
    shortAnswer: "ProxySQL is an advanced SQL-aware proxy capable of regex query rewriting, caching, connection multiplexing, and custom routing across any MySQL topology; MySQL Router is a lightweight, zero-configuration routing middleware designed specifically for MySQL InnoDB Cluster and Group Replication.",
    explanation: "ProxySQL offers deep query control; MySQL Router offers seamless native integration with InnoDB Cluster.",
    hint: "ProxySQL is advanced SQL-aware proxy with query rules; MySQL Router is native InnoDB Cluster middleware.",
    level: "intermediate",
    codeExample: `-- ProxySQL: Advanced regex query rules & caching
-- MySQL Router: Native metadata-driven InnoDB Cluster routing`
  },
  {
    question: "What is `mysql-monitor_username` in ProxySQL configuration?",
    shortAnswer: "The database user credentials configured in ProxySQL to connect to backend MySQL servers to execute heartbeat pings (`SELECT 1`), monitor `Seconds_Behind_Source`, and check `read_only` status.",
    explanation: "Requires a dedicated monitoring user on backend MySQL instances.",
    hint: "Dedicated user credentials used by ProxySQL to check server health and lag.",
    level: "basic",
    codeExample: `SET mysql-monitor_username = 'monitor_user';
SET mysql-monitor_password = 'MonitorPass#2026';
LOAD MYSQL VARIABLES TO RUNTIME; SAVE MYSQL VARIABLES TO DISK;`
  },
  {
    question: "What happens if all replicas in Reader Hostgroup 20 are `SHUNNED` due to replication lag?",
    shortAnswer: "If configured with fallback rules or if no healthy readers exist, ProxySQL routes `SELECT` queries to the primary (Writer Hostgroup 10) to ensure application queries do not fail.",
    explanation: "Preserves application availability during extreme cluster lag events.",
    hint: "Falls back to routing reads to the Primary writer hostgroup to avoid query failures.",
    level: "intermediate",
    codeExample: `-- Fallback ensures continuous read availability.`
  },
  {
    question: "What is the role of `weight` in ProxySQL `mysql_servers`?",
    shortAnswer: "An integer determining the proportion of query traffic sent to that server relative to other servers in the same hostgroup (e.g. a server with `weight = 200` receives twice as many queries as one with `weight = 100`).",
    explanation: "Used for weighted load balancing across servers with different CPU/memory capacities.",
    hint: "Determines proportion of queries allocated to each server in a hostgroup.",
    level: "basic",
    codeExample: `UPDATE mysql_servers SET weight = 200 WHERE hostname = 'heavy-replica.local';`
  },
  {
    question: "What is `stats.stats_mysql_query_rules` in ProxySQL Admin?",
    shortAnswer: "A statistical table showing how many times each configured query rule was matched (`hits`), allowing DBAs to verify that query routing rules are functioning as expected.",
    explanation: "Essential for validating query splitting rules in staging and production.",
    hint: "Table showing hit counts for each active query rule.",
    level: "basic",
    codeExample: `SELECT rule_id, hits FROM stats.stats_mysql_query_rules;`
  },
  {
    question: "How does ProxySQL handle prepared statements (`COM_STMT_PREPARE`) during Read/Write splitting?",
    shortAnswer: "ProxySQL fully supports binary prepared statements, tracking statement IDs and routing execution (`COM_STMT_EXECUTE`) to the appropriate hostgroup based on the prepared query text.",
    explanation: "Ensures seamless compatibility with modern ORM frameworks (Hibernate, Prisma, TypeORM).",
    hint: "Tracks prepared statement IDs and routes execution based on statement text.",
    level: "expert",
    codeExample: `-- Full binary protocol prepared statement support in ProxySQL 2.0+.`
  },
  {
    question: "What is `mysql-max_connections` in ProxySQL global variables?",
    shortAnswer: "The maximum number of simultaneous client frontend connections ProxySQL will accept across all application clients (e.g. `2048` or `10000`).",
    explanation: "Acts as a front-door rate limiter to protect backend MySQL servers from connection floods.",
    hint: "Maximum client frontend connections accepted by ProxySQL.",
    level: "basic",
    codeExample: `SET mysql-max_connections = 10000;`
  },
  {
    question: "How do you bootstrap MySQL Router to an existing MySQL InnoDB Cluster?",
    shortAnswer: "Run `mysqlrouter --bootstrap cluster_user@primary_host:3306 --user=mysqlrouter`.",
    explanation: "MySQL Router automatically connects to the cluster, creates user accounts, downloads metadata, and generates `mysqlrouter.conf`.",
    hint: "Run mysqlrouter --bootstrap with cluster connection details.",
    level: "intermediate",
    codeExample: `mysqlrouter --bootstrap cluster_admin@192.168.1.10:3306 --user=mysqlrouter`
  },
  {
    question: "What is `use_ssl = 1` in ProxySQL `mysql_servers`?",
    shortAnswer: "It instructs ProxySQL to establish SSL/TLS encrypted connections when communicating with backend MySQL database instances.",
    explanation: "Ensures secure encryption for database traffic traveling between proxy and backend nodes.",
    hint: "Enforces SSL encryption between ProxySQL and backend database nodes.",
    level: "basic",
    codeExample: `UPDATE mysql_servers SET use_ssl = 1;`
  },
  {
    question: "What is the 'Read-Your-Own-Writes' consistency challenge in Read/Write splitting architectures, and how can it be solved?",
    shortAnswer: "When a user inserts a record on the primary and immediately refreshes the page, the subsequent `SELECT` query might hit a replica that has not yet replicated the write (lag), showing missing data; solved by routing post-write queries to the primary for 2 seconds or using `WAIT_FOR_EXECUTED_GTID_SET`.",
    explanation: "Crucial for e-commerce checkout and social profile updates.",
    hint: "User queries lagging replica immediately after write; solved by sticky primary routing or GTID wait.",
    level: "expert",
    codeExample: `-- Solution: Sticky routing to Hostgroup 10 for 2 seconds following write transactions.`
  },
  {
    question: "How do you inspect current client connection statistics in ProxySQL?",
    shortAnswer: "Query `stats.stats_mysql_processlist` or `stats.stats_mysql_connection_pool` in the admin interface.",
    explanation: "Provides real-time telemetry on active client sessions and backend pool utilization.",
    hint: "Query stats.stats_mysql_connection_pool in ProxySQL Admin.",
    level: "basic",
    codeExample: `SELECT hostgroup, srv_host, srv_port, status, ConnUsed, ConnFree, ConnOK 
FROM stats.stats_mysql_connection_pool;`
  },
  {
    question: "What happens if a query matches NO rules in `mysql_query_rules`?",
    shortAnswer: "ProxySQL routes the query to the default hostgroup configured for that user in `mysql_users.default_hostgroup` (typically Hostgroup 10 - Primary).",
    explanation: "Ensures safe write routing by default if no explicit read rule matches.",
    hint: "Routes to default_hostgroup configured for that user in mysql_users (Hostgroup 10).",
    level: "basic",
    codeExample: `INSERT INTO mysql_users (username, password, default_hostgroup) 
VALUES ('app_user', 'Pass#2026', 10);`
  },
  {
    question: "What is the primary operational takeaway of Topic 7 in Module 004_006?",
    shortAnswer: "A dedicated database proxy layer (ProxySQL / MySQL Router) is essential for enterprise database scaling: it provides a single virtual connection endpoint, executes transparent SQL-level Read/Write splitting (`^SELECT` to Reader Hostgroup 20, writes and `SELECT FOR UPDATE` to Writer Hostgroup 10), protects against stale data reads by automatically shunning lagging replicas (`max_replication_lag`), multiplexes thousands of application connections, and enables zero-downtime maintenance via `OFFLINE_SOFT` connection draining.",
    explanation: "Mastering ProxySQL and MySQL Router enables decoupling application code from backend cluster topologies while guaranteeing performance and high availability.",
    hint: "Summarize single endpoint, transparent query rules, max_replication_lag shunning, connection multiplexing, and OFFLINE_SOFT draining.",
    level: "basic",
    codeExample: `-- Master ProxySQL Read/Write Splitting Recipe:
# 1. Define Servers:
INSERT INTO mysql_servers (hostgroup_id, hostname, port, max_replication_lag) VALUES
  (10, '192.168.1.10', 3306, 0),   -- Primary Writer
  (20, '192.168.1.20', 3306, 5),   -- Replica Reader 1
  (20, '192.168.1.30', 3306, 5);   -- Replica Reader 2

# 2. Define Query Rules:
INSERT INTO mysql_query_rules (rule_id, active, match_pattern, destination_hostgroup, apply) VALUES
  (1, 1, '^SELECT.*FOR UPDATE', 10, 1),
  (2, 1, '^SELECT', 20, 1);

# 3. Deploy to Runtime & Persist to Disk:
LOAD MYSQL SERVERS TO RUNTIME; SAVE MYSQL SERVERS TO DISK;
LOAD MYSQL QUERY RULES TO RUNTIME; SAVE MYSQL QUERY RULES TO DISK;`
  }
];

export default questions;
