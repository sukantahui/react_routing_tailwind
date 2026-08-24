// topic11_files/topic11_questions.js

const questions = [
  {
    question: "Why do cursor loops perform significantly slower than set-based SQL queries in MySQL?",
    shortAnswer: "Because each cursor iteration incurs procedural virtual machine context switches, row-by-row parsing, variable assignments, and cannot leverage multi-page storage engine optimizations.",
    explanation: "Core causes of cursor latency.",
    hint: "Procedural context switches, row-by-row parsing, and lack of vectorized engine optimization.",
    level: "basic"
  },
  {
    question: "What is the typical speedup achieved by refactoring a cursor loop to a single set-based `UPDATE ... JOIN` query?",
    shortAnswer: "Typically 100x to 500x faster, reducing execution times from minutes to milliseconds.",
    explanation: "Empirical performance multiplier of set-based refactoring.",
    hint: "100x to 500x faster execution.",
    level: "basic"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate set-based vs cursor performance?",
    shortAnswer: "A cursor opens 4 student rows and executes 4 procedural `UPDATE` roundtrips; a set-based `UPDATE students SET fee = fee * 1.05 WHERE dept_id = 1;` modifies all 4 students in a single engine pass in <1ms.",
    explanation: "Set-based vs cursor comparison on student fees.",
    hint: "Single set-based UPDATE modifies all students at once in <1ms.",
    level: "basic"
  },
  {
    question: "What modern MySQL 8.0 feature completely replaces cursor loops for computing cumulative running totals?",
    shortAnswer: "Window Functions: `SUM(amount) OVER (ORDER BY transaction_date ROWS UNBOUNDED PRECEDING)`.",
    explanation: "Window function replacement for cursor running totals.",
    hint: "SUM() OVER (ORDER BY ...).",
    level: "basic"
  },
  {
    question: "What modern MySQL 8.0 feature replaces cursor loops for computing student grade rankings?",
    shortAnswer: "`ROW_NUMBER() OVER (PARTITION BY dept_id ORDER BY score DESC)` or `DENSE_RANK()`.",
    explanation: "Window function replacement for ranking loops.",
    hint: "ROW_NUMBER() / DENSE_RANK() OVER (PARTITION BY ...).",
    level: "basic"
  },
  {
    question: "What modern MySQL 8.0 functions replace nested cursors for constructing hierarchical JSON trees?",
    shortAnswer: "`JSON_OBJECT()` paired with `JSON_ARRAYAGG()` in a single `GROUP BY` query.",
    explanation: "JSON aggregation vs nested cursors.",
    hint: "JSON_OBJECT() and JSON_ARRAYAGG().",
    level: "basic"
  },
  {
    question: "What is the memory danger of opening a cursor with a large result set (e.g. 5,000,000 rows)?",
    shortAnswer: "MySQL may materialize the entire 5 million row result set into an internal temporary table in RAM, overflowing `tmp_table_size` and writing gigabytes to disk I/O.",
    explanation: "Disk spilling hazard of large cursor result sets.",
    hint: "Materializes rows into disk temporary tables, causing severe I/O bottlenecks.",
    level: "expert"
  },
  {
    question: "How does row locking differ between a set-based `UPDATE` and a Cursor loop with per-row updates?",
    shortAnswer: "A set-based `UPDATE` acquires all row locks simultaneously and commits once; a cursor loop acquires and holds locks row-by-row across thousands of loop iterations, dramatically increasing lock contention and deadlocks.",
    explanation: "Lock duration and concurrency impact.",
    hint: "Cursor loops hold locks for much longer durations, increasing deadlock risks.",
    level: "expert"
  },
  {
    question: "When is using a cursor strictly justified over set-based SQL?",
    shortAnswer: "When executing dynamic DDL statements per table via Prepared Statements, or chunking massive multi-million row batch updates into periodic 500-row commits to avoid log exhaustion.",
    explanation: "Valid architectural use cases for cursors.",
    hint: "Dynamic DDL generation and periodic chunked batch commits.",
    level: "expert"
  },
  {
    question: "How do you refactor a cursor containing procedural `IF ... ELSEIF` logic into a set-based query?",
    shortAnswer: "Use a `CASE ... WHEN ... THEN ... ELSE ... END` expression inside a single `UPDATE` or `SELECT` statement.",
    explanation: "CASE expressions replacing procedural IF branching.",
    hint: "Use CASE WHEN ... THEN ... END expressions in single SQL statements.",
    level: "basic"
  },
  {
    question: "What is the CPU impact of executing 100,000 cursor `FETCH` iterations in a stored procedure?",
    shortAnswer: "High CPU utilization caused by 100,000 context switches between the C++ SQL execution engine and the procedural byte-code interpreter.",
    explanation: "CPU context switching cost of procedural loops.",
    hint: "Causes heavy CPU spikes due to procedural interpreter context switching.",
    level: "expert"
  },
  {
    question: "Can an `INSERT ... SELECT` statement replace a cursor loop that reads from Table A and inserts into Table B?",
    shortAnswer: "YES; `INSERT INTO TableB (col1, col2) SELECT col1, col2 FROM TableA;` executes in a single optimized engine operation, running hundreds of times faster.",
    explanation: "INSERT SELECT vs cursor loops.",
    hint: "Yes, use INSERT INTO ... SELECT FROM directly.",
    level: "basic"
  },
  {
    question: "How does the MySQL Query Optimizer treat cursor queries compared to standard SQL queries?",
    shortAnswer: "The cursor query itself is optimized when `OPEN` executes, but the procedural loop logic around `FETCH` is completely invisible to the optimizer and cannot be parallelized or vectorized.",
    explanation: "Optimizer blindness to procedural loops.",
    hint: "The optimizer only sees the query at OPEN, not the procedural loop iterations.",
    level: "expert"
  },
  {
    question: "How do you refactor a cursor loop that concatenates student names for each department into a single string?",
    shortAnswer: "Use `GROUP_CONCAT(name ORDER BY name SEPARATOR ', ')` in a single `GROUP BY dept_id` query.",
    explanation: "GROUP_CONCAT replacement for string concatenation loops.",
    hint: "Use GROUP_CONCAT() in a single GROUP BY query.",
    level: "basic"
  },
  {
    question: "What is the impact of cursors on InnoDB Undo Logs?",
    shortAnswer: "A long-running cursor holding an open transaction prevents InnoDB undo log purge, causing the `ibdata1` tablespace or undo tablespaces to bloat dramatically.",
    explanation: "Undo log retention during long cursor transactions.",
    hint: "Prevents undo log purging, causing massive tablespace bloat.",
    level: "expert"
  },
  {
    question: "How does refactoring a cursor to set-based SQL affect database connection pool concurrency?",
    shortAnswer: "Because execution drops from seconds to milliseconds, database connections are returned to the pool instantly, allowing the server to handle 100x more concurrent users.",
    explanation: "Connection pool throughput improvements.",
    hint: "Frees database connections 100x faster, boosting server concurrency.",
    level: "expert"
  },
  {
    question: "Can a Common Table Expression (CTE) replace recursive cursor loops in MySQL 8.0?",
    shortAnswer: "YES; `WITH RECURSIVE` traverses hierarchical organizational charts, bill-of-materials, and graph structures in a single set-based query without cursors.",
    explanation: "Recursive CTEs replacing procedural loops.",
    hint: "Yes, use WITH RECURSIVE CTEs for hierarchical tree traversal.",
    level: "expert"
  },
  {
    question: "Why does an `UPDATE ... JOIN` perform better than a cursor loop updating one row at a time?",
    shortAnswer: "Because `UPDATE ... JOIN` scans and updates qualifying rows directly within the storage engine buffer pool without moving row data back and forth to procedural variables.",
    explanation: "Buffer pool direct mutation in UPDATE JOIN.",
    hint: "Updates rows directly in buffer pool pages without procedural variable overhead.",
    level: "expert"
  },
  {
    question: "What tool in MySQL can be used to compare the CPU and I/O cost of a cursor vs a set-based query?",
    shortAnswer: "`EXPLAIN ANALYZE` and the `Performance Schema` (or `SHOW PROFILE`).",
    explanation: "Performance measurement tools in MySQL.",
    hint: "Use EXPLAIN ANALYZE and Performance Schema.",
    level: "basic"
  },
  {
    question: "Can cursors cause read consistency issues if other transactions are modifying the data concurrently?",
    shortAnswer: "YES; under `READ COMMITTED` or `REPEATABLE READ`, cursor queries lock in a read view, but subsequent independent procedural DML statements inside the loop see newer committed data, leading to inconsistent state.",
    explanation: "Read view snapshot anomalies in procedural loops.",
    hint: "Independent DML inside loops may see newer committed data than the cursor snapshot.",
    level: "expert"
  },
  {
    question: "How do you refactor a cursor that finds the difference between the current row's fee and the previous row's fee?",
    shortAnswer: "Use the `LAG()` window function: `fee - LAG(fee, 1, 0) OVER (ORDER BY payment_date)` in a single query.",
    explanation: "LAG window function replacing cursor look-behind.",
    hint: "Use LAG() window function.",
    level: "basic"
  },
  {
    question: "How do you refactor a cursor that finds the next row's scheduled exam date?",
    shortAnswer: "Use the `LEAD()` window function: `LEAD(exam_date, 1) OVER (ORDER BY exam_date)`.",
    explanation: "LEAD window function replacing cursor look-ahead.",
    hint: "Use LEAD() window function.",
    level: "basic"
  },
  {
    question: "What is the network latency impact when a client application (Node.js/Java) runs a cursor loop on the server vs sending a single SQL command?",
    shortAnswer: "Zero network difference if the cursor is in a stored procedure, but the server CPU and memory load remains severely degraded compared to set-based SQL.",
    explanation: "Server-side procedural execution vs network roundtrips.",
    hint: "Server CPU and memory remain degraded even if network roundtrips are eliminated.",
    level: "moderate"
  },
  {
    question: "What happens if a stored procedure with a cursor loop is executed concurrently by 1,000 users?",
    shortAnswer: "The database server experiences CPU exhaustion, buffer pool thrashing, and severe lock contention, causing catastrophic throughput collapse.",
    explanation: "Concurrency scalability limits of cursors.",
    hint: "Causes CPU exhaustion, memory thrashing, and server collapse under concurrency.",
    level: "expert"
  },
  {
    question: "Can an `UPSERT` (`INSERT ... ON DUPLICATE KEY UPDATE`) replace a cursor loop that checks if a record exists before deciding to insert or update?",
    shortAnswer: "YES; `INSERT ... ON DUPLICATE KEY UPDATE` performs the existence check and mutation atomically in a single engine operation.",
    explanation: "Atomic upsert replacing existence check loops.",
    hint: "Yes, use INSERT ... ON DUPLICATE KEY UPDATE directly.",
    level: "basic"
  },
  {
    question: "How do you benchmark execution time of set-based SQL vs a cursor inside a stored procedure?",
    shortAnswer: "Record start timestamp `SET v_t1 = BENCHMARK_START()`, execute code, record end timestamp `SET v_t2 = BENCHMARK_END()`, and calculate the difference in milliseconds.",
    explanation: "Benchmarking stored routines.",
    hint: "Capture microsecond timestamps before and after execution.",
    level: "basic"
  },
  {
    question: "What is the primary reason junior developers mistakenly use cursors instead of set-based SQL?",
    shortAnswer: "Procedural habits carried over from general-purpose programming languages (Java/C#/Python) where problems are solved using `for`/`while` loops instead of relational set thinking.",
    explanation: "The procedural mindset trap in database engineering.",
    hint: "Carrying imperative for/while loop habits from Java/Python into SQL.",
    level: "basic"
  },
  {
    question: "Can database indexes speed up a cursor loop's procedural execution body?",
    shortAnswer: "Indexes only speed up the initial `OPEN cur` query and individual inner DML `WHERE` lookups; they cannot eliminate procedural interpreter context switching.",
    explanation: "Index limitations on procedural loops.",
    hint: "Indexes speed up query lookups, but cannot fix procedural interpreter overhead.",
    level: "expert"
  },
  {
    question: "What is the golden rule for choosing between set-based SQL and Cursors?",
    shortAnswer: "'Set-Based SQL First, Cursors Last': Always exhaust set-based alternatives (JOIN, CASE, Window Functions, CTEs) before considering a cursor.",
    explanation: "The fundamental performance axiom.",
    hint: "Set-Based SQL first; use Cursors only as a last resort.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Cursor Performance Implications?",
    shortAnswer: "Ruthlessly eliminate cursors from performance-critical pathways: replace accumulators with Window Functions (`SUM() OVER`), replacements with `UPDATE ... JOIN`, rankings with `ROW_NUMBER()`, and hierarchical trees with `WITH RECURSIVE` CTEs or `JSON_ARRAYAGG`; reserve cursors strictly for dynamic DDL and chunked multi-thousand row batch commits.",
    explanation: "Authoritative architectural best practices for cursor performance tuning.",
    hint: "Replace cursors with Window Functions, UPDATE JOINs, and CTEs; reserve for dynamic DDL/chunking.",
    level: "expert"
  }
];

export default questions;
