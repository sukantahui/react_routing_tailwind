// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What is the primary function of the `SELECT` statement in SQL?",
    shortAnswer: "To retrieve, project, calculate, and format data records from one or more database tables.",
    explanation: "SELECT forms the core of Data Query Language (DQL), enabling applications to query data sets, perform mathematical calculations, and extract specific attributes.",
    hint: "DQL retrieval statement.",
    level: "basic",
    codeExample: "SELECT student_id, first_name, email FROM students;"
  },
  {
    question: "Why is `SELECT *` considered an architectural anti-pattern in production code?",
    shortAnswer: "It transfers unnecessary columns over the network, increases memory usage, breaks covering indexes, and causes frontend breaking changes if columns are reordered.",
    explanation: "Explicitly requesting columns (e.g. `SELECT id, name`) allows InnoDB to fulfill queries directly from secondary B-Tree index pages without visiting clustered index disk pages.",
    hint: "Bandwidth waste, RAM bloat, and covering index bypass.",
    level: "basic"
  },
  {
    question: "What is the purpose of Column Aliasing using the `AS` keyword?",
    shortAnswer: "To provide a temporary, human-readable, or API-compatible label for a projected column or computed expression in the query output.",
    explanation: "Aliases rename columns in the result set (e.g. `CONCAT(first_name, ' ', last_name) AS full_name`), making API consumption cleaner.",
    hint: "Temporary output renaming with AS.",
    level: "basic",
    codeExample: "SELECT first_name AS firstName, admission_fee AS feeINR FROM students;"
  },
  {
    question: "Why can you NOT reference a `SELECT` column alias inside the `WHERE` clause of the same query?",
    shortAnswer: "Because SQL's logical processing order executes the `WHERE` clause BEFORE evaluating expressions in the `SELECT` clause.",
    explanation: "In SQL processing flow: `FROM` → `WHERE` → `GROUP BY` → `HAVING` → `SELECT` → `ORDER BY`. When `WHERE` filters rows, the column alias does not exist yet.",
    hint: "SQL logical query execution phase ordering.",
    level: "moderate",
    codeExample: "-- FAILS: SELECT price * 0.18 AS tax FROM items WHERE tax > 100;\n-- WORKS: SELECT price * 0.18 AS tax FROM items WHERE (price * 0.18) > 100;"
  },
  {
    question: "In which SQL clauses CAN you reference a column alias created in `SELECT`?",
    shortAnswer: "In `ORDER BY`, `GROUP BY`, and `HAVING` clauses.",
    explanation: "Because `ORDER BY` and `HAVING` execute after `SELECT` projection in the logical processing pipeline, MySQL allows sorting and filtering by column aliases.",
    hint: "ORDER BY and HAVING execution order.",
    level: "moderate",
    codeExample: "SELECT first_name AS student_name, admission_fee AS fee\nFROM students\nORDER BY student_name ASC;"
  },
  {
    question: "What does the `DISTINCT` keyword do in a `SELECT` query?",
    shortAnswer: "It filters out duplicate rows from the result set, returning only unique values across the projected columns.",
    explanation: "`SELECT DISTINCT city FROM students;` scans the records and deduplicates identical city names in the final output.",
    hint: "Deduplication modifier.",
    level: "basic",
    codeExample: "SELECT DISTINCT city FROM students;"
  },
  {
    question: "How does `DISTINCT` behave when multiple columns are listed in the `SELECT` clause?",
    shortAnswer: "It evaluates uniqueness across the COMBINATION (tuple) of all specified columns, not just the first column.",
    explanation: "In `SELECT DISTINCT department, role FROM employees;`, a row is only filtered out if BOTH `department` AND `role` are identical to another row.",
    hint: "Composite tuple uniqueness.",
    level: "moderate",
    codeExample: "SELECT DISTINCT department, course_name FROM courses;"
  },
  {
    question: "How do you count the total number of unique non-null values in a column?",
    shortAnswer: "Using `SELECT COUNT(DISTINCT column_name) FROM table_name;`.",
    explanation: "`COUNT(DISTINCT city)` counts unique distinct cities, ignoring duplicate entries and excluding NULLs.",
    hint: "COUNT aggregate combined with DISTINCT.",
    level: "basic",
    codeExample: "SELECT COUNT(DISTINCT city) AS unique_cities FROM students;"
  },
  {
    question: "How does `DISTINCT` handle `NULL` values in MySQL?",
    shortAnswer: "All `NULL` values are treated as a single duplicate group, so the result set includes at most one `NULL` row.",
    explanation: "Even though `NULL != NULL` in standard comparison, `DISTINCT` groups all NULL instances together and returns a single representative NULL row.",
    hint: "NULL grouping behavior in DISTINCT.",
    level: "moderate"
  },
  {
    question: "Can you execute a `SELECT` statement in MySQL without a `FROM` table clause?",
    shortAnswer: "Yes, MySQL allows evaluating scalar mathematical expressions, string functions, and system variables directly without a FROM clause (or using dummy table `DUAL`).",
    explanation: "Running `SELECT 100 * 18 AS gst_amount;` or `SELECT VERSION(), DATABASE();` computes results on the server without touching table storage.",
    hint: "Scalar expression evaluation without FROM.",
    level: "basic",
    codeExample: "SELECT 15000 * 1.18 AS total_with_gst, CURRENT_TIMESTAMP AS query_time;"
  },
  {
    question: "How do you enclose column aliases that contain spaces, special characters, or reserved keywords?",
    shortAnswer: "Enclose the alias in backticks (`` ` ``) or standard double quotes (`\"`).",
    explanation: "Writing `SELECT fee AS \`Course Fee (₹)\` FROM students;` safely handles spaces and Indian Rupee symbols in output column headers.",
    hint: "Backtick or double quote escaping for aliases.",
    level: "basic",
    codeExample: "SELECT admission_fee AS `Tuition Fee (₹)` FROM students;"
  },
  {
    question: "What is the performance overhead of using `DISTINCT` on large unindexed tables?",
    shortAnswer: "MySQL must create an internal temporary table or perform a file sort (filesort) in memory to deduplicate rows, which can be CPU and RAM intensive.",
    explanation: "If an index exists on the projected columns, MySQL performs a fast index scan. Without an index, it must buffer and sort all matching rows.",
    hint: "Temporary table and filesort overhead for deduplication.",
    level: "expert"
  },
  {
    question: "What is the difference between `SELECT DISTINCT` and `SELECT ALL`?",
    shortAnswer: "`SELECT ALL` is the default behavior that retains all rows including duplicates; `SELECT DISTINCT` strips duplicates.",
    explanation: "Writing `SELECT col FROM t;` is implicitly identical to `SELECT ALL col FROM t;`.",
    hint: "Default ALL keyword in SQL.",
    level: "basic"
  },
  {
    question: "What is the difference between Table Aliasing and Column Aliasing?",
    shortAnswer: "Table aliases rename tables in the `FROM` clause (e.g. `FROM students s`); Column aliases rename output attributes in `SELECT` (e.g. `s.name AS studentName`).",
    explanation: "Table aliases shorten long table names in JOINs, while column aliases format output attributes.",
    hint: "FROM table alias vs SELECT column alias.",
    level: "basic",
    codeExample: "SELECT s.first_name AS name\nFROM barrackpore_college_db.students AS s;"
  },
  {
    question: "How can you perform string concatenation in a SELECT statement in MySQL?",
    shortAnswer: "Using the `CONCAT(str1, str2, ...)` or `CONCAT_WS(separator, str1, str2, ...)` built-in functions.",
    explanation: "`CONCAT_WS(' ', first_name, last_name) AS full_name` combines multiple string fields with a whitespace delimiter.",
    hint: "CONCAT and CONCAT_WS functions.",
    level: "basic",
    codeExample: "SELECT CONCAT_WS(' ', first_name, last_name) AS full_name FROM students;"
  },
  {
    question: "What happens if one of the arguments passed into `CONCAT()` is NULL vs in `CONCAT_WS()`?",
    shortAnswer: "`CONCAT()` returns `NULL` if ANY argument is NULL; `CONCAT_WS()` skips NULL arguments and concatenates the remaining non-null values.",
    explanation: "`CONCAT('Mamata', NULL)` results in `NULL`. `CONCAT_WS(' ', 'Mamata', NULL, 'Hui')` safely returns `'Mamata Hui'`.",
    hint: "NULL handling differences between CONCAT and CONCAT_WS.",
    level: "moderate"
  },
  {
    question: "How do you format numeric currency values to 2 decimal places in a `SELECT` statement?",
    shortAnswer: "Using the `ROUND(number, 2)` or `FORMAT(number, 2)` built-in functions.",
    explanation: "`ROUND(admission_fee * 1.18, 2)` rounds mathematical calculations to exact paise.",
    hint: "ROUND and FORMAT mathematical functions.",
    level: "basic",
    codeExample: "SELECT ROUND(admission_fee * 1.18, 2) AS total_fee_inr FROM students;"
  },
  {
    question: "Can you combine `DISTINCT` with `ORDER BY` on a column that is NOT included in the `SELECT` list?",
    shortAnswer: "In standard SQL and MySQL with `ONLY_FULL_GROUP_BY` enabled, ordering by a non-projected column in a `DISTINCT` query is disallowed.",
    explanation: "Because `DISTINCT` collapses multiple rows into one, ordering by an omitted attribute is logically ambiguous.",
    hint: "Ambiguity of ordering by unprojected columns in DISTINCT.",
    level: "expert"
  },
  {
    question: "What is a 'Covering Index' and how does it make `SELECT` statements execute in micro-seconds?",
    shortAnswer: "A secondary index that contains ALL the columns requested by the SELECT query, allowing MySQL to fulfill the query directly from RAM without visiting the table data pages.",
    explanation: "If you have an index on `(city, email)` and run `SELECT email FROM students WHERE city = 'Barrackpore';`, MySQL reads directly from index memory (Using index).",
    hint: "Using Index covering scan.",
    level: "expert"
  },
  {
    question: "How do you use conditional logic directly inside a `SELECT` expression?",
    shortAnswer: "Using the `CASE WHEN ... THEN ... ELSE ... END` expression or the `IF(condition, true_val, false_val)` function.",
    explanation: "Allows evaluating conditional labels dynamically: `SELECT first_name, IF(admission_fee >= 18000, 'Premium', 'Standard') AS fee_tier FROM students;`.",
    hint: "CASE WHEN expressions and IF function.",
    level: "moderate",
    codeExample: "SELECT first_name,\n       CASE WHEN is_active = 1 THEN 'Enrolled' ELSE 'Withdrawn' END AS status\nFROM students;"
  },
  {
    question: "What does `SELECT @@session.sql_mode;` return?",
    shortAnswer: "The list of currently active SQL mode flags governing strict type checking, group by enforcement, and validation rules for the session.",
    explanation: "Outputs flags like `STRICT_TRANS_TABLES`, `NO_ZERO_DATE`, `ONLY_FULL_GROUP_BY`.",
    hint: "Session configuration inspection.",
    level: "moderate",
    codeExample: "SELECT @@sql_mode;"
  },
  {
    question: "How do you convert a column value to uppercase or lowercase in the `SELECT` projection?",
    shortAnswer: "Using `UPPER(col)` (or `UCASE()`) and `LOWER(col)` (or `LCASE()`).",
    explanation: "`SELECT UPPER(first_name) AS upper_name, LOWER(email) AS clean_email FROM students;`.",
    hint: "UPPER and LOWER string transformers.",
    level: "basic",
    codeExample: "SELECT UPPER(first_name) AS capitalized_name FROM students;"
  },
  {
    question: "Why should developers avoid using `DISTINCT` as a quick fix for duplicate rows caused by improper JOINs?",
    shortAnswer: "Because it masks the underlying Cartesian product bug, wastes server CPU sorting duplicates, and can hide critical missing join keys.",
    explanation: "Fix the join condition (`ON a.id = b.id`) rather than forcing MySQL to sort and discard millions of duplicate rows.",
    hint: "Root cause fix vs band-aid DISTINCT.",
    level: "expert"
  },
  {
    question: "How do you replace NULL values with a default fallback in the `SELECT` list?",
    shortAnswer: "Using `IFNULL(column, fallback_value)` or ANSI `COALESCE(val1, val2, ...) `.",
    explanation: "`SELECT first_name, IFNULL(phone_no, 'Not Provided') AS contact_phone FROM students;` ensures output is never empty.",
    hint: "IFNULL and COALESCE functions.",
    level: "basic",
    codeExample: "SELECT first_name, COALESCE(phone_no, 'N/A') AS phone FROM students;"
  },
  {
    question: "What is the logical execution order of the 6 main SQL clauses?",
    shortAnswer: "1. `FROM` → 2. `WHERE` → 3. `GROUP BY` → 4. `HAVING` → 5. `SELECT` → 6. `ORDER BY` → 7. `LIMIT`.",
    explanation: "Understanding this lifecycle explains why aliases cannot be used in `WHERE`, why aggregates require `HAVING`, and why `LIMIT` executes last.",
    hint: "SQL query execution lifecycle.",
    level: "expert"
  },
  {
    question: "How can you return the current database name, connected user, and server version in a single `SELECT` query?",
    shortAnswer: "`SELECT DATABASE(), CURRENT_USER(), VERSION();`.",
    explanation: "Executes client/server diagnostics in a single lightweight command.",
    hint: "System diagnostic functions.",
    level: "basic",
    codeExample: "SELECT DATABASE(), CURRENT_USER(), VERSION();"
  },
  {
    question: "Can `DISTINCT` be used inside mathematical aggregate functions like `SUM()` or `AVG()`?",
    shortAnswer: "Yes, `SUM(DISTINCT salary)` sums only unique salary amounts; `AVG(DISTINCT score)` averages distinct scores.",
    explanation: "Useful when deduplicating repeated values produced by fan-out one-to-many joins.",
    hint: "Aggregate functions supporting DISTINCT modifier.",
    level: "moderate",
    codeExample: "SELECT SUM(DISTINCT admission_fee) FROM students;"
  },
  {
    question: "How do you select literal static string or number values alongside table columns?",
    shortAnswer: "Include the literal directly in the SELECT list (e.g. `SELECT student_id, 'INR' AS currency, admission_fee FROM students;`).",
    explanation: "MySQL appends the constant value to every row returned in the result set.",
    hint: "Static literal projection in SELECT.",
    level: "basic",
    codeExample: "SELECT student_id, 'Barrackpore Branch' AS branch_location, first_name FROM students;"
  },
  {
    question: "What is the maximum number of columns that can be projected in a single `SELECT` query in MySQL?",
    shortAnswer: "4,096 columns (governed by table column limits).",
    explanation: "While technically possible, practical application queries project only 5 to 20 necessary attributes.",
    hint: "Table column limit ceiling.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when writing production `SELECT` queries?",
    shortAnswer: "1) Never use `SELECT *`; name columns explicitly. 2) Use meaningful aliases (`AS`). 3) Leverage covering indexes. 4) Use `IFNULL()` for clean defaults. 5) Use `DISTINCT` only when genuinely required for category lists.",
    explanation: "Following these 5 principles guarantees optimal database query latency, low memory footprint, and clean API contracts.",
    hint: "Explicit columns, Aliases, Covering indexes, IFNULL, Judicious DISTINCT.",
    level: "basic"
  }
];

export default questions;
