// topic0_files/topic0_questions.js
// Module 004_004: Backup, Point-in-Time Recovery & Data Migration
// Topic 0: Backup Strategies: Recovery Time Objective (RTO) and Recovery Point Objective (RPO)

const questions = [
  {
    question: "What is Recovery Point Objective (RPO) in database disaster recovery?",
    shortAnswer: "The maximum acceptable amount of data loss measured in time elapsed since the last recoverable database state.",
    explanation: "RPO defines how much transactional data a business can tolerate losing during a catastrophic outage. For example, an RPO of 15 minutes means the database must be recoverable to a point in time no more than 15 minutes before the failure.",
    hint: "Think about data loss measured as a backward window of time.",
    level: "basic",
    codeExample: `-- High RPO (Daily Backup Only): Up to 24 hours of data lost!
-- Low/Near-Zero RPO (Full Backup + Continuous Binary Logs): < 1 second data lost!`
  },
  {
    question: "What is Recovery Time Objective (RTO) in database disaster recovery?",
    shortAnswer: "The maximum acceptable duration of system downtime required to restore database operations and bring services back online.",
    explanation: "RTO defines how long the business can tolerate being offline while engineers restore files, apply logs, and verify data integrity.",
    hint: "Think about the clock running while services are down during recovery.",
    level: "basic",
    codeExample: `-- Restoring a 1TB logical SQL dump takes ~6 hours (RTO = 6h).
-- Restoring a 1TB physical XtraBackup takes ~15 minutes (RTO = 15m).`
  },
  {
    question: "Why is High Availability (such as MySQL Replication or Group Replication) NOT a substitute for Disaster Recovery Backups?",
    shortAnswer: "Because replication immediately propagates human errors and data corruption (such as an accidental `DROP TABLE` or malicious `UPDATE`) to all replica nodes in milliseconds.",
    explanation: "If a developer drops a production database, a high-availability replica will drop the database immediately as well. Only independent point-in-time backups and archived binary logs allow restoring the lost data.",
    hint: "Replication copies mistakes and drops instantly; backups preserve historical state.",
    level: "basic",
    codeExample: `-- Master executes: DROP TABLE orders;
-- Slave replica executes: DROP TABLE orders; (Instant disaster on all nodes!)`
  },
  {
    question: "What is the '3-2-1 Backup Rule' for enterprise database reliability?",
    shortAnswer: "Maintain at least 3 copies of data, across 2 different storage media types, with at least 1 copy stored offsite in an immutable location.",
    explanation: "3 copies ensure redundancy (1 production + 2 backups). 2 media types protect against hardware-specific failures (e.g. NVMe + S3 Cloud Object Storage). 1 offsite immutable copy protects against regional datacenter disasters and ransomware.",
    hint: "3 copies, 2 media, 1 offsite.",
    level: "basic",
    codeExample: `-- 1. Production NVMe Storage
-- 2. Local Backup Storage Appliance (NFS/SAN)
-- 3. Immutable Cloud Storage Bucket (AWS S3 with Object Lock / GCS Bucket Lock)`
  },
  {
    question: "How do MySQL Binary Logs (binlogs) enable near-zero RPO?",
    shortAnswer: "By recording every committed data mutation continuously in real time, allowing point-in-time replay up to the exact transaction before a crash.",
    explanation: "A nightly full backup restores the database state to midnight. Replaying the binary logs from midnight up to 2:14:32 PM recovers all intermediate transactions, reducing data loss to less than one second.",
    hint: "Replaying binary logs fills the gap between the last full backup and the failure timestamp.",
    level: "intermediate",
    codeExample: `# Point-in-Time Recovery Workflow:
mysql < full_backup_midnight.sql
mysqlbinlog --start-datetime="2026-08-25 00:00:00" binlog.000045 | mysql`
  },
  {
    question: "Why do Physical Backups (e.g. Percona XtraBackup) deliver dramatically lower RTO than Logical Backups (`mysqldump`) on multi-terabyte databases?",
    shortAnswer: "Physical backups copy raw InnoDB data pages directly at the disk block level, avoiding the expensive SQL query parsing, index rebuilding, and transactional insert overhead required by logical SQL dumps.",
    explanation: "Restoring `mysqldump` requires the database engine to parse millions of `INSERT` statements and construct B-tree indexes from scratch. Restoring a physical backup is as fast as physical disk copy and crash recovery.",
    hint: "Block-level file copying is orders of magnitude faster than SQL INSERT parsing.",
    level: "intermediate",
    codeExample: `# Physical Restore: Fast file copy + apply-log
xtrabackup --prepare --target-dir=/backups/base
xtrabackup --copy-back --target-dir=/backups/base`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a point-of-sale server crashed at 4:30 PM. Backups were taken at midnight, and binary logs were streamed to cloud storage every minute. What was their actual data loss (RPO)?",
    shortAnswer: "Less than 1 minute of transactions.",
    explanation: "Because binary logs were streamed continuously to offsite storage, Mamata restored the midnight base backup and replayed binary logs up to 4:29 PM, losing at most the last 60 seconds of retail transactions.",
    hint: "Streaming binary logs bounds data loss to the streaming sync interval.",
    level: "moderate",
    codeExample: `-- Barrackpore Retail Disaster Recovery:
-- Base Backup: 00:00 Midnight
-- Binlog Stream: 00:00 to 16:29:45
-- Effective Data Loss (RPO) = 15 seconds!`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, processing ₹500 Crores in volume required an RTO under 15 minutes. Why did they choose Percona XtraBackup over `mysqldump`?",
    shortAnswer: "Restoring their 4TB database using `mysqldump` took 9 hours (violating the 15-minute RTO), whereas Percona XtraBackup restored the raw data files in 11 minutes.",
    explanation: "High-volume banking ledgers cannot afford 9 hours of downtime. Physical block-level hot backups met their strict 15-minute RTO SLA without locking the database during backup capture.",
    hint: "Physical backups meet aggressive RTO SLAs on multi-terabyte databases.",
    level: "expert",
    codeExample: `# Kolkata Bank 4TB Restore SLA:
# mysqldump restore: 9 hours (FAIL SLA)
# XtraBackup physical restore: 11 minutes (PASS SLA ✅)`
  },
  {
    question: "What is the difference between a Cold Backup, a Warm Backup, and a Hot Backup?",
    shortAnswer: "Cold: Database is completely shut down during backup. Warm: Database is online but read-only (write locks applied). Hot: Database is fully online with concurrent read and write operations permitted.",
    explanation: "Modern 24/7 web applications require non-blocking Hot Backups (using InnoDB MVCC or physical redo log tracking) to avoid user service interruption.",
    hint: "Cold = offline; Warm = read-only; Hot = full online read/write.",
    level: "basic",
    codeExample: `-- Cold: systemctl stop mysqld; tar -czf backup.tar.gz /var/lib/mysql
-- Warm: FLUSH TABLES WITH READ LOCK; (Blocks writes)
-- Hot: mysqldump --single-transaction OR xtrabackup (Zero write blocking!)`
  },
  {
    question: "What is an 'Immutable Backup', and how does it protect against Ransomware attacks?",
    shortAnswer: "A backup stored with Write-Once-Read-Many (WORM) policies that prevent anyone (including database administrators or compromised root credentials) from modifying or deleting the backup file until a retention timer expires.",
    explanation: "Modern ransomware attackers deliberately target and delete local database backups before encrypting production data. Storing backups in AWS S3 with Object Lock Compliance Mode guarantees that the backup cannot be erased by attackers.",
    hint: "WORM policies prevent modification or deletion even with administrative credentials.",
    level: "intermediate",
    codeExample: `# AWS S3 Immutable Object Lock:
# s3://bank-backups-2026/db_full.xbstream --object-lock-mode COMPLIANCE --object-lock-retain-until-date "2026-09-25"`
  },
  {
    question: "What is the golden rule regarding backup verification in enterprise operations?",
    shortAnswer: "'An untested backup is not a backup—it is merely an assumption.' Regular automated restore testing is mandatory.",
    explanation: "Many organizations discover that their backup files are corrupt, incomplete, or missing decryption keys only when an emergency occurs. Automated pipelines should restore backups to test instances daily and run verification queries.",
    hint: "Backups must be tested by performing actual restore runs to verify validity.",
    level: "basic",
    codeExample: `# Automated verification cron job:
# 1. Download backup -> 2. Restore to temp container -> 3. Run 'CHECK TABLE' & query counts`
  },
  {
    question: "What is the difference between a Full Backup, a Differential Backup, and an Incremental Backup?",
    shortAnswer: "Full: Backs up entire database. Incremental: Backs up only changes since the last backup (Full or Incremental). Differential: Backs up all changes since the last Full backup.",
    explanation: "Incremental backups save storage space and backup time, but require applying the chain of all previous incremental files during restore. Differential backups require only the base full backup plus the latest differential file.",
    hint: "Full = all data; Incremental = changes since last backup; Differential = changes since last full backup.",
    level: "intermediate",
    codeExample: `-- Sunday: Full Backup (100GB)
-- Monday: Incremental (5GB)
-- Tuesday: Incremental (6GB)
-- Restore on Wednesday: Full + Monday + Tuesday`
  },
  {
    question: "How does `innodb_flush_log_at_trx_commit = 1` impact database RPO during a sudden power failure?",
    shortAnswer: "It guarantees zero transaction loss (strict RPO = 0) by forcing the InnoDB Redo Log buffer to be flushed to physical disk on every single transaction commit.",
    explanation: "Setting `innodb_flush_log_at_trx_commit = 2` or `0` writes redo logs to OS cache or every 1 second, risking up to 1 second of committed transactions during an OS or power crash.",
    hint: "Value 1 ensures full ACID durability by flushing redo logs on every commit.",
    level: "intermediate",
    codeExample: `SET PERSIST innodb_flush_log_at_trx_commit = 1;`
  },
  {
    question: "What is Recovery Point Objective (RPO) if an organization only takes weekly full backups every Sunday at midnight without binary logging?",
    shortAnswer: "Up to 7 days (168 hours) of data loss.",
    explanation: "If the database fails on Saturday at 11:59 PM, all data created over the entire week is permanently unrecoverable.",
    hint: "Without binary logs, RPO equals the entire duration between backup runs.",
    level: "basic",
    codeExample: `-- High-risk anti-pattern: Weekly backup without binlogs = 168-hour RPO!`
  },
  {
    question: "How do Cloud Storage Lifecycle Policies optimize long-term backup retention costs?",
    shortAnswer: "By automatically transitioning backup files from Standard storage to Warm storage (Infrequent Access) after 30 days, and to Cold/Glacier storage after 90 days, retaining archives for 7 years at minimal cost.",
    explanation: "Regulatory compliance mandates retaining financial and medical records for years. Storing cold archives in Glacier reduces storage costs by over 90% compared to standard hot storage.",
    hint: "Automatically transitions backups from Hot -> Warm -> Cold Glacier storage.",
    level: "basic",
    codeExample: `# S3 Lifecycle Policy:
# 0-30 Days: S3 Standard -> 31-90 Days: S3 Glacier Instant -> 91-2555 Days: S3 Glacier Deep Archive`
  },
  {
    question: "What metric measures the financial loss per hour of database downtime for an enterprise?",
    shortAnswer: "Cost of Downtime (CoD), which includes lost revenue, employee idle time, SLA breach penalties, and reputational damage.",
    explanation: "Calculating Cost of Downtime justifies the investment in low-RTO physical backup infrastructure, replica failover clusters, and automated recovery pipelines.",
    hint: "Cost of Downtime quantifies lost revenue and SLA penalties per hour of outage.",
    level: "basic",
    codeExample: `-- If CoD is ₹50 Lakhs/hour, reducing RTO from 4h to 15m saves ₹1.87 Crores per incident!`
  },
  {
    question: "What is Split-Brain syndrome in high-availability database clusters, and how can it impact RPO?",
    shortAnswer: "A network partition where two database nodes both believe they are the primary source and accept conflicting writes simultaneously, leading to data divergence and loss during reconciliation.",
    explanation: "Split-brain causes irreversible data inconsistency. Resolving it requires manual reconciliation, leading to data loss and violating RPO targets. MySQL Group Replication uses Raft/Paxos consensus to prevent split-brain.",
    hint: "Two nodes accept conflicting writes simultaneously due to network partition.",
    level: "expert",
    codeExample: `-- Quorum-based consensus (Group Replication) prevents split-brain.`
  },
  {
    question: "How does storage snapshotting (e.g. AWS EBS Snapshots, ZFS, LVM) fit into database backup strategies?",
    shortAnswer: "Storage snapshots freeze block-level state in seconds, but require either freezing the database (`FLUSH TABLES WITH READ LOCK`) or relying on InnoDB crash recovery upon snapshot restore.",
    explanation: "Taking an uncoordinated storage snapshot is equivalent to pulling the server power plug. When restored, InnoDB must execute crash recovery from the redo logs to ensure consistency.",
    hint: "Block snapshots are instant, but require database coordination or crash recovery.",
    level: "intermediate",
    codeExample: `# Coordinate snapshot:
mysql -e "FLUSH TABLES WITH READ LOCK;"
aws ec2 create-snapshot --volume-id vol-12345
mysql -e "UNLOCK TABLES;"`
  },
  {
    question: "What is a 'Disaster Recovery Runbook'?",
    shortAnswer: "A step-by-step, documented and tested operational procedure detailing exact commands and checklists required to restore database services during a major incident.",
    explanation: "During high-pressure production outages, engineers should execute predefined, tested runbooks rather than improvising recovery steps.",
    hint: "Documented operational checklist and execution steps for crisis recovery.",
    level: "basic",
    codeExample: `# DR Runbook: Step 1: Verify Hardware -> Step 2: Restore Base -> Step 3: Apply Binlogs -> Step 4: Smoke Test`
  },
  {
    question: "How does `sync_binlog = 1` impact database RPO?",
    shortAnswer: "It forces the MySQL server to synchronize the binary log file to disk after every single committed transaction, guaranteeing that no transactions are lost from the binlog during a crash.",
    explanation: "Setting `sync_binlog = 0` or `N > 1` allows the operating system to buffer binlog writes, risking the loss of committed transactions from the binlog stream if the host crashes.",
    hint: "Flushes binary log to disk on every commit, ensuring zero lost binlog events.",
    level: "intermediate",
    codeExample: `SET PERSIST sync_binlog = 1;`
  },
  {
    question: "What is the difference between RTO for an entire database failure versus RTO for a single table recovery?",
    shortAnswer: "Full database RTO requires restoring the entire instance; single table recovery can be performed in a separate sandbox instance and exported/imported via transportable tablespaces without taking other tables offline.",
    explanation: "Recovering a single dropped table without disturbing other active schemas minimizes business disruption.",
    hint: "Single table recovery can be isolated to a temporary sandbox to avoid full downtime.",
    level: "expert",
    codeExample: `ALTER TABLE orders DISCARD TABLESPACE;
-- Copy restored orders.ibd and orders.cfg from sandbox
ALTER TABLE orders IMPORT TABLESPACE;`
  },
  {
    question: "How does database backup compression (e.g. gzip, zstd, lz4) impact RTO and storage costs?",
    shortAnswer: "Compression reduces backup file size by 60-80% (lowering storage and transfer costs), but decompression adds CPU processing time during restore, slightly increasing RTO unless fast algorithms like `zstd` or `lz4` are used.",
    explanation: "Modern compression algorithms like `zstd` offer the optimal balance of ultra-fast decompression speed and high compression ratios.",
    hint: "Reduces storage size and transfer time; modern zstd/lz4 minimize decompression CPU latency.",
    level: "intermediate",
    codeExample: `mysqldump --single-transaction ecommerce | zstd -T4 -3 > backup.sql.zst`
  },
  {
    question: "What is Geographic Redundancy in backup strategy?",
    shortAnswer: "Storing backup replicas in geographically distant physical regions (e.g. Mumbai and Hyderabad) to ensure survival against natural disasters, power grid failures, or regional fiber cuts.",
    explanation: "If an earthquake or flood knocks out an entire datacenter region, offsite geographic replicas allow restoring operations in another cloud region.",
    hint: "Storing copies in different geographic regions protects against regional catastrophes.",
    level: "basic",
    codeExample: `# Cross-Region S3 Replication:
# Source: ap-south-1 (Mumbai) -> Replica: ap-south-2 (Hyderabad)`
  },
  {
    question: "What role does Checksum Validation (e.g. SHA256 or MD5) play in backup integrity?",
    shortAnswer: "It verifies that backup archive files have not suffered bit rot, network truncation, or silent disk corruption during storage and transfer.",
    explanation: "Generating a `.sha256` checksum file alongside every backup and verifying it before restoration ensures corrupted archives are detected immediately.",
    hint: "Cryptographic hash verification ensures backup files are not corrupted or truncated.",
    level: "basic",
    codeExample: `sha256sum backup_20260825.xbstream > backup_20260825.sha256
sha256sum -c backup_20260825.sha256 # Verifies file integrity ✅`
  },
  {
    question: "How does database schema size impact the choice between Logical and Physical backups?",
    shortAnswer: "Databases under 50GB can comfortably use logical backups (`mysqldump`); databases exceeding 100GB-1TB must use physical hot backups (XtraBackup) to keep RTO within acceptable enterprise SLA limits.",
    explanation: "As database size scales into terabytes, logical dump restore times scale linearly into hours or days, making physical backups mandatory for enterprise SLAs.",
    hint: "Small databases (<50GB) use logical dumps; large databases (>100GB) require physical backups.",
    level: "intermediate",
    codeExample: `-- < 50GB: mysqldump is simple, portable, and human-readable.
-- > 100GB: Percona XtraBackup is mandatory for sub-30 minute RTO.`
  },
  {
    question: "What is 'Point-in-Time Recovery' (PITR) in one concise sentence?",
    shortAnswer: "The process of restoring a full base backup and rolling forward incremental transactional changes from binary logs to recover the database to an exact target microsecond.",
    explanation: "PITR allows rolling back to 1 second before a destructive accidental command (like `DROP DATABASE`) occurred.",
    hint: "Base backup + replay binary logs up to a specific timestamp.",
    level: "basic",
    codeExample: `mysqlbinlog --stop-datetime="2026-08-25 14:15:00" binlog.000010 | mysql -u root`
  },
  {
    question: "What security measures must be applied to database backup files?",
    shortAnswer: "Encryption at rest (AES-256), encryption in transit (TLS), strict IAM access controls (least privilege), and immutable storage lock policies.",
    explanation: "Backup files contain the entire company's sensitive data in one file. Storing unencrypted backups on public or shared network drives creates severe data breach risks.",
    hint: "Encrypt backups, restrict IAM access, and enforce immutability.",
    level: "basic",
    codeExample: `# Encrypted physical backup:
xtrabackup --backup --encrypt=AES256 --encrypt-key-file=/etc/mysql/backup.key`
  },
  {
    question: "What is Mean Time Between Failures (MTBF) and Mean Time to Recovery (MTTR)?",
    shortAnswer: "MTBF measures the average operating time between system crashes (system reliability); MTTR measures the average time required to repair and restore the system after a crash (service recovery speed).",
    explanation: "Engineers aim to maximize MTBF through robust hardware and HA clustering, and minimize MTTR (equivalent to RTO) through automated backup pipelines.",
    hint: "MTBF = how long it stays up; MTTR = how fast you restore when it goes down.",
    level: "intermediate",
    codeExample: `-- MTBF: Aim for months/years of continuous uptime.
-- MTTR: Aim for minutes to recover from unexpected failure.`
  },
  {
    question: "Why should backup jobs be monitored with automated heartbeat and alert notifications?",
    shortAnswer: "To prevent 'Silent Backup Failures' where scheduled backup cron jobs fail silently for weeks due to disk full errors or credential changes without anyone noticing.",
    explanation: "If backup jobs do not notify monitoring systems (Dead Man's Snitch, Prometheus alerts) on success, silent failures will leave the organization without recent backups when a disaster strikes.",
    hint: "Alerts ensure failed backup cron jobs are investigated immediately.",
    level: "basic",
    codeExample: `# Monitoring backup cron job:
0 1 * * * /scripts/backup.sh && curl -fsS -m 10 --retry 5 https://hc-ping.com/YOUR-UUID`
  },
  {
    question: "What is the primary operational takeaway of Topic 0 in Module 004_004?",
    shortAnswer: "A comprehensive disaster recovery strategy is defined by clear RTO and RPO SLAs: enforce the 3-2-1 backup rule, stream continuous binary logs for near-zero RPO, use physical backups for low RTO on large databases, and conduct automated restore testing regularly.",
    explanation: "High availability is not a backup. By pairing immutable offsite storage with tested point-in-time recovery runbooks, database architects ensure business continuity against hardware failures, human error, and ransomware.",
    hint: "Summarize RTO/RPO SLAs, 3-2-1 rule, continuous binlogs, and automated restore testing.",
    level: "basic",
    codeExample: `-- Enterprise Disaster Recovery Profile:
-- Target RPO: < 1 minute (Full Backup + Continuous Binary Log Streaming)
-- Target RTO: < 15 minutes (Percona XtraBackup Physical Hot Backups)
-- Compliance: Immutable 3-2-1 Storage with Automated Nightly Sandbox Verification`
  }
];

export default questions;
