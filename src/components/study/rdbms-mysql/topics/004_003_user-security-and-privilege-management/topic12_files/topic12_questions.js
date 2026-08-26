// topic12_files/topic12_questions.js
// Topic 12: Securing Data at Rest: InnoDB Tablespace Encryption (TDE - Transparent Data Encryption) and Keyrings

const questions = [
  {
    question: "What is Transparent Data Encryption (TDE) in MySQL 8.0, and what threats does it mitigate?",
    shortAnswer: "TDE encrypts InnoDB tablespace data blocks on physical disk at rest, protecting against raw disk theft, unauthorized OS file copying, stolen backups, and unencrypted cloud snapshot exfiltration.",
    explanation: "TDE operates at the storage engine layer. When data pages are written from the InnoDB Buffer Pool to disk, InnoDB encrypts them with AES-256; when read from disk, they are decrypted back into memory. Applications require zero query modifications.",
    hint: "Encrypts physical database files (.ibd) on disk without requiring application code changes.",
    level: "basic",
    codeExample: `CREATE TABLE kolkata_retail.credit_cards (
  card_id INT PRIMARY KEY AUTO_INCREMENT,
  card_hash VARCHAR(64) NOT NULL
) ENCRYPTION = 'Y';`
  },
  {
    question: "How does the Two-Tier Key Architecture work in MySQL InnoDB TDE?",
    shortAnswer: "Tier 1: Master Encryption Key (MEK) stored in an external Keyring. Tier 2: Tablespace Keys (DEK) stored in the tablespace header and encrypted by the MEK.",
    explanation: "The Tablespace Key (DEK) encrypts the actual 16KB data pages on disk. The Master Key (MEK) encrypts only the DEK. This separation allows instant Master Key rotation without touching data pages.",
    hint: "Master Key encrypts Tablespace Keys; Tablespace Keys encrypt data pages.",
    level: "intermediate",
    codeExample: `-- Master Key (Keyring) -> Encrypts Tablespace Key (Header) -> Encrypts 16KB Data Pages (Disk)`
  },
  {
    question: "Why does rotating the InnoDB Master Key (`ALTER INSTANCE ROTATE INNODB MASTER KEY`) take only milliseconds even on a 10-terabyte database?",
    shortAnswer: "Because it only generates a new Master Key and re-encrypts the small tablespace keys stored in the file headers, without re-encrypting any of the physical data pages on disk.",
    explanation: "Since the actual data pages remain encrypted with their existing tablespace keys, only the tiny tablespace key headers in each `.ibd` file are re-encrypted with the new Master Key, completing in sub-second time.",
    hint: "Only file header keys are re-encrypted, not the millions of data pages.",
    level: "expert",
    codeExample: `ALTER INSTANCE ROTATE INNODB MASTER KEY;`
  },
  {
    question: "What is a MySQL Keyring, and what components or plugins are available in MySQL 8.0?",
    shortAnswer: "A keyring securely manages and stores Master Encryption Keys; available via `component_keyring_file`, `component_keyring_kmip` (HSM), `keyring_hashicorp` (Vault), and `keyring_aws` (AWS KMS).",
    explanation: "In MySQL 8.0, Keyring components replace legacy plugins, providing robust integration with enterprise Hardware Security Modules (HSMs) and cloud secret managers.",
    hint: "Keyrings store Master Keys locally or in external HSMs/Vaults.",
    level: "basic",
    codeExample: `-- Installing file-based keyring component:
INSTALL COMPONENT 'file://component_keyring_file';`
  },
  {
    question: "How do you enable TDE on an existing unencrypted InnoDB table?",
    shortAnswer: "Execute `ALTER TABLE table_name ENCRYPTION = 'Y';`.",
    explanation: "InnoDB converts the tablespace online, generating a tablespace key, writing it to the header encrypted by the MEK, and encrypting pages as they are rewritten.",
    hint: "Use ALTER TABLE ... ENCRYPTION = 'Y'.",
    level: "basic",
    codeExample: `ALTER TABLE kolkata_finance.customer_ledgers ENCRYPTION = 'Y';`
  },
  {
    question: "How do you enable encryption for InnoDB Redo Logs and Undo Logs in MySQL 8.0?",
    shortAnswer: "Set `SET GLOBAL innodb_redo_log_encrypt = ON;` and `SET GLOBAL innodb_undo_log_encrypt = ON;`.",
    explanation: "If only tablespaces are encrypted, sensitive data could still leak in cleartext inside redo logs or undo logs on disk. Enabling redo and undo log encryption closes this critical data leakage gap.",
    hint: "Enable innodb_redo_log_encrypt and innodb_undo_log_encrypt.",
    level: "intermediate",
    codeExample: `SET PERSIST innodb_redo_log_encrypt = ON;
SET PERSIST innodb_undo_log_encrypt = ON;`
  },
  {
    question: "What system variable configures all newly created tables to be encrypted by default?",
    shortAnswer: "`default_table_encryption = ON`.",
    explanation: "When enabled globally or at the database schema level (`CREATE DATABASE db DEFAULT ENCRYPTION = 'Y'`), any new `CREATE TABLE` without an explicit `ENCRYPTION` clause automatically inherits encrypted status.",
    hint: "Look at the default_table_encryption system variable.",
    level: "intermediate",
    codeExample: `SET PERSIST default_table_encryption = ON;
CREATE DATABASE kolkata_secure_db DEFAULT ENCRYPTION = 'Y';`
  },
  {
    question: "What is the `TABLE_ENCRYPTION_ADMIN` dynamic privilege in MySQL 8.0?",
    shortAnswer: "A dynamic privilege required to create unencrypted tables when `table_encryption_privilege_check = ON` is enabled.",
    explanation: "When `table_encryption_privilege_check = ON`, users cannot create unencrypted tables or disable encryption on existing tables unless they explicitly hold `TABLE_ENCRYPTION_ADMIN`, enforcing mandatory corporate compliance.",
    hint: "Required to override default encryption rules when privilege checks are enabled.",
    level: "expert",
    codeExample: `SET PERSIST table_encryption_privilege_check = ON;
GRANT TABLE_ENCRYPTION_ADMIN ON *.* TO 'compliance_officer'@'localhost';`
  },
  {
    question: "How can you query the data dictionary to inspect which tablespaces are currently encrypted on disk?",
    shortAnswer: "Query `SELECT SPACE, NAME, SPACE_TYPE, ENCRYPTION FROM information_schema.INNODB_TABLESPACES WHERE ENCRYPTION = 'Y';`.",
    explanation: "The `information_schema.INNODB_TABLESPACES` table provides a definitive view of physical tablespaces and their active cryptographic encryption state.",
    hint: "Query information_schema.INNODB_TABLESPACES filtering on ENCRYPTION = 'Y'.",
    level: "basic",
    codeExample: `SELECT SPACE, NAME, SPACE_TYPE, ENCRYPTION 
FROM information_schema.INNODB_TABLESPACES 
WHERE ENCRYPTION = 'Y';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, a hard drive from a decommissioned database server was stolen. How did InnoDB TDE protect customer data?",
    shortAnswer: "Because all tablespaces were encrypted with TDE (AES-256) and the Keyring file was stored on a separate secure key server, the thief only obtained indecipherable binary ciphertext blocks.",
    explanation: "Without the Master Encryption Key, opening `.ibd` files with raw hex editors or forensics tools yields zero plain text, customer names, or transaction figures.",
    hint: "Raw stolen disk files cannot be read without the external Master Key.",
    level: "moderate",
    codeExample: `-- Encrypting retail tables in Barrackpore:
ALTER TABLE barrackpore_store.transactions ENCRYPTION = 'Y';`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did they implement enterprise TDE across ₹500 Crore banking ledgers?",
    shortAnswer: "They integrated MySQL 8.0 with a central HashiCorp Vault cluster using `keyring_hashicorp`, enabled `innodb_redo_log_encrypt = ON`, and automated quarterly master key rotation.",
    explanation: "By decoupling key storage from the database host and storing master keys inside HashiCorp Vault, the bank satisfied RBI and PCI-DSS 4.0 Data at Rest compliance mandates with zero performance degradation.",
    hint: "Enterprise TDE pairs Vault keyrings with redo/undo encryption and automated key rotation.",
    level: "expert",
    codeExample: `-- Automated quarterly key rotation in Kolkata:
ALTER INSTANCE ROTATE INNODB MASTER KEY;`
  },
  {
    question: "What encryption algorithms does MySQL InnoDB TDE use to encrypt data pages?",
    shortAnswer: "AES-256 in CBC (Cipher Block Chaining) or ECB mode for tablespaces, and AES-256 in GCM/CBC for logs.",
    explanation: "AES-256 is the gold standard symmetric encryption standard approved by NIST and FIPS.",
    hint: "Uses 256-bit Advanced Encryption Standard (AES-256).",
    level: "basic",
    codeExample: `-- Standard: AES-256 hardware-accelerated encryption`
  },
  {
    question: "How does AES-NI hardware acceleration on modern CPU processors impact TDE performance?",
    shortAnswer: "AES-NI executes AES encryption and decryption directly in CPU hardware instructions, reducing TDE encryption overhead to less than 2-3% of total I/O throughput.",
    explanation: "Because cryptographic math is offloaded to dedicated silicon execution units, databases achieve line-rate disk write speeds while maintaining military-grade encryption at rest.",
    hint: "Dedicated CPU instructions make encryption and decryption virtually instantaneous.",
    level: "intermediate",
    codeExample: `-- Verified by checking lscpu / CPU flags for 'aes'`
  },
  {
    question: "What happens if the MySQL server starts and cannot find or access its configured Keyring file or Vault endpoint?",
    shortAnswer: "The server aborts startup or marks encrypted tablespaces as inaccessible with `ERROR 3185 (HY000): Can't find master key from keyring`.",
    explanation: "Without the Master Encryption Key, InnoDB cannot decrypt the tablespace keys in file headers, protecting data integrity by refusing to load corrupted or unauthenticated tables.",
    hint: "Server cannot load encrypted tables without the Master Key.",
    level: "intermediate",
    codeExample: `-- Error logged in mysqld.log:
-- [ERROR] [MY-012592] [InnoDB] Can't find master key from keyring, please check in keyring file!`
  },
  {
    question: "Can General Tablespaces and the MySQL System Tablespace (`mysql`) be encrypted?",
    shortAnswer: "Yes, in MySQL 8.0 both General Tablespaces (`CREATE TABLESPACE ... ENCRYPTION = 'Y'`) and the `mysql` data dictionary tablespace can be encrypted.",
    explanation: "MySQL 8.0 extended TDE beyond file-per-table to encompass general shared tablespaces and system tablespaces.",
    hint: "Both General and System tablespaces support TDE in MySQL 8.0.",
    level: "intermediate",
    codeExample: `CREATE TABLESPACE ts_finance ADD DATAFILE 'ts_finance.ibd' ENCRYPTION = 'Y';
ALTER TABLESPACE mysql ENCRYPTION = 'Y';`
  },
  {
    question: "What is Binary Log (Binlog) Encryption, and how is it enabled in MySQL 8.0?",
    shortAnswer: "Encrypts binary logs and relay logs on disk; enabled via `binlog_encryption = ON`.",
    explanation: "Replication binary logs record all data mutations. Enabling `binlog_encryption = ON` ensures that replica relay logs and source binary logs stored on disk are encrypted with AES-256.",
    hint: "Set binlog_encryption = ON to protect replication logs on disk.",
    level: "expert",
    codeExample: `SET PERSIST binlog_encryption = ON;
SHOW VARIABLES LIKE 'binlog_encryption';`
  },
  {
    question: "How do you rotate the Binary Log Master Encryption Key in MySQL 8.0?",
    shortAnswer: "Execute `ALTER INSTANCE ROTATE BINLOG MASTER KEY;`.",
    explanation: "Rotates the master key used to protect binary log file keys in the keyring.",
    hint: "Use ALTER INSTANCE ROTATE BINLOG MASTER KEY.",
    level: "expert",
    codeExample: `ALTER INSTANCE ROTATE BINLOG MASTER KEY;`
  },
  {
    question: "Can an encrypted table be moved between MySQL server instances using Transportable Tablespaces (`FLUSH TABLES ... FOR EXPORT`)?",
    shortAnswer: "Yes, in MySQL 8.0 encrypted tablespaces can be exported; MySQL generates a `.cfg` metadata file and a transfer key to allow importing into another instance with a shared or imported master key.",
    explanation: "MySQL 8.0 supports exporting encrypted file-per-table tablespaces without decrypting the data to plaintext.",
    hint: "Supported in MySQL 8.0 using export transfer keys.",
    level: "expert",
    codeExample: `FLUSH TABLES kolkata_finance.ledgers FOR EXPORT;`
  },
  {
    question: "What is the difference between Application-Level Field Encryption and InnoDB TDE?",
    shortAnswer: "Application-level encryption encrypts specific columns before sending to MySQL (preventing DBAs from reading text), while TDE encrypts whole tablespace files on disk (transparent to DBAs and queries).",
    explanation: "Application-level encryption breaks SQL indexing and range queries (`WHERE salary > 50000`), whereas TDE maintains full B-tree indexing, sorting, and range scan performance inside the database.",
    hint: "TDE maintains native B-Tree indexing and search performance; application encryption breaks SQL queries.",
    level: "intermediate",
    codeExample: `-- TDE: B-Tree Indexes remain fully searchable and fast in Buffer Pool RAM!`
  },
  {
    question: "What does `SHOW STATUS LIKE 'Innodb_num_pages_encrypted';` display?",
    shortAnswer: "The total number of InnoDB data pages that have been encrypted by the engine during disk write flushes.",
    explanation: "Provides real-time telemetry confirming that active buffer pool flush threads are actively encrypting pages before disk I/O.",
    hint: "Counts encrypted page writes by InnoDB.",
    level: "intermediate",
    codeExample: `SHOW STATUS LIKE 'Innodb_num_pages_encrypted';`
  },
  {
    question: "What does `SHOW STATUS LIKE 'Innodb_num_pages_decrypted';` display?",
    shortAnswer: "The total number of InnoDB data pages decrypted when read from disk into the InnoDB Buffer Pool.",
    explanation: "Verifies read telemetry for encrypted tablespaces.",
    hint: "Counts decrypted page reads into memory.",
    level: "basic",
    codeExample: `SHOW STATUS LIKE 'Innodb_num_pages_decrypted';`
  },
  {
    question: "What happens to the Doublewrite Buffer when InnoDB TDE is enabled?",
    shortAnswer: "Because the pages written to the doublewrite buffer are already encrypted before leaving the buffer pool, doublewrite buffer pages on disk are automatically encrypted.",
    explanation: "InnoDB encrypts pages prior to submitting them to the doublewrite buffer or the main `.ibd` tablespace, ensuring zero plaintext leakage during crash-recovery logging.",
    hint: "Pages are encrypted before writing to the doublewrite buffer.",
    level: "expert",
    codeExample: `-- Zero plaintext pages in doublewrite buffer.`
  },
  {
    question: "How do you disable TDE encryption on an encrypted table?",
    shortAnswer: "Execute `ALTER TABLE table_name ENCRYPTION = 'N';`.",
    explanation: "InnoDB decrypts the tablespace pages and updates the file header to mark encryption as disabled.",
    hint: "Use ALTER TABLE ... ENCRYPTION = 'N'.",
    level: "basic",
    codeExample: `ALTER TABLE kolkata_retail.temp_logs ENCRYPTION = 'N';`
  },
  {
    question: "What is the security risk of storing the `keyring_file` data file on the exact same physical disk partition as the MySQL data directory?",
    shortAnswer: "If an attacker steals or clones the entire physical disk or snapshot, they obtain both the encrypted data files AND the Master Key required to decrypt them.",
    explanation: "Best practice dictates storing keyring data on an external HSM, a separate network-mounted encrypted volume, or a centralized secret manager (HashiCorp Vault / AWS KMS).",
    hint: "Separating key storage from data storage prevents single-volume compromise.",
    level: "intermediate",
    codeExample: `# Best practice: Store keyring in HashiCorp Vault or dedicated secure key volume`
  },
  {
    question: "Can full-text search indexes and spatial indexes be created on TDE-encrypted tables?",
    shortAnswer: "Yes, full-text indexes and spatial (GIS) indexes work identically on encrypted tables because indexing operates on decrypted data pages in the buffer pool.",
    explanation: "TDE is completely transparent to all InnoDB storage features, including foreign keys, secondary indexes, full-text indexes, and virtual generated columns.",
    hint: "All native InnoDB features operate transparently with TDE.",
    level: "intermediate",
    codeExample: `CREATE FULLTEXT INDEX idx_ft_notes ON kolkata_retail.customer_notes(note_text);`
  },
  {
    question: "How does MySQL Enterprise Backup (MEB) or Percona XtraBackup handle TDE-encrypted tablespaces?",
    shortAnswer: "They back up the raw encrypted `.ibd` files directly without decrypting them, and back up the corresponding keyring data or master key to ensure physical backup files remain encrypted at rest.",
    explanation: "Backups remain fully encrypted throughout the backup, transport, and archival lifecycle, protecting off-site backup tapes and cloud storage buckets.",
    hint: "Physical backups copy raw encrypted pages without decrypting.",
    level: "expert",
    codeExample: `# Backup tools back up encrypted tablespaces and keyring metadata securely`
  },
  {
    question: "What is the `component_keyring_kmip` component used for?",
    shortAnswer: "It connects MySQL 8.0 directly to enterprise Key Management Interoperability Protocol (KMIP) servers and Hardware Security Modules (e.g. Thales CipherTrust, SafeNet).",
    explanation: "KMIP is the international industry standard for centralized cryptographic key management in banking, government, and defense installations.",
    hint: "Connects MySQL to enterprise KMIP Hardware Security Modules (HSMs).",
    level: "expert",
    codeExample: `INSTALL COMPONENT 'file://component_keyring_kmip';`
  },
  {
    question: "How do you verify if the `component_keyring_file` component is currently loaded and functioning?",
    shortAnswer: "Query `SELECT * FROM performance_schema.keyring_component_status;`.",
    explanation: "Returns the component name, active backend storage status, and read/write availability.",
    hint: "Inspect performance_schema.keyring_component_status.",
    level: "basic",
    codeExample: `SELECT * FROM performance_schema.keyring_component_status;`
  },
  {
    question: "Can Temporary Tablespaces be encrypted in MySQL 8.0?",
    shortAnswer: "Yes, temporary tablespaces are encrypted automatically when `default_table_encryption = ON` or `innodb_temp_tablespace_encrypt = ON` is configured.",
    explanation: "Ensures intermediate sorting, aggregation, and explicit temporary tables created by queries do not leak sensitive data to disk.",
    hint: "Temporary tablespaces support automatic encryption.",
    level: "intermediate",
    codeExample: `SET PERSIST default_table_encryption = ON;`
  },
  {
    question: "What is the primary operational takeaway of Topic 12 in Module 004_003?",
    shortAnswer: "InnoDB Transparent Data Encryption (TDE) provides essential Data at Rest protection: leverage the two-tier key architecture, store Master Keys in Keyrings/Vault, enable Redo/Undo log encryption, and perform instantaneous master key rotations via `ALTER INSTANCE ROTATE INNODB MASTER KEY`.",
    explanation: "TDE secures physical database files and backup snapshots against theft or unauthorized extraction with near-zero runtime CPU overhead. Combined with TLS for data in transit, organizations establish complete end-to-end cryptographic defense.",
    hint: "Summarize TDE two-tier keys, keyring management, log encryption, and instant key rotation.",
    level: "basic",
    codeExample: `-- Master TDE Production Setup:
INSTALL COMPONENT 'file://component_keyring_file';
SET PERSIST default_table_encryption = ON;
SET PERSIST innodb_redo_log_encrypt = ON;
SET PERSIST innodb_undo_log_encrypt = ON;
ALTER INSTANCE ROTATE INNODB MASTER KEY;`
  }
];

export default questions;
