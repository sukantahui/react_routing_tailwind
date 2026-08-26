// topic1_files/topic1_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 1: Backup Classification: Logical vs Physical, Cold vs Hot vs Warm, Full vs Incremental

const questions = [
  {
    question: "What is the fundamental difference between a Logical Backup and a Physical Backup in MySQL?",
    shortAnswer: "A Logical Backup extracts data as plain text SQL statements (`CREATE TABLE`, `INSERT INTO`); a Physical Backup copies the raw binary database files (`.ibd`, redo logs, undo tablespaces) directly from disk.",
    explanation: "Logical backups are human-readable, editable, and highly portable across MySQL versions and operating systems. Physical backups are binary-bound, but restore orders of magnitude faster because they bypass SQL parsing and index rebuilding.",
    hint: "Logical = SQL text files; Physical = raw binary data files (.ibd).",
    level: "basic",
    codeExample: `# Logical Backup (mysqldump):
mysqldump -u root -p ecommerce > backup.sql

# Physical Backup (Percona XtraBackup):
xtrabackup --backup --target-dir=/backups/physical_2026/`
  },
  {
    question: "What is the difference between Cold, Warm, and Hot backups?",
    shortAnswer: "Cold: Taken while the database is stopped (offline). Warm: Taken while the database is read-only (`FLUSH TABLES WITH READ LOCK`). Hot: Taken online with concurrent reads and writes fully active.",
    explanation: "Cold backups require downtime. Warm backups block all data mutations. Hot backups use InnoDB MVCC snapshots or background redo log streaming to take consistent backups without impacting online user transactions.",
    hint: "Cold = offline; Warm = read-only; Hot = full online concurrent read/write.",
    level: "basic",
    codeExample: `-- Hot Backup Logical: mysqldump --single-transaction
-- Hot Backup Physical: xtrabackup --backup`
  },
  {
    question: "How does `mysqldump --single-transaction` perform an online Hot Backup of InnoDB tables without blocking writes?",
    shortAnswer: "It starts a transaction with `REPEATABLE READ` isolation (`START TRANSACTION WITH CONSISTENT SNAPSHOT`), reading a consistent MVCC point-in-time snapshot from the undo logs while concurrent transactions continue modifying tables.",
    explanation: "Because InnoDB uses Multi-Version Concurrency Control (MVCC), reads do not block writes and writes do not block reads. The dump process reads historical row versions from the undo logs as of the transaction start time.",
    hint: "Uses InnoDB MVCC consistent snapshot under REPEATABLE READ isolation.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --quick --routines --triggers ecommerce > backup.sql`
  },
  {
    question: "How does Percona XtraBackup capture a consistent Hot Physical Backup while transactions are actively modifying `.ibd` files on disk?",
    shortAnswer: "It copies the raw `.ibd` files while running a background thread that continuously reads and records active InnoDB Redo Log changes, then applies those redo logs during the `--prepare` phase to reach a consistent state.",
    explanation: "Because physical file copying takes time, pages copied at the beginning may be modified before the end of the backup. XtraBackup records all page mutations in the redo log logstream and replays them during `--prepare`, bringing all data pages to a consistent Log Sequence Number (LSN).",
    hint: "Copies files while streaming redo logs, then applies redo logs during the prepare phase.",
    level: "expert",
    codeExample: `# Step 1: Online non-blocking backup:
xtrabackup --backup --target-dir=/data/backups/base

# Step 2: Prepare (apply redo logs to achieve crash consistency):
xtrabackup --prepare --target-dir=/data/backups/base`
  },
  {
    question: "What is an Incremental Backup in MySQL, and how does it differ from a Differential Backup?",
    shortAnswer: "An Incremental Backup copies only the data changed since the last backup (Full or Incremental); a Differential Backup copies all data changed since the last Full baseline backup.",
    explanation: "Incremental backups are faster to capture and use less storage, but require restoring the complete chain of incremental files in chronological order. Differential backups require only the base backup plus the latest differential file.",
    hint: "Incremental = delta since last backup; Differential = delta since last full baseline.",
    level: "intermediate",
    codeExample: `# Full Backup (Sunday):
xtrabackup --backup --target-dir=/backups/base

# Incremental Backup (Monday):
xtrabackup --backup --target-dir=/backups/inc1 --incremental-basedir=/backups/base`
  },
  {
    question: "How does Percona XtraBackup determine which 16KB data pages have changed when performing an Incremental Backup?",
    shortAnswer: "It inspects the Log Sequence Number (LSN) stored in the header of each 16KB InnoDB page, copying only pages whose LSN is greater than the previous backup's checkpoint LSN.",
    explanation: "Every time a page is modified in InnoDB, its header LSN is incremented. XtraBackup reads the page headers and skips unchanged pages, creating compact incremental backup archives.",
    hint: "Compares page header Log Sequence Numbers (LSNs) against previous checkpoint.",
    level: "expert",
    codeExample: `-- Incremental logic: IF page.LSN > last_backup.to_lsn THEN copy_page(page)`
  },
  {
    question: "Why are Logical Backups preferred over Physical Backups when performing cross-version upgrades (e.g. MySQL 5.7 to MySQL 8.0)?",
    shortAnswer: "Because physical data dictionary layouts and binary page structures differ between major versions, whereas logical SQL text statements (`CREATE TABLE`, `INSERT`) are version-agnostic and universally portable.",
    explanation: "Directly copying MySQL 5.7 physical files into MySQL 8.0 can lead to data dictionary corruption. A logical SQL dump re-creates tables using the new version's native SQL parser.",
    hint: "Logical SQL files are portable across major version and architecture boundaries.",
    level: "intermediate",
    codeExample: `# Exporting from MySQL 5.7 for MySQL 8.0 import:
mysqldump -h old-57-server -u root -p --single-transaction db > dump_57.sql
mysql -h new-80-server -u root -p db < dump_57.sql`
  },
  {
    question: "Why does restoring a 2TB logical SQL dump take 8+ hours, while restoring a 2TB physical backup takes under 15 minutes?",
    shortAnswer: "A logical restore requires the CPU to parse billions of SQL characters, execute transactions, and compute B-tree indexes from scratch; a physical restore is a direct block-level file copy at maximum NVMe disk I/O speed.",
    explanation: "Building secondary indexes on 2TB of data is CPU and I/O intensive. Physical restore simply moves pre-built `.ibd` files back into `/var/lib/mysql`, avoiding all computational overhead.",
    hint: "Block file copy is orders of magnitude faster than building indexes row-by-row.",
    level: "basic",
    codeExample: `-- Logical Restore: Parses 50,000,000 INSERT statements + builds 200 indexes (Slow!)
-- Physical Restore: Copies raw .ibd files to disk (NVMe Line-Rate Speed!)`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a 15GB inventory database needed daily automated backups. Which backup classification and tool was optimal?",
    shortAnswer: "A Logical Hot Backup using `mysqldump --single-transaction --quick --routines --triggers`.",
    explanation: "For a 15GB database, `mysqldump` completes in under 3 minutes, provides a portable human-readable SQL file, and allows restoring individual tables easily without incurring the operational complexity of physical backup tooling.",
    hint: "Databases under 20-50GB are ideally suited for mysqldump logical hot backups.",
    level: "moderate",
    codeExample: `# Barrackpore 15GB Daily Backup Command:
mysqldump --single-transaction --quick --routines --triggers --events \\
  -u backup_admin -p barrackpore_store | gzip > /backups/store_$(date +%F).sql.gz`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, managing a 5TB transaction cluster processing ₹500 Crores in volume required zero read/write downtime. Which backup tool was selected?",
    shortAnswer: "A Physical Hot Backup using Percona XtraBackup with daily incremental LSN snapshots.",
    explanation: "At 5TB scale, `mysqldump` would cause excessive memory bloat and take 12+ hours to restore. Percona XtraBackup takes non-blocking physical snapshots and satisfies their strict 15-minute RTO SLA.",
    hint: "Multi-terabyte databases require physical hot backups like Percona XtraBackup.",
    level: "expert",
    codeExample: `# Kolkata Fintech 5TB Daily Base Backup:
xtrabackup --backup --stream=xbstream --parallel=8 --target-dir=/backups/ | \\
  zstd -T8 > /backups/kolkata_bank_base.xbstream.zst`
  },
  {
    question: "What is the primary risk of using `mysqldump` WITHOUT the `--single-transaction` flag on a production InnoDB database?",
    shortAnswer: "It executes `FLUSH TABLES WITH READ LOCK;`, converting the backup into a Warm backup that blocks all write queries (`INSERT`, `UPDATE`, `DELETE`) across the entire server for the duration of the dump.",
    explanation: "On a large database, dumping without `--single-transaction` will lock all application writes for hours, causing immediate production application outages.",
    hint: "Without --single-transaction, mysqldump locks all tables for writing.",
    level: "basic",
    codeExample: `# DANGEROUS IN PRODUCTION (Locks all writes!):
# mysqldump ecommerce > backup.sql

# SAFE IN PRODUCTION (Non-blocking MVCC snapshot):
mysqldump --single-transaction ecommerce > backup.sql`
  },
  {
    question: "What is `mydumper` / `myloader`, and why is it faster than standard `mysqldump` for medium-sized databases (20GB - 100GB)?",
    shortAnswer: "It is a high-performance open-source logical backup tool that dumps and restores tables in parallel using multiple multi-threaded worker connections.",
    explanation: "Standard `mysqldump` runs on a single CPU thread. `mydumper` splits tables into chunks and dumps them concurrently across 8 or 16 threads, reducing backup and restore times by 70-80%.",
    hint: "Multi-threaded parallel logical dump and restore tool.",
    level: "intermediate",
    codeExample: `# Parallel logical backup using 8 CPU threads:
mydumper -B ecommerce -t 8 -o /backups/parallel_dump/
myloader -B ecommerce -t 8 -d /backups/parallel_dump/`
  },
  {
    question: "What happens if a `mysqldump --single-transaction` operation encounters non-InnoDB tables (like MyISAM or MEMORY)?",
    shortAnswer: "MyISAM tables do not support MVCC transactions; therefore, changes made to MyISAM tables during the dump can result in inconsistent data unless locked.",
    explanation: "Because `--single-transaction` relies on InnoDB transaction snapshots, non-transactional storage engines cannot guarantee consistency without applying table locks.",
    hint: "Non-transactional tables (MyISAM) cannot provide consistent MVCC snapshots.",
    level: "intermediate",
    codeExample: `-- Ensure all production tables use InnoDB:
SELECT TABLE_SCHEMA, TABLE_NAME, ENGINE 
FROM information_schema.TABLES 
WHERE ENGINE != 'InnoDB' AND TABLE_SCHEMA NOT IN ('mysql', 'information_schema', 'performance_schema');`
  },
  {
    question: "How does the `--quick` flag in `mysqldump` prevent out-of-memory (OOM) errors on large tables?",
    shortAnswer: "It forces `mysqldump` to retrieve rows from the server one row at a time instead of buffering the entire table into client RAM before writing to disk.",
    explanation: "Without `--quick`, dumping a 50GB table forces the `mysqldump` client process to load all 50GB into client RAM, causing memory exhaustion and process crashing.",
    hint: "Streams rows row-by-row instead of buffering whole tables in RAM.",
    level: "basic",
    codeExample: `mysqldump --single-transaction --quick ecommerce > backup.sql`
  },
  {
    question: "What is a 'Snapshot Backup' using storage-layer technologies (AWS EBS, ZFS, LVM)?",
    shortAnswer: "A point-in-time copy of storage disk blocks created almost instantaneously at the storage volume layer.",
    explanation: "Storage snapshots freeze the filesystem blocks in seconds. When restored, InnoDB performs standard crash recovery from the redo logs to ensure full transactional consistency.",
    hint: "Instant block-level storage volume snapshotting.",
    level: "intermediate",
    codeExample: `# LVM snapshot creation:
lvcreate --size 50G --snapshot --name mysql_snap /dev/vg01/mysql_data`
  },
  {
    question: "What is the role of the `--master-data` (or `--source-data` in MySQL 8.0+) flag in `mysqldump`?",
    shortAnswer: "It writes the exact binary log file name and position coordinates at the time of the snapshot into the SQL dump file as a `CHANGE MASTER TO` (or `CHANGE REPLICATION SOURCE TO`) statement.",
    explanation: "This coordinate is essential for setting up replication replicas and performing Point-in-Time Recovery (PITR) using subsequent binary logs.",
    hint: "Records binary log file coordinates inside the SQL dump for PITR and replication.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction --source-data=2 ecommerce > backup.sql
-- Output inside backup.sql:
-- CHANGE REPLICATION SOURCE TO SOURCE_LOG_FILE='binlog.000045', SOURCE_LOG_POS=1568;`
  },
  {
    question: "What is the sequence of commands to prepare a Percona XtraBackup base backup with two incremental backups for restoration?",
    shortAnswer: "1. `xtrabackup --prepare --apply-log-only --target-dir=/backups/base` 2. `xtrabackup --prepare --apply-log-only --target-dir=/backups/base --incremental-dir=/backups/inc1` 3. `xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc2`.",
    explanation: "Applying the incremental backups rolls forward page changes into the base backup directory. The final prepare step (without `--apply-log-only`) performs rollback of uncommitted transactions.",
    hint: "Apply incrementals sequentially with --apply-log-only, omitting it on the final step.",
    level: "expert",
    codeExample: `# Applying incremental chain:
xtrabackup --prepare --apply-log-only --target-dir=/backups/base
xtrabackup --prepare --apply-log-only --target-dir=/backups/base --incremental-dir=/backups/inc1
xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc2`
  },
  {
    question: "Why should `mysqldump` backups always include `--routines`, `--triggers`, and `--events`?",
    shortAnswer: "By default, `mysqldump` does NOT dump stored procedures, functions, or scheduled events unless these flags are explicitly supplied.",
    explanation: "Omitting these flags results in an incomplete database backup where business logic stored inside procedures, triggers, and scheduled jobs is lost upon restore.",
    hint: "Stored procedures and scheduled events are not backed up by default.",
    level: "basic",
    codeExample: `mysqldump --single-transaction --routines --triggers --events ecommerce > full_backup.sql`
  },
  {
    question: "Can an individual table be extracted from a large monolithic `mysqldump` SQL file?",
    shortAnswer: "Yes, using text parsing tools like `sed` or `awk` to extract the `CREATE TABLE` and `INSERT` block for that specific table, or using `myloader` for modular dumps.",
    explanation: "Because logical dumps are plain text SQL, scripts can parse out specific table DDL and DML statements without restoring the entire multi-gigabyte file.",
    hint: "Text parsing tools can extract specific table definitions and INSERTs from SQL dumps.",
    level: "intermediate",
    codeExample: `# Extracting 'orders' table from full dump:
sed -n -e '/DROP TABLE.*\`orders\`/,/UNLOCK TABLES/p' full_backup.sql > orders_only.sql`
  },
  {
    question: "What is `mysqlpump`, and how does it differ from legacy `mysqldump` in MySQL 8.0?",
    shortAnswer: "It is an official MySQL utility that performs parallel multi-threaded logical dumps of multiple tables and databases concurrently.",
    explanation: "Introduced in MySQL 5.7/8.0, `mysqlpump` uses thread parallelism to speed up logical dumps. However, it is deprecated in MySQL 8.0.34 in favor of MySQL Shell Dump & Load utilities.",
    hint: "Parallel logical dump utility developed by Oracle for MySQL.",
    level: "intermediate",
    codeExample: `mysqlpump --default-parallelism=4 ecommerce > pump_backup.sql`
  },
  {
    question: "What is the MySQL Shell `util.dumpInstance()` / `util.dumpSchemas()` utility?",
    shortAnswer: "A modern, ultra-fast parallel logical dumping utility built into MySQL Shell that writes partitioned JSON/CSV/SQL chunks with built-in compression and cloud upload capabilities.",
    explanation: "MySQL Shell Dump Utility outperforms legacy `mysqldump` by over 10x by executing parallel reads, compression, and direct streaming to AWS S3, Azure Blob, or OCI Object Storage.",
    hint: "High-performance parallel dump utility inside MySQL Shell.",
    level: "expert",
    codeExample: `// In MySQL Shell (JS Mode):
util.dumpSchemas(['kolkata_retail'], '/backups/shell_dump', {threads: 8, compression: 'zstd'});`
  },
  {
    question: "What is the difference between Table-Level Locking and Row-Level MVCC during backup capture?",
    shortAnswer: "Table-level locking (`LOCK TABLES READ`) blocks all concurrent write queries on the table; Row-level MVCC reads historical versions from undo logs with zero locking on active writers.",
    explanation: "MVCC allows applications to process thousands of transactions per second uninterrupted while the backup process reads consistent historical snapshots.",
    hint: "MVCC provides non-blocking reads; table locks block all concurrent writing.",
    level: "basic",
    codeExample: `-- MVCC reads do not acquire table locks on InnoDB tables.`
  },
  {
    question: "How do you verify the exit status of a `mysqldump` command in automated shell backup scripts?",
    shortAnswer: "Check the `$?` shell exit code immediately following the command (`if [ $? -eq 0 ]; then echo 'Success'; fi`).",
    explanation: "If `mysqldump` encounters a network timeout or disk error, it returns a non-zero exit code. Scripts must verify `$?` before marking backups as successful or compressing them.",
    hint: "Check the $? exit code to ensure the backup completed without errors.",
    level: "basic",
    codeExample: `mysqldump --single-transaction ecommerce > backup.sql
if [ $? -ne 0 ]; then
  echo "Backup FAILED!" | mail -s "Alert" dba@company.com
  exit 1
fi`
  },
  {
    question: "What is the impact of `foreign_key_checks = 0` during logical backup restoration?",
    shortAnswer: "It temporarily disables foreign key constraint validation, allowing child tables to be restored and populated before their parent tables without throwing foreign key violation errors.",
    explanation: "When restoring a logical dump, tables are imported alphabetically. If child `order_items` is imported before parent `orders`, foreign key checks would cause imports to fail. `mysqldump` automatically places `SET FOREIGN_KEY_CHECKS=0;` at the top of dump files.",
    hint: "Allows restoring child tables before parent tables during import.",
    level: "intermediate",
    codeExample: `-- mysqldump automatically includes at the top of dump files:
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;`
  },
  {
    question: "Why should `innodb_buffer_pool_dump_at_shutdown` and `innodb_buffer_pool_load_at_startup` be enabled alongside physical backup restores?",
    shortAnswer: "To preserve and quickly warm up the InnoDB Buffer Pool cache in memory following server restarts or disaster recovery restorations, preventing cold-cache query performance degradation.",
    explanation: "Warming the buffer pool pre-loads frequently accessed index and data pages into RAM, ensuring normal query response times immediately upon bringing restored databases back online.",
    hint: "Pre-loads cached pages into the buffer pool on startup for instant warm-cache performance.",
    level: "expert",
    codeExample: `SET PERSIST innodb_buffer_pool_dump_at_shutdown = ON;
SET PERSIST innodb_buffer_pool_load_at_startup = ON;`
  },
  {
    question: "What is the primary operational tradeoff between full backups and incremental backups?",
    shortAnswer: "Full backups take longer to run and consume more storage, but provide simple, fast, one-step restoration; incremental backups run quickly and use minimal storage, but require multi-step sequential chain restoration.",
    explanation: "If an intermediate incremental backup file is corrupted or missing, all subsequent incremental backups in that chain become unrecoverable.",
    hint: "Full = slower backup, simple fast restore; Incremental = fast small backup, complex multi-step restore.",
    level: "basic",
    codeExample: `-- Backup Time vs Restore Complexity Tradeoff`
  },
  {
    question: "How can you compress a `mysqldump` logical backup on-the-fly without creating a huge uncompressed intermediate file?",
    shortAnswer: "Pipe the `mysqldump` stdout directly into compression utilities like `gzip`, `zstd`, or `pigz` (`mysqldump ... | zstd -3 > backup.sql.zst`).",
    explanation: "Piping stdout directly to a streaming compressor eliminates the need to write hundreds of gigabytes of uncompressed text to disk first.",
    hint: "Pipe mysqldump stdout directly into gzip or zstd.",
    level: "basic",
    codeExample: `mysqldump --single-transaction --quick ecommerce | pigz -p 4 > ecommerce_backup.sql.gz`
  },
  {
    question: "What is the difference between Physical Hot Backup tools like Percona XtraBackup vs MySQL Enterprise Backup (MEB)?",
    shortAnswer: "Percona XtraBackup is open-source (GPL) and community-supported; MySQL Enterprise Backup (MEB) is a commercial proprietary tool provided with Oracle MySQL Enterprise Edition.",
    explanation: "Both tools perform non-blocking physical block-level hot backups using similar redo log streaming architectures.",
    hint: "Percona XtraBackup is open-source; MEB is Oracle's commercial enterprise backup tool.",
    level: "basic",
    codeExample: `-- Both tools achieve identical physical hot backup performance.`
  },
  {
    question: "Why should `sql_log_bin = 0` be considered during large logical backup restoration onto a replication replica?",
    shortAnswer: "To prevent the massive flood of restore `INSERT` statements from being written to the replica's binary log and propagating redundant replication traffic.",
    explanation: "Executing `SET sql_log_bin = 0;` disables binlog generation for that specific restore session.",
    hint: "Disables binary log generation during restore to prevent duplicate replication traffic.",
    level: "expert",
    codeExample: `SET sql_log_bin = 0;
SOURCE /backups/ecommerce_restore.sql;
SET sql_log_bin = 1;`
  },
  {
    question: "What is the primary operational takeaway of Topic 1 in Module 004_004?",
    shortAnswer: "Select the optimal backup classification based on dataset size and SLA: use non-blocking logical hot backups (`mysqldump --single-transaction`) for small-to-medium datasets (<50GB) and cross-version migrations, and use physical hot backups (Percona XtraBackup) for large multi-terabyte production databases requiring low RTO.",
    explanation: "Understanding the dimensions of backup architecture—Logical vs Physical, Hot vs Cold, Full vs Incremental—allows database architects to design resilient, cost-effective backup strategies that meet enterprise RTO and RPO targets without disrupting production transactions.",
    hint: "Summarize dataset size matching, non-blocking MVCC snapshots, and physical backups for low RTO.",
    level: "basic",
    codeExample: `-- Decision Matrix:
-- < 50GB: mysqldump --single-transaction --quick --routines --triggers
-- > 100GB: Percona XtraBackup (Physical Hot Backup + LSN Incrementals)
-- Cross-Version / Cross-Cloud Migration: Logical SQL Dump / MySQL Shell Dump`
  }
];

export default questions;
