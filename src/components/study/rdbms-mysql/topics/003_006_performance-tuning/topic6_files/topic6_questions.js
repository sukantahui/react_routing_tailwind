// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What does `type = 'const'` mean in MySQL `EXPLAIN` output?",
    shortAnswer: "`const` means MySQL resolves the row in a single step at query optimization time by searching a Primary Key or NOT NULL Unique index with an exact equality value.",
    explanation: "Because only one row can match a unique constraint, MySQL reads it once and treats its column values as constant constants for the rest of query optimization.",
    hint: "Exact match on Primary Key or Unique NOT NULL index.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM students WHERE student_id = 101;"
  },
  {
    question: "What is the algorithmic time complexity of a `const` lookup?",
    shortAnswer: "It is $O(\\log N)$ to traverse the B+Tree root-to-leaf nodes (typically 3 to 4 page reads), effectively behaving like $O(1)$ memory access when pages are cached in the InnoDB Buffer Pool.",
    explanation: "InnoDB indexes are balanced trees where depth is typically 3-4 levels. When the root and branch pages are in RAM, the lookup is near instantaneous.",
    hint: "B+Tree depth traversal, practically instantaneous in memory.",
    level: "expert"
  },
  {
    question: "What is `type = 'eq_ref'` and how does it differ from `const`?",
    shortAnswer: "`eq_ref` is the fastest possible multi-table join access type, used when a joined table is probed using its Primary Key or Unique NOT NULL index for each outer row.",
    explanation: "While `const` applies to a single constant lookup, `eq_ref` occurs in joins where exactly one matching row is fetched from the inner table per outer row.",
    hint: "1-to-1 unique join probe across tables.",
    level: "basic",
    codeExample: "SELECT s.name, e.fee FROM students s JOIN enrollments e ON s.student_id = e.student_id;"
  },
  {
    question: "What does `type = 'ref'` represent?",
    shortAnswer: "`ref` represents an equality lookup on a non-unique secondary index or a leftmost prefix of a composite index, potentially matching multiple rows.",
    explanation: "The storage engine probes the B+Tree to find the first matching key and scans contiguous leaf nodes until the key changes.",
    hint: "Equality lookup on a non-unique index.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM students WHERE city = 'Barrackpore';"
  },
  {
    question: "What is an `Index Range Scan` (`type = 'range'`)?",
    shortAnswer: "An `Index Range Scan` uses an index to retrieve rows that fall within a specified range of values using boundary operators (`<`, `<=`, `>`, `>=`, `BETWEEN`, `IN`, `LIKE 'prefix%'`).",
    explanation: "MySQL probes the B+Tree root to locate the starting leaf node and then navigates the doubly linked leaf pages linearly until the upper boundary condition is met.",
    hint: "B+Tree probe + sequential scan along leaf nodes within limits.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM student_ledgers WHERE balance BETWEEN 1000 AND 5000;"
  },
  {
    question: "How does MySQL perform an `Index Range Scan` internally in InnoDB?",
    shortAnswer: "1) Traverses from B+Tree root to leaf node to find lower bound. 2) Traverses leaf pages sequentially using forward/backward pointers. 3) Stops at upper bound.",
    explanation: "Because B+Tree leaf nodes are ordered and linked as a doubly linked list, range scanning avoids re-traversing the tree from the root for each record.",
    hint: "Root probe to lower bound, then doubly-linked leaf traversal.",
    level: "expert"
  },
  {
    question: "What does `type = 'index'` (Full Index Scan) mean?",
    shortAnswer: "`type = 'index'` means MySQL performs a full sequential scan of all leaf nodes of the index B+Tree rather than the entire clustered table.",
    explanation: "Even though all rows are scanned ($O(N)$), index leaf nodes only contain indexed columns (+ PK), making the index data size much smaller than full table rows.",
    hint: "Full scan of the index tree leaf nodes.",
    level: "basic",
    codeExample: "EXPLAIN SELECT AVG(gpa) FROM student_records;"
  },
  {
    question: "Why is `type = 'index'` generally faster than `type = 'ALL'` (Full Table Scan)?",
    shortAnswer: "Because secondary indexes are compact (narrow column width), fit in fewer 16KB pages, and require significantly less disk I/O and Buffer Pool memory to scan.",
    explanation: "A table with 50 columns might require 10,000 pages, while an index on one INT column might only require 100 pages to hold the same row count.",
    hint: "Index pages are much smaller and contain fewer columns than full data pages.",
    level: "basic"
  },
  {
    question: "What does `type = 'ALL'` indicate in `EXPLAIN`?",
    shortAnswer: "`type = 'ALL'` indicates a **Full Table Scan**, where MySQL sequentially reads every single 16KB data page of the clustered index from the tablespace.",
    explanation: "Every row in the table is examined from start to finish. This is the slowest and most resource-intensive access method for medium-to-large tables.",
    hint: "Full table scan across all pages.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM student_records WHERE address LIKE '%Ichapur%';"
  },
  {
    question: "When is a Full Table Scan (`type = 'ALL'`) acceptable or preferred by the optimizer?",
    shortAnswer: "When the table is very small (< 100 rows) or when the query retrieves a large fraction (> 20-30%) of the total table rows where sequential I/O outperforms random index seeks.",
    explanation: "For small tables, loading all pages in a single sequential I/O burst is faster than navigating index trees and doing secondary lookups.",
    hint: "Small lookup tables or when selecting a large percentage of total rows.",
    level: "basic"
  },
  {
    question: "What is the '20% to 30% Optimizer Tipping Point' in MySQL index range scans?",
    shortAnswer: "If a range condition matches more than 20% to 30% of table rows, MySQL switches from an `Index Range Scan` to a `Full Table Scan` (`ALL`).",
    explanation: "Secondary index lookups require random disk seeks on the clustered index for each matching row. When row count is high, random I/O overhead exceeds sequential scan cost.",
    hint: "Random secondary lookup I/O becomes more expensive than sequential table scan.",
    level: "expert"
  },
  {
    question: "What is a 'Secondary Index Bookmark Lookup' (Clustered Index Seek)?",
    shortAnswer: "It is the second lookup step where MySQL takes the Primary Key retrieved from a secondary index leaf and searches the Clustered Index B+Tree to fetch non-indexed columns.",
    explanation: "In InnoDB, secondary indexes store (Index_Key, Primary_Key). To get remaining table columns (`SELECT *`), InnoDB must perform a secondary seek into the clustered index.",
    hint: "Using the Primary Key from a secondary index to fetch the full row.",
    level: "expert"
  },
  {
    question: "How does a Covering Index eliminate Bookmark Lookups during Range Scans?",
    shortAnswer: "By including all columns requested in `SELECT`, `WHERE`, and `ORDER BY` directly within the composite index, allowing MySQL to satisfy the range query entirely from index leaves (`Extra = 'Using index'`).",
    explanation: "With zero secondary lookups needed, the tipping point no longer applies, and MySQL will happily use the index range scan even for 100% of rows.",
    hint: "All requested columns exist inside the secondary index itself.",
    level: "expert",
    codeExample: "CREATE INDEX idx_student_range ON student_ledgers (department_id, balance);"
  },
  {
    question: "What is Multi-Range Read (MRR) optimization in MySQL 8.0?",
    shortAnswer: "MRR buffers row IDs (Primary Keys) collected from secondary index range scans, sorts them in physical clustered key order, and accesses table pages sequentially instead of randomly.",
    explanation: "MRR transforms high-cost random disk seeks into sequential I/O, dramatically speeding up `type = range` queries that require bookmark lookups.",
    hint: "Sorts row pointers before reading table pages to convert random I/O into sequential I/O.",
    level: "expert"
  },
  {
    question: "Why does `WHERE student_name LIKE '%Mitra'` cause a Full Table Scan (`ALL`)?",
    shortAnswer: "Leading wildcards (`%text`) prevent the B+Tree from performing a root-to-leaf probe because the starting prefix character is unknown, forcing a full scan.",
    explanation: "B+Tree keys are sorted from left to right. Without a prefix, the search cannot determine which branch to traverse.",
    hint: "Leading wildcards break B+Tree prefix ordering.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE name LIKE '%Mitra'; -- Forces ALL"
  },
  {
    question: "Does `WHERE student_name LIKE 'Mitra%'` use an Index Range Scan?",
    shortAnswer: "Yes! Trailing wildcards have a fixed prefix ('Mitra'), allowing the B+Tree to probe the lower bound ('Mitra') and scan until the prefix changes ('Mitr`').",
    explanation: "MySQL treats `LIKE 'Mitra%'` identically to `WHERE student_name >= 'Mitra' AND student_name < 'Mitr\xFF'`.",
    hint: "Fixed prefix allows B+Tree range probe.",
    level: "basic",
    codeExample: "EXPLAIN SELECT * FROM students WHERE name LIKE 'Mitra%';"
  },
  {
    question: "What happens to the access type when an index column is wrapped in a function (e.g. `WHERE YEAR(created_at) = 2026`)?",
    shortAnswer: "It degrades from an efficient `range` or `ref` to a slow `index` (full index scan) or `ALL` (full table scan) because the engine cannot use B+Tree key comparisons directly.",
    explanation: "Functions must be computed on every single row before filtering. Use sargable bounds instead: `WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'`.",
    hint: "Function wrapping destroys sargability, preventing range probes.",
    level: "basic",
    codeExample: "WHERE created_at >= '2026-01-01' AND created_at < '2027-01-01' -- Sargable range!"
  },
  {
    question: "What is the difference between `range` and `index_merge` access types?",
    shortAnswer: "`range` scans a single index; `index_merge` scans multiple independent indexes simultaneously (e.g., for `WHERE col_a = 1 OR col_b = 2`) and merges their row IDs in memory.",
    explanation: "Index merge uses union, intersection, or sort-union algorithms to combine row pointers from multiple separate B+Trees before fetching table rows.",
    hint: "index_merge uses multiple single-column indexes together.",
    level: "expert"
  },
  {
    question: "How does implicit type conversion cause an unexpected Full Table Scan (`ALL`)?",
    shortAnswer: "If a `VARCHAR` column is queried with an integer literal (`WHERE phone = 9830012345`), MySQL converts every stored string column to a number via `CAST()`, destroying index range access.",
    explanation: "MySQL string-to-number comparison rules require converting the column rather than the constant, disabling the index.",
    hint: "String column compared against integer forces CAST() on every row.",
    level: "basic",
    codeExample: "WHERE phone = '9830012345' -- Quoted string preserves index ref/range!"
  },
  {
    question: "What is the access type for `SELECT * FROM students WHERE id IN (10, 25, 30)` on a Primary Key?",
    shortAnswer: "`type = 'range'` (Index Range Scan using multiple point lookups / in-list range comparison).",
    explanation: "In MySQL, `IN (...)` list evaluation on indexed columns is executed as an index range scan with multiple equality bounds (index dive or index statistics).",
    hint: "IN list on indexed column executes as range scan.",
    level: "basic"
  },
  {
    question: "What are 'Index Dives' in MySQL range estimation?",
    shortAnswer: "Index Dives are quick probes down the B+Tree to estimate exact row counts for each value in an `IN (...)` list or range condition before query execution.",
    explanation: "Controlled by `eq_range_index_dive_limit`. When the list length exceeds this limit, MySQL falls back to index statistics cardinality estimates.",
    hint: "Probing B+Tree to count rows in range intervals before execution.",
    level: "expert"
  },
  {
    question: "How does Buffer Pool memory pollution occur during a massive Full Table Scan?",
    shortAnswer: "A full scan loads millions of cold data pages into the InnoDB Buffer Pool, potentially evicting frequently used (hot) cached pages from the LRU list.",
    explanation: "InnoDB uses a midpoint insertion strategy (`innodb_old_blocks_time`) to protect the young LRU sublist from being flushed by one-time full table scans.",
    hint: "Cold pages flush hot application data from InnoDB LRU buffer memory.",
    level: "expert"
  },
  {
    question: "What is the ranking of access types in order of best performance to worst performance?",
    shortAnswer: "`system` > `const` > `eq_ref` > `ref` > `fulltext` > `ref_or_null` > `index_merge` > `unique_subquery` > `index_subquery` > `range` > `index` > `ALL`.",
    explanation: "The official MySQL execution engine hierarchy ranking access paths by estimated physical cost and CPU overhead.",
    hint: "const is best, range is middle-tier, ALL is slowest.",
    level: "basic"
  },
  {
    question: "Can an `ORDER BY` clause be satisfied by an `Index Scan` without `filesort`?",
    shortAnswer: "Yes! If the `ORDER BY` columns match the leading index key sequence, MySQL reads the rows in natural B+Tree sorted order, eliminating `Using filesort`.",
    explanation: "Since B+Tree leaf pages are physically ordered by key values, reading index pages sequentially produces already-sorted records.",
    hint: "Index leaf nodes are pre-sorted.",
    level: "basic"
  },
  {
    question: "What does `type = 'ref_or_null'` mean?",
    shortAnswer: "It is similar to `ref`, but MySQL performs an additional search for `NULL` values in the index after searching for the specified constant value.",
    explanation: "Commonly seen in queries with `WHERE col = 'value' OR col IS NULL`.",
    hint: "ref lookup plus an additional search for NULL index entries.",
    level: "moderate"
  },
  {
    question: "Why is a `range` scan on a composite index `(city, age, gpa)` restricted if `city` is a range (e.g. `city > 'B'`)?",
    shortAnswer: "Because once a column uses a range inequality (`>`), subsequent columns in the composite index (`age`, `gpa`) cannot be used for B+Tree range narrowing.",
    explanation: "Leftmost prefix rule dictates that index sorting applies to subsequent columns only when preceding columns are exact equality matches (`=`).",
    hint: "Inequality operator stops composite index B+Tree filtering for later columns.",
    level: "expert"
  },
  {
    question: "How do you force MySQL to test an Index Range Scan instead of a Full Table Scan?",
    shortAnswer: "By adding the optimizer hint `FORCE INDEX (index_name)` in the query: `SELECT * FROM students FORCE INDEX (idx_city) WHERE city = 'Barrackpore'`.",
    explanation: "`FORCE INDEX` tells the optimizer that a table scan is prohibitively expensive, compelling it to use the named index unless impossible.",
    hint: "Use FORCE INDEX hint to override optimizer scan choices.",
    level: "basic",
    codeExample: "SELECT * FROM students FORCE INDEX (idx_city) WHERE city = 'Barrackpore';"
  },
  {
    question: "What metric in `EXPLAIN ANALYZE` confirms whether a Range Scan was faster than a Table Scan?",
    shortAnswer: "The actual execution time (`actual time=...`) and total rows fetched/loops (`rows=... loops=1`) reported by the iterator engine.",
    explanation: "EXPLAIN ANALYZE provides real millisecond measurements of storage engine iterator calls, verifying whether index seeks saved I/O over table scanning.",
    hint: "Actual time and row count metrics in EXPLAIN ANALYZE.",
    level: "moderate"
  },
  {
    question: "What is an 'Index Skip Scan' in MySQL 8.0?",
    shortAnswer: "A feature where MySQL can use a composite index `(col_a, col_b)` to satisfy a range query on `col_b` even when `col_a` is not specified in the `WHERE` clause.",
    explanation: "The engine skips through distinct values of `col_a` and performs a sub-range scan on `col_b` for each distinct `col_a` value.",
    hint: "Skips through distinct prefix keys to perform range scans on non-prefix columns.",
    level: "expert"
  },
  {
    question: "What is the primary takeaway for junior database developers regarding Table Scan vs Const Lookup?",
    shortAnswer: "Always design tables and queries so high-frequency transactional queries resolve as `const`, `eq_ref`, `ref`, or `range`, reserving `ALL` only for intentional full-table batch exports or tiny lookup dictionaries.",
    explanation: "In high-concurrency systems, table scans cause CPU spikes, buffer page churn, and row locking contentions, severely limiting throughput.",
    hint: "Target const, eq_ref, ref, and range for OLTP; eliminate ALL on large tables.",
    level: "basic"
  }
];

export default questions;
