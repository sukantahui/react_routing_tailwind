// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is a database index?",
    shortAnswer: "A database index is a specialized auxiliary data structure (typically a B+Tree) that allows the database engine to find specific rows in $O(\\log N)$ time without scanning every row in the table.",
    explanation: "Acts like a book's index, mapping search keys to physical storage locations.",
    hint: "An auxiliary data structure enabling fast logarithmic row lookups.",
    level: "basic"
  },
  {
    question: "What is a 'Full Table Scan' (Table Scan) in MySQL?",
    shortAnswer: "A scan where the database engine sequentially reads every 16KB data page in the table from beginning to end to evaluate a query's `WHERE` clause.",
    explanation: "Occurs when no suitable index exists for the query's search criteria.",
    hint: "Reading every page of the table from start to finish.",
    level: "basic"
  },
  {
    question: "What is the time complexity of searching an unindexed table vs an indexed B-Tree table?",
    shortAnswer: "Unindexed search is $O(N)$ (linear time); indexed B-Tree search is $O(\\log N)$ (logarithmic time).",
    explanation: "Logarithmic time scales sub-linearly, keeping queries sub-millisecond even across billions of rows.",
    hint: "O(N) linear scan vs O(log N) logarithmic tree search.",
    level: "basic"
  },
  {
    question: "What is the standard page size used by MySQL's InnoDB storage engine for disk I/O?",
    shortAnswer: "16 Kilobytes (16,384 bytes).",
    explanation: "InnoDB transfers data between disk and RAM in fixed 16KB page chunks.",
    hint: "16 KB",
    level: "basic"
  },
  {
    question: "How many page reads are typically required to locate a single row in an indexed table of 10,000,000 records?",
    shortAnswer: "Only 3 to 4 page reads (Root -> Level 1 Branch -> Level 2 Branch -> Leaf Page).",
    explanation: "A B+Tree has a high fan-out (e.g. 1000 pointers per page), keeping tree depth very shallow (3-4 levels).",
    hint: "3 to 4 pages.",
    level: "moderate"
  },
  {
    question: "What is 'Write Amplification' or the 'Index Tax' in database indexing?",
    shortAnswer: "The overhead where every `INSERT`, `UPDATE`, and `DELETE` operation must modify the base table AND update every secondary index tree, slowing down write throughput.",
    explanation: "More indexes accelerate reads but slow down data modification operations.",
    hint: "The penalty where writes must update all secondary index trees.",
    level: "moderate"
  },
  {
    question: "What is 'Cardinality' in database indexing?",
    shortAnswer: "Cardinality refers to the number of distinct (unique) values in a column relative to the total number of rows in the table.",
    explanation: "High cardinality columns (e.g. email, student_id) make great index candidates; low cardinality columns (e.g. gender) do not.",
    hint: "The uniqueness of values in a column.",
    level: "moderate"
  },
  {
    question: "Why is creating a single-column index on a `gender` column (containing only 'M', 'F', 'O') usually ineffective?",
    shortAnswer: "Because of Low Cardinality: Each value matches ~33% to 50% of the table, causing the optimizer to decide that a sequential table scan is cheaper than random index page seeks.",
    explanation: "When selectivity is low (>15-20% of rows matched), MySQL prefers full table scans.",
    hint: "Low cardinality causes the optimizer to bypass the index in favor of a table scan.",
    level: "moderate"
  },
  {
    question: "What is the SQL command to create an index named `idx_student_phone` on the `phone_number` column of `students`?",
    shortAnswer: "`CREATE INDEX idx_student_phone ON students (phone_number);`",
    explanation: "Standard DDL command for index creation in MySQL.",
    hint: "CREATE INDEX idx_student_phone ON students (phone_number);",
    level: "basic"
  },
  {
    question: "What SQL command removes an index in MySQL?",
    shortAnswer: "`DROP INDEX index_name ON table_name;` (or `ALTER TABLE table_name DROP INDEX index_name;`).",
    explanation: "Removes the index tree and frees associated disk pages.",
    hint: "DROP INDEX index_name ON table_name;",
    level: "basic"
  },
  {
    question: "How does creating a `PRIMARY KEY` constraint automatically affect indexing in MySQL InnoDB?",
    shortAnswer: "InnoDB automatically creates the **Clustered Index** on the primary key column(s), physically ordering data rows on disk by the primary key.",
    explanation: "The primary key index contains the actual physical row data in its leaf pages.",
    hint: "Automatically creates the physical Clustered Index.",
    level: "basic"
  },
  {
    question: "How does creating a `UNIQUE` constraint automatically affect indexing?",
    shortAnswer: "MySQL automatically creates a **Unique B-Tree Index** to enforce the uniqueness constraint and accelerate lookups.",
    explanation: "Unique indexes combine fast search with declarative duplicate prevention.",
    hint: "Automatically creates a Unique B-Tree index.",
    level: "basic"
  },
  {
    question: "How can you check if an index is being used by a specific query in MySQL?",
    shortAnswer: "Run `EXPLAIN SELECT ...` (or `EXPLAIN ANALYZE`) and inspect the `key`, `type`, and `rows` columns in the execution plan.",
    explanation: "EXPLAIN shows the chosen index (`key`), access type (e.g. `ref`, `range`, `ALL`), and estimated rows scanned.",
    hint: "Use EXPLAIN SELECT ... and inspect the 'key' column.",
    level: "basic"
  },
  {
    question: "What does `type: ALL` in an `EXPLAIN` output indicate?",
    shortAnswer: "It indicates that MySQL is performing a Full Table Scan (reading all rows in the table without using an index).",
    explanation: "Type 'ALL' is the slowest access type and indicates missing or unusable indexes.",
    hint: "Indicates a full table scan.",
    level: "basic"
  },
  {
    question: "What does `type: const` or `type: eq_ref` in `EXPLAIN` indicate?",
    shortAnswer: "It indicates an optimal point-lookup where MySQL matches at most one unique row using a PRIMARY KEY or UNIQUE index.",
    explanation: "The fastest possible indexed access method.",
    hint: "Optimal point-lookup on a primary key or unique index.",
    level: "moderate"
  },
  {
    question: "Why should you avoid creating indexes on very small tables (e.g. 50 rows)?",
    shortAnswer: "Because the entire table fits into a single 16KB memory page in the Buffer Pool; reading the page in RAM sequentially is faster than traversing an index tree.",
    explanation: "Index lookup overhead exceeds the trivial cost of scanning a few dozen cached rows.",
    hint: "The entire small table fits in one page in RAM, making full scans faster.",
    level: "moderate"
  },
  {
    question: "What happens to the InnoDB Buffer Pool when too many unnecessary indexes are created?",
    shortAnswer: "Unnecessary index pages fill up the Buffer Pool RAM, evicting active data pages and increasing disk I/O for regular table queries.",
    explanation: "Causes memory bloat and degrades overall database cache hit ratios.",
    hint: "Fills Buffer Pool RAM, evicting active data pages and increasing disk I/O.",
    level: "expert"
  },
  {
    question: "How do indexes assist `ORDER BY` and `GROUP BY` operations?",
    shortAnswer: "Because index keys are physically stored in sorted order in the B-Tree, queries can read rows in sorted order directly without performing an expensive in-memory or disk `filesort`.",
    explanation: "Eliminates `Using filesort` from the query execution plan.",
    hint: "Rows are already sorted in the B-Tree, avoiding expensive filesort operations.",
    level: "moderate"
  },
  {
    question: "What is a 'Page Split' in an InnoDB B-Tree index?",
    shortAnswer: "When an `INSERT` occurs in a full 16KB index page, InnoDB splits the page into two 50% full pages to make room, causing write I/O and index fragmentation.",
    explanation: "Random non-sequential primary key inserts (e.g. random UUIDs) cause frequent page splits.",
    hint: "Splitting a full 16KB page into two to accommodate new row inserts.",
    level: "expert"
  },
  {
    question: "Why are sequential auto-increment integers better than random UUIDs as primary key indexes in InnoDB?",
    shortAnswer: "Sequential integers append monotonically to the end of index pages with zero page splits, whereas random UUIDs insert into random pages, causing massive page splits and fragmentation.",
    explanation: "Sequential keys maintain compact, contiguous B-Tree leaf pages.",
    hint: "Sequential integers append cleanly without page splits, while random UUIDs cause page fragmentation.",
    level: "expert"
  },
  {
    question: "Can an index accelerate `WHERE column LIKE '%Barrackpore'` (with a leading wildcard)?",
    shortAnswer: "NO. Leading wildcards prevent B-Tree prefix matching, forcing MySQL to perform a Full Table Scan.",
    explanation: "B-Trees require the prefix of the string to navigate the sorted branches.",
    hint: "No; leading wildcards prevent B-Tree index traversal.",
    level: "basic"
  },
  {
    question: "Can an index accelerate `WHERE column LIKE 'Barrackpore%'` (with a trailing wildcard)?",
    shortAnswer: "YES. Trailing wildcards use B-Tree range scans efficiently to find all keys starting with 'Barrackpore'.",
    explanation: "Prefix string searches navigate to the start of the range in $O(\\log N)$ time.",
    hint: "Yes; trailing wildcards use index range scans efficiently.",
    level: "basic"
  },
  {
    question: "How does applying a function to a column in the `WHERE` clause (e.g. `WHERE UPPER(name) = 'MAMATA'`) affect index usage?",
    shortAnswer: "It invalidates standard B-Tree indexes, forcing a Full Table Scan (unless a functional index is explicitly created).",
    explanation: "The database cannot match transformed values against raw stored index keys.",
    hint: "Wrapping columns in functions disables standard index lookups.",
    level: "moderate"
  },
  {
    question: "What is a Functional Index (Expression Index) in MySQL 8.0+?",
    shortAnswer: "An index built directly on the result of an expression: `CREATE INDEX idx_upper_name ON students ((UPPER(name)));`",
    explanation: "Allows indexed lookups on queries using the exact same function expression.",
    hint: "An index created directly on an expression like UPPER(column).",
    level: "expert"
  },
  {
    question: "Why should foreign key columns in child tables almost always be indexed?",
    shortAnswer: "To accelerate `JOIN` lookups and prevent table locks or full scans when parent records are updated or deleted.",
    explanation: "InnoDB requires indexes on foreign keys to enforce relational constraints efficiently.",
    hint: "To accelerate JOIN queries and enforce constraint checks without table locks.",
    level: "moderate"
  },
  {
    question: "What is the command to view all existing indexes on a table in MySQL?",
    shortAnswer: "`SHOW INDEX FROM table_name;`",
    explanation: "Displays index names, column sequences, cardinality, and index types (BTREE/FULLTEXT).",
    hint: "SHOW INDEX FROM table_name;",
    level: "basic"
  },
  {
    question: "What is an 'Index Scan' vs an 'Index Seek'?",
    shortAnswer: "An Index Seek traverses tree branches directly to pinpoint matching rows in $O(\\log N)$; an Index Scan sequentially reads all leaf pages of the index tree.",
    explanation: "Seeks are point/range lookups; scans read the entire index structure.",
    hint: "Seek traverses tree branches to specific keys; Scan reads through the index leaves.",
    level: "expert"
  },
  {
    question: "How does database indexing enable search cost reductions in terms of hardware resources?",
    shortAnswer: "It drastically reduces disk read operations, reduces CPU cycles spent evaluating row conditions, and frees up database server RAM.",
    explanation: "Lowers disk I/O bottlenecks and increases server queries-per-second (QPS) capacity.",
    hint: "Reduces disk I/O, minimizes CPU evaluation cycles, and increases QPS throughput.",
    level: "basic"
  },
  {
    question: "Can you create an index on multiple columns simultaneously?",
    shortAnswer: "YES. This is called a **Composite Index** or **Multi-Column Index** (e.g. `CREATE INDEX idx_city_stream ON students (centre_city, course_stream);`).",
    explanation: "Composite indexes accelerate multi-criteria filtering and sorting.",
    hint: "Yes; multi-column indexes are called Composite Indexes.",
    level: "basic"
  },
  {
    question: "What is the golden rule of database indexing?",
    shortAnswer: "Index selectively for your most critical and frequent read query patterns, prioritize high-cardinality columns, and avoid creating redundant or low-cardinality indexes that tax write operations.",
    explanation: "Balanced indexing achieves optimal read performance without degrading write throughput.",
    hint: "Index for high-cardinality search patterns and avoid write-taxing redundant indexes.",
    level: "expert"
  }
];

export default questions;
