// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is `EXPLAIN ANALYZE` in MySQL 8.0.18+?",
    shortAnswer: "An execution profiling command that actually executes the query and prints the Volcano iterator execution tree with both optimizer estimates and actual real-time execution metrics.",
    explanation: "Core definition of EXPLAIN ANALYZE.",
    hint: "Actually executes the query to report actual execution times, rows, and loops.",
    level: "basic"
  },
  {
    question: "How does `EXPLAIN ANALYZE` differ from standard `EXPLAIN`?",
    shortAnswer: "Standard `EXPLAIN` only generates estimated plan costs without running the query; `EXPLAIN ANALYZE` **actually executes the query** and captures real elapsed times and row counts.",
    explanation: "Execution vs estimation distinction.",
    hint: "Standard EXPLAIN only estimates; EXPLAIN ANALYZE actually executes.",
    level: "basic"
  },
  {
    question: "In what format does `EXPLAIN ANALYZE` output its execution profile?",
    shortAnswer: "Hierarchical **TREE format** (showing iterator nodes with indentation and metrics).",
    explanation: "Output format of EXPLAIN ANALYZE.",
    hint: "Hierarchical TREE format.",
    level: "basic"
  },
  {
    question: "What do the two numbers in `actual time=0.045..0.120` represent?",
    shortAnswer: "`0.045` ms is the time to retrieve the **first matching row**; `0.120` ms is the time to retrieve **all matching rows** for a single loop iteration.",
    explanation: "First row vs all rows timing breakdown.",
    hint: "First number = time to first row; Second number = time to all rows.",
    level: "basic"
  },
  {
    question: "What unit of time is used in `EXPLAIN ANALYZE` outputs?",
    shortAnswer: "**Milliseconds (ms)**.",
    explanation: "Measurement units in EXPLAIN ANALYZE.",
    hint: "Milliseconds (ms).",
    level: "basic"
  },
  {
    question: "What does the `rows` metric inside `(actual time=... rows=12 loops=1)` represent?",
    shortAnswer: "The **average number of rows** returned by that iterator per loop execution.",
    explanation: "rows metric definition.",
    hint: "Average rows returned per loop iteration.",
    level: "basic"
  },
  {
    question: "What does the `loops` metric inside `(actual time=... rows=12 loops=100)` represent?",
    shortAnswer: "The total number of times that iterator node was invoked/executed by its parent iterator.",
    explanation: "loops metric definition.",
    hint: "Total number of times the iterator node was executed.",
    level: "basic"
  },
  {
    question: "How do you calculate the TOTAL number of rows produced by a node with `rows=5 loops=100`?",
    shortAnswer: "Multiply `rows` by `loops`: $5 \\times 100 = 500$ total rows produced.",
    explanation: "Total row count formula.",
    hint: "Multiply rows by loops (5 * 100 = 500).",
    level: "basic"
  },
  {
    question: "How do you calculate the TOTAL time spent inside an iterator node with `actual time=0.02..0.10 loops=50`?",
    shortAnswer: "Multiply the completion time by loops: $0.10\\text{ ms} \\times 50 = 5.0\\text{ ms}$ total execution time.",
    explanation: "Total time calculation formula.",
    hint: "Multiply end time by loops (0.10ms * 50 = 5.0ms).",
    level: "basic"
  },
  {
    question: "How do student queries for Mamata and Susmita illustrate nested loop multiplication?",
    shortAnswer: "If an outer student query finds 50 students in Barrackpore, the inner enrollment lookup iterator executes with `loops=50`, fetching enrollment records 50 separate times.",
    explanation: "Nested loop iteration demonstration.",
    hint: "Outer query runs once (loops=1); inner query repeats for each outer row (loops=50).",
    level: "basic"
  },
  {
    question: "What does it indicate if an iterator shows `cost=10.00 rows=5` (estimated) but `actual time=... rows=50000 loops=1` (actual)?",
    shortAnswer: "A severe **Optimizer Estimation Error / Statistics Drift**: the optimizer severely underestimated row cardinality (5 vs 50,000), causing it to pick a flawed execution plan.",
    explanation: "Diagnosing optimizer estimation drift.",
    hint: "Indicates stale statistics or estimation drift leading to bad execution plans.",
    level: "expert"
  },
  {
    question: "How should a DBA fix massive optimizer estimation errors discovered via `EXPLAIN ANALYZE`?",
    shortAnswer: "Run `ANALYZE TABLE table_name;` to refresh index statistics, create histograms, or add composite indexes.",
    explanation: "Remediating optimizer estimation errors.",
    hint: "Run ANALYZE TABLE or build column histograms.",
    level: "basic"
  },
  {
    question: "Does `EXPLAIN ANALYZE` work on `INSERT`, `UPDATE`, or `DELETE` statements?",
    shortAnswer: "NO; MySQL 8.0 restricts `EXPLAIN ANALYZE` to read-only queries (`SELECT`, `TABLE`, and `VALUES`) to prevent unintended physical data modifications during profiling.",
    explanation: "Read-only restriction on EXPLAIN ANALYZE.",
    hint: "No, restricted to SELECT, TABLE, and VALUES to prevent accidental data changes.",
    level: "expert"
  },
  {
    question: "How can a developer profile an `UPDATE` or `DELETE` statement using `EXPLAIN ANALYZE`?",
    shortAnswer: "Convert the `UPDATE`/`DELETE` predicate into an equivalent `SELECT` query with `FOR UPDATE` (or wrap inside a transaction and rollback).",
    explanation: "Workaround for profiling DML with EXPLAIN ANALYZE.",
    hint: "Profile the equivalent SELECT query with the same WHERE predicates.",
    level: "expert"
  },
  {
    question: "What does `-> Sort: s.name` indicate in an `EXPLAIN ANALYZE` tree?",
    shortAnswer: "An in-memory or on-disk sorting iterator (Filesort) that buffers and sorts rows before passing them to the parent iterator.",
    explanation: "Sort iterator in EXPLAIN ANALYZE.",
    hint: "An explicit sort operation (Filesort) evaluating order by clauses.",
    level: "basic"
  },
  {
    question: "What does `-> Table scan on <temporary>` indicate in `EXPLAIN ANALYZE`?",
    shortAnswer: "The query materialized intermediate results into an internal temporary table and is scanning the temporary table.",
    explanation: "Temporary table materialization iterator.",
    hint: "Scanning an internal materialized temporary table.",
    level: "basic"
  },
  {
    question: "Why is the time reported for a parent node inclusive of the time spent in child nodes?",
    shortAnswer: "Because Volcano iterators are nested: the parent iterator calls the child iterator and waits for child rows to return, accumulating child execution time.",
    explanation: "Cumulative timing nature of parent iterator nodes.",
    hint: "Parent node times include the execution times of all their child iterators.",
    level: "expert"
  },
  {
    question: "How do you determine the EXCLUSIVE time spent solely in a specific iterator node?",
    shortAnswer: "Subtract the total time of its child iterators from the parent iterator's total time.",
    explanation: "Calculating exclusive node processing time.",
    hint: "Subtract child node times from parent node time.",
    level: "expert"
  },
  {
    question: "What does `-> Hash join` with `(actual time=1.20..15.40 rows=1000 loops=1)` indicate?",
    shortAnswer: "A Hash Join iterator that built an in-memory hash table on the smaller build table and probed it with rows from the probe table.",
    explanation: "Hash join execution profile.",
    hint: "In-memory hash join execution measuring build and probe times.",
    level: "expert"
  },
  {
    question: "What is the danger of running `EXPLAIN ANALYZE` on an un-indexed query on a 50-million-row production table?",
    shortAnswer: "Because `EXPLAIN ANALYZE` ACTUALLY EXECUTES the query, running a slow 10-minute query will consume production CPU and I/O for 10 minutes!",
    explanation: "Operational risk of executing expensive queries via EXPLAIN ANALYZE.",
    hint: "It will actually run the slow query on production, consuming heavy CPU/IO.",
    level: "expert"
  },
  {
    question: "How does `EXPLAIN ANALYZE` handle queries returning 0 rows?",
    shortAnswer: "It records `rows=0` and reports the elapsed time spent searching before determining that no rows matched.",
    explanation: "Zero-row matching execution trace.",
    hint: "Reports actual time spent searching and confirms rows=0.",
    level: "basic"
  },
  {
    question: "What is the difference in startup time between an Index Lookup and a Table Scan?",
    shortAnswer: "Index lookups typically have ultra-low startup times (`~0.01ms`), while complex subqueries or sorts have high startup times because all rows must be buffered before the first row is output.",
    explanation: "Startup time vs streaming time.",
    hint: "Index lookups start immediately; sorts/temp tables have high startup times.",
    level: "expert"
  },
  {
    question: "What does `-> Limit: 10 row(s)` signify in `EXPLAIN ANALYZE`?",
    shortAnswer: "A limit iterator that terminates child iterator execution as soon as 10 rows have been streamed upwards, short-circuiting unnecessary work.",
    explanation: "Limit iterator short-circuiting.",
    hint: "Halts child execution immediately once the requested row limit is reached.",
    level: "basic"
  },
  {
    question: "What does `-> Index range scan on s using idx_dob` indicate in `EXPLAIN ANALYZE`?",
    shortAnswer: "Traversing a range of leaf pages in the `idx_dob` B+Tree index between two boundary key values.",
    explanation: "Index range scan iterator execution.",
    hint: "Scanning a range of B+Tree index pages between key bounds.",
    level: "basic"
  },
  {
    question: "Can `EXPLAIN ANALYZE` reveal whether an index was ignored due to function wrapping?",
    shortAnswer: "YES; if a query wraps a column in a function (e.g. `WHERE YEAR(dob) = 2005`), `EXPLAIN ANALYZE` will show a `Table scan` with high actual execution time instead of an `Index lookup`.",
    explanation: "Detecting un-sargable predicates via EXPLAIN ANALYZE.",
    hint: "Shows a full table scan instead of an index lookup.",
    level: "basic"
  },
  {
    question: "How does `EXPLAIN ANALYZE` report `UNION` operations?",
    shortAnswer: "It displays each `UNION` branch as an independent child branch beneath a `-> Append` or `-> Table scan on <union_result>` iterator.",
    explanation: "Union iterator execution profiling.",
    hint: "Displays separate child branches beneath an Append iterator.",
    level: "moderate"
  },
  {
    question: "What does `actual time=0.001..0.001 rows=0 loops=0` mean?",
    shortAnswer: "The iterator node was **never executed** because a parent short-circuit condition (like `LIMIT` or false constant predicate) halted execution earlier.",
    explanation: "Zero-loop short-circuit nodes.",
    hint: "The iterator was never executed due to early short-circuiting.",
    level: "expert"
  },
  {
    question: "How do you capture `EXPLAIN ANALYZE` outputs programmatically in a Python/Java application?",
    shortAnswer: "Execute the `EXPLAIN ANALYZE SELECT ...` query string and fetch the first column of the single returned result row as a text string.",
    explanation: "Programmatic consumption of EXPLAIN ANALYZE.",
    hint: "Fetch the result string from the single returned row/column.",
    level: "basic"
  },
  {
    question: "What should you check first when optimizing a slow query profile in `EXPLAIN ANALYZE`?",
    shortAnswer: "Identify the iterator node with the largest jump in `actual time` and nodes where `loops` is large ($>1,000$) or where actual `rows` drastically exceeds estimated `rows`.",
    explanation: "Triage strategy for EXPLAIN ANALYZE profiles.",
    hint: "Look for largest time jumps, high loop counts, and big estimate vs actual gaps.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for EXPLAIN ANALYZE?",
    shortAnswer: "Use **`EXPLAIN ANALYZE`** on staging or replica databases to pinpoint exact execution bottlenecks; multiply `rows * loops` and `actual time * loops` to uncover hidden multiplier loops in nested joins; compare estimated rows against actual rows to detect **statistical estimation drift**; and never run untrusted, un-indexed slow queries with `EXPLAIN ANALYZE` directly on production primary servers.",
    explanation: "Authoritative architectural best practices for EXPLAIN ANALYZE.",
    hint: "Run on replicas + calculate actual time * loops + spot estimate vs actual drift + avoid slow queries on prod.",
    level: "expert"
  }
];

export default questions;
