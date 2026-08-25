// topic9_files/topic9_questions.js

const questions = [
  {
    question: "Why does deleting 50% of the rows in an InnoDB table using `DELETE` NOT shrink the `.ibd` file size on disk?",
    shortAnswer: "Because InnoDB marks deleted row space as free internally on page free lists for future `INSERT` reuse; the physical `.ibd` file size remains fixed at the **High-Water Mark** of historical peak page allocation.",
    explanation: "Operating system filesystems do not automatically shrink sparse files without explicit rebuilding.",
    hint: "InnoDB marks space free internally for future inserts; the OS file size stays at the High-Water Mark.",
    level: "basic"
  },
  {
    question: "What column in `information_schema.tables` reveals the amount of unused, fragmented space inside a table's `.ibd` file?",
    shortAnswer: "`data_free` (measured in bytes), which indicates the total allocated space available for internal reuse that can be reclaimed by running `OPTIMIZE TABLE`.",
    explanation: "Essential metric for identifying tables suffering from storage bloat.",
    hint: "data_free in information_schema.tables.",
    level: "basic",
    codeExample: "SELECT table_name, data_length, index_length, data_free\nFROM information_schema.tables\nWHERE table_schema = 'college_admissions'\n  AND data_free > 1073741824; -- > 1 GB dead space"
  },
  {
    question: "How does `OPTIMIZE TABLE table_name;` physically reclaim disk space in MySQL 8.0?",
    shortAnswer: "It performs an **Online Table Rebuild**: creates a new, temporary `.ibd` file, copies all active records into clean 93% compact B+ tree pages, atomically renames the new file to replace the old `.ibd`, and unlinks the old file from the OS filesystem.",
    explanation: "Returns reclaimed gigabytes directly to the host operating system.",
    hint: "Rebuilds active rows into a new compact .ibd file, then swaps and unlinks the old file.",
    level: "basic"
  },
  {
    question: "What is the equivalent declarative DDL command to `OPTIMIZE TABLE table_name;` for InnoDB tables?",
    shortAnswer: "`ALTER TABLE table_name ENGINE = InnoDB, ALGORITHM = INPLACE, LOCK = NONE;`",
    explanation: "Executes an online, non-blocking table defragmentation and rebuild.",
    hint: "ALTER TABLE tbl ENGINE=InnoDB, ALGORITHM=INPLACE, LOCK=NONE;",
    level: "basic",
    codeExample: "ALTER TABLE customer_orders ENGINE = InnoDB, ALGORITHM = INPLACE, LOCK = NONE;"
  },
  {
    question: "What is the crucial disk space prerequisite before running `OPTIMIZE TABLE` on a 200 GB table?",
    shortAnswer: "The server must have at least **equal free disk space** (e.g. ~150-200 GB of free storage) to hold the temporary new `.ibd` file while the rebuild is in progress.",
    explanation: "If disk space runs out mid-rebuild, the operation aborts and rolls back safely.",
    hint: "Must have enough free disk space to hold the temporary new table copy during rebuild.",
    level: "expert"
  },
  {
    question: "How does Online DDL handle live concurrent `INSERT` and `UPDATE` traffic during an `OPTIMIZE TABLE` operation?",
    shortAnswer: "Concurrent DML writes are recorded in an in-memory and on-disk **Online DDL Log** (`innodb_online_alter_log_max_size`), which InnoDB applies to the new table copy at the end of the rebuild before swapping files.",
    explanation: "Allows 100% uninterrupted application write access throughout the rebuild process.",
    hint: "Stages concurrent modifications in the Online Alter Log and applies them before file swap.",
    level: "expert"
  },
  {
    question: "What happens if live concurrent write volume exceeds `innodb_online_alter_log_max_size` during an online rebuild?",
    shortAnswer: "The online rebuild fails with Error 1799: `Creating index '...' required more than 'innodb_online_alter_log_max_size' bytes of modification log`, and the temporary table is cleaned up.",
    explanation: "Increase `innodb_online_alter_log_max_size` (e.g. 512M or 1G) on write-heavy tables before rebuilding.",
    hint: "Rebuild fails with Error 1799; increase innodb_online_alter_log_max_size.",
    level: "expert"
  },
  {
    question: "What is the four-step workflow for moving a large table to a new server using Transportable Tablespaces?",
    shortAnswer: "1) Source: `FLUSH TABLES tbl FOR EXPORT;`\n2) Copy `tbl.ibd` and `tbl.cfg` to destination schema dir\n3) Source: `UNLOCK TABLES;`\n4) Destination: `ALTER TABLE tbl DISCARD TABLESPACE;` followed by `ALTER TABLE tbl IMPORT TABLESPACE;`.",
    explanation: "Migrates multi-hundred gigabyte tables in minutes at raw filesystem copy speeds.",
    hint: "FLUSH FOR EXPORT &rarr; Copy .ibd/.cfg &rarr; DISCARD TABLESPACE &rarr; IMPORT TABLESPACE.",
    level: "expert"
  },
  {
    question: "How do you calculate the Fragmentation Percentage of a table in MySQL?",
    shortAnswer: "`Fragmentation % = 100 * (data_free / (data_length + index_length + data_free))`",
    explanation: "Tables with fragmentation > 30-40% are prime candidates for defragmentation.",
    hint: "data_free divided by total allocated space multiplied by 100.",
    level: "basic",
    codeExample: "SELECT \n  table_name,\n  ROUND((data_length + index_length) / 1024 / 1024, 2) AS used_mb,\n  ROUND(data_free / 1024 / 1024, 2) AS free_mb,\n  ROUND(100 * (data_free / (data_length + index_length + data_free)), 2) AS frag_pct\nFROM information_schema.tables\nWHERE table_schema = 'my_database'\nORDER BY free_mb DESC;"
  },
  {
    question: "Why should `OPTIMIZE TABLE` NOT be run on every table on a daily cron job?",
    shortAnswer: "Because rebuilding tables causes heavy disk I/O write amplification, invalidates the Buffer Pool cache for those pages, and temporary internal free space (`data_free`) is naturally reused by normal ongoing `INSERT` statements.",
    explanation: "Only run OPTIMIZE TABLE after massive purge/archive operations or when fragmentation is high.",
    hint: "Causes heavy disk I/O and cache churn; run only when significant space needs reclaiming.",
    level: "expert"
  },
  {
    question: "What happens if a DBA executes `TRUNCATE TABLE table_name;` under `innodb_file_per_table = ON`?",
    shortAnswer: "InnoDB drops the existing `.ibd` file and creates a brand new, empty `.ibd` file with initial size (128KB), immediately returning 100% of the table's disk space to the OS filesystem.",
    explanation: "Far faster and more effective than `DELETE FROM table;`.",
    hint: "Drops the old .ibd file and creates a new 128KB empty file, freeing all space instantly.",
    level: "basic"
  },
  {
    question: "Can an administrator relocate a single table's `.ibd` file to a different disk mount using `CREATE TABLE`?",
    shortAnswer: "Yes! Specify `DATA DIRECTORY = '/mnt/fast_nvme/data'` in the `CREATE TABLE` statement (when `innodb_file_per_table = ON`).",
    explanation: "Allows placing hot tables on dedicated SSD mount points.",
    hint: "Use DATA DIRECTORY = '/path/to/mount' in CREATE TABLE.",
    level: "basic"
  },
  {
    question: "What is the difference between `ALGORITHM=INPLACE` and `ALGORITHM=COPY` during table rebuilds?",
    shortAnswer: "- **INPLACE**: Rebuilds the table inside the InnoDB storage engine with non-blocking concurrent DML reads and writes.\n- **COPY**: Creates a temporary table at the Server layer, acquiring shared read locks and blocking all concurrent writes.",
    explanation: "Always specify ALGORITHM=INPLACE for zero-downtime maintenance.",
    hint: "INPLACE allows concurrent live writes; COPY locks the table in read-only mode.",
    level: "expert"
  },
  {
    question: "How do you defragment all tables in a specific database from the command line?",
    shortAnswer: "`mysqlcheck -u root -p --optimize --databases database_name`",
    explanation: "Automates execution of `OPTIMIZE TABLE` across all tables in a schema.",
    hint: "mysqlcheck --optimize --databases db_name",
    level: "basic"
  },
  {
    question: "What happens to secondary indexes during an `OPTIMIZE TABLE` rebuild?",
    shortAnswer: "All secondary indexes are dropped and rebuilt from scratch sorted by key order using **InnoDB Sorted Index Build**, maximizing secondary index leaf page fill factor (~93%) and eliminating fragmentation.",
    explanation: "Rebuilds primary and secondary indexes in optimal contiguous order.",
    hint: "Rebuilt from scratch in sorted key order with 93% compact page density.",
    level: "expert"
  },
  {
    question: "Why does `innodb_fill_factor` (default: 100) configure a 93% page fill ratio rather than 100% during index creation?",
    shortAnswer: "Because InnoDB leaves **1/16th (~6.25%) of space free** on each page to accommodate future row expansion and minor updates without triggering immediate page splits.",
    explanation: "Balances storage density against future write overhead.",
    hint: "Leaves 1/16th of page space free for future updates to prevent immediate page splits.",
    level: "expert"
  },
  {
    question: "How do you verify whether a table rebuild was executed using `INPLACE` or `COPY` algorithm?",
    shortAnswer: "If `ALGORITHM=INPLACE` was used, MySQL reports `0 rows affected`; if `COPY` was used, MySQL reports `N rows affected` (where N is total table row count).",
    explanation: "Quick diagnostic check in client output.",
    hint: "INPLACE reports 0 rows affected; COPY reports N rows affected matching table row count.",
    level: "expert"
  },
  {
    question: "What is the consequence of having a 500GB `.ibd` file on a server with only 50GB of free disk space that needs defragmentation?",
    shortAnswer: "A standard `OPTIMIZE TABLE` will **fail due to insufficient disk space**; the DBA must use an external tool (like `pt-online-schema-change` with chunking or transportable tablespaces) or relocate the table.",
    explanation: "Classic DBA capacity planning challenge.",
    hint: "OPTIMIZE TABLE fails; must use external chunking tools or transportable tablespace export.",
    level: "expert"
  },
  {
    question: "What happens to the Buffer Pool during and after an `OPTIMIZE TABLE` operation?",
    shortAnswer: "During rebuild, pages of the new table are populated in the Buffer Pool; after the rebuild, cached pages of the old unlinked `.ibd` file are invalidated and evicted from memory.",
    explanation: "Causes temporary Buffer Pool churn until new pages warm up.",
    hint: "Old pages are invalidated; new compact pages are loaded into memory.",
    level: "expert"
  },
  {
    question: "How can you shrink a General Tablespace that has unused free space?",
    shortAnswer: "In MySQL 8.0, individual tables within a general tablespace can be moved out, but the general tablespace `.ibd` file itself cannot shrink; you must drop the empty general tablespace (`DROP TABLESPACE ts_name;`) and recreate it.",
    explanation: "General tablespaces share monolithic autoextend file characteristics.",
    hint: "Move tables out and drop the empty general tablespace to reclaim disk space.",
    level: "expert"
  },
  {
    question: "What is the purpose of `innodb_defragment = ON` (in MariaDB / Percona Server forks)?",
    shortAnswer: "An online background defragmenter that reorganizes B+ tree pages incrementally in small batches without performing a full table rebuild or requiring extra disk space.",
    explanation: "Incremental page-level defragmentation.",
    hint: "Incrementally defragments pages in background without full table copy disk overhead.",
    level: "expert"
  },
  {
    question: "Why should large archival deletions be performed in batches rather than a single massive `DELETE` statement before running `OPTIMIZE TABLE`?",
    shortAnswer: "A single massive `DELETE` generates a giant transaction that inflates the Undo Tablespace and locks thousands of rows; batch deletions (`DELETE ... LIMIT 5000`) commit in chunks, keeping undo logs small.",
    explanation: "Prevents undo log exhaustion and replication lag.",
    hint: "Batched deletes prevent massive undo log bloat and replication lag.",
    level: "basic"
  },
  {
    question: "How do you check the progress of an active `ALTER TABLE ... ALGORITHM=INPLACE` operation in MySQL 8.0?",
    shortAnswer: "Query `performance_schema.events_stages_current` to observe the `stage/innodb/alter table (read PK and build sorts)` progress percentage.",
    explanation: "Provides real-time visibility into long-running online DDL rebuilds.",
    hint: "Query performance_schema.events_stages_current for alter table stage progress.",
    level: "expert",
    codeExample: "SELECT event_name, work_completed, work_estimated, (work_completed / work_estimated * 100) AS pct_done\nFROM performance_schema.events_stages_current\nWHERE event_name LIKE '%alter%';"
  },
  {
    question: "What is the effect of running `OPTIMIZE TABLE` on a table that uses `ROW_FORMAT=COMPRESSED`?",
    shortAnswer: "It recompresses all 16KB data pages into tightly packed 8KB or 4KB physical pages on disk, eliminating compression fragmentation and reclaiming empty disk blocks.",
    explanation: "Re-optimizes zlib compression density across all pages.",
    hint: "Recompresses all pages, eliminating internal page fragmentation in compressed tables.",
    level: "basic"
  },
  {
    question: "Can an `OPTIMIZE TABLE` operation be cancelled safely mid-execution?",
    shortAnswer: "Yes! Executing `KILL QUERY <connection_id>` or `Ctrl+C` immediately aborts the rebuild, deletes the temporary `.ibd` file, and leaves the original table completely untouched and operational.",
    explanation: "Zero risk of data loss on aborted online rebuilds.",
    hint: "Yes, cancelling deletes the temp file and leaves the original table intact.",
    level: "basic"
  },
  {
    question: "How does `innodb_sort_buffer_size` accelerate `OPTIMIZE TABLE` rebuilds?",
    shortAnswer: "It configures the size of the in-memory sorting buffer used during Sorted Index Build; larger buffers (e.g. 64M) allow sorting larger chunks of index records in RAM, minimizing temporary disk merge files.",
    explanation: "Significantly reduces index rebuild I/O duration.",
    hint: "Larger sort buffers allow sorting index records in RAM, speeding up index builds.",
    level: "expert"
  },
  {
    question: "What is the recommended threshold of `data_free` before scheduling an `OPTIMIZE TABLE` operation?",
    shortAnswer: "When `data_free` exceeds **20% to 30% of total table size** AND represents at least **5 GB to 10 GB of reclaimable space**.",
    explanation: "Ensures the operational cost of rebuilding is justified by meaningful disk space savings.",
    hint: "When fragmentation exceeds 20-30% and represents > 5-10 GB reclaimable space.",
    level: "basic"
  },
  {
    question: "Why does `TRUNCATE TABLE` NOT require free disk space equal to the table size like `OPTIMIZE TABLE` does?",
    shortAnswer: "Because `TRUNCATE TABLE` is a DDL command that simply drops the existing `.ibd` file and creates a new 128KB file, requiring zero temporary copy storage.",
    explanation: "Instantaneous disk space reclamation without copying data.",
    hint: "Because TRUNCATE unlinks the old file directly without creating a data copy.",
    level: "basic"
  },
  {
    question: "What is the role of `innodb_strict_mode = ON` during tablespace management?",
    shortAnswer: "It ensures that invalid tablespace options, unsupported row formats, or illegal compression parameters throw immediate fatal syntax errors rather than issuing silent fallback warnings.",
    explanation: "Enforces strict compliance with intended tablespace configuration.",
    hint: "Enforces strict validation, throwing errors on invalid tablespace parameters.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 9 in Module 004_001?",
    shortAnswer: "Because `DELETE` statements leave physical `.ibd` files at their High-Water Mark, proactive tablespace management requires monitoring `data_free` in Information Schema and executing online defragmentation (`OPTIMIZE TABLE` / `ALTER TABLE ... ALGORITHM=INPLACE`) to reclaim gigabytes of disk space and restore 93% compact B+ tree page density.",
    explanation: "Mastery of tablespace shrinking and defragmentation prevents storage bloat and keeps databases fast and cost-effective.",
    hint: "Proactive monitoring of data_free and online table rebuilding reclaims disk space and eliminates fragmentation.",
    level: "basic"
  }
];

export default questions;
