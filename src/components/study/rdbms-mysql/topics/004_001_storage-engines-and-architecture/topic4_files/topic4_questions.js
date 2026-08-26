// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What are the five distinct types of on-disk tablespaces supported by InnoDB in MySQL 8.0?",
    shortAnswer: "1) **System Tablespace** (`ibdata1`), 2) **File-Per-Table Tablespaces** (`.ibd`), 3) **General Tablespaces**, 4) **Undo Tablespaces** (`undo_001`, `undo_002`), and 5) **Temporary Tablespaces** (`ibtmp1` & Session temp).",
    explanation: "Provides modular physical storage organization for different database workloads.",
    hint: "System, File-Per-Table, General, Undo, and Temporary tablespaces.",
    level: "basic"
  },
  {
    question: "Why is `innodb_file_per_table = ON` (the default) vastly superior to storing all tables in the System Tablespace (`ibdata1`)?",
    shortAnswer: "Because `ibdata1` **can never shrink** on disk once it expands; when using file-per-table, executing `DROP TABLE` or `TRUNCATE TABLE` immediately deletes or truncates the individual `.ibd` file, returning disk space to the OS filesystem.",
    explanation: "File-per-table prevents permanent disk space waste from temporary data surges.",
    hint: "Allows immediate OS disk space reclamation upon DROP or TRUNCATE TABLE.",
    level: "basic"
  },
  {
    question: "What happens if the System Tablespace (`ibdata1`) expands to 100 GB due to temporary historical bloat and you later delete all data?",
    shortAnswer: "The `ibdata1` file on disk remains 100 GB in size! The deleted space is marked as free internally for future InnoDB inserts, but the physical file cannot be shrunk without a full dump, drop, and reload of the MySQL instance.",
    explanation: "The system tablespace file has no shrink capability.",
    hint: "The physical file remains 100 GB on disk; space is only reusable internally.",
    level: "expert"
  },
  {
    question: "How do you create a General Tablespace and assign a table to it?",
    shortAnswer: "`CREATE TABLESPACE finance_ts ADD DATAFILE 'finance_ts.ibd' ENGINE=InnoDB;`\n`ALTER TABLE invoices TABLESPACE finance_ts;`",
    explanation: "Allows grouping multiple related tables into a single shared `.ibd` tablespace file.",
    hint: "CREATE TABLESPACE ... ADD DATAFILE ...; ALTER TABLE ... TABLESPACE ...;",
    level: "basic",
    codeExample: "CREATE TABLESPACE finance_ts ADD DATAFILE 'finance_ts.ibd' ENGINE=InnoDB;\nCREATE TABLE invoices (\n  invoice_id INT PRIMARY KEY,\n  total_inr DECIMAL(10,2)\n) TABLESPACE finance_ts;"
  },
  {
    question: "What is the purpose of Undo Tablespaces in MySQL 8.0?",
    shortAnswer: "They store **Undo Logs** (historical row versions) used to support rollback of aborted transactions and to provide consistent snapshot views for Multi-Version Concurrency Control (MVCC).",
    explanation: "Dedicated undo tablespaces can be dynamically truncated and shrunk online.",
    hint: "Stores historical row versions for MVCC snapshot reads and rollback segments.",
    level: "basic"
  },
  {
    question: "How does the Automatic Undo Tablespace Truncation mechanism work in MySQL 8.0?",
    shortAnswer: "When `innodb_undo_log_truncate = ON`, if an undo tablespace exceeds `innodb_max_undo_log_size` (default: 1 GB), InnoDB marks it as inactive, purges finished undo segments, truncates the file back to its initial size (16MB), and marks it active again.",
    explanation: "Prevents runaway undo log growth from long-running transactions.",
    hint: "Automatically shrinks undo tablespaces back to 16MB when they exceed 1GB.",
    level: "expert"
  },
  {
    question: "What happens to Temporary Tablespaces (`ibtmp1`) when the MySQL server restarts?",
    shortAnswer: "The temporary tablespace is completely deleted and recreated fresh with its default initial size (typically 12MB), automatically discarding all temporary tables created during previous query sessions.",
    explanation: "Guarantees zero persistent storage overhead from transient sort/join operations.",
    hint: "Completely deleted and recreated fresh on every server restart.",
    level: "basic"
  },
  {
    question: "What is a 'Transportable Tablespace' in InnoDB?",
    shortAnswer: "A feature allowing a DBA to copy a single table's `.ibd` file and metadata (`.cfg`) from one MySQL server to another using `ALTER TABLE ... DISCARD TABLESPACE` and `ALTER TABLE ... IMPORT TABLESPACE` without doing a full mysqldump.",
    explanation: "Enables ultra-fast multi-gigabyte table migrations across servers.",
    hint: "Copying individual .ibd files directly between servers using DISCARD and IMPORT TABLESPACE.",
    level: "expert",
    codeExample: "-- On Destination:\nALTER TABLE customer_orders DISCARD TABLESPACE;\n-- Copy customer_orders.ibd and .cfg from Source server to destination dir\nALTER TABLE customer_orders IMPORT TABLESPACE;"
  },
  {
    question: "Where are File-Per-Table `.ibd` files stored on the filesystem by default?",
    shortAnswer: "Inside the database directory within the MySQL data directory (e.g. `/var/lib/mysql/database_name/table_name.ibd` on Linux or `C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Data\\database_name\\table_name.ibd` on Windows).",
    explanation: "Each database schema has its own directory containing individual table `.ibd` files.",
    hint: "Inside the schema folder within the MySQL data directory.",
    level: "basic"
  },
  {
    question: "How do you view metadata for all active tablespaces in MySQL?",
    shortAnswer: "`SELECT space, name, space_type, file_format, row_format FROM information_schema.innodb_tablespaces;`",
    explanation: "Queries the information schema catalog for all active tablespaces.",
    hint: "SELECT * FROM information_schema.innodb_tablespaces;",
    level: "basic",
    codeExample: "SELECT space, name, space_type, file_format FROM information_schema.innodb_tablespaces;"
  },
  {
    question: "What is the advantage of General Tablespaces over File-Per-Table tablespaces?",
    shortAnswer: "1) Reduced file descriptor overhead (hundreds of small tables share 1 open file), 2) Improved memory locality in the Buffer Pool, and 3) Flexible storage path placement across different physical disk mount points.",
    explanation: "Useful for multi-tenant architectures with thousands of small tables.",
    hint: "Consolidates file descriptors and allows custom physical disk placement.",
    level: "expert"
  },
  {
    question: "How do you enable transparent data encryption (TDE) on a File-Per-Table tablespace?",
    shortAnswer: "`ALTER TABLE customer_invoices ENCRYPTION = 'Y';`",
    explanation: "Encrypts the 16KB data pages on disk using AES-256 (requires Keyring plugin configured).",
    hint: "ALTER TABLE tbl ENCRYPTION = 'Y';",
    level: "basic"
  },
  {
    question: "What row format is the default for InnoDB tables in modern MySQL 8.0?",
    shortAnswer: "**DYNAMIC** (which stores variable-length columns like `VARCHAR`, `BLOB`, `TEXT` off-page if they exceed page thresholds, maximizing page density for index lookups).",
    explanation: "Replaced the older COMPACT format as the standard default.",
    hint: "DYNAMIC",
    level: "basic"
  },
  {
    question: "What is the difference between `ibtmp1` (global temporary tablespace) and Session Temporary Tablespaces?",
    shortAnswer: "`ibtmp1` stores shared user-created temporary tables; **Session Temporary Tablespaces** allocate private ephemeral tablespaces from a pool for internal query optimizer sorting and grouping, automatically reclaimed when the session disconnects.",
    explanation: "Prevents session query sort tables from bloating the shared global temporary file.",
    hint: "ibtmp1 is shared; session temp tablespaces are private to each client connection session.",
    level: "expert"
  },
  {
    question: "Can an administrator move an existing table from a General Tablespace back to a File-Per-Table tablespace?",
    shortAnswer: "Yes! Execute: `ALTER TABLE table_name TABLESPACE = innodb_file_per_table;`",
    explanation: "Extracts the table from the shared file into its own dedicated `.ibd` file.",
    hint: "ALTER TABLE tbl TABLESPACE = innodb_file_per_table;",
    level: "basic"
  },
  {
    question: "What does the `innodb_data_file_path` system variable configure?",
    shortAnswer: "The file names, initial sizes, maximum sizes, and autoextend increments of the System Tablespace (e.g. `ibdata1:12M:autoextend`).",
    explanation: "Defines the system tablespace physical storage layout.",
    hint: "Defines the file path, initial size, and autoextend rules for the system tablespace.",
    level: "basic"
  },
  {
    question: "What is the minimum number of Undo Tablespaces required by MySQL 8.0?",
    shortAnswer: "**2** Undo Tablespaces (`undo_001` and `undo_002`), ensuring that one tablespace can be truncated and shrunk while the other remains active for concurrent transactions.",
    explanation: "Enables non-blocking round-robin online truncation.",
    hint: "Minimum of 2 undo tablespaces to allow round-robin online truncation.",
    level: "expert"
  },
  {
    question: "What is the consequence of deleting a table's `.ibd` file manually from the OS filesystem while MySQL is running?",
    shortAnswer: "It causes severe catalog corruption: the data dictionary still expects the tablespace to exist, and queries against the table fail with Error 1812: `Tablespace is missing for table ...`.",
    explanation: "Never delete `.ibd` files directly via OS commands; always use `DROP TABLE`.",
    hint: "Causes tablespace missing Error 1812 and data dictionary inconsistency.",
    level: "basic"
  },
  {
    question: "What command defragments and reclaims unused internal space inside an existing File-Per-Table `.ibd` file?",
    shortAnswer: "`OPTIMIZE TABLE table_name;` (or `ALTER TABLE table_name ENGINE=InnoDB;`), which rebuilds the B+ tree into a new `.ibd` file and replaces the old fragmented file.",
    explanation: "Reclaims fragmented space left behind by extensive deletes and updates.",
    hint: "OPTIMIZE TABLE tbl (or ALTER TABLE tbl ENGINE=InnoDB).",
    level: "basic",
    codeExample: "OPTIMIZE TABLE customer_orders;"
  },
  {
    question: "Why should `innodb_temp_data_file_path` have a maximum size cap configured in production?",
    shortAnswer: "To prevent a runaway rogue query with a Cartesian product (`JOIN` without `ON`) from generating a massive temporary table that exhausts the entire server disk space (e.g. `ibtmp1:12M:autoextend:max:20G`).",
    explanation: "Stops rogue queries before they crash the entire database host.",
    hint: "Prevents runaway queries from filling the entire server disk with temporary files.",
    level: "expert"
  },
  {
    question: "What is a 'General Tablespace Datafile Placement' feature?",
    shortAnswer: "The ability to specify an absolute directory path when creating a general tablespace (`ADD DATAFILE '/ssd2/finance_ts.ibd'`), placing hot financial tables on ultra-fast NVMe SSDs and cold tables on standard storage.",
    explanation: "Enables hardware tiering directly within MySQL.",
    hint: "Allows placing tablespace files on specific physical disk mount points (e.g. fast NVMe).",
    level: "expert"
  },
  {
    question: "What happens during `DROP TABLE` under `innodb_file_per_table = ON` vs `OFF`?",
    shortAnswer: "Under `ON`, the table's `.ibd` file is unlinked immediately from the filesystem, freeing disk space to the OS; under `OFF`, the pages in `ibdata1` are marked free internally, but the file size remains unchanged on disk.",
    explanation: "Demonstrates the essential disk reclamation advantage of file-per-table.",
    hint: "ON frees OS disk space immediately; OFF keeps the file size unchanged on disk.",
    level: "basic"
  },
  {
    question: "How do you check the disk file size of every tablespace using SQL in MySQL 8.0?",
    shortAnswer: "`SELECT file_name, tablespace_name, total_extents * 1048576 AS file_size_bytes FROM information_schema.files;`",
    explanation: "Provides SQL-level visibility into physical file sizes across all storage drives.",
    hint: "SELECT file_name, tablespace_name FROM information_schema.files;",
    level: "basic"
  },
  {
    question: "Can an Undo Tablespace be added or dropped dynamically at runtime in MySQL 8.0?",
    shortAnswer: "Yes! `CREATE UNDO TABLESPACE undo_003 ADD DATAFILE 'undo_003.ibu';` and `ALTER UNDO TABLESPACE undo_003 SET INACTIVE;` followed by `DROP UNDO TABLESPACE undo_003;`.",
    explanation: "Full dynamic lifecycle management for undo tablespaces.",
    hint: "Yes, via CREATE UNDO TABLESPACE and DROP UNDO TABLESPACE.",
    level: "expert"
  },
  {
    question: "What is the purpose of the `.cfg` file created during `FLUSH TABLES ... FOR EXPORT`?",
    shortAnswer: "It contains InnoDB schema and tablespace metadata (index IDs, page format, schema definition) required by the destination server to validate and import a transportable tablespace cleanly.",
    explanation: "Provides metadata synchronization during transportable tablespace imports.",
    hint: "Contains tablespace metadata required to import the .ibd file cleanly on destination.",
    level: "expert"
  },
  {
    question: "Why should `innodb_file_per_table` NEVER be turned OFF in modern MySQL environments?",
    shortAnswer: "Because turning it OFF traps all new tables inside `ibdata1`, permanently preventing disk space reclamation and disabling per-table encryption, transportable tablespaces, and independent table compression.",
    explanation: "Violates enterprise storage management best practices.",
    hint: "Traps data in ibdata1, disabling disk reclamation, TDE encryption, and transportable tables.",
    level: "basic"
  },
  {
    question: "What is the difference between `COMPRESSED` and `DYNAMIC` row format in a File-Per-Table tablespace?",
    shortAnswer: "`COMPRESSED` applies zlib compression to 16KB data and index pages, storing them on disk as 8KB or 4KB pages; `DYNAMIC` stores pages uncompressed while offloading large variable-length fields to overflow pages.",
    explanation: "COMPRESSED cuts disk footprint by 50% at the cost of CPU decompression overhead.",
    hint: "COMPRESSED compresses 16KB pages on disk to 8KB/4KB; DYNAMIC stores full uncompressed pages.",
    level: "expert"
  },
  {
    question: "How do you identify tables that have high internal fragmentation and wasted disk space?",
    shortAnswer: "Check `data_free` in `information_schema.tables`: `SELECT table_name, data_length, data_free FROM information_schema.tables WHERE data_free > 1073741824;` (identifying tables with &gt; 1GB wasted space).",
    explanation: "Highlights candidates for `OPTIMIZE TABLE` defragmentation.",
    hint: "Check data_free in information_schema.tables to find wasted internal space.",
    level: "basic"
  },
  {
    question: "What is the role of the System Tablespace in MySQL 8.0 now that the Data Dictionary is stored in internal tablespaces?",
    shortAnswer: "It houses the internal **Doublewrite Buffer storage blocks**, the **Change Buffer**, and legacy rollback segments, retaining a minimal footprint (typically 12MB to 100MB).",
    explanation: "Its scope has been significantly streamlined compared to MySQL 5.7.",
    hint: "Houses doublewrite buffer blocks, change buffer, and legacy rollback segments.",
    level: "expert"
  },
  {
    question: "What is the primary architectural takeaway of Topic 4 in Module 004_001?",
    shortAnswer: "InnoDB's on-disk tablespace architecture provides a modular, versatile storage system where File-Per-Table (`.ibd`) enables per-table disk reclamation, General Tablespaces consolidate file descriptors and enable hardware tiering, Undo Tablespaces automatically shrink online, and Temporary Tablespaces isolate transient query workloads.",
    explanation: "Proper tablespace architecture ensures efficient disk capacity utilization and high-performance I/O scalability.",
    hint: "Mastering the roles of File-Per-Table, General, Undo, and Temporary tablespaces on disk.",
    level: "basic"
  }
];

export default questions;
