// topic15_files/topic15_questions.js

const questions = [
  {
    question: "What does `NULL` represent in relational databases?",
    shortAnswer: "A missing, unknown, unassigned, or inapplicable data state.",
    explanation: "NULL is not zero (`0`), false (`0`), or an empty string (`''`); it represents the total absence of a value.",
    hint: "Absence of a value.",
    level: "basic"
  },
  {
    question: "Why can you NOT use `= NULL` or `!= NULL` to test for NULL in SQL?",
    shortAnswer: "Because in SQL Three-Valued Logic (3VL), comparing anything with NULL using standard equality yields `UNKNOWN`, which fails the WHERE filter.",
    explanation: "`NULL = NULL` is not TRUE; it is UNKNOWN. The only valid operators are `IS NULL` and `IS NOT NULL` (or `<=>`).",
    hint: "Three-Valued Logic UNKNOWN result.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE phone_no IS NULL;"
  },
  {
    question: "What is the difference between `COALESCE()` and `IFNULL()` in MySQL?",
    shortAnswer: "`COALESCE()` is ANSI SQL standard and accepts 2 or more arguments; `IFNULL()` is MySQL-specific and accepts exactly 2 arguments.",
    explanation: "`COALESCE(a, b, c, 'default')` checks arguments sequentially and returns the first non-null value.",
    hint: "ANSI standard multi-argument vs MySQL two-argument.",
    level: "basic",
    codeExample: "SELECT first_name, COALESCE(mobile, landline, 'No Phone') AS contact FROM students;"
  },
  {
    question: "How do mathematical aggregate functions (`SUM`, `AVG`, `COUNT(col)`) treat NULL values?",
    shortAnswer: "They ignore NULL values during calculations.",
    explanation: "`AVG(score)` averages only rows with non-null scores; `COUNT(phone_no)` counts only rows with non-null phone numbers.",
    hint: "Aggregates ignore NULLs.",
    level: "moderate",
    codeExample: "SELECT AVG(score) AS class_average FROM exam_results;"
  },
  {
    question: "What is the difference between `COUNT(*)` and `COUNT(column_name)` regarding NULLs?",
    shortAnswer: "`COUNT(*)` counts the total number of rows regardless of NULL values; `COUNT(column_name)` counts only rows where that specific column is NOT NULL.",
    explanation: "If a table has 10 rows and 3 have `phone_no IS NULL`, `COUNT(*)` returns 10 while `COUNT(phone_no)` returns 7.",
    hint: "Row count vs non-null column count.",
    level: "basic"
  },
  {
    question: "What does the `NULLIF(expr1, expr2)` function do and how is it used to prevent division-by-zero?",
    shortAnswer: "It returns `NULL` if `expr1 = expr2`, otherwise returns `expr1`. In division: `total / NULLIF(count, 0)` returns NULL instead of throwing a division-by-zero error.",
    explanation: "If `count` is 0, `NULLIF(count, 0)` produces NULL, and `total / NULL` evaluates gracefully to NULL.",
    hint: "Division-by-zero prevention.",
    level: "expert",
    codeExample: "SELECT total_revenue / NULLIF(total_units, 0) AS unit_price FROM sales_summary;"
  },
  {
    question: "What happens when performing arithmetic with NULL (e.g. `NULL + 10`)?",
    shortAnswer: "It evaluates to `NULL`.",
    explanation: "NULL propagates through arithmetic operations. Adding, subtracting, or multiplying by NULL always yields NULL.",
    hint: "NULL arithmetic propagation.",
    level: "basic",
    codeExample: "SELECT 15000 + NULL; -- Returns NULL"
  },
  {
    question: "How does `CONCAT('Mamata', NULL)` behave in MySQL vs `CONCAT_WS(' ', 'Mamata', NULL)`?",
    shortAnswer: "`CONCAT()` returns `NULL` if any argument is NULL; `CONCAT_WS()` skips NULL arguments and concatenates the remaining non-null values.",
    explanation: "`CONCAT_WS(' ', first, last)` is safe against NULL names.",
    hint: "CONCAT NULL contamination vs CONCAT_WS skipping.",
    level: "moderate"
  },
  {
    question: "How does `ORDER BY` handle NULL values in MySQL by default?",
    shortAnswer: "In `ASC` sorting, NULLs are placed first (treated as lowest); in `DESC` sorting, NULLs are placed last.",
    explanation: "MySQL treats NULLs as the minimum possible sort value.",
    hint: "NULLs first in ASC, last in DESC.",
    level: "moderate",
    codeExample: "SELECT * FROM students ORDER BY phone_no ASC;"
  },
  {
    question: "How can you force NULLs to appear last in an `ASC` sort in MySQL?",
    shortAnswer: "Using `ORDER BY (column IS NULL) ASC, column ASC` or `ORDER BY -column DESC`.",
    explanation: "`column IS NULL` evaluates to 0 for non-nulls and 1 for NULLs, sorting valid data ahead of NULLs.",
    hint: "Boolean NULL sorting trick.",
    level: "expert",
    codeExample: "SELECT * FROM students ORDER BY (phone_no IS NULL) ASC, phone_no ASC;"
  },
  {
    question: "Can InnoDB B-Tree indexes store and index NULL values?",
    shortAnswer: "Yes, InnoDB indexes allow and store NULL entries, placing them at the beginning of the B-Tree leaf pages.",
    explanation: "Running `WHERE col IS NULL` can utilize an index lookup (type: `ref`).",
    hint: "InnoDB index support for NULL.",
    level: "expert"
  },
  {
    question: "Can a `UNIQUE` constraint in MySQL contain multiple NULL values?",
    shortAnswer: "Yes, standard SQL and MySQL allow multiple rows to have `NULL` in a UNIQUE column (because `NULL != NULL`).",
    explanation: "A UNIQUE constraint only rejects duplicate non-null values.",
    hint: "Multiple NULLs allowed in UNIQUE constraints.",
    level: "moderate"
  },
  {
    question: "Can a `PRIMARY KEY` contain NULL values?",
    shortAnswer: "No, primary key columns are strictly required to be `NOT NULL` by relational theory and SQL standards.",
    explanation: "Primary keys must uniquely and definitively identify every entity instance.",
    hint: "Primary keys cannot be NULL.",
    level: "basic"
  },
  {
    question: "What is the result of `SUM(fee)` on an empty table or a group where all fees are NULL?",
    shortAnswer: "`NULL` (not `0`).",
    explanation: "To ensure numeric results for downstream application consumption, always write `COALESCE(SUM(fee), 0)`.",
    hint: "SUM returns NULL on empty groups.",
    level: "moderate",
    codeExample: "SELECT COALESCE(SUM(admission_fee), 0) AS total_revenue FROM students WHERE city = 'Unknown';"
  },
  {
    question: "How does `GROUP BY` handle NULL values?",
    shortAnswer: "All NULL values are grouped together into a single summary row bucket.",
    explanation: "Even though NULLs do not equal each other, `GROUP BY` treats all NULL entries as one group.",
    hint: "Single NULL group bucket.",
    level: "basic",
    codeExample: "SELECT city, COUNT(*) FROM students GROUP BY city;"
  },
  {
    question: "What does the `ISNULL(expr)` function in MySQL do?",
    shortAnswer: "It tests whether `expr` is NULL and returns `1` (TRUE) or `0` (FALSE).",
    explanation: "`ISNULL(phone_no)` is equivalent to `phone_no IS NULL`.",
    hint: "ISNULL boolean test function.",
    level: "basic",
    codeExample: "SELECT first_name, ISNULL(phone_no) AS is_missing_phone FROM students;"
  },
  {
    question: "What is the return value of `SELECT (NULL <=> NULL)` in MySQL?",
    shortAnswer: "`1` (representing boolean TRUE).",
    explanation: "The NULL-Safe Equal `<=>` operator returns 1 when comparing two NULL operands.",
    hint: "NULL-Safe Equal evaluation.",
    level: "basic"
  },
  {
    question: "What is the return value of `SELECT (NULL = NULL)`?",
    shortAnswer: "`NULL` (UNKNOWN).",
    explanation: "Standard equality with NULL yields UNKNOWN.",
    hint: "Standard equality with NULL.",
    level: "basic"
  },
  {
    question: "How do you replace NULL with the average column value in a query?",
    shortAnswer: "`SELECT COALESCE(score, (SELECT AVG(score) FROM exam_results)) FROM exam_results;`.",
    explanation: "Subquery imputation for missing data.",
    hint: "COALESCE with subquery mean imputation.",
    level: "moderate",
    codeExample: "SELECT first_name, COALESCE(admission_fee, (SELECT AVG(admission_fee) FROM students)) AS fee FROM students;"
  },
  {
    question: "How do you find child records that have no matching parent in an outer join?",
    shortAnswer: "`WHERE parent_table.id IS NULL`.",
    explanation: "In a `LEFT JOIN`, unmatched outer rows populate parent columns with NULL.",
    hint: "Outer join anti-pattern with IS NULL.",
    level: "moderate",
    codeExample: "SELECT s.student_id, s.first_name\nFROM students s\nLEFT JOIN enrollments e ON s.student_id = e.student_id\nWHERE e.student_id IS NULL;"
  },
  {
    question: "What is the storage overhead of nullable columns in InnoDB tables?",
    shortAnswer: "InnoDB allocates a NULL-bitmap header byte in each row record to track which nullable columns are NULL.",
    explanation: "Marking columns `NOT NULL` saves bitmap space and simplifies optimizer execution plans.",
    hint: "NULL-bitmap row header overhead.",
    level: "expert"
  },
  {
    question: "Why should developers default database columns to `NOT NULL` with a `DEFAULT` value?",
    shortAnswer: "To prevent Three-Valued Logic bugs, eliminate NULL propagation in arithmetic, and improve query optimizer index efficiency.",
    explanation: "Explicit `NOT NULL` columns ensure predictable application behavior.",
    hint: "NOT NULL best practice.",
    level: "moderate"
  },
  {
    question: "What happens if you insert a NULL value into a column defined as `NOT NULL` in strict SQL mode?",
    shortAnswer: "MySQL rejects the insert with Error 1048 (23000): 'Column cannot be null'.",
    explanation: "`STRICT_TRANS_TABLES` mode enforces column nullability constraints strictly.",
    hint: "Error 1048 column cannot be null.",
    level: "basic"
  },
  {
    question: "What is the difference between an empty string `''` and `NULL` in MySQL?",
    shortAnswer: "An empty string is a valid string literal with length `0`; NULL is the absence of any string value entirely.",
    explanation: "`LENGTH('') = 0`; `LENGTH(NULL) = NULL`. `'' IS NOT NULL` is TRUE.",
    hint: "Empty string vs NULL distinction.",
    level: "basic",
    codeExample: "SELECT LENGTH('') AS empty_len, LENGTH(NULL) AS null_len;"
  },
  {
    question: "How do you find all records where a column is either NULL OR an empty string?",
    shortAnswer: "`WHERE col IS NULL OR col = ''` (or `WHERE COALESCE(col, '') = ''`).",
    explanation: "Captures both missing states cleanly.",
    hint: "NULL and empty string combined check.",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE email IS NULL OR email = '';"
  },
  {
    question: "How does `DISTINCT` handle multiple NULL values in a column?",
    shortAnswer: "It treats all NULL values as identical duplicates and returns at most one single `NULL` row.",
    explanation: "Deduplication collapses all NULL instances together.",
    hint: "DISTINCT collapses NULLs into 1 row.",
    level: "basic"
  },
  {
    question: "Can a Foreign Key column contain NULL values in MySQL InnoDB?",
    shortAnswer: "Yes, unless the column is explicitly defined as `NOT NULL`. A NULL foreign key indicates that the child row has no parent association.",
    explanation: "Allows representing optional relationships in relational schemas.",
    hint: "Optional relationships with nullable foreign keys.",
    level: "moderate"
  },
  {
    question: "What is the return value of `SELECT COALESCE(NULL, NULL, 50, 100)`?",
    shortAnswer: "`50` (the first non-null value).",
    explanation: "COALESCE skips the first two NULL arguments and returns 50.",
    hint: "First non-null returned.",
    level: "basic"
  },
  {
    question: "How does the `JSON` data type handle SQL NULL vs JSON `null` in MySQL?",
    shortAnswer: "SQL `NULL` is the complete absence of a value; JSON `'null'` is a valid JSON document literal representing null.",
    explanation: "Checking SQL NULL requires `IS NULL`; checking JSON null requires `JSON_TYPE(col) = 'NULL'`.",
    hint: "SQL NULL vs JSON null literal.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when dealing with NULL values in MySQL?",
    shortAnswer: "1) Always use `IS NULL` / `IS NOT NULL`. 2) Use `COALESCE(...)` for default fallbacks. 3) Wrap aggregate sums in `COALESCE(SUM(x), 0)`. 4) Use `NULLIF(den, 0)` for safe division. 5) Define columns `NOT NULL` by default in schema design.",
    explanation: "Following these 5 rules eliminates 99% of Three-Valued Logic bugs and division-by-zero crashes.",
    hint: "IS NULL, COALESCE, Safe Aggregates, NULLIF division, NOT NULL default.",
    level: "basic"
  }
];

export default questions;
