// topic4_files/topic4_questions.js

const questions = [
  {
    question: "What does the `type` column in MySQL `EXPLAIN` represent?",
    shortAnswer: "The access method or join type used by MySQL to retrieve rows from the table, serving as the single most important indicator of query performance.",
    explanation: "Core definition of the type column.",
    hint: "The access method / join strategy used to read rows from the table.",
    level: "basic"
  },
  {
    question: "What is the ranking order of MySQL access types from fastest to slowest?",
    shortAnswer: "`system` > `const` > `eq_ref` > `ref` > `fulltext` > `ref_or_null` > `index_merge` > `unique_subquery` > `index_subquery` > `range` > `index` > `ALL`.",
    explanation: "Standard performance hierarchy of access types.",
    hint: "const > eq_ref > ref > range > index > ALL.",
    level: "basic"
  },
  {
    question: "What is a `const` access type in MySQL?",
    shortAnswer: "The table has at most ONE matching row, read once at the beginning of optimization and treated as a constant throughout execution (e.g. `WHERE primary_key = 101`).",
    explanation: "const access type definition.",
    hint: "Exact match on Primary Key or Unique NOT NULL column against a constant literal.",
    level: "basic"
  },
  {
    question: "What is an `eq_ref` access type and why is it considered the gold standard for joins?",
    shortAnswer: "For each row read from the preceding table, exactly **one row** is fetched from the current table using a Primary Key or Unique `NOT NULL` index.",
    explanation: "eq_ref join type definition and efficiency.",
    hint: "1-to-1 index lookup per outer row in a join using a Primary Key or Unique index.",
    level: "basic"
  },
  {
    question: "What is a `ref` access type in MySQL?",
    shortAnswer: "An index lookup that returns **multiple matching rows** using a non-unique index or a leftmost prefix of a composite index (e.g. `WHERE city = 'Barrackpore'`).",
    explanation: "ref access type definition.",
    hint: "Non-unique index lookup returning multiple matching rows.",
    level: "basic"
  },
  {
    question: "How do student queries for Mamata and Susmita illustrate `const` vs `ref` vs `eq_ref`?",
    shortAnswer: "`WHERE student_id = 101` is `const`; `JOIN departments d ON s.department_id = d.department_id` is `eq_ref`; `WHERE city = 'Barrackpore'` on a non-unique index is `ref`.",
    explanation: "Real-world comparison of const, eq_ref, and ref.",
    hint: "PK lookup = const; PK Join = eq_ref; Non-unique index lookup = ref.",
    level: "basic"
  },
  {
    question: "What is a `range` access type in MySQL?",
    shortAnswer: "An index scan that retrieves rows within a specific interval using comparison operators: `=`, `<>`, `>`, `>=`, `<`, `<=`, `IS NULL`, `BETWEEN`, `LIKE 'prefix%'`, or `IN()`.",
    explanation: "range access type definition.",
    hint: "Scans a bounded range of B+Tree index pages using range operators.",
    level: "basic"
  },
  {
    question: "What is an `index` access type (Full Index Scan) in MySQL?",
    shortAnswer: "A full scan of the entire B+Tree index leaf page chain from start to finish ($O(N)$), usually employed when the query is a Covering Index or uses an index-ordered `ORDER BY`.",
    explanation: "index access type definition.",
    hint: "Full scan of the entire B+Tree index leaf nodes.",
    level: "expert"
  },
  {
    question: "Why is `type = 'index'` generally faster than `type = 'ALL'`, even though both scan $O(N)$ entries?",
    shortAnswer: "Because index B+Tree pages are much smaller and more compact than full table data pages and are almost always cached in the in-memory Buffer Pool.",
    explanation: "index scan vs table scan I/O differences.",
    hint: "Index pages are much smaller and more likely cached in the Buffer Pool.",
    level: "expert"
  },
  {
    question: "What is `type = 'ALL'` in MySQL and why should it be avoided in OLTP queries?",
    shortAnswer: "A **Full Table Scan**: MySQL reads every single 16KB data page in the table from disk/buffer pool, causing heavy I/O, cache pollution, and high query latency.",
    explanation: "ALL full table scan definition.",
    hint: "Full table scan reading all data pages sequentially.",
    level: "basic"
  },
  {
    question: "What is an `index_merge` access type in MySQL?",
    shortAnswer: "The optimizer uses two or more separate single-column indexes simultaneously and merges their row results using union, intersection, or sort-union algorithms.",
    explanation: "index_merge access type definition.",
    hint: "Merges results from multiple independent indexes.",
    level: "expert"
  },
  {
    question: "Why is `index_merge` often a sign that a composite index should be created instead?",
    shortAnswer: "Because merging multiple single-column indexes incurs CPU and memory merging overhead; a single multi-column **Composite Index** satisfies the query directly in a single `range` or `ref` scan.",
    explanation: "Composite index superiority over index_merge.",
    hint: "A single composite index is faster than merging separate indexes.",
    level: "expert"
  },
  {
    question: "What is a `ref_or_null` access type in MySQL?",
    shortAnswer: "Similar to `ref`, but MySQL performs an extra search for rows where the indexed column is `NULL` (e.g. `WHERE student_id = ? OR student_id IS NULL`).",
    explanation: "ref_or_null access type definition.",
    hint: "ref lookup that also searches for NULL index entries.",
    level: "basic"
  },
  {
    question: "What is `unique_subquery` access type in MySQL?",
    shortAnswer: "An optimization that replaces `eq_ref` for subqueries using `IN (SELECT primary_key FROM table WHERE ...)` on unique keys.",
    explanation: "unique_subquery definition.",
    hint: "Replaces eq_ref in IN subqueries on unique primary keys.",
    level: "expert"
  },
  {
    question: "What is `index_subquery` access type in MySQL?",
    shortAnswer: "Similar to `unique_subquery`, but used when the subquery column is a non-unique index.",
    explanation: "index_subquery definition.",
    hint: "Replaces ref in IN subqueries on non-unique index columns.",
    level: "expert"
  },
  {
    question: "What is `fulltext` access type in MySQL?",
    shortAnswer: "An index lookup performed on a `FULLTEXT` index using the `MATCH(...) AGAINST(...)` syntax.",
    explanation: "fulltext access type definition.",
    hint: "Full-text index search using MATCH ... AGAINST.",
    level: "basic"
  },
  {
    question: "What causes a query with an existing index to degrade to `type = ALL`?",
    shortAnswer: "1. Low index selectivity (matching >25% of table), 2. Wrapping indexed column in functions (un-sargable), 3. Implicit data type conversion, or 4. Stale statistics.",
    explanation: "Causes of table scan degradation.",
    hint: "Low selectivity, function wrapping, type mismatches, or stale statistics.",
    level: "expert"
  },
  {
    question: "Can an `IN()` predicate use a `range` access type?",
    shortAnswer: "YES; `WHERE student_id IN (101, 102, 103)` executes as an index `range` scan in MySQL (also known as index dive or in-list range scan).",
    explanation: "IN list range scan.",
    hint: "Yes, IN() lists use range index scans.",
    level: "basic"
  },
  {
    question: "Can `LIKE 'abc%'` use a `range` access type?",
    shortAnswer: "YES; a wildcard suffix `LIKE 'abc%'` uses an index `range` scan; but a wildcard prefix `LIKE '%abc'` cannot use the index and forces `type = ALL`.",
    explanation: "LIKE wildcard prefix vs suffix sargability.",
    hint: "Prefix string (abc%) uses range; leading wildcard (%abc) forces ALL.",
    level: "basic"
  },
  {
    question: "What does `type = const` output for `rows` in `EXPLAIN`?",
    shortAnswer: "Always `rows = 1` (because at most one matching record can exist).",
    explanation: "const row count guarantee.",
    hint: "Always rows = 1.",
    level: "basic"
  },
  {
    question: "What is the difference between `eq_ref` and `ref` in a join?",
    shortAnswer: "`eq_ref` uses a unique primary key guaranteeing at most 1 match per parent row; `ref` uses a non-unique index that can return multiple matching rows per parent row.",
    explanation: "eq_ref vs ref join cardinality difference.",
    hint: "eq_ref = at most 1 row per parent; ref = multiple rows per parent.",
    level: "basic"
  },
  {
    question: "How does `NULL` values in a unique index column affect `eq_ref`?",
    shortAnswer: "If a unique index allows `NULL` values, MySQL cannot guarantee uniqueness for `NULL` entries and may degrade to `ref` when matching nullable keys.",
    explanation: "Nullable unique index degradation to ref.",
    hint: "Nullable unique columns may degrade to ref because NULLs are not unique.",
    level: "expert"
  },
  {
    question: "What access type is achieved when querying a table with `LIMIT 1` without a `WHERE` clause?",
    shortAnswer: "`type = ALL` (or `type = index`), but execution short-circuits after reading the first matching row.",
    explanation: "ALL with LIMIT 1 behavior.",
    hint: "Scans as ALL or index but short-circuits after 1 row.",
    level: "basic"
  },
  {
    question: "What is an 'Index Skip Scan' in MySQL 8.0?",
    shortAnswer: "A feature that allows `range` scans on non-prefix columns of a composite index (e.g. querying Col B on index `(A, B)`) by skipping across distinct prefix values.",
    explanation: "Index skip scan feature in MySQL 8.0.",
    hint: "Allows range access on non-leading composite index columns.",
    level: "expert"
  },
  {
    question: "What access type does an Index Skip Scan display in `EXPLAIN`?",
    shortAnswer: "`type = range` with `Extra: Using index for skip scan`.",
    explanation: "Index skip scan representation in EXPLAIN.",
    hint: "type = range with Extra: Using index for skip scan.",
    level: "expert"
  },
  {
    question: "Can an `ORDER BY` clause force `type = index`?",
    shortAnswer: "YES; if a query has no `WHERE` clause but has `ORDER BY indexed_col LIMIT 10`, MySQL will use `type = index` to read rows directly in sorted order without filesort.",
    explanation: "Index-ordered scan for ORDER BY.",
    hint: "Yes, reads the index in sorted order to avoid a filesort.",
    level: "basic"
  },
  {
    question: "Why should `type = ALL` be strictly flagged in production code reviews for tables with over 100,000 rows?",
    shortAnswer: "Because full table scans on large tables cause massive disk I/O, flush useful pages out of the InnoDB Buffer Pool (cache churn), and lock table records during transaction scans.",
    explanation: "Architectural risk of full table scans on large tables.",
    hint: "Causes massive disk I/O, cache churn, and transaction lock degradation.",
    level: "expert"
  },
  {
    question: "What access type is expected for a primary key range search (`WHERE id BETWEEN 10 AND 100`)?",
    shortAnswer: "`type = range`.",
    explanation: "Primary key range search access type.",
    hint: "type = range.",
    level: "basic"
  },
  {
    question: "What access type is achieved when joining two tables on un-indexed columns in MySQL 8.0?",
    shortAnswer: "`type = ALL` on the outer table and `type = ALL` on the inner table (executed via an in-memory **Hash Join** in MySQL 8.0).",
    explanation: "Un-indexed join access type and Hash Join execution.",
    hint: "type = ALL executed via an in-memory Hash Join.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Access Types (`type`)?",
    shortAnswer: "Design indexes so that single-row lookups achieve **`const`**, joins achieve **`eq_ref`**, filtered searches achieve **`ref`** or **`range`**, and covering scans achieve **`index`**; strictly eliminate **`type = ALL`** on high-frequency tables; and replace **`index_merge`** with dedicated composite indexes for maximum throughput.",
    explanation: "Authoritative architectural best practices for access types.",
    hint: "Target const, eq_ref, ref, range; eliminate ALL; replace index_merge with composite indexes.",
    level: "expert"
  }
];

export default questions;
