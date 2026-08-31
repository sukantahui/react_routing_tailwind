// topic5_files/topic5_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 5: High-Speed Parallel Logical Dumps: Introduction to mysqlpump and mydumper/myloader

const questions = [
  {
    question: "Why does standard `mysqldump` become a performance bottleneck on modern multi-core database servers?",
    shortAnswer: "Because `mysqldump` executes entirely on a single CPU thread, processing tables one-by-one sequentially and leaving 15 out of 16 CPU cores idle during backup and restore.",
    explanation: "Even on modern 64-core servers with fast NVMe storage, single-threaded `mysqldump` cannot utilize available CPU parallelism, resulting in hours of unnecessary backup and restore latency on datasets exceeding 50GB.",
    hint: "Single-threaded execution cannot utilize multi-core CPU architectures.",
    level: "basic",
    codeExample: `-- mysqldump: Uses 1 CPU Core (100% busy), leaving other 15 cores at 0%!
-- mydumper / myloader: Utilizes all 16 CPU cores in parallel!`
  },
  {
    question: "What is `mydumper` and `myloader`, and how do they achieve multi-threaded parallelism?",
    shortAnswer: "They are high-performance C-based open-source utilities that dump and restore MySQL data concurrently across multiple threads, splitting operations both across different tables and within single large tables using chunking.",
    explanation: "`mydumper` uses multiple worker threads to dump tables in parallel and splits large tables into numeric chunks (`--rows=N`), while `myloader` restores these chunks concurrently into the target database.",
    hint: "Multi-threaded C-based open-source dump and restore utilities.",
    level: "basic",
    codeExample: `# Parallel dump using 8 threads with Zstandard compression:
mydumper -u root -p -B kolkata_retail --threads=8 --rows=250000 --compress=ZSTD -o /backups/retail_dump/`
  },
  {
    question: "How does table chunking (`--rows` option) in `mydumper` enable parallel dumping of a single monolithic 100GB table?",
    shortAnswer: "It queries the primary key or unique integer index to divide the table into discrete row ranges (e.g. `WHERE id BETWEEN 1 AND 250000`, `WHERE id BETWEEN 250001 AND 500000`) and assigns each chunk to a separate worker thread.",
    explanation: "Without chunking, a single massive table must be dumped by a single thread. Chunking allows 8 or 16 threads to dump different slices of the same large table simultaneously.",
    hint: "Splits large tables into primary key ranges to dump across parallel threads.",
    level: "intermediate",
    codeExample: `-- Thread 1: SELECT * FROM orders WHERE id BETWEEN 1 AND 250000
-- Thread 2: SELECT * FROM orders WHERE id BETWEEN 250001 AND 500000
-- Thread 3: SELECT * FROM orders WHERE id BETWEEN 500001 AND 750000`
  },
  {
    question: "What modular file structure does `mydumper` produce in its output directory instead of a single monolithic `.sql` file?",
    shortAnswer: "It produces separate files for metadata (`metadata`), database creation (`db-schema-create.sql`), table DDL (`db.table-schema.sql`), and chunked data files (`db.table.00000.sql.zst`).",
    explanation: "This modular layout makes it trivial to restore individual tables, inspect specific schemas, or distribute files across multiple storage volumes.",
    hint: "Generates individual metadata, table schema, and chunked data files.",
    level: "intermediate",
    codeExample: `# Output Directory Contents:
# metadata
# kolkata_retail-schema-create.sql
# kolkata_retail.orders-schema.sql
# kolkata_retail.orders.00000.sql.zst
# kolkata_retail.orders.00001.sql.zst`
  },
  {
    question: "How do you restore a directory created by `mydumper` using `myloader`?",
    shortAnswer: "Execute `myloader -u root -p -B target_db --threads=N --directory=/path/to/dump --overwrite-tables`.",
    explanation: "`myloader` parses the metadata file, creates databases and tables, and streams the chunked data files in parallel across N worker threads.",
    hint: "Use myloader pointing to the dump directory with --threads=N.",
    level: "basic",
    codeExample: `myloader -u root -p -B kolkata_retail --threads=8 --directory=/backups/retail_dump/ --overwrite-tables`
  },
  {
    question: "What is `mysqlpump`, and why was it deprecated in MySQL 8.0.34?",
    shortAnswer: "It is an Oracle-developed parallel logical dump utility introduced in MySQL 5.7; it was deprecated in MySQL 8.0.34 because Oracle standardized on the superior MySQL Shell Dump & Load utility suite.",
    explanation: "While `mysqlpump` introduced multi-threading, it lacked intra-table chunking and advanced cloud streaming, leading Oracle to focus on MySQL Shell (`util.dumpSchemas`).",
    hint: "Oracle's parallel dump tool, now deprecated in favor of MySQL Shell.",
    level: "intermediate",
    codeExample: `mysqlpump -u root -p --default-parallelism=8 --databases kolkata_retail > pump.sql`
  },
  {
    question: "How does the MySQL Shell `util.dumpSchemas()` / `util.loadDump()` utility outperform legacy logical tools?",
    shortAnswer: "It provides ultra-fast multi-threaded dumping with intra-table chunking, native Zstandard compression, checksum validation, and direct parallel streaming to cloud object storage (AWS S3, Azure Blob, OCI) without local disk staging.",
    explanation: "MySQL Shell Dump and Load is engineered in modern C++ and Python/JS, delivering up to 3GB/s network throughput directly into cloud object storage buckets.",
    hint: "MySQL Shell utility supports intra-table chunking and direct S3 cloud streaming.",
    level: "expert",
    codeExample: `// Inside MySQL Shell:
util.dumpSchemas(['kolkata_finance'], 's3://bank-backups-2026/dump_q3', {
  threads: 16,
  compression: 'zstd',
  s3BucketName: 'bank-backups-2026'
});`
  },
  {
    question: "In Mamata & Susmita's Barrackpore store, a 40GB retail database took 48 minutes to restore with `mysql < backup.sql`. When Mamata switched to `myloader --threads=8`, what was the new restore duration?",
    shortAnswer: "Under 8 minutes.",
    explanation: "By utilizing all 8 CPU cores on the new server and inserting multiple table chunks concurrently, `myloader` achieved a 6x speedup over the single-threaded `mysql` client.",
    hint: "Parallel 8-thread restoration reduces restore time by 80-85%.",
    level: "moderate",
    codeExample: `# Barrackpore 40GB 8-Thread Restore:
myloader -u backup_admin -p -B barrackpore_store --threads=8 --directory=/backups/store_dump/`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, migrating a 180GB ledger database to AWS RDS within a 30-minute maintenance window was required. Which tool did Debangshu use?",
    shortAnswer: "MySQL Shell `util.dumpSchemas` and `util.loadDump` with 16 parallel threads streaming directly to AWS S3.",
    explanation: "MySQL Shell completed the 180GB dump and S3 upload in 12 minutes, and `util.loadDump` restored the data into RDS in 14 minutes, completing the migration in 26 minutes (safely inside the 30-minute window).",
    hint: "MySQL Shell 16-thread S3 parallel load met the 30-minute migration SLA.",
    level: "expert",
    codeExample: `// Kolkata Bank 180GB Cloud Migration:
util.loadDump('s3://kolkata-bank-migration/ledger_dump', {threads: 16, resetProgress: true});`
  },
  {
    question: "How does `mydumper` ensure a consistent point-in-time snapshot across all of its parallel worker threads without causing table lock deadlocks?",
    shortAnswer: "The main coordinator thread connects, executes `FLUSH TABLES WITH READ LOCK`, records the binlog coordinates in `metadata`, and starts `REPEATABLE READ` transactions with consistent snapshots across all worker threads before releasing the global lock.",
    explanation: "This ensures all worker threads share the exact same logical transaction point in time, achieving 100% consistency with less than 50ms of global lock duration.",
    hint: "Synchronizes REPEATABLE READ snapshots across worker threads during a brief global lock.",
    level: "expert",
    codeExample: `-- Coordinator thread: FLUSH TABLES WITH READ LOCK;
-- Workers 1..8: START TRANSACTION WITH CONSISTENT SNAPSHOT;
-- Coordinator thread: UNLOCK TABLES;`
  },
  {
    question: "What information is recorded in the `metadata` file generated by `mydumper`?",
    shortAnswer: "The exact binary log file name, position, GTID executed coordinates, snapshot start time, and completion timestamp.",
    explanation: "The `metadata` file provides the definitive replication coordinates required for setting up downstream replicas or executing Point-in-Time Recovery.",
    hint: "Records binlog file, position, GTID set, and timestamps.",
    level: "intermediate",
    codeExample: `# Example mydumper 'metadata' file:
# [header]
# SHOW MASTER STATUS:
#   Log: binlog.000078
#   Pos: 9284102
#   GTID: 3e11fa47-71ca-11eb-9876-0242ac120002:1-582049`
  },
  {
    question: "What is the `--max-threads-per-table` option in `myloader`?",
    shortAnswer: "It limits the maximum number of concurrent threads that can insert data into a single table simultaneously.",
    explanation: "Restricting concurrency per table prevents excessive B-tree index page locking and secondary index lock contention on write-heavy tables.",
    hint: "Limits concurrent insertion worker threads on a single table.",
    level: "expert",
    codeExample: `myloader --threads=16 --max-threads-per-table=4 --directory=/backups/dump/`
  },
  {
    question: "How does `mydumper` handle regular expression schema filtering using the `--regex` flag?",
    shortAnswer: "It accepts PCRE regular expressions to include or exclude specific databases and tables (e.g. `--regex '^(?!(mysql|performance_schema|information_schema))'`).",
    explanation: "Regex filtering allows flexible patterns to back up all application schemas while excluding system or test tables in a single rule.",
    hint: "Uses PCRE regular expressions to filter database and table names.",
    level: "intermediate",
    codeExample: `mydumper --threads=8 --regex '^(kolkata_retail|kolkata_finance)\.' -o /backups/selected/`
  },
  {
    question: "What compression formats are natively supported by modern `mydumper` versions?",
    shortAnswer: "Zstandard (`ZSTD`), Gzip (`GZIP`), and QuickLZ, with configurable compression levels (`--compress=ZSTD --compress-level=3`).",
    explanation: "Zstandard provides the fastest compression and decompression throughput with optimal compression ratios on modern multi-core CPUs.",
    hint: "Supports Zstandard (ZSTD) and Gzip natively.",
    level: "basic",
    codeExample: `mydumper --threads=8 --compress=ZSTD --compress-level=3 -o /backups/zstd_dump/`
  },
  {
    question: "What is the `daemon` mode (`-D` or `--daemon`) in `mydumper` used for?",
    shortAnswer: "It runs `mydumper` as a continuous background daemon, periodically dumping binary log files and taking scheduled snapshots at specified intervals (e.g. every 60 minutes).",
    explanation: "Daemon mode provides an automated, continuous backup solution that archives binary logs and takes incremental snapshots continuously.",
    hint: "Runs mydumper continuously in the background for automated periodic backups.",
    level: "intermediate",
    codeExample: `mydumper --daemon --snapshot-interval=60 --threads=4 -o /backups/continuous/`
  },
  {
    question: "How does `myloader` handle table recreation if tables already exist in the target schema?",
    shortAnswer: "By default, `myloader` will fail if tables exist, but specifying `--overwrite-tables` drops existing tables (`DROP TABLE IF EXISTS`) before creating new ones.",
    explanation: "Ensures clean re-creation during disaster recovery tests without manual schema cleanup.",
    hint: "Use --overwrite-tables to replace existing tables.",
    level: "basic",
    codeExample: `myloader --overwrite-tables --directory=/backups/retail_dump/`
  },
  {
    question: "What is the difference between `mysqlpump`'s `--default-parallelism` and `--parallel-schemas` flags?",
    shortAnswer: "`--default-parallelism` sets the default worker thread count across all tables; `--parallel-schemas=N:db1,db2` dedicates N specific threads to dump named databases concurrently.",
    explanation: "Allows allocating more threads to large, high-volume databases while smaller databases share fewer threads.",
    hint: "default-parallelism sets global threads; parallel-schemas allocates threads per database.",
    level: "intermediate",
    codeExample: `mysqlpump --default-parallelism=4 --parallel-schemas=8:kolkata_finance > dump.sql`
  },
  {
    question: "Why is `myloader` significantly faster than sourcing a monolithic SQL file inside the `mysql` CLI?",
    shortAnswer: "Because `myloader` opens multiple dedicated TCP database sessions and executes parallel data inserts concurrently across all CPU cores, whereas `mysql` executes sequentially over a single connection.",
    explanation: "Sourcing a 100GB SQL file in `mysql` client pushes single-thread CPU utilization to 100% while 15 other CPU cores sit idle. `myloader` drives all 16 cores at 90%+ utilization.",
    hint: "Uses multi-threaded parallel client connections instead of a single sequential connection.",
    level: "basic",
    codeExample: `-- mysql CLI: 1 thread = 3 hours
-- myloader: 16 threads = 18 minutes ✅`
  },
  {
    question: "How does `util.dumpInstance()` in MySQL Shell automatically detect and adapt to primary key distributions during table chunking?",
    shortAnswer: "It queries InnoDB internal page statistics to calculate balanced chunk boundaries, avoiding uneven data splits on non-uniform primary key sequences (e.g. UUIDs or sparse auto-increments).",
    explanation: "Adaptive chunking prevents thread starvation where one worker thread gets a 50GB chunk while other threads finish their 1GB chunks in seconds.",
    hint: "Uses internal statistics to create evenly distributed row chunks.",
    level: "expert",
    codeExample: `// MySQL Shell Adaptive Chunking:
util.dumpSchemas(['kolkata_retail'], '/backups/shell_dump', {bytesPerChunk: '64M'});`
  },
  {
    question: "What happens if a network interruption occurs while `util.loadDump()` in MySQL Shell is restoring a 500GB dump from AWS S3?",
    shortAnswer: "MySQL Shell maintains a local progress state file (`load-progress.json`), allowing `util.loadDump()` to resume loading immediately from the exact chunk where the interruption occurred without restarting from the beginning.",
    explanation: "Resumable loading prevents wasted hours of re-importing multi-hundred gigabyte dumps when transient network errors occur.",
    hint: "Resumes loading from the last successful chunk using its progress state file.",
    level: "expert",
    codeExample: `// Resume interrupted load without restarting:
util.loadDump('/backups/shell_dump', {resetProgress: false});`
  },
  {
    question: "What parameter in `mydumper` controls statement chunk sizing for multi-row `INSERT` statements?",
    shortAnswer: "`--statement-size=N` (in bytes), which controls the maximum byte size of individual multi-row `INSERT` statements written to data files.",
    explanation: "Defaulting to 1MB, adjusting `--statement-size` balances network packet efficiency against memory overhead.",
    hint: "Use --statement-size to control multi-row INSERT statement byte length.",
    level: "intermediate",
    codeExample: `mydumper --statement-size=1048576 --threads=8 -o /backups/dump/`
  },
  {
    question: "Can `myloader` restore only a specific list of tables from a large multi-table `mydumper` backup directory?",
    shortAnswer: "Yes, using the `--tables-list=table1,table2` or `--regex` option in `myloader`.",
    explanation: "Because `mydumper` creates individual files for each table, `myloader` can filter and restore only the required tables in seconds.",
    hint: "Use --tables-list or --regex with myloader.",
    level: "basic",
    codeExample: `myloader --tables-list=orders,order_items --directory=/backups/full_dump/`
  },
  {
    question: "How do you configure `mydumper` to exclude table data and dump only schema DDL across all tables in parallel?",
    shortAnswer: "Supply the `--no-data` (`-d`) flag: `mydumper -u root -p --no-data --threads=8 -o /backups/schema_only/`.",
    explanation: "Extracts table definitions and stored procedures in parallel without writing any data rows.",
    hint: "Use --no-data with mydumper.",
    level: "basic",
    codeExample: `mydumper -u root -p --no-data --threads=8 -o /backups/ddl_only/`
  },
  {
    question: "How does `mydumper` handle non-InnoDB tables (e.g. MyISAM) during parallel backup capture?",
    shortAnswer: "It dumps non-InnoDB tables first while the initial global read lock is held, then releases the global lock and allows worker threads to dump InnoDB tables concurrently under MVCC.",
    explanation: "This minimizes the global lock duration while ensuring non-transactional tables are captured in a consistent state.",
    hint: "Dumps non-InnoDB tables under lock first, then releases lock for InnoDB MVCC dumps.",
    level: "expert",
    codeExample: `-- Non-InnoDB dumped under lock → UNLOCK TABLES → InnoDB dumped in parallel.`
  },
  {
    question: "What is the CPU and disk I/O overhead of running `mydumper` with `--threads=16` on an active production master?",
    shortAnswer: "It generates high CPU utilization and heavy disk read throughput; on a busy production server, it can compete with user queries for buffer pool and I/O bandwidth unless thread counts are throttled.",
    explanation: "Best practice dictates sizing threads to ~50% of available CPU cores on active masters (e.g. 4-8 threads), or taking parallel dumps from dedicated read replicas.",
    hint: "High thread counts can cause I/O contention; dump from replicas or throttle threads.",
    level: "intermediate",
    codeExample: `# Recommended for busy master: limit to 4 threads
mydumper --threads=4 --rows=100000 -o /backups/throttled/`
  },
  {
    question: "How does `myloader` optimize InnoDB index creation during bulk parallel restoration?",
    shortAnswer: "It loads table rows first using primary keys, and can defer secondary index creation until all table data chunks have been inserted, speeding up total restore time.",
    explanation: "Building secondary indexes in bulk from pre-sorted data is up to 4x faster than maintaining indexes during row-by-row insertion.",
    hint: "Loads rows via PK first, then builds secondary indexes in bulk.",
    level: "expert",
    codeExample: `-- Bulk load data chunks → Post-load secondary index build.`
  },
  {
    question: "What is the recommended tool comparison for logical backups on a 50GB database?",
    shortAnswer: "`mydumper`/`myloader` or MySQL Shell Dump & Load is recommended over `mysqldump` because parallel processing cuts backup and restore durations by 70-80%.",
    explanation: "At 50GB scale, single-threaded `mysqldump` restore times exceed 1.5 hours, whereas `myloader` restores in under 15 minutes.",
    hint: "Parallel logical tools cut restore times by 70-80% compared to mysqldump.",
    level: "basic",
    codeExample: `-- 50GB Database: mydumper/myloader is 5x faster than mysqldump.`
  },
  {
    question: "How do you verify the exit code of `mydumper` and `myloader` in automated shell scripts?",
    shortAnswer: "Inspect `$?` immediately after command execution (`if [ $? -eq 0 ]; then echo 'Parallel Backup OK'; fi`).",
    explanation: "Both utilities return exit code 0 on success and non-zero on connection or file write errors.",
    hint: "Check $? for zero exit status.",
    level: "basic",
    codeExample: `mydumper --threads=8 -o /backups/daily/
if [ $? -ne 0 ]; then
  echo "mydumper failed!" | mail -s "DR Alert" dba@company.com
fi`
  },
  {
    question: "What is the primary difference between `mydumper` and Percona XtraBackup?",
    shortAnswer: "`mydumper` is a multi-threaded Logical backup tool (outputs SQL text files); Percona XtraBackup is a Physical block-level hot backup tool (copies raw binary `.ibd` files).",
    explanation: "`mydumper` produces portable SQL files across different MySQL versions. XtraBackup produces binary block copies for ultra-fast line-rate restores on multi-terabyte databases.",
    hint: "mydumper is parallel logical; XtraBackup is physical block-level.",
    level: "basic",
    codeExample: `-- mydumper: Parallel SQL text (Portability & Flexibility)
-- XtraBackup: Raw binary .ibd blocks (Maximum multi-terabyte speed)`
  },
  {
    question: "What is the primary operational takeaway of Topic 5 in Module 004_004?",
    shortAnswer: "High-speed parallel logical dump tools (`mydumper`/`myloader` and MySQL Shell Dump & Load) solve the single-threaded bottleneck of `mysqldump`: leverage multi-threading across tables and intra-table chunking (`--rows`) to reduce backup and restore times by over 80% on medium-to-large datasets (20GB - 200GB).",
    explanation: "Parallel logical tools bridge the gap between simple `mysqldump` and physical XtraBackup, providing high-speed multi-core restore performance while retaining the full portability and modularity of logical SQL backups.",
    hint: "Summarize multi-threaded parallelism, intra-table chunking, modular file layouts, and 80% restore time reduction.",
    level: "basic",
    codeExample: `-- Master Parallel Logical Pipeline:
mydumper -u root -p -B kolkata_retail --threads=8 --rows=250000 --compress=ZSTD -o /backups/parallel_dump/
myloader -u root -p -B kolkata_retail --threads=8 --directory=/backups/parallel_dump/ --overwrite-tables`
  }
];

export default questions;
