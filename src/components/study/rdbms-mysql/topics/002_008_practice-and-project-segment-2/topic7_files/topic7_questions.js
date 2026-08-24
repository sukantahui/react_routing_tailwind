// topic7_files/topic7_questions.js

const questions = [
  {
    question: "What is the primary objective of the Solution Walkthrough and Best Practice Architectural Guide?",
    shortAnswer: "To synthesize all core patterns learned across Segment 2 into a cohesive enterprise architectural framework covering 3NF design, query tuning, and concurrency.",
    explanation: "Consolidates all Segment 2 design patterns into an actionable blueprint.",
    hint: "Consolidates all Segment 2 patterns into an actionable engineering blueprint.",
    level: "basic"
  },
  {
    question: "What is the universal rule for separating abstract titles from physical inventory items?",
    shortAnswer: "Store title/product catalog metadata (ISBN, SKU, description) in a master table, and individual physical items (barcodes, serial numbers, shelf locations) in a child inventory table.",
    explanation: "Enables multiple physical copies of the same catalog item without data redundancy.",
    hint: "Catalog metadata in master table; physical serials/barcodes in child table.",
    level: "basic"
  },
  {
    question: "Why should `unit_price_at_sale` be permanently frozen on sales invoice lines?",
    shortAnswer: "To prevent price-drift: if catalog product prices update in the future, past sales invoices and tax filings must remain historically accurate and immutable.",
    explanation: "Financial accounting integrity requires immutable transaction snapshots.",
    hint: "Preserves immutable historical transaction prices against future catalog changes.",
    level: "basic"
  },
  {
    question: "What is the recommended composite index column ordering formula for multi-column indexes?",
    shortAnswer: "`(Equality filter columns, Range filter columns, ORDER BY sorting columns)`.",
    explanation: "Maximizes B-Tree selectivity while eliminating filesort memory buffers.",
    hint: "(Equality, Range, Sort) formula.",
    level: "expert"
  },
  {
    question: "How do you achieve a 100% Covering Index (`Using index`) in MySQL?",
    shortAnswer: "Include every column requested in the SELECT, WHERE, and ORDER BY clauses within the secondary B-Tree index, bypassing clustered index lookups.",
    explanation: "Eliminates secondary-to-clustered bookmark seek round trips.",
    hint: "Include all requested columns in the secondary index B-Tree.",
    level: "moderate"
  },
  {
    question: "What is the purpose of `DENSE_RANK()` over `RANK()` in academic leaderboards?",
    shortAnswer: "`DENSE_RANK()` assigns contiguous sequential ranks without gaps on ties (e.g. 1, 2, 2, 3), ensuring consistent reward tiers.",
    explanation: "Prevents rank number skips when duplicate scores occur.",
    hint: "DENSE_RANK leaves no gaps on score ties.",
    level: "basic"
  },
  {
    question: "How does `LAG(col, 1, 0)` simplify Month-over-Month growth calculations?",
    shortAnswer: "It retrieves the prior month's value directly from the preceding row within the partition without requiring expensive self-joins.",
    explanation: "Simplifies period-over-period financial reporting.",
    hint: "Retrieves previous row value without self-joins.",
    level: "basic"
  },
  {
    question: "What is the benefit of `GROUP BY ... WITH ROLLUP`?",
    shortAnswer: "It computes multi-level hierarchical subtotals and grand totals in a single table scan pass, much faster than multiple UNION ALL queries.",
    explanation: "Optimizes super-aggregate analytical queries.",
    hint: "Generates hierarchical subtotals in a single pass.",
    level: "moderate"
  },
  {
    question: "Why should you use `COALESCE()` on grouping columns with `WITH ROLLUP`?",
    shortAnswer: "Because ROLLUP outputs `NULL` for subtotal and grand total rows; `COALESCE()` replaces `NULL` with descriptive labels like 'Subtotal' or 'Grand Total'.",
    explanation: "Produces clean, human-readable executive financial reports.",
    hint: "Replaces rollup NULL values with human-readable labels.",
    level: "basic"
  },
  {
    question: "What is the danger of writing non-SARGable WHERE predicates like `WHERE YEAR(created_at) = 2026`?",
    shortAnswer: "Applying a function to an indexed column prevents B-Tree index seeks, forcing MySQL to perform a slow Full Table Scan ($O(N)$).",
    explanation: "Function calls on columns blind the query optimizer.",
    hint: "Forces a slow full table scan by blinding the index.",
    level: "basic"
  },
  {
    question: "How do you refactor non-SARGable date functions for maximum speed?",
    shortAnswer: "`WHERE created_at >= '2026-01-01 00:00:00' AND created_at < '2027-01-01 00:00:00'`",
    explanation: "Enables an efficient logarithmic B-Tree range seek ($O(\\log N)$).",
    hint: "Use explicit date range boundaries.",
    level: "basic"
  },
  {
    question: "What does `EXPLAIN ANALYZE` provide over standard `EXPLAIN`?",
    shortAnswer: "It executes the query and measures actual runtime duration, loop iterations, and row counts rather than relying on static optimizer estimates.",
    explanation: "Reveals exact runtime performance bottlenecks.",
    hint: "Executes the query to measure actual runtime and loop counts.",
    level: "expert"
  },
  {
    question: "How does `SELECT ... FOR UPDATE` protect against race conditions in online booking systems?",
    shortAnswer: "It places an exclusive row lock on the inventory/schedule record until the transaction commits, preventing concurrent overbooking.",
    explanation: "Pessimistic locking guarantees atomic slot reservations.",
    hint: "Places exclusive row locks to prevent concurrent double-booking.",
    level: "expert"
  },
  {
    question: "Why should `ON DELETE RESTRICT` be used on master and financial tables?",
    shortAnswer: "To prevent accidental cascade deletion of historical financial transactions and audit ledgers required for legal compliance.",
    explanation: "Preserves critical business transaction history.",
    hint: "Protects historical transaction ledgers from accidental deletion.",
    level: "moderate"
  },
  {
    question: "What is an Invisible Index in MySQL 8.0+?",
    shortAnswer: "An index that is maintained during writes but hidden from the query optimizer, allowing safe testing before permanent deletion.",
    explanation: "Enables zero-risk index decommissioning.",
    hint: "Maintained on writes but hidden from the query optimizer for safe testing.",
    level: "moderate"
  },
  {
    question: "What is the Bill Kent mnemonic for Third Normal Form (3NF)?",
    shortAnswer: "'Every non-key attribute must provide a fact about the key (1NF), the whole key (2NF), and nothing but the key (3NF), so help me Codd.'",
    explanation: "The universal memory anchor for relational normalization.",
    hint: "The key, the whole key, and nothing but the key.",
    level: "basic"
  },
  {
    question: "How do you handle hierarchical categories (e.g. Electronics -> Laptops) in a 3NF schema?",
    shortAnswer: "Use a self-referencing Foreign Key: `parent_category_id INT NULL REFERENCES categories(category_id)`.",
    explanation: "Supports recursive category trees with unlimited depth.",
    hint: "Self-referencing foreign key on parent_category_id.",
    level: "moderate"
  },
  {
    question: "Why should `COUNT(*)` be preferred over `COUNT(column_name)` for simple row counting?",
    shortAnswer: "`COUNT(*)` counts all rows and allows MySQL to pick the smallest available secondary index, whereas `COUNT(column_name)` must inspect non-null values of that specific column.",
    explanation: "COUNT(*) is optimized at the engine level for faster row counting.",
    hint: "COUNT(*) is optimized to use the smallest index to count rows.",
    level: "moderate"
  },
  {
    question: "What is the difference between `UNION` and `UNION ALL`?",
    shortAnswer: "`UNION` removes duplicate rows by executing an internal sort/hash operation; `UNION ALL` concatenates streams directly without sorting.",
    explanation: "UNION ALL is significantly faster when deduplication is unnecessary.",
    hint: "UNION deduplicates via sorting; UNION ALL concatenates directly.",
    level: "basic"
  },
  {
    question: "How do you calculate a student's age accurately from their Date of Birth (`dob`)?",
    shortAnswer: "`TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)`",
    explanation: "Accurately handles leap years and exact birth months.",
    hint: "TIMESTAMPDIFF(YEAR, dob, CURRENT_DATE)",
    level: "basic"
  },
  {
    question: "What is an Anti-Join pattern in SQL?",
    shortAnswer: "A query using `LEFT JOIN ... WHERE right_table.id IS NULL` to find records in the left table with no matching counterpart in the right table.",
    explanation: "Finds inactive users, unissued books, or unpurchased products.",
    hint: "LEFT JOIN with WHERE right_id IS NULL to find unmatched records.",
    level: "moderate"
  },
  {
    question: "What is the difference between `WHERE` and `HAVING`?",
    shortAnswer: "`WHERE` filters individual rows before aggregation; `HAVING` filters aggregated group calculations after `GROUP BY`.",
    explanation: "HAVING is evaluated on aggregated results like `AVG(score) > 80`.",
    hint: "WHERE filters rows before grouping; HAVING filters aggregated groups.",
    level: "basic"
  },
  {
    question: "How do you check for unused indexes across a MySQL production instance?",
    shortAnswer: "Query `sys.schema_unused_indexes` to identify indexes that consume write I/O and RAM without serving read queries.",
    explanation: "Pruning unused indexes reduces write latency and saves memory.",
    hint: "Query sys.schema_unused_indexes.",
    level: "expert"
  },
  {
    question: "What is the consequence of having too many indexes on an OLTP table?",
    shortAnswer: "Severe Write Amplification ('Index Tax') on every INSERT/UPDATE/DELETE, causing disk I/O bottlenecks and memory bloat in the buffer pool.",
    explanation: "Every write must update every secondary B-Tree index.",
    hint: "Degrades write performance and causes buffer pool bloat.",
    level: "basic"
  },
  {
    question: "Why should `SELECT *` be avoided in production API queries?",
    shortAnswer: "It transfers unnecessary columns over the network and prevents the query optimizer from using fast Covering Indexes (`Using index`).",
    explanation: "Always project only the specific required columns.",
    hint: "Prevents covering index optimization and wastes network bandwidth.",
    level: "basic"
  },
  {
    question: "How do project implementations for Mamata, Susmita, Abhronila, and Debangshu demonstrate enterprise mastery?",
    shortAnswer: "By modeling 3NF normalized schemas across university library, hospital, and retail domains, achieving sub-millisecond query execution, and enforcing ACID concurrency.",
    explanation: "Comprehensive multi-domain capstone execution.",
    hint: "3NF schemas + sub-millisecond queries + ACID concurrency across domains.",
    level: "basic"
  },
  {
    question: "What is the role of Common Table Expressions (CTEs) in complex query engineering?",
    shortAnswer: "They break down complex multi-stage analytical queries into modular, readable named blocks (`WITH Step1 AS (...)`), replacing messy nested subqueries.",
    explanation: "Improves maintainability, debugging, and code readability.",
    hint: "Breaks complex queries into modular, readable named blocks.",
    level: "moderate"
  },
  {
    question: "What command refreshes InnoDB table cardinality statistics?",
    shortAnswer: "`ANALYZE TABLE table_name;`",
    explanation: "Samples index pages to ensure the query optimizer makes accurate cost decisions.",
    hint: "ANALYZE TABLE table_name;",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway from Segment 2 of the RDBMS MySQL course?",
    shortAnswer: "A high-performance database requires a harmonious triad: a 3NF normalized schema for write integrity, covering indexes for sub-millisecond reads, and ACID transactions for concurrency safety.",
    explanation: "The unified philosophy of enterprise database engineering.",
    hint: "3NF write integrity + covering index read speed + ACID concurrency safety.",
    level: "expert"
  },
  {
    question: "What is the senior architect's final advice to students graduating Segment 2?",
    shortAnswer: "Always think in sets, design with 3NF purity, protect historical financial snapshots, profile with EXPLAIN ANALYZE, and build systems that scale effortlessly under high concurrent load.",
    explanation: "Guiding principles for professional database architecture careers.",
    hint: "Think in sets, design in 3NF, profile with EXPLAIN ANALYZE, and protect concurrency.",
    level: "expert"
  }
];

export default questions;
