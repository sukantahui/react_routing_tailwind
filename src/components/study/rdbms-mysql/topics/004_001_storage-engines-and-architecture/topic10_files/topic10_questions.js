// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is the primary function of `ANALYZE TABLE table_name;` in MySQL?",
    shortAnswer: "It gathers and updates **Index Cardinality Statistics** in the data dictionary (`mysql.innodb_index_stats`), providing the Cost-Based Optimizer (CBO) with accurate row distribution data to choose optimal index execution plans.",
    explanation: "Does not modify or rebuild table data; runs fast statistical sampling.",
    hint: "Updates index cardinality statistics to help the Cost-Based Optimizer choose optimal query plans.",
    level: "basic",
    codeExample: "ANALYZE TABLE customer_orders;"
  },
  {
    question: "What happens if an InnoDB table has severely stale index statistics?",
    shortAnswer: "The Cost-Based Optimizer (CBO) will make incorrect cost estimates, potentially choosing a **Full Table Scan (access type ALL)** instead of using an available, highly-selective B+ tree index, causing massive query slowdowns.",
    explanation: "Running `ANALYZE TABLE` instantly refreshes statistics and fixes plan regressions.",
    hint: "The optimizer makes bad plan choices, such as doing full table scans instead of using indexes.",
    level: "basic"
  },
  {
    question: "What does `CHECK TABLE table_name;` do in MySQL?",
    shortAnswer: "It scans the table's data and index pages, validating B+ tree pointer consistency, verifying page CRC32 checksums, and confirming that secondary index records match clustered index primary keys.",
    explanation: "Essential diagnostic command for detecting table and filesystem corruption.",
    hint: "Validates B+ tree pointer consistency, page checksums, and index integrity.",
    level: "basic",
    codeExample: "CHECK TABLE customer_orders EXTENDED;"
  },
  {
    question: "What is the difference between `CHECK TABLE ... QUICK` and `CHECK TABLE ... EXTENDED`?",
    shortAnswer: "- **QUICK**: Only checks that index tree branches are linked properly without scanning individual data rows (fastest).\n- **EXTENDED**: Performs a comprehensive verification, reading every single data row and matching it against all secondary indexes (slowest, most thorough).",
    explanation: "QUICK is suitable for routine health checks; EXTENDED is used during disaster diagnosis.",
    hint: "QUICK checks tree links only; EXTENDED verifies every data row against all secondary indexes.",
    level: "expert"
  },
  {
    question: "What does `OPTIMIZE TABLE table_name;` accomplish for an InnoDB table?",
    shortAnswer: "It performs an **Online Table Rebuild**: compacts active rows into clean 93% full pages, rebuilds all secondary indexes in sorted order, reclaims unused dead space (`data_free`), and shrinks the physical `.ibd` file on disk.",
    explanation: "Eliminates fragmentation and returns storage to the host OS.",
    hint: "Rebuilds the table online, compacts pages, eliminates dead space, and shrinks the .ibd file.",
    level: "basic"
  },
  {
    question: "Why does running `REPAIR TABLE table_name;` on an InnoDB table output `Table does not support repair`?",
    shortAnswer: "Because `REPAIR TABLE` is a legacy command designed exclusively for MyISAM and ARCHIVE tables; InnoDB uses automatic **Crash Recovery (WAL Redo Log)** and **Online Table Rebuilds (`OPTIMIZE TABLE`)** instead.",
    explanation: "MySQL automatically directs InnoDB users to run OPTIMIZE TABLE or ALTER TABLE.",
    hint: "REPAIR TABLE is for legacy MyISAM/ARCHIVE; InnoDB uses automatic crash recovery and OPTIMIZE TABLE.",
    level: "basic"
  },
  {
    question: "Where are persistent index statistics stored in MySQL 8.0?",
    shortAnswer: "In internal transactional tables: `mysql.innodb_table_stats` and `mysql.innodb_index_stats`.",
    explanation: "Persisted across server restarts so the optimizer doesn't need to resample on boot.",
    hint: "Stored in mysql.innodb_table_stats and mysql.innodb_index_stats.",
    level: "expert",
    codeExample: "SELECT database_name, table_name, index_name, stat_name, stat_value, stat_description\nFROM mysql.innodb_index_stats\nWHERE table_name = 'students';"
  },
  {
    question: "What is the purpose of `innodb_stats_persistent = ON` (default in MySQL)?",
    shortAnswer: "It ensures that index statistics are saved permanently in the `mysql.innodb_*_stats` tables, preventing unexpected execution plan fluctuations caused by automatic transient sampling on server restarts.",
    explanation: "Provides stable, predictable query execution plans over time.",
    hint: "Persists index statistics to disk, preventing query plan fluctuations across restarts.",
    level: "expert"
  },
  {
    question: "What does `innodb_stats_persistent_sample_pages` configure?",
    shortAnswer: "The number of random index pages sampled during an `ANALYZE TABLE` operation (default: **20 pages**); increasing this (e.g. to 64 or 100) improves statistics accuracy on skewed multi-gigabyte tables.",
    explanation: "Tuning sample size balances `ANALYZE TABLE` execution speed against statistical accuracy.",
    hint: "Number of random index pages sampled during ANALYZE TABLE (default: 20).",
    level: "expert"
  },
  {
    question: "What is the function of the `CHECK TABLE ... FOR UPGRADE` command?",
    shortAnswer: "It checks whether existing tables contain incompatible data types, deprecated collision collations, or legacy keywords that would prevent a clean MySQL major version upgrade (e.g. from 5.7 to 8.0).",
    explanation: "Mandatory pre-upgrade verification step.",
    hint: "Verifies whether tables are compatible with a new MySQL major version upgrade.",
    level: "basic"
  },
  {
    question: "How do you run automated health checks across all databases using the `mysqlcheck` utility?",
    shortAnswer: "`mysqlcheck -u root -p --check --all-databases`",
    explanation: "Scans all schemas and reports any corrupted or degraded tables.",
    hint: "mysqlcheck --check --all-databases",
    level: "basic"
  },
  {
    question: "How do you run automated statistics updates across all databases using `mysqlcheck`?",
    shortAnswer: "`mysqlcheck -u root -p --analyze --all-databases`",
    explanation: "Runs `ANALYZE TABLE` across all tables on the server.",
    hint: "mysqlcheck --analyze --all-databases",
    level: "basic"
  },
  {
    question: "How do you run automated defragmentation across all databases using `mysqlcheck`?",
    shortAnswer: "`mysqlcheck -u root -p --optimize --all-databases`",
    explanation: "Executes `OPTIMIZE TABLE` across all tables on the instance.",
    hint: "mysqlcheck --optimize --all-databases",
    level: "basic"
  },
  {
    question: "Does `ANALYZE TABLE` acquire an exclusive write lock on InnoDB tables?",
    shortAnswer: "No! On InnoDB tables, `ANALYZE TABLE` operates non-blockingly with a **light read lock** that samples a few dozen pages in memory, allowing live concurrent `SELECT`, `INSERT`, `UPDATE`, and `DELETE` traffic to proceed normally.",
    explanation: "Executes in a few milliseconds without locking out users.",
    hint: "No, it takes a light sampling read lock and allows concurrent live write traffic.",
    level: "basic"
  },
  {
    question: "What triggers automatic background statistics updates in InnoDB?",
    shortAnswer: "When `innodb_stats_auto_recalc = ON` (default), InnoDB automatically triggers background statistics recalculation whenever more than **10% of the table's rows** have been modified by DML.",
    explanation: "Keeps statistics fresh automatically as tables grow.",
    hint: "Automatically recalculates statistics when >10% of rows are modified.",
    level: "expert"
  },
  {
    question: "What is 'Index Cardinality'?",
    shortAnswer: "An estimate of the number of **unique values** stored in an index column; higher cardinality means higher uniqueness (selectivity), which guides the optimizer to choose index lookups over full table scans.",
    explanation: "Cardinality = Number of distinct values in the index.",
    hint: "An estimate of the number of unique distinct values in an indexed column.",
    level: "basic"
  },
  {
    question: "How can you view the cardinality of every index on a table?",
    shortAnswer: "`SHOW INDEX FROM table_name;`",
    explanation: "Displays index names, column sequences, non-unique flags, and estimated cardinality.",
    hint: "SHOW INDEX FROM table_name;",
    level: "basic",
    codeExample: "SHOW INDEX FROM customer_orders;"
  },
  {
    question: "What is the danger of running `OPTIMIZE TABLE` on multiple multi-gigabyte tables simultaneously in parallel?",
    shortAnswer: "It generates massive **disk I/O saturation and CPU contention**, which can exhaust storage bandwidth and cause application query timeouts.",
    explanation: "Always run `OPTIMIZE TABLE` sequentially during low-traffic maintenance windows.",
    hint: "Saturates disk I/O bandwidth and CPU, potentially causing application timeouts.",
    level: "expert"
  },
  {
    question: "What status message indicates that `CHECK TABLE` completed successfully with no errors?",
    shortAnswer: "`Msg_type: status`, `Msg_text: OK`.",
    explanation: "Confirms that the table's B+ tree structure and checksums are completely healthy.",
    hint: "Msg_text: OK",
    level: "basic"
  },
  {
    question: "What should a DBA do if `CHECK TABLE` reports `Msg_type: error` and `Corrupt page` on an InnoDB table?",
    shortAnswer: "1) Check if the server restarts cleanly with automatic Redo/Doublewrite self-healing; 2) If persistent, start with `innodb_force_recovery = 1..6` in read-only mode, export data via `mysqldump`, and restore into a fresh table.",
    explanation: "Standard disaster recovery escalation runbook.",
    hint: "Attempt restart for doublewrite self-healing; use innodb_force_recovery to dump data if damaged.",
    level: "expert"
  },
  {
    question: "What is the difference between `CHECK TABLE ... FAST` and `CHECK TABLE ... CHANGED`?",
    shortAnswer: "- **FAST**: Only checks tables that were not closed properly.\n- **CHANGED**: Only checks tables that have been modified since the last check or were closed improperly.",
    explanation: "Allows skipping already-validated, unmodified tables during automated cron scripts.",
    hint: "FAST checks improperly closed tables; CHANGED checks modified tables since last check.",
    level: "expert"
  },
  {
    question: "Why should `ANALYZE TABLE` be executed immediately after a massive bulk data import?",
    shortAnswer: "Because importing millions of rows changes table cardinality drastically; without `ANALYZE TABLE`, the optimizer may continue to assume the table is empty or tiny, choosing inefficient query execution plans.",
    explanation: "Ensures the optimizer immediately recognizes the new dataset size.",
    hint: "Informs the optimizer of the new data volume to prevent poor execution plans.",
    level: "basic"
  },
  {
    question: "What is the `innodb_stats_on_metadata` parameter in older MySQL versions?",
    shortAnswer: "A legacy parameter that recalculated index statistics every time a metadata query (`SHOW TABLE STATUS` or `SHOW INDEX`) was run, causing massive I/O stalls; in modern MySQL 8.0, it is deprecated and permanently `OFF`.",
    explanation: "Replaced by persistent statistics tables.",
    hint: "Legacy parameter that caused I/O stalls during metadata queries; permanently OFF in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "Can `ANALYZE TABLE` be executed on a specific partition of a partitioned table?",
    shortAnswer: "Yes! `ALTER TABLE table_name ANALYZE PARTITION p2025;`",
    explanation: "Allows targeted statistics gathering on individual high-activity partitions without scanning the entire table.",
    hint: "ALTER TABLE tbl ANALYZE PARTITION part_name;",
    level: "expert",
    codeExample: "ALTER TABLE telemetry_logs ANALYZE PARTITION p_2026_01;"
  },
  {
    question: "What is the role of `innodb_stats_method`?",
    shortAnswer: "It determines how `NULL` values are treated when calculating index cardinality (`nulls_equal`, `nulls_unequal`, `nulls_ignored`).",
    explanation: "Configures whether multiple NULLs are treated as duplicates or distinct values.",
    hint: "Determines how NULL values are treated when computing index cardinality statistics.",
    level: "expert"
  },
  {
    question: "What is the difference in purpose between `CHECK TABLE` and `ANALYZE TABLE`?",
    shortAnswer: "- `CHECK TABLE`: Verifies **physical structural health and data integrity** (finds corruption).\n- `ANALYZE TABLE`: Gathers **statistical distribution estimates** for the query optimizer.",
    explanation: "CHECK is for reliability diagnostics; ANALYZE is for query performance optimization.",
    hint: "CHECK verifies structural integrity; ANALYZE gathers statistics for optimizer planning.",
    level: "basic"
  },
  {
    question: "Why is `mysqlcheck` preferred over running manual SQL maintenance scripts in enterprise cron jobs?",
    shortAnswer: "Because `mysqlcheck` handles multi-threaded parallelism (`--parallel`), skips non-standard engines, formats summary output cleanly, and handles database authentication automatically from configuration files (`~/.my.cnf`).",
    explanation: "Standard enterprise automation utility.",
    hint: "Provides command-line automation, parallel execution, and standardized summary logging.",
    level: "basic"
  },
  {
    question: "What happens if an `OPTIMIZE TABLE` command is interrupted by a network timeout in the client?",
    shortAnswer: "The server continues executing the online rebuild in the background until completion; client disconnection does NOT abort the server-side DDL operation.",
    explanation: "Server-side DDL processes complete independently of client connection drops.",
    hint: "The rebuild continues on the server until complete; client timeout does not cancel it.",
    level: "expert"
  },
  {
    question: "How do you verify whether index statistics are currently locked for a table?",
    shortAnswer: "Check `mysql.innodb_table_stats` or execute `SELECT table_name, stats_auto_recalc FROM information_schema.innodb_tables;` (statistics can be locked via `ALTER TABLE tbl STATS_AUTO_RECALC = 0`).",
    explanation: "Locking statistics prevents optimizer plan changes in critical production environments.",
    hint: "Check STATS_AUTO_RECALC in information_schema.innodb_tables.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 10 in Module 004_001?",
    shortAnswer: "Table maintenance commands provide essential operational levers: `ANALYZE TABLE` refreshes index statistics for optimal query plans, `CHECK TABLE` validates B+ tree structural integrity, `OPTIMIZE TABLE` reclaims dead space and defragments storage, and `mysqlcheck` automates these routines across the entire database fleet.",
    explanation: "Regular maintenance keeps databases fast, compact, and free from silent corruption.",
    hint: "Mastery of ANALYZE, CHECK, OPTIMIZE, and mysqlcheck for proactive database maintenance.",
    level: "basic"
  }
];

export default questions;
