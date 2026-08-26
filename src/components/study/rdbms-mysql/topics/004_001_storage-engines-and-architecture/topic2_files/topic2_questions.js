// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What are the four primary In-Memory structures of InnoDB?",
    shortAnswer: "1) **Buffer Pool** (caches data and index pages in RAM), 2) **Change Buffer** (buffers secondary index updates), 3) **Adaptive Hash Index (AHI)** (in-memory hash index on hot pages), and 4) **Log Buffer** (caches redo log entries before disk flushing).",
    explanation: "These in-memory components enable sub-millisecond query responses and high-throughput write buffering.",
    hint: "Buffer Pool, Change Buffer, Adaptive Hash Index, and Log Buffer.",
    level: "basic"
  },
  {
    question: "What are the six primary On-Disk structures of InnoDB?",
    shortAnswer: "1) **System Tablespace** (`ibdata1`), 2) **File-Per-Table Tablespaces** (`.ibd`), 3) **General Tablespaces**, 4) **Undo Tablespaces**, 5) **Redo Log** (WAL files), and 6) **Doublewrite Buffer**.",
    explanation: "Provides persistent, crash-safe, multi-versioned storage on disk.",
    hint: "System tablespace, .ibd files, general/undo tablespaces, redo log, and doublewrite buffer.",
    level: "basic"
  },
  {
    question: "What is a 'Dirty Page' in the InnoDB Buffer Pool?",
    shortAnswer: "A 16KB data or index page that has been modified in RAM by an `INSERT`, `UPDATE`, or `DELETE` statement, but has not yet been flushed and written to the corresponding tablespace file on disk.",
    explanation: "Dirty pages are safely protected by the Redo Log until background page cleaners flush them to disk.",
    hint: "A page modified in memory whose changes have not yet been written to disk.",
    level: "basic"
  },
  {
    question: "What is Write-Ahead Logging (WAL) in InnoDB?",
    shortAnswer: "The architectural principle that a transaction's changes must be recorded sequentially in the **Redo Log** (on disk) *before* the dirty data pages themselves are written to disk tablespaces.",
    explanation: "Ensures durability and crash recovery with fast sequential I/O.",
    hint: "Logging changes to sequential redo log before flushing dirty pages to random disk tablespaces.",
    level: "expert"
  },
  {
    question: "What is the primary role of the InnoDB Buffer Pool?",
    shortAnswer: "It serves as the main memory cache for table data and index pages, minimizing expensive disk SSD/HDD read operations by satisfying queries directly from RAM.",
    explanation: "Typically allocated 50% to 75% of total server RAM on dedicated database servers.",
    hint: "Caches table data and index pages in memory to minimize disk I/O.",
    level: "basic"
  },
  {
    question: "How do Page Cleaner background threads prevent write latency from impacting client transactions?",
    shortAnswer: "They perform **asynchronous background flushing** of dirty pages from the Buffer Pool to disk tablespaces, allowing client threads to commit transactions without waiting for synchronous random disk writes.",
    explanation: "Decouples transaction commit speed from physical disk page write latency.",
    hint: "Asynchronously flush dirty pages from RAM to disk in the background.",
    level: "expert"
  },
  {
    question: "What is the function of the Log Sequence Number (LSN) in InnoDB?",
    shortAnswer: "The LSN is a monotonically increasing 64-bit integer that tracks the total volume of redo log bytes written over time, used to coordinate checkpoints, page flushing, and crash recovery.",
    explanation: "Every page header stores the LSN of its most recent modification.",
    hint: "Monotonically increasing counter tracking total redo log byte volume and checkpoints.",
    level: "expert"
  },
  {
    question: "How do you inspect the real-time operational status of all InnoDB in-memory and on-disk structures?",
    shortAnswer: "`SHOW ENGINE INNODB STATUS\\G`",
    explanation: "Displays comprehensive diagnostics: Semaphores, Transactions, Buffer Pool hit rates, Log sequence numbers, and I/O rates.",
    hint: "SHOW ENGINE INNODB STATUS\\G",
    level: "basic",
    codeExample: "SHOW ENGINE INNODB STATUS\\G"
  },
  {
    question: "What is the Doublewrite Buffer and why is it essential on standard operating systems?",
    shortAnswer: "It prevents **Torn Pages** (partial page writes) caused by power failures during a 16KB write to 4KB OS disk blocks, writing the full page to a contiguous buffer first before writing it to the tablespace.",
    explanation: "If a crash occurs during tablespace write, InnoDB restores the intact page from the Doublewrite buffer.",
    hint: "Prevents torn pages by writing full 16KB pages to a contiguous buffer before tablespace files.",
    level: "expert"
  },
  {
    question: "What does the Adaptive Hash Index (AHI) do in InnoDB?",
    shortAnswer: "It automatically monitors index search patterns and dynamically builds in-memory hash index pointers for frequently accessed ('hot') B+ Tree pages, achieving $O(1)$ lookup speeds.",
    explanation: "Transparently accelerates high-frequency B+ tree root-to-leaf traversals.",
    hint: "Automatically builds in-memory hash tables for hot B+ tree pages.",
    level: "expert"
  },
  {
    question: "What is the purpose of the Change Buffer in InnoDB memory?",
    shortAnswer: "It caches DML modifications to **non-unique secondary index pages** that are not currently in the Buffer Pool, avoiding expensive random disk I/O reads by merging them when the pages are later loaded.",
    explanation: "Transforms random secondary index disk I/O into buffered batch operations.",
    hint: "Buffers secondary index modifications to avoid immediate random disk I/O.",
    level: "expert"
  },
  {
    question: "What is the Midpoint Insertion LRU algorithm used in the Buffer Pool?",
    shortAnswer: "An LRU list divided into a 'Young' sublist (new/hot pages, top 5/8ths) and an 'Old' sublist (cold pages, bottom 3/8ths), inserting newly read pages at the midpoint to prevent full table scans from evicting hot cached pages.",
    explanation: "Prevents buffer pool pollution during large reporting queries.",
    hint: "Divides LRU into young and old sublists to protect hot pages from table scan evictions.",
    level: "expert"
  },
  {
    question: "Where are Undo Logs stored in modern MySQL 8.0?",
    shortAnswer: "In dedicated, separate **Undo Tablespaces** (`undo_001`, `undo_002`), which can be dynamically truncated and shrunk online to reclaim disk space.",
    explanation: "Replaced the legacy approach of embedding undo logs inside the shared system tablespace.",
    hint: "In dedicated undo tablespace files that can be truncated automatically online.",
    level: "basic"
  },
  {
    question: "What is the default page size in InnoDB tablespaces?",
    shortAnswer: "**16 KB** (16,384 bytes), configurable via `innodb_page_size` (4KB, 8KB, 16KB, 32KB, 64KB).",
    explanation: "16KB is the fundamental unit of disk allocation and Buffer Pool caching.",
    hint: "16 KB",
    level: "basic"
  },
  {
    question: "What happens when the Log Buffer fills up or a transaction commits?",
    shortAnswer: "The Log Buffer contents are flushed to the Redo Log disk files, controlled by the `innodb_flush_log_at_trx_commit` setting.",
    explanation: "Flushing log records ensures durability before acknowledging commit to client.",
    hint: "Flushes redo log records from memory to the on-disk redo log files.",
    level: "basic"
  },
  {
    question: "What is a 'Checkpoint' in InnoDB architecture?",
    shortAnswer: "A recorded LSN position indicating that all dirty pages modified up to that LSN have been successfully written and flushed to disk tablespaces, meaning older redo log records can safely be overwritten.",
    explanation: "Advances the safe boundary in the circular redo log ring.",
    hint: "A point in the redo log up to which all dirty pages have been flushed to disk.",
    level: "expert"
  },
  {
    question: "What is the difference between Fuzzy Checkpointing and Sharp Checkpointing?",
    shortAnswer: "**Fuzzy Checkpointing** continuously flushes small batches of dirty pages in the background without halting database operations; **Sharp Checkpointing** flushes all dirty pages at once (used during clean server shutdown).",
    explanation: "Fuzzy checkpointing maintains smooth transaction throughput without I/O spikes.",
    hint: "Fuzzy flushes small batches in background; Sharp flushes all dirty pages during shutdown.",
    level: "expert"
  },
  {
    question: "What is the function of the Purge Thread in InnoDB background threads?",
    shortAnswer: "It traverses undo tablespaces to physically delete and reclaim space from obsolete undo log records that are no longer needed by any active MVCC snapshot transaction views.",
    explanation: "Prevents unbounded undo log bloat.",
    hint: "Reclaims disk space by purging old undo log records no longer needed by MVCC views.",
    level: "expert"
  },
  {
    question: "What is the advantage of `innodb_file_per_table = ON` (default in MySQL)?",
    shortAnswer: "Each table is stored in its own dedicated `.ibd` tablespace file, allowing disk space to be reclaimed when dropping or truncating tables, and enabling individual table compression.",
    explanation: "Without this, all tables share the monolithic `ibdata1` file which cannot shrink.",
    hint: "Stores each table in its own .ibd file, allowing disk reclamation on drop/truncate.",
    level: "basic"
  },
  {
    question: "What is the purpose of Temporary Tablespaces (`ibtmp1`)?",
    shortAnswer: "To store internal temporary tables and user-created temporary tables generated during complex sorting, group-by, or subquery evaluations, recreated fresh on server startup.",
    explanation: "Isolated storage for non-persistent query workloads.",
    hint: "Stores ephemeral query temporary tables, recreated on every server restart.",
    level: "basic"
  },
  {
    question: "How does InnoDB use Multi-Version Concurrency Control (MVCC)?",
    shortAnswer: "When a transaction updates a row, InnoDB leaves the original row in place and writes the old version to the **Undo Log**, allowing concurrent readers to access historical row snapshots without waiting for write locks.",
    explanation: "Achieves non-blocking reads where readers never block writers and writers never block readers.",
    hint: "Uses undo logs to provide snapshot versions so readers never block writers.",
    level: "expert"
  },
  {
    question: "What happens if total dirty pages in the Buffer Pool exceed `innodb_max_dirty_pages_pct` (typically 90%)?",
    shortAnswer: "InnoDB enters aggressive flushing mode, prioritizing page cleaner I/O to flush dirty pages to disk quickly to prevent the Buffer Pool from running out of free pages.",
    explanation: "Maintains a safe reserve of clean pages for incoming read queries.",
    hint: "Triggers aggressive background flushing to keep dirty page percentage below threshold.",
    level: "expert"
  },
  {
    question: "What is the Master Thread in InnoDB background architecture?",
    shortAnswer: "The central background coordinator thread that performs periodic tasks: scheduling fuzzy checkpoints, merging change buffer entries, flushing dirty pages, and managing idle background maintenance.",
    explanation: "Runs loop routines every 1 second and 10 seconds.",
    hint: "Central coordinator thread running periodic background maintenance and checkpoints.",
    level: "basic"
  },
  {
    question: "Why does InnoDB split large Buffer Pools into multiple instances (`innodb_buffer_pool_instances`)?",
    shortAnswer: "To reduce mutex and rw-lock contention across concurrent worker threads on multi-core CPU servers, assigning different pages to separate independent buffer pool instances.",
    explanation: "Significantly boosts multi-threaded concurrency scalability.",
    hint: "Reduces lock contention across CPU cores by dividing memory into independent instances.",
    level: "expert"
  },
  {
    question: "What is the relationship between the Log Buffer and the Redo Log files?",
    shortAnswer: "The **Log Buffer** is the temporary in-memory RAM staging area where transaction changes are recorded; it is periodically flushed to the on-disk **Redo Log** files (`#ib_redo*`) on commit or checkpoint.",
    explanation: "In-memory staging prevents slow random synchronous disk writes.",
    hint: "Log Buffer is in RAM; Redo Log is on disk (flushed according to commit policy).",
    level: "basic"
  },
  {
    question: "How does InnoDB determine if a requested page is already cached in the Buffer Pool?",
    shortAnswer: "By consulting an internal **Page Hash Table** that maps `(tablespace_id, page_number)` to the in-memory memory pointer of the Buffer Pool frame in $O(1)$ constant time.",
    explanation: "Hash table lookups prevent linear scanning of millions of buffer pool pages.",
    hint: "Uses an internal page hash table mapping (space_id, page_no) to memory pointer.",
    level: "expert"
  },
  {
    question: "What is the primary benefit of InnoDB's dual In-Memory vs On-Disk architecture?",
    shortAnswer: "It delivers the best of both worlds: ultra-high performance by processing reads and writes at RAM speeds, combined with strict ACID reliability and persistence through background asynchronous disk flushing and write-ahead logging.",
    explanation: "Enables processing tens of thousands of transactions per second on standard hardware.",
    hint: "Combines RAM-speed query execution with crash-safe on-disk durability.",
    level: "basic"
  },
  {
    question: "What happens if a query requires reading a page that is NOT in the Buffer Pool?",
    shortAnswer: "InnoDB experiences a **Buffer Pool Miss**: an I/O thread synchronously reads the 16KB page from the on-disk tablespace into an available buffer pool frame, evicting the least recently used page if memory is full.",
    explanation: "Buffer pool hit ratio determines overall database latency.",
    hint: "Triggers a disk read to load the 16KB page into memory, evicting cold pages if needed.",
    level: "basic"
  },
  {
    question: "How do you calculate the Buffer Pool Hit Ratio in MySQL?",
    shortAnswer: "`Hit Ratio = 1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests)` (should ideally be greater than 99.0% on a well-tuned system).",
    explanation: "A hit ratio below 95% indicates an undersized buffer pool causing excessive disk I/O.",
    hint: "Calculates the percentage of read requests satisfied directly from memory.",
    level: "basic",
    codeExample: "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read%';\n-- Hit Ratio = 100 * (1 - (reads / read_requests))"
  },
  {
    question: "What is the primary pedagogical takeaway of Topic 2 in Module 004_001?",
    shortAnswer: "InnoDB's architectural strength lies in its harmonious duality: In-Memory structures (Buffer Pool, Change Buffer, AHI, Log Buffer) maximize transactional throughput, while On-Disk structures (Tablespaces, Redo/Undo logs, Doublewrite buffer) ensure complete crash-safe durability.",
    explanation: "Understanding this duality is the foundation for mastering InnoDB tuning and recovery runbooks.",
    hint: "Mastering the synergy between in-memory RAM caching and on-disk crash-safe persistence.",
    level: "basic"
  }
];

export default questions;
