// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What is the purpose of the `Extra` column in MySQL `EXPLAIN`?",
    shortAnswer: "It provides vital qualitative metadata about how MySQL will execute the query, revealing critical internal operations such as covering indexes, filesorts, temporary tables, and index pushdown.",
    explanation: "Core definition of the Extra column.",
    hint: "Provides qualitative execution details like covering indexes, filesorts, and temporary tables.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using index'` mean?",
    shortAnswer: "The query is executed as a **Covering Index**: all requested columns are satisfied directly from the B+Tree index leaf nodes, eliminating all base table reads from disk/buffer pool.",
    explanation: "Using index (Covering Index) definition.",
    hint: "Covering index: all columns are retrieved directly from the index without reading base table rows.",
    level: "basic"
  },
  {
    question: "What is the difference between `type = 'index'` and `Extra = 'Using index'`?",
    shortAnswer: "`type = 'index'` means a **Full Index Scan** of all index leaf nodes ($O(N)$); `Extra = 'Using index'` means **Covering Index** (no base table reads needed, which can apply to `const`, `ref`, `range`, or `index`!).",
    explanation: "type=index vs Extra=Using index distinction.",
    hint: "type=index is a full scan of the index; Extra=Using index means covering index.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using where'` mean?",
    shortAnswer: "The MySQL Server layer is applying a `WHERE` condition filter to discard rows that do not match non-indexed or post-index predicates after fetching from storage.",
    explanation: "Using where definition.",
    hint: "Server layer applies a WHERE filter on fetched rows.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using index condition'` (Index Condition Pushdown - ICP) mean?",
    shortAnswer: "MySQL pushes `WHERE` condition evaluations on indexed columns directly down into the storage engine (InnoDB) handler, filtering rows before reading full table records.",
    explanation: "Index Condition Pushdown (ICP) mechanics.",
    hint: "Pushes WHERE condition checks on index columns down into the storage engine.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using filesort'` mean and does it always write to physical disk?",
    shortAnswer: "It means MySQL must perform an explicit sorting pass because index order could not satisfy `ORDER BY`; it sorts in-memory inside `sort_buffer_size` and only spills to physical disk if data exceeds the buffer size.",
    explanation: "Using filesort mechanics and memory buffering.",
    hint: "Explicit sort pass; runs in memory unless data exceeds sort_buffer_size.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using temporary'` mean?",
    shortAnswer: "MySQL must create an internal temporary table in memory (or disk if large) to hold intermediate working rows, common with un-indexed `GROUP BY`, `DISTINCT`, or multi-table sorts.",
    explanation: "Using temporary definition.",
    hint: "Creates an internal temporary table for processing grouping, distinct, or joins.",
    level: "basic"
  },
  {
    question: "Why is the combination `Using temporary; Using filesort` considered a severe performance red flag in OLTP?",
    shortAnswer: "Because creating an intermediate temporary table and then executing an explicit sort pass over it consumes high CPU, memory, and disk I/O, destroying concurrency under high QPS.",
    explanation: "Performance impact of temporary + filesort.",
    hint: "Creates a temporary table AND sorts it, consuming high CPU/memory/IO.",
    level: "expert"
  },
  {
    question: "How do student queries for Mamata illustrate eliminating `Using filesort`?",
    shortAnswer: "Querying `WHERE department_id = 1 ORDER BY gpa DESC` produces `Using filesort` on single index `(department_id)`; adding composite index `(department_id, gpa DESC)` completely eliminates filesort!",
    explanation: "Eliminating filesort via composite index ordering.",
    hint: "Creating composite index (dept_id, gpa DESC) matches filter + sort order.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Using join buffer (hash join)'` mean in MySQL 8.0?",
    shortAnswer: "MySQL is using an in-memory Hash Join: outer rows are loaded into `join_buffer_size` to construct a hash table, and inner rows are matched against it.",
    explanation: "Hash join representation in Extra column.",
    hint: "Executes an in-memory Hash Join using join_buffer_size.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using join buffer (Block Nested Loop)'` mean in MySQL 5.7 / legacy?",
    shortAnswer: "Blocks of outer rows are buffered in `join_buffer_size` memory to reduce the number of full table scans on the inner joined table.",
    explanation: "Block Nested Loop join buffer.",
    hint: "Buffers outer rows to reduce inner table scan passes.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Select tables optimized away'` mean?",
    shortAnswer: "The query was satisfied entirely during query optimization by reading pre-computed metadata or index endpoints (e.g. `SELECT MIN(id), MAX(id) FROM table`).",
    explanation: "Select tables optimized away definition.",
    hint: "Resolved instantly during optimization without reading any table data rows.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Impossible WHERE'` mean?",
    shortAnswer: "The optimizer evaluated the `WHERE` clause during compilation and proved that it can never match any rows (e.g. `WHERE 1 = 2` or `WHERE id = 1 AND id = 2`).",
    explanation: "Impossible WHERE definition.",
    hint: "The WHERE clause is mathematically impossible and will return 0 rows.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'No matching min/max row'` mean?",
    shortAnswer: "No rows satisfy the query condition for an aggregate `MIN()` or `MAX()` query (e.g. `SELECT MIN(id) FROM table WHERE id > 999999`).",
    explanation: "No matching min/max row definition.",
    hint: "No rows exist satisfying the MIN/MAX aggregate condition.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Distinct'` mean?",
    shortAnswer: "MySQL optimizes a `DISTINCT` query by halting search for additional matching rows for the current combination as soon as the first duplicate match is found.",
    explanation: "Distinct optimization flag in Extra.",
    hint: "Short-circuits duplicate search as soon as the first match is found.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Not exists'` mean?",
    shortAnswer: "An optimization for `LEFT JOIN ... WHERE right_table.id IS NULL`: MySQL stops scanning `right_table` as soon as it finds one matching row, speeding up anti-join checks.",
    explanation: "Not exists anti-join optimization flag.",
    hint: "Anti-join optimization short-circuiting after finding 1 matching row.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using MRR'` (Multi-Range Read) mean?",
    shortAnswer: "Multi-Range Read optimization: secondary index row pointers are collected, sorted in primary key order, and then accessed sequentially on disk to minimize random I/O.",
    explanation: "Multi-Range Read (MRR) optimization.",
    hint: "Sorts row pointers by primary key before fetching to convert random I/O to sequential I/O.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using index for group-by'` mean?",
    shortAnswer: "Tight Index Scan or Loose Index Scan: the `GROUP BY` or `DISTINCT` operation is satisfied directly by reading index keys in order, avoiding temporary tables and filesorts.",
    explanation: "Loose/Tight Index Scan for Group By.",
    hint: "Group By satisfied directly from index keys without temporary tables.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using index for skip scan'` mean in MySQL 8.0?",
    shortAnswer: "MySQL used an **Index Skip Scan**, skipping across distinct prefix values of a composite index to evaluate range conditions on non-leading index columns.",
    explanation: "Index skip scan extra flag.",
    hint: "Skips across distinct prefix values to query non-leading index columns.",
    level: "expert"
  },
  {
    question: "How do you eliminate `Using temporary; Using filesort` on a `GROUP BY` query?",
    shortAnswer: "Create an index whose leftmost columns match the `GROUP BY` columns in the exact order requested.",
    explanation: "Eliminating temporary tables and filesorts on GROUP BY.",
    hint: "Create an index matching the GROUP BY column sequence.",
    level: "basic"
  },
  {
    question: "Why does `SELECT *` often prevent a query from achieving `Extra = 'Using index'`?",
    shortAnswer: "Because `SELECT *` requests columns not included in the secondary index, forcing InnoDB to perform a secondary index lookup AND a base table clustered index fetch for every row.",
    explanation: "SELECT * defeating covering index optimization.",
    hint: "Requests non-indexed columns, forcing base table clustered lookups.",
    level: "basic"
  },
  {
    question: "What system variable determines the maximum in-memory size for filesort operations?",
    shortAnswer: "`sort_buffer_size` (if sorting data exceeds this size, MySQL creates temporary merge files on disk).",
    explanation: "sort_buffer_size memory threshold.",
    hint: "sort_buffer_size.",
    level: "basic"
  },
  {
    question: "What system variables determine the maximum in-memory size for internal temporary tables in MySQL 8.0?",
    shortAnswer: "`tmp_table_size` and `max_heap_table_size` (and the `temptable_max_ram` variable for the TempTable storage engine in MySQL 8.0).",
    explanation: "Temporary table memory limits.",
    hint: "tmp_table_size, max_heap_table_size, and temptable_max_ram.",
    level: "expert"
  },
  {
    question: "What happens when an internal temporary table exceeds `tmp_table_size` in MySQL 8.0?",
    shortAnswer: "MySQL automatically converts the in-memory temporary table to an on-disk temporary table (using the InnoDB storage engine or memory-mapped files), causing disk I/O.",
    explanation: "Temporary table spilling to disk.",
    hint: "Converts to an on-disk temporary table, causing disk I/O.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Zero limit'` mean?",
    shortAnswer: "The query contains `LIMIT 0`, so MySQL returns an empty result set immediately without executing any table scans.",
    explanation: "Zero limit extra flag.",
    hint: "LIMIT 0 returns empty results immediately.",
    level: "basic"
  },
  {
    question: "What does `Extra = 'Backward index scan'` mean in MySQL 8.0?",
    shortAnswer: "The index is traversed in reverse order (from right to left) to satisfy an `ORDER BY col DESC` on an ascending index.",
    explanation: "Backward index scan in MySQL 8.0.",
    hint: "Traverses index in reverse order for descending sorting.",
    level: "basic"
  },
  {
    question: "How can descending indexes in MySQL 8.0 eliminate `Backward index scan` overhead?",
    shortAnswer: "By defining `INDEX idx_score (score DESC)`, MySQL stores keys in descending physical order, allowing forward B+Tree traversal during `ORDER BY score DESC`.",
    explanation: "Descending index optimization in MySQL 8.0.",
    hint: "Defines physical descending key order for forward traversal.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using sort_union'` vs `Extra = 'Using union'` mean in `index_merge`?",
    shortAnswer: "`Using union` merges row ID lists directly when range conditions are equality matches; `Using sort_union` first sorts row ID lists by primary key before merging when range intervals are uneven.",
    explanation: "sort_union vs union in index_merge.",
    hint: "sort_union sorts row IDs before merging uneven range intervals.",
    level: "expert"
  },
  {
    question: "Can `Using index` and `Using where` appear together in the `Extra` column?",
    shortAnswer: "YES; `Using where; Using index` means the query is a Covering Index, but additional `WHERE` filters were applied on index columns in memory without base table reads.",
    explanation: "Using where with Using index combination.",
    hint: "Yes, covering index with in-memory filtering on index columns.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for Extra Column Flags?",
    shortAnswer: "Strive for **`Using index` (Covering Index)** for all latency-critical read queries; leverage **`Using index condition` (ICP)** to reduce storage engine I/O; eliminate **`Using filesort` and `Using temporary`** on high-frequency tables by building composite indexes matching `WHERE` + `GROUP BY` + `ORDER BY` clauses; and monitor `sort_buffer_size` and `temptable_max_ram` to prevent disk spills.",
    explanation: "Authoritative architectural best practices for Extra column flags.",
    hint: "Aim for Using index; leverage ICP; eliminate Using filesort/temporary via composite indexes.",
    level: "expert"
  }
];

export default questions;
