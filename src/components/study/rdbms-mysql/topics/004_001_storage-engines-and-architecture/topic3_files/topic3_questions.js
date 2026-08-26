// topic3_files/topic3_questions.js

const questions = [
  {
    question: "Why does the InnoDB Buffer Pool use a Midpoint Insertion LRU algorithm instead of a simple standard LRU list?",
    shortAnswer: "To prevent **Buffer Pool Pollution** caused by large full-table scans or batch backup queries, which would otherwise flush out hot, frequently accessed cached pages.",
    explanation: "New pages enter at the 3/8ths midpoint mark in the Old sublist, protecting the Young sublist from eviction.",
    hint: "Protects hot cached pages in the Young sublist from being evicted by large full-table scans.",
    level: "expert"
  },
  {
    question: "What is the function of `innodb_old_blocks_time` in Buffer Pool LRU tuning?",
    shortAnswer: "It defines the minimum time delay (default: 1000 ms) a page must reside in the Old sublist after its first access before subsequent accesses can promote it to the Young sublist.",
    explanation: "Ensures pages read only once during a table scan are quickly evicted without polluting the hot list.",
    hint: "Requires pages to remain in the old list for 1000ms before promotion to the young list.",
    level: "expert"
  },
  {
    question: "Why can the Change Buffer ONLY buffer modifications for NON-UNIQUE secondary indexes?",
    shortAnswer: "Because **Unique indexes require immediate uniqueness verification** against existing disk pages, forcing a synchronous page read into memory; non-unique indexes do not require uniqueness checks.",
    explanation: "Unique constraints cannot be verified asynchronously without loading the target page.",
    hint: "Unique indexes require immediate synchronous verification against existing page data.",
    level: "expert"
  },
  {
    question: "What does the Adaptive Hash Index (AHI) do when it detects high-frequency lookups on a B+ Tree index?",
    shortAnswer: "It automatically creates an in-memory hash table mapping search key prefixes directly to the in-memory page frame pointer, bypassing B+ Tree tree traversal and reducing lookup complexity from $O(\\log N)$ to $O(1)$.",
    explanation: "Transparently accelerates hot search queries in RAM.",
    hint: "Builds in-memory hash table pointers to bypass B+ tree traversals for hot pages.",
    level: "expert"
  },
  {
    question: "What are the three operational modes of `innodb_flush_log_at_trx_commit`?",
    shortAnswer: "- **1 (Default / Full ACID)**: Flushes Log Buffer to Redo Log on disk on every commit.\n- **2**: Writes to OS page cache on commit; flushes to disk once per second (crash-safe against MySQL restart, 1s risk on OS crash).\n- **0**: Writes and flushes to disk once per second (fastest, up to 1s data loss risk).",
    explanation: "Controls the critical trade-off between write throughput and ACID durability.",
    hint: "1 = Sync on every commit (ACID); 2 = Write to OS cache on commit; 0 = Write/flush once per second.",
    level: "expert"
  },
  {
    question: "What is the purpose of `innodb_buffer_pool_dump_at_shutdown` and `innodb_buffer_pool_load_at_startup`?",
    shortAnswer: "They record the page IDs cached in the Buffer Pool to an `ib_buffer_pool` file on server shutdown and automatically reload them into RAM on startup, achieving instant **Buffer Pool Warm-Up**.",
    explanation: "Eliminates slow cold-cache performance degradation after server restarts.",
    hint: "Saves cached page IDs on shutdown and reloads them on startup for warm cache performance.",
    level: "basic",
    codeExample: "SHOW VARIABLES LIKE 'innodb_buffer_pool_dump_at_shutdown';\nSHOW VARIABLES LIKE 'innodb_buffer_pool_load_at_startup';"
  },
  {
    question: "Why should `innodb_buffer_pool_instances` be configured on multi-core servers?",
    shortAnswer: "To divide a large Buffer Pool into multiple independent memory instances (e.g. 8 or 16), reducing mutex and read-write lock contention among concurrent CPU threads.",
    explanation: "Significantly scales multi-threaded concurrency on modern multi-core servers.",
    hint: "Reduces mutex contention across CPU cores by dividing memory into independent instances.",
    level: "expert"
  },
  {
    question: "When is it recommended to DISABLE the Adaptive Hash Index (`innodb_adaptive_hash_index = OFF`)?",
    shortAnswer: "In highly concurrent, write-heavy workloads with multi-column joins or range scans where the AHI mutex (or rw-lock) becomes a major point of lock contention.",
    explanation: "AHI can degrade performance if workloads do not exhibit repetitive single-point equality lookups.",
    hint: "When AHI lock contention degrades performance under heavy concurrent write workloads.",
    level: "expert"
  },
  {
    question: "What is the default size split between the Young and Old sublists in the Buffer Pool LRU?",
    shortAnswer: "The **Young sublist occupies 5/8ths (~63%)** of the LRU list, and the **Old sublist occupies 3/8ths (~37%)**, controlled by `innodb_old_blocks_pct = 37`.",
    explanation: "Configures the midpoint insertion threshold.",
    hint: "Young list = 5/8ths (~63%); Old list = 3/8ths (~37%).",
    level: "basic"
  },
  {
    question: "What happens during a Change Buffer merge operation?",
    shortAnswer: "When a non-unique secondary index page is read from disk into the Buffer Pool by a query, any pending buffered modifications for that page in the Change Buffer are merged into the 16KB page in RAM.",
    explanation: "Postpones index updates until the page is naturally needed in memory.",
    hint: "Pending index updates are merged into the 16KB page when it is loaded into memory.",
    level: "expert"
  },
  {
    question: "How do you check the current size and usage of the Change Buffer in MySQL?",
    shortAnswer: "Look at the `INSERT BUFFER AND ADAPTIVE HASH INDEX` section in `SHOW ENGINE INNODB STATUS\\G` or query `information_schema.innodb_metrics`.",
    explanation: "Displays total merged operations and pending buffer size.",
    hint: "Check INSERT BUFFER section in SHOW ENGINE INNODB STATUS.",
    level: "basic"
  },
  {
    question: "What is the default size of the Log Buffer in MySQL 8.0, and when should it be increased?",
    shortAnswer: "Default is **16 MB** (or 64 MB in recent versions); it should be increased (`innodb_log_buffer_size = 64M` or `128M`) if the server executes large transactions with heavy `BLOB`/`TEXT` modifications to prevent disk stalls.",
    explanation: "Prevents large transactions from writing to disk redo logs mid-transaction.",
    hint: "Default is 16MB; increase for heavy batch transactions or large BLOB updates.",
    level: "basic"
  },
  {
    question: "What is the 'Free List' in the InnoDB Buffer Pool?",
    shortAnswer: "A linked list of empty, unallocated 16KB memory frames in the Buffer Pool ready to hold newly loaded pages read from disk.",
    explanation: "If the Free List is empty, InnoDB evicts a cold page from the tail of the LRU list.",
    hint: "Linked list of empty 16KB memory frames ready for new page allocation.",
    level: "basic"
  },
  {
    question: "What is the 'Flush List' in the InnoDB Buffer Pool?",
    shortAnswer: "A linked list of all **Dirty Pages** in the Buffer Pool, ordered chronologically by their oldest unwritten Log Sequence Number (LSN), used by Page Cleaners to flush pages sequentially.",
    explanation: "Ensures pages are flushed in consistent LSN checkpoint order.",
    hint: "Linked list of dirty pages ordered by oldest modification LSN.",
    level: "expert"
  },
  {
    question: "How do you calculate the percentage of memory used by the Change Buffer relative to the Buffer Pool?",
    shortAnswer: "Check `innodb_change_buffer_max_size`, which defaults to **25%** of the Buffer Pool (configurable up to 50% for write-heavy reporting databases).",
    explanation: "Restricts change buffer memory usage to preserve space for data pages.",
    hint: "Controlled by innodb_change_buffer_max_size (default 25%).",
    level: "basic"
  },
  {
    question: "Can the InnoDB Buffer Pool size be resized dynamically without restarting the MySQL server in MySQL 8.0?",
    shortAnswer: "Yes! Executing `SET GLOBAL innodb_buffer_pool_size = NEW_SIZE;` dynamically resizes the buffer pool online in chunk increments defined by `innodb_buffer_pool_chunk_size`.",
    explanation: "Online memory resizing eliminates server downtime during maintenance.",
    hint: "Yes, dynamically resizable online via SET GLOBAL innodb_buffer_pool_size.",
    level: "basic",
    codeExample: "SET GLOBAL innodb_buffer_pool_size = 34359738368; -- 32 GB Online Resize"
  },
  {
    question: "What is the effect of setting `innodb_adaptive_hash_index_parts = 8` (or 16)?",
    shortAnswer: "It partitions the Adaptive Hash Index into 8 or 16 independent hash tables, reducing mutex lock contention across concurrent CPU threads.",
    explanation: "Enhances AHI scalability on high-core server architectures.",
    hint: "Partitions the AHI to reduce lock contention across CPU cores.",
    level: "expert"
  },
  {
    question: "What happens if a transaction commits under `innodb_flush_log_at_trx_commit = 2` and the operating system crashes?",
    shortAnswer: "Up to **1 second of committed transactions can be lost**, because the changes were written to the OS page cache but had not yet been flushed (fsynced) to physical disk storage.",
    explanation: "Survives MySQL daemon crashes, but vulnerable to physical OS power loss.",
    hint: "Up to 1 second of transactions lost during sudden OS or physical power failure.",
    level: "expert"
  },
  {
    question: "How do you verify whether the Adaptive Hash Index is effectively accelerating queries?",
    shortAnswer: "Compare `Innodb_adaptive_hash_searches` (AHI hits) against `Innodb_adaptive_hash_searches_btree` (B+ tree searches) in `SHOW GLOBAL STATUS`.",
    explanation: "If AHI searches account for a large percentage of total searches, AHI is highly effective.",
    hint: "Compare Innodb_adaptive_hash_searches vs B-Tree searches in SHOW GLOBAL STATUS.",
    level: "expert"
  },
  {
    question: "Why does InnoDB store both data and index pages together inside the Buffer Pool?",
    shortAnswer: "Because InnoDB uses a **Clustered Index** where leaf pages of the Primary Key B+ Tree physically contain the full data rows, so caching index pages inherently caches table rows.",
    explanation: "Unified page caching eliminates redundant memory buffers.",
    hint: "In clustered indexes, data rows reside inside the leaf pages of the Primary Key B+ Tree.",
    level: "basic"
  },
  {
    question: "What is the unit of memory management inside the Buffer Pool?",
    shortAnswer: "A **16 KB Page Frame** (matching the default 16KB on-disk tablespace page size).",
    explanation: "All memory caching and disk I/O occur in 16KB page units.",
    hint: "16 KB page frame.",
    level: "basic"
  },
  {
    question: "What metric indicates that the Buffer Pool is undersized for the current database workload?",
    shortAnswer: "A low Buffer Pool Hit Ratio ($< 95\\%$), high `Innodb_buffer_pool_reads` (disk reads per second), and frequent page evictions from the young sublist.",
    explanation: "Indicates that the working set does not fit in RAM, causing excessive disk I/O thrashing.",
    hint: "Low hit ratio (< 95%) and high disk read rates indicate an undersized buffer pool.",
    level: "basic"
  },
  {
    question: "How do you monitor the real-time size of the Dirty Page list in the Buffer Pool?",
    shortAnswer: "`SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_dirty';`",
    explanation: "Displays the exact count of modified 16KB pages awaiting disk flush.",
    hint: "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_dirty';",
    level: "basic"
  },
  {
    question: "What is the purpose of the 'Change Buffer Merge' during a clean MySQL server shutdown?",
    shortAnswer: "InnoDB performs a complete merge of all remaining pending Change Buffer entries into on-disk tablespaces before shutting down, ensuring tablespaces are 100% clean and up-to-date.",
    explanation: "Guarantees clean tablespace states upon complete server stop.",
    hint: "Merges all pending buffered index changes into tablespaces during clean shutdown.",
    level: "expert"
  },
  {
    question: "Why should `innodb_buffer_pool_instances` not be configured greater than 1 if `innodb_buffer_pool_size` is less than 1GB?",
    shortAnswer: "Because MySQL automatically forces `innodb_buffer_pool_instances = 1` for buffer pools $< 1\\text{ GB}$ to avoid unnecessary instance overhead and fragmentation.",
    explanation: "Instance partitioning is beneficial only for multi-gigabyte memory allocations.",
    hint: "Multi-instances are only effective for buffer pools >= 1GB.",
    level: "basic"
  },
  {
    question: "What background thread manages asynchronous merging of Change Buffer entries?",
    shortAnswer: "The **Master Thread** (and background I/O helper threads during idle server periods).",
    explanation: "Performs background merges when the database is not saturated with query traffic.",
    hint: "The Master Thread during idle server cycles.",
    level: "basic"
  },
  {
    question: "What is the relationship between the Log Buffer and the Redo Log Sequence Number (LSN)?",
    shortAnswer: "Every modification staged in the Log Buffer increments the global LSN counter by the exact byte length of the redo record.",
    explanation: "Provides high-precision sequential tracking of all transactional modifications.",
    hint: "Staged log records increment the global LSN counter by their exact byte length.",
    level: "expert"
  },
  {
    question: "How does the Buffer Pool manage compressed tables (`ROW_FORMAT=COMPRESSED`)?",
    shortAnswer: "It maintains both uncompressed 16KB page frames (for query execution in RAM) and compressed page frames (e.g. 8KB or 4KB matching disk storage) in separate memory pools.",
    explanation: "Enables fast execution while keeping compressed pages in memory.",
    hint: "Maintains both uncompressed 16KB frames and compressed page frames in memory.",
    level: "expert"
  },
  {
    question: "What command forces a synchronous dump of the current Buffer Pool state to disk immediately?",
    shortAnswer: "`SET GLOBAL innodb_buffer_pool_dump_now = ON;`",
    explanation: "Writes the cached page tablespace and page numbers to `ib_buffer_pool` on demand.",
    hint: "SET GLOBAL innodb_buffer_pool_dump_now = ON;",
    level: "basic",
    codeExample: "SET GLOBAL innodb_buffer_pool_dump_now = ON;\n-- Check dump status:\nSHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_dump_status';"
  },
  {
    question: "What is the primary architectural takeaway of Topic 3 in Module 004_001?",
    shortAnswer: "InnoDB's in-memory components (Buffer Pool with Midpoint LRU, Change Buffer for non-unique secondary writes, Adaptive Hash Index for hot lookups, and Log Buffer for staging WAL redo logs) work synchronously together to deliver nanosecond-speed query processing while shielding physical disk storage from random I/O bottlenecks.",
    explanation: "Mastery of in-memory internals is the key to tuning high-throughput enterprise MySQL servers.",
    hint: "Synergy of Buffer Pool, Change Buffer, AHI, and Log Buffer in accelerating transactional throughput.",
    level: "basic"
  }
];

export default questions;
