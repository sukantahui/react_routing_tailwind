// topic6_files/topic6_questions.js

const questions = [
  {
    question: "What is the primary objective of the Segment 2 Practical Assessment?",
    shortAnswer: "To test comprehensive end-to-end proficiency across 3NF schema design, complex multi-table SQL query writing, query performance profiling with EXPLAIN, and transactional concurrency control.",
    explanation: "Synthesizes theoretical normalization and practical enterprise database engineering.",
    hint: "Evaluates schema design, analytical queries, performance profiling, and concurrency.",
    level: "basic"
  },
  {
    question: "In the exam schema design section, what is the most common reason for losing points?",
    shortAnswer: "Failing to separate abstract entity metadata from physical inventory items (e.g. putting barcodes on the books table instead of a separate book_items table).",
    explanation: "Violates fundamental relational modeling principles.",
    hint: "Conflating abstract entity metadata with physical item instances.",
    level: "basic"
  },
  {
    question: "How should a student resolve a Many-to-Many ($M:N$) relationship between Students and Clubs during the exam?",
    shortAnswer: "Create a junction bridge table `student_clubs` with a composite Primary Key `(student_id, club_id)` and two Foreign Keys.",
    explanation: "Standard resolution of Many-to-Many relationships into two 1:N links.",
    hint: "Create a junction table with a composite primary key.",
    level: "basic"
  },
  {
    question: "In the SQL query section, how do you handle calculating running cumulative revenue without grouping rows?",
    shortAnswer: "`SUM(amount) OVER (PARTITION BY branch_id ORDER BY payment_date ASC ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`",
    explanation: "Uses window aggregation to accumulate values along an ordering axis.",
    hint: "SUM(amount) OVER (PARTITION BY branch_id ORDER BY payment_date ASC)",
    level: "moderate"
  },
  {
    question: "Why does the exam test both `RANK()` and `DENSE_RANK()`?",
    shortAnswer: "To verify if the student understands how duplicate values affect contiguous rank sequences in academic and sports leaderboards.",
    explanation: "RANK produces gaps on ties (1, 2, 2, 4); DENSE_RANK produces continuous ranks (1, 2, 2, 3).",
    hint: "DENSE_RANK avoids rank gaps on ties; RANK creates gaps.",
    level: "moderate"
  },
  {
    question: "How do you calculate Month-over-Month growth percentage in a single query?",
    shortAnswer: "Use a CTE to calculate monthly revenue, then compute `((current - LAG(current)) / LAG(current)) * 100` in the outer query.",
    explanation: "Combines Common Table Expressions with the LAG() window function.",
    hint: "CTE + LAG() window function.",
    level: "moderate"
  },
  {
    question: "In the performance optimization section, what is the first step to take when given a slow query?",
    shortAnswer: "Execute `EXPLAIN` or `EXPLAIN ANALYZE` to inspect access types, row count estimates, and the `Extra` column for `Using filesort` or `Using temporary`.",
    explanation: "Diagnoses the exact physical execution bottleneck before proposing changes.",
    hint: "Run EXPLAIN ANALYZE to inspect access types and bottlenecks.",
    level: "basic"
  },
  {
    question: "How do you fix a non-SARGable query `WHERE SUBSTRING(phone, 1, 3) = '983'`?",
    shortAnswer: "Refactor to `WHERE phone LIKE '983%'` to allow the B-Tree index to perform a direct range seek.",
    explanation: "Trailing wildcards in LIKE expressions are SARGable.",
    hint: "WHERE phone LIKE '983%'",
    level: "moderate"
  },
  {
    question: "What is the formula for ordering columns in a multi-column composite index?",
    shortAnswer: "`(Equality columns, Range filter columns, ORDER BY sorting columns)`.",
    explanation: "Maximizes index selectivity and eliminates in-memory filesort operations.",
    hint: "(Equality, Range, Sort) formula.",
    level: "expert"
  },
  {
    question: "How do you achieve a 'Covering Index' (`Using index`) in MySQL?",
    shortAnswer: "Ensure all columns requested in the `SELECT`, `WHERE`, `JOIN`, and `ORDER BY` clauses are present in the secondary B-Tree index.",
    explanation: "Completely avoids reading physical clustered index data pages.",
    hint: "Include all query columns in the secondary B-Tree index.",
    level: "moderate"
  },
  {
    question: "In the concurrency section, why is `SELECT ... FOR UPDATE` required during appointment booking?",
    shortAnswer: "To acquire an exclusive row lock, preventing concurrent transactions from overbooking the last available consultation slot.",
    explanation: "Pessimistic locking prevents race condition double-bookings.",
    hint: "Acquires an exclusive lock to prevent concurrent double-booking.",
    level: "expert"
  },
  {
    question: "What is the 'Price-Drift Trap' in invoice schema design?",
    shortAnswer: "Failing to store a unit price snapshot on `order_items`, causing historical sales revenue to change whenever catalog prices update.",
    explanation: "Historical accounting records must be immutable.",
    hint: "Failing to store an immutable unit price snapshot on the order line.",
    level: "basic"
  },
  {
    question: "How do you verify if a decomposed schema satisfies Lossless-Join property?",
    shortAnswer: "Verify that the intersection of the two decomposed relation schemas is a superkey for at least one of the decomposed tables.",
    explanation: "Mathematical theorem for lossless decomposition.",
    hint: "Intersection of schemas must be a superkey for at least one decomposed table.",
    level: "expert"
  },
  {
    question: "What is the purpose of `WITH ROLLUP` in executive management queries?",
    shortAnswer: "It generates hierarchical subtotals and grand totals in a single query pass without requiring multiple separate queries.",
    explanation: "Efficiently calculates multi-level summary reports.",
    hint: "Generates hierarchical subtotals and grand totals.",
    level: "moderate"
  },
  {
    question: "What is the difference between `COALESCE` and `IFNULL` in MySQL?",
    shortAnswer: "`IFNULL` accepts exactly 2 arguments; `COALESCE` is ANSI SQL compliant and accepts $N$ arguments, returning the first non-null value.",
    explanation: "COALESCE is standard and flexible across all relational engines.",
    hint: "COALESCE accepts arbitrary number of arguments and is ANSI standard.",
    level: "basic"
  },
  {
    question: "How do you write a query to find all students who have NEVER missed a fee installment?",
    shortAnswer: "Use `NOT EXISTS` or `LEFT JOIN fee_payments ... WHERE p.payment_status = 'OVERDUE'` filtering for zero overdue records.",
    explanation: "Relational anti-join pattern.",
    hint: "NOT EXISTS or LEFT JOIN checking for absence of overdue payments.",
    level: "moderate"
  },
  {
    question: "What index is optimal for `SELECT student_id FROM enrollments WHERE status = 'ACTIVE' ORDER BY enrolled_date DESC LIMIT 10`?",
    shortAnswer: "A composite index on `enrollments (status, enrolled_date DESC, student_id)`.",
    explanation: "Provides exact filtering, physical sorting, and covering index projection.",
    hint: "INDEX (status, enrolled_date DESC, student_id)",
    level: "expert"
  },
  {
    question: "Why should `ON DELETE CASCADE` be used with extreme caution on financial ledgers?",
    shortAnswer: "Because accidentally deleting a parent customer or student would permanently delete financial payment audit trails required for accounting compliance.",
    explanation: "Financial ledgers should use `ON DELETE RESTRICT`.",
    hint: "Can cause catastrophic accidental deletion of financial audit trails.",
    level: "moderate"
  },
  {
    question: "What check constraint ensures a student cannot enroll with an invalid negative tuition fee?",
    shortAnswer: "`CHECK (tuition_fee_inr >= 0.00)`",
    explanation: "Enforces non-negative monetary values directly at the engine level.",
    hint: "CHECK (tuition_fee_inr >= 0.00)",
    level: "basic"
  },
  {
    question: "What is the role of `EXPLAIN FORMAT=TREE` in query analysis?",
    shortAnswer: "It displays the physical execution tree showing iterator nesting, join order, table scans, and index seek loops.",
    explanation: "Provides visual insight into iterator execution order.",
    hint: "Shows iterator tree nesting and execution steps.",
    level: "expert"
  },
  {
    question: "How do student exam projects for Mamata, Susmita, Abhronila, and Debangshu illustrate assessment grading?",
    shortAnswer: "By synthesizing normalized 3NF schemas, generating scholarship rank matrices, and optimizing queries with covering indexes to achieve sub-millisecond latency.",
    explanation: "Comprehensive student capstone evaluation.",
    hint: "Synthesizes schema design, analytical queries, and index optimization.",
    level: "basic"
  },
  {
    question: "How do you detect invisible indexes in a MySQL schema?",
    shortAnswer: "Query `information_schema.STATISTICS WHERE IS_VISIBLE = 'NO'` or run `SHOW INDEX FROM table_name;`.",
    explanation: "Displays indexes hidden from the query optimizer.",
    hint: "Query information_schema.STATISTICS WHERE IS_VISIBLE = 'NO'.",
    level: "moderate"
  },
  {
    question: "What is the difference between `UNION` and `UNION ALL`?",
    shortAnswer: "`UNION` removes duplicate rows by performing an internal sort/hash (expensive); `UNION ALL` concatenates result sets directly without deduplication (much faster).",
    explanation: "Use UNION ALL when results are known to be disjoint.",
    hint: "UNION deduplicates (slow); UNION ALL concatenates directly (fast).",
    level: "basic"
  },
  {
    question: "Why is `WHERE YEAR(dob) = 2005` slower than `WHERE dob BETWEEN '2005-01-01' AND '2005-12-31'`?",
    shortAnswer: "The function call prevents the B-Tree index from seeking directly to the year boundary, forcing a full table scan on all rows.",
    explanation: "Classic non-SARGable predicate performance trap.",
    hint: "Function call prevents direct B-Tree range seek.",
    level: "basic"
  },
  {
    question: "What is the purpose of the `HAVING` clause in SQL?",
    shortAnswer: "To filter aggregated groups after the `GROUP BY` clause has executed (e.g. `HAVING COUNT(*) > 5`).",
    explanation: "WHERE filters rows before grouping; HAVING filters groups after grouping.",
    hint: "Filters aggregated groups after GROUP BY.",
    level: "basic"
  },
  {
    question: "How do you ensure data integrity when transferring money between two accounts in SQL?",
    shortAnswer: "Wrap the two `UPDATE` statements inside a `START TRANSACTION ... COMMIT` block with error handling to guarantee atomicity.",
    explanation: "ACID transactions guarantee all-or-nothing execution.",
    hint: "Wrap updates inside a transaction with START TRANSACTION and COMMIT.",
    level: "basic"
  },
  {
    question: "What is a 'Phantom Read' in database concurrency?",
    shortAnswer: "When a transaction reads a set of rows satisfying a condition, and a concurrent transaction inserts new rows matching that condition before the first transaction commits.",
    explanation: "Prevented by REPEATABLE READ (using Next-Key Locks in InnoDB) or SERIALIZABLE.",
    hint: "New rows appearing in a search query due to concurrent commits.",
    level: "expert"
  },
  {
    question: "Why should `SELECT *` be avoided in exam SQL query challenges?",
    shortAnswer: "It demonstrates poor optimization hygiene, transfers unnecessary data over the network, and prevents the optimizer from using Covering Indexes.",
    explanation: "Always project only the specific required columns.",
    hint: "Wastes I/O and network bandwidth, preventing covering index use.",
    level: "basic"
  },
  {
    question: "What is the maximum score achievable in the Segment 2 Capstone Exam?",
    shortAnswer: "100 Marks across Schema Design (25), Query Writing (30), Performance Profiling (25), and Concurrency (20).",
    explanation: "Complete multi-dimensional evaluation rubric.",
    hint: "100 Marks distributed across 4 core sections.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary advice for passing the Segment 2 Assessment?",
    shortAnswer: "Design schemas in strict 3NF with immutable price snapshots, write expressive analytical SQL using CTEs and window functions, profile queries with EXPLAIN ANALYZE, and protect concurrent workflows with ACID transactions.",
    explanation: "Comprehensive capstone success formula.",
    hint: "3NF + CTEs/Window Functions + EXPLAIN ANALYZE + ACID Concurrency.",
    level: "expert"
  }
];

export default questions;
