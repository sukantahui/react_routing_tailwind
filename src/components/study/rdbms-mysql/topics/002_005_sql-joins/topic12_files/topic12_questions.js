// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the 'Aggregate Fan-Out Bug' (Accidental Row Multiplication) in SQL joins?",
    shortAnswer: "A data inflation bug that occurs when joining a parent table to two or more independent 1:N child tables simultaneously, multiplying rows into a Cartesian sub-matrix and inflating `SUM()` and `COUNT()` totals.",
    explanation: "Standard definition of the aggregate fan-out bug.",
    hint: "Joining multiple 1:N child tables multiplies intermediate rows and inflates SUM/COUNT.",
    level: "basic"
  },
  {
    question: "If Customer A has 2 Orders (total ₹5,000) and 2 Payments (total ₹5,000), what total order amount does a naive multi-table join return?",
    shortAnswer: "₹10,000 (100% inflated because 2 orders × 2 payments = 4 intermediate rows).",
    explanation: "Classic aggregate fan-out calculation.",
    hint: "₹10,000 (doubled due to 2×2 row multiplication).",
    level: "basic"
  },
  {
    question: "How do you fix the Aggregate Fan-Out Bug in multi-table queries?",
    shortAnswer: "Pre-aggregate the child tables independently in Common Table Expressions (CTEs) or Derived Subqueries before joining them to the parent table.",
    explanation: "The standard architectural remedy for aggregate fan-out.",
    hint: "Pre-aggregate each child table in CTEs/subqueries before joining.",
    level: "basic"
  },
  {
    question: "What happens when you evaluate `NULL = NULL` in standard SQL comparison?",
    shortAnswer: "It evaluates to `UNKNOWN` (treated as FALSE in join conditions and WHERE clauses).",
    explanation: "Three-valued logic NULL evaluation.",
    hint: "Evaluates to UNKNOWN (FALSE).",
    level: "basic"
  },
  {
    question: "What operator in MySQL performs 'Null-Safe Equality' (returning TRUE if both values are NULL)?",
    shortAnswer: "The spaceship operator: `<=>` (e.g. `ON a.dept_id <=> b.dept_id`).",
    explanation: "MySQL null-safe equality operator.",
    hint: "<=> (spaceship operator).",
    level: "basic"
  },
  {
    question: "Explain why `SELECT * FROM students WHERE student_id NOT IN (SELECT student_id FROM enrollments);` returns 0 rows if enrollments contains a single NULL.",
    shortAnswer: "Because `x NOT IN (1, 2, NULL)` expands to `x != 1 AND x != 2 AND x != NULL`. Since `x != NULL` is `UNKNOWN`, the entire expression evaluates to `UNKNOWN`, returning 0 rows.",
    explanation: "The infamous NOT IN with NULL catastrophe.",
    hint: "x != NULL is UNKNOWN, causing the entire AND chain to evaluate to UNKNOWN.",
    level: "moderate"
  },
  {
    question: "What are the two safe alternatives to `NOT IN (subquery)` to avoid the NULL subquery bug?",
    shortAnswer: "1) `NOT EXISTS (SELECT 1 FROM ... WHERE ...)` or 2) `LEFT JOIN ... WHERE right_table.id IS NULL` (Anti-Join).",
    explanation: "Safe alternatives to NOT IN.",
    hint: "NOT EXISTS or LEFT JOIN with IS NULL.",
    level: "basic"
  },
  {
    question: "What is a 'Cartesian Explosion' in database systems?",
    shortAnswer: "An exponential multiplication of rows caused by missing join conditions or invalid cross joins, consuming server RAM and crashing the database.",
    explanation: "Definition of Cartesian explosion.",
    hint: "Exponential row multiplication from missing join conditions.",
    level: "basic"
  },
  {
    question: "If Table A has 10,000 rows and Table B has 10,000 rows, how many intermediate rows does an accidental cross join produce?",
    shortAnswer: "100,000,000 rows (100 Million Rows).",
    explanation: "10,000 × 10,000 = 100 Million.",
    hint: "100 Million rows.",
    level: "basic"
  },
  {
    question: "In MySQL, what server variable can be enabled to prevent accidental table updates or deletions without WHERE clauses?",
    shortAnswer: "`SET SQL_SAFE_UPDATES = 1;`",
    explanation: "MySQL safe updates setting.",
    hint: "SET SQL_SAFE_UPDATES = 1;",
    level: "moderate"
  },
  {
    question: "Why does `COUNT(column_name)` behave differently from `COUNT(*)` in an outer join?",
    shortAnswer: "`COUNT(*)` counts all rows including outer NULL rows, whereas `COUNT(column_name)` ignores NULL values and counts only non-null matches.",
    explanation: "COUNT(*) vs COUNT(column) on outer joins.",
    hint: "COUNT(*) counts NULL rows; COUNT(column) ignores NULLs.",
    level: "basic"
  },
  {
    question: "If a student has 0 enrollments, what does `COUNT(*)` return in a LEFT JOIN, and what does `COUNT(e.enrollment_id)` return?",
    shortAnswer: "`COUNT(*)` returns `1` (counting the outer student row), while `COUNT(e.enrollment_id)` returns `0` (correct enrollment count).",
    explanation: "Outer join count pitfall.",
    hint: "COUNT(*) returns 1; COUNT(e.id) returns 0.",
    level: "basic"
  },
  {
    question: "In academy management, calculate active enrollments per student safely using `COUNT()`.",
    shortAnswer: "`SELECT s.name, COUNT(e.enrollment_id) FROM students s LEFT JOIN enrollments e ON s.id = e.student_id GROUP BY s.id, s.name;`",
    explanation: "Safe counting on outer joins.",
    hint: "COUNT(e.enrollment_id) instead of COUNT(*).",
    level: "basic"
  },
  {
    question: "What is the danger of using comma joins like `FROM students, courses` in modern SQL?",
    shortAnswer: "It obscures join relationships and makes it easy to accidentally omit a join condition, triggering Cartesian explosions.",
    explanation: "Comma join syntax hazards.",
    hint: "Obscures join keys and easily causes forgotten join conditions.",
    level: "basic"
  },
  {
    question: "What happens if you join on a column with mismatched character collations (e.g. `utf8mb4_general_ci` vs `utf8mb4_bin`)?",
    shortAnswer: "MySQL cannot use index lookups and is forced to perform full table scans or throw 'Illegal mix of collations' Error 1267.",
    explanation: "Collation mismatch join failure.",
    hint: "Disables index lookups and causes Error 1267: Illegal mix of collations.",
    level: "moderate"
  },
  {
    question: "In payroll, why does joining `employees` to `bonuses` and `deductions` simultaneously produce false net salary totals?",
    shortAnswer: "Because multiple bonuses and multiple deductions cross-multiply each other, inflating both bonus and deduction aggregate sums.",
    explanation: "Payroll multi-table fan-out bug.",
    hint: "Bonuses and deductions cross-multiply, inflating totals.",
    level: "basic"
  },
  {
    question: "How can you detect Cartesian explosions in an execution plan using `EXPLAIN`?",
    shortAnswer: "Look for join `type: ALL` on multiple tables with high `rows` counts and `Extra: Using join buffer (hash join / block nested loop)` with no key used.",
    explanation: "Detecting Cartesian explosions via EXPLAIN.",
    hint: "type: ALL, high row estimates, no key used, Using join buffer.",
    level: "moderate"
  },
  {
    question: "What is 'Outer Join Elimination' performed by the MySQL query optimizer?",
    shortAnswer: "The optimizer automatically converts a `LEFT JOIN` into an `INNER JOIN` when the `WHERE` clause filters out NULL values from the right table.",
    explanation: "Outer Join Elimination mechanics.",
    hint: "Optimizer converting LEFT JOIN to INNER JOIN due to NULL-rejecting WHERE filters.",
    level: "expert"
  },
  {
    question: "Why should you never use `DISTINCT` as a quick band-aid fix for the Aggregate Fan-Out Bug?",
    shortAnswer: "Because `COUNT(DISTINCT amount)` or `SUM(DISTINCT amount)` incorrectly eliminates legitimate duplicate values (e.g. two separate orders of ₹500 each will only be counted once as ₹500!).",
    explanation: "Why DISTINCT is a dangerous band-aid for join fan-out.",
    hint: "DISTINCT deletes legitimate duplicate prices and values.",
    level: "basic"
  },
  {
    question: "In hospital billing, how do you correctly calculate a patient's total prescription cost AND total doctor visit fee?",
    shortAnswer: "Pre-aggregate prescriptions by `patient_id` in CTE 1, pre-aggregate doctor visits in CTE 2, and join both CTEs to `patients`.",
    explanation: "CTE pre-aggregation pattern for medical billing.",
    hint: "Use two separate pre-aggregating CTEs joined to patients.",
    level: "basic"
  },
  {
    question: "What error occurs if you forget table aliases and join a table to itself?",
    shortAnswer: "ERROR 1066 (42000): Not unique table/alias.",
    explanation: "Duplicate table alias error.",
    hint: "Error 1066: Not unique table/alias.",
    level: "basic"
  },
  {
    question: "Can an accidental cross join in a subquery exhaust temporary disk storage in `/tmp`?",
    shortAnswer: "YES. Massive intermediate results will exceed `tmp_table_size` / `max_heap_table_size`, writing gigabytes of temporary data to disk until disk space runs out.",
    explanation: "Temporary disk table exhaustion.",
    hint: "Yes, spills to disk and exhausts temporary disk space.",
    level: "expert"
  },
  {
    question: "How does `COALESCE()` prevent NULL calculation bugs in financial joins?",
    shortAnswer: "By substituting `0` or fallback defaults for NULL values (e.g. `COALESCE(SUM(amount), 0)`), preventing arithmetic operations from resulting in NULL.",
    explanation: "Preventing NULL arithmetic errors.",
    hint: "Converts NULL to 0 in financial calculations.",
    level: "basic"
  },
  {
    question: "In warehouse inventory, what is the consequence of joining `products` to `locations` without `warehouse_id` in a multi-warehouse system?",
    shortAnswer: "Products in Warehouse A are accidentally joined to bins in Warehouse B, creating phantom stock allocations.",
    explanation: "Missing composite key join condition.",
    hint: "Creates phantom stock across different warehouses.",
    level: "moderate"
  },
  {
    question: "What is a 'Many-to-Many Fan-Out Explosion'?",
    shortAnswer: "Joining two tables on a non-unique foreign key where multiple rows exist on both sides, causing $M \\times N$ tuple proliferation per key value.",
    explanation: "M:N join cardinality explosion.",
    hint: "M × N multiplication per key on non-unique join columns.",
    level: "moderate"
  },
  {
    question: "How does MySQL 8.0 Window Functions provide an alternative to CTE pre-aggregation for fan-out queries?",
    shortAnswer: "By calculating window aggregates (e.g. `SUM(amount) OVER (PARTITION BY customer_id)`) within single-table scans before joining.",
    explanation: "Window function partitioning alternative.",
    hint: "Using SUM() OVER (PARTITION BY id).",
    level: "moderate"
  },
  {
    question: "In e-commerce, why does `orders LEFT JOIN shipments ON orders.id = shipments.order_id` cause duplicated order totals if an order has split shipments?",
    shortAnswer: "Because multiple shipment rows duplicate the parent order row, doubling or tripling the order total when summed.",
    explanation: "Split shipment duplicate row fan-out.",
    hint: "Split shipments duplicate the order row in the result set.",
    level: "basic"
  },
  {
    question: "Why should developers set statement timeout limits (`max_execution_time`) on read-only reporting queries?",
    shortAnswer: "To automatically kill runaway Cartesian join queries before they lock up production database server resources.",
    explanation: "Statement timeout safeguards.",
    hint: "Automatically aborts runaway join queries to protect the server.",
    level: "moderate"
  },
  {
    question: "What query rewrite rule must be followed when migrating from `NOT IN` to `NOT EXISTS`?",
    shortAnswer: "Add a correlated predicate inside the subquery: `WHERE NOT EXISTS (SELECT 1 FROM child WHERE child.foreign_key = parent.primary_key)`.",
    explanation: "Correlated subquery rewrite for NOT EXISTS.",
    hint: "Add correlated predicate child.fk = parent.pk inside NOT EXISTS.",
    level: "basic"
  },
  {
    question: "What is the ultimate takeaway for database engineers regarding Join Pitfalls?",
    shortAnswer: "Never join multiple 1:N child tables without pre-aggregating in CTEs, never rely on `DISTINCT` to patch fan-out bugs, use `<=>` for NULL matches, replace `NOT IN` with `NOT EXISTS` or anti-joins, and always enforce explicit ANSI `JOIN ... ON` syntax.",
    explanation: "Final summary conclusion for Topic 12 in Module 5.",
    hint: "Pre-aggregate 1:N children in CTEs, avoid NOT IN with NULLs, use <=> for NULL comparisons, and write explicit ANSI joins.",
    level: "basic"
  }
];

export default questions;
