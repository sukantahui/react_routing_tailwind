// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What does `NULL` represent in SQL databases?",
    shortAnswer: "`NULL` represents missing, unknown, unavailable, or inapplicable data; it is distinct from zero (0) or an empty string ('').",
    explanation: "NULL is a marker for missing information, not a standard data value.",
    hint: "NULL signifies absence of a value, not 0 or an empty string.",
    level: "basic"
  },
  {
    question: "What is the key difference between `COUNT(*)` and `COUNT(column_name)`?",
    shortAnswer: "`COUNT(*)` counts all physical rows in a table/group regardless of NULLs, while `COUNT(column_name)` counts only rows where `column_name` is non-NULL.",
    explanation: "COUNT(*) counts the raw tuple count; COUNT(col) skips rows where col IS NULL.",
    hint: "COUNT(*) counts all rows; COUNT(col) ignores NULL values.",
    level: "basic"
  },
  {
    question: "How do `SUM()`, `AVG()`, `MIN()`, and `MAX()` handle `NULL` values?",
    shortAnswer: "They automatically ignore (skip) all `NULL` values during calculation.",
    explanation: "Aggregate arithmetic functions operate solely over known, non-NULL numbers in the dataset.",
    hint: "They silently ignore all NULL values.",
    level: "basic"
  },
  {
    question: "What is returned if you execute `SUM(fee_amount)` on a group where every single row has `fee_amount = NULL`?",
    shortAnswer: "`NULL` (not 0).",
    explanation: "If no non-NULL numbers exist in the set, arithmetic aggregates return NULL.",
    hint: "SUM on all NULL values evaluates to NULL, not 0.",
    level: "basic"
  },
  {
    question: "What is returned if you execute `COUNT(fee_amount)` on a group where every single row has `fee_amount = NULL`?",
    shortAnswer: "`0`.",
    explanation: "COUNT of a column returns an integer representing the count of non-NULL values found (which is 0).",
    hint: "COUNT returns 0 when no non-NULL values are present.",
    level: "basic"
  },
  {
    question: "How does MySQL treat `NULL` values in a `GROUP BY` column?",
    shortAnswer: "All rows containing `NULL` are treated as equivalent and gathered together into a single shared `[NULL]` group bucket.",
    explanation: "For grouping purposes only, NULL equals NULL, creating one discrete bucket for missing values.",
    hint: "All rows with NULL in the grouping column form one single group bucket.",
    level: "basic"
  },
  {
    question: "What is the difference in output between `AVG(marks)` and `AVG(COALESCE(marks, 0))`?",
    shortAnswer: "`AVG(marks)` computes the average of only students who received marks (excluding absent/NULL students from the denominator), whereas `AVG(COALESCE(marks, 0))` includes absent students as 0 in both numerator and denominator.",
    explanation: "This is the classic Average Distortion Pitfall; COALESCE forces the denominator to include NULL rows.",
    hint: "COALESCE includes NULL rows in the count divisor as 0.",
    level: "moderate"
  },
  {
    question: "How can you count the exact number of rows that contain `NULL` in a specific column `marks`?",
    shortAnswer: "`COUNT(*) - COUNT(marks)` or `SUM(CASE WHEN marks IS NULL THEN 1 ELSE 0 END)`.",
    explanation: "Subtracting non-null count from total row count yields the exact null frequency.",
    hint: "Subtract COUNT(marks) from COUNT(*).",
    level: "moderate"
  },
  {
    question: "Why does `WHERE marks = NULL` fail to return any rows, even if rows with NULL marks exist?",
    shortAnswer: "Because comparing any value with NULL using `=` produces `UNKNOWN`, and the `WHERE` clause only accepts rows where conditions evaluate to `TRUE`.",
    explanation: "Three-Valued Logic (3VL) dictates that NULL comparisons must use `IS NULL` or `IS NOT NULL`.",
    hint: "Use IS NULL instead of = NULL.",
    level: "basic"
  },
  {
    question: "How do you prevent a division-by-zero database error when calculating average revenue per student?",
    shortAnswer: "Use `SUM(revenue) / NULLIF(COUNT(student_id), 0)`.",
    explanation: "NULLIF returns NULL when the divisor is 0, causing the entire division to safely evaluate to NULL instead of throwing a runtime crash.",
    hint: "Wrap the denominator in NULLIF(denominator, 0).",
    level: "moderate"
  },
  {
    question: "What does `COALESCE(val1, val2, val3)` do?",
    shortAnswer: "It evaluates its arguments in order and returns the first non-NULL expression, or NULL if all arguments are NULL.",
    explanation: "COALESCE is the standard ANSI SQL function for providing fallback values.",
    hint: "Returns the first non-NULL argument from left to right.",
    level: "basic"
  },
  {
    question: "What is the difference between `IFNULL(a, b)` and `COALESCE(a, b)` in MySQL?",
    shortAnswer: "`IFNULL(a, b)` is a MySQL-specific 2-argument function, while `COALESCE()` is ANSI SQL standard and accepts 2 or more arguments.",
    explanation: "COALESCE is portable across all database management systems (PostgreSQL, Oracle, SQL Server).",
    hint: "COALESCE is ANSI standard and takes N arguments; IFNULL is MySQL-specific and takes only 2.",
    level: "moderate"
  },
  {
    question: "What happens when you group by two columns `GROUP BY colA, colB` and some rows have `(colA_val, NULL)`?",
    shortAnswer: "Rows with `(colA_val, NULL)` form their own distinct composite group separate from `(colA_val, 'Value')` and `(NULL, NULL)`.",
    explanation: "Composite grouping evaluates each distinct pair of values independently.",
    hint: "Each unique combination of values (including NULLs) forms its own distinct group.",
    level: "moderate"
  },
  {
    question: "How does `GROUP_CONCAT(student_name)` handle `NULL` student names?",
    shortAnswer: "It ignores (skips) all `NULL` student names and concatenates only non-NULL strings.",
    explanation: "GROUP_CONCAT follows standard aggregate NULL suppression rules.",
    hint: "It ignores NULLs and concatenates only non-NULL strings.",
    level: "basic"
  },
  {
    question: "What is returned if `GROUP_CONCAT()` is called on a group where ALL names are `NULL`?",
    shortAnswer: "`NULL`.",
    explanation: "When no non-null strings exist to concatenate, the function yields NULL.",
    hint: "Returns NULL if all items in the group are NULL.",
    level: "basic"
  },
  {
    question: "How can you replace `NULL` values inside `GROUP_CONCAT()` with placeholder text like '[Anonymous]'?",
    shortAnswer: "`GROUP_CONCAT(COALESCE(student_name, '[Anonymous]') SEPARATOR ', ')`",
    explanation: "Applying COALESCE inside the argument converts NULLs to string literals before concatenation.",
    hint: "Wrap the column in COALESCE inside GROUP_CONCAT.",
    level: "moderate"
  },
  {
    question: "Why should you wrap `SUM(fee_amount)` with `COALESCE(SUM(fee_amount), 0)` in production REST APIs?",
    shortAnswer: "To ensure the database returns a numeric `0` instead of `NULL` when an empty category or all-null partition is aggregated, preventing null pointer crashes in frontend apps.",
    explanation: "COALESCE(SUM(col), 0) guarantees deterministic numeric data types in JSON payloads.",
    hint: "Prevents null values from breaking frontend numeric parsers.",
    level: "moderate"
  },
  {
    question: "How does the `HAVING` clause treat an aggregate condition when the aggregate evaluates to `NULL` (e.g. `HAVING AVG(marks) >= 50`)?",
    shortAnswer: "The comparison evaluates to `UNKNOWN`, which is treated as false, so the group is excluded from the query results.",
    explanation: "HAVING requires conditions to evaluate to TRUE; UNKNOWN results are discarded.",
    hint: "UNKNOWN conditions are excluded by the HAVING clause.",
    level: "moderate"
  },
  {
    question: "How can you explicitly include groups whose aggregate value is `NULL` in the `HAVING` clause?",
    shortAnswer: "`HAVING AVG(marks) >= 50 OR AVG(marks) IS NULL` or `HAVING COALESCE(AVG(marks), 0) >= 50`.",
    explanation: "Adding an explicit IS NULL check or COALESCE ensures rows with unknown averages are not lost if intended to be displayed.",
    hint: "Use OR AVG(marks) IS NULL in the HAVING clause.",
    level: "moderate"
  },
  {
    question: "What is the result of `COUNT(DISTINCT column_name)` if the column contains values `('React', 'React', NULL, 'Java')`?",
    shortAnswer: "`2` ('React' and 'Java').",
    explanation: "COUNT(DISTINCT) ignores NULL and counts unique non-null values.",
    hint: "Ignores NULL and counts distinct non-null strings (2).",
    level: "basic"
  },
  {
    question: "How can you make `COUNT(DISTINCT)` count `NULL` as a distinct value?",
    shortAnswer: "`COUNT(DISTINCT COALESCE(column_name, '__NULL__'))`",
    explanation: "Substituting a unique placeholder string allows COUNT(DISTINCT) to recognize NULL as a distinct category.",
    hint: "Use COALESCE to replace NULL with a unique sentinel string.",
    level: "moderate"
  },
  {
    question: "Does `MIN()` or `MAX()` treat `NULL` as smaller than all other numbers?",
    shortAnswer: "NO. `MIN()` and `MAX()` completely ignore `NULL` values and return the smallest/largest non-NULL number in the group.",
    explanation: "NULL is not treated as negative infinity; it is ignored entirely.",
    hint: "NULL is ignored and does not participate in min/max comparisons.",
    level: "basic"
  },
  {
    question: "In `ORDER BY`, where does MySQL place `NULL` values by default when sorting ascending (`ASC`)?",
    shortAnswer: "At the very beginning (first rows) of the result set.",
    explanation: "In MySQL, NULLs are considered lower than any non-NULL value for sorting purposes in ASC order.",
    hint: "In ASC order, MySQL puts NULLs first; in DESC order, NULLs appear last.",
    level: "moderate"
  },
  {
    question: "How can you force `NULL` values to appear at the bottom when sorting in ascending (`ASC`) order in MySQL?",
    shortAnswer: "`ORDER BY (column_name IS NULL) ASC, column_name ASC` or `ORDER BY -column_name DESC`.",
    explanation: "Evaluating `(column_name IS NULL)` produces 0 for non-null and 1 for null, pushing nulls to the end.",
    hint: "Use ORDER BY (col IS NULL) ASC, col ASC.",
    level: "expert"
  },
  {
    question: "Why does `SUM(col1 + col2)` return `NULL` if `col1 = 100` and `col2 = NULL` in a row?",
    shortAnswer: "Because in SQL arithmetic, `100 + NULL` evaluates to `NULL`, which is then ignored by `SUM()`.",
    explanation: "Arithmetic operations containing any NULL operand yield NULL; wrap individual columns with `COALESCE(col2, 0)`.",
    hint: "Any arithmetic addition with NULL produces NULL.",
    level: "basic"
  },
  {
    question: "How should you correctly write a query to sum two nullable fee columns `tuition_fee` and `lab_fee`?",
    shortAnswer: "`SUM(COALESCE(tuition_fee, 0) + COALESCE(lab_fee, 0))`",
    explanation: "Coalescing both columns guarantees that a null lab fee does not nullify the entire tuition amount for that student.",
    hint: "Apply COALESCE to each column before the addition operator.",
    level: "basic"
  },
  {
    question: "What is the difference between `NULL` in standard SQL and `NaN` in JavaScript/Python?",
    shortAnswer: "`NULL` in SQL represents the absence of data, whereas `NaN` in programming represents an invalid mathematical operation result (Not-a-Number).",
    explanation: "SQL uses NULL for missing values, while NaN is a floating point IEEE 754 special state.",
    hint: "NULL is missing data; NaN is an invalid numerical calculation result.",
    level: "moderate"
  },
  {
    question: "Can a `PRIMARY KEY` column contain `NULL` values in MySQL?",
    shortAnswer: "NO. A primary key automatically enforces both `UNIQUE` and `NOT NULL` constraints.",
    explanation: "Relational integrity requires every primary key to be non-null to ensure entity uniqueness.",
    hint: "Primary keys can never contain NULL values.",
    level: "basic"
  },
  {
    question: "Can a `UNIQUE` index column contain `NULL` values in MySQL InnoDB?",
    shortAnswer: "YES. InnoDB allows multiple `NULL` values in a UNIQUE column because in SQL logic, NULL does not equal NULL.",
    explanation: "Multiple rows can have NULL in a unique index without violating uniqueness constraints.",
    hint: "Yes; multiple NULLs are allowed in a UNIQUE index in MySQL.",
    level: "expert"
  },
  {
    question: "What is the best practice for designing database tables regarding NULLable aggregate columns?",
    shortAnswer: "Use `NOT NULL DEFAULT 0` for numeric metric columns (like fees, quantities, prices) to eliminate NULL arithmetic edge cases entirely.",
    explanation: "Setting sensible NOT NULL defaults simplifies analytical queries and eliminates NULL-checking overhead.",
    hint: "Declare metric columns as NOT NULL with a DEFAULT 0 value.",
    level: "expert"
  }
];

export default questions;
