// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What are the standard comparison operators supported in MySQL?",
    shortAnswer: "`=` (Equal), `!=` or `<>` (Not equal), `<` (Less than), `>` (Greater than), `<=` (Less/Equal), `>=` (Greater/Equal), and `<=>` (NULL-Safe Equal).",
    explanation: "These operators compare two operands and return 1 (TRUE), 0 (FALSE), or NULL (UNKNOWN).",
    hint: "Standard mathematical and SQL comparison symbols.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE admission_fee >= 15000.00;"
  },
  {
    question: "What is the difference between `!=` and `<>` in MySQL?",
    shortAnswer: "There is no functional difference in MySQL; `<>` is the official ANSI SQL standard, while `!=` is an accepted synonym.",
    explanation: "Both operators evaluate whether two operands have differing values. In enterprise cross-database codebases, `<>` is preferred for portability.",
    hint: "ANSI standard vs accepted synonym.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE city <> 'Kolkata';"
  },
  {
    question: "What is the MySQL NULL-Safe Equal Operator (`<=>`)?",
    shortAnswer: "A comparison operator that behaves like `=`, but returns `1` (TRUE) when comparing `NULL <=> NULL` and `0` (FALSE) when comparing a value to NULL.",
    explanation: "Unlike `=`, which yields `UNKNOWN` when comparing to NULL, `<=>` returns a deterministic boolean 1 or 0.",
    hint: "Three-character NULL safe comparison operator.",
    level: "moderate",
    codeExample: "SELECT NULL <=> NULL; -- Returns 1 (TRUE)\nSELECT 100 <=> NULL;  -- Returns 0 (FALSE)"
  },
  {
    question: "Why does `WHERE status != 'active'` silently omit rows where `status` is NULL?",
    shortAnswer: "Because `NULL != 'active'` evaluates to `UNKNOWN`, which fails the WHERE filter predicate.",
    explanation: "In SQL Three-Valued Logic, any standard comparison against NULL is UNKNOWN. To include NULL rows, write `WHERE status != 'active' OR status IS NULL`.",
    hint: "NULL elimination in inequality comparisons.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE status != 'active' OR status IS NULL;"
  },
  {
    question: "What happens when comparing numbers stored as strings (e.g. `'100' < '20'`) in SQL?",
    shortAnswer: "They are compared alphabetically/lexicographically, so `'100'` is considered LESS than `'20'` because character '1' precedes '2'.",
    explanation: "This is a classic bug when storing numbers in `VARCHAR` columns instead of `INT` or `DECIMAL`.",
    hint: "Lexicographical ASCII character comparison.",
    level: "basic",
    codeExample: "SELECT '100' < '20'; -- Returns 1 (TRUE) in string comparison!"
  },
  {
    question: "How does collation affect string equality (`=`) in MySQL?",
    shortAnswer: "Under case-insensitive collations (`_ci`), `'kolkata' = 'Kolkata'` is TRUE; under binary collations (`_bin`), it is FALSE.",
    explanation: "Collation dictates character weight rules during comparison.",
    hint: "Case-insensitive vs binary collation weights.",
    level: "moderate",
    codeExample: "SELECT 'Kolkata' = 'kolkata' COLLATE utf8mb4_0900_ai_ci; -- 1 (TRUE)\nSELECT 'Kolkata' = 'kolkata' COLLATE utf8mb4_bin;        -- 0 (FALSE)"
  },
  {
    question: "What happens if you write `WHERE date_col > 2026-08-24` without quotes around the date?",
    shortAnswer: "MySQL parses `2026-08-24` as mathematical subtraction: `2026 - 8 - 24 = 1994`, comparing the date against integer 1994.",
    explanation: "Always wrap date and datetime literals in single quotes: `'2026-08-24'`.",
    hint: "Mathematical subtraction bug with unquoted dates.",
    level: "basic",
    codeExample: "-- BUG: WHERE created_at > 2026-08-24\n-- FIX: WHERE created_at > '2026-08-24'"
  },
  {
    question: "How do comparison operators evaluate dates and timestamps chronologically?",
    shortAnswer: "Later dates are considered 'greater than' earlier dates (e.g. `'2026-12-31' > '2026-01-01'` is TRUE).",
    explanation: "MySQL compares dates chronologically in ISO 8601 sequence (`YYYY-MM-DD`).",
    hint: "Chronological time progression.",
    level: "basic"
  },
  {
    question: "What is the result of comparing floating-point numbers with exact equality (`FLOAT = 0.3`)?",
    shortAnswer: "It frequently fails unexpectedly due to IEEE 754 binary floating-point rounding drift.",
    explanation: "Never use `=` on FLOAT or DOUBLE columns; use `DECIMAL` for exact comparisons or range tolerances `ABS(a - b) < 0.0001`.",
    hint: "Floating point precision drift.",
    level: "moderate"
  },
  {
    question: "Can comparison operators be used directly inside `SELECT` column projections?",
    shortAnswer: "Yes, MySQL evaluates the comparison and outputs `1` for TRUE, `0` for FALSE, or `NULL` for UNKNOWN.",
    explanation: "`SELECT student_id, (admission_fee >= 18000) AS is_premium FROM students;` returns 1 or 0 for each row.",
    hint: "Boolean projection in SELECT list.",
    level: "basic",
    codeExample: "SELECT first_name, (admission_fee > 15000) AS is_high_fee FROM students;"
  },
  {
    question: "What is the difference between `col = ANY (subquery)` and `col IN (subquery)`?",
    shortAnswer: "They are exact synonyms; `= ANY` behaves identically to `IN`.",
    explanation: "Both evaluate whether the left operand equals at least one value returned by the subquery.",
    hint: "= ANY is equivalent to IN.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE admission_fee = ANY (SELECT fee FROM standard_fees);"
  },
  {
    question: "What does `col > ALL (subquery)` do?",
    shortAnswer: "It returns TRUE only if the left operand is strictly greater than EVERY single value returned by the subquery (i.e. greater than the maximum).",
    explanation: "Useful for finding records that exceed all values in another data set without computing `MAX()` explicitly.",
    hint: "Greater than maximum of subquery.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE admission_fee > ALL (SELECT fee FROM tier1_fees);"
  },
  {
    question: "What does `col < ANY (subquery)` do?",
    shortAnswer: "It returns TRUE if the left operand is less than AT LEAST ONE value returned by the subquery (i.e. less than the maximum).",
    explanation: "Evaluates if a row is smaller than the largest value in the candidate set.",
    hint: "Less than maximum of candidate set.",
    level: "expert"
  },
  {
    question: "How do comparison operators interact with B-Tree indexes in InnoDB?",
    shortAnswer: "`=` performs an exact B-Tree point lookup (type: `ref` or `const`); `<`, `>`, `<=`, `>=` perform B-Tree range scans (type: `range`).",
    explanation: "Both are highly efficient O(log N) indexed search methods.",
    hint: "Point lookup vs range scan index access methods.",
    level: "expert"
  },
  {
    question: "What happens when comparing a string to an integer (e.g. `WHERE varchar_id = 100`)?",
    shortAnswer: "MySQL converts the string column to integers, preventing the use of any index on `varchar_id` and forcing a full table scan.",
    explanation: "Type mismatch between column and literal triggers implicit casting and breaks sargability.",
    hint: "Implicit type conversion disables index usage.",
    level: "expert"
  },
  {
    question: "How can you compare two tuple expressions simultaneously (Row Constructor Comparison)?",
    shortAnswer: "Using tuple syntax: `WHERE (col1, col2) = (val1, val2)` or `WHERE (col1, col2) > (val1, val2)`.",
    explanation: "Supported by MySQL for composite key pagination (Keyset pagination / Cursor pagination).",
    hint: "Row constructor tuple comparison.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE (city, admission_fee) = ('Barrackpore', 15000.00);"
  },
  {
    question: "What is Keyset Pagination and how do comparison operators make it faster than `OFFSET`?",
    shortAnswer: "Filtering by `WHERE (id > last_seen_id)` uses B-Tree index seeks in O(log N) time, completely eliminating the performance penalty of large `OFFSET` values.",
    explanation: "As tables grow to millions of rows, `OFFSET 1000000` scans and discards 1 million rows; keyset comparison jumps directly to the target leaf page.",
    hint: "Keyset / cursor pagination vs OFFSET.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE student_id > 10500 ORDER BY student_id ASC LIMIT 20;"
  },
  {
    question: "How does MySQL compare ENUM column values?",
    shortAnswer: "ENUMs are compared by their string literal representation if compared against strings, or by their internal integer index if compared against numbers.",
    explanation: "If `status ENUM('draft', 'active')`, `status = 'active'` compares string values; `status = 2` compares by internal index.",
    hint: "String vs internal integer index comparison.",
    level: "moderate"
  },
  {
    question: "What is the result of `SELECT '0' = 0` vs `SELECT 'abc' = 0` in MySQL 8.0?",
    shortAnswer: "In MySQL 8.0.22+, comparing non-numeric strings to numbers attempts safe type comparison or raises a warning/error.",
    explanation: "In older MySQL versions, `'abc'` was converted to integer `0`, causing `'abc' = 0` to return TRUE. MySQL 8.0 improved numeric type casting safety.",
    hint: "String to number comparison evolution in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "How do you test if a value is strictly greater than zero and not null in a single comparison?",
    shortAnswer: "`WHERE column_name > 0` (because if the column is NULL, `NULL > 0` evaluates to UNKNOWN and is rejected).",
    explanation: "Standard numeric comparisons naturally filter out NULLs.",
    hint: "Numeric comparison automatically rejects NULL.",
    level: "basic",
    codeExample: "SELECT * FROM accounts WHERE balance > 0.00;"
  },
  {
    question: "What is the difference between `a <= b` and `NOT (a > b)` when `a` or `b` is NULL?",
    shortAnswer: "Both evaluate to `UNKNOWN` when NULL is involved, but in two-valued logic systems, negation can behave differently.",
    explanation: "If `a = NULL`, `a <= b` is UNKNOWN (rejected); `NOT (a > b)` is `NOT (UNKNOWN) = UNKNOWN` (also rejected in WHERE).",
    hint: "Negation of UNKNOWN remains UNKNOWN.",
    level: "moderate"
  },
  {
    question: "How do you compare spatial geometric data (GIS) in MySQL?",
    shortAnswer: "Using spatial comparison functions like `ST_Contains()`, `ST_Within()`, `ST_Distance()`.",
    explanation: "Spatial columns use R-Tree indexes and dedicated geometry functions rather than scalar `=` operators.",
    hint: "Spatial ST functions.",
    level: "expert",
    codeExample: "SELECT * FROM stores WHERE ST_Distance(location, ST_GeomFromText('POINT(88.36 22.76)')) < 5000;"
  },
  {
    question: "How do you compare time durations using TIME data types?",
    shortAnswer: "Directly using comparison operators: `WHERE elapsed_time > '01:30:00'`.",
    explanation: "MySQL interprets string literals formatted as `HH:MM:SS` as chronological duration values.",
    hint: "TIME duration string comparison.",
    level: "basic",
    codeExample: "SELECT * FROM lab_sessions WHERE duration > '02:00:00';"
  },
  {
    question: "What does the `COALESCE` function do when paired with comparison operators?",
    shortAnswer: "It supplies a default fallback value for NULL columns so comparisons can evaluate safely without returning UNKNOWN.",
    explanation: "`WHERE COALESCE(discount, 0) > 10` treats NULL discounts as 0.",
    hint: "COALESCE provides fallback values for comparisons.",
    level: "basic",
    codeExample: "SELECT * FROM products WHERE COALESCE(discount_percent, 0) >= 15;"
  },
  {
    question: "How do comparison operators work in CHECK constraints in MySQL 8.0?",
    shortAnswer: "The CHECK constraint enforces that every inserted or updated row must satisfy the comparison expression (evaluates to TRUE or UNKNOWN).",
    explanation: "A constraint like `CHECK (admission_fee >= 10000.00)` rejects any write where the comparison evaluates to FALSE.",
    hint: "CHECK constraint validation enforcement.",
    level: "moderate",
    codeExample: "ALTER TABLE students ADD CONSTRAINT chk_min_fee CHECK (admission_fee >= 10000.00);"
  },
  {
    question: "What is the return value of `SELECT 5 != 5` in MySQL?",
    shortAnswer: "`0` (representing boolean FALSE).",
    explanation: "5 is equal to 5, so the inequality statement is FALSE (0).",
    hint: "Boolean 0 output in MySQL.",
    level: "basic"
  },
  {
    question: "How do you compare JSON attributes using comparison operators in MySQL 8.0?",
    shortAnswer: "Using the unquoted JSON operator `->>` or wrapping extracted values with `CAST(... AS UNSIGNED/DECIMAL)`.",
    explanation: "`WHERE CAST(metadata->>'$.score' AS UNSIGNED) >= 80` compares extracted numbers mathematically.",
    hint: "JSON unquoting and casting for numeric comparisons.",
    level: "expert",
    codeExample: "SELECT * FROM student_profiles WHERE CAST(data->>'$.marks' AS UNSIGNED) >= 75;"
  },
  {
    question: "Can comparison operators be chained like `10 < col < 20` in SQL?",
    shortAnswer: "No; SQL evaluates left to right: `(10 < col)` returns `0` or `1`, which is then compared to `20` (`1 < 20` = TRUE)! Always use `BETWEEN` or `col > 10 AND col < 20`.",
    explanation: "Chained comparisons do NOT test ranges in SQL and lead to disastrous logic bugs.",
    hint: "Chained comparison logic trap.",
    level: "moderate"
  },
  {
    question: "What is the difference between comparing strings using `LIKE` vs `=`?",
    shortAnswer: "`=` tests exact string equality across the entire string; `LIKE` supports wildcard pattern matching (`%` and `_`).",
    explanation: "If no wildcards are present, `LIKE 'Mamata'` behaves identically to `= 'Mamata'`.",
    hint: "Exact match vs wildcard matching.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist when writing comparison expressions in SQL queries?",
    shortAnswer: "1) Use `<>` or `!=` for inequality. 2) Use `<=>` for nullable column comparisons. 3) Always quote strings and dates. 4) Use `DECIMAL` for currency (₹). 5) Avoid chaining comparisons; use `AND`/`BETWEEN`.",
    explanation: "Following these 5 rules eliminates subtle logic bugs and guarantees correct boolean filtering.",
    hint: "ANSI operators, NULL safety, Quoting literals, DECIMAL currency, Disambiguated ranges.",
    level: "basic"
  }
];

export default questions;
