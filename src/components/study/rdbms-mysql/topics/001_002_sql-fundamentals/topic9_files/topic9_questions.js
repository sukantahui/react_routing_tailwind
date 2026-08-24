// topic9_files/topic9_questions.js

const questions = [
  {
    question: "What is the primary role of the `WHERE` clause in SQL statements?",
    shortAnswer: "To evaluate a boolean condition on each record and filter the data set, including only rows where the predicate evaluates to TRUE.",
    explanation: "The `WHERE` clause filters rows in `SELECT`, `UPDATE`, and `DELETE` queries before grouping or aggregation occurs.",
    hint: "Row-level boolean filtering predicate.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore';"
  },
  {
    question: "What is Three-Valued Logic (3VL) in SQL `WHERE` evaluations?",
    shortAnswer: "SQL boolean expressions evaluate to one of three possible states: `TRUE`, `FALSE`, or `UNKNOWN` (due to NULLs).",
    explanation: "In `WHERE` clauses, only rows evaluating strictly to `TRUE` are returned. Rows evaluating to `FALSE` or `UNKNOWN` are filtered out.",
    hint: "TRUE, FALSE, and UNKNOWN logical states.",
    level: "moderate"
  },
  {
    question: "What is 'Sargability' (Search Argument Able) in SQL queries?",
    shortAnswer: "The property of a query predicate that allows the database optimizer to directly utilize B-Tree indexes for fast range scans rather than performing a full table scan.",
    explanation: "Writing `WHERE YEAR(dob) = 2005` forces MySQL to calculate `YEAR()` on every single row (non-sargable). Writing `WHERE dob >= '2005-01-01' AND dob <= '2005-12-31'` is sargable and uses index lookups.",
    hint: "Index-friendly search conditions.",
    level: "expert",
    codeExample: "-- Non-sargable (slow):\nWHERE UPPER(name) = 'MAMATA'\n-- Sargable (fast B-Tree scan):\nWHERE name = 'Mamata'"
  },
  {
    question: "Why does `WHERE col = NULL` never return any rows in MySQL?",
    shortAnswer: "Because `NULL` represents an unknown missing value; comparing anything to NULL with `=` evaluates to `UNKNOWN` (treated as false in WHERE).",
    explanation: "In SQL, equality comparison with NULL fails because `NULL = NULL` is `UNKNOWN`. You must use `IS NULL` or `IS NOT NULL`.",
    hint: "NULL equality comparison rule.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE phone_no IS NULL;"
  },
  {
    question: "How does operator precedence work between `AND` and `OR` in a `WHERE` clause?",
    shortAnswer: "`AND` has higher precedence than `OR` and is evaluated first, unless overridden by parentheses `()`.",
    explanation: "In `WHERE city = 'Kolkata' OR city = 'Barrackpore' AND fee > 15000`, MySQL evaluates `(city = 'Barrackpore' AND fee > 15000)` first. To group cities, use `WHERE (city = 'Kolkata' OR city = 'Barrackpore') AND fee > 15000`.",
    hint: "AND evaluates before OR.",
    level: "moderate",
    codeExample: "SELECT * FROM students\nWHERE (city = 'Kolkata' OR city = 'Barrackpore')\n  AND admission_fee >= 15000.00;"
  },
  {
    question: "What is MySQL 'Safe Updates Mode' (`sql_safe_updates`) and what catastrophe does it prevent?",
    shortAnswer: "It prevents executing `UPDATE` or `DELETE` statements that lack a `WHERE` clause referencing a primary key or indexed column.",
    explanation: "If you accidentally type `DELETE FROM students;` without a WHERE clause, safe updates mode blocks the query with Error 1175, protecting production tables from being wiped.",
    hint: "Error 1175 safe update protection.",
    level: "moderate",
    codeExample: "SET sql_safe_updates = 1;"
  },
  {
    question: "How do you verify whether a `WHERE` clause utilizes a database index?",
    shortAnswer: "By prefixing the query with `EXPLAIN` or `EXPLAIN ANALYZE` and inspecting the `key` and `type` output columns.",
    explanation: "If `key` shows an index name and `type` shows `ref` or `range`, the condition is sargable. If `type = ALL`, it is performing an unindexed full table scan.",
    hint: "EXPLAIN optimizer plan inspector.",
    level: "moderate",
    codeExample: "EXPLAIN SELECT * FROM students WHERE email = 'mamata@codernaccotax.in';"
  },
  {
    question: "What is the difference between filtering in the `WHERE` clause vs filtering in the `HAVING` clause?",
    shortAnswer: "`WHERE` filters individual raw rows BEFORE aggregation; `HAVING` filters grouped summary buckets AFTER aggregation (`GROUP BY`).",
    explanation: "You cannot use aggregate functions like `SUM()` or `COUNT()` in a `WHERE` clause; they must be evaluated in `HAVING`.",
    hint: "Pre-aggregation row filter vs post-aggregation bucket filter.",
    level: "moderate"
  },
  {
    question: "Can a `WHERE` clause contain a subquery?",
    shortAnswer: "Yes, subqueries in the WHERE clause can be used with `IN`, `EXISTS`, `ANY`, `ALL`, or scalar comparison operators.",
    explanation: "Enables dynamic filtering: `SELECT * FROM students WHERE admission_fee > (SELECT AVG(admission_fee) FROM students);`.",
    hint: "Subqueries in WHERE predicates.",
    level: "moderate",
    codeExample: "SELECT * FROM students\nWHERE admission_fee > (SELECT AVG(admission_fee) FROM students);"
  },
  {
    question: "What is the difference between `IN (subquery)` and `EXISTS (subquery)` in a `WHERE` clause?",
    shortAnswer: "`IN` retrieves a list of values and tests membership; `EXISTS` returns TRUE as soon as the subquery finds at least 1 matching row, stopping execution immediately.",
    explanation: "In large correlated subqueries, `EXISTS` is often significantly faster because the query engine short-circuits on the first match.",
    hint: "Early exit short-circuiting in EXISTS.",
    level: "expert",
    codeExample: "SELECT * FROM students s\nWHERE EXISTS (\n    SELECT 1 FROM course_enrollments e WHERE e.student_id = s.student_id\n);"
  },
  {
    question: "How does implicit type coercion in a `WHERE` clause break index lookups (e.g. `WHERE varchar_col = 123`)?",
    shortAnswer: "MySQL converts the string column to numbers for comparison, which applies an internal conversion function to every row, disabling B-Tree index scans.",
    explanation: "Comparing string columns to numeric literals without quotes (`'123'`) breaks sargability and triggers full table scans.",
    hint: "Type conversion prevents index usage.",
    level: "expert",
    codeExample: "-- Slow unindexed scan: WHERE phone_no = 9830012345\n-- Fast indexed B-Tree scan: WHERE phone_no = '9830012345'"
  },
  {
    question: "What does the `BETWEEN` operator do in a `WHERE` clause and is it inclusive or exclusive?",
    shortAnswer: "`BETWEEN val1 AND val2` filters values within a range and is strictly **INCLUSIVE** of both boundaries.",
    explanation: "`WHERE fee BETWEEN 15000 AND 20000` is logically equivalent to `WHERE fee >= 15000 AND fee <= 20000`.",
    hint: "Inclusive range filter.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE admission_fee BETWEEN 15000.00 AND 20000.00;"
  },
  {
    question: "What wildcard characters are supported by the `LIKE` operator in a `WHERE` clause?",
    shortAnswer: "`%` (matches zero or more characters) and `_` (matches exactly one single character).",
    explanation: "`LIKE 'Mam%'` matches 'Mamata', 'Mamon'; `LIKE 'M_hima'` matches 'Mahima'.",
    hint: "Percent and underscore wildcards.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE first_name LIKE 'Abh%';"
  },
  {
    question: "Why is `WHERE name LIKE '%ata'` non-sargable while `WHERE name LIKE 'Mam%'` is sargable?",
    shortAnswer: "Leading wildcards (`%text`) prevent B-Tree index navigation because the start of the string is unknown, forcing a full table scan; trailing wildcards (`text%`) allow index prefix matching.",
    explanation: "B-Trees are ordered alphabetically from left to right. Index search works on prefixes, not suffixes.",
    hint: "Leading wildcard B-Tree traversal limitation.",
    level: "expert"
  },
  {
    question: "How do you search for literal `%` or `_` characters in a `LIKE` pattern?",
    shortAnswer: "By escaping them with a backslash (`\\%`, `\\_`) or using the `ESCAPE` clause.",
    explanation: "`WHERE discount_code LIKE '10\\%%'` searches for codes starting with literal '10%'.",
    hint: "Backslash escaping in LIKE patterns.",
    level: "moderate",
    codeExample: "SELECT * FROM promotions WHERE promo_code LIKE 'SAVE\\_20%';"
  },
  {
    question: "What does `NOT IN` return if the subquery or list contains a `NULL` value?",
    shortAnswer: "It returns an empty result set (0 rows) because comparing any value with `!= NULL` yields `UNKNOWN`.",
    explanation: "If `list = (1, 2, NULL)`, `x NOT IN list` becomes `x != 1 AND x != 2 AND x != NULL`. The `x != NULL` evaluates to `UNKNOWN`, making the entire `AND` expression fail.",
    hint: "The famous NOT IN with NULL trap.",
    level: "expert",
    codeExample: "-- Danger: If subquery returns a NULL, NOT IN returns 0 rows!\n-- Safe alternative: NOT EXISTS"
  },
  {
    question: "How do you filter records based on boolean flags defined as `TINYINT(1)`?",
    shortAnswer: "`WHERE is_active = 1` (or `WHERE is_active` in MySQL).",
    explanation: "In MySQL, `1` represents TRUE and `0` represents FALSE.",
    hint: "Boolean tinyint evaluation.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE is_active = 1;"
  },
  {
    question: "What is the function of the `REGEXP` (or `RLIKE`) operator in a `WHERE` clause?",
    shortAnswer: "It performs regular expression pattern matching against string columns.",
    explanation: "`WHERE email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'` validates email syntax.",
    hint: "Regular expression pattern matching in SQL.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE phone_no REGEXP '^[6-9][0-9]{9}$';"
  },
  {
    question: "How do you filter records by a date range without including the time component in a `DATETIME` column?",
    shortAnswer: "Use range comparison with open end interval: `WHERE created_at >= '2026-08-01' AND created_at < '2026-09-01'`.",
    explanation: "This avoids wrapping `created_at` in `DATE()` (preserving sargability) and accurately captures all time increments up to 23:59:59.",
    hint: "Sargable date range interval boundary.",
    level: "expert",
    codeExample: "SELECT * FROM orders\nWHERE order_date >= '2026-08-01 00:00:00'\n  AND order_date < '2026-09-01 00:00:00';"
  },
  {
    question: "Can a `WHERE` clause be used in a `JOIN` statement?",
    shortAnswer: "Yes; the `ON` clause specifies how tables relate, while the `WHERE` clause filters the joined result set.",
    explanation: "In an `INNER JOIN`, placing conditions in `ON` vs `WHERE` produces identical results; in `LEFT JOIN`, `WHERE` filters out unmatched outer rows.",
    hint: "ON vs WHERE in outer joins.",
    level: "moderate",
    codeExample: "SELECT s.first_name, c.course_name\nFROM students s\nJOIN course_enrollments e ON s.student_id = e.student_id\nJOIN courses c ON e.course_id = c.course_id\nWHERE s.city = 'Barrackpore';"
  },
  {
    question: "What happens if a `WHERE` condition evaluates to `NULL` for a row?",
    shortAnswer: "The row is rejected and excluded from the output result set.",
    explanation: "`WHERE` requires a strictly `TRUE` outcome to retain a record.",
    hint: "Only TRUE passes the WHERE gatekeeper.",
    level: "basic"
  },
  {
    question: "How do you filter rows by case-sensitive string matching if the table collation is case-insensitive (`_ci`)?",
    shortAnswer: "Using the `COLLATE` or `BINARY` operator: `WHERE email = 'Mamata@Gmail.com' COLLATE utf8mb4_bin`.",
    explanation: "Forcing binary collation compares exact ASCII/UTF-8 byte values, enforcing strict case distinction.",
    hint: "COLLATE utf8mb4_bin operator.",
    level: "moderate",
    codeExample: "SELECT * FROM users WHERE username = 'Admin' COLLATE utf8mb4_bin;"
  },
  {
    question: "How do you filter records where a column value is one of several discrete string values?",
    shortAnswer: "Using `WHERE column_name IN ('val1', 'val2', 'val3')`.",
    explanation: "More concise and faster to read than writing multiple `OR` chains.",
    hint: "IN list membership operator.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city IN ('Barrackpore', 'Kolkata', 'Ichapur');"
  },
  {
    question: "What is an 'Index Skip Scan' in MySQL 8.0?",
    shortAnswer: "An optimization that allows MySQL to use a composite index `(col_a, col_b)` even when the `WHERE` clause only filters by the second column `col_b`.",
    explanation: "MySQL 8.0 skips across distinct values of `col_a` to perform sub-scans on `col_b`, eliminating the need for separate indexes.",
    hint: "MySQL 8.0 index skip scan optimizer feature.",
    level: "expert"
  },
  {
    question: "How do you filter records based on values inside a MySQL `JSON` column in a `WHERE` clause?",
    shortAnswer: "Using the JSON extract operator `->` or unquoting operator `->>` (e.g. `WHERE metadata->>'$.city' = 'Barrackpore'`).",
    explanation: "`->>` extracts the JSON property and unquotes it as a standard string for comparison.",
    hint: "JSON path extraction operator ->>.",
    level: "moderate",
    codeExample: "SELECT * FROM user_profiles\nWHERE profile_data->>'$.preferred_city' = 'Barrackpore';"
  },
  {
    question: "What does the `NOT` operator do in a `WHERE` clause?",
    shortAnswer: "It inverts the boolean result of a condition (turning TRUE to FALSE and FALSE to TRUE).",
    explanation: "`WHERE NOT (city = 'Kolkata')` filters out all Kolkata students.",
    hint: "Boolean inversion operator.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE NOT (city = 'Kolkata');"
  },
  {
    question: "Why is `WHERE 1 = 1` commonly used in dynamically generated SQL query builders?",
    shortAnswer: "It serves as a harmless true anchor, allowing application code to append subsequent conditions with `AND condition` without checking if it is the first condition.",
    explanation: "Simplifies backend query building logic in Java/Node.js/Python string concatenators.",
    hint: "True anchor for dynamic query generators.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE 1 = 1 AND city = 'Barrackpore';"
  },
  {
    question: "What error occurs if a `WHERE` clause references a column name that does not exist in the table?",
    shortAnswer: "Error 1054 (42S22): 'Unknown column in where clause'.",
    explanation: "MySQL validates column identifiers against table schema metadata during query parsing.",
    hint: "Error 1054 indicates non-existent column.",
    level: "basic"
  },
  {
    question: "What is the difference between `WHERE` and `WHERE NOT EXISTS` when finding orphaned child records?",
    shortAnswer: "`WHERE NOT EXISTS` checks if a correlated subquery returns zero rows, efficiently finding records that have no matching foreign key in a child table.",
    explanation: "Finding students with no enrollments: `SELECT * FROM students s WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id);`.",
    hint: "Anti-join pattern using NOT EXISTS.",
    level: "expert",
    codeExample: "SELECT * FROM students s\nWHERE NOT EXISTS (\n    SELECT 1 FROM course_enrollments e WHERE e.student_id = s.student_id\n);"
  },
  {
    question: "What is the recommended checklist when writing `WHERE` filter clauses in production?",
    shortAnswer: "1) Ensure filtered columns have supporting B-Tree indexes. 2) Keep conditions sargable (no functions on columns). 3) Group `AND`/`OR` logic with parentheses. 4) Use `IS NULL` for missing values. 5) Run `EXPLAIN` to verify execution plan.",
    explanation: "Following these 5 rules ensures queries execute in milliseconds with zero CPU bottlenecks.",
    hint: "Index support, Sargability, Parentheses grouping, IS NULL, EXPLAIN plan.",
    level: "basic"
  }
];

export default questions;
