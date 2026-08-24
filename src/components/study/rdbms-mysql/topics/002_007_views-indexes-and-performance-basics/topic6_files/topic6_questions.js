// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is a Materialized View in database systems?",
    shortAnswer: "A materialized view is a database object that physically stores the precomputed query results on disk and can be indexed to provide sub-millisecond read access.",
    explanation: "Unlike virtual views, materialized views persist computed data in physical table pages.",
    hint: "A view that physically stores precomputed query results on disk.",
    level: "basic"
  },
  {
    question: "Does standard MySQL Community Server have native support for `CREATE MATERIALIZED VIEW`?",
    shortAnswer: "NO. MySQL does not provide a native `CREATE MATERIALIZED VIEW` DDL statement; it must be emulated using cache tables, events, and triggers.",
    explanation: "Engines like Oracle and PostgreSQL support native materialized views with automated REFRESH commands.",
    hint: "No; MySQL requires manual emulation via summary cache tables.",
    level: "basic"
  },
  {
    question: "What is the primary performance advantage of a Materialized View over a Standard Virtual View?",
    shortAnswer: "Materialized views deliver extremely fast read query times (sub-millisecond) because expensive joins and aggregations are precomputed and stored with B-Tree indexes.",
    explanation: "Eliminates the CPU overhead of re-calculating multi-million row joins on every query.",
    hint: "Sub-millisecond reads from precomputed, indexed physical cache tables.",
    level: "basic"
  },
  {
    question: "What is the main trade-off when using Materialized Views instead of Standard Views?",
    shortAnswer: "Data freshness vs Performance: Materialized views contain data that is stale between refreshes and require disk storage and maintenance overhead.",
    explanation: "Virtual views are always 100% fresh but slower; materialized views are fast but potentially stale.",
    hint: "Data freshness (stale data) and disk storage requirements.",
    level: "basic"
  },
  {
    question: "How do you emulate a scheduled Materialized View in MySQL?",
    shortAnswer: "Create a physical summary cache table and automate periodic updates using the MySQL Event Scheduler (`CREATE EVENT ... ON SCHEDULE EVERY 1 HOUR DO ...`).",
    explanation: "Events run scheduled background SQL jobs to refresh cache tables.",
    hint: "Use a summary table + MySQL Event Scheduler.",
    level: "moderate"
  },
  {
    question: "How can you achieve Real-Time Incremental Maintenance of an emulated materialized view in MySQL?",
    shortAnswer: "Attach `AFTER INSERT`, `AFTER UPDATE`, and `AFTER DELETE` database triggers to base tables that incrementally update the summary table counters.",
    explanation: "Triggers apply delta changes immediately to the cache table.",
    hint: "Use AFTER INSERT/UPDATE/DELETE triggers on base tables.",
    level: "expert"
  },
  {
    question: "What is the 'Zero-Downtime Atomic Table Swap' technique for refreshing summary tables?",
    shortAnswer: "Populate a staging table (`mv_staging`), then execute `RENAME TABLE mv_current TO mv_old, mv_staging TO mv_current;` in a single atomic statement, and finally drop `mv_old`.",
    explanation: "Guarantees that readers never encounter an empty table during the refresh cycle.",
    hint: "Use RENAME TABLE to atomically swap staging and production cache tables.",
    level: "expert"
  },
  {
    question: "Can you create B-Tree indexes on an emulated materialized view table in MySQL?",
    shortAnswer: "YES. Because the cache table is a physical InnoDB table, you can add primary keys, composite indexes, and secondary indexes freely.",
    explanation: "Indexing the cache table allows fast O(log N) point lookups and range scans.",
    hint: "Yes; physical cache tables can have primary keys and secondary B-Tree indexes.",
    level: "basic"
  },
  {
    question: "What system variable must be enabled in MySQL to use the Event Scheduler for materialized view refreshes?",
    shortAnswer: "`SET GLOBAL event_scheduler = ON;`",
    explanation: "The event scheduler daemon must be running for scheduled events to fire.",
    hint: "event_scheduler = ON",
    level: "moderate"
  },
  {
    question: "Why is running `TRUNCATE TABLE cache_table; INSERT INTO cache_table SELECT ...;` considered dangerous on high-traffic production databases?",
    shortAnswer: "Because in the time window between TRUNCATE and INSERT completion, any incoming read query will see an empty table (0 rows), causing temporary data outages.",
    explanation: "Creates a transient read outage for active applications.",
    hint: "Reads hitting the table between TRUNCATE and INSERT see an empty table.",
    level: "expert"
  },
  {
    question: "How does combining a Virtual View on top of a Materialized Cache Table provide architectural abstraction?",
    shortAnswer: "`CREATE VIEW v_kpis AS SELECT * FROM mv_kpis_cache;` allows refactoring the underlying caching mechanism without changing frontend application queries.",
    explanation: "Provides logical data independence over the cache implementation.",
    hint: "Creates a stable virtual API layer over the physical cache table.",
    level: "moderate"
  },
  {
    question: "What is the difference between Full Refresh and Fast (Incremental) Refresh in materialized view theory?",
    shortAnswer: "Full Refresh re-computes the entire dataset from scratch; Fast Refresh applies only the inserted, updated, or deleted rows (deltas) since the last refresh.",
    explanation: "Incremental refreshes are much cheaper for huge multi-gigabyte datasets.",
    hint: "Full recomputes everything; Incremental applies only recent deltas.",
    level: "moderate"
  },
  {
    question: "How can change data capture (CDC) or timestamp watermarks be used to update cache tables incrementally?",
    shortAnswer: "By selecting rows `WHERE updated_at > last_refresh_timestamp` and updating the summary table with upserts (`ON DUPLICATE KEY UPDATE`).",
    explanation: "Timestamp watermarks allow batching recent changes without triggers.",
    hint: "Use updated_at timestamps with ON DUPLICATE KEY UPDATE.",
    level: "expert"
  },
  {
    question: "When should you choose a Standard Virtual View over an Emulated Materialized View?",
    shortAnswer: "When data must be 100% real-time fresh (e.g. bank account balance, flight booking seats) or when the query is lightweight and fast.",
    explanation: "Real-time transactional integrity requires virtual views or direct table queries.",
    hint: "When real-time data freshness is strictly mandatory.",
    level: "basic"
  },
  {
    question: "When should you choose an Emulated Materialized View over a Standard Virtual View?",
    shortAnswer: "When complex queries join millions of rows with heavy aggregations for analytical dashboards where near-instant response is required and slight staleness is acceptable.",
    explanation: "Executive BI dashboards benefit enormously from precomputed summaries.",
    hint: "For heavy analytical aggregations where slight staleness is acceptable.",
    level: "basic"
  },
  {
    question: "What storage engine is recommended for physical cache summary tables in MySQL?",
    shortAnswer: "`InnoDB` (or `MEMORY` for small, transient cache tables that fit completely in RAM).",
    explanation: "InnoDB provides crash recovery, transactions, and robust B-Tree indexing.",
    hint: "InnoDB for durable storage, MEMORY for transient RAM-only caches.",
    level: "moderate"
  },
  {
    question: "Can an emulated materialized view cache aggregate statistical data across multiple databases?",
    shortAnswer: "YES. The refresh query can join tables across multiple databases on the same MySQL server instance.",
    explanation: "Cross-database joins in the refresh script populate a single consolidated cache table.",
    hint: "Yes; the refresh job can query across multiple databases.",
    level: "basic"
  },
  {
    question: "How can you audit when an emulated materialized view was last refreshed?",
    shortAnswer: "Include a `last_refreshed_at TIMESTAMP` column in the cache table updated with `NOW()` during every refresh.",
    explanation: "Allows dashboards to display 'Data as of: 24-Aug-2026 10:00 PM' to users.",
    hint: "Include a last_refreshed_at column populated with NOW().",
    level: "basic"
  },
  {
    question: "What happens if a base table is modified while an emulated materialized view refresh script is running?",
    shortAnswer: "InnoDB's MVCC (Multi-Version Concurrency Control) provides a consistent snapshot read of the base tables without locking active transactions.",
    explanation: "Consistent snapshot reads ensure the refresh script sees a coherent point-in-time state.",
    hint: "InnoDB MVCC reads a consistent snapshot without blocking writes.",
    level: "expert"
  },
  {
    question: "How do you handle schema changes (like adding a column) in an emulated materialized view?",
    shortAnswer: "`ALTER TABLE cache_table ADD COLUMN ...;` and update the refresh script or trigger logic to populate the new column.",
    explanation: "Because it is a physical table, standard ALTER TABLE DDL applies.",
    hint: "Use ALTER TABLE on the cache table and update the refresh query.",
    level: "moderate"
  },
  {
    question: "Why do high-frequency triggers on large tables cause performance bottlenecks for incremental view maintenance?",
    shortAnswer: "Because every base table INSERT/UPDATE/DELETE incurs synchronous lock contention and write amplification on the summary table within the same transaction.",
    explanation: "Slows down transactional write throughput on OLTP systems.",
    hint: "Triggers add synchronous write overhead to every single base table DML.",
    level: "expert"
  },
  {
    question: "What is an alternative to triggers for near-real-time materialized view maintenance?",
    shortAnswer: "Asynchronous background workers (e.g. Redis queues, Kafka, or cron jobs polling every 60 seconds).",
    explanation: "Decouples analytical cache updates from transactional write paths.",
    hint: "Asynchronous message queues and background worker polling.",
    level: "expert"
  },
  {
    question: "Can you partition an emulated materialized view cache table in MySQL?",
    shortAnswer: "YES. Large summary tables can be partitioned by date range (e.g. `PARTITION BY RANGE (YEAR(sale_date))`) for efficient partition pruning.",
    explanation: "Table partitioning accelerates analytical query scans over historical data.",
    hint: "Yes; InnoDB table partitioning by range or list is fully supported.",
    level: "expert"
  },
  {
    question: "What command displays all scheduled refresh events in MySQL?",
    shortAnswer: "`SHOW EVENTS FROM database_name;`",
    explanation: "Lists event names, schedules, intervals, and statuses.",
    hint: "SHOW EVENTS FROM db_name;",
    level: "basic"
  },
  {
    question: "How do you pause a scheduled materialized view refresh event without deleting it?",
    shortAnswer: "`ALTER EVENT event_name DISABLE;`",
    explanation: "Disabling an event stops it from firing while keeping its definition intact.",
    hint: "ALTER EVENT event_name DISABLE;",
    level: "moderate"
  },
  {
    question: "How do you resume a disabled refresh event?",
    shortAnswer: "`ALTER EVENT event_name ENABLE;`",
    explanation: "Re-activates the event schedule.",
    hint: "ALTER EVENT event_name ENABLE;",
    level: "basic"
  },
  {
    question: "What is the memory limit consideration when using the `MEMORY` engine for materialized view caching in MySQL?",
    shortAnswer: "The table size is capped by `max_heap_table_size` and `tmp_table_size`, and all data is lost if the MySQL server restarts.",
    explanation: "MEMORY tables reside strictly in volatile RAM.",
    hint: "Capped by max_heap_table_size and data is lost on server restart.",
    level: "expert"
  },
  {
    question: "Can you create a materialized summary table that precomputes percentiles and complex ranking?",
    shortAnswer: "YES. The batch refresh script can run window functions (`RANK()`, `NTILE()`, `PERCENT_RANK()`) and store the resulting scores as static indexed columns.",
    explanation: "Precalculating complex analytics avoids expensive runtime window calculations.",
    hint: "Yes; precompute window ranking functions in the batch refresh script.",
    level: "moderate"
  },
  {
    question: "How does caching aggregated academy KPIs for Barrackpore and Kolkata improve web application responsiveness?",
    shortAnswer: "It converts a 2-second 5-table analytical query into a 1-millisecond index lookup on the summary table, dramatically reducing server load.",
    explanation: "Reduces database query latency by over 99%.",
    hint: "Reduces response time from seconds to milliseconds via precomputed index seeks.",
    level: "basic"
  },
  {
    question: "What is the senior architect's golden rule for materialized view emulation in MySQL?",
    shortAnswer: "Use atomic `RENAME TABLE` swapping for full scheduled refreshes, index the summary table's primary keys, expose the cache through a virtual view, and display refresh timestamps on UI dashboards.",
    explanation: "Provides zero-downtime, sub-millisecond reporting with clear data provenance.",
    hint: "Atomic RENAME swapping + indexing + virtual view abstraction layer.",
    level: "expert"
  }
];

export default questions;
