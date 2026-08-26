// topic11_files/topic11_questions.js
// Module 004_005: Server Logs, Slow Query Analysis & Performance Schema
// Topic 11: Calculating Critical Health Indicators: Buffer Pool Hit Ratio, Connection Pool Saturation, Query Cache / QPS Rates

const questions = [
  {
    question: "What is the mathematical formula for calculating the InnoDB Buffer Pool Hit Ratio, and what is the target production SLA?",
    shortAnswer: "$\\text{Hit Ratio} = \\left(1 - \\frac{\\text{Innodb\\_buffer\\_pool\\_reads}}{\\text{Innodb\\_buffer\\_pool\\_read\\_requests}}\\right) \\times 100\\%$. The target production SLA is **>99.0%** (gold standard: **>99.9%**).",
    explanation: "If the hit ratio falls below 95%, it indicates that more than 5% of all read requests are causing physical disk I/O, resulting in severe query latency degradation.",
    hint: "(1 - (reads / read_requests)) * 100, target >99.0%.",
    level: "basic",
    codeExample: `SELECT 
  ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 4) AS buffer_pool_hit_ratio_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status req 
  ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'
WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads';`
  },
  {
    question: "What is the formula for calculating Connection Pool Saturation percentage in MySQL?",
    shortAnswer: "$\\text{Saturation} = \\left(\\frac{\\text{Threads\\_connected}}{\\text{max\\_connections}}\\right) \\times 100\\%$.",
    explanation: "Standard enterprise alerting triggers a Warning alert at 80% saturation and a Critical PagerDuty alert at 90% saturation to prevent `ERROR 1040: Too many connections`.",
    hint: "(Threads_connected / max_connections) * 100.",
    level: "basic",
    codeExample: `SELECT 
  c.VARIABLE_VALUE AS connected,
  m.VARIABLE_VALUE AS max_allowed,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS connection_saturation_pct
FROM performance_schema.global_status c
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
WHERE c.VARIABLE_NAME = 'Threads_connected';`
  },
  {
    question: "Why was the legacy MySQL Query Cache completely removed in MySQL 8.0?",
    shortAnswer: "Because the Query Cache used a single global mutex lock across the entire server; every single table modification (`INSERT`/`UPDATE`/`DELETE`) invalidated all cached entries for that table, causing severe thread lock contention and throughput degradation on multicore servers.",
    explanation: "Modern MySQL 8.0 relies on InnoDB buffer pool caching and external application caching (Redis/Memcached) which scale horizontally.",
    hint: "Global mutex lock caused severe concurrency bottlenecks on multicore servers.",
    level: "intermediate",
    codeExample: `-- Query Cache is fully removed in MySQL 8.0; query_cache_type and query_cache_size are obsolete.`
  },
  {
    question: "How do you calculate real-time Queries Per Second (QPS) over an exact 10-second monitoring interval?",
    shortAnswer: "$\\text{QPS} = \\frac{\\text{Questions}(t_2) - \\text{Questions}(t_1)}{t_2 - t_1}$.",
    explanation: "Subtracting initial client questions from final client questions and dividing by elapsed seconds produces the true current workload throughput.",
    hint: "(Questions_t2 - Questions_t1) / (t2 - t1).",
    level: "basic",
    codeExample: `# Sample: Questions at t=0s is 50,000; Questions at t=10s is 85,000:
# QPS = (85,000 - 50,000) / 10 = 3,500 QPS.`
  },
  {
    question: "In Mamata & Susmita's Barrackpore retail store, POS checkout slowed during evening rush. How did Mamata calculate the Buffer Pool Hit Ratio live to prove memory was starved?",
    shortAnswer: "She queried `performance_schema.global_status` and calculated a Hit Ratio of **88.4%** (`Innodb_buffer_pool_reads` = 580,000 vs `read_requests` = 5,000,000), proving that 11.6% of all page requests were hitting physical disk.",
    explanation: "Increasing `innodb_buffer_pool_size` from 2GB to 8GB restored the Hit Ratio to 99.9%, restoring sub-millisecond checkout speeds across ₹1.2 Crores in retail inventory.",
    hint: "Calculated 88.4% hit ratio, proving 11.6% of queries hit physical disk.",
    level: "moderate",
    codeExample: `# Barrackpore Hit Ratio Calculation:
# (1 - (580,000 / 5,000,000)) * 100 = 88.4% (Severely Starved!)`
  },
  {
    question: "In Abhronila & Debangshu's Kolkata fintech bank, how did Debangshu calculate Transactions Per Second (TPS) across ₹500 Crores in banking ledgers?",
    shortAnswer: "He measured the delta of `Com_commit` and `Com_rollback` over 60 seconds: $\\text{TPS} = \\frac{(\\Delta \\text{Com\\_commit} + \\Delta \\text{Com\\_rollback})}{60}$, measuring 4,200 write transactions per second.",
    explanation: "TPS measures write transaction throughput, distinguishing transactional changes from read-only `SELECT` queries.",
    hint: "(Delta Com_commit + Delta Com_rollback) / elapsed seconds.",
    level: "expert",
    codeExample: `SELECT 
  SUM(VARIABLE_VALUE) AS total_commits_and_rollbacks 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Com_commit', 'Com_rollback');`
  },
  {
    question: "What is the formula for the Index Utilization Efficiency Ratio in MySQL?",
    shortAnswer: "$\\text{Index Efficiency} = \\left(\\frac{\\text{Handler\\_read\\_key}}{\\text{Handler\\_read\\_key} + \\text{Handler\\_read\\_rnd\\_next}}\\right) \\times 100\\%$.",
    explanation: "A healthy OLTP system should achieve **>95.0%**. A ratio below 90% indicates excessive sequential table scanning.",
    hint: "(Handler_read_key / (Handler_read_key + Handler_read_rnd_next)) * 100.",
    level: "intermediate",
    codeExample: `SELECT 
  k.VARIABLE_VALUE AS indexed_reads,
  s.VARIABLE_VALUE AS scan_reads,
  ROUND((k.VARIABLE_VALUE / (k.VARIABLE_VALUE + s.VARIABLE_VALUE)) * 100, 2) AS index_efficiency_pct
FROM performance_schema.global_status k
JOIN performance_schema.global_status s ON s.VARIABLE_NAME = 'Handler_read_rnd_next'
WHERE k.VARIABLE_NAME = 'Handler_read_key';`
  },
  {
    question: "What is the Temporary Disk Table Spill Ratio formula, and what is its target SLA?",
    shortAnswer: "$\\text{Disk Spill Ratio} = \\left(\\frac{\\text{Created\\_tmp\\_disk\\_tables}}{\\text{Created\\_tmp\\_tables}}\\right) \\times 100\\%$. The target SLA is **<10.0%** (ideally <5%).",
    explanation: "A ratio higher than 15% indicates that complex `GROUP BY`, `DISTINCT`, or unindexed joins are spilling from RAM to disk storage.",
    hint: "(Created_tmp_disk_tables / Created_tmp_tables) * 100, target <10%.",
    level: "intermediate",
    codeExample: `SELECT 
  d.VARIABLE_VALUE AS disk_tmp_tables,
  t.VARIABLE_VALUE AS total_tmp_tables,
  ROUND((d.VARIABLE_VALUE / (t.VARIABLE_VALUE + 0.001)) * 100, 2) AS disk_tmp_spill_pct
FROM performance_schema.global_status d
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Created_tmp_tables'
WHERE d.VARIABLE_NAME = 'Created_tmp_disk_tables';`
  },
  {
    question: "How do you calculate the InnoDB Redo Log generation rate in Megabytes per second (MB/s)?",
    shortAnswer: "$\\text{Redo Rate (MB/s)} = \\frac{\\text{Innodb\\_os\\_log\\_written}(t_2) - \\text{Innodb\\_os\\_log\\_written}(t_1)}{1024 \\times 1024 \\times (t_2 - t_1)}$.",
    explanation: "Used to properly size `innodb_redo_log_capacity` in MySQL 8.0 so that checkpoints occur every 15-30 minutes without flushing stalls.",
    hint: "Delta of Innodb_os_log_written in bytes / (1024 * 1024 * delta_time).",
    level: "expert",
    codeExample: `-- Used to size innodb_redo_log_capacity in MySQL 8.0.30+`
  },
  {
    question: "What does the Read-to-Write Ratio formula measure in MySQL?",
    shortAnswer: "$\\text{Read Pct} = \\left(\\frac{\\text{Com\\_select}}{\\text{Com\\_select} + \\text{Com\\_insert} + \\text{Com\\_update} + \\text{Com\\_delete}}\\right) \\times 100\\%$.",
    explanation: "Standard web applications typically exhibit 80% to 95% Reads and 5% to 20% Writes, dictating read-replica scaling architecture.",
    hint: "Com_select / (Com_select + Com_insert + Com_update + Com_delete) * 100.",
    level: "basic",
    codeExample: `SELECT 
  s.VARIABLE_VALUE AS selects,
  (i.VARIABLE_VALUE + u.VARIABLE_VALUE + d.VARIABLE_VALUE) AS writes,
  ROUND((s.VARIABLE_VALUE / (s.VARIABLE_VALUE + i.VARIABLE_VALUE + u.VARIABLE_VALUE + d.VARIABLE_VALUE)) * 100, 2) AS read_pct
FROM performance_schema.global_status s
JOIN performance_schema.global_status i ON i.VARIABLE_NAME = 'Com_insert'
JOIN performance_schema.global_status u ON u.VARIABLE_NAME = 'Com_update'
JOIN performance_schema.global_status d ON d.VARIABLE_NAME = 'Com_delete'
WHERE s.VARIABLE_NAME = 'Com_select';`
  },
  {
    question: "What is the formula for Table Open Cache Hit Ratio in MySQL?",
    shortAnswer: "$\\text{Table Cache Hit Ratio} = \\left(1 - \\frac{\\text{Opened\\_tables}}{\\text{Open\\_tables} + \\text{Opened\\_tables}}\\right) \\times 100\\%$.",
    explanation: "A hit ratio below 85% indicates `table_open_cache` is too small, forcing MySQL to repeatedly open and close `.ibd` files on disk.",
    hint: "(1 - (Opened_tables / (Open_tables + Opened_tables))) * 100.",
    level: "intermediate",
    codeExample: `SELECT 
  o.VARIABLE_VALUE AS open_tables,
  od.VARIABLE_VALUE AS opened_tables,
  ROUND((1 - (od.VARIABLE_VALUE / (o.VARIABLE_VALUE + od.VARIABLE_VALUE))) * 100, 2) AS table_cache_hit_pct
FROM performance_schema.global_status o
JOIN performance_schema.global_status od ON od.VARIABLE_NAME = 'Opened_tables'
WHERE o.VARIABLE_NAME = 'Open_tables';`
  },
  {
    question: "How do you calculate the Thread Cache Hit Ratio in MySQL?",
    shortAnswer: "$\\text{Thread Cache Hit Ratio} = \\left(1 - \\frac{\\text{Threads\\_created}}{\\text{Connections}}\\right) \\times 100\\%$.",
    explanation: "Target SLA is **>99.0%**. If thread hit ratio is low, increasing `thread_cache_size` avoids expensive OS thread creation overhead on new connections.",
    hint: "(1 - (Threads_created / Connections)) * 100, target >99%.",
    level: "intermediate",
    codeExample: `SELECT 
  tc.VARIABLE_VALUE AS threads_created,
  c.VARIABLE_VALUE AS total_connections,
  ROUND((1 - (tc.VARIABLE_VALUE / c.VARIABLE_VALUE)) * 100, 3) AS thread_cache_hit_ratio_pct
FROM performance_schema.global_status tc
JOIN performance_schema.global_status c ON c.VARIABLE_NAME = 'Connections'
WHERE tc.VARIABLE_NAME = 'Threads_created';`
  },
  {
    question: "What does an Index Efficiency Ratio of 65% indicate on a production MySQL database?",
    shortAnswer: "It indicates that 35% of all row access operations are performing sequential full table scans, pointing to missing composite indexes on high-frequency queries.",
    explanation: "Immediate action: inspect `sys.statements_with_full_table_scans` and create indexes matching `WHERE` clauses.",
    hint: "Indicates 35% of row reads are full scans; requires immediate indexing.",
    level: "basic",
    codeExample: `-- Action: Review sys.statements_with_full_table_scans`
  },
  {
    question: "What is the formula for calculating InnoDB Buffer Pool Fill Percentage?",
    shortAnswer: "$\\text{Fill Pct} = \\left(\\frac{\\text{Innodb\\_buffer\\_pool\\_pages\\_data}}{\\text{Innodb\\_buffer\\_pool\\_pages\\_total}}\\right) \\times 100\\%$.",
    explanation: "Indicates how much of the allocated buffer pool RAM is actively populated with database data.",
    hint: "(pages_data / pages_total) * 100.",
    level: "basic",
    codeExample: `SELECT 
  d.VARIABLE_VALUE AS pages_data,
  t.VARIABLE_VALUE AS pages_total,
  ROUND((d.VARIABLE_VALUE / t.VARIABLE_VALUE) * 100, 2) AS buffer_pool_fill_pct
FROM performance_schema.global_status d
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Innodb_buffer_pool_pages_total'
WHERE d.VARIABLE_NAME = 'Innodb_buffer_pool_pages_data';`
  },
  {
    question: "What is the formula for calculating the Average Query Latency across all client queries since server boot?",
    shortAnswer: "Divide the sum of statement timer waits from `performance_schema.events_statements_summary_global_by_event_name` by `Questions`.",
    explanation: "Measures overall server average query execution time.",
    hint: "Sum of timer waits divided by total statement count.",
    level: "expert",
    codeExample: `SELECT 
  ROUND(SUM(SUM_TIMER_WAIT) / SUM(COUNT_STAR) / 1000000000, 3) AS avg_query_latency_ms 
FROM performance_schema.events_statements_summary_global_by_event_name;`
  },
  {
    question: "How do you calculate the Aborted Connection Ratio in MySQL?",
    shortAnswer: "$\\text{Aborted Ratio} = \\left(\\frac{\\text{Aborted\\_connects}}{\\text{Connections}}\\right) \\times 100\\%$.",
    explanation: "A ratio >1% signals network packet loss, firewall drops, or authentication brute-force attempts.",
    hint: "(Aborted_connects / Connections) * 100.",
    level: "basic",
    codeExample: `SELECT 
  a.VARIABLE_VALUE AS aborted,
  c.VARIABLE_VALUE AS total,
  ROUND((a.VARIABLE_VALUE / c.VARIABLE_VALUE) * 100, 3) AS aborted_connect_pct
FROM performance_schema.global_status a
JOIN performance_schema.global_status c ON c.VARIABLE_NAME = 'Connections'
WHERE a.VARIABLE_NAME = 'Aborted_connects';`
  },
  {
    question: "What is the formula for calculating InnoDB Row Lock Contention Percentage?",
    shortAnswer: "$\\text{Lock Wait Pct} = \\left(\\frac{\\text{Innodb\\_row\\_lock\\_waits}}{\\text{Innodb\\_rows\\_inserted} + \\text{Innodb\\_rows\\_updated} + \\text{Innodb\\_rows\\_deleted}}\\right) \\times 100\\%$.",
    explanation: "Measures the probability that a write transaction encounters a row-level lock conflict.",
    hint: "Innodb_row_lock_waits / total write row mutations * 100.",
    level: "expert",
    codeExample: `SELECT 
  w.VARIABLE_VALUE AS lock_waits,
  (i.VARIABLE_VALUE + u.VARIABLE_VALUE + d.VARIABLE_VALUE) AS total_writes,
  ROUND((w.VARIABLE_VALUE / (i.VARIABLE_VALUE + u.VARIABLE_VALUE + d.VARIABLE_VALUE)) * 100, 4) AS lock_wait_pct
FROM performance_schema.global_status w
JOIN performance_schema.global_status i ON i.VARIABLE_NAME = 'Innodb_rows_inserted'
JOIN performance_schema.global_status u ON u.VARIABLE_NAME = 'Innodb_rows_updated'
JOIN performance_schema.global_status d ON d.VARIABLE_NAME = 'Innodb_rows_deleted'
WHERE w.VARIABLE_NAME = 'Innodb_row_lock_waits';`
  },
  {
    question: "How do you calculate the Slow Query Ratio across all executed queries?",
    shortAnswer: "$\\text{Slow Query Pct} = \\left(\\frac{\\text{Slow\\_queries}}{\\text{Questions}}\\right) \\times 100\\%$.",
    explanation: "Target SLA is **<0.1%** (less than 1 slow query per 1,000 queries).",
    hint: "(Slow_queries / Questions) * 100, target <0.1%.",
    level: "basic",
    codeExample: `SELECT 
  s.VARIABLE_VALUE AS slow_queries,
  q.VARIABLE_VALUE AS total_questions,
  ROUND((s.VARIABLE_VALUE / q.VARIABLE_VALUE) * 100, 4) AS slow_query_pct
FROM performance_schema.global_status s
JOIN performance_schema.global_status q ON q.VARIABLE_NAME = 'Questions'
WHERE s.VARIABLE_NAME = 'Slow_queries';`
  },
  {
    question: "What is the formula for calculating In-Memory Sort Efficiency Ratio?",
    shortAnswer: "$\\text{Sort Efficiency} = \\left(1 - \\frac{\\text{Sort\\_merge\\_passes}}{\\text{Sort\\_rows} + 0.001}\\right) \\times 100\\%$.",
    explanation: "If `Sort_merge_passes` is >0, sorting result sets are spilling from RAM to disk. Target SLA is **100%** (zero merge passes).",
    hint: "Zero sort merge passes represents 100% in-memory sorting.",
    level: "intermediate",
    codeExample: `SELECT 
  VARIABLE_NAME, VARIABLE_VALUE 
FROM performance_schema.global_status 
WHERE VARIABLE_NAME IN ('Sort_merge_passes', 'Sort_rows', 'Sort_scan');`
  },
  {
    question: "How do you calculate the Network Egress Bandwidth rate in Megabits per second (Mbps)?",
    shortAnswer: "$\\text{Egress (Mbps)} = \\frac{(\\text{Bytes\\_sent}(t_2) - \\text{Bytes\\_sent}(t_1)) \\times 8}{1024 \\times 1024 \\times (t_2 - t_1)}$.",
    explanation: "Multiplies bytes by 8 to convert to bits, then divides by $1024^2$ and elapsed seconds to measure network interface card (NIC) utilization.",
    hint: "(Delta Bytes_sent * 8) / (1024 * 1024 * delta_seconds).",
    level: "intermediate",
    codeExample: `-- Monitors network interface bandwidth saturation.`
  },
  {
    question: "What is the formula for calculating the Percentage of Transactions Rolled Back?",
    shortAnswer: "$\\text{Rollback Pct} = \\left(\\frac{\\text{Com\\_rollback}}{\\text{Com\\_commit} + \\text{Com\\_rollback}}\\right) \\times 100\\%$.",
    explanation: "A high rollback percentage (>5%) indicates application validation errors, deadlock retries, or lock timeout failures.",
    hint: "Com_rollback / (Com_commit + Com_rollback) * 100.",
    level: "basic",
    codeExample: `SELECT 
  r.VARIABLE_VALUE AS rollbacks,
  c.VARIABLE_VALUE AS commits,
  ROUND((r.VARIABLE_VALUE / (r.VARIABLE_VALUE + c.VARIABLE_VALUE)) * 100, 2) AS rollback_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status c ON c.VARIABLE_NAME = 'Com_commit'
WHERE r.VARIABLE_NAME = 'Com_rollback';`
  },
  {
    question: "What does a Connection Saturation of 85% indicate during peak ecommerce hours?",
    shortAnswer: "The database is approaching maximum connection capacity with only 15% connection headroom remaining; any unexpected microservice scaling burst will cause `ERROR 1040: Too many connections`.",
    explanation: "Immediate action: scale connection pool sizing or reduce application idle connection lifetimes (`wait_timeout`).",
    hint: "Indicates near-exhaustion of connection capacity requiring immediate pool tuning.",
    level: "basic",
    codeExample: `-- Action: Increase max_connections or tune connection pooling.`
  },
  {
    question: "What is the formula for calculating InnoDB Checkpoint Age Lag in Megabytes?",
    shortAnswer: "Subtract `Last Checkpoint LSN` from `Log Sequence Number` (LSN) and divide by $1024^2$: $\\text{Checkpoint Lag (MB)} = \\frac{\\text{Log Sequence Number} - \\text{Last Checkpoint LSN}}{1024 \\times 1024}$.",
    explanation: "Measures the volume of uncheckpointed redo log data that must be scanned during crash recovery.",
    hint: "(Log Sequence Number - Last Checkpoint LSN) / (1024 * 1024).",
    level: "expert",
    codeExample: `SHOW ENGINE INNODB STATUS\\G -- Check LOG section for LSN vs Checkpoint`
  },
  {
    question: "How do you calculate the ratio of Temporary Table Creation in Memory vs Disk?",
    shortAnswer: "$\\text{Memory Tmp Ratio} = \\left(1 - \\frac{\\text{Created\\_tmp\\_disk\\_tables}}{\\text{Created\\_tmp\\_tables}}\\right) \\times 100\\%$.",
    explanation: "Target SLA is **>90.0%** in memory.",
    hint: "(1 - (disk_tmp / total_tmp)) * 100, target >90%.",
    level: "intermediate",
    codeExample: `SELECT 
  d.VARIABLE_VALUE AS disk_tmp,
  t.VARIABLE_VALUE AS total_tmp,
  ROUND((1 - (d.VARIABLE_VALUE / (t.VARIABLE_VALUE + 0.001))) * 100, 2) AS memory_tmp_ratio_pct
FROM performance_schema.global_status d
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Created_tmp_tables'
WHERE d.VARIABLE_NAME = 'Created_tmp_disk_tables';`
  },
  {
    question: "What is the formula for calculating Average Rows Examined per Query across the server?",
    shortAnswer: "$\\text{Avg Rows Examined} = \\frac{\\text{Innodb\\_rows\\_read}}{\\text{Questions}}$.",
    explanation: "A high average (>1,000 rows examined per query) indicates the overall workload is scan-heavy rather than point-lookup-driven.",
    hint: "Innodb_rows_read / Questions.",
    level: "basic",
    codeExample: `SELECT 
  r.VARIABLE_VALUE AS rows_read,
  q.VARIABLE_VALUE AS questions,
  ROUND(r.VARIABLE_VALUE / q.VARIABLE_VALUE, 2) AS avg_rows_examined_per_query
FROM performance_schema.global_status r
JOIN performance_schema.global_status q ON q.VARIABLE_NAME = 'Questions'
WHERE r.VARIABLE_NAME = 'Innodb_rows_read';`
  },
  {
    question: "What does an InnoDB Buffer Pool Hit Ratio of 99.98% signify?",
    shortAnswer: "It signifies that 9,998 out of every 10,000 16KB data page requests are served directly from RAM cache with microsecond access times, with only 2 requests requiring physical disk I/O.",
    explanation: "Represents optimal memory cache sizing and excellent query indexing.",
    hint: "99.98% of requests served from RAM; optimal performance.",
    level: "basic",
    codeExample: `-- Excellent health: 99.98% in-memory cache hit rate.`
  },
  {
    question: "How do you calculate the Rate of Binlog Disk Flushes per Second in MySQL?",
    shortAnswer: "$\\text{Binlog Flush Rate} = \\frac{\\text{Binlog\\_cache\\_disk\\_use}(t_2) - \\text{Binlog\\_cache\\_disk\\_use}(t_1)}{t_2 - t_1}$.",
    explanation: "Non-zero rates indicate large transactions are spilling from `binlog_cache_size` to temporary disk files.",
    hint: "Delta of Binlog_cache_disk_use / delta_time.",
    level: "expert",
    codeExample: `SHOW GLOBAL STATUS LIKE 'Binlog_cache_disk_use';`
  },
  {
    question: "How do you calculate the ratio of Com_select vs Com_insert/update/delete to verify read scalability?",
    shortAnswer: "Calculate read percentage: if read percentage is >90%, adding read replicas will offload 90% of database query demand from the primary master.",
    explanation: "Confirms whether the database workload is suited for horizontal read scaling.",
    hint: "Read percentage >90% confirms read-replica scaling suitability.",
    level: "basic",
    codeExample: `-- High read ratio indicates read-replica scale-out readiness.`
  },
  {
    question: "What is the primary danger of using lifetime average QPS ($\text{Questions} / \text{Uptime}$) for capacity planning?",
    shortAnswer: "Lifetime average QPS smooths out peak traffic bursts over weeks or months, completely concealing 10x traffic surges during flash sales or morning logon rushes.",
    explanation: "Always measure interval QPS (5-second or 1-minute delta rates) for accurate peak capacity provisioning.",
    hint: "Lifetime averages hide peak traffic spikes; use interval delta rates.",
    level: "basic",
    codeExample: `-- Always calculate delta QPS over 10-second intervals.`
  },
  {
    question: "What is the primary operational takeaway of Topic 11 in Module 004_005?",
    shortAnswer: "Derived health indicators provide actionable intelligence for database capacity management: maintain **Buffer Pool Hit Ratio >99.0%** to avoid disk thrashing, keep **Connection Saturation <80%** to prevent connection rejections, calculate **Interval QPS & TPS** to size infrastructure for peak traffic surges, enforce **Index Efficiency >95%**, and maintain **Temporary Disk Table Spill Ratio <10%**.",
    explanation: "Translating raw telemetry counters into mathematical ratios empowers database engineers to enforce SLAs, prevent outages, and maintain high-performance sub-millisecond database execution.",
    hint: "Summarize the 5 core formulas: Hit Ratio >99%, Connection Saturation <80%, Interval QPS/TPS, Index Efficiency >95%, and Disk Spill <10%.",
    level: "basic",
    codeExample: `-- Master Health Scorecard Query:
SELECT 
  ROUND((1 - (r.VARIABLE_VALUE / req.VARIABLE_VALUE)) * 100, 3) AS buffer_pool_hit_pct,
  ROUND((c.VARIABLE_VALUE / m.VARIABLE_VALUE) * 100, 2) AS connection_saturation_pct,
  ROUND((k.VARIABLE_VALUE / (k.VARIABLE_VALUE + s.VARIABLE_VALUE)) * 100, 2) AS index_efficiency_pct,
  ROUND((d.VARIABLE_VALUE / (t.VARIABLE_VALUE + 0.001)) * 100, 2) AS tmp_disk_spill_pct
FROM performance_schema.global_status r
JOIN performance_schema.global_status req ON req.VARIABLE_NAME = 'Innodb_buffer_pool_read_requests'
JOIN performance_schema.global_status c ON c.VARIABLE_NAME = 'Threads_connected'
JOIN performance_schema.global_variables m ON m.VARIABLE_NAME = 'max_connections'
JOIN performance_schema.global_status k ON k.VARIABLE_NAME = 'Handler_read_key'
JOIN performance_schema.global_status s ON s.VARIABLE_NAME = 'Handler_read_rnd_next'
JOIN performance_schema.global_status d ON d.VARIABLE_NAME = 'Created_tmp_disk_tables'
JOIN performance_schema.global_status t ON t.VARIABLE_NAME = 'Created_tmp_tables'
WHERE r.VARIABLE_NAME = 'Innodb_buffer_pool_reads';`
  }
];

export default questions;
