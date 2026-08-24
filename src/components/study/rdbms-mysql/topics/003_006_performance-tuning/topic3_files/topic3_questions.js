// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What are the 12 columns returned by traditional tabular `EXPLAIN`?",
    shortAnswer: "`id`, `select_type`, `table`, `partitions`, `type`, `possible_keys`, `key`, `key_len`, `ref`, `rows`, `filtered`, and `Extra`.",
    explanation: "Complete list of the 12 tabular EXPLAIN columns.",
    hint: "id, select_type, table, partitions, type, possible_keys, key, key_len, ref, rows, filtered, Extra.",
    level: "basic"
  },
  {
    question: "What does the `id` column represent in `EXPLAIN`?",
    shortAnswer: "The sequential execution identifier for the query block. Higher IDs or deeper subquery blocks execute first; rows with the same ID belong to the same join sequence and execute top-to-bottom.",
    explanation: "Query block identifier and join ordering.",
    hint: "Sequential identifier showing execution priority and join order.",
    level: "basic"
  },
  {
    question: "What is the difference between `select_type = 'SIMPLE'` and `select_type = 'PRIMARY'`?",
    shortAnswer: "`SIMPLE` means the query has no subqueries or `UNION`s; `PRIMARY` means the query block is the outermost parent query of a query containing subqueries or unions.",
    explanation: "SIMPLE vs PRIMARY select_type.",
    hint: "SIMPLE = no subqueries/unions; PRIMARY = outermost query in complex queries.",
    level: "basic"
  },
  {
    question: "What does `select_type = 'DEPENDENT SUBQUERY'` signify and why is it dangerous for performance?",
    shortAnswer: "It is a correlated subquery that depends on outer query values, executing repeatedly for **every single row** processed by the outer query ($O(N)$ execution), causing severe performance bottlenecks.",
    explanation: "Performance danger of DEPENDENT SUBQUERY.",
    hint: "Correlated subquery executing repeatedly for every outer row.",
    level: "expert"
  },
  {
    question: "What does `select_type = 'DERIVED'` signify?",
    shortAnswer: "A subquery in the `FROM` clause that is materialized into a temporary derived table.",
    explanation: "DERIVED select_type definition.",
    hint: "Subquery in the FROM clause materialized into a temporary table.",
    level: "basic"
  },
  {
    question: "What does `key = NULL` signify in `EXPLAIN`?",
    shortAnswer: "MySQL did not use any index to satisfy the query and is executing a **Full Table Scan** (`type = ALL`).",
    explanation: "key = NULL meaning.",
    hint: "No index was used; executing a full table scan.",
    level: "basic"
  },
  {
    question: "What is `key_len` in `EXPLAIN` and why is it critical for composite index analysis?",
    shortAnswer: "`key_len` indicates the length of the chosen index key in bytes; comparing `key_len` against column byte sizes reveals whether MySQL is using the **entire composite index** or only a **leftmost prefix**.",
    explanation: "key_len role in composite index verification.",
    hint: "Byte length of chosen key indicating full or partial composite index usage.",
    level: "expert"
  },
  {
    question: "How many bytes does an `INT NOT NULL` column consume in `key_len`?",
    shortAnswer: "**4 bytes**.",
    explanation: "INT NOT NULL byte calculation.",
    hint: "4 bytes.",
    level: "basic"
  },
  {
    question: "How many bytes does an `INT NULL` (nullable) column consume in `key_len`?",
    shortAnswer: "**5 bytes** (4 bytes for integer + 1 byte for NULL flag).",
    explanation: "Nullable column overhead in key_len.",
    hint: "5 bytes (4 + 1 null flag byte).",
    level: "basic"
  },
  {
    question: "How many bytes does a `VARCHAR(30) NOT NULL` column in `utf8mb4` consume in `key_len`?",
    shortAnswer: "**122 bytes** ($30 \\times 4\\text{ bytes/char} + 2\\text{ length bytes} = 120 + 2 = 122$).",
    explanation: "VARCHAR utf8mb4 key_len calculation.",
    hint: "30 * 4 + 2 length bytes = 122 bytes.",
    level: "expert"
  },
  {
    question: "How many bytes does a `VARCHAR(30) NULL` column in `utf8mb4` consume in `key_len`?",
    shortAnswer: "**123 bytes** ($30 \\times 4 + 2\\text{ length bytes} + 1\\text{ null byte} = 123$).",
    explanation: "Nullable VARCHAR utf8mb4 key_len calculation.",
    hint: "30 * 4 + 2 + 1 null byte = 123 bytes.",
    level: "expert"
  },
  {
    question: "Suppose a composite index is `idx_comp (id INT NOT NULL, city VARCHAR(30) NOT NULL)` in `utf8mb4`. What does `key_len = 4` mean vs `key_len = 126`?",
    shortAnswer: "`key_len = 4` means MySQL only used the first column (`id`); `key_len = 126` ($4 + 122$) means MySQL used **both columns** (`id` + `city`) of the composite index!",
    explanation: "Composite index partial vs full utilization analysis.",
    hint: "key_len=4 uses id only; key_len=126 uses both id and city.",
    level: "expert"
  },
  {
    question: "What does the `filtered` column represent in `EXPLAIN`?",
    shortAnswer: "The estimated percentage (0.00% to 100.00%) of examined table rows that will satisfy remaining non-index `WHERE` condition filters.",
    explanation: "filtered column definition.",
    hint: "Estimated percentage of rows passing remaining table filters.",
    level: "basic"
  },
  {
    question: "How do you calculate the effective intermediate rows produced for the next join step using `rows` and `filtered`?",
    shortAnswer: "$\\text{Effective Rows} = \\text{rows} \\times \\left(\\frac{\\text{filtered}}{100}\\right)$. (e.g. $1,000\\text{ rows} \\times 10\\% = 100\\text{ rows}$).",
    explanation: "Calculating intermediate join row volume.",
    hint: "Multiply rows by (filtered / 100).",
    level: "expert"
  },
  {
    question: "What does `ref = const` signify in `EXPLAIN`?",
    shortAnswer: "The index is being compared against a constant literal value (e.g. `WHERE student_id = 101`).",
    explanation: "ref = const meaning.",
    hint: "Compared against a constant literal value.",
    level: "basic"
  },
  {
    question: "What does `ref = db.s.student_id` signify in `EXPLAIN`?",
    shortAnswer: "The index lookup on the current table is using the `student_id` column from the joined `students` (`s`) table.",
    explanation: "ref column join binding.",
    hint: "Index lookup is dynamically bound to a column from a joined table.",
    level: "basic"
  },
  {
    question: "What does `possible_keys` show vs `key` in `EXPLAIN`?",
    shortAnswer: "`possible_keys` lists all candidate indexes that *could* be used based on query columns; `key` lists the single index the optimizer *actually selected* based on cost.",
    explanation: "possible_keys vs key distinction.",
    hint: "possible_keys = candidates; key = actually chosen index.",
    level: "basic"
  },
  {
    question: "What does it mean if `possible_keys` lists indexes but `key` is `NULL`?",
    shortAnswer: "The optimizer evaluated the candidate indexes but determined that a full table scan (`type = ALL`) would be cheaper (e.g. because matching rows exceed 20-30% of the table).",
    explanation: "Optimizer bypassing candidate indexes.",
    hint: "Candidate indexes were rejected because a full table scan was calculated to be cheaper.",
    level: "expert"
  },
  {
    question: "What does `partitions` show in `EXPLAIN`?",
    shortAnswer: "The specific partition(s) of a partitioned table that will be scanned, confirming whether **Partition Pruning** successfully eliminated unneeded partitions.",
    explanation: "Partition pruning verification.",
    hint: "Shows accessed partitions to verify partition pruning.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using index'` mean?",
    shortAnswer: "The query is a **Covering Index**: all requested columns are satisfied directly from the B+Tree index leaf nodes, eliminating all disk/buffer pool base table lookups!",
    explanation: "Using index (Covering index) definition.",
    hint: "Covering index: all columns are retrieved directly from the index without reading base table rows.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using where'` mean?",
    shortAnswer: "A `WHERE` filter condition is evaluated by the MySQL Server layer after rows are fetched from the storage engine.",
    explanation: "Using where definition.",
    hint: "Server layer applies a WHERE filter to discard non-matching fetched rows.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using filesort'` mean?",
    shortAnswer: "MySQL must perform an extra sorting pass over rows in memory or temporary disk files because the requested `ORDER BY` could not be satisfied by index order.",
    explanation: "Using filesort definition.",
    hint: "Performs an explicit sort pass because index ordering could not be used.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using temporary'` mean?",
    shortAnswer: "MySQL must construct an internal temporary table in memory or on disk to hold intermediate results (common with un-indexed `GROUP BY`, `DISTINCT`, or complex joins).",
    explanation: "Using temporary definition.",
    hint: "Creates an internal temporary table to process grouping, distinct, or joins.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using index condition'` (ICP) mean?",
    shortAnswer: "Index Condition Pushdown: the storage engine evaluates WHERE predicates on indexed columns directly during index traversal, reducing full row reads.",
    explanation: "Index Condition Pushdown extra flag.",
    hint: "Pushes WHERE conditions on index columns down into the storage engine.",
    level: "expert"
  },
  {
    question: "What does `table = '<derived2>'` signify in `EXPLAIN`?",
    shortAnswer: "The query is scanning the materialized temporary result set of the derived subquery with `id = 2`.",
    explanation: "Derived table alias notation.",
    hint: "Materialized result of the subquery with id=2.",
    level: "basic"
  },
  {
    question: "What does `table = '<union1,2>'` signify in `EXPLAIN`?",
    shortAnswer: "The query block is performing a `UNION RESULT` combining and deduplicating rows produced by query blocks `id = 1` and `id = 2`.",
    explanation: "Union result table notation.",
    hint: "Combines and deduplicates rows from query blocks 1 and 2.",
    level: "basic"
  },
  {
    question: "What is the ranking order of `type` from best performance to worst performance?",
    shortAnswer: "`system` > `const` > `eq_ref` > `ref` > `fulltext` > `ref_or_null` > `index_merge` > `unique_subquery` > `index_subquery` > `range` > `index` > `ALL`.",
    explanation: "Hierarchy of join access types.",
    hint: "const > eq_ref > ref > range > index > ALL.",
    level: "expert"
  },
  {
    question: "Why is `key_len` larger for `VARCHAR` columns than `CHAR` columns of the same character length?",
    shortAnswer: "`VARCHAR` requires 2 extra bytes to store the length prefix of the variable-length string.",
    explanation: "VARCHAR length prefix overhead.",
    hint: "VARCHAR adds 2 length prefix bytes.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Select tables optimized away'` mean?",
    shortAnswer: "The query was satisfied entirely during optimization by reading pre-computed metadata or index endpoints (e.g. `SELECT MIN(id), MAX(id) FROM table`).",
    explanation: "Select tables optimized away definition.",
    hint: "Resolved instantly during optimization without scanning any table rows.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for interpreting EXPLAIN columns?",
    shortAnswer: "Examine `type` (aim for `const`, `eq_ref`, `ref`, or `range`; eliminate `ALL`); check `key_len` byte math to ensure **full composite index coverage** rather than partial prefix lookups; inspect `filtered %` to identify downstream join multipliers; and eliminate hazardous `Extra` flags like `Using filesort` and `Using temporary` on high-frequency OLTP queries.",
    explanation: "Authoritative architectural best practices for interpreting EXPLAIN output columns.",
    hint: "Verify type != ALL + check key_len byte math + monitor filtered% + eliminate Using filesort/temporary.",
    level: "expert"
  }
];

export default questions;
