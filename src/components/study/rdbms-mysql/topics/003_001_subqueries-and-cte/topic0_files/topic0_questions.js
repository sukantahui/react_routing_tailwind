// topic0_files/topic0_questions.js

const questions = [
  {
    question: "What is the definition of a Subquery in SQL?",
    shortAnswer: "A subquery (or inner query) is a complete SELECT statement nested inside another enclosing SQL statement such as SELECT, INSERT, UPDATE, or DELETE.",
    explanation: "Subqueries provide dynamic intermediate result sets for outer queries.",
    hint: "A complete SELECT statement nested within an outer parent SQL statement.",
    level: "basic"
  },
  {
    question: "What is the difference between an Outer Query and an Inner Query?",
    shortAnswer: "The Inner Query (subquery) is the embedded statement enclosed in parentheses; the Outer Query (parent query) is the enclosing statement that consumes the subquery's output.",
    explanation: "Outer queries evaluate using values produced by inner queries.",
    hint: "Inner query is the nested subquery; outer query is the enclosing statement.",
    level: "basic"
  },
  {
    question: "What is a Scalar Subquery?",
    shortAnswer: "A subquery that evaluates to exactly ONE row and ONE column (a single atomic 1x1 value).",
    explanation: "Can be used anywhere a scalar value or constant is valid in SQL.",
    hint: "Returns exactly one single value (1 row x 1 column).",
    level: "basic"
  },
  {
    question: "What error occurs if a scalar subquery returns more than one row in a comparison expression?",
    shortAnswer: "`Error 1242 (21000): Subquery returns more than 1 row`.",
    explanation: "Comparison operators like `=`, `>`, `<` require a single scalar operand.",
    hint: "Error 1242: Subquery returns more than 1 row.",
    level: "basic"
  },
  {
    question: "What is a Column Subquery (Multi-Row Subquery)?",
    shortAnswer: "A subquery that returns multiple rows of a SINGLE column (an Nx1 list of values).",
    explanation: "Operates with multi-row operators like IN, NOT IN, ANY, and ALL.",
    hint: "Returns multiple rows of a single column (Nx1 list).",
    level: "basic"
  },
  {
    question: "What is a Derived Table (Table Subquery)?",
    shortAnswer: "A multi-row, multi-column subquery placed inside the `FROM` clause that acts as a temporary inline virtual table for the outer query.",
    explanation: "In MySQL, derived tables in the FROM clause MUST be assigned an explicit alias.",
    hint: "A subquery in the FROM clause that functions as an inline virtual table.",
    level: "basic"
  },
  {
    question: "Why does MySQL require an explicit table alias for derived tables in the `FROM` clause?",
    shortAnswer: "To give the temporary intermediate result set a valid relational table identifier for column qualification (`SELECT dt.col FROM (...) AS dt;`).",
    explanation: "Omitting the alias causes Error 1248 (42000): Every derived table must have its own alias.",
    hint: "Derived tables require an alias so the outer query can qualify column names.",
    level: "moderate"
  },
  {
    question: "What is a Non-Correlated (Independent) Subquery?",
    shortAnswer: "A subquery that has no references to outer query columns and can be executed completely independently as a standalone query.",
    explanation: "The optimizer executes non-correlated subqueries once before outer query evaluation.",
    hint: "Self-contained subquery that does not depend on outer query columns.",
    level: "basic"
  },
  {
    question: "How many times is a Non-Correlated Subquery executed during query evaluation?",
    shortAnswer: "Exactly ONCE; its result is cached or materialized in memory for the outer query to use.",
    explanation: "Provides $O(N + M)$ performance rather than nested loop iterations.",
    hint: "Executed once before the outer query runs.",
    level: "basic"
  },
  {
    question: "What is a Correlated (Dependent) Subquery?",
    shortAnswer: "A subquery that contains references to columns belonging to tables declared in the outer query.",
    explanation: "Cannot be executed independently of the outer query's current row context.",
    hint: "References columns from the outer query's current row context.",
    level: "basic"
  },
  {
    question: "How does the execution phase of a Correlated Subquery differ from a Non-Correlated Subquery?",
    shortAnswer: "A correlated subquery is conceptually re-evaluated row-by-row for EVERY candidate row processed by the outer query ($O(N \\times M)$ loop).",
    explanation: "Requires outer row parameters to produce its intermediate result.",
    hint: "Conceptually executes repeatedly for each row of the outer query.",
    level: "moderate"
  },
  {
    question: "In which clauses of a SQL statement can a subquery be placed?",
    shortAnswer: "`SELECT` (scalar projection), `FROM` (derived table), `WHERE` (filter predicate), `HAVING` (group filter), `INSERT INTO ... VALUES` (scalar), and `UPDATE/DELETE` predicates.",
    explanation: "Subqueries can appear in almost all major SQL clauses.",
    hint: "Can appear in SELECT, FROM, WHERE, HAVING, UPDATE, and DELETE.",
    level: "basic"
  },
  {
    question: "What is a Row Subquery?",
    shortAnswer: "A subquery that returns a single row containing multiple columns (a 1xM tuple), evaluated with tuple comparisons like `(dept_id, status) = (SELECT ...)`.",
    explanation: "Compares multiple columns simultaneously.",
    hint: "Returns a single row with multiple columns (tuple comparison).",
    level: "moderate"
  },
  {
    question: "What does the MySQL Query Optimizer do when it performs 'Subquery Unnesting'?",
    shortAnswer: "It transforms a subquery in `WHERE ... IN (SELECT ...)` or `EXISTS` into an equivalent `INNER JOIN` or `SEMI-JOIN` to take advantage of index lookup joins.",
    explanation: "Unnesting allows the optimizer more freedom in choosing join orders.",
    hint: "Rewrites subqueries into joins or semi-joins for better execution plans.",
    level: "expert"
  },
  {
    question: "What is a Semi-Join in MySQL optimization?",
    shortAnswer: "A join operation that checks for the existence of matching rows in the right table without duplicating rows from the left table when multiple matches exist.",
    explanation: "Used internally to optimize `WHERE id IN (SELECT ...)` and `EXISTS`.",
    hint: "Filters outer rows based on the presence of matching inner rows without row multiplication.",
    level: "expert"
  },
  {
    question: "What happens if a scalar subquery returns zero rows (`EMPTY SET`)?",
    shortAnswer: "The scalar subquery evaluates to `NULL`.",
    explanation: "In WHERE clauses, `val = NULL` evaluates to UNKNOWN, filtering the row out.",
    hint: "Evaluates to NULL if zero rows are returned.",
    level: "basic"
  },
  {
    question: "How do you write a subquery to find all students who scored above the academy's average exam score?",
    shortAnswer: "`SELECT student_name, exam_score FROM students WHERE exam_score > (SELECT AVG(exam_score) FROM students);`",
    explanation: "Uses a scalar subquery in the WHERE clause.",
    hint: "WHERE exam_score > (SELECT AVG(exam_score) FROM students)",
    level: "basic"
  },
  {
    question: "Can a subquery reference another subquery in the same SQL statement?",
    shortAnswer: "YES; subqueries can be nested inside other subqueries up to MySQL's nesting limit (typically 64 levels).",
    explanation: "Allows multi-tier relational filtering.",
    hint: "Yes, subqueries can be deeply nested inside other subqueries.",
    level: "moderate"
  },
  {
    question: "Why are deeply nested subqueries (e.g. 4+ levels) considered a code smell?",
    shortAnswer: "They are difficult to read, maintain, and debug, and often lead to sub-optimal execution plans. They should be refactored into Common Table Expressions (CTEs) or JOINs.",
    explanation: "CTEs provide linear, modular query construction.",
    hint: "Hard to read and optimize; should be refactored into CTEs or JOINs.",
    level: "moderate"
  },
  {
    question: "What is Subquery Materialization?",
    shortAnswer: "An optimization technique where MySQL executes an inner subquery once, stores the distinct output in an in-memory temporary hash table, and performs fast lookups.",
    explanation: "Eliminates repeated subquery re-evaluations.",
    hint: "Caches distinct subquery output in an in-memory hash table.",
    level: "expert"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate scalar subqueries?",
    shortAnswer: "By querying students whose individual tuition fee payment exceeds the academy-wide average tuition fee: `WHERE p.amount_paid_inr > (SELECT AVG(amount_paid_inr) FROM fee_payments)`.",
    explanation: "Demonstrates dynamic threshold comparison against aggregated benchmarks.",
    hint: "Compares individual payments against the aggregate average fee subquery.",
    level: "basic"
  },
  {
    question: "What is the restriction on modifying a table in a subquery while updating the same table in MySQL?",
    shortAnswer: "MySQL raises `Error 1093: You can't specify target table 't' for update in FROM clause` if you directly query the same table being updated/deleted.",
    explanation: "Can be bypassed by wrapping the subquery in a derived table (`(SELECT * FROM (SELECT ...) AS tmp)`).",
    hint: "Error 1093 prevents modifying a table while reading from it in a subquery.",
    level: "expert"
  },
  {
    question: "How does a subquery in the `SELECT` projection list behave?",
    shortAnswer: "It must be a scalar subquery returning exactly 1 value per outer row, computing a calculated or lookup attribute for each projected record.",
    explanation: "Evaluates per row in the SELECT list.",
    hint: "Must be a scalar subquery producing 1 value per outer row.",
    level: "moderate"
  },
  {
    question: "What is the performance drawback of placing a correlated subquery in the `SELECT` list across 1,000,000 outer rows?",
    shortAnswer: "It executes 1,000,000 individual query lookups, causing severe CPU latency; it is much faster to rewrite as a `LEFT JOIN` with `GROUP BY`.",
    explanation: "Avoids $N$ iterative executions by using a single join.",
    hint: "Executes 1M times; should be rewritten as a LEFT JOIN.",
    level: "expert"
  },
  {
    question: "What is the difference between a View and a Derived Table (Subquery in FROM)?",
    shortAnswer: "A View is a permanent stored database object with a schema catalog name; a Derived Table is an ephemeral inline subquery defined only for the lifespan of that single query.",
    explanation: "Derived tables exist only in query memory.",
    hint: "Views are persistent schema definitions; derived tables are temporary query-scoped subqueries.",
    level: "basic"
  },
  {
    question: "Can an aggregate function be placed in a WHERE clause directly without a subquery?",
    shortAnswer: "NO; writing `WHERE score > AVG(score)` is a syntax error because aggregate functions require a `GROUP BY` context; a subquery `WHERE score > (SELECT AVG(score) ...)` is required.",
    explanation: "Aggregates cannot be evaluated in WHERE without an inner query context.",
    hint: "No, WHERE cannot evaluate aggregates directly; requires a subquery.",
    level: "basic"
  },
  {
    question: "What does `EXPLAIN` show for a materialized subquery in MySQL 8.0+?",
    shortAnswer: "`select_type = MATERIALIZED` or `SUBQUERY`, showing the subquery evaluation step and temporary table creation.",
    explanation: "Reveals how the optimizer handled subquery execution.",
    hint: "Shows select_type = MATERIALIZED or SUBQUERY in EXPLAIN.",
    level: "moderate"
  },
  {
    question: "What is the FirstMatch optimization strategy for subqueries in MySQL?",
    shortAnswer: "When executing a semi-join, MySQL stops scanning the inner table as soon as the first matching key is found for an outer row, avoiding full inner scans.",
    explanation: "Short-circuits duplicate evaluations.",
    hint: "Stops scanning inner table on the first match for each outer row.",
    level: "expert"
  },
  {
    question: "What check should a developer perform when writing scalar subqueries in production?",
    shortAnswer: "Ensure the subquery uses `LIMIT 1` or an aggregate function (e.g. `MAX`, `AVG`, `MIN`) to mathematically guarantee it will never return more than 1 row and trigger Error 1242.",
    explanation: "Defensive SQL programming prevents runtime crashes on duplicate data.",
    hint: "Use aggregates or LIMIT 1 to guarantee at most 1 row is returned.",
    level: "expert"
  },
  {
    question: "What is the senior architect's summary rule for subquery fundamentals?",
    shortAnswer: "Understand subquery dimensionality (scalar, column, table), leverage non-correlated subqueries for one-time evaluations, monitor correlated subqueries for loop bottlenecks, and refactor deeply nested subqueries into CTEs or JOINs.",
    explanation: "Foundational mastery of subquery architecture and optimizer execution.",
    hint: "Dimensionality + Execution phases (independent vs correlated) + CTE refactoring.",
    level: "expert"
  }
];

export default questions;
