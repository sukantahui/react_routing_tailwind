// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What does the term 'Sargable' stand for in relational database query optimization?",
    shortAnswer: "Sargable stands for **Search Argument ABLE**. A query predicate is sargable if the database engine can directly utilize an index to seek and filter rows via B+Tree traversal.",
    explanation: "If a predicate is non-sargable, the engine must evaluate the condition on every single row sequentially, resulting in a slow Full Table Scan (ALL).",
    hint: "Search Argument Able: capable of using an index for B+Tree search.",
    level: "basic",
    codeExample: "-- Sargable:\nWHERE created_at >= '2026-01-01' AND created_at < '2027-01-01'"
  },
  {
    question: "Why does wrapping an indexed column in a function (e.g. `YEAR(created_at) = 2026`) destroy sargability?",
    shortAnswer: "Because the B+Tree stores raw column values (e.g., '2026-04-15 10:30:00'), not the computed function output; MySQL must compute `YEAR()` on every row before comparing.",
    explanation: "The storage engine cannot use binary search on a B+Tree when the search value must be transformed row-by-row by the server layer.",
    hint: "B+Tree keys are raw values; functions require row-by-row CPU computation.",
    level: "basic"
  },
  {
    question: "How should you refactor `WHERE YEAR(admission_date) = 2026` to make it sargable?",
    shortAnswer: "Rewrite it as a date range: `WHERE admission_date >= '2026-01-01' AND admission_date < '2027-01-01'`.",
    explanation: "This allows MySQL to probe the B+Tree for '2026-01-01' and perform an efficient `type = range` scan up to '2026-12-31 23:59:59'.",
    hint: "Use lower and upper date boundary predicates.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE admission_date >= '2026-01-01' AND admission_date < '2027-01-01';"
  },
  {
    question: "How does mathematical arithmetic on an indexed column affect index usage (e.g. `WHERE balance * 1.18 > 10000`)?",
    shortAnswer: "It makes the predicate non-sargable. To fix it, move the arithmetic operation to the constant side: `WHERE balance > 10000 / 1.18`.",
    explanation: "Isolating the indexed column on one side allows the optimizer to calculate the constant once and perform a direct B+Tree range probe.",
    hint: "Isolate the indexed column by moving math to the constant side.",
    level: "basic",
    codeExample: "-- Non-Sargable: WHERE balance * 1.18 > 10000\n-- Sargable:     WHERE balance > 10000 / 1.18"
  },
  {
    question: "Why is `WHERE phone_number = 9830012345` non-sargable when `phone_number` is `VARCHAR`?",
    shortAnswer: "Because MySQL's type conversion rules dictate that string-to-number comparisons convert the string column to a number (`CAST(phone_number AS DOUBLE)`), disabling index seeks.",
    explanation: "Converting the column on every row causes a Full Table Scan (`ALL`). Quoting the literal (`'9830012345'`) maintains sargability.",
    hint: "Implicit CAST on column disables B+Tree search.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE phone_number = '9830012345';"
  },
  {
    question: "Is `WHERE id = '101'` sargable when `id` is an `INT` column?",
    shortAnswer: "Yes. When comparing an `INT` column to a string literal, MySQL converts the string constant `'101'` to an integer (`101`) once, preserving the `const`/`ref` index seek.",
    explanation: "Because the conversion occurs on the constant rather than the table column, the index can still be probed directly.",
    hint: "Converting constants preserves index lookups; converting columns destroys them.",
    level: "expert"
  },
  {
    question: "Why is `WHERE student_name LIKE '%Mitra'` non-sargable while `WHERE student_name LIKE 'Mitra%'` is sargable?",
    shortAnswer: "Leading wildcards (`%text`) hide the starting prefix, preventing B+Tree root-to-leaf probing. Trailing wildcards (`text%`) have a fixed prefix that allows direct B+Tree range probing.",
    explanation: "B+Tree indexes are ordered lexicographically from left to right. Without a known starting character, the entire index or table must be scanned.",
    hint: "Leading wildcards lack a starting prefix for B+Tree root navigation.",
    level: "basic"
  },
  {
    question: "How do you make case-insensitive string lookups sargable on case-sensitive columns?",
    shortAnswer: "Use a case-insensitive collation (e.g. `utf8mb4_0900_ai_ci`) on the column or create a functional index / generated column on `LOWER(column)`.",
    explanation: "Avoid writing `WHERE LOWER(col) = 'value'` on an uncollated column without a functional index.",
    hint: "Use case-insensitive collations or functional indexes on LOWER(col).",
    level: "expert",
    codeExample: "CREATE INDEX idx_lower_name ON students ((LOWER(student_name)));"
  },
  {
    question: "What are Functional Key Parts (Functional Indexes) in MySQL 8.0?",
    shortAnswer: "A MySQL 8.0+ feature that allows creating B+Tree indexes directly on expressions (e.g. `CREATE INDEX idx ON tbl ((YEAR(date_col)))`).",
    explanation: "MySQL creates an internal virtual column and indexes the computed function results, making queries with identical function expressions sargable.",
    hint: "Indexes created directly on SQL expressions.",
    level: "expert",
    codeExample: "CREATE INDEX idx_student_reg_year ON student_records ((YEAR(registration_date)));"
  },
  {
    question: "What is the requirement when querying a table with a Functional Index?",
    shortAnswer: "The query's `WHERE` clause expression must match the exact syntax and data types used in the functional index definition.",
    explanation: "If the index is on `((LOWER(name)))`, a query using `WHERE UPPER(name)` or `WHERE name` will not use the functional index.",
    hint: "Expression in query must match functional index definition exactly.",
    level: "expert"
  },
  {
    question: "How do you refactor `WHERE SUBSTRING(student_code, 1, 3) = 'BKP'` to be sargable?",
    shortAnswer: "Rewrite it using a prefix pattern: `WHERE student_code LIKE 'BKP%'` or `WHERE student_code >= 'BKP' AND student_code < 'BKQ'`.",
    explanation: "Both rewrites allow MySQL to probe the index on `student_code` with a `range` scan.",
    hint: "Replace SUBSTRING prefix with LIKE 'prefix%'.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE student_code LIKE 'BKP%';"
  },
  {
    question: "Why is `WHERE DATE(created_at) = '2026-08-25'` bad on a `DATETIME` or `TIMESTAMP` column?",
    shortAnswer: "`DATE()` strips the time component by evaluating every row, forcing a Full Table Scan. Use an explicit datetime range instead.",
    explanation: "Rewriting to `WHERE created_at >= '2026-08-25 00:00:00' AND created_at < '2026-08-26 00:00:00'` enables an instant `range` scan.",
    hint: "DATE() on DATETIME forces row-by-row computation; use start-of-day to end-of-day range.",
    level: "basic"
  },
  {
    question: "How do you make `WHERE IFNULL(discount, 0) > 10` sargable?",
    shortAnswer: "Refactor to `WHERE discount > 10` (since rows with `NULL` would evaluate to 0 and fail the `> 10` test anyway).",
    explanation: "Because `IFNULL(NULL, 0) > 10` is false, removing `IFNULL` preserves exact business logic while enabling index range scanning.",
    hint: "NULL values evaluate to false in comparison; remove unnecessary IFNULL wrapping.",
    level: "expert",
    codeExample: "SELECT * FROM course_fees WHERE discount > 10;"
  },
  {
    question: "Why is `WHERE CONCAT(first_name, ' ', last_name) = 'Mamata Hui'` non-sargable?",
    shortAnswer: "Concatenating two columns creates an on-the-fly computed string for every row, disabling individual indexes on `first_name` and `last_name`.",
    explanation: "Refactor to separate predicates: `WHERE first_name = 'Mamata' AND last_name = 'Hui'` (using composite index `(first_name, last_name)`).",
    hint: "Separate concatenated columns into individual column predicates.",
    level: "basic"
  },
  {
    question: "Can an `OR` condition across different columns be sargable?",
    shortAnswer: "Only if both columns have separate indexes (allowing `index_merge`), or if refactored into a `UNION ALL` of two index-seek queries.",
    explanation: "If one column in an `OR` condition is unindexed, MySQL is forced to execute a Full Table Scan (`ALL`).",
    hint: "OR conditions require indexes on all branches or UNION ALL refactoring.",
    level: "expert"
  },
  {
    question: "What is the sargability of `WHERE age + 1 = 21`?",
    shortAnswer: "Non-sargable because of `+ 1` on the column side; refactor to `WHERE age = 20` for an immediate `const`/`ref` index seek.",
    explanation: "Always perform algebraic reduction so the column stands alone on the left side of the comparison operator.",
    hint: "Perform algebraic reduction to isolate column.",
    level: "basic"
  },
  {
    question: "Is `WHERE DATEDIFF(NOW(), admission_date) <= 30` sargable?",
    shortAnswer: "No! Refactor to `WHERE admission_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)`.",
    explanation: "Evaluating `DATE_SUB` on the right side computes the threshold date once as a constant, enabling an index range scan on `admission_date`.",
    hint: "Move date subtraction to the constant side.",
    level: "expert",
    codeExample: "SELECT * FROM admissions WHERE admission_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);"
  },
  {
    question: "Why are regular expressions (`WHERE name REGEXP '^Deb'`) slower than `LIKE 'Deb%'`?",
    shortAnswer: "`REGEXP` executes a regex engine pass row-by-row (often forcing a full scan), whereas `LIKE 'Deb%'` is recognized natively by the B+Tree optimizer as an index range probe.",
    explanation: "MySQL index range optimization specifically recognizes `LIKE 'prefix%'` but cannot optimize arbitrary regex strings.",
    hint: "LIKE 'prefix%' triggers B+Tree range seek; REGEXP does not.",
    level: "moderate"
  },
  {
    question: "How do collations affect sargability in `JOIN` conditions?",
    shortAnswer: "If joined columns have different collations (e.g. `utf8mb4_general_ci` vs `utf8mb4_0900_ai_ci`), MySQL converts collations on the fly, destroying index lookups.",
    explanation: "Mismatched collations force the join into an expensive `Using join buffer (Hash Join)` or Table Scan.",
    hint: "Mismatched collations force collation conversion on every join row.",
    level: "expert"
  },
  {
    question: "What is the impact of `WHERE NOT (status = 'Active')` on sargability?",
    shortAnswer: "Negation operators (`!=`, `<>`, `NOT`) often prevent direct point lookups and force index range or table scans because B+Tree keys are searched by equality/order.",
    explanation: "If status has low cardinality ('Active', 'Inactive'), rewriting as `WHERE status = 'Inactive'` enables an exact `ref` index seek.",
    hint: "Replace negative conditions with positive equality matches when possible.",
    level: "basic"
  },
  {
    question: "How does `TRIM(column)` in WHERE clauses affect query plans?",
    shortAnswer: "It makes the predicate non-sargable by wrapping the column in a string transformation. Sanitize whitespace upon `INSERT`/`UPDATE` instead.",
    explanation: "Never clean data in `WHERE` clauses; enforce clean data at write time so queries can use raw index seeks.",
    hint: "Sanitize whitespace at write time, not during WHERE filtering.",
    level: "basic"
  },
  {
    question: "How do you identify non-sargable queries in your codebase?",
    shortAnswer: "Check for `type = ALL` or `type = index` with `Using where` in `EXPLAIN`, and search query code for functions wrapping column names in `WHERE` or `ON` clauses.",
    explanation: "Look for patterns like `YEAR(`, `DATE(`, `LOWER(`, `SUBSTRING(`, `IFNULL(`, or arithmetic operators on column names.",
    hint: "Look for function calls and arithmetic directly wrapping column names in WHERE clauses.",
    level: "expert"
  },
  {
    question: "Is `WHERE created_at BETWEEN '2026-08-01' AND '2026-08-31'` sargable for a `DATETIME` column?",
    shortAnswer: "Yes, but beware that `'2026-08-31'` means `'2026-08-31 00:00:00'`, missing records later in the day. Use `>= '2026-08-01' AND < '2026-09-01'` instead.",
    explanation: "Half-open intervals (`>= start AND < end_plus_one`) are both 100% sargable and mathematically exact for timestamps.",
    hint: "Use half-open range >= start AND < next_day for complete timestamp coverage.",
    level: "expert"
  },
  {
    question: "How do Generated Columns provide an alternative to MySQL 8.0 Functional Indexes?",
    shortAnswer: "You create a virtual or stored column defined as an expression (`col_year INT AS (YEAR(reg_date)) VIRTUAL`) and build a standard B+Tree index on that column.",
    explanation: "This works in older MySQL 5.7+ versions that lack native functional index syntax.",
    hint: "Create an indexed virtual column on the expression.",
    level: "expert",
    codeExample: "ALTER TABLE students ADD reg_year INT AS (YEAR(registration_date)) VIRTUAL;\nCREATE INDEX idx_reg_year ON students (reg_year);"
  },
  {
    question: "Why is `WHERE student_id IN (SELECT id FROM unindexed_table)` often non-sargable?",
    shortAnswer: "If the subquery is converted into a correlated subquery, the outer query evaluates the subquery row-by-row, causing an $O(N \\times M)$ nested loop.",
    explanation: "Refactoring into an `INNER JOIN` or `EXISTS` on indexed columns restores sargability.",
    hint: "Correlated subqueries can trigger row-by-row nested loop scans.",
    level: "moderate"
  },
  {
    question: "What is the sargability of `WHERE ISNULL(graduation_date)` vs `WHERE graduation_date IS NULL`?",
    shortAnswer: "`WHERE graduation_date IS NULL` is sargable and uses the B+Tree index; `WHERE ISNULL(graduation_date) = 1` is a function call that forces a full scan.",
    explanation: "MySQL B+Tree indexes store NULL entries at the beginning of the index, making `IS NULL` a direct index range probe.",
    hint: "IS NULL is natively supported by B+Tree; ISNULL() is a function call.",
    level: "expert"
  },
  {
    question: "How does sargability affect CPU utilization on database servers?",
    shortAnswer: "Non-sargable queries consume massive CPU because the server must execute millions of function evaluations and memory casts per second.",
    explanation: "Sargable queries offload filtering to B+Tree binary navigation, reducing CPU cycles by 90% to 99%.",
    hint: "Row-by-row function evaluation spikes CPU; index seeks minimize CPU overhead.",
    level: "basic"
  },
  {
    question: "Can an expression on the constant side (e.g. `WHERE salary > 50000 * 1.15`) harm sargability?",
    shortAnswer: "No! Expressions on constants are evaluated once at query parse/optimization time as a scalar constant, maintaining 100% sargability.",
    explanation: "Constant folding evaluates `50000 * 1.15` to `57500` before query execution begins.",
    hint: "Constant expressions are folded into single values before query execution.",
    level: "basic"
  },
  {
    question: "What happens when an indexed JSON field is queried with `WHERE JSON_EXTRACT(data, '$.city') = 'Barrackpore'`?",
    shortAnswer: "It is non-sargable and scans all rows. Create an indexed Generated Column (`city AS (data->>'$.city')`) or a MySQL 8.0+ multi-valued index.",
    explanation: "Direct JSON function calls require parsing JSON documents row-by-row unless supported by virtual column indexes.",
    hint: "JSON functions require row parsing; use indexed generated columns for sargability.",
    level: "expert"
  },
  {
    question: "What is the primary golden rule of sargability for backend engineers?",
    shortAnswer: "Keep the indexed column completely naked and isolated on one side of the comparison operator: `column_name OPERATOR constant_or_parameter`.",
    explanation: "Never apply functions, arithmetic, concatenations, or type casts to the column name in `WHERE` and `JOIN ON` clauses.",
    hint: "Keep the column naked: no functions, no math, no casts around the column name.",
    level: "basic"
  }
];

export default questions;
