// topic4_files/topic4_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 4: Restoring Databases from mysqldump SQL Files and Handling Foreign Key Checks During Import

const questions = [
  {
    question: "How do you restore a `mysqldump` file from the command line when the dump was created WITH the `--databases` flag?",
    shortAnswer: "Execute `mysql -u root -p < backup.sql` (no target database name is needed because `CREATE DATABASE` and `USE` statements are embedded in the file).",
    explanation: "Because the `--databases` option places `CREATE DATABASE IF NOT EXISTS` and `USE <dbname>;` statements inside the dump header, the MySQL client automatically switches to the correct schema upon execution.",
    hint: "No database name is required on the CLI when --databases was used.",
    level: "basic",
    codeExample: `mysql -u root -p < /backups/kolkata_services.sql`
  },
  {
    question: "How do you restore a `mysqldump` file from the command line when the dump was created for a single database WITHOUT the `--databases` flag?",
    shortAnswer: "Create the target database first (if it does not exist), and pass the database name on the CLI: `mysql -u root -p target_db < backup.sql`.",
    explanation: "Without `--databases`, the SQL dump contains only table creation DDL and insert statements. If you do not specify a target database, MySQL returns `ERROR 1046 (3D000): No database selected`.",
    hint: "Specify the target database name as an argument to mysql.",
    level: "basic",
    codeExample: `mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS kolkata_ecommerce;"
mysql -u root -p kolkata_ecommerce < /backups/ecommerce.sql`
  },
  {
    question: "Why do logical SQL restore operations fail if Foreign Key Checks are NOT disabled during import?",
    shortAnswer: "Because `mysqldump` processes tables in alphabetical order; if a child table (e.g. `order_items`) is imported before its parent table (`orders`), inserting rows referencing non-existent parent keys causes foreign key violation errors.",
    explanation: "Circular or unordered foreign key relationships cannot be resolved sequentially without temporarily bypassing constraint validation during the bulk load.",
    hint: "Alphabetical table imports cause child tables to be created before parent tables.",
    level: "basic",
    codeExample: `-- mysqldump automatically disables foreign key checks at the top:
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;`
  },
  {
    question: "How does `mysqldump` automatically handle Foreign Key and Unique Check disabling and restoring?",
    shortAnswer: "It prepends `SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;` and `SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;` at the start of the file, and restores their original values at the end.",
    explanation: "This guarantees that constraints are disabled during row insertion for speed and dependency resolution, but re-enabled for future transactions once the restore completes.",
    hint: "Saves original variable state at top and restores it at the bottom.",
    level: "intermediate",
    codeExample: `-- Top of file:
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
-- ... table DDL and INSERT statements ...
-- Bottom of file:
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;`
  },
  {
    question: "How can you decompress and restore a `.sql.zst` or `.sql.gz` backup file directly without writing an uncompressed file to disk?",
    shortAnswer: "Pipe the streaming decompression tool directly into the `mysql` client (`zstd -dc backup.sql.zst | mysql -u root -p` or `gunzip < backup.sql.gz | mysql -u root -p`).",
    explanation: "Direct network or memory piping eliminates the need for extra disk space to hold hundreds of gigabytes of uncompressed text.",
    hint: "Pipe zstd -dc or gunzip directly into mysql.",
    level: "basic",
    codeExample: `zstd -dc /backups/kolkata_retail_2026.sql.zst | mysql -u root -p`
  },
  {
    question: "How do you monitor real-time restore progress and throughput (MB/s) on large SQL dump files?",
    shortAnswer: "Pipe the dump file through the `pv` (Pipe Viewer) utility: `pv backup.sql | mysql -u root -p dbname`.",
    explanation: "`pv` displays a real-time progress bar, transfer rate (MB/s), total bytes transferred, and estimated time of completion (ETA), allowing DBAs to report exact RTO progress during disaster recovery.",
    hint: "Use the pv (Pipe Viewer) command-line utility.",
    level: "intermediate",
    codeExample: `pv /backups/large_bank_dump.sql | mysql -u root -p kolkata_bank`
  },
  {
    question: "What 4 session optimizations can accelerate a large logical SQL dump restore by up to 10x?",
    shortAnswer: "1. `SET foreign_key_checks = 0;` 2. `SET unique_checks = 0;` 3. `SET sql_log_bin = 0;` 4. `SET autocommit = 0;`.",
    explanation: "Disabling constraint validation, skipping binary logging on target replicas, and grouping inserts into large transactional commits drastically reduces disk I/O and CPU overhead.",
    hint: "Disable foreign keys, unique checks, binary logging, and enable bulk autocommit=0.",
    level: "expert",
    codeExample: `SET foreign_key_checks = 0;
SET unique_checks = 0;
SET sql_log_bin = 0;
SET autocommit = 0;
SOURCE /backups/massive_dump.sql;
COMMIT;
SET foreign_key_checks = 1;
SET unique_checks = 1;
SET sql_log_bin = 1;
SET autocommit = 1;`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, a restore of a 20GB backup was taking over 3 hours. How did Mamata reduce the restore time to 12 minutes?",
    shortAnswer: "She set `SET sql_log_bin = 0;` and temporarily configured `innodb_flush_log_at_trx_commit = 2` on the target restore server during import.",
    explanation: "Skipping binlog writes and relaxing redo log disk flushes from per-commit to 1-second intervals eliminated disk I/O wait states during bulk inserts.",
    hint: "Disabled binlog generation and relaxed redo log flushing during initial load.",
    level: "moderate",
    codeExample: `-- Temporary optimization on restore instance:
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
-- Run restore...
SET GLOBAL innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata bank, an accidental `DROP TABLE customer_kyc` occurred. They had a 100GB full instance dump. How did Debangshu extract and restore ONLY the `customer_kyc` table without restoring all 100GB?",
    shortAnswer: "He used `sed` to extract the specific table's DDL and `INSERT` statements into a dedicated SQL file: `sed -n -e '/DROP TABLE.*\`customer_kyc\`/,/UNLOCK TABLES/p' full_dump.sql > kyc_only.sql`.",
    explanation: "Extracting only the target table avoided 4 hours of full database restoration, restoring the KYC table in 90 seconds.",
    hint: "Used sed to extract the specific table's DDL and DML block from the dump file.",
    level: "expert",
    codeExample: `sed -n -e '/DROP TABLE.*\`customer_kyc\`/,/UNLOCK TABLES/p' full_bank_dump.sql > kyc_only.sql
mysql -u root -p kolkata_bank < kyc_only.sql`
  },
  {
    question: "Why is running `ANALYZE TABLE` recommended on all tables immediately after restoring a large logical dump?",
    shortAnswer: "Because bulk inserting millions of rows leaves InnoDB index cardinalities and optimizer statistics outdated, which can cause the query planner to choose slow full table scans instead of index lookups.",
    explanation: "`ANALYZE TABLE` regenerates exact index distribution statistics in `mysql.innodb_index_stats`, ensuring optimal execution plans for production queries.",
    hint: "Regenerates optimizer index statistics to prevent slow query plans post-restore.",
    level: "intermediate",
    codeExample: `mysqlcheck -u root -p --analyze --databases kolkata_ecommerce`
  },
  {
    question: "What happens if `max_allowed_packet` on the target MySQL server is smaller than the `max_allowed_packet` used when generating extended inserts in `mysqldump`?",
    shortAnswer: "The restore fails midway with `ERROR 1153 (08S01): Got a packet bigger than 'max_allowed_packet' bytes`.",
    explanation: "Multi-row `INSERT` statements packed into large network buffers are rejected by the server if its receive buffer is configured smaller than the sending client's buffer.",
    hint: "Causes Error 1153 (Got a packet bigger than max_allowed_packet).",
    level: "basic",
    codeExample: `-- Increase on target server before restore:
SET GLOBAL max_allowed_packet = 134217728; -- 128MB`
  },
  {
    question: "How do you execute a SQL dump file from inside the interactive MySQL shell?",
    shortAnswer: "Use the `SOURCE` (or `\\.`) command: `mysql> SOURCE /path/to/backup.sql;`.",
    explanation: "The `SOURCE` command reads and executes SQL statements line-by-line from within an active MySQL client session.",
    hint: "Use the SOURCE or \\. command.",
    level: "basic",
    codeExample: `mysql -u root -p kolkata_retail
mysql> SOURCE /backups/retail_data.sql;`
  },
  {
    question: "What is the security risk of executing a `mysqldump` SQL file downloaded from an untrusted third-party source?",
    shortAnswer: "SQL dump files can contain arbitrary malicious DDL/DCL statements, such as `CREATE USER 'backdoor'@'%' IDENTIFIED BY 'pass';` or `GRANT ALL ON *.* TO ...;`.",
    explanation: "Because SQL dump files execute raw SQL with whatever privileges the importing user holds, third-party dumps should always be inspected for unauthorized user creation or trigger injections before import.",
    hint: "SQL files execute raw statements that could create unauthorized backdoor accounts.",
    level: "intermediate",
    codeExample: `# Inspect dump headers for suspicious statements:
grep -iE "(GRANT|CREATE USER|ALTER USER)" untrusted_dump.sql`
  },
  {
    question: "How does the `mysqlcheck` utility assist after a major logical database restoration?",
    shortAnswer: "It verifies table structural integrity (`--check`), optimizes indexes (`--optimize`), and updates optimizer cardinality statistics (`--analyze`) across all restored schemas.",
    explanation: "`mysqlcheck` provides a convenient CLI wrapper to validate and warm up tables across entire databases following restoration.",
    hint: "Validates table integrity and updates statistics across all restored tables.",
    level: "basic",
    codeExample: `mysqlcheck -u root -p --check --databases kolkata_retail`
  },
  {
    question: "Why should `innodb_buffer_pool_size` on the target restore host be configured to 70-80% of total host RAM before starting a large logical import?",
    shortAnswer: "To provide maximum memory cache for newly allocated B-tree index pages, minimizing expensive disk I/O thrashing during bulk row insertions.",
    explanation: "A small buffer pool forces InnoDB to constantly evict and re-read index pages from disk as millions of rows are inserted, causing restore times to multiply.",
    hint: "Maximizes RAM caching of index pages to prevent disk I/O thrashing.",
    level: "intermediate",
    codeExample: `# Sized in my.cnf for 64GB RAM server:
innodb_buffer_pool_size = 48G`
  },
  {
    question: "What is the purpose of the `--force` (`-f`) flag in the `mysql` client during backup restoration?",
    shortAnswer: "It instructs the client to continue executing subsequent SQL statements even if an individual SQL error occurs.",
    explanation: "While useful for skipping minor non-critical warnings in test environments, `--force` should be used with extreme caution in production to avoid silently skipping failed table creation statements.",
    hint: "Continues importing even if errors occur; use with caution.",
    level: "basic",
    codeExample: `mysql -u root -p -f target_db < partial_backup.sql`
  },
  {
    question: "How do you handle character set encoding mismatch when restoring a dump created with `utf8mb4` into an older server default of `latin1`?",
    shortAnswer: "Ensure the `mysql` client connects with `mysql --default-character-set=utf8mb4 ... < backup.sql`.",
    explanation: "`mysqldump` files contain `SET NAMES utf8mb4;`, but ensuring the client handshake also uses `utf8mb4` guarantees that all character conversions proceed cleanly without mojibake.",
    hint: "Specify --default-character-set=utf8mb4 during client connection.",
    level: "basic",
    codeExample: `mysql --default-character-set=utf8mb4 -u root -p target_db < backup.sql`
  },
  {
    question: "What is the role of `innodb_redo_log_capacity` (or legacy `innodb_log_file_size`) during massive bulk logical imports in MySQL 8.0?",
    shortAnswer: "It defines the storage allocated for active redo logs; configuring it large (e.g. 4GB - 8GB) prevents aggressive buffer pool checkpoint flushing during bulk `INSERT` statements.",
    explanation: "If redo logs are too small, InnoDB must constantly halt inserts to flush dirty buffer pool pages to disk (checkpointing stalls). Large redo log capacity smooths out bulk write throughput.",
    hint: "Large redo log capacity prevents aggressive checkpointing stalls during bulk inserts.",
    level: "expert",
    codeExample: `SET GLOBAL innodb_redo_log_capacity = 4294967296; -- 4GB`
  },
  {
    question: "What is the difference between restoring a dump on a standalone primary server versus restoring on an active replication replica?",
    shortAnswer: "On a replica, you must set `SET sql_log_bin = 0;` during restore to avoid re-writing restore statements to the replica's own binary log and corrupting downstream replication.",
    explanation: "Replicating bulk restore operations causes massive replication lag on downstream nodes and can duplicate events already applied from the master.",
    hint: "Disable binary logging with sql_log_bin = 0 on replicas during restore.",
    level: "expert",
    codeExample: `-- On Replica Session:
SET sql_log_bin = 0;
SOURCE /backups/replica_seed.sql;
SET sql_log_bin = 1;`
  },
  {
    question: "How can you verify that all tables and record counts in a restored database match the original source database?",
    shortAnswer: "Run automated checksum validation queries (`CHECKSUM TABLE tablename;` or compare `SELECT COUNT(*) FROM table;` across all tables).",
    explanation: "Comparing row counts and table checksums between source and target confirms that zero rows were dropped or truncated during transfer.",
    hint: "Compare row counts and execute CHECKSUM TABLE across all tables.",
    level: "intermediate",
    codeExample: `CHECKSUM TABLE kolkata_retail.orders;
SELECT COUNT(*) FROM kolkata_retail.orders;`
  },
  {
    question: "What is the impact of table secondary indexes on logical restore duration?",
    shortAnswer: "Secondary indexes must be updated on every inserted row; tables with 10+ secondary indexes restore 5x slower than tables with only a primary key.",
    explanation: "For extreme restore performance, some tools drop secondary indexes before bulk loading and rebuild them in a single sorted pass afterwards.",
    hint: "Updating secondary indexes during insert adds significant CPU and random I/O overhead.",
    level: "intermediate",
    codeExample: `-- Bulk load into PK-only table → Recreate secondary indexes in sorted pass`
  },
  {
    question: "How do you restore a `mysqldump` file over an SSL/TLS encrypted connection to a remote cloud database (e.g. AWS RDS / Google Cloud SQL)?",
    shortAnswer: "Supply the `--ssl-ca` and `--ssl-mode=REQUIRED` flags: `mysql -h db.cloud.internal -u admin -p --ssl-ca=ca.pem --ssl-mode=REQUIRED target_db < backup.sql`.",
    explanation: "Guarantees that all restored customer records and financial data are encrypted in transit across public or cloud network links.",
    hint: "Pass --ssl-ca and --ssl-mode=REQUIRED to the mysql client.",
    level: "basic",
    codeExample: `mysql -h db.kolkata.internal -u admin -p \\
  --ssl-ca=/etc/mysql/certs/ca.pem \\
  --ssl-mode=VERIFY_IDENTITY \\
  kolkata_bank < bank_restore.sql`
  },
  {
    question: "What does the error `ERROR 1005 (HY000): Can't create table ... (errno: 150)` indicate during logical restore?",
    shortAnswer: "A foreign key constraint failure caused by column type mismatches, missing referenced parent tables, or differing character sets/collations between child and parent foreign key columns.",
    explanation: "Ensuring `FOREIGN_KEY_CHECKS=0` is active resolves dependency ordering issues; matching column types resolves definition errors.",
    hint: "Indicates a foreign key definition or dependency mismatch error.",
    level: "intermediate",
    codeExample: `-- Ensure child and parent column types and collations match identically.`
  },
  {
    question: "How can you parallelize the restoration of multiple independent database SQL dumps?",
    shortAnswer: "Use `xargs -P N` or GNU `parallel` to stream multiple `.sql` files concurrently into separate `mysql` client instances across N CPU threads.",
    explanation: "Because independent databases do not share table locks, restoring 4 databases across 4 concurrent threads cuts total restore time by nearly 75%.",
    hint: "Use xargs -P or GNU parallel to restore multiple databases concurrently.",
    level: "expert",
    codeExample: `ls /backups/*.sql | xargs -n 1 -P 4 -I {} sh -c 'mysql -u root -p < {}'`
  },
  {
    question: "Why should `innodb_doublewrite` remain enabled even during production disaster recovery restores?",
    shortAnswer: "To protect newly written 16KB data pages from partial page write corruption during unexpected hardware crashes or power interruptions during restore.",
    explanation: "While disabling doublewrite provides a minor write speed increase, a power failure during import would leave tablespaces irreversibly corrupted.",
    hint: "Protects against partial page write corruption during unexpected power outages.",
    level: "expert",
    codeExample: `-- Keep innodb_doublewrite = ON for data safety.`
  },
  {
    question: "What is the difference between restoring using the `mysql` CLI client versus using `myloader`?",
    shortAnswer: "`mysql` client processes SQL statements sequentially on a single thread; `myloader` restores multiple table chunks concurrently across multi-threaded worker connections.",
    explanation: "`myloader` parallelizes table creation and data insertion across 8-16 threads, making it dramatically faster for large multi-table schemas.",
    hint: "myloader utilizes multi-threaded parallel workers; mysql client is single-threaded.",
    level: "intermediate",
    codeExample: `myloader -B kolkata_retail -t 8 -d /backups/parallel_dump/`
  },
  {
    question: "How does `mysqldump` ensure that auto-increment counters are properly reset upon restore?",
    shortAnswer: "It includes the explicit `AUTO_INCREMENT = N` value in the `CREATE TABLE` definition and inserts explicit primary key values in `INSERT` statements.",
    explanation: "This preserves the exact original sequence IDs and ensures subsequent new inserts continue from the correct increment counter.",
    hint: "Includes AUTO_INCREMENT=N in table DDL and preserves explicit PK IDs in INSERTs.",
    level: "basic",
    codeExample: `CREATE TABLE \`orders\` (
  \`order_id\` int NOT NULL AUTO_INCREMENT,
  ...
) AUTO_INCREMENT=10582;`
  },
  {
    question: "What should you check in the MySQL Error Log (`mysqld.log`) after completing a major database restore?",
    shortAnswer: "Check for any table corruption notices, foreign key mismatch warnings, buffer pool allocation alerts, or aborted connection events.",
    explanation: "Reviewing the error log confirms that all tablespaces loaded cleanly and no background dictionary warnings occurred.",
    hint: "Inspect mysqld.log for dictionary warnings or corruption notices.",
    level: "basic",
    codeExample: `grep -iE "(error|warning|corrupt)" /var/log/mysql/error.log`
  },
  {
    question: "How can you test a disaster recovery restore procedure without risking production data or modifying production DNS endpoints?",
    shortAnswer: "Restore the backup to an isolated sandbox container or staging server running on a separate network, and run automated smoke tests against the sandbox port.",
    explanation: "Testing restores in isolated sandbox environments validates backup archives and measures exact recovery time without impacting production users.",
    hint: "Restore to an isolated sandbox container on a separate network port.",
    level: "basic",
    codeExample: `docker run --name mysql-dr-test -e MYSQL_ROOT_PASSWORD=test -p 3307:3306 -d mysql:8.0
mysql -h 127.0.0.1 -P 3307 -u root -ptest < backup.sql`
  },
  {
    question: "What is the primary operational takeaway of Topic 4 in Module 004_004?",
    shortAnswer: "Mastering database restoration requires combining command-line precision with performance optimizations: understand `--databases` scoping, verify foreign key check disabling (`SET FOREIGN_KEY_CHECKS=0`), track real-time throughput with `pv`, optimize bulk insert session parameters (`sql_log_bin=0`, `autocommit=0`), and refresh optimizer stats with `ANALYZE TABLE` post-restore.",
    explanation: "Flawless disaster recovery execution ensures that backups can be quickly and reliably restored under high-pressure outage conditions, achieving aggressive RTO targets while preserving 100% data integrity.",
    hint: "Summarize CLI restore syntax, foreign key bypass, progress tracking, bulk optimizations, and post-restore stats.",
    level: "basic",
    codeExample: `-- Master Disaster Recovery Restore Pipeline:
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
pv /backups/prod_backup.sql | mysql -u root -p
SET GLOBAL innodb_flush_log_at_trx_commit = 1;
mysqlcheck -u root -p --analyze --all-databases`
  }
];

export default questions;
