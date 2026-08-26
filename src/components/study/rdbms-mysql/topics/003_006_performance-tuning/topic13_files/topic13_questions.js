// topic13_files/topic13_questions.js

const questions = [
  {
    question: "Why was `SHOW PROFILE` deprecated in MySQL in favor of the Performance Schema?",
    shortAnswer: "`SHOW PROFILE` is a legacy, single-threaded tool with limited stage granularity and high latch contention; the Performance Schema is modern, multi-threaded, non-blocking, and covers statements, stages, memory, locks, and disk I/O.",
    explanation: "Performance Schema provides a unified diagnostic infrastructure across the entire MySQL server.",
    hint: "SHOW PROFILE is single-threaded and deprecated; Performance Schema provides non-blocking multi-threaded telemetry.",
    level: "basic"
  },
  {
    question: "What are 'Instruments' and 'Consumers' in MySQL Performance Schema?",
    shortAnswer: "**Instruments** are probe points in the MySQL codebase that capture events (e.g. stages, statements, waits); **Consumers** are destination tables that store and aggregate the captured data.",
    explanation: "Instruments collect telemetry; Consumers organize it for querying.",
    hint: "Instruments capture event data; Consumers store and aggregate it in memory tables.",
    level: "basic"
  },
  {
    question: "In what unit does Performance Schema record time metrics (`TIMER_WAIT`), and how is it converted?",
    shortAnswer: "It records durations in **picoseconds** ($10^{-12}$ seconds), which can be converted to human-readable units using the `format_pico_time(timer_wait)` helper function.",
    explanation: "Picosecond timers allow nanosecond-level profiling accuracy across fast storage engines.",
    hint: "Picoseconds ($10^{-12}$ s), formatted using format_pico_time().",
    level: "expert",
    codeExample: "SELECT event_name, format_pico_time(timer_wait) FROM performance_schema.events_stages_history_long;"
  },
  {
    question: "What is the MySQL `sys` schema and why is it useful?",
    shortAnswer: "The `sys` schema is a collection of user-friendly views and stored procedures built on top of Performance Schema and `information_schema` to simplify database diagnostics.",
    explanation: "It transforms raw Performance Schema tables into formatted, actionable performance reports.",
    hint: "User-friendly diagnostic views built over Performance Schema.",
    level: "basic"
  },
  {
    question: "How do you find statements executing Full Table Scans using the `sys` schema?",
    shortAnswer: "Query `SELECT * FROM sys.statements_with_full_table_scans LIMIT 10;`.",
    explanation: "Instantly displays the query digests responsible for scanning the highest number of unindexed rows.",
    hint: "Query sys.statements_with_full_table_scans.",
    level: "basic",
    codeExample: "SELECT query, exec_count, total_latency, no_index_used_count FROM sys.statements_with_full_table_scans LIMIT 5;"
  },
  {
    question: "What does `sys.statements_with_runtimes_in_95th_percentile` show?",
    shortAnswer: "It identifies query digests whose execution latencies fall within the slowest top 5% (P95 outliers) of all statements processed by the server.",
    explanation: "Crucial for identifying erratic query spikes that cause intermittent API slowdowns.",
    hint: "Identifies top 5% slowest P95 latency outlier query digests.",
    level: "expert"
  },
  {
    question: "How do you enable stage profiling in Performance Schema dynamically?",
    shortAnswer: "Update `setup_instruments` to enable `stage/%` and update `setup_consumers` to enable `events_stages_history_long`.",
    explanation: "Enables granular step-by-step query stage duration tracking.",
    hint: "Enable stage/% instruments and events_stages consumers in setup tables.",
    level: "expert",
    codeExample: "UPDATE performance_schema.setup_instruments SET ENABLED = 'YES', TIMED = 'YES' WHERE NAME LIKE 'stage/%';\nUPDATE performance_schema.setup_consumers SET ENABLED = 'YES' WHERE NAME LIKE '%stages%';"
  },
  {
    question: "What does high duration in `stage/sql/Sending data` indicate?",
    shortAnswer: "It means the query spent most of its time reading, filtering, and processing row records from the storage engine (typically indicating a Full Table Scan or inefficient index range scan).",
    explanation: "'Sending data' represents the physical row fetch and evaluation phase of query execution.",
    hint: "Indicates the engine spent time reading and filtering rows (often a table scan).",
    level: "basic"
  },
  {
    question: "What does high duration in `stage/sql/Creating sort index` indicate?",
    shortAnswer: "It indicates that the query performed a filesort operation to satisfy `ORDER BY` or `GROUP BY` without using a pre-sorted B+Tree index.",
    explanation: "The server had to allocate a sort buffer or spill records to disk temporary files.",
    hint: "Indicates filesort execution for ORDER BY or GROUP BY.",
    level: "moderate"
  },
  {
    question: "What does high duration in `stage/sql/Creating tmp table` indicate?",
    shortAnswer: "It means the query materialized an intermediate result set into an in-memory or on-disk temporary table (e.g. due to complex `DISTINCT`, `UNION`, or unindexed joins).",
    explanation: "Materializing large temporary tables increases memory churn and I/O latency.",
    hint: "Indicates temporary table materialization for complex grouping or joins.",
    level: "moderate"
  },
  {
    question: "How do you profile the exact execution stages of the last executed query?",
    shortAnswer: "Find the `EVENT_ID` from `events_statements_current` or `events_statements_history_long`, then query `events_stages_history_long` where `nesting_event_id = event_id`.",
    explanation: "Nesting event IDs link individual stages to their parent statement.",
    hint: "Link events_stages_history_long to parent statement via nesting_event_id.",
    level: "expert",
    codeExample: "SELECT event_name, format_pico_time(timer_wait) as duration\nFROM performance_schema.events_stages_history_long\nWHERE nesting_event_id = (SELECT EVENT_ID FROM performance_schema.events_statements_history_long ORDER BY TIMER_START DESC LIMIT 1)\nORDER BY TIMER_START ASC;"
  },
  {
    question: "What does `sys.statements_with_sorting` reveal?",
    shortAnswer: "It lists query digests that executed the most sort operations, including sort rows count, sort range scans, and sort buffer disk spills (`sort_merge_passes`).",
    explanation: "Identifies queries causing high CPU load due to unindexed sorting.",
    hint: "Identifies query digests causing heavy filesorts and sort merge passes.",
    level: "moderate"
  },
  {
    question: "What does `sys.statements_with_temp_tables` show?",
    shortAnswer: "It lists query digests that create the highest number of temporary tables in memory and on physical disk (`disk_tmp_tables`).",
    explanation: "Helps locate queries that degrade performance by creating disk temporary tables.",
    hint: "Shows queries creating in-memory and on-disk temporary tables.",
    level: "moderate"
  },
  {
    question: "How do you inspect current memory allocations in MySQL using the `sys` schema?",
    shortAnswer: "Query `SELECT * FROM sys.memory_global_by_current_bytes LIMIT 10;` or `sys.memory_by_thread_by_current_bytes`.",
    explanation: "Shows which internal subsystems (InnoDB buffer pool, sort buffers, join buffers) consume the most RAM.",
    hint: "Query sys.memory_global_by_current_bytes to inspect memory allocations.",
    level: "expert",
    codeExample: "SELECT event_name, current_alloc, high_alloc FROM sys.memory_global_by_current_bytes LIMIT 5;"
  },
  {
    question: "What does `stage/sql/Opening tables` indicate when it takes excessive time?",
    shortAnswer: "It indicates table definition cache bottlenecks, metadata lock contention, or that `table_open_cache` is sized too small, causing frequent table descriptor reloads.",
    explanation: "Increasing `table_open_cache` or eliminating concurrent `ALTER TABLE` locks resolves this bottleneck.",
    hint: "Table cache misses or metadata lock contention.",
    level: "expert"
  },
  {
    question: "What is the overhead of enabling Performance Schema in production?",
    shortAnswer: "Typically between 1% and 3% CPU/memory overhead under default instrumentation; highly detailed wait/mutex instrumentation can increase overhead to 5-8%.",
    explanation: "Default statement and digest consumers are optimized for low-overhead production monitoring.",
    hint: "Minimal (1-3%) under default settings; higher if fine-grained mutex tracing is enabled.",
    level: "basic"
  },
  {
    question: "What is `performance_schema.events_waits_history_long` used for?",
    shortAnswer: "To profile low-level wait events, including file I/O reads/writes, row lock waits, table metadata locks, and network socket communication delays.",
    explanation: "Provides root-cause clarity on whether a query was delayed by disk I/O or lock contention.",
    hint: "Profiles low-level wait events such as disk I/O, locks, and network delays.",
    level: "expert"
  },
  {
    question: "How do you reset Performance Schema aggregated metrics for a clean benchmark test?",
    shortAnswer: "Execute `CALL sys.ps_truncate_all_tables(FALSE);` or run `TRUNCATE TABLE performance_schema.events_statements_summary_by_digest;`.",
    explanation: "Clears historical metrics so you can measure a clean before-and-after benchmark.",
    hint: "Call sys.ps_truncate_all_tables(FALSE) to reset telemetry tables.",
    level: "expert",
    codeExample: "CALL sys.ps_truncate_all_tables(FALSE);"
  },
  {
    question: "How does `sys.session` help debug a currently stalled connection?",
    shortAnswer: "It displays active connections along with the current executing SQL, current wait event, locks held, and elapsed transaction time in human-readable format.",
    explanation: "A modern, highly detailed replacement for `SHOW PROCESSLIST`.",
    hint: "Shows active session queries, locks held, and current wait events.",
    level: "basic",
    codeExample: "SELECT thd_id, user, current_statement, last_wait, current_memory FROM sys.session WHERE command != 'Sleep';"
  },
  {
    question: "What does `stage/sql/Optimizing` represent in query execution stages?",
    shortAnswer: "The phase where the Cost-Based Optimizer evaluates available indexes, join orders, subquery transformations, and calculates cost estimates.",
    explanation: "Queries with 15+ table joins can spend significant time in 'Optimizing' calculating join permutations.",
    hint: "The phase where the CBO evaluates indexes and calculates join permutations.",
    level: "expert"
  },
  {
    question: "What is the difference between `events_statements_current`, `events_statements_history`, and `events_statements_history_long`?",
    shortAnswer: "`current` holds the currently executing statement per thread; `history` holds the last 10 statements per thread; `history_long` holds the last 10,000 statements across all threads globally.",
    explanation: "Allows both thread-scoped inspection and global timeline analysis.",
    hint: "Current holds active statement; history holds last 10 per thread; history_long holds global recent statements.",
    level: "expert"
  },
  {
    question: "How do you trace file I/O latency bottlenecks in Performance Schema?",
    shortAnswer: "Query `sys.io_global_by_file_by_bytes` or `sys.io_by_thread_by_latency` to identify which database tablespace files generate the highest read/write I/O latency.",
    explanation: "Identifies hot physical tablespace files that require SSD storage or table partitioning.",
    hint: "Query sys.io_global_by_file_by_bytes to inspect hot tablespace I/O latency.",
    level: "expert"
  },
  {
    question: "What does `sys.schema_table_statistics` show?",
    shortAnswer: "It aggregates total reads, writes, fetches, inserts, updates, and deletes per table, highlighting the most heavily accessed tables in the database.",
    explanation: "Helps architects prioritize caching and read-replica offloading for hot tables.",
    hint: "Shows total read/write I/O and DML operations per table.",
    level: "basic"
  },
  {
    question: "What is the `format_bytes()` function in MySQL `sys` schema?",
    shortAnswer: "A utility function that converts raw byte counts into human-readable strings (e.g. `1048576` bytes $\to$ `'1.00 MiB'`).",
    explanation: "Simplifies reading memory buffer and temporary table size outputs.",
    hint: "Formats raw byte counts into KiB, MiB, or GiB strings.",
    level: "basic",
    codeExample: "SELECT event_name, format_bytes(current_number_of_bytes_used) FROM performance_schema.memory_summary_global_by_event_name LIMIT 5;"
  },
  {
    question: "How do you find unused indexes using the `sys` schema?",
    shortAnswer: "Query `SELECT * FROM sys.schema_unused_indexes;`.",
    explanation: "Identifies secondary indexes that have never been used for lookups since server startup, allowing safe removal to speed up write operations.",
    hint: "Query sys.schema_unused_indexes to find dead secondary indexes.",
    level: "basic",
    codeExample: "SELECT object_schema, object_name, index_name FROM sys.schema_unused_indexes;"
  },
  {
    question: "What does `stage/sql/statistics` stage measure?",
    shortAnswer: "The phase where MySQL probes index leaf pages (performing 'index dives') to estimate row counts for ranges before choosing the execution plan.",
    explanation: "Queries with large `IN (...)` lists spend extra time in 'statistics' performing index dives.",
    hint: "Measures index dive time for cardinality estimation during optimization.",
    level: "expert"
  },
  {
    question: "Can Performance Schema track lock contention between two conflicting transactions?",
    shortAnswer: "Yes! Query `sys.innodb_lock_waits` or `data_lock_waits` in MySQL 8.0 to see the blocking query, blocked query, locking mode, and waiting thread.",
    explanation: "Instantly reveals which transaction is holding the lock that blocks incoming queries.",
    hint: "Query sys.innodb_lock_waits to identify blocking and blocked transactions.",
    level: "basic",
    codeExample: "SELECT waiting_trx_id, waiting_query, blocking_trx_id, blocking_query FROM sys.innodb_lock_waits;"
  },
  {
    question: "How do you verify if Performance Schema is enabled on your MySQL server instance?",
    shortAnswer: "Run `SHOW VARIABLES LIKE 'performance_schema';` (it should return `ON`).",
    explanation: "Performance Schema is enabled by default in MySQL 5.7+ and MySQL 8.0+.",
    hint: "SHOW VARIABLES LIKE 'performance_schema';",
    level: "basic"
  },
  {
    question: "Why should developers use `sys.statement_analysis` over parsing raw query strings?",
    shortAnswer: "Because `sys.statement_analysis` normalizes queries into canonical digests, aggregates execution metrics (total latency, avg latency, max latency, rows examined, temp tables), and sorts by impact.",
    explanation: "Provides an instant executive overview of query health across the entire database.",
    hint: "Normalizes queries into digests and aggregates execution metrics for easy analysis.",
    level: "basic"
  },
  {
    question: "What is the primary pedagogical lesson of query profiling with Performance Schema?",
    shortAnswer: "Profiling decomposes query execution into exact microscopic stages (compiling, optimizing, row scanning, sorting, temporary table creation, lock waiting). It tells you exactly *where* time was spent so you can apply the exact right fix.",
    explanation: "Eliminates trial-and-error by measuring the precise microsecond cost of every stage.",
    hint: "Measures exact microsecond durations per stage to guide surgical optimizations.",
    level: "basic"
  }
];

export default questions;
