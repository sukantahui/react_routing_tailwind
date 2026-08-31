// topic6_files/topic6_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 6: Physical Hot Backups: Percona XtraBackup and MySQL Enterprise Backup Concepts

const questions = [
  {
    question: "What is a Physical Hot Backup in MySQL, and how does its architecture fundamentally differ from logical dumps?",
    shortAnswer: "A Physical Hot Backup directly copies raw 16KB binary data pages (`.ibd`), system tablespaces, undo logs, and redo logs at the filesystem block level while transactions are actively running, completely bypassing the SQL query parsing and index construction layer.",
    explanation: "Because physical backups copy raw data files directly, restoration is as fast as physical disk transfer speeds (e.g. 15 minutes for 5TB), delivering dramatically lower RTO compared to logical dumps.",
    hint: "Copies raw binary data blocks directly from disk without SQL parsing.",
    level: "basic",
    codeExample: `# Physical Hot Backup with Percona XtraBackup:
xtrabackup --backup --target-dir=/data/backups/base_2026/`
  },
  {
    question: "What are the 3 distinct phases in the Percona XtraBackup (PXB) backup and restoration lifecycle?",
    shortAnswer: "1. Backup Phase (`--backup`): Copies data files while streaming redo logs. 2. Prepare Phase (`--prepare`): Applies redo logs to achieve crash consistency. 3. Copy-Back Phase (`--copy-back`): Copies prepared binary files into an empty MySQL data directory.",
    explanation: "Understanding these 3 phases is essential: raw backup copies are crash-inconsistent until prepared with redo logs, after which they can be restored and booted instantly by MySQL.",
    hint: "Recall the 3 phases: Backup → Prepare → Copy-Back.",
    level: "basic",
    codeExample: `# Phase 1: Backup
xtrabackup --backup --target-dir=/backups/base
# Phase 2: Prepare
xtrabackup --prepare --target-dir=/backups/base
# Phase 3: Copy-Back
xtrabackup --copy-back --target-dir=/backups/base`
  },
  {
    question: "How does Percona XtraBackup guarantee transaction consistency while copying files on an active server where data pages are being modified mid-backup?",
    shortAnswer: "It runs a dedicated background log-copying thread that continuously tails and records all active InnoDB Redo Log changes into `xtrabackup_logfile` while data files are being copied, ensuring no in-flight page modifications are missed.",
    explanation: "During the subsequent `--prepare` phase, XtraBackup applies the recorded redo log changes to the copied data pages (executing standard InnoDB crash recovery), bringing all pages to an identical Log Sequence Number (LSN).",
    hint: "Continuously streams active redo logs in the background while copying pages.",
    level: "expert",
    codeExample: `-- Redo log streaming ensures that page modifications made during file copy are captured.`
  },
  {
    question: "Why is the `--prepare` phase mandatory before restoring an XtraBackup physical backup?",
    shortAnswer: "Because the raw copied `.ibd` files represent an in-flight, crash-inconsistent state; the `--prepare` step applies the recorded redo logs to roll forward committed changes and rollback uncommitted transactions, making the files 100% crash-consistent and ready for MySQL to boot.",
    explanation: "Attempting to boot MySQL on an unprepared backup directory will trigger fatal InnoDB page corruption or recovery crashes.",
    hint: "Executes crash recovery to roll forward committed changes and rollback uncommitted transactions.",
    level: "intermediate",
    codeExample: `xtrabackup --prepare --target-dir=/backups/base`
  },
  {
    question: "What does the `--apply-log-only` flag do during the `--prepare` phase of an XtraBackup incremental backup chain?",
    shortAnswer: "It instructs XtraBackup to apply the redo logs (rolling forward committed transactions) but PREVENTS the rollback of uncommitted transactions, keeping the data pages open to receive subsequent incremental delta files.",
    explanation: "If you rollback uncommitted transactions on a base backup, subsequent incremental backups cannot be applied to it. `--apply-log-only` is used on the base and all intermediate incremental steps, and omitted only on the final step.",
    hint: "Prevents rollback of uncommitted transactions during intermediate incremental preparation.",
    level: "expert",
    codeExample: `# Base Prepare (Keep open for incrementals):
xtrabackup --prepare --apply-log-only --target-dir=/backups/base

# Final Incremental Prepare (Perform full rollback):
xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc1`
  },
  {
    question: "How does Percona XtraBackup determine which 16KB pages to copy when capturing an Incremental Physical Backup?",
    shortAnswer: "It reads the Log Sequence Number (LSN) in the header of each 16KB InnoDB page and copies only pages whose LSN is greater than the `to_lsn` checkpoint of the previous backup.",
    explanation: "This page-level LSN filtering produces compact incremental backup files containing only modified disk blocks.",
    hint: "Compares 16KB page header LSNs against the previous backup checkpoint LSN.",
    level: "expert",
    codeExample: `xtrabackup --backup --target-dir=/backups/inc1 --incremental-basedir=/backups/base`
  },
  {
    question: "What critical metadata is stored in the `xtrabackup_checkpoints` file in every backup directory?",
    shortAnswer: "`backup_type` (full-backuped / incremental), `from_lsn` (starting LSN), `to_lsn` (target checkpoint LSN), and `last_lsn` (highest redo log LSN scanned).",
    explanation: "These LSN coordinates define the exact boundaries of the backup and are used to validate and chain incremental backups.",
    hint: "Contains backup_type, from_lsn, to_lsn, and last_lsn.",
    level: "intermediate",
    codeExample: `# xtrabackup_checkpoints contents:
# backup_type = full-prepared
# from_lsn = 0
# to_lsn = 184920491
# last_lsn = 184920550`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a 500GB database needed nightly backups. How did they achieve non-blocking physical backups with XtraBackup?",
    shortAnswer: "They scheduled `xtrabackup --backup --parallel=4 --target-dir=/backups/base`, which completed in 18 minutes while POS cashiers processed sales with zero locking or write latency.",
    explanation: "Because XtraBackup reads raw data blocks while streaming redo logs, InnoDB tables remain fully readable and writable throughout the entire backup window.",
    hint: "XtraBackup operates with zero write locking on InnoDB tables.",
    level: "moderate",
    codeExample: `# Barrackpore 500GB Nightly Physical Backup:
xtrabackup --backup --parallel=4 --target-dir=/backups/daily_$(date +%F)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, managing a 6TB core banking cluster processing ₹500 Crores in volume required a 15-minute RTO SLA. How did XtraBackup meet this SLA?",
    shortAnswer: "Restoring the 6TB physical backup via `xtrabackup --copy-back` on high-speed NVMe SAN storage took 12 minutes, meeting the 15-minute RTO SLA with zero query rebuild overhead.",
    explanation: "A logical dump of 6TB would have taken 14+ hours to restore. Physical block copying restored the database in 12 minutes.",
    hint: "Physical block-level restore met the 15-minute RTO SLA on a 6TB database.",
    level: "expert",
    codeExample: `# Kolkata Bank 6TB Rapid Restore:
xtrabackup --prepare --target-dir=/backups/base
xtrabackup --copy-back --target-dir=/backups/base --parallel=16
chown -R mysql:mysql /var/lib/mysql`
  },
  {
    question: "What is the `xbstream` format in Percona XtraBackup?",
    shortAnswer: "A custom high-performance streaming format designed by Percona to stream multi-file parallel backup streams directly through standard output into compression or network pipes without intermediate disk files.",
    explanation: "`xbstream` allows streaming parallel file backups into compressors (`zstd`) and uploading directly to cloud object storage (AWS S3) in a single pipeline.",
    hint: "Streaming format for piping multi-file parallel backups into compression or network streams.",
    level: "intermediate",
    codeExample: `xtrabackup --backup --stream=xbstream --parallel=8 | zstd -T8 > /backups/full_base.xbstream.zst`
  },
  {
    question: "How do you extract a compressed `.xbstream.zst` backup archive?",
    shortAnswer: "Pipe the decompression tool into `xbstream -x`: `zstd -dc backup.xbstream.zst | xbstream -x -C /target/restore_dir/`.",
    explanation: "This decompresses and unpacks all individual tablespace files and redo logs into the target directory.",
    hint: "Use zstd -dc piped into xbstream -x -C target_directory.",
    level: "basic",
    codeExample: `mkdir -p /backups/prepared_base
zstd -dc /backups/full_base.xbstream.zst | xbstream -x -C /backups/prepared_base`
  },
  {
    question: "Why must the target MySQL data directory (`/var/lib/mysql`) be completely empty before running `xtrabackup --copy-back`?",
    shortAnswer: "To prevent mixing old corrupted or inconsistent database files with the new backup files; `xtrabackup` will abort with an error if the destination directory contains existing files.",
    explanation: "Ensures the restore target is clean and prevents accidental overwrite of active data directories.",
    hint: "Destination directory must be empty to avoid file conflicts and corruption.",
    level: "basic",
    codeExample: `rm -rf /var/lib/mysql/*
xtrabackup --copy-back --target-dir=/backups/prepared_base`
  },
  {
    question: "What mandatory operating system command must be executed immediately after running `xtrabackup --copy-back` before starting MySQL?",
    shortAnswer: "`chown -R mysql:mysql /var/lib/mysql`.",
    explanation: "Because `xtrabackup` is typically run as `root` or a backup user, the restored files are owned by that user. MySQL runs as the `mysql` system user and will fail to start with `Permission denied` unless ownership is transferred.",
    hint: "Set file ownership to mysql:mysql.",
    level: "basic",
    codeExample: `chown -R mysql:mysql /var/lib/mysql
systemctl start mysqld`
  },
  {
    question: "What is the difference between `xtrabackup --copy-back` and `xtrabackup --move-back`?",
    shortAnswer: "`--copy-back` copies files (preserving the original backup directory on the backup partition); `--move-back` moves the files (faster and uses zero extra disk space, but empties the backup directory).",
    explanation: "`--move-back` is ideal when disk storage on the restore server is limited and cannot hold both the backup archive and the live data directory simultaneously.",
    hint: "--copy-back preserves the backup; --move-back moves files instantly without extra disk space.",
    level: "intermediate",
    codeExample: `xtrabackup --move-back --target-dir=/backups/prepared_base`
  },
  {
    question: "How does Percona XtraBackup handle InnoDB Tablespace Encryption (TDE) at rest?",
    shortAnswer: "It copies the raw encrypted `.ibd` files directly without decrypting them, and backs up the keyring file / Vault credentials (`--keyring-file-data`) to ensure backups remain fully encrypted at rest.",
    explanation: "Backups maintain military-grade AES-256 encryption throughout transfer and storage without exposing plaintext data.",
    hint: "Copies encrypted blocks directly and manages keyring metadata.",
    level: "expert",
    codeExample: `xtrabackup --backup --target-dir=/backups/tde_base \\
  --keyring-file-data=/var/lib/mysql-keyring/keyring`
  },
  {
    question: "What is the difference between Percona XtraBackup (PXB) and Oracle MySQL Enterprise Backup (MEB)?",
    shortAnswer: "Percona XtraBackup is open-source (GPL) and free; MySQL Enterprise Backup (MEB - `mysqlbackup`) is a proprietary commercial utility included with Oracle MySQL Enterprise Edition subscriptions.",
    explanation: "Both utilities provide non-blocking physical hot backups with redo log streaming, LSN incrementals, and cloud integration.",
    hint: "XtraBackup is open-source; MEB is Oracle's commercial enterprise backup tool.",
    level: "basic",
    codeExample: `-- Both tools achieve identical physical hot backup architecture.`
  },
  {
    question: "What is the purpose of the `--use-memory` parameter during `xtrabackup --prepare`?",
    shortAnswer: "It allocates a dedicated amount of RAM buffer pool (e.g. `--use-memory=4G` or `8G`) for the crash recovery process, drastically speeding up the redo log parsing and page preparation phase.",
    explanation: "Defaulting to 100MB, allocating 4GB-8GB of RAM can reduce preparation time on large multi-gigabyte redo log streams from 20 minutes to 2 minutes.",
    hint: "Allocates RAM buffer pool to accelerate the prepare crash recovery phase.",
    level: "intermediate",
    codeExample: `xtrabackup --prepare --use-memory=8G --target-dir=/backups/base`
  },
  {
    question: "What happens if the MySQL server crashes during an ongoing `xtrabackup --backup` operation?",
    shortAnswer: "The running backup operation simply fails; the production MySQL database is completely unaffected because XtraBackup only reads data pages and redo logs without performing any write or lock operations.",
    explanation: "Because XtraBackup is a read-only process from the database's perspective, backup failures never cause database corruption.",
    hint: "Database is unaffected because XtraBackup only reads data.",
    level: "basic",
    codeExample: `-- XtraBackup is purely read-only on the source database.`
  },
  {
    question: "How does `xtrabackup` record binary log coordinates for Point-in-Time Recovery (PITR)?",
    shortAnswer: "It records the exact binary log file name, position, and GTID set in the `xtrabackup_binlog_info` file inside the backup directory.",
    explanation: "This file provides the starting coordinate needed to replay subsequent binary logs after restoring the physical base backup.",
    hint: "Stores binlog coordinates in the xtrabackup_binlog_info file.",
    level: "intermediate",
    codeExample: `# xtrabackup_binlog_info contents:
# binlog.000045   1582910   3e11fa47-71ca-11eb-9876-0242ac120002:1-49201`
  },
  {
    question: "What is the `--rsync` option in XtraBackup, and how does it optimize non-InnoDB file copying?",
    shortAnswer: "It uses `rsync` to synchronize non-InnoDB files (such as `.frm` definitions, user privilege tables) in a single pass while the brief global lock is held.",
    explanation: "Minimizes global lock duration by optimizing the transfer of non-InnoDB schema files.",
    hint: "Uses rsync for fast synchronization of non-InnoDB files.",
    level: "expert",
    codeExample: `xtrabackup --backup --rsync --target-dir=/backups/base`
  },
  {
    question: "Can an individual table be restored from a Percona XtraBackup physical backup using Transportable Tablespaces?",
    shortAnswer: "Yes, by preparing the backup with `--export` (`xtrabackup --prepare --export --target-dir=/backups/base`), which generates `.cfg` metadata files allowing individual `.ibd` files to be imported via `ALTER TABLE tbl IMPORT TABLESPACE;`.",
    explanation: "This enables rapid physical restoration of a single dropped or corrupted table without restoring the whole multi-terabyte database.",
    hint: "Use --export during prepare to generate .cfg files for individual table imports.",
    level: "expert",
    codeExample: `xtrabackup --prepare --export --target-dir=/backups/base
-- In MySQL:
ALTER TABLE kolkata_retail.orders DISCARD TABLESPACE;
-- Copy orders.ibd and orders.cfg to data directory
ALTER TABLE kolkata_retail.orders IMPORT TABLESPACE;`
  },
  {
    question: "How does Percona XtraBackup handle non-transactional MyISAM tables during backup?",
    shortAnswer: "It copies all InnoDB tables first under non-blocking MVCC, then briefly executes `FLUSH TABLES WITH READ LOCK` to copy MyISAM tables and record binlog coordinates before immediately unlocking.",
    explanation: "Because MyISAM lacks transaction logs, read locks are mandatory for MyISAM consistency, but XtraBackup minimizes this lock to the final seconds of the backup.",
    hint: "Copies InnoDB first without locks, then locks briefly only to copy MyISAM tables.",
    level: "intermediate",
    codeExample: `-- 99% of backup time has zero locks; brief lock occurs only at the very end for MyISAM.`
  },
  {
    question: "What is the purpose of the `--throttle` option in XtraBackup?",
    shortAnswer: "It limits the maximum I/O operations per second (IOPS) consumed by XtraBackup during the backup phase, preventing the backup process from saturating disk I/O on busy production storage.",
    explanation: "Throttling protects production OLTP query response times during backup execution on shared disk arrays.",
    hint: "Throttles IOPS to prevent disk I/O saturation on active production servers.",
    level: "intermediate",
    codeExample: `xtrabackup --backup --throttle=500 --target-dir=/backups/throttled/`
  },
  {
    question: "How do you verify the exit code of `xtrabackup` in automated disaster recovery shell scripts?",
    shortAnswer: "Inspect `$?` immediately after execution and verify that the final line of the log contains `completed OK!`.",
    explanation: "Both checking `$? == 0` and searching for `completed OK!` confirms that all tablespaces and redo logs were copied without truncation.",
    hint: "Verify exit code $? and check for 'completed OK!' in the log output.",
    level: "basic",
    codeExample: `xtrabackup --backup --target-dir=/backups/base 2>&1 | tee backup.log
if grep -q "completed OK!" backup.log; then
  echo "XtraBackup Succeeded ✅"
fi`
  },
  {
    question: "What is the impact of missing the `--prepare` step on an incremental backup before restoring?",
    shortAnswer: "The restored database will fail to start with InnoDB page consistency assertion errors, resulting in corrupted or unreadable tablespaces.",
    explanation: "Incremental backups only contain modified page deltas; without `--prepare`, these deltas are never merged into the base `.ibd` tablespace files.",
    hint: "Restoring unprepared incremental deltas results in database boot failure.",
    level: "basic",
    codeExample: `-- Always run xtrabackup --prepare across base and all incrementals before copy-back.`
  },
  {
    question: "Why does physical backup restoration not require `SET FOREIGN_KEY_CHECKS=0`?",
    shortAnswer: "Because physical restoration restores pre-built, fully validated binary B-tree pages directly to disk; constraint validation occurs at the SQL layer, which is bypassed during physical block copying.",
    explanation: "All foreign key pointers and secondary index pages are already constructed and stored inside the `.ibd` files.",
    hint: "Physical restores copy pre-built binary pages directly, bypassing SQL constraint validation.",
    level: "intermediate",
    codeExample: `-- Foreign key checks are irrelevant during physical block file copy.`
  },
  {
    question: "What is the recommended storage configuration for taking physical hot backups of multi-terabyte databases?",
    shortAnswer: "Store backups on a dedicated NVMe/SSD partition or stream directly across 10Gbps/40Gbps network links to an offsite NFS/S3 storage tier using `--stream=xbstream`.",
    explanation: "Avoids competing with production InnoDB data directory disk bandwidth and ensures fast transfer.",
    hint: "Use dedicated NVMe partitions or 10Gbps streaming to avoid disk contention.",
    level: "basic",
    codeExample: `# Dedicated backup mount:
xtrabackup --backup --target-dir=/mnt/backup_nvme/base/`
  },
  {
    question: "How does `xtrabackup --parallel=8` speed up physical backup capture?",
    shortAnswer: "It spawns 8 concurrent worker threads, copying up to 8 `.ibd` tablespace files simultaneously across multi-channel NVMe storage.",
    explanation: "Maximizes NVMe disk read throughput and fully utilizes available CPU bandwidth.",
    hint: "Copies multiple tablespace files concurrently using parallel threads.",
    level: "basic",
    codeExample: `xtrabackup --backup --parallel=8 --target-dir=/backups/base`
  },
  {
    question: "What is the difference in portability between Percona XtraBackup and `mysqldump`?",
    shortAnswer: "`mysqldump` is universally portable across operating systems, CPU architectures, and MySQL major versions; XtraBackup is binary-bound and can only be restored to the same major/minor MySQL version and compatible OS.",
    explanation: "Physical binary pages depend on internal data dictionary schemas and endianness, making logical dumps mandatory for cross-version upgrades.",
    hint: "mysqldump is portable across versions; XtraBackup is bound to compatible binary versions.",
    level: "basic",
    codeExample: `-- XtraBackup: Restore to identical MySQL 8.0.x binary.
-- mysqldump: Restore across MySQL 5.7 → 8.0 or Linux → Windows.`
  },
  {
    question: "What is the primary operational takeaway of Topic 6 in Module 004_004?",
    shortAnswer: "Physical hot backups (Percona XtraBackup / MEB) provide essential enterprise disaster recovery for large databases (>100GB to multi-terabytes): master the 3-phase lifecycle (`--backup` with background redo log streaming, `--prepare` with crash recovery and `--apply-log-only` for incrementals, and `--copy-back` to empty data directories) to achieve sub-15 minute RTOs.",
    explanation: "Physical hot backups eliminate the SQL parsing and index-rebuilding bottlenecks of logical dumps. By copying raw 16KB blocks and tracking LSN deltas, enterprise database administrators guarantee rapid, non-blocking disaster recovery across multi-terabyte transactional systems.",
    hint: "Summarize physical block copying, 3-phase lifecycle, LSN incremental tracking, and sub-15 minute RTO.",
    level: "basic",
    codeExample: `-- Master Physical Disaster Recovery Runbook:
# 1. Capture Base:
xtrabackup --backup --parallel=8 --target-dir=/backups/base
# 2. Capture Incremental:
xtrabackup --backup --parallel=8 --target-dir=/backups/inc1 --incremental-basedir=/backups/base
# 3. Prepare Incremental Chain:
xtrabackup --prepare --apply-log-only --target-dir=/backups/base
xtrabackup --prepare --target-dir=/backups/base --incremental-dir=/backups/inc1
# 4. Restore:
rm -rf /var/lib/mysql/*
xtrabackup --copy-back --target-dir=/backups/base
chown -R mysql:mysql /var/lib/mysql`
  }
];

export default questions;
