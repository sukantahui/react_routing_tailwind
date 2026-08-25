// topic11_files/topic11_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 11: Database Migration Strategies: Cross-Server, Cross-Version, and Cloud Migration Best Practices

const questions = [
  {
    question: "What are the 3 primary database migration archetypes encountered in production MySQL environments?",
    shortAnswer: "1. Cross-Server Migration (same version hardware/datacenter relocation); 2. Cross-Version Upgrade Migration (major engine upgrade, e.g. 5.7 -> 8.0); 3. Cloud Migration (on-premises to managed AWS RDS / Aurora / GCP Cloud SQL).",
    explanation: "Each archetype has distinct risk profiles, replication compatibility requirements, and cutover strategies.",
    hint: "Cross-Server, Cross-Version Upgrade, and Cloud Migration.",
    level: "basic",
    codeExample: `-- Archetype 1: On-prem Server A -> Server B
-- Archetype 2: MySQL 5.7 -> MySQL 8.0.x
-- Archetype 3: On-prem Bare Metal -> AWS RDS / Aurora`
  },
  {
    question: "What are the 4 chronological steps in a Near-Zero-Downtime Replication Cutover runbook?",
    shortAnswer: "Step 1: Capture initial consistent baseline with binlog coordinates. Step 2: Seed target database. Step 3: Configure replication from source to target until lag is 0. Step 4: Set source read-only, promote target to primary master, and switch application traffic.",
    explanation: "Replication streaming allows the target database to continuously catch up in the background, reducing application downtime to less than 30 seconds for DNS switchover.",
    hint: "1. Seed Baseline -> 2. Replicate to 0 Lag -> 3. Lock Source -> 4. Promote Target & Switch DNS.",
    level: "basic",
    codeExample: `# 1. Dump with binlog pos -> 2. Load to Target -> 3. START REPLICA -> 4. Cutover:
SET GLOBAL read_only = ON; -- on source
-- verify Seconds_Behind_Source = 0 on target
STOP REPLICA; SET GLOBAL read_only = OFF; -- on target`
  },
  {
    question: "What is `util.checkForServerUpgrade()` in MySQL Shell, and why is it mandatory prior to upgrading from MySQL 5.7 to 8.0?",
    shortAnswer: "An automated diagnostic utility that inspects the database schema for compatibility blockers, including new reserved keywords (e.g. `RANK`, `MEMBER`, `SYSTEM`), invalid default dates (`0000-00-00`), obsolete SQL modes, and legacy MyISAM system tables.",
    explanation: "Running the upgrade checker identifies syntax and schema conflicts before upgrading, preventing catastrophic startup failures.",
    hint: "Pre-upgrade diagnostic utility that flags incompatible schemas and reserved keywords.",
    level: "intermediate",
    codeExample: `// Inside MySQL Shell (JavaScript Mode):
util.checkForServerUpgrade({
  user: 'root',
  host: '127.0.0.1',
  port: 3306
});`
  },
  {
    question: "What is Reverse Replication in database migration, and why is it a critical safety mechanism?",
    shortAnswer: "Configuring the old source server as a replica of the NEW primary target immediately after cutover, ensuring all new transactions written to the target are continuously synced back to the old server.",
    explanation: "If an unexpected application defect or performance regression is discovered post-migration, engineers can failback DNS to the old server instantly with ZERO data loss.",
    hint: "Replicates from new target back to old source for instant zero-data-loss failback.",
    level: "expert",
    codeExample: `-- On OLD source server (now replica):
CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = 'new-cloud-db.internal',
  SOURCE_USER = 'repl_user',
  SOURCE_AUTO_POSITION = 1;
START REPLICA;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, migrating a 120GB database from MySQL 5.7 to MySQL 8.0 failed on table creation. Why?",
    shortAnswer: "A column named `rank` in table `employee_ratings` conflicted with MySQL 8.0's newly introduced `RANK()` window function reserved keyword.",
    explanation: "Mamata wrapped the column name in backticks (<code>\`rank\`</code>) or renamed it to `performance_rank`, allowing the schema to load cleanly in MySQL 8.0.",
    hint: "Column name 'rank' conflicted with MySQL 8.0 window function reserved keyword.",
    level: "moderate",
    codeExample: `-- MySQL 8.0 Reserved Keyword Conflict:
-- ALTER TABLE employee_ratings CHANGE rank performance_rank INT;
-- Or wrap in backticks: \`rank\``
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, migrating a 2TB core banking database to AWS Aurora required a 60-second maintenance window. How did Debangshu execute the cutover?",
    shortAnswer: "He established an SSL-encrypted GTID replication stream between on-premises and Aurora; during cutover, he set source `read_only = ON`, waited 4 seconds for Aurora lag to reach 0, promoted Aurora, and updated Route53 DNS in 22 seconds.",
    explanation: "Total application write downtime was only 26 seconds, well within the 60-second SLA, protecting ₹500 Crores in active transaction pipelines.",
    hint: "Executed replication cutover with Route53 DNS switch in 26 seconds.",
    level: "expert",
    codeExample: `-- Kolkata Bank 26-Second Cutover Runbook:
-- 1. Source: SET GLOBAL super_read_only = ON;
-- 2. Target: CALL mysql.rds_stop_replication;
-- 3. Route53: Switch CNAME 'db.bank.internal' -> Aurora Endpoint.`
  },
  {
    question: "What tool should be used to verify data consistency between the source and target database before initiating production cutover?",
    shortAnswer: "`pt-table-checksum` (from Percona Toolkit).",
    explanation: "Runs cryptographic chunked checksum queries across all tables on the source, replicates them to the target, and verifies that table data is 100% identical on both nodes.",
    hint: "Use pt-table-checksum to validate data parity before cutover.",
    level: "intermediate",
    codeExample: `pt-table-checksum --host=source-db.internal -u root -p \\
  --replicate=percona.checksums --databases=kolkata_retail`
  },
  {
    question: "What major authentication plugin change occurred in MySQL 8.0 that can break legacy client connections during cross-version migration?",
    shortAnswer: "MySQL 8.0 changed the default authentication plugin from `mysql_native_password` to `caching_sha2_password`.",
    explanation: "Older PHP, Java (pre-8.0 connector), and Python drivers cannot authenticate with `caching_sha2_password` unless updated or configured with `IDENTIFIED WITH mysql_native_password BY '...'`.",
    hint: "Default authentication plugin changed to caching_sha2_password.",
    level: "intermediate",
    codeExample: `ALTER USER 'app_user'@'%' IDENTIFIED WITH mysql_native_password BY 'Password#2026';`
  },
  {
    question: "Why should `SET GLOBAL super_read_only = ON;` be used instead of standard `read_only = ON` on the source server during cutover?",
    shortAnswer: "`read_only` blocks non-administrative users but still allows users with `SUPER` or `SYSTEM_VARIABLES_ADMIN` privileges to write; `super_read_only` blocks ALL users including `SUPER`/`root` from writing.",
    explanation: "Prevents background maintenance scripts or administrative sessions from writing stray transactions to the source during DNS transition.",
    hint: "super_read_only blocks all users including root from writing.",
    level: "expert",
    codeExample: `SET GLOBAL super_read_only = ON;`
  },
  {
    question: "What is the role of Cloud Database Migration Services (e.g. AWS DMS, GCP DMS, Azure DMS)?",
    shortAnswer: "Managed cloud services that automate initial schema/data extraction, establish continuous Change Data Capture (CDC) replication from on-premises sources to cloud databases, and manage cutover orchestration.",
    explanation: "Simplifies cross-cloud and heterogeneous migrations with built-in monitoring, transformation rules, and automated failover.",
    hint: "Managed cloud tools for automated CDC replication and migration orchestration.",
    level: "basic",
    codeExample: `-- AWS DMS: Initial Load + CDC Replication -> AWS RDS / Aurora`
  },
  {
    question: "What default collation change occurred in MySQL 8.0 for the `utf8mb4` character set?",
    shortAnswer: "The default collation changed from `utf8mb4_general_ci` (MySQL 5.7) to `utf8mb4_0900_ai_ci` (based on Unicode 9.0.0 with accent and case insensitivity).",
    explanation: "Upgrading schemas to `utf8mb4_0900_ai_ci` provides accurate multilingual sorting, UCA 9.0 compliance, and significant performance optimizations.",
    hint: "Default collation changed to utf8mb4_0900_ai_ci.",
    level: "intermediate",
    codeExample: `ALTER TABLE kolkata_retail.customers CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;`
  },
  {
    question: "What happens if you attempt a physical file-copy migration (e.g. copying `/var/lib/mysql`) between MySQL 5.7 and MySQL 8.0?",
    shortAnswer: "MySQL 8.0 will fail to start or experience severe dictionary corruption because MySQL 8.0 completely redesigned its internal Data Dictionary into transactional InnoDB tables, eliminating legacy `.frm` files.",
    explanation: "Cross-version upgrades between 5.7 and 8.0 require in-place binary upgrade procedures or logical dump/load migrations.",
    hint: "Fails because MySQL 8.0 replaces legacy .frm files with a transactional data dictionary.",
    level: "expert",
    codeExample: `-- NEVER copy raw 5.7 data files into a MySQL 8.0 data directory!`
  },
  {
    question: "How do you configure GTID Auto-Positioning when establishing replication between on-premises source and target cloud database?",
    shortAnswer: "Execute `CHANGE REPLICATION SOURCE TO SOURCE_AUTO_POSITION = 1;` on the target replica.",
    explanation: "GTID auto-positioning eliminates the need to manually specify binary log file names and byte offsets, automatically synchronizing missing GTID sets.",
    hint: "Use SOURCE_AUTO_POSITION = 1 on the target replica.",
    level: "intermediate",
    codeExample: `CHANGE REPLICATION SOURCE TO
  SOURCE_HOST = 'source.kolkata.internal',
  SOURCE_USER = 'repl_user',
  SOURCE_PASSWORD = 'Password#2026',
  SOURCE_AUTO_POSITION = 1;
START REPLICA;`
  },
  {
    question: "What is the recommended TTL (Time to Live) setting for application database DNS records prior to a scheduled migration cutover?",
    shortAnswer: "Lower the DNS TTL to 5 or 10 seconds at least 48 hours before the migration maintenance window.",
    explanation: "Low TTL ensures that application servers and microservices resolve the new database IP address within seconds after the DNS record is updated.",
    hint: "Lower DNS TTL to 5-10 seconds 48 hours before cutover.",
    level: "basic",
    codeExample: `# Route53 DNS Record:
# db.kolkata.internal CNAME rds-primary.internal TTL=10`
  },
  {
    question: "How does network MTU size and jumbo frames (9000 MTU) affect large multi-terabyte cross-datacenter database migrations?",
    shortAnswer: "Enabling jumbo frames (9000 MTU) reduces packet header overhead and CPU interrupt processing on network interfaces, increasing continuous replication and file transfer throughput by 15-25%.",
    explanation: "Recommended for dedicated 10Gbps/40Gbps direct connect or AWS DirectConnect migration links.",
    hint: "Jumbo frames (9000 MTU) reduce CPU packet overhead and increase transfer speed.",
    level: "expert",
    codeExample: `# Set network interface MTU on Linux:
ip link set dev eth0 mtu 9000`
  },
  {
    question: "What is the Query Cache deprecation in MySQL 8.0, and how does it impact migrations from MySQL 5.7?",
    shortAnswer: "The Query Cache was completely removed in MySQL 8.0 because it caused severe mutex contention on modern multi-core servers; any `query_cache_*` configuration directives in `my.cnf` must be removed before starting MySQL 8.0.",
    explanation: "Leaving obsolete `query_cache_type` or `query_cache_size` parameters in `my.cnf` causes MySQL 8.0 server initialization to abort.",
    hint: "Query cache removed; remove query_cache_* variables from my.cnf before upgrade.",
    level: "intermediate",
    codeExample: `# Remove from my.cnf:
# query_cache_type = 1 ❌
# query_cache_size = 128M ❌`
  },
  {
    question: "What is the purpose of running a Dry-Run Migration in a staging environment before production cutover?",
    shortAnswer: "To measure exact baseline dump/load timings, test DNS switchover mechanics, validate application query compatibility, verify trigger/routine execution, and ensure replication caught up cleanly without errors.",
    explanation: "Dry runs expose configuration gaps, connection timeouts, and missing user permissions before touching production systems.",
    hint: "Validates timing, compatibility, and cutover mechanics without production risk.",
    level: "basic",
    codeExample: `-- Always execute full migration runbook in staging 1 week prior.`
  },
  {
    question: "How do you handle stored procedures and functions with `DEFINER` clauses during cross-server migration to an instance with different administrative users?",
    shortAnswer: "Strip or replace the `DEFINER = \`old_user\`@\`host\`` clauses with `DEFINER = CURRENT_USER` or recreate the required definer accounts on the target server prior to schema import.",
    explanation: "Stored routines with missing DEFINER accounts will fail with `The user specified as a definer ('user'@'host') does not exist` when invoked by applications.",
    hint: "Ensure DEFINER users exist on target or strip DEFINER clauses during dump.",
    level: "intermediate",
    codeExample: `sed -i 's/DEFINER=\`old_admin\`@\`localhost\`/DEFINER=CURRENT_USER/g' schema_routines.sql`
  },
  {
    question: "What is the difference between Heterogeneous Migration and Homogeneous Migration?",
    shortAnswer: "Homogeneous Migration moves data between identical database engines (MySQL to MySQL / Aurora MySQL); Heterogeneous Migration converts schemas and queries between different database engines (e.g. Oracle / PostgreSQL to MySQL).",
    explanation: "Heterogeneous migrations require schema conversion tools (AWS SCT) and application query refactoring.",
    hint: "Homogeneous is MySQL to MySQL; Heterogeneous is different engines (Oracle to MySQL).",
    level: "basic",
    codeExample: `-- Homogeneous: MySQL 5.7 -> MySQL 8.0 / Aurora MySQL
-- Heterogeneous: Oracle 19c -> MySQL 8.0`
  },
  {
    question: "How do you verify replication health and lag on the target cloud replica before initiating cutover?",
    shortAnswer: "Execute `SHOW REPLICA STATUS\\G` and verify `Replica_IO_Running: Yes`, `Replica_SQL_Running: Yes`, and `Seconds_Behind_Source: 0`.",
    explanation: "Both I/O and SQL threads must be operational with zero seconds of lag before locking the source for cutover.",
    hint: "Verify Replica_IO_Running=Yes, Replica_SQL_Running=Yes, and Seconds_Behind_Source=0.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G
-- Replica_IO_Running: Yes
-- Replica_SQL_Running: Yes
-- Seconds_Behind_Source: 0`
  },
  {
    question: "What is the risk of migrating tables that lack Primary Keys in a replication-based migration?",
    shortAnswer: "Tables without primary keys cause extreme replication lag on ROW-based replication because the target replica must perform a full table scan for every single `UPDATE` and `DELETE` event.",
    explanation: "Every table must have a primary key or unique index defined prior to initiating replication migration.",
    hint: "Tables without PKs force full table scans on every replicated UPDATE/DELETE.",
    level: "expert",
    codeExample: `-- Add primary keys to all tables before starting replication migration!`
  },
  {
    question: "How can you minimize SSL/TLS connection latency when replicating data across long-distance geographic regions during cloud migration?",
    shortAnswer: "Enable TCP Keepalive, configure TLS 1.3 with session resumption, and utilize dedicated high-speed cloud interconnects (AWS DirectConnect / Azure ExpressRoute).",
    explanation: "TLS 1.3 reduces the cryptographic handshake from 2 round-trips to 1 round-trip, significantly lowering replication latency.",
    hint: "Use TLS 1.3 and dedicated cloud interconnects for cross-region replication.",
    level: "intermediate",
    codeExample: `[mysqld]
tls_version = TLSv1.3`
  },
  {
    question: "What is an In-Place Upgrade vs a Logical Migration Upgrade for MySQL 8.0?",
    shortAnswer: "In-Place Upgrade replaces the MySQL binaries on the existing server host and runs `mysqld` to automatically upgrade the internal data dictionary; Logical Migration dumps all schemas via SQL/parallel tools and loads them into a freshly installed MySQL 8.0 instance.",
    explanation: "Logical migration is cleaner and provides zero risk to the original server host, whereas in-place upgrade modifies the live data directory.",
    hint: "In-place modifies existing host data directory; logical loads into a clean new instance.",
    level: "intermediate",
    codeExample: `-- Logical Migration: Dump from 5.7 -> Load into fresh 8.0 host.`
  },
  {
    question: "How do you handle Foreign Key constraints during the initial logical baseline import on the target migration server?",
    shortAnswer: "Include `SET foreign_key_checks = 0;` at the top of the import session, and re-enable `SET foreign_key_checks = 1;` after all tables and data have been completely imported.",
    explanation: "Prevents circular foreign key reference errors and drastically speeds up table load order.",
    hint: "Disable foreign_key_checks during import and re-enable post-load.",
    level: "basic",
    codeExample: `SET foreign_key_checks = 0;
-- Import data
SET foreign_key_checks = 1;`
  },
  {
    question: "What is the role of `RESET REPLICA ALL;` on the target database upon completing cutover?",
    shortAnswer: "It deletes the replication metadata connection parameters from the `mysql.slave_relay_log_info` system tables and removes all relay log files, permanently promoting the instance to an independent primary master.",
    explanation: "Ensures the promoted instance does not attempt to reconnect to the old source server on reboot.",
    hint: "Clears replication coordinates and permanently promotes target to primary.",
    level: "intermediate",
    codeExample: `STOP REPLICA;
RESET REPLICA ALL;
SET GLOBAL read_only = OFF;`
  },
  {
    question: "How do you migrate MySQL user accounts and passwords from MySQL 5.7 to MySQL 8.0?",
    shortAnswer: "Use `pt-show-grants` (Percona Toolkit) or `SHOW CREATE USER` / `SHOW GRANTS` statements, ensuring that user passwords and host restrictions are scripted accurately into SQL files.",
    explanation: "Dumping user grants as pure DDL allows reviewing and recreating user permissions cleanly in the MySQL 8.0 data dictionary.",
    hint: "Use pt-show-grants or SHOW GRANTS to extract user definitions.",
    level: "basic",
    codeExample: `pt-show-grants --host=source.internal -u root -p > user_grants.sql
mysql -h target.internal -u root -p < user_grants.sql`
  },
  {
    question: "What is the recommended application rollback procedure if severe bugs are detected 2 hours after cutover?",
    shortAnswer: "1. Set target (new primary) to `read_only = ON`; 2. Wait for Reverse Replication lag to reach 0 on old source; 3. Promote old source (`SET read_only = OFF`); 4. Switch application DNS back to old source.",
    explanation: "Because Reverse Replication kept the old source synchronized with all post-cutover transactions, failing back incurs zero data loss.",
    hint: "Lock new primary -> wait for reverse lag=0 -> promote old source -> switch DNS.",
    level: "expert",
    codeExample: `-- Failback Runbook with Zero Data Loss:
-- 1. On Cloud Target: SET GLOBAL super_read_only = ON;
-- 2. On Old Source: STOP REPLICA; SET GLOBAL read_only = OFF;
-- 3. Route53: Switch DNS back to On-Prem IP.`
  },
  {
    question: "What is the impact of table row format `COMPACT` vs `DYNAMIC` during MySQL 8.0 migration?",
    shortAnswer: "MySQL 8.0 defaults to `ROW_FORMAT=DYNAMIC`, which stores long `VARCHAR`, `BLOB`, and `TEXT` prefixes off-page, improving buffer pool caching and supporting large 3072-byte index key prefixes.",
    explanation: "Legacy `COMPACT` tables from older MySQL 5.5/5.6 versions should be converted to `DYNAMIC` during migration.",
    hint: "DYNAMIC row format stores long columns off-page and supports 3072-byte index prefixes.",
    level: "intermediate",
    codeExample: `ALTER TABLE kolkata_retail.orders ROW_FORMAT = DYNAMIC;`
  },
  {
    question: "Why should `ANALYZE TABLE` be executed across all migrated tables immediately following production cutover?",
    shortAnswer: "To rebuild optimizer index statistics in the fresh MySQL 8.0 data dictionary, preventing slow query execution plans when applications begin querying the new database.",
    explanation: "Freshly imported databases lack updated index cardinality statistics until `ANALYZE TABLE` is run.",
    hint: "Rebuilds optimizer index cardinality statistics to avoid slow query plans.",
    level: "basic",
    codeExample: `mysqlcheck -u root -p --analyze --all-databases`
  },
  {
    question: "What is the primary operational takeaway of Topic 11 in Module 004_004?",
    shortAnswer: "Database migrations require disciplined execution across the 3 archetypes (Cross-Server, Cross-Version, and Cloud): run `util.checkForServerUpgrade()` for pre-upgrade validation, execute the 4-step near-zero-downtime replication cutover, enforce `super_read_only` on source during transition, and always configure Reverse Replication for instant zero-data-loss failback safety.",
    explanation: "Following proven replication-based cutover runbooks transforms high-risk migration events into predictable, sub-minute maintenance transitions with guaranteed rollback safety.",
    hint: "Summarize the 3 archetypes, pre-upgrade checks, 4-step replication cutover, and reverse replication failback.",
    level: "basic",
    codeExample: `-- Master Near-Zero-Downtime Migration Pipeline:
# 1. Capture & Seed:
mydumper -u root -p -B kolkata_retail --threads=8 -o /backups/seed/
myloader -h target-db.internal -u admin -p -B kolkata_retail --threads=8 --directory=/backups/seed/
# 2. Establish Replication:
CHANGE REPLICATION SOURCE TO SOURCE_HOST='source-db.internal', SOURCE_AUTO_POSITION=1;
START REPLICA;
# 3. Cutover (Sub-30s):
SET GLOBAL super_read_only = ON; -- on source
STOP REPLICA; SET GLOBAL read_only = OFF; -- on target
# 4. Reverse Replication:
CHANGE REPLICATION SOURCE TO SOURCE_HOST='target-db.internal', SOURCE_AUTO_POSITION=1; -- on source`
  }
];

export default questions;
