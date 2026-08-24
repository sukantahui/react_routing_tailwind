// topic3_files/topic3_questions.js

const questions = [
  {
    question: "What is the cardinality requirement for a subquery placed in the `SELECT` projection list?",
    shortAnswer: "It must be a SCALAR subquery returning exactly ONE row and ONE column per outer row.",
    explanation: "If it returns multiple rows, MySQL throws Error 1242 (Subquery returns more than 1 row).",
    hint: "Must be a scalar subquery returning 1 value per outer row.",
    level: "basic"
  },
  {
    question: "What is a Derived Table in SQL?",
    shortAnswer: "A subquery placed in the `FROM` clause that acts as a temporary inline virtual table for the outer query.",
    explanation: "Enables pre-aggregation and pre-filtering before joins.",
    hint: "A subquery inside the FROM clause acting as an inline virtual table.",
    level: "basic"
  },
  {
    question: "What error is triggered if a derived table in the `FROM` clause is omitted an alias in MySQL?",
    shortAnswer: "`Error 1248 (42000): Every derived table must have its own alias`.",
    explanation: "MySQL requires an explicit table alias so the outer query can qualify column names.",
    hint: "Error 1248: Every derived table must have its own alias.",
    level: "basic"
  },
  {
    question: "What is the difference between a subquery in `WHERE` vs a subquery in `HAVING`?",
    shortAnswer: "`WHERE` subqueries filter individual rows BEFORE grouping/aggregation; `HAVING` subqueries filter aggregated group calculations AFTER `GROUP BY` execution.",
    explanation: "WHERE operates at row-level; HAVING operates at group-level.",
    hint: "WHERE filters rows before aggregation; HAVING filters aggregated groups.",
    level: "basic"
  },
  {
    question: "What is the performance drawback of placing a correlated subquery in the `SELECT` list across 500,000 outer rows?",
    shortAnswer: "The database engine must execute 500,000 individual query lookups, generating massive CPU overhead and high latency.",
    explanation: "Rewriting as a `LEFT JOIN` with `GROUP BY` computes all aggregates in a single pass.",
    hint: "Executes 500,000 times; should be rewritten as a LEFT JOIN with GROUP BY.",
    level: "expert"
  },
  {
    question: "How do you rewrite a correlated `SELECT` count subquery as an efficient `LEFT JOIN`?",
    shortAnswer: "`SELECT s.id, s.name, COUNT(e.id) FROM students s LEFT JOIN enrollments e ON s.id = e.student_id GROUP BY s.id, s.name;`",
    explanation: "Replaces $N$ subquery executions with a single two-table hash or index join.",
    hint: "Use LEFT JOIN on the child table with GROUP BY on the parent primary key.",
    level: "expert"
  },
  {
    question: "What is 'Derived Table Merging' in MySQL 8.0+ query optimization?",
    shortAnswer: "An optimizer technique that unnests the derived table subquery directly into the outer query block, eliminating the creation of intermediate temporary tables.",
    explanation: "Allows the optimizer to join base tables directly.",
    hint: "Merges derived table into the outer query to avoid temporary table creation.",
    level: "expert"
  },
  {
    question: "What is 'Condition Pushdown' for derived tables in MySQL 8.0.22+?",
    shortAnswer: "An optimization where WHERE conditions in the outer query are pushed inside the derived table subquery before aggregation, reducing the volume of processed rows.",
    explanation: "Filters rows early before grouping in the derived table.",
    hint: "Pushes outer WHERE filters into the inner derived query before grouping.",
    level: "expert"
  },
  {
    question: "How do you write a derived table query to calculate the average of department student counts?",
    shortAnswer: "`SELECT AVG(dt.dept_student_count) FROM (SELECT dept_id, COUNT(*) AS dept_student_count FROM students GROUP BY dept_id) AS dt;`",
    explanation: "Calculates an aggregate of an aggregate using a derived table.",
    hint: "SELECT AVG(dt.count) FROM (SELECT COUNT(*) AS count ... GROUP BY ...) AS dt;",
    level: "moderate"
  },
  {
    question: "Why can't you write `SELECT AVG(COUNT(*)) FROM students GROUP BY dept_id;` directly?",
    shortAnswer: "Because SQL does not allow nesting aggregate functions directly (`AVG(COUNT(*))` is a syntax error); an intermediate derived table is required.",
    explanation: "Derived tables solve the aggregate-of-aggregate requirement cleanly.",
    hint: "Nested aggregates are invalid; requires an intermediate derived table.",
    level: "basic"
  },
  {
    question: "Can a derived table in the `FROM` clause be joined with other regular physical tables?",
    shortAnswer: "YES; derived tables can be joined with base tables or other derived tables using `INNER JOIN`, `LEFT JOIN`, or `CROSS JOIN`.",
    explanation: "Derived tables function exactly like physical tables during join processing.",
    hint: "Yes, derived tables can be joined with base tables using standard JOIN syntax.",
    level: "basic"
  },
  {
    question: "What is a Lateral Derived Table (`LATERAL`) in MySQL 8.0.14+?",
    shortAnswer: "A derived table preceded by the `LATERAL` keyword that is permitted to reference columns of preceding tables in the same `FROM` clause.",
    explanation: "Allows correlated subqueries inside the FROM clause.",
    hint: "A derived table that can reference columns from preceding tables in the FROM clause.",
    level: "expert"
  },
  {
    question: "How do you find all departments whose average exam score exceeds the academy-wide average using a subquery in `HAVING`?",
    shortAnswer: "`SELECT dept_id, AVG(exam_score_pct) AS avg_score FROM students GROUP BY dept_id HAVING AVG(exam_score_pct) > (SELECT AVG(exam_score_pct) FROM students);`",
    explanation: "Filters grouped departments against the scalar academy average in HAVING.",
    hint: "GROUP BY dept_id HAVING AVG(score) > (SELECT AVG(score) FROM students)",
    level: "moderate"
  },
  {
    question: "What happens if a scalar subquery in the `SELECT` list returns zero rows for a specific outer row?",
    shortAnswer: "The projected column value for that row evaluates to `NULL`.",
    explanation: "Wrap with `COALESCE()` if a fallback default like 0 or 'N/A' is desired.",
    hint: "Evaluates to NULL for that specific row.",
    level: "basic"
  },
  {
    question: "How do you project total fee payments per student using a subquery in `SELECT` with `COALESCE`?",
    shortAnswer: "`SELECT s.student_name, (SELECT COALESCE(SUM(amount_paid_inr), 0.00) FROM fee_payments p JOIN enrollments e ON p.enrollment_id = e.enrollment_id WHERE e.student_id = s.student_id) AS total_paid FROM students s;`",
    explanation: "Ensures students with 0 payments display 0.00 instead of NULL.",
    hint: "Wrap SUM in COALESCE to return 0.00 instead of NULL.",
    level: "moderate"
  },
  {
    question: "Can a subquery in the `WHERE` clause contain an `ORDER BY` and `LIMIT` clause?",
    shortAnswer: "YES; for example, `WHERE score = (SELECT score FROM scores ORDER BY score DESC LIMIT 1)`.",
    explanation: "Useful for selecting extreme or bounded values.",
    hint: "Yes, ORDER BY with LIMIT 1 is valid in scalar WHERE subqueries.",
    level: "basic"
  },
  {
    question: "What is the difference between a derived table in `FROM` and a Common Table Expression (CTE)?",
    shortAnswer: "A derived table is defined inline inside the `FROM` clause and cannot be referenced multiple times; a CTE is defined once at the query header (`WITH`) and can be referenced repeatedly.",
    explanation: "CTEs offer superior reusability and readability over derived tables.",
    hint: "CTEs are defined at the top and can be reused; derived tables are inline and single-use.",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `SELECT` vs `FROM` subqueries?",
    shortAnswer: "By projecting active course counts in the `SELECT` list (`SELECT name, (SELECT COUNT(*) ...)`) vs pre-aggregating branch performance metrics in a `FROM` derived table.",
    explanation: "Demonstrates practical clause selection based on query intent.",
    hint: "SELECT subqueries compute per-row attributes; FROM derived tables pre-aggregate sets.",
    level: "basic"
  },
  {
    question: "What is the consequence of omitting column aliases inside a derived table when outer queries reference those columns?",
    shortAnswer: "If computed expressions (e.g. `COUNT(*)`) are not aliased inside the derived table, the outer query cannot reference them cleanly, resulting in syntax errors.",
    explanation: "Always assign clear column aliases inside derived table subqueries.",
    hint: "Computed columns without aliases cannot be referenced by the outer query.",
    level: "basic"
  },
  {
    question: "Can a derived table subquery contain a `UNION` or `UNION ALL` operation?",
    shortAnswer: "YES; derived tables can encapsulate complex `UNION` queries, presenting a unified virtual dataset to the outer query block.",
    explanation: "Encapsulates set union logic cleanly.",
    hint: "Yes, derived tables can contain UNION operations with an alias.",
    level: "moderate"
  },
  {
    question: "What does `EXPLAIN` show for a derived table in the `FROM` clause?",
    shortAnswer: "`select_type = DERIVED` and `table = <derivedN>` in the execution plan.",
    explanation: "Indicates that an inline derived table was evaluated or materialized.",
    hint: "Shows select_type = DERIVED in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "How do you write a query to find the department with the highest total student enrollment using a derived table?",
    shortAnswer: "`SELECT dt.dept_id, dt.total_students FROM (SELECT dept_id, COUNT(*) AS total_students FROM students GROUP BY dept_id) AS dt ORDER BY dt.total_students DESC LIMIT 1;`",
    explanation: "Pre-aggregates in derived table, then sorts and limits in outer query.",
    hint: "Aggregate in derived table, then sort and LIMIT 1 in outer query.",
    level: "moderate"
  },
  {
    question: "Why should `SELECT *` be avoided inside derived table subqueries in production?",
    shortAnswer: "It forces the engine to materialize all columns of the underlying tables into temporary memory, consuming unnecessary RAM buffer space.",
    explanation: "Project only the required columns inside derived tables.",
    hint: "Wastes RAM buffer space by materializing unnecessary columns.",
    level: "basic"
  },
  {
    question: "Can you perform an `UPDATE` on a physical table by joining with a derived table subquery in MySQL?",
    shortAnswer: "YES; `UPDATE students s JOIN (SELECT dept_id, AVG(score) AS avg_s FROM students GROUP BY dept_id) AS dt ON s.dept_id = dt.dept_id SET s.dept_benchmark = dt.avg_s;`",
    explanation: "Allowed because the derived table is evaluated as a materialized temporary table.",
    hint: "Yes, multi-table UPDATE joining against a derived table is valid in MySQL.",
    level: "expert"
  },
  {
    question: "What is the restriction on modifying a table in a subquery while deleting from that same table?",
    shortAnswer: "Direct subquery deletion fails with Error 1093, but wrapping the subquery in a derived table (`(SELECT * FROM (SELECT ...) AS tmp)`) allows it to succeed.",
    explanation: "The derived table materializes data into a temporary buffer, bypassing the table lock.",
    hint: "Wrapping subquery in a derived table bypasses Error 1093.",
    level: "expert"
  },
  {
    question: "What index optimizes queries where the `WHERE` clause filters on `WHERE dept_id = (SELECT dept_id ...)`?",
    shortAnswer: "A secondary B-Tree index on `students(dept_id)`.",
    explanation: "Allows the outer query to perform a direct index seek matching the scalar dept_id.",
    hint: "B-Tree index on the filtered column in the outer table.",
    level: "moderate"
  },
  {
    question: "How do you calculate the difference between each student's exam score and the global average score?",
    shortAnswer: "`SELECT student_name, exam_score_pct, (exam_score_pct - (SELECT AVG(exam_score_pct) FROM students)) AS score_variance FROM students;`",
    explanation: "Uses a scalar subquery directly in arithmetic expressions in the SELECT list.",
    hint: "score - (SELECT AVG(score) FROM students) in the SELECT list.",
    level: "basic"
  },
  {
    question: "How does the optimizer handle multiple identical non-correlated subqueries in a single query?",
    shortAnswer: "MySQL evaluates the subquery once, caches the result in query memory, and reuses the cached value across all identical subquery instances.",
    explanation: "Optimizer caching avoids redundant evaluations.",
    hint: "Evaluates once and caches the result for identical subquery instances.",
    level: "expert"
  },
  {
    question: "What check constraint ensures derived table column names do not collide with outer table columns?",
    shortAnswer: "Explicit table aliasing and qualified column projection (`dt.column_name vs base.column_name`).",
    explanation: "Eliminates ambiguous column reference errors.",
    hint: "Qualify columns using explicit table aliases.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for subqueries across SELECT, FROM, and WHERE?",
    shortAnswer: "Use `SELECT` subqueries for scalar attributes, `FROM` derived tables for set pre-aggregations, `WHERE` subqueries for row filtering, and `HAVING` subqueries for group benchmarks — always ensuring explicit aliases and defensive scalar limits.",
    explanation: "Authoritative architectural mapping of subquery clause placement.",
    hint: "SELECT for scalar fields, FROM for pre-aggregates, WHERE for row filters, HAVING for group filters.",
    level: "expert"
  }
];

export default questions;
