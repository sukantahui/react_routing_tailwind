// topic13_files/topic13_questions.js

const questions = [
  {
    question: "What does the `IN` operator do in MySQL?",
    shortAnswer: "It tests whether a value matches any element in a specified discrete list of values or subquery results.",
    explanation: "Replaces long chains of `col = val1 OR col = val2 OR ...` with clean, readable syntax.",
    hint: "Discrete set membership test.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city IN ('Barrackpore', 'Kolkata', 'Ichapur');"
  },
  {
    question: "Why is `IN (val1, val2, ...)` faster than multiple chained `OR` conditions in MySQL?",
    shortAnswer: "MySQL sorts the constant list in `IN (...)` and performs a binary search in O(log N) memory lookups instead of evaluating OR expressions sequentially in O(N).",
    explanation: "Internal binary search optimization makes literal list lookups extremely fast.",
    hint: "Binary search on sorted constant list.",
    level: "expert"
  },
  {
    question: "What is the famous 'NOT IN with NULL Trap' in SQL?",
    shortAnswer: "If the list or subquery contains a single `NULL`, `NOT IN` evaluates to `UNKNOWN` for all rows and returns an empty set (0 rows).",
    explanation: "`val NOT IN (1, 2, NULL)` expands to `val <> 1 AND val <> 2 AND val <> NULL`. Since `val <> NULL` is UNKNOWN, the entire AND expression fails.",
    hint: "Three-Valued Logic NULL contamination.",
    level: "expert",
    codeExample: "-- FAILS to return any rows if subquery returns a NULL:\nSELECT * FROM students WHERE student_id NOT IN (SELECT student_id FROM suspended_students);\n-- FIX: Use NOT EXISTS"
  },
  {
    question: "Why is `NOT EXISTS` considered superior to `NOT IN` when filtering against subqueries?",
    shortAnswer: "`NOT EXISTS` is immune to NULL contamination and enables MySQL to short-circuit upon finding the first match.",
    explanation: "`NOT EXISTS` tests for row existence (two-valued logic), preventing the Three-Valued Logic NULL failure of `NOT IN`.",
    hint: "Immunity to NULL and early-exit short circuit.",
    level: "expert",
    codeExample: "SELECT * FROM students s\nWHERE NOT EXISTS (\n    SELECT 1 FROM dropouts d WHERE d.student_id = s.student_id\n);"
  },
  {
    question: "What is a Composite Tuple `IN` expression in MySQL?",
    shortAnswer: "Testing multi-column combinations against a list of tuples: `WHERE (col1, col2) IN ((v1, v2), (v3, v4))`.",
    explanation: "Allows evaluating multi-part keys simultaneously in a single query.",
    hint: "Row constructor tuple matching.",
    level: "moderate",
    codeExample: "SELECT * FROM enrollments\nWHERE (student_id, course_id) IN ((101, 501), (102, 502));"
  },
  {
    question: "What does `NOT IN` do when the list contains non-null values?",
    shortAnswer: "It returns TRUE only if the candidate value is strictly different from EVERY value in the list.",
    explanation: "`WHERE city NOT IN ('Kolkata', 'Delhi')` excludes students from Kolkata or Delhi.",
    hint: "Exclusion of all set members.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city NOT IN ('Kolkata', 'Delhi');"
  },
  {
    question: "How does `IN` handle `NULL` values when checking candidate rows?",
    shortAnswer: "If `val` is NULL, `NULL IN (1, 2, 3)` evaluates to `UNKNOWN` and is rejected by the WHERE clause.",
    explanation: "Candidate NULL values never match discrete literal lists.",
    hint: "NULL candidate yields UNKNOWN in IN.",
    level: "moderate"
  },
  {
    question: "What is the recommended limit for the number of values in an `IN (...)` literal list?",
    shortAnswer: "Generally under 1,000 values; for larger datasets (e.g. 50,000 IDs), load them into a temporary table and use an indexed `JOIN`.",
    explanation: "Passing gigantic IN lists exceeds `max_allowed_packet` and exhausts server query parsing buffers.",
    hint: "1000 item practical limit vs temporary table join.",
    level: "expert"
  },
  {
    question: "What is a 'Semi-Join' optimization in MySQL 8.0 for `IN (subquery)`?",
    shortAnswer: "The optimizer transforms the `WHERE col IN (SELECT ...)` subquery into a joined table scan that stops searching as soon as the first matching duplicate is found.",
    explanation: "Semi-joins eliminate duplicate row fan-out and dramatically accelerate subquery execution.",
    hint: "Semi-join transformation.",
    level: "expert"
  },
  {
    question: "What is 'Subquery Materialization' for `IN` predicates?",
    shortAnswer: "MySQL executes the inner subquery once, stores the distinct output in an in-memory temporary table with a hash index, and performs fast hash lookups for the outer query.",
    explanation: "Prevents repetitive subquery re-evaluations.",
    hint: "In-memory hash index materialization.",
    level: "expert"
  },
  {
    question: "Can strings in an `IN` list use different collations?",
    shortAnswer: "If collation coercion fails between the column and literals, MySQL throws Error 1267 (Illegal mix of collations).",
    explanation: "Ensure the collation of literals matches the table column.",
    hint: "Collation compatibility.",
    level: "moderate"
  },
  {
    question: "How do you check if a single value belongs to an array of integers stored in a JSON column?",
    shortAnswer: "Using `JSON_CONTAINS(json_array_col, '101')` or `101 MEMBER OF(json_array_col)` in MySQL 8.0.17+.",
    explanation: "`MEMBER OF` is the JSON equivalent of the SQL IN operator.",
    hint: "MEMBER OF operator in MySQL 8.0.",
    level: "expert",
    codeExample: "SELECT * FROM courses WHERE 101 MEMBER OF(prerequisite_ids);"
  },
  {
    question: "What is the return value of `SELECT 5 IN (1, 2, 3, 4, 5)` in MySQL?",
    shortAnswer: "`1` (representing boolean TRUE).",
    explanation: "5 matches the last element in the list.",
    hint: "Boolean 1 outcome.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT 10 IN (1, 2, 3)`?",
    shortAnswer: "`0` (representing boolean FALSE).",
    explanation: "10 is not present in the list.",
    hint: "Boolean 0 outcome.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT 10 IN (1, 2, NULL)`?",
    shortAnswer: "`NULL` (UNKNOWN).",
    explanation: "Since 10 is not 1 and not 2, whether it equals NULL is unknown, so the result is NULL.",
    hint: "NULL element in un-matched IN yields NULL.",
    level: "expert"
  },
  {
    question: "Can an `IN` operator be used with `ENUM` column types?",
    shortAnswer: "Yes, `WHERE status IN ('active', 'pending', 'approved')` matches valid string labels.",
    explanation: "MySQL compares against the ENUM label definitions cleanly.",
    hint: "ENUM literal matching in IN.",
    level: "basic",
    codeExample: "SELECT * FROM orders WHERE status IN ('processing', 'shipped');"
  },
  {
    question: "How do you combine `IN` with `AND` to filter by multiple attributes?",
    shortAnswer: "`WHERE city IN ('Barrackpore', 'Kolkata') AND is_active = 1`.",
    explanation: "Combines set membership with boolean flags.",
    hint: "Compound filtering with IN and AND.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city IN ('Barrackpore', 'Kolkata') AND admission_fee >= 15000.00;"
  },
  {
    question: "What happens if an `IN ()` list is empty in standard SQL?",
    shortAnswer: "SQL syntax requires at least one element inside parentheses; writing `WHERE id IN ()` is a syntax error (Error 1064).",
    explanation: "Dynamic query generators must ensure arrays are not empty before appending `IN (...)`.",
    hint: "Empty IN list syntax error.",
    level: "basic"
  },
  {
    question: "How do you safely handle dynamic query generation when an application array might be empty?",
    shortAnswer: "If empty, inject `WHERE 1 = 0` (or `WHERE FALSE`) to return 0 rows without generating invalid SQL syntax.",
    explanation: "Prevents executing invalid `IN ()` queries.",
    hint: "WHERE 1=0 fallback for empty lists.",
    level: "moderate"
  },
  {
    question: "Can you use `IN` inside a `CASE WHEN` statement?",
    shortAnswer: "Yes: `CASE WHEN city IN ('Barrackpore', 'Ichapur') THEN 'North 24 Parganas' ELSE 'Other' END`.",
    explanation: "Groups multiple category items into regional buckets.",
    hint: "CASE WHEN categorizations with IN.",
    level: "basic",
    codeExample: "SELECT first_name,\n       CASE WHEN city IN ('Barrackpore', 'Ichapur') THEN 'District A'\n            ELSE 'District B' END AS region\nFROM students;"
  },
  {
    question: "How does MySQL use B-Tree indexes when evaluating `WHERE id IN (101, 102, 103)`?",
    shortAnswer: "It performs an 'Index Range Scan' (type: `range`), navigating the B-Tree root-to-leaf for each discrete key value.",
    explanation: "Fast point-range seeks for each key in the list.",
    hint: "Index range scan with multi-point lookups.",
    level: "expert"
  },
  {
    question: "What is the difference between `col = ANY (...)` and `col IN (...)`?",
    shortAnswer: "They are exact synonyms; `IN` is the standard set membership keyword while `= ANY` is the quantified comparison form.",
    explanation: "Both produce identical query execution plans.",
    hint: "Synonymous functionality.",
    level: "moderate"
  },
  {
    question: "What is `eq_range_index_dive_limit` in MySQL and how does it relate to large `IN` lists?",
    shortAnswer: "A system variable that controls whether the optimizer performs index dives to estimate rows for each item in the `IN` list or relies on index statistics.",
    explanation: "Tuning this prevents optimizer latency spikes on queries with large `IN` lists.",
    hint: "Optimizer index dive threshold.",
    level: "expert"
  },
  {
    question: "How do you filter records where a status is NOT in a list of archived states?",
    shortAnswer: "`WHERE status NOT IN ('archived', 'deleted', 'cancelled')`.",
    explanation: "Excludes obsolete records.",
    hint: "Status exclusion filter.",
    level: "basic",
    codeExample: "SELECT * FROM tickets WHERE status NOT IN ('resolved', 'closed');"
  },
  {
    question: "Why is `WHERE id NOT IN (SELECT id FROM t WHERE col = 'X')` dangerous if `t.id` is nullable?",
    shortAnswer: "If any row in `t` has `id IS NULL`, `NOT IN` will return 0 rows for the entire query.",
    explanation: "Always add `AND id IS NOT NULL` to the subquery or use `NOT EXISTS`.",
    hint: "Nullable foreign key trap in subquery NOT IN.",
    level: "expert"
  },
  {
    question: "Can arithmetic expressions be passed inside an `IN` list (e.g. `IN (10 * 2, 50 / 2)`)?",
    shortAnswer: "Yes, MySQL evaluates each arithmetic expression before evaluating list membership.",
    explanation: "Constant expressions are computed during query compilation.",
    hint: "Scalar expression evaluation in lists.",
    level: "basic",
    codeExample: "SELECT * FROM items WHERE price IN (100 * 0.9, 200 * 0.85);"
  },
  {
    question: "How do you filter by a list of dates using `IN`?",
    shortAnswer: "`WHERE holiday_date IN ('2026-01-26', '2026-08-15', '2026-10-02')`.",
    explanation: "Passes ISO formatted date strings.",
    hint: "Date literal list in IN.",
    level: "basic",
    codeExample: "SELECT * FROM holidays WHERE holiday_date IN ('2026-01-26', '2026-08-15');"
  },
  {
    question: "What is the difference between `IN` and `EXISTS` when the inner subquery returns many duplicates?",
    shortAnswer: "`EXISTS` stops searching immediately upon the first match per outer row; `IN` deduplicates the subquery list via Semi-Join or Materialization.",
    explanation: "Both are well-optimized in MySQL 8.0, but `EXISTS` avoids materializing duplicate sets.",
    hint: "Early termination vs Materialized deduplication.",
    level: "expert"
  },
  {
    question: "How do you write a table check constraint using `IN`?",
    shortAnswer: "`CHECK (status IN ('active', 'pending', 'suspended'))`.",
    explanation: "Enforces categorical integrity on the column.",
    hint: "CHECK constraint with IN set validation.",
    level: "moderate",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_student_status CHECK (status IN ('active', 'inactive'));"
  },
  {
    question: "What is the recommended checklist when using `IN` and `NOT IN` in production?",
    shortAnswer: "1) Use `IN (...)` instead of chained `OR`s. 2) Never use `NOT IN` with nullable subqueries (use `NOT EXISTS`). 3) Ensure filtered columns have B-Tree indexes. 4) Avoid massive lists over 1,000 items (use temporary tables). 5) Verify tuple matching syntax for composite keys.",
    explanation: "Following these 5 rules eliminates performance bottlenecks and Three-Valued Logic bugs.",
    hint: "IN over OR, NOT EXISTS over NOT IN, Index support, Batch size limits, Composite tuples.",
    level: "basic"
  }
];

export default questions;
