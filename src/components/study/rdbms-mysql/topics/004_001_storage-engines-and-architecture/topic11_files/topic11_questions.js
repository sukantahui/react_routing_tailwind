// topic11_files/topic11_questions.js

const questions = [
  {
    question: "What is the recommended rule of thumb for configuring `innodb_buffer_pool_size` on a dedicated MySQL database server?",
    shortAnswer: "Allocate **50% to 75% of total physical RAM** (e.g. 32 GB to 48 GB on a 64 GB RAM server), leaving remaining memory for the OS kernel, connection threads, sort buffers, and temporary query tables.",
    explanation: "Maximizes memory caching without risking Out-of-Memory (OOM) kernel termination.",
    hint: "50% to 75% of total server physical RAM on dedicated database hosts.",
    level: "basic"
  },
  {
    question: "What happens if you allocate 90% or 95% of total physical RAM to `innodb_buffer_pool_size`?",
    shortAnswer: "When concurrent client connections spike and allocate per-thread buffers (`sort_buffer_size`, `join_buffer_size`), the system runs out of physical memory and the **Linux OOM Killer abruptly terminates the `mysqld` process**.",
    explanation: "Severe operational risk from memory starvation.",
    hint: "Causes memory exhaustion, triggering the OS Out-of-Memory (OOM) killer to crash MySQL.",
    level: "basic"
  },
  {
    question: "Can `innodb_buffer_pool_size` be resized dynamically without restarting the MySQL server in MySQL 8.0?",
    shortAnswer: "Yes! Executing `SET GLOBAL innodb_buffer_pool_size = NEW_SIZE;` dynamically resizes the buffer pool online in chunks defined by `innodb_buffer_pool_chunk_size`.",
    explanation: "Allows zero-downtime memory expansion during active production operations.",
    hint: "Yes, dynamically resizable online via SET GLOBAL innodb_buffer_pool_size = ...;",
    level: "basic",
    codeExample: "SET GLOBAL innodb_buffer_pool_size = 17179869184; -- 16 GB Online Resize"
  },
  {
    question: "What is the relationship between `innodb_buffer_pool_size`, `innodb_buffer_pool_chunk_size`, and `innodb_buffer_pool_instances`?",
    shortAnswer: "`innodb_buffer_pool_size` must always be an exact integer multiple of: `innodb_buffer_pool_chunk_size * innodb_buffer_pool_instances`. If misconfigured, MySQL automatically rounds the size UP to the nearest valid multiple.",
    explanation: "Ensures symmetric memory chunk allocation across all buffer pool instances.",
    hint: "Size must be an exact multiple of (chunk_size * instances).",
    level: "expert"
  },
  {
    question: "What is the mathematical formula to calculate the Total Maximum Memory consumption of a MySQL server?",
    shortAnswer: "`Total RAM = Global Buffers + (max_connections * Sum of Per-Thread Buffers)`\nWhere Global = Buffer Pool + Log Buffer + TempTable RAM; Per-Thread = sort_buffer + join_buffer + read_buffer + read_rnd_buffer + binlog_cache.",
    explanation: "Essential formula for DBA capacity planning and OOM prevention.",
    hint: "Global Shared Buffers + (max_connections * Per-Thread Buffers).",
    level: "expert"
  },
  {
    question: "Why should `innodb_buffer_pool_instances` be set to 8 or 16 on multi-core servers?",
    shortAnswer: "To divide the large Buffer Pool into multiple independent memory partitions, reducing mutex lock and read-write latch contention across concurrent CPU worker threads.",
    explanation: "Dramatically boosts concurrency throughput on servers with 8+ CPU cores.",
    hint: "Reduces mutex contention across CPU cores by dividing memory into independent pools.",
    level: "expert"
  },
  {
    question: "What are the five primary Per-Thread memory buffers in MySQL?",
    shortAnswer: "1) `sort_buffer_size` (order by / group by sorting),\n2) `join_buffer_size` (table joins without indexes),\n3) `read_buffer_size` (sequential table scans),\n4) `read_rnd_buffer_size` (random row lookups),\n5) `binlog_cache_size` (transaction binlog staging).",
    explanation: "Allocated individually per active client connection thread when needed.",
    hint: "sort_buffer, join_buffer, read_buffer, read_rnd_buffer, and binlog_cache.",
    level: "expert"
  },
  {
    question: "Why is setting `sort_buffer_size` or `join_buffer_size` to a very large value (e.g. 500 MB) dangerous?",
    shortAnswer: "Because these buffers are allocated **per-thread, per-query**; if 100 concurrent clients execute sort or join queries simultaneously, MySQL will attempt to allocate $100 \\times 500\\text{ MB} = 50\\text{ GB}$ of RAM, instantly crashing the server.",
    explanation: "Keep per-thread buffers conservative (e.g. 2MB to 4MB) and tune queries with indexes instead.",
    hint: "Multiplied by active connections, quickly consuming all physical server RAM.",
    level: "expert"
  },
  {
    question: "What does `innodb_buffer_pool_dump_at_shutdown` and `innodb_buffer_pool_load_at_startup` do?",
    shortAnswer: "They save the page tablespace IDs and page numbers of cached Buffer Pool pages to disk (`ib_buffer_pool`) on shutdown and automatically reload them into memory on startup, achieving instant **Buffer Pool Warm-Up**.",
    explanation: "Eliminates slow cold-cache query latency after database restarts.",
    hint: "Saves cached page IDs on shutdown and reloads them on startup for warm cache performance.",
    level: "basic",
    codeExample: "SHOW VARIABLES LIKE 'innodb_buffer_pool_dump_at_shutdown';\nSHOW VARIABLES LIKE 'innodb_buffer_pool_load_at_startup';"
  },
  {
    question: "What percentage of the hottest Buffer Pool pages is dumped by default in MySQL 8.0?",
    shortAnswer: "**25%** (controlled by `innodb_buffer_pool_dump_pct = 25`), which captures the most active working set while keeping the dump file small and startup load fast.",
    explanation: "Can be increased to 50% or 100% on dedicated servers with fast NVMe storage.",
    hint: "Default is 25% (innodb_buffer_pool_dump_pct).",
    level: "basic"
  },
  {
    question: "How do you calculate the Buffer Pool Hit Ratio in MySQL?",
    shortAnswer: "`Hit Ratio = 100 * (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests))`",
    explanation: "Measures what percentage of page read requests are satisfied directly from RAM without disk I/O.",
    hint: "100 * (1 - (reads / read_requests)).",
    level: "basic",
    codeExample: "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_read%';\n-- Hit Ratio = 100 * (1 - (Innodb_buffer_pool_reads / Innodb_buffer_pool_read_requests))"
  },
  {
    question: "What target Buffer Pool Hit Ratio should a healthy production OLTP database maintain?",
    shortAnswer: "**Greater than 99.0%** (and ideally > 99.5%); a hit ratio dropping below 95% indicates that the Buffer Pool is undersized and causing excessive physical disk read I/O.",
    explanation: "Indicates that 99%+ of all queries execute at nanosecond RAM speeds.",
    hint: "Greater than 99.0% for high-performance enterprise OLTP.",
    level: "basic"
  },
  {
    question: "How do you check the progress of an online `SET GLOBAL innodb_buffer_pool_size` resize operation?",
    shortAnswer: "`SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_resize_status';`",
    explanation: "Displays real-time progress text (e.g. 'Resizing buffer pool from 16GB to 32GB (chunk 4/8)...').",
    hint: "SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_resize_status';",
    level: "basic"
  },
  {
    question: "What is the default value of `innodb_buffer_pool_chunk_size` in MySQL 8.0?",
    shortAnswer: "**128 MB** (134,217,728 bytes).",
    explanation: "The granular unit in which buffer pool instances allocate and deallocate memory.",
    hint: "128 MB (134,217,728 bytes).",
    level: "expert"
  },
  {
    question: "What is the role of `temptable_max_ram` in MySQL 8.0 memory management?",
    shortAnswer: "It defines the maximum amount of RAM (default: **1 GB**) that the TempTable engine can allocate for in-memory temporary tables before overflowing them to disk.",
    explanation: "Prevents complex aggregation queries from consuming unbounded server memory.",
    hint: "Defines maximum RAM for internal temporary tables before spilling to disk.",
    level: "expert"
  },
  {
    question: "How does allocating a larger Buffer Pool impact database write throughput?",
    shortAnswer: "It allows InnoDB to cache more dirty pages in RAM, increasing the efficiency of asynchronous background page cleaner flushing and reducing random disk writes.",
    explanation: "Absorbs write bursts smoothly in memory.",
    hint: "Allows caching more dirty pages in RAM, smoothing out disk write spikes.",
    level: "basic"
  },
  {
    question: "What is the default `innodb_buffer_pool_size` in MySQL 8.0 on a fresh install?",
    shortAnswer: "**128 MB** (134,217,728 bytes) — suitable only for development laptops; must be tuned immediately on production servers.",
    explanation: "Leaving default 128MB on a 64GB production server is a critical mistake.",
    hint: "128 MB default; must be increased for production servers.",
    level: "basic"
  },
  {
    question: "How do you verify how much physical memory MySQL is currently using in Linux?",
    shortAnswer: "Execute `ps aux | grep mysqld` or `top -p $(pgrep mysqld)` and observe Resident Set Size (`RSS`).",
    explanation: "Shows actual physical RAM mapped to the MySQL daemon.",
    hint: "Check RSS (Resident Set Size) via top or ps aux.",
    level: "basic"
  },
  {
    question: "What is the function of the `innodb_buffer_pool_load_abort` command?",
    shortAnswer: "`SET GLOBAL innodb_buffer_pool_load_abort = ON;` cancels an ongoing startup Buffer Pool warmup load if the server needs to prioritize immediate query processing.",
    explanation: "Allows aborting warmup load during emergency boot sequences.",
    hint: "SET GLOBAL innodb_buffer_pool_load_abort = ON;",
    level: "expert"
  },
  {
    question: "What happens if `innodb_buffer_pool_instances` is configured to 8 but `innodb_buffer_pool_size` is only 512 MB?",
    shortAnswer: "MySQL automatically overrides the setting and forces `innodb_buffer_pool_instances = 1` because multi-instance partitioning is only permitted when the buffer pool is **at least 1 GB**.",
    explanation: "Prevents unnecessary instance overhead on small memory allocations.",
    hint: "Forces instances = 1 because total buffer pool size is less than 1 GB.",
    level: "expert"
  },
  {
    question: "What is the purpose of `innodb_lru_scan_depth`?",
    shortAnswer: "It controls how far down the Buffer Pool LRU list the Page Cleaner threads scan for dirty pages to flush per buffer pool instance (default: 1024), tuning background I/O flush rate.",
    explanation: "Higher values increase flush intensity on fast NVMe SSD arrays.",
    hint: "Controls how deep page cleaners scan the LRU list for dirty pages to flush.",
    level: "expert"
  },
  {
    question: "Why should `innodb_buffer_pool_size` be reduced if the database runs on a shared server alongside Redis and Elasticsearch?",
    shortAnswer: "Because Redis and Elasticsearch also require significant physical RAM; allocating 75% to MySQL on a shared server would cause memory contention and trigger swapping or OOM crashes.",
    explanation: "Shared servers require conservative memory partitioning (25-35% per service).",
    hint: "Prevents RAM contention and swapping between competing services on shared hosts.",
    level: "basic"
  },
  {
    question: "What metric in `SHOW GLOBAL STATUS` shows the total number of 16KB pages cached in the Buffer Pool?",
    shortAnswer: "`Innodb_buffer_pool_pages_total` (multiply by 16,384 to calculate total allocated memory in bytes).",
    explanation: "Displays total active page frame capacity.",
    hint: "Innodb_buffer_pool_pages_total.",
    level: "basic"
  },
  {
    question: "What is the effect of setting `innodb_buffer_pool_dump_now = ON`?",
    shortAnswer: "It immediately triggers an asynchronous dump of the current Buffer Pool's hot page IDs to the `ib_buffer_pool` file on disk without shutting down the server.",
    explanation: "Allows taking a manual snapshot of the warm cache state on demand.",
    hint: "Immediately dumps current cached page IDs to ib_buffer_pool on disk.",
    level: "basic"
  },
  {
    question: "How does `performance_schema` memory consumption factor into MySQL RAM sizing?",
    shortAnswer: "The Performance Schema allocates dedicated internal memory structures (typically 500 MB to 2 GB depending on instrument count), which must be budgeted alongside the Buffer Pool.",
    explanation: "Must be included in overall global memory capacity calculations.",
    hint: "Consumes 500MB - 2GB of global memory, which must be budgeted in capacity planning.",
    level: "expert"
  },
  {
    question: "What happens if a query requires an internal temporary table larger than `temptable_max_ram`?",
    shortAnswer: "The TempTable engine automatically spills the temporary table to an on-disk InnoDB temporary tablespace, preventing memory exhaustion at the cost of disk I/O latency.",
    explanation: "Seamless failover from RAM to disk for massive aggregations.",
    hint: "Spills the temporary table to on-disk InnoDB tablespace to prevent memory exhaustion.",
    level: "expert"
  },
  {
    question: "Why should swap space be enabled on Linux database servers even with large RAM allocations?",
    shortAnswer: "A small swap partition (e.g. 4 GB - 8 GB) acts as a safety buffer against temporary memory spikes, giving the OS time to handle transient memory bursts without immediately triggering the lethal OOM killer.",
    explanation: "Acts as an emergency buffer while `vm.swappiness = 1` prevents active swapping.",
    hint: "Acts as a safety cushion against temporary memory spikes to prevent instant OOM kills.",
    level: "expert"
  },
  {
    question: "What is the recommended `vm.swappiness` setting on Linux database hosts running MySQL?",
    shortAnswer: "`vm.swappiness = 1` (or `10`), which instructs the Linux kernel to aggressively prioritize physical RAM for database processes and avoid swapping Buffer Pool pages to disk.",
    explanation: "Prevents severe query latency degradation caused by disk swapping.",
    hint: "vm.swappiness = 1 to prevent swapping database memory pages to disk.",
    level: "expert"
  },
  {
    question: "How do you verify whether the Buffer Pool is actively resizing in MySQL 8.0?",
    shortAnswer: "`SELECT @@innodb_buffer_pool_size;` and `SHOW GLOBAL STATUS LIKE 'Innodb_buffer_pool_resize_status';`.",
    explanation: "Provides real-time confirmation of the new memory allocation.",
    hint: "Check Innodb_buffer_pool_resize_status in Global Status.",
    level: "basic"
  },
  {
    question: "What is the primary architectural takeaway of Topic 11 in Module 004_001?",
    shortAnswer: "Configuring `innodb_buffer_pool_size` according to the 50%-75% rule on dedicated servers, partitioning instances across CPU cores, budgeting per-thread buffers to prevent OOM kills, and enabling warmup dump/load delivers maximum query throughput, sub-millisecond latencies, and enterprise reliability.",
    explanation: "Mastering memory tuning is the crowning skill of MySQL Database Administration.",
    hint: "Mastery of Buffer Pool sizing, instances, per-thread memory budgets, and warmup dump/load.",
    level: "basic"
  }
];

export default questions;
