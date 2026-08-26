// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a Covering Index in MySQL database engineering?",
    shortAnswer: "A Covering Index is an index that physically contains all the columns requested by a SQL query across `SELECT`, `WHERE`, `JOIN`, `GROUP BY`, and `ORDER BY` clauses.",
    explanation: "Because all required data is stored directly in the index leaf pages, MySQL satisfies the entire query from the index without reading full table pages from disk or the Buffer Pool.",
    hint: "An index containing all columns required by the query.",
    level: "basic",
    codeExample: "CREATE INDEX idx_student_covering ON students (city, status, name, gpa);"
  },
  {
    question: "How do you identify that a query is using a Covering Index in MySQL `EXPLAIN`?",
    shortAnswer: "The `Extra` column will display `Using index`.",
    explanation: "`Using index` confirms that the storage engine fulfilled all column lookups directly from the B+Tree index leaf nodes with zero clustered table seeks.",
    hint: "Look for 'Using index' in the Extra column.",
    level: "basic",
    codeExample: "EXPLAIN SELECT student_id, city, status FROM students WHERE city = 'Barrackpore';"
  },
  {
    question: "What is the crucial difference between `type = 'index'` and `Extra = 'Using index'`?",
    shortAnswer: "`type = 'index'` means a **Full Index Scan** (reading all leaf nodes of the index, O(N)); `Extra = 'Using index'` means **Covering Index** (index-only access with zero base table reads).",
    explanation: "A covering index can occur with any access type (`const`, `ref`, `range`, or `index`). `type` describes how the rows were found; `Extra` describes whether base table pages were touched.",
    hint: "type=index is the scan access method; Extra=Using index is the index-only read guarantee.",
    level: "expert"
  },
  {
    question: "What is a 'Bookmark Lookup' (or Clustered Index Seek) in secondary index access?",
    shortAnswer: "It is the secondary navigation step where MySQL takes the Primary Key retrieved from a secondary index leaf and searches the Clustered Index B+Tree to retrieve non-indexed columns.",
    explanation: "In InnoDB, secondary indexes do not store full table rows. If a query requests non-indexed columns, InnoDB must execute a random I/O seek into the clustered index for each matching row.",
    hint: "Using the Primary Key from a secondary index to fetch the remaining row columns.",
    level: "basic"
  },
  {
    question: "Why are Bookmark Lookups expensive in high-throughput database systems?",
    shortAnswer: "Because bookmark lookups cause random disk/memory I/O seeks across scattered clustered index pages, creating CPU spikes and Buffer Pool thrashing under high concurrency.",
    explanation: "Sequential index reads are fast, but jumping between scattered base table pages causes high latency and page eviction.",
    hint: "Random I/O seeks across scattered data pages degrade performance.",
    level: "expert"
  },
  {
    question: "How does InnoDB structure secondary index leaf nodes regarding the Primary Key?",
    shortAnswer: "In InnoDB, every secondary index leaf node physically stores the indexed column values followed implicitly by the table's Primary Key column(s).",
    explanation: "Because the Primary Key acts as the row identifier in InnoDB's clustered table architecture, it is automatically appended to every secondary index entry.",
    hint: "Secondary index leaves always contain the indexed keys plus the Primary Key.",
    level: "basic"
  },
  {
    question: "What is an 'Implicit Covering Index' in InnoDB?",
    shortAnswer: "It is when a query only requests the indexed column and the Primary Key; the query is automatically a Covering Index without needing to explicitly add the Primary Key to the index definition.",
    explanation: "For example, on table `students(id PK, city, name)`, an index `idx_city (city)` automatically covers `SELECT id, city FROM students WHERE city = 'Barrackpore'`.",
    hint: "Primary Key is automatically present in the secondary index leaf node.",
    level: "expert",
    codeExample: "EXPLAIN SELECT student_id, city FROM students WHERE city = 'Kolkata'; -- Uses idx_city implicitly!"
  },
  {
    question: "What is the 'Deferred Join' (Late Row Lookup) pagination pattern?",
    shortAnswer: "A query optimization technique where an inner subquery uses a Covering Index to perform deep `LIMIT / OFFSET` filtering, joining back to the base table only for the final page of rows.",
    explanation: "Instead of reading 100,020 full table rows for `LIMIT 100000, 20`, the inner subquery scans 100,020 compact index keys and only reads 20 full table rows via Primary Key join.",
    hint: "Using a covering subquery for pagination offset, then joining back for full rows.",
    level: "expert",
    codeExample: "SELECT s.* FROM students s JOIN (SELECT id FROM students WHERE city = 'Barrackpore' ORDER BY created_at LIMIT 100000, 20) AS p ON s.id = p.id;"
  },
  {
    question: "Why does `SELECT *` frequently destroy covering index optimizations?",
    shortAnswer: "Because `SELECT *` requests all columns in the table, including non-indexed columns, forcing MySQL to perform clustered index bookmark lookups on every row.",
    explanation: "A covering index only works when every single requested column exists in the index. Adding unindexed columns forces table page reads.",
    hint: "Un-indexed columns requested by SELECT * require base table reads.",
    level: "basic"
  },
  {
    question: "How does a Covering Index optimize `COUNT(*)` queries?",
    shortAnswer: "MySQL chooses the smallest, narrowest secondary index to scan leaf pages rather than scanning the much larger clustered table, reducing I/O by 80% to 95%.",
    explanation: "Since `COUNT(*)` only counts non-null rows and requires no specific columns, InnoDB scans the smallest secondary B+Tree index available.",
    hint: "MySQL scans the smallest secondary index tree to count rows.",
    level: "basic",
    codeExample: "EXPLAIN SELECT COUNT(*) FROM students;"
  },
  {
    question: "How does a Covering Index accelerate `GROUP BY` operations?",
    shortAnswer: "Because index leaf nodes are pre-sorted by key values, MySQL performs a 'Tight Index Scan' for grouping, calculating aggregates on the fly with zero temporary tables or filesorts.",
    explanation: "The query streams grouped data directly in index order, avoiding `Using temporary; Using filesort`.",
    hint: "Pre-sorted index leaf nodes satisfy GROUP BY in a single linear pass.",
    level: "expert",
    codeExample: "CREATE INDEX idx_dept_gpa ON student_records (department_id, gpa);\nSELECT department_id, AVG(gpa) FROM student_records GROUP BY department_id;"
  },
  {
    question: "What is the optimal column ordering in a composite covering index?",
    shortAnswer: "1) Equality `WHERE` columns first, 2) Range `WHERE` / `ORDER BY` columns second, 3) Remaining `SELECT`-only projection columns last.",
    explanation: "Follows the Leftmost Prefix Rule for filtering and sorting while including projection columns at the end to satisfy the covering guarantee.",
    hint: "Equality columns -> Range/Sort columns -> Projection columns.",
    level: "expert"
  },
  {
    question: "What is the storage and write penalty of wide covering indexes?",
    shortAnswer: "Every additional column increases index B+Tree disk size, consumes more Buffer Pool RAM, and adds write overhead during `INSERT`, `UPDATE`, and `DELETE` operations.",
    explanation: "Secondary indexes must be updated whenever any of their indexed columns change. Over-indexing creates write amplification.",
    hint: "Increases index page size and adds overhead to DML insert/update/delete operations.",
    level: "basic"
  },
  {
    question: "Can a Prefix Index (e.g. `VARCHAR(255)` indexed as `name(10)`) be a Covering Index?",
    shortAnswer: "No! MySQL cannot use a prefix index as a covering index because the index only stores a truncated prefix of the string, not the complete column value.",
    explanation: "To retrieve the full string value for `SELECT`, MySQL must always perform a clustered index bookmark lookup.",
    hint: "Prefix indexes only store partial strings, requiring base table lookups for full text.",
    level: "expert"
  },
  {
    question: "What does `Extra = 'Using where; Using index'` mean in `EXPLAIN`?",
    shortAnswer: "It means the query is an optimal Covering Index (zero base table reads), and the MySQL Server layer evaluated additional `WHERE` filters in-memory on the index columns.",
    explanation: "All requested columns are covered by the index, and the server filtered rows based on index data without touching the clustered table.",
    hint: "Covering index read with in-memory server filtering on index columns.",
    level: "moderate"
  },
  {
    question: "How does a Covering Index overcome the 20%–30% Optimizer Tipping Point?",
    shortAnswer: "Because a covering index requires zero secondary random bookmark lookups, the cost of an index scan is always lower than a full table scan, even when 100% of rows match.",
    explanation: "The tipping point is caused by random I/O from bookmark lookups. When bookmark lookups are eliminated, the optimizer happily uses the index for all selectivity levels.",
    hint: "Zero random I/O eliminates the cost penalty of secondary index range scans.",
    level: "expert"
  },
  {
    question: "What is an 'Index-Only Scan' in database literature?",
    shortAnswer: "An Index-Only Scan is another name for a Covering Index access path where the database engine answers a query entirely from index structures without accessing table storage.",
    explanation: "Widely used across relational engines (MySQL, PostgreSQL, Oracle, SQL Server) to describe zero-table-read query plans.",
    hint: "Executing a query purely using index data pages.",
    level: "basic"
  },
  {
    question: "In what scenario is a Covering Index NOT recommended?",
    shortAnswer: "On high-write OLTP tables where queries retrieve wide BLOB, TEXT, or JSON columns, or where queries already match unique Primary Keys with `type = const`.",
    explanation: "Indexing huge text columns causes massive index bloat, and `const` queries on Primary Keys already execute in $O(1)$ without secondary indexes.",
    hint: "Tables with heavy write traffic, huge text columns, or already optimal PK queries.",
    level: "expert"
  },
  {
    question: "How does a Covering Index eliminate `Using filesort` during sorting?",
    shortAnswer: "By ordering composite index columns to match the `ORDER BY` clause, allowing MySQL to read records in pre-sorted physical B+Tree sequence.",
    explanation: "Because B+Tree leaf pages are physically linked in sorted order, streaming them produces sorted output without in-memory sort buffers.",
    hint: "Index leaf nodes are pre-sorted in B+Tree order.",
    level: "basic",
    codeExample: "CREATE INDEX idx_student_order ON students (status, registration_date, student_name);"
  },
  {
    question: "Can a Covering Index satisfy queries with multi-table JOINs?",
    shortAnswer: "Yes! If the join keys and projected columns for a table are contained in its index, MySQL accesses that table using an index-only scan during the join loop.",
    explanation: "Each table in a join plan can independently use a covering index (`Extra = 'Using index'`), drastically speeding up multi-table joins.",
    hint: "Joined tables can independently use covering indexes.",
    level: "expert"
  },
  {
    question: "What happens when an `UPDATE` modifies a column included in a covering index?",
    shortAnswer: "InnoDB must update the clustered index record AND modify the secondary B+Tree index leaf page (and potentially rebalance the tree).",
    explanation: "Secondary indexes containing frequently modified columns experience higher lock contention and redo log generation.",
    hint: "Modifying covered columns triggers secondary index maintenance.",
    level: "moderate"
  },
  {
    question: "Why does `EXPLAIN FORMAT=JSON` provide clearer covering index confirmation?",
    shortAnswer: "It explicitly sets `\"using_index\": true` inside the cost and access property object for that table access step.",
    explanation: "JSON format gives structured, programmatic confirmation of index-only execution.",
    hint: "Look for 'using_index': true in the JSON output.",
    level: "moderate"
  },
  {
    question: "How does a Covering Index reduce InnoDB Buffer Pool churn?",
    shortAnswer: "Because index pages are compact, far fewer 16KB pages are loaded into memory, and scattered base table pages are not loaded, preserving hot cache entries.",
    explanation: "A covering index query touches only 5-10 index pages instead of loading hundreds of scattered data pages into the Buffer Pool LRU list.",
    hint: "Touches compact index pages, leaving more RAM available for cached application data.",
    level: "expert"
  },
  {
    question: "What is an Index Condition Pushdown (ICP) vs Covering Index?",
    shortAnswer: "ICP (`Using index condition`) evaluates filters in the storage engine but still reads base table rows; Covering Index (`Using index`) satisfies everything from the index with zero base table reads.",
    explanation: "Covering Index is superior to ICP because it completely eliminates base table page reads.",
    hint: "ICP filters rows before table reads; Covering Index eliminates table reads entirely.",
    level: "expert"
  },
  {
    question: "How does the `FORCE INDEX` hint interact with covering indexes?",
    shortAnswer: "If a developer specifies `FORCE INDEX (covering_idx)`, MySQL is forced to calculate the query plan using the index, confirming index-only access if all columns are covered.",
    explanation: "Useful when the optimizer erroneously estimates table scan costs lower than index scan costs.",
    hint: "Forces the optimizer to use the covering index.",
    level: "basic",
    codeExample: "SELECT student_id, name, fee FROM students FORCE INDEX (idx_cov) WHERE fee > 10000;"
  },
  {
    question: "Can an index on `(A, B, C)` act as a covering index for `SELECT B, C FROM table WHERE A = 1`?",
    shortAnswer: "Yes! Because all columns (`A`, `B`, `C`) exist in the index, and `A` is the leftmost prefix used for filtering, the query is a 100% covering index.",
    explanation: "The query filters on `A` and retrieves `B` and `C` directly from the index leaf nodes without touching the clustered table.",
    hint: "All filtered and selected columns exist in the composite index.",
    level: "basic"
  },
  {
    question: "Can an index on `(A, B, C)` act as a covering index for `SELECT A, B FROM table WHERE C = 5`?",
    shortAnswer: "Yes! It will execute as a **Full Index Scan** (`type = index`) with `Extra = 'Using where; Using index'`—scanning the compact index rather than the full table.",
    explanation: "Even though `C` is not a leftmost prefix (so B+Tree range probing cannot be used), all columns exist in the index, allowing a fast index-wide scan.",
    hint: "Full index scan with index-only filtering.",
    level: "expert"
  },
  {
    question: "What is the effect of column order in `(student_id, gpa)` vs `(gpa, student_id)` on `SELECT student_id, AVG(gpa)`?",
    shortAnswer: "Both cover the query, but `(gpa, student_id)` allows range filtering on `gpa`, whereas `(student_id, gpa)` allows point lookups on `student_id`.",
    explanation: "Index column order determines which `WHERE` clauses can use B+Tree binary search probes.",
    hint: "Column ordering determines which filters can perform root-to-leaf binary probes.",
    level: "expert"
  },
  {
    question: "How do Generated (Virtual) Columns enable covering indexes on JSON attributes in MySQL 8.0?",
    shortAnswer: "By creating a virtual column extracted from JSON (`col AS (data->>'$.city')`) and indexing that virtual column, queries on that JSON field become covering index lookups.",
    explanation: "MySQL indexes virtual columns in secondary B+Trees, allowing index-only access on structured JSON fields without base table parsing.",
    hint: "Index virtual generated columns extracted from JSON documents.",
    level: "expert",
    codeExample: "ALTER TABLE students ADD city_virt VARCHAR(50) AS (profile->>'$.city');\nCREATE INDEX idx_city_virt ON students (city_virt, student_id);"
  },
  {
    question: "What is the primary summary rule for senior database developers regarding covering indexes?",
    shortAnswer: "Design covering indexes specifically for your top 5 to 10 most frequent, latency-critical read queries to achieve sub-millisecond response times and eliminate disk I/O bottlenecks.",
    explanation: "Targeted covering indexes provide massive 10x-100x speedups where it matters most while avoiding global index bloat.",
    hint: "Apply covering indexes strategically to top high-frequency queries for 100x speedup.",
    level: "basic"
  }
];

export default questions;
