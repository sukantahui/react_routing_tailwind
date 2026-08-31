// topic5_files/topic5_questions.js
// Module 004_006: Replication, High Availability & Failover Topologies
// Topic 5: Configuring Replication Filters: replicate-do-db, replicate-ignore-db, binlog-do-db

const questions = [
  {
    question: "What is the core difference between Source-side replication filtering (`binlog_do_db`) and Replica-side filtering (`replicate_do_db`)?",
    shortAnswer: "Source-side filtering (`binlog_do_db`) discards events *before* writing to the Binary Log, preventing all downstream replicas from receiving the data; Replica-side filtering (`replicate_do_db`) receives full binlog streams but selectively executes only matching events in the local database.",
    explanation: "Replica-side filtering allows different replicas to maintain different subsets of data (e.g. reporting vs billing).",
    hint: "Source filtering stops events from entering binlog; Replica filtering selectively applies events from relay log.",
    level: "basic",
    codeExample: `-- Source my.cnf: binlog_do_db = sales
-- Replica my.cnf: replicate_do_db = sales`
  },
  {
    question: "What dangerous bug occurs when using `binlog_do_db` or `replicate_do_db` with Statement-Based replication (`binlog_format = STATEMENT`)?",
    shortAnswer: "MySQL evaluates filters based on the *currently active database* (`USE db`), so cross-database queries (e.g. `USE inventory; UPDATE sales.orders SET ...;`) are dropped and omitted from replication because the current database (`inventory`) does not match the filter (`sales`).",
    explanation: "This causes silent data divergence between Source and Replica.",
    hint: "Evaluates the default USE database, accidentally dropping cross-database updates.",
    level: "intermediate",
    codeExample: `-- Current DB is inventory:
USE inventory;
-- In STATEMENT mode, this update to 'sales' is DROPPED if binlog_do_db = sales!
UPDATE sales.orders SET status = 'Completed' WHERE id = 101;`
  },
  {
    question: "How does Row-Based Replication (`binlog_format = ROW`) solve the cross-database filtering problem?",
    shortAnswer: "Because in ROW format, every binary log event records the exact schema and table name of the modified table rather than raw SQL text, allowing the filter engine to evaluate the target table accurately regardless of the client's current `USE` database.",
    explanation: "Row-based logging eliminates cross-database filtering bugs entirely.",
    hint: "Records exact table names for each modified row, making filtering 100% deterministic.",
    level: "basic",
    codeExample: `SET GLOBAL binlog_format = 'ROW';`
  },
  {
    question: "What is `replicate_wild_do_table` and how does it differ from `replicate_do_db`?",
    shortAnswer: "`replicate_wild_do_table` filters based on wildcard patterns matching database and table names (e.g. `sales.%` or `finance.trans_%`), evaluating the actual tables affected by the query rather than the default `USE` database.",
    explanation: "`replicate_wild_do_table` is far safer and more predictable than `replicate_do_db`.",
    hint: "Matches database and table patterns using SQL wildcards (% and _).",
    level: "intermediate",
    codeExample: `[mysqld]
replicate_wild_do_table = 'kolkata_retail.%'
replicate_wild_do_table = 'billing.invoices_%'`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS cashiers generated 20GB of temporary audit logs daily in `barrackpore_store.temp_audit_logs`. How did Susmita exclude this table from the reporting replica to save disk?",
    shortAnswer: "She configured `replicate_wild_ignore_table = 'barrackpore_store.temp_audit_%'`, preventing the replica from writing transient audit records to local tablespaces while replicating all ₹1.2 Crores in sales data.",
    explanation: "Saved 20GB of replica disk storage daily without affecting transaction replication.",
    hint: "Configured replicate_wild_ignore_table for temp_audit_% on the replica.",
    level: "moderate",
    codeExample: `# Barrackpore Wildcard Filter:
CHANGE REPLICATION FILTER 
  REPLICATE_WILD_IGNORE_TABLE = ('barrackpore_store.temp_audit_%');`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu dynamically reconfigure replication filters on an analytics replica without restarting the MySQL server?",
    shortAnswer: "He paused the SQL thread (`STOP REPLICA SQL_THREAD;`), executed `CHANGE REPLICATION FILTER REPLICATE_DO_DB = (kolkata_ledger, reporting_db);`, and resumed execution (`START REPLICA SQL_THREAD;`) in under 2 seconds across ₹500 Crores in banking data.",
    explanation: "MySQL 8.0 allows online dynamic replication filter reconfiguration without server reboots.",
    hint: "Stopped SQL thread, executed CHANGE REPLICATION FILTER, and restarted SQL thread.",
    level: "expert",
    codeExample: `STOP REPLICA SQL_THREAD;
CHANGE REPLICATION FILTER REPLICATE_DO_DB = (kolkata_ledger, reporting_db);
START REPLICA SQL_THREAD;`
  },
  {
    question: "What is `replicate_rewrite_db` and when is it used in production?",
    shortAnswer: "It rewrites database names on the replica, replicating tables from `source_db` on the primary into a differently named `replica_db` on the replica (e.g. `replicate_rewrite_db = 'prod_finance->staging_finance'`).",
    explanation: "Allows developers to replicate production data into staging or reporting databases with different names.",
    hint: "Renames database schemas during replication (source_db → replica_db).",
    level: "intermediate",
    codeExample: `[mysqld]
replicate_rewrite_db = 'kolkata_production->kolkata_analytics'`
  },
  {
    question: "What is `replicate_wild_ignore_table` and what is a common use case?",
    shortAnswer: "A replica filter rule that instructs the SQL applier thread to ignore tables matching a wildcard pattern (e.g. `replicate_wild_ignore_table = '%.temp_%'`), commonly used to skip temporary staging tables, cache tables, or ETL scratch data.",
    explanation: "Keeps replica disk storage focused exclusively on durable tables.",
    hint: "Ignores tables matching wildcard patterns (e.g. %.temp_%).",
    level: "basic",
    codeExample: `replicate_wild_ignore_table = '%.cache_%'`
  },
  {
    question: "Why should `binlog_do_db` and `binlog_ignore_db` generally be AVOIDED on production Source servers?",
    shortAnswer: "Because filtering on the Source permanently omits events from the Binary Log, preventing point-in-time recovery (PITR) for filtered tables and making it impossible for other downstream replicas or backup tools to ever receive that data.",
    explanation: "Best practice is to log everything on the Source and filter selectively on individual replicas.",
    hint: "Omits data from binlogs permanently, breaking full backups and PITR disaster recovery.",
    level: "intermediate",
    codeExample: `-- Avoid Source-level binlog_do_db; log all tables to binlog for DR safety.`
  },
  {
    question: "How do you verify the active replication filter rules on a replica in MySQL 8.0?",
    shortAnswer: "Run `SHOW REPLICA STATUS\\G` and inspect `Replicate_Do_DB`, `Replicate_Ignore_DB`, `Replicate_Do_Table`, `Replicate_Ignore_Table`, `Replicate_Wild_Do_Table`, `Replicate_Wild_Ignore_Table`, and `Replicate_Rewrite_DB`.",
    explanation: "Displays all compiled filtering rules currently enforced by the replica SQL thread.",
    hint: "Inspect Replicate_* filter fields in SHOW REPLICA STATUS.",
    level: "basic",
    codeExample: `SHOW REPLICA STATUS\\G
-- Replicate_Do_DB: kolkata_retail
-- Replicate_Wild_Ignore_Table: kolkata_retail.audit_%`
  },
  {
    question: "Can multiple database names be specified in a single `CHANGE REPLICATION FILTER REPLICATE_DO_DB` command?",
    shortAnswer: "Yes, by passing a comma-separated list enclosed in parentheses: `CHANGE REPLICATION FILTER REPLICATE_DO_DB = (db1, db2, db3);`.",
    explanation: "Configures multiple whitelist databases in a single atomic command.",
    hint: "Enclose comma-separated database names in parentheses: (db1, db2, db3).",
    level: "basic",
    codeExample: `CHANGE REPLICATION FILTER REPLICATE_DO_DB = (sales, inventory, payments);`
  },
  {
    question: "What happens if a query updates a table matching `replicate_do_table` that has a foreign key referencing a table excluded by `replicate_ignore_table`?",
    shortAnswer: "The replica's SQL thread fails with `ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails`, halting replication.",
    explanation: "Filtering must include all referenced parent tables to maintain relational integrity.",
    hint: "Foreign key checks fail if parent tables are excluded from replication.",
    level: "expert",
    codeExample: `-- Always replicate both parent and child tables together to satisfy foreign keys.`
  },
  {
    question: "How do you clear all active replication filters dynamically on a replica?",
    shortAnswer: "Execute `STOP REPLICA SQL_THREAD; CHANGE REPLICATION FILTER REPLICATE_DO_DB = (), REPLICATE_WILD_DO_TABLE = (); START REPLICA SQL_THREAD;`.",
    explanation: "Passing empty parentheses `()` clears that specific filter rule immediately.",
    hint: "Pass empty parentheses () in CHANGE REPLICATION FILTER.",
    level: "intermediate",
    codeExample: `STOP REPLICA SQL_THREAD;
CHANGE REPLICATION FILTER REPLICATE_DO_DB = (), REPLICATE_WILD_IGNORE_TABLE = ();
START REPLICA SQL_THREAD;`
  },
  {
    question: "What is `replicate_ignore_db` in replica configuration?",
    shortAnswer: "A blacklist filter that instructs the replica to execute all database events EXCEPT those targeting the specified database schema.",
    explanation: "Replicates all databases while excluding specific test or scratch schemas.",
    hint: "Blacklist filter excluding specific database schemas from replication.",
    level: "basic",
    codeExample: `[mysqld]
replicate_ignore_db = test_scratch_db`
  },
  {
    question: "What is `replicate_do_table` in MySQL replica configuration?",
    shortAnswer: "An exact table whitelist filter that instructs the replica to execute events only for the specified table name (e.g. `replicate_do_table = 'sales.orders'`).",
    explanation: "Limits replication to a single specific table.",
    hint: "Exact table whitelist filter.",
    level: "basic",
    codeExample: `replicate_do_table = 'sales.orders'`
  },
  {
    question: "What happens if both `replicate_wild_do_table` and `replicate_wild_ignore_table` match the same table?",
    shortAnswer: "The ignore rule takes precedence, and the table is ignored (excluded from replication).",
    explanation: "Ignore rules override whitelist rules when conflicts occur.",
    hint: "Ignore rules take precedence over do rules.",
    level: "intermediate",
    codeExample: `-- If do = 'sales.%' and ignore = 'sales.temp_%' → sales.temp_orders is IGNORED.`
  },
  {
    question: "What is the performance benefit of using replication filters on dedicated reporting replicas?",
    shortAnswer: "It reduces replica disk I/O, saves NVMe storage space, and shrinks buffer pool memory consumption by not storing massive historical audit tables or high-frequency telemetry scratch tables.",
    explanation: "Keeps reporting replicas lean and fast for analytical queries.",
    hint: "Reduces disk I/O and saves buffer pool RAM by excluding non-essential tables.",
    level: "basic",
    codeExample: `-- Reporting replica stores only analytical and aggregation tables.`
  },
  {
    question: "How do replication filters interact with GTID replication (`gtid_mode = ON`)?",
    shortAnswer: "When a transaction is filtered out on the replica, the SQL thread does not execute the SQL mutations, but it **still records the transaction's GTID in `gtid_executed`** (as an empty commit) to maintain continuous GTID sequence tracking.",
    explanation: "Prevents replication gaps and ensures consistent GTID sets across all nodes.",
    hint: "Filtered transactions are recorded as empty commits in gtid_executed to prevent sequence gaps.",
    level: "expert",
    codeExample: `-- Filtered transactions still increment gtid_executed to maintain sequence integrity.`
  },
  {
    question: "What happens if a DDL statement (e.g. `ALTER TABLE`) is executed on a table excluded by `replicate_wild_ignore_table`?",
    shortAnswer: "The replica's SQL thread skips the DDL statement without executing schema changes on the replica, while continuing to replicate other tables.",
    explanation: "Protects replica schemas from modifications on ignored tables.",
    hint: "Skips the DDL statement on the ignored table and continues replication.",
    level: "intermediate",
    codeExample: `-- ALTER TABLE ignored_db.table ADD COLUMN x INT; → Skipped on replica.`
  },
  {
    question: "How do you specify multiple `replicate_wild_ignore_table` rules in `my.cnf`?",
    shortAnswer: "Add multiple `replicate-wild-ignore-table` configuration lines under `[mysqld]` in `my.cnf`.",
    explanation: "Each line adds another wildcard pattern to the active ignore filter.",
    hint: "Add multiple replicate-wild-ignore-table lines in my.cnf.",
    level: "basic",
    codeExample: `[mysqld]
replicate-wild-ignore-table = 'analytics.%'
replicate-wild-ignore-table = '%.audit_%'
replicate-wild-ignore-table = '%.temp_%'`
  },
  {
    question: "What is `replicate_same_server_id` and why is it disabled by default (`0`)?",
    shortAnswer: "When set to `0` (default), a replica automatically discards any replication event that carries its own `server_id`, preventing infinite replication loops in circular or multi-master topologies.",
    explanation: "Core loop prevention mechanism in MySQL replication.",
    hint: "Prevents infinite replication loops by discarding events carrying the server's own server_id.",
    level: "expert",
    codeExample: `SHOW VARIABLES LIKE 'replicate_same_server_id'; -- Value: OFF`
  },
  {
    question: "What is the recommended filter rule when replicating only one specific database schema in a multi-tenant cluster?",
    shortAnswer: "`replicate_wild_do_table = 'tenant_db.%'`.",
    explanation: "Using wildcard table matching (`tenant_db.%`) ensures that all tables within that database are replicated cleanly regardless of the client's default connection database.",
    hint: "Use replicate_wild_do_table = 'tenant_db.%' for safe schema replication.",
    level: "basic",
    codeExample: `replicate_wild_do_table = 'tenant_kolkata.%'`
  },
  {
    question: "Can `replicate_rewrite_db` be used with `CHANGE REPLICATION FILTER` dynamically?",
    shortAnswer: "Yes, MySQL 8.0 allows setting `REPLICATE_REWRITE_DB = ((db1, db2), (db3, db4))` dynamically via `CHANGE REPLICATION FILTER`.",
    explanation: "Provides online database rewriting without restarting MySQL.",
    hint: "Yes, supported dynamically via CHANGE REPLICATION FILTER.",
    level: "intermediate",
    codeExample: `STOP REPLICA SQL_THREAD;
CHANGE REPLICATION FILTER REPLICATE_REWRITE_DB = ((source_db, replica_db));
START REPLICA SQL_THREAD;`
  },
  {
    question: "What happens if a stored procedure on the Source modifies a table in an ignored database and a table in a replicated database?",
    shortAnswer: "In Row-Based Replication (`binlog_format = ROW`), the row modification to the replicated table is applied, while the row modification to the ignored table is skipped.",
    explanation: "ROW format applies filtering to each individual table modification independently.",
    hint: "ROW format evaluates each table modification independently.",
    level: "expert",
    codeExample: `-- Replicated table updates are applied; ignored table updates are skipped.`
  },
  {
    question: "What is the risk of using replication filters on a replica that may be promoted to primary during failover?",
    shortAnswer: "Because the replica contains only a subset of data (filtered tables are missing), promoting it to primary will result in permanent data loss for all excluded databases and tables.",
    explanation: "Failover candidate standby replicas must NEVER have replication filters enabled.",
    hint: "Standby failover replicas must NOT use filters because missing tables would cause data loss.",
    level: "intermediate",
    codeExample: `-- Rule: Standby HA replicas must have zero filters; only reporting/analytics replicas should filter.`
  },
  {
    question: "How do you inspect replication filter definitions using `performance_schema` tables?",
    shortAnswer: "Query `performance_schema.replication_applier_filters`: `SELECT * FROM performance_schema.replication_applier_filters;`.",
    explanation: "Provides structured relational output of all active replication filters.",
    hint: "Query performance_schema.replication_applier_filters.",
    level: "expert",
    codeExample: `SELECT FILTER_NAME, FILTER_RULE, CONFIGURED_BY 
FROM performance_schema.replication_applier_filters;`
  },
  {
    question: "What is `replicate_ignore_table`?",
    shortAnswer: "An exact table blacklist filter that tells the replica to ignore events matching a specific table name (e.g. `replicate_ignore_table = 'sales.sessions'`).",
    explanation: "Excludes a single specific table from replication.",
    hint: "Exact table blacklist filter.",
    level: "basic",
    codeExample: `replicate_ignore_table = 'sales.sessions'`
  },
  {
    question: "Why should `replicate_do_db` and `replicate_do_table` NEVER be used together on the same replica?",
    shortAnswer: "Because mixing database-level and table-level filters creates complex evaluation precedence rules that often result in unexpected query drops and subtle data divergence.",
    explanation: "Best practice is to standardize exclusively on `replicate_wild_do_table` and `replicate_wild_ignore_table`.",
    hint: "Mixing do_db and do_table creates confusing precedence rules; standardize on wild rules.",
    level: "intermediate",
    codeExample: `-- Standardize exclusively on replicate_wild_do_table.`
  },
  {
    question: "What happens if a transaction modifying an ignored table is replayed via `mysqlbinlog`?",
    shortAnswer: "`mysqlbinlog` extracts all events unless filtered with `--database=db_name`; running the output against the replica will apply the ignored changes directly via standard SQL connections.",
    explanation: "`mysqlbinlog` bypasses internal replication applier filters unless command-line flags are specified.",
    hint: "mysqlbinlog bypasses internal replication filters unless command-line database filters are used.",
    level: "basic",
    codeExample: `mysqlbinlog --database=kolkata_retail binlog.000001 | mysql -u root -p`
  },
  {
    question: "What is the primary operational takeaway of Topic 5 in Module 004_006?",
    shortAnswer: "Replication filters allow selective data replication across enterprise clusters: prefer **Replica-side wildcard rules** (`replicate_wild_do_table = 'db.%'` and `replicate_wild_ignore_table = '%.temp_%'`) over Source-side `binlog_do_db` to protect disaster recovery backups, enforce `binlog_format = ROW` to eliminate cross-database filtering bugs, reconfigure rules dynamically using `CHANGE REPLICATION FILTER`, and ensure failover candidate replicas maintain 100% unfiltered data.",
    explanation: "Mastering replication filters enables building lightweight reporting replicas and multi-tenant data pipelines without sacrificing core database integrity.",
    hint: "Summarize Replica-side wildcard rules, ROW binlog requirement, dynamic CHANGE REPLICATION FILTER, and avoiding filters on failover standbys.",
    level: "basic",
    codeExample: `-- Master Dynamic Filtering Recipe:
# 1. Pause Applier:
STOP REPLICA SQL_THREAD;

# 2. Configure Wildcard Rules Online:
CHANGE REPLICATION FILTER 
  REPLICATE_WILD_DO_TABLE = ('kolkata_retail.%', 'billing.%'),
  REPLICATE_WILD_IGNORE_TABLE = ('%.audit_%', '%.temp_%');

# 3. Resume Applier:
START REPLICA SQL_THREAD;

# 4. Verify:
SHOW REPLICA STATUS\\G`
  }
];

export default questions;
