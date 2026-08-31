// topic14_files/topic14_questions.js

const questions = [
  {
    question: "What is the primary objective of the Hands-on Performance Tuning Workshop?",
    shortAnswer: "To demonstrate a systematic 5-phase optimization methodology that transforms a slow, multi-second query (5,200 ms) into a sub-millisecond execution (4.8 ms) without guesswork.",
    explanation: "Synthesizes all performance tuning concepts: EXPLAIN interpretation, sargability, set-based refactoring, composite indexing, and keyset pagination.",
    hint: "Systematic 5-phase tuning methodology transforming 5-second queries to sub-milliseconds.",
    level: "basic"
  },
  {
    question: "Why should you always baseline a query with `EXPLAIN ANALYZE` before making changes?",
    shortAnswer: "To establish an accurate ground truth of actual execution times, physical rows returned, loop iterations, and memory usage across every node in the execution tree.",
    explanation: "Baselining prevents premature optimization and measures exact speedup ratios at every phase.",
    hint: "Establishes accurate execution metrics and ground truth for before-and-after comparison.",
    level: "basic"
  },
  {
    question: "In the baseline query, what caused the initial 5,200 ms latency?",
    shortAnswer: "A compounding combination of 6 anti-patterns: `SELECT *`, non-sargable `YEAR()` function, unquoted string type cast, correlated subquery in `SELECT`, unindexed `ORDER BY`, and deep `OFFSET 50000`.",
    explanation: "Multiple anti-patterns multiply their bottlenecks together, causing catastrophic server slowdowns.",
    hint: "Compounding anti-patterns: non-sargable filters, type casts, correlated subqueries, filesort, and offset.",
    level: "expert"
  },
  {
    question: "What was the speedup achieved in Phase 2 by fixing sargability and explicit column projection?",
    shortAnswer: "Execution time dropped from **5,200 ms to 840 ms** (over 6x faster), by converting full table scans on dates and strings into initial index range candidate scans.",
    explanation: "Rewriting `YEAR(date)` to `>= '2026-01-01'` allowed MySQL to evaluate B+Tree boundaries.",
    hint: "Dropped from 5,200ms to 840ms (6x faster) by isolating raw columns and quoting strings.",
    level: "basic"
  },
  {
    question: "What was the performance impact in Phase 3 of replacing the correlated subquery with a CTE?",
    shortAnswer: "Latency dropped from **840 ms to 180 ms** (a further 4.6x speedup), eliminating 50,000 individual row-by-row subquery iterations in favor of a single batch join pass.",
    explanation: "Replacing $O(N)$ nested loops with a set-based hash join or index join drastically reduces CPU overhead.",
    hint: "Dropped from 840ms to 180ms by replacing row-by-row subquery loops with set-based CTE join.",
    level: "expert"
  },
  {
    question: "How did creating a composite covering index in Phase 4 reduce latency to 14 ms?",
    shortAnswer: "The index `(city, status, balance_inr DESC, student_id, name)` eliminated all clustered table bookmark lookups and satisfied `ORDER BY` directly from index leaves, removing filesort.",
    explanation: "Index-only access (`Using index`) eliminates physical disk page reads and disk temporary sort files.",
    hint: "Eliminated bookmark lookups and filesort, dropping latency from 180ms to 14ms.",
    level: "expert",
    codeExample: "CREATE INDEX idx_ledger_cov ON student_records (city, status, balance_inr DESC, student_id, name);"
  },
  {
    question: "How did Keyset (Cursor) pagination in Phase 5 achieve the final 4.8 ms execution time?",
    shortAnswer: "By replacing `LIMIT 50000, 20` with `WHERE student_id > 50000 LIMIT 20`, MySQL stopped reading and discarding 50,000 preceding rows, executing an instant $O(1)$ range probe.",
    explanation: "Keyset pagination ensures that page 1,000 executes in the exact same 4.8ms duration as page 1.",
    hint: "Replaced deep OFFSET with WHERE id > ? boundary seek, achieving constant-time 4.8ms execution.",
    level: "expert",
    codeExample: "SELECT student_id, name, balance_inr FROM student_records WHERE student_id > 50000 ORDER BY student_id ASC LIMIT 20;"
  },
  {
    question: "What is the overall cumulative speedup factor achieved across all 5 phases?",
    shortAnswer: "$$5200\\text{ ms} / 4.8\\text{ ms} \\approx 1,083\\times\\text{ faster!}$$ (A 99.9% reduction in execution time and resource consumption).",
    explanation: "Transforming 5.2 seconds into 4.8 milliseconds frees up massive server concurrency.",
    hint: "1,083x faster (5,200ms to 4.8ms).",
    level: "basic"
  },
  {
    question: "What is the golden rule for ordering columns in a multi-column composite index?",
    shortAnswer: "**Equality Columns first → Range Columns second → Sort / Grouping Columns third → Covered Projection Columns last**.",
    explanation: "Maximizes index selectivity before range evaluation and sorting.",
    hint: "Equality → Range → Sort → Covered Projection.",
    level: "expert"
  },
  {
    question: "Why should you NOT create composite indexes with 10+ columns without justification?",
    shortAnswer: "Extremely wide indexes consume large amounts of Buffer Pool RAM, increase secondary index maintenance overhead on `INSERT`/`UPDATE`/`DELETE`, and bloat table files.",
    explanation: "Aim for lean 3-5 column covering indexes targeting high-frequency read endpoints.",
    hint: "Wide indexes bloat RAM, increase write overhead, and consume storage.",
    level: "basic"
  },
  {
    question: "How does reducing a query from 5.2s to 4.8ms impact database connection pool concurrency?",
    shortAnswer: "A connection is held for 4.8ms instead of 5,200ms, allowing a single connection pool of 50 connections to serve over **10,000 requests per second** instead of saturating at 10 requests per second.",
    explanation: "Multiplies total application throughput by over 1,000x under high concurrency.",
    hint: "Frees connections 1,000x faster, multiplying application throughput capacity.",
    level: "expert"
  },
  {
    question: "What is the role of `ANALYZE TABLE` in query tuning workshops?",
    shortAnswer: "To refresh index cardinality statistics so the Cost-Based Optimizer accurately recognizes the low cost of newly created composite indexes.",
    explanation: "Ensures the optimizer picks the newly created index immediately.",
    hint: "Refreshes index cardinality statistics for the optimizer.",
    level: "basic",
    codeExample: "ANALYZE TABLE student_records;"
  },
  {
    question: "Why does tuning queries before scaling hardware save cloud infrastructure costs?",
    shortAnswer: "Because buying a larger AWS/GCP database instance (e.g. 64 vCPU) only masks bad SQL temporarily; optimizing queries allows the workload to run effortlessly on a modest 4 vCPU instance at 80% lower cost.",
    explanation: "Software architecture optimization delivers orders of magnitude greater efficiency than vertical hardware scaling.",
    hint: "Software query tuning yields 1,000x gains; hardware upgrades only yield 2-4x at high cost.",
    level: "basic"
  },
  {
    question: "How do you verify that a tuned query does not produce regressions on edge-case parameter values?",
    shortAnswer: "Test the execution plan across varying parameters (e.g. high-frequency vs rare status codes, dates spanning 1 day vs 5 years) using `EXPLAIN FORMAT=JSON` or `EXPLAIN ANALYZE`.",
    explanation: "Ensures the index remains selective across all parameter distributions.",
    hint: "Test execution plans across both dense and sparse parameter distributions.",
    level: "expert"
  },
  {
    question: "What is a 'Deferred Join' and when should it be used in pagination tuning?",
    shortAnswer: "A deferred join uses an index-only subquery to retrieve only the paginated Primary Keys, and then joins those 20 keys back to the main table to fetch full row payloads.",
    explanation: "Prevents reading full wide row payloads for thousands of discarded offset rows.",
    hint: "Paginates Primary Keys first using covering index, then joins back to table for 20 rows.",
    level: "expert",
    codeExample: "SELECT s.* FROM student_records s JOIN (SELECT student_id FROM student_records WHERE city = 'Barrackpore' ORDER BY gpa DESC LIMIT 50000, 20) p ON s.student_id = p.student_id;"
  },
  {
    question: "What metric in Performance Schema confirms that filesort disk spilling has been eliminated?",
    shortAnswer: "`sort_merge_passes = 0` in session status variables, and the absence of `Creating sort index` in `events_stages_history_long`.",
    explanation: "Confirms that sorting was satisfied entirely by pre-ordered B+Tree index traversal.",
    hint: "sort_merge_passes = 0 and absence of Creating sort index stage.",
    level: "expert"
  },
  {
    question: "Why is it important to audit queries generated by ORMs during tuning workshops?",
    shortAnswer: "ORMs often generate hidden `SELECT *` columns, redundant `LEFT JOIN`s, and `DISTINCT` clauses that destroy performance. Raw SQL tuning guides proper ORM model mapping.",
    explanation: "Understanding raw SQL allows configuring ORM projection, batch size, and eager fetching properly.",
    hint: "ORMs generate hidden anti-patterns that must be tuned at the mapping layer.",
    level: "basic"
  },
  {
    question: "How do you protect a production database against unexpected slow query regressions after deployment?",
    shortAnswer: "Add `/*+ MAX_EXECUTION_TIME(2000) */` optimizer hints to user-facing search queries and monitor the Slow Query Log with `long_query_time = 0.5`.",
    explanation: "Provides circuit-breaker protection and immediate telemetry if an unindexed path is introduced.",
    hint: "Use MAX_EXECUTION_TIME hints and continuous slow log monitoring.",
    level: "basic"
  },
  {
    question: "What is the trade-off between In-Memory CTE Materialization and CTE Merging in MySQL 8.0?",
    shortAnswer: "`MERGE` inlines the CTE into the outer query to allow index pushdown; `MATERIALIZATION` caches the CTE result in memory once if it is referenced multiple times in the query.",
    explanation: "Choose based on whether the CTE benefits from outer index filters or repeated evaluation caching.",
    hint: "MERGE allows index pushdown; MATERIALIZATION caches result for multiple references.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 Invisible Indexes help validate index tuning before dropping old indexes?",
    shortAnswer: "Setting an old index to `INVISIBLE` (`ALTER TABLE tbl ALTER INDEX idx INVISIBLE;`) hides it from the optimizer while keeping it updated on writes, allowing you to verify query stability before dropping it.",
    explanation: "Allows zero-downtime safety testing when retiring obsolete indexes.",
    hint: "Hides index from optimizer to test query plans before physical deletion.",
    level: "expert",
    codeExample: "ALTER TABLE student_records ALTER INDEX idx_old_city INVISIBLE;"
  },
  {
    question: "Why should performance tuning workshops always measure Buffer Pool Hit Ratio?",
    shortAnswer: "A high hit ratio (&gt; 99%) means queries are satisfied directly from fast RAM rather than physical disk reads. Tuning unindexed table scans stops Buffer Pool page eviction.",
    explanation: "Eliminating table scans keeps hot application data resident in RAM.",
    hint: "High hit ratio ensures data is served from fast RAM without disk I/O.",
    level: "expert"
  },
  {
    question: "What is the difference between Logical I/O and Physical I/O in query execution?",
    shortAnswer: "**Logical I/O** is reading pages from the InnoDB Buffer Pool in RAM; **Physical I/O** is reading pages from disk storage when a buffer cache miss occurs.",
    explanation: "Physical I/O is 1,000x slower than logical RAM access.",
    hint: "Logical I/O reads from RAM Buffer Pool; Physical I/O reads from disk storage.",
    level: "basic"
  },
  {
    question: "How do you identify if a query is CPU-bound vs I/O-bound during tuning?",
    shortAnswer: "If `Rows_examined` is huge and CPU usage is 100% while disk read latency is low, the query is CPU-bound (evaluating functions or sorting); if execution waits on file reads, it is I/O-bound.",
    explanation: "Guides whether to optimize CPU expressions/sorting or add covering indexes for I/O reduction.",
    hint: "High rows examined with 100% CPU is CPU-bound; waiting on file reads is I/O-bound.",
    level: "expert"
  },
  {
    question: "What is the impact of table row format (`ROW_FORMAT=DYNAMIC`) on query tuning?",
    shortAnswer: "`DYNAMIC` row format stores wide `TEXT`, `BLOB`, and `VARCHAR` columns off-page in separate overflow pages, keeping clustered B+Tree leaf pages compact and fast to scan.",
    explanation: "Compact leaf pages allow more rows to fit into each 16KB Buffer Pool page.",
    hint: "Stores wide text off-page to keep clustered leaf pages compact in RAM.",
    level: "expert"
  },
  {
    question: "How do you document query performance improvements for engineering reviews?",
    shortAnswer: "Create a Before-and-After Tuning Matrix documenting: 1) Original SQL vs Tuned SQL, 2) Latency (5,200ms vs 4.8ms), 3) Rows Examined (500k vs 20), 4) EXPLAIN access types, and 5) Index DDL.",
    explanation: "Provides clear, reproducible evidence of optimization ROI for tech leads and stakeholders.",
    hint: "Document Before vs After metrics: latency, rows examined, EXPLAIN types, and DDL.",
    level: "basic"
  },
  {
    question: "What is the risk of adding redundant single-column indexes on every column in a table?",
    shortAnswer: "It slows down write operations (`INSERT`, `UPDATE`, `DELETE`), consumes disk space, fragments storage, and confuses the optimizer's cost model without solving composite query needs.",
    explanation: "Replace multiple weak single-column indexes with targeted composite covering indexes.",
    hint: "Slows down writes, bloats storage, and does not solve multi-column queries.",
    level: "basic"
  },
  {
    question: "How does Index Condition Pushdown (ICP) contribute to tuning multi-predicate queries?",
    shortAnswer: "ICP pushes index-filtered conditions directly into the storage engine layer, discarding non-matching index entries before fetching full clustered row records.",
    explanation: "Shown as `Using index condition` in EXPLAIN Extra, reducing clustered table lookups.",
    hint: "Storage engine filters index entries before reading clustered table rows.",
    level: "expert"
  },
  {
    question: "Why should database performance tuning be an ongoing practice rather than a one-time project?",
    shortAnswer: "Because as data volume grows, schema requirements evolve, and user access patterns shift, query execution plans and index selectivity change over time.",
    explanation: "Continuous slow log monitoring and quarterly index audits maintain sub-millisecond performance.",
    hint: "Data growth and changing access patterns require continuous telemetry and audits.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway from the 5-second to 5-millisecond transformation workshop?",
    shortAnswer: "High database performance is not magic; it is the systematic elimination of structural anti-patterns, followed by set-based refactoring and mathematically precise composite indexing.",
    explanation: "Applying the 5-phase framework systematically guarantees 100x to 1,000x performance gains on relational workloads.",
    hint: "Systematic elimination of anti-patterns, set-based refactoring, and composite indexing.",
    level: "basic"
  },
  {
    question: "What final advice does Sukanta Hui give to aspiring database performance engineers?",
    shortAnswer: "Always let the execution plan guide your hands. Never guess, never assume, and never write `SELECT *` on production tables. Measure with `EXPLAIN ANALYZE`, isolate your predicates, and build covering indexes!",
    explanation: "Scientific discipline, rigorous measurement, and index-friendly SQL are the hallmarks of a master database architect.",
    hint: "Never guess; measure with EXPLAIN ANALYZE, isolate predicates, and build covering indexes.",
    level: "basic"
  }
];

export default questions;
