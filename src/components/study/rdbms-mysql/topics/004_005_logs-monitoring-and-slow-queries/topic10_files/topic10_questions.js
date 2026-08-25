// topic10_files/topic10_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 10: Key Telemetry Metrics: Threads_connected, Threads_running, Questions, Uptime, Innodb_buffer_pool_read_requests, Innodb_buffer_pool_reads

const questions = [
  {
    question: "What are the 6 primary telemetry metrics that form the foundation of MySQL server health monitoring?",
    shortAnswer: "1. `Threads_connected` (open connections), 2. `Threads_running` (active executing threads on CPU), 3. `Questions` (client SQL statements), 4. `Uptime` (server runtime in seconds), 5. `Innodb_buffer_pool_read_requests` (logical page requests in RAM), and 6. `Innodb_buffer_pool_reads` (physical disk page reads).",
    explanation: "These six metrics provide complete visibility into connection load, CPU concurrency, query throughput, and memory buffer caching efficiency.",
    hint: "Threads_connected, Threads_running, Questions, Uptime, Buffer pool read requests, Buffer pool reads.",
    level: "basic",
    codeExample: `SELECT VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN (
  'Uptime', 'Threads_connected', 'Threads_running', 
  'Questions', 'Innodb_buffer_pool_read_requests', 'Innodb_buffer_pool_reads'
);`
  },
  {
    question: "What is the critical diagnostic significance of `Threads_running` exceeding the physical CPU core count?",
    shortAnswer: "It indicates that more queries are attempting to execute concurrently than there are physical CPU cores available to run them, leading to CPU thread starvation, massive OS context switching overhead, and escalating query queue latency.",
    explanation: "On a 16-core CPU server, `Threads_running` should ideally stay under 16-32. A spike to 80+ threads indicates an active query lock jam or sudden traffic surge.",
    hint: "Signals CPU thread starvation and query queue buildup when exceeding physical CPU cores.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Threads_running';`
  },
  {
    question: "How do `Innodb_buffer_pool_read_requests` and `Innodb_buffer_pool_reads` differ in purpose?",
    shortAnswer: "`Innodb_buffer_pool_read_requests` measures total logical 16KB page requests made to the buffer pool; `Innodb_buffer_pool_reads` measures the subset of requests that missed the buffer pool and required physical disk I/O.",
    explanation: "The difference between them represents pages successfully served from RAM cache.",
    hint: "Read requests are logical memory requests; reads are physical disk read misses.",
    level: "basic",
    codeExample: `-- Read Requests (Logical in RAM):
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read_requests';
-- Reads (Physical on Disk):
SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_reads';`
  },
  {
    question: "How do you calculate the InnoDB Buffer Pool Hit Ratio using these metrics?",
    shortAnswer: "$\\text{Hit Ratio} = \\left(1 - \\frac{\\text{Innodb\\_buffer\\_pool\\_reads}}{\\text{Innodb\\_buffer\\_pool\\_read\\_requests}}\\right) \\times 100\\%$.",
    explanation: "A healthy production database should maintain a buffer pool hit ratio of **99.0% or higher** (ideally >99.9%). A ratio below 95% indicates severe memory starvation.",
    hint: "(1 - (reads / read_requests)) * 100.",
    level: "basic",
    codeExample: `SELECT 
  ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 4) AS buffer_pool_hit_ratio_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status req 
  ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'
WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads';`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, checkout terminal response times jumped from 2ms to 450ms. How did checking `Innodb_buffer_pool_reads` reveal the root cause?",
    shortAnswer: "The delta rate of `Innodb_buffer_pool_reads` surged from 5 reads/sec to 1,200 reads/sec, revealing that an unindexed seasonal catalog query had evicted hot product pages from the buffer pool.",
    explanation: "The database was thrashing physical disk storage rather than reading from memory. Adding an index stopped the disk thrashing immediately across ₹1.2 Crores in retail inventory.",
    hint: "Surging physical disk reads revealed buffer pool thrashing caused by an unindexed query.",
    level: "moderate",
    codeExample: `# Barrackpore Buffer Pool Thrashing Triage:
-- Innodb_buffer_pool_reads spiked from 5/sec -> 1,200/sec!`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did monitoring `Threads_running` prevent a cascading database collapse during an end-of-quarter rush across ₹500 Crores in transactions?",
    shortAnswer: "Debangshu configured an automated Prometheus alert on `Threads_running > 32` (on a 16-core CPU). When a burst of unindexed reconciliation queries caused `Threads_running` to spike to 45, an automated rate limiter throttled non-critical background jobs within 5 seconds.",
    explanation: "Throttling background jobs lowered `Threads_running` back to 8, preserving sub-millisecond execution for core customer banking transactions.",
    hint: "Prometheus alert on Threads_running > 32 triggered automated background job throttling.",
    level: "expert",
    codeExample: `# Prometheus Alert Rule:
# alert: MySQLHighThreadsRunning
# expr: mysql_global_status_threads_running > 32
# for: 10s`
  },
  {
    question: "What does `Innodb_buffer_pool_pages_dirty` represent in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of 16KB data pages in the buffer pool that have been modified by write transactions in memory but have not yet been flushed (written) to physical tablespace storage on disk.",
    explanation: "A high dirty page count indicates heavy write activity. InnoDB flushes dirty pages in the background using fuzzy checkpointing.",
    hint: "Count of modified memory pages in RAM awaiting disk flushing.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_dirty';`
  },
  {
    question: "What does `Innodb_buffer_pool_pages_free` in `SHOW GLOBAL STATUS` indicate?",
    shortAnswer: "The count of unallocated, empty 16KB page frames remaining in the buffer pool.",
    explanation: "On an active database, `pages_free` drops to near 0 as memory fills with cached tables and indexes. When `pages_free` is 0, new pages evict the least-recently used (LRU) cached pages.",
    hint: "Count of unallocated page frames remaining in the buffer pool.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_free';`
  },
  {
    question: "What is `Handler_read_rnd_next` and why is a high rate an indicator of poor indexing?",
    shortAnswer: "It counts the number of requests to read the next row from data files during a sequential full table scan.",
    explanation: "A high rate of `Handler_read_rnd_next` indicates applications are frequently scanning entire tables rather than using index pointers.",
    hint: "Counts sequential row steps during full table scans.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Handler_read_rnd_next';`
  },
  {
    question: "What is `Handler_read_key` and why is a high rate a sign of a well-indexed database?",
    shortAnswer: "It counts the number of requests to read a row based on an exact index key match.",
    explanation: "A high ratio of `Handler_read_key` compared to `Handler_read_rnd_next` confirms the database optimizer is utilizing B-Tree indexes effectively.",
    hint: "Counts indexed B-Tree row lookups; indicates efficient index usage.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Handler_read_key';`
  },
  {
    question: "What is `Innodb_os_log_fsyncs` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative count of physical `fsync()` system calls executed to flush the InnoDB redo log buffer to physical disk.",
    explanation: "Under `innodb_flush_log_at_trx_commit = 1`, `Innodb_os_log_fsyncs` increments with every committed write transaction.",
    hint: "Count of physical fsync flushes of the redo log to disk.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_os_log_fsyncs';`
  },
  {
    question: "How do you calculate Queries Per Second (QPS) over a specific 10-second interval rather than lifetime average?",
    shortAnswer: "Measure `Questions` at time $t_1$ and $t_2$: $\\text{Interval QPS} = \\frac{\\text{Questions}_{t_2} - \\text{Questions}_{t_1}}{t_2 - t_1}$.",
    explanation: "Interval delta calculation provides the true real-time throughput rate.",
    hint: "Delta of Questions divided by delta of time in seconds.",
    level: "basic",
    codeExample: `# Sample: Questions at t0=100,000; Questions at t10=150,000 -> (150,000 - 100,000) / 10 = 5,000 QPS.`
  },
  {
    question: "What is the danger of `Threads_connected` approaching 100% of `max_connections`?",
    shortAnswer: "Any new client connection attempts will be immediately rejected with `ERROR 1040: Too many connections`, causing widespread application connection failures and user-facing outages.",
    explanation: "Monitoring `Threads_connected` with alert thresholds at 80% allows auto-scaling connection pools before rejection occurs.",
    hint: "Triggers ERROR 1040, rejecting all new client connection attempts.",
    level: "basic",
    codeExample: `-- Alert threshold: (Threads_connected / max_connections) > 0.80`
  },
  {
    question: "What does `Innodb_data_reads` vs `Innodb_data_writes` measure?",
    shortAnswer: "`Innodb_data_reads` counts total physical data read operations across all tablespaces; `Innodb_data_writes` counts total physical data write operations.",
    explanation: "Used to determine the physical disk I/O profile (Read-Heavy vs Write-Heavy) of the database host.",
    hint: "Total physical data read and write operations across tablespaces.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS WHERE Variable_name IN ('Innodb_data_reads', 'Innodb_data_writes');`
  },
  {
    question: "What does `Innodb_buffer_pool_pages_data` represent?",
    shortAnswer: "The count of 16KB page frames in the buffer pool that currently hold active table data or index pages (both clean and dirty).",
    explanation: "Dividing `pages_data` by `pages_total` calculates the percentage of the buffer pool actively populated with cached database data.",
    hint: "Count of buffer pool pages populated with table and index data.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_data';`
  },
  {
    question: "What is `Innodb_buffer_pool_pages_total`?",
    shortAnswer: "The total capacity of the buffer pool measured in 16KB page frames (e.g. 65,536 pages for a 1GB buffer pool).",
    explanation: "Calculated as $\\frac{\\text{innodb\\_buffer\\_pool\\_size}}{16384}$.",
    hint: "Total page frame capacity of the buffer pool in 16KB units.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_pages_total';`
  },
  {
    question: "What does a sudden drop in Buffer Pool Hit Ratio (e.g. from 99.8% to 88.0%) indicate?",
    shortAnswer: "A large unindexed query, a massive table scan, or an unbuffered bulk data load has forced vast amounts of historical data into the buffer pool, evicting the active working set from RAM.",
    explanation: "Identifies query cache pollution requiring immediate query optimization or buffer pool expansion.",
    hint: "Indicates working set eviction caused by large table scans or undersized RAM.",
    level: "intermediate",
    codeExample: `-- Check for sudden drop in hit ratio:
-- Ratio < 95% indicates active cache eviction and disk thrashing.`
  },
  {
    question: "What is `Select_scan` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The cumulative count of queries that performed a full table scan on the first table referenced in the query.",
    explanation: "A high rate of `Select_scan` indicates missing indexes on `WHERE` filter predicates.",
    hint: "Count of full table scans performed on the first table.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Select_scan';`
  },
  {
    question: "What is `Handler_read_first` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of times the first entry in an index was read, typically indicating a full index scan (e.g. `SELECT MIN(id)` or unindexed `ORDER BY ... ASC LIMIT 1`).",
    explanation: "Tracks full index traversals.",
    hint: "Counts reads of the first index entry during full index scans.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Handler_read_first';`
  },
  {
    question: "What is `Handler_read_rnd` in `SHOW GLOBAL STATUS`?",
    shortAnswer: "The number of requests to read a row based on a fixed physical position (commonly seen during filesort operations where MySQL retrieves rows after sorting pointers).",
    explanation: "High `Handler_read_rnd` counters highlight queries performing expensive temporary disk-based sorts.",
    hint: "Counts physical row reads by position during sorting operations.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Handler_read_rnd';`
  },
  {
    question: "How do you calculate the ratio of indexed reads vs full scan row steps in MySQL?",
    shortAnswer: "Compare `Handler_read_key` against `Handler_read_rnd_next`: $\\text{Index Efficiency Ratio} = \\frac{\\text{Handler\\_read\\_key}}{\\text{Handler\\_read\\_key} + \\text{Handler\\_read\\_rnd\\_next}}$.",
    explanation: "In high-performance OLTP systems, this ratio should exceed 95%.",
    hint: "Handler_read_key / (Handler_read_key + Handler_read_rnd_next).",
    level: "expert",
    codeExample: `SELECT 
  k.VARIABLE_VALUE AS indexed_reads,
  s.VARIABLE_VALUE AS scan_reads,
  ROUND(k.VARIABLE_VALUE / (k.VARIABLE_VALUE + s.VARIABLE_VALUE) * 100, 2) AS index_efficiency_pct
FROM performance_schema.global_status k
JOIN performance_schema.global_status s ON s.VARIABLE_NAME = 'Handler_read_rnd_next'
WHERE k.VARIABLE_NAME = 'Handler_read_key';`
  },
  {
    question: "What does `Connections` in `SHOW GLOBAL STATUS` indicate?",
    shortAnswer: "The cumulative total number of connection attempts (both successful and failed) made to the MySQL server since startup.",
    explanation: "Dividing `Connections` by `Uptime` calculates the connection creation rate per second.",
    hint: "Cumulative total of all connection attempts since boot.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Connections';`
  },
  {
    question: "What is `Innodb_buffer_pool_wait_free` in `SHOW GLOBAL STATUS` and why is a non-zero value alarming?",
    shortAnswer: "It counts the number of times a write transaction had to pause and wait for the InnoDB background page cleaner to flush dirty pages to disk to free up memory frames in the buffer pool.",
    explanation: "Non-zero `wait_free` indicates severe buffer pool write flushing stalls, causing write transactions to freeze.",
    hint: "Counts write transaction stalls waiting for buffer pool page flushes.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_wait_free';`
  },
  {
    question: "What does `Table_locks_waited` in `SHOW GLOBAL STATUS` represent?",
    shortAnswer: "The total number of times a request for a table lock could not be granted immediately and had to wait for another transaction to release its lock.",
    explanation: "High table lock wait counts indicate metadata locking contention or use of legacy MyISAM tables.",
    hint: "Counts table lock acquisition wait stalls.",
    level: "intermediate",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Table_locks_waited';`
  },
  {
    question: "What does `Table_locks_immediate` in `SHOW GLOBAL STATUS` represent?",
    shortAnswer: "The total number of times a table lock request was granted immediately without waiting.",
    explanation: "Comparing `Table_locks_immediate` vs `Table_locks_waited` measures table locking efficiency.",
    hint: "Counts table locks granted immediately without waiting.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Table_locks_immediate';`
  },
  {
    question: "How do you calculate the percentage of dirty pages in the InnoDB buffer pool?",
    shortAnswer: "Divide `Innodb_buffer_pool_pages_dirty` by `Innodb_buffer_pool_pages_total` and multiply by 100: $\\text{Dirty Pct} = \\left(\\frac{\\text{pages\\_dirty}}{\\text{pages\\_total}}\\right) \\times 100\\%$.",
    explanation: "Controlled by `innodb_max_dirty_pages_pct` (default 90% in MySQL 8.0).",
    hint: "(pages_dirty / pages_total) * 100.",
    level: "intermediate",
    codeExample: `SELECT 
  d.VARIABLE_VALUE AS dirty_pages,
  t.VARIABLE_VALUE AS total_pages,
  ROUND((d.VARIABLE_VALUE / t.VARIABLE_VALUE) * 100, 2) AS dirty_pages_pct
FROM performance_schema.global_status d
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Innodb_buffer_pool_pages_total'
WHERE d.VARIABLE_NAME = 'Innodb_buffer_pool_pages_dirty';`
  },
  {
    question: "What is `Key_reads` vs `Key_read_requests` and when is it relevant?",
    shortAnswer: "It measures the MyISAM key cache hit ratio; it is only relevant if using MyISAM tables, whereas modern MySQL 8.0 InnoDB tables rely exclusively on `Innodb_buffer_pool_reads`.",
    explanation: "InnoDB uses the buffer pool, not the MyISAM key buffer.",
    hint: "Relevant only for MyISAM tables; InnoDB uses buffer pool metrics.",
    level: "basic",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Key_read%';`
  },
  {
    question: "How does `Innodb_rows_read`, `Innodb_rows_inserted`, `Innodb_rows_updated`, and `Innodb_rows_deleted` differ from `Com_select`, `Com_insert`, etc.?",
    shortAnswer: "`Com_*` counts SQL statements; `Innodb_rows_*` counts the actual number of individual table rows modified or read by the InnoDB storage engine.",
    explanation: "A single `UPDATE` statement (`Com_update = 1`) might modify 50,000 rows (`Innodb_rows_updated = 50000`).",
    hint: "Com_* counts SQL statements; Innodb_rows_* counts actual physical row mutations.",
    level: "intermediate",
    codeExample: `SELECT VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME LIKE 'Innodb_rows_%';`
  },
  {
    question: "What is the recommended automated alerting threshold for `Threads_connected`?",
    shortAnswer: "Trigger a warning alert at **80% of `max_connections`** and a critical PagerDuty alert at **90% of `max_connections`**.",
    explanation: "Provides engineering teams with adequate time to diagnose connection leaks or resize connection pools before reaching 100% capacity.",
    hint: "Warning at 80% saturation, Critical alert at 90% saturation.",
    level: "basic",
    codeExample: `-- Alert rule: (Threads_connected / max_connections) >= 0.80`
  },
  {
    question: "What is the primary operational takeaway of Topic 10 in Module 004_005?",
    shortAnswer: "The six core telemetry metrics provide complete visibility into database capacity: monitor `Threads_running` against CPU core limits to prevent thread starvation, maintain `Buffer Pool Hit Ratio > 99.0%` using `Innodb_buffer_pool_reads` vs `read_requests`, alert on `Threads_connected` approaching 80% of `max_connections`, track `Questions` for QPS throughput, and use `Handler_read_key` vs `Handler_read_rnd_next` to verify index efficiency.",
    explanation: "Mastering these six telemetry metrics allows database engineers to identify hardware bottlenecks, size memory caches accurately, and prevent production outages.",
    hint: "Summarize the 6 core metrics, Hit Ratio >99%, Threads_running CPU starvation, and connection saturation alerts.",
    level: "basic",
    codeExample: `-- Master 6-Metric Health Telemetry Dashboard:
SELECT 
  'Health Dashboard' AS status,
  (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Uptime') AS uptime_s,
  (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Threads_connected') AS connected,
  (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Threads_running') AS running_on_cpu,
  (SELECT VARIABLE_VALUE FROM performance_schema.global_status WHERE VARIABLE_NAME = 'Questions') AS total_questions,
  (SELECT ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 3) 
   FROM performance_schema.global_status r 
   JOIN performance_schema.global_status req ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests' 
   WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads') AS buffer_pool_hit_ratio_pct;`
  }
];

export default questions;
