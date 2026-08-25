// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What are Optimizer Hints in MySQL database administration?",
    shortAnswer: "Optimizer Hints are explicit directives embedded in SQL statements that instruct the MySQL Cost-Based Optimizer (CBO) to use specific indexes, join orders, algorithms, or session memory settings.",
    explanation: "They allow senior engineers to override suboptimal query plans generated when index statistics are inaccurate or when specific hardware/workload patterns require tuning.",
    hint: "Directives to override or guide the Cost-Based Optimizer's execution plan choices.",
    level: "basic"
  },
  {
    question: "What is the difference between `USE INDEX` and `FORCE INDEX`?",
    shortAnswer: "`USE INDEX` tells the optimizer to consider only the specified index (the optimizer may still choose a Table Scan if its estimated cost is lower); `FORCE INDEX` sets the table scan cost so high that MySQL is compelled to use the index unless impossible.",
    explanation: "`USE INDEX` is a suggestion; `FORCE INDEX` is a strict mandate.",
    hint: "USE INDEX is a suggestion; FORCE INDEX strictly compels index usage over table scans.",
    level: "basic",
    codeExample: "SELECT * FROM students FORCE INDEX (idx_city) WHERE city = 'Barrackpore';"
  },
  {
    question: "What does `IGNORE INDEX` do?",
    shortAnswer: "It explicitly excludes one or more named indexes from optimizer consideration for that query.",
    explanation: "Useful when a suboptimal secondary index is mistakenly selected over a better index or table scan.",
    hint: "Prevents the optimizer from considering the specified index.",
    level: "basic",
    codeExample: "SELECT * FROM students IGNORE INDEX (idx_old_status) WHERE status = 'Active';"
  },
  {
    question: "What are the scope qualifiers for legacy index hints (`FOR JOIN`, `FOR ORDER BY`, `FOR GROUP BY`)?",
    shortAnswer: "They restrict the hint's application: `FOR JOIN` controls row filtering access; `FOR ORDER BY` controls sorting; `FOR GROUP BY` controls aggregation.",
    explanation: "Allows an index to be forced solely for sorting while allowing the optimizer freedom in filtering.",
    hint: "Applies the index hint specifically to filtering (JOIN), sorting, or grouping.",
    level: "expert",
    codeExample: "SELECT * FROM students FORCE INDEX FOR ORDER BY (idx_gpa) ORDER BY gpa DESC;"
  },
  {
    question: "What is the modern MySQL 8.0+ comment hint syntax?",
    shortAnswer: "Hints are placed inside special SQL comments immediately following the statement verb: `SELECT /*+ HINT_NAME(args) */ ...`.",
    explanation: "Comment hints are cleaner, query-block scoped, and ignored harmlessly by database systems that do not support them.",
    hint: "Embedded inside /*+ ... */ comments immediately following SELECT/INSERT/UPDATE.",
    level: "basic",
    codeExample: "SELECT /*+ INDEX(students idx_city) */ name FROM students WHERE city = 'Kolkata';"
  },
  {
    question: "What does the `/*+ JOIN_ORDER(table1, table2, table3) */` hint do?",
    shortAnswer: "It enforces an exact sequence for joining tables in a multi-table query, overriding the optimizer's default table permutations.",
    explanation: "Crucial for preventing the optimizer from picking a large driving table when a smaller filtered table should lead the join loop.",
    hint: "Enforces the exact table join order from left to right.",
    level: "expert",
    codeExample: "SELECT /*+ JOIN_ORDER(departments, students, enrollments) */ * FROM students JOIN departments ...;"
  },
  {
    question: "What is the difference between `STRAIGHT_JOIN` and `/*+ JOIN_ORDER() */`?",
    shortAnswer: "`STRAIGHT_JOIN` is a legacy keyword that forces MySQL to join tables in the exact textual order written in the `FROM` clause; `/*+ JOIN_ORDER() */` is modern, fine-grained, and allows specifying order explicitly regardless of `FROM` clause layout.",
    explanation: "`JOIN_ORDER()` is more flexible and can target specific query blocks or subqueries.",
    hint: "STRAIGHT_JOIN uses FROM clause order; JOIN_ORDER() specifies order explicitly in hint.",
    level: "expert"
  },
  {
    question: "What is Batch Key Access (BKA) and the `/*+ BATCH_KEY_ACCESS(tbl) */` hint?",
    shortAnswer: "BKA buffers outer join keys in `join_buffer_size`, sorts them in index order, and probes the inner table's index in sequential batches using Multi-Range Read (MRR), eliminating random I/O.",
    explanation: "BKA dramatically accelerates Nested Loop Joins when the joined table requires secondary index lookups.",
    hint: "Batches and sorts join keys to convert random index seeks into sequential I/O.",
    level: "expert",
    codeExample: "SELECT /*+ BATCH_KEY_ACCESS(enrollments) */ * FROM students s JOIN enrollments e ON s.id = e.student_id;"
  },
  {
    question: "What is the `/*+ SET_VAR() */` hint in MySQL 8.0?",
    shortAnswer: "It dynamically overrides a system session variable (e.g. `sort_buffer_size`, `optimizer_switch`, `tmp_table_size`) for the duration of that single query without altering global or session configs.",
    explanation: "Allows increasing memory buffers specifically for one heavy analytical query without risking server OOM on concurrent connections.",
    hint: "Temporarily modifies a session configuration variable for a single statement.",
    level: "expert",
    codeExample: "SELECT /*+ SET_VAR(sort_buffer_size = 16M) */ * FROM heavy_ledger ORDER BY transaction_date;"
  },
  {
    question: "What is the `/*+ MAX_EXECUTION_TIME(N) */` hint?",
    shortAnswer: "It instructs MySQL to automatically abort/kill the query if its execution duration exceeds $N$ milliseconds.",
    explanation: "Acts as a critical production circuit-breaker on user-facing search and reporting endpoints to prevent runaway queries.",
    hint: "Sets a hard timeout in milliseconds for the query.",
    level: "basic",
    codeExample: "SELECT /*+ MAX_EXECUTION_TIME(3000) */ * FROM large_log WHERE message LIKE '%error%';"
  },
  {
    question: "What does `/*+ NO_INDEX(tbl idx) */` accomplish?",
    shortAnswer: "It prevents the optimizer from using the specified index on table `tbl`, equivalent to modern `IGNORE INDEX`.",
    explanation: "Useful for testing if a query performs better without a specific problematic index.",
    hint: "Suppresses index usage on a table using comment hint syntax.",
    level: "basic"
  },
  {
    question: "What is `/*+ INDEX_MERGE(tbl idx1, idx2) */`?",
    shortAnswer: "It forces the optimizer to combine results from multiple single-column indexes on the same table using an index merge union or intersection algorithm.",
    explanation: "Compels MySQL to merge independent B+Trees when evaluating disjoint `OR` or multi-column `AND` filters.",
    hint: "Forces the optimizer to merge multiple indexes together.",
    level: "expert"
  },
  {
    question: "Why is hardcoding optimizer hints in production application code considered a technical debt risk?",
    shortAnswer: "Because as data volume, cardinality, and distributions evolve over time, forced hints can lock the database into obsolete, highly inefficient execution plans that are 100x worse than what the optimizer would choose.",
    explanation: "Hints bypass optimizer cost adaptability. They should be used sparingly and reviewed regularly.",
    hint: "Hardcoded hints become obsolete as data grows, causing future performance degradation.",
    level: "basic"
  },
  {
    question: "What should you do BEFORE resorting to `FORCE INDEX` on a slow query?",
    shortAnswer: "Run `ANALYZE TABLE table_name` to refresh outdated index cardinality statistics in the `information_schema` and verify if the optimizer picks the right plan on its own.",
    explanation: "The optimizer frequently makes poor choices simply because statistics have not been updated since heavy bulk DML operations.",
    hint: "Run ANALYZE TABLE to update stale index statistics first.",
    level: "basic",
    codeExample: "ANALYZE TABLE student_records;"
  },
  {
    question: "What does `/*+ SEMIJOIN(FIRSTMATCH) */` or `/*+ NO_SEMIJOIN(MATERIALIZATION) */` do?",
    shortAnswer: "It directs or restricts the specific semi-join strategy used by the optimizer when transforming `WHERE id IN (subquery)` clauses.",
    explanation: "Controls whether the optimizer uses FirstMatch, Materialization, LooseScan, or Duplicate Weedout.",
    hint: "Controls the internal strategy for IN subquery semi-joins.",
    level: "expert"
  },
  {
    question: "What is the `/*+ MERGE(cte) */` and `/*+ NO_MERGE(cte) */` hint for Common Table Expressions?",
    shortAnswer: "`MERGE` forces MySQL to inline the CTE into the outer query block; `NO_MERGE` forces the CTE to materialize into an internal temporary table first.",
    explanation: "Useful when inlining causes duplicate subquery execution, or when materialization prevents index pushdown.",
    hint: "Controls whether a CTE is inlined (merged) or materialized as a temporary table.",
    level: "expert",
    codeExample: "WITH DeptSummary AS (SELECT department_id, COUNT(*) FROM students GROUP BY 1)\nSELECT /*+ NO_MERGE(DeptSummary) */ * FROM DeptSummary;"
  },
  {
    question: "How does `/*+ SUBQUERY(MATERIALIZATION) */` differ from semi-join materialization?",
    shortAnswer: "It applies to non-semijoin subqueries (such as scalar subqueries or subqueries in `SELECT` lists), forcing them to materialize their result set.",
    explanation: "Caches the subquery result rather than executing it row-by-row.",
    hint: "Materializes non-semijoin subqueries to prevent repeated execution.",
    level: "expert"
  },
  {
    question: "What happens if you provide a syntactically invalid or misspelled optimizer hint (e.g. `/*+ INDX(t) */`)?",
    shortAnswer: "MySQL ignores the invalid hint silently without raising a runtime error, logs a warning (`SHOW WARNINGS`), and falls back to the default optimizer plan.",
    explanation: "Ensures queries do not crash due to unrecognized hint comments across different MySQL versions.",
    hint: "MySQL ignores invalid hints silently, generates a warning, and executes default plan.",
    level: "moderate"
  },
  {
    question: "How can you check if your optimizer hint was accepted by MySQL?",
    shortAnswer: "Run `EXPLAIN` or check `SHOW WARNINGS` immediately after running the query. In `EXPLAIN FORMAT=TREE` or `JSON`, the hint will be reflected in the chosen access path.",
    explanation: "If a hint is ignored or invalid, `SHOW WARNINGS` displays an explanatory message.",
    hint: "Inspect EXPLAIN output and run SHOW WARNINGS to confirm hint adoption.",
    level: "basic",
    codeExample: "EXPLAIN SELECT /*+ INDEX(students idx_city) */ * FROM students WHERE city = 'Barrackpore';\nSHOW WARNINGS;"
  },
  {
    question: "What is `/*+ JOIN_PREFIX(tbl1, tbl2) */` and `/*+ JOIN_SUFFIX(tbl3) */`?",
    shortAnswer: "`JOIN_PREFIX` forces the specified tables to be at the beginning of the join order; `JOIN_SUFFIX` forces the specified tables to be at the end of the join order, leaving intermediate tables flexible.",
    explanation: "Allows partial join ordering constraints without micromanaging all tables in a 10-table join.",
    hint: "Pins specific tables to the start or end of the join order.",
    level: "expert"
  },
  {
    question: "What is the `/*+ RESOURCE_GROUP(group_name) */` hint in MySQL 8.0?",
    shortAnswer: "It binds the thread executing the query to a specific CPU resource group (assigning specific virtual CPU cores and thread priority).",
    explanation: "Allows isolating heavy batch queries to lower-priority CPU cores to protect low-latency OLTP threads.",
    hint: "Assigns the query execution thread to a dedicated CPU resource group.",
    level: "expert"
  },
  {
    question: "Why does `/*+ NO_BNL(tbl) */` exist in MySQL 8.0?",
    shortAnswer: "To prevent Block Nested Loop (BNL) or Hash Join algorithms on table `tbl`, compelling the optimizer to use an index-based Nested Loop Join instead.",
    explanation: "Useful when the optimizer underestimates index seek performance and chooses a memory-heavy hash join.",
    hint: "Disables Block Nested Loop / Hash Join on the specified table.",
    level: "expert"
  },
  {
    question: "Can optimizer hints be applied to `UPDATE` and `DELETE` statements?",
    shortAnswer: "Yes! Modern comment hints (`/*+ INDEX(...) */`, `/*+ MAX_EXECUTION_TIME(...) */`) work on `UPDATE` and `DELETE` queries to control access paths and safety timeouts.",
    explanation: "Crucial for ensuring large batch updates use Primary Keys or indexed scans rather than accidental table locks.",
    hint: "Hints can be applied to UPDATE and DELETE statements.",
    level: "basic",
    codeExample: "UPDATE /*+ INDEX(students idx_status) */ students SET active = 0 WHERE status = 'Archived';"
  },
  {
    question: "What does `/*+ GROUP_INDEX(tbl idx) */` and `/*+ ORDER_INDEX(tbl idx) */` do?",
    shortAnswer: "They instruct the optimizer to use index `idx` specifically to satisfy `GROUP BY` or `ORDER BY` operations without generating temporary tables or filesorts.",
    explanation: "Modern equivalents of `USE INDEX FOR GROUP BY` and `USE INDEX FOR ORDER BY`.",
    hint: "Directs index usage specifically for grouping or sorting operations.",
    level: "expert"
  },
  {
    question: "How does `/*+ DERIVED_CONDITION_PUSHDOWN() */` and `/*+ NO_DERIVED_CONDITION_PUSHDOWN() */` work?",
    shortAnswer: "It controls whether the optimizer pushes outer `WHERE` conditions down into derived tables (`FROM (SELECT ...)`), filtering rows before materialization.",
    explanation: "Condition pushdown reduces memory allocation and processing time for complex derived queries.",
    hint: "Controls pushing outer WHERE filters down into derived subqueries.",
    level: "expert"
  },
  {
    question: "What is the interaction between `optimizer_switch` system variables and Optimizer Hints?",
    shortAnswer: "Optimizer Hints have higher precedence than global/session `optimizer_switch` flags, overriding server defaults for that specific query.",
    explanation: "Hints provide surgical per-query overrides without changing database-wide server settings.",
    hint: "Optimizer hints override optimizer_switch server configuration flags.",
    level: "expert"
  },
  {
    question: "When should an enterprise team deprecate and remove an optimizer hint?",
    shortAnswer: "When underlying table schemas are altered, when MySQL is upgraded to a newer major version with improved cost modeling, or when query profiling shows the hint causes regressions.",
    explanation: "Regular query performance reviews should test removing hints against updated optimizer engines.",
    hint: "Remove hints during major version upgrades or schema refactoring.",
    level: "basic"
  },
  {
    question: "How does `/*+ MRR(tbl) */` boost secondary index range scans?",
    shortAnswer: "It forces the use of Multi-Range Read optimization, sorting Primary Keys retrieved from secondary indexes to read clustered data pages sequentially.",
    explanation: "Reduces random disk I/O when fetching full row payloads from non-covering range scans.",
    hint: "Enforces Multi-Range Read to sort row pointers for sequential page access.",
    level: "expert"
  },
  {
    question: "Can multiple hints be combined inside a single comment block?",
    shortAnswer: "Yes! Multiple hints can be separated by spaces inside a single `/*+ ... */` comment block: `/*+ INDEX(t1 idx_a) JOIN_ORDER(t1, t2) SET_VAR(sort_buffer_size=8M) */`.",
    explanation: "Provides clean, consolidated query plan management in one place.",
    hint: "Combine multiple hints separated by spaces in one comment block.",
    level: "basic"
  },
  {
    question: "What is the primary recommendation for junior developers regarding optimizer hints?",
    shortAnswer: "Treat optimizer hints as diagnostic tools and emergency production surgical interventions, not default coding standards. Always attempt query refactoring and statistics refresh (`ANALYZE TABLE`) first.",
    explanation: "Clean SQL and proper index design should satisfy 99% of queries without manual hint overrides.",
    hint: "Use hints as emergency interventions; rely on clean SQL and index design first.",
    level: "basic"
  }
];

export default questions;
