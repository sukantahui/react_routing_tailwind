// topic16_files/topic16_questions.js

const questions = [
  {
    question: "What is the primary purpose of the `ORDER BY` clause in SQL?",
    shortAnswer: "To sort the query result set in ascending or descending sequence based on one or more columns or expressions.",
    explanation: "Because relational tables are mathematically unordered sets, an explicit `ORDER BY` is required to guarantee output row order.",
    hint: "Result set sorting clause.",
    level: "basic",
    codeExample: "SELECT * FROM students ORDER BY admission_fee DESC;"
  },
  {
    question: "What is the default sort direction if neither `ASC` nor `DESC` is specified?",
    shortAnswer: "`ASC` (Ascending: lowest to highest, A to Z, oldest to newest).",
    explanation: "Writing `ORDER BY first_name` is implicitly identical to `ORDER BY first_name ASC`.",
    hint: "Ascending default.",
    level: "basic"
  },
  {
    question: "How does Multi-Column (Hierarchical) sorting work in SQL?",
    shortAnswer: "MySQL sorts primarily by the first column; if duplicate values exist in the first column, it uses the second column as a tie-breaker.",
    explanation: "`ORDER BY city ASC, admission_fee DESC` groups students by city, and sorts highest paying students first within each city.",
    hint: "Primary sort and tie-breaker secondary sort.",
    level: "basic",
    codeExample: "SELECT * FROM students ORDER BY city ASC, admission_fee DESC;"
  },
  {
    question: "Can you reference column aliases defined in the `SELECT` clause inside `ORDER BY`?",
    shortAnswer: "Yes, because the `ORDER BY` clause executes after the `SELECT` projection in the logical SQL lifecycle.",
    explanation: "`SELECT price * 0.18 AS gst FROM items ORDER BY gst DESC;` is 100% valid in MySQL.",
    hint: "Alias reference validity in ORDER BY.",
    level: "basic",
    codeExample: "SELECT first_name, (admission_fee * 1.18) AS total_fee\nFROM students\nORDER BY total_fee DESC;"
  },
  {
    question: "What is a 'Filesort' in MySQL and what causes it?",
    shortAnswer: "An internal sorting operation where MySQL reads rows into a memory buffer (`sort_buffer_size`) or temporary disk file to sort them because no supporting B-Tree index exists.",
    explanation: "Filesort consumes CPU and memory; indexing the sort columns eliminates it.",
    hint: "Using filesort in EXPLAIN.",
    level: "expert"
  },
  {
    question: "How do B-Tree indexes eliminate `Using filesort` during `ORDER BY`?",
    shortAnswer: "Because B-Tree leaf pages are already physically stored in sorted order on disk, InnoDB simply reads the index sequentially without sorting in RAM.",
    explanation: "Zero CPU overhead and instantaneous result delivery.",
    hint: "Pre-sorted B-Tree index traversal.",
    level: "expert"
  },
  {
    question: "What is the Positional Sorting anti-pattern (e.g. `ORDER BY 1, 2`) and why is it dangerous?",
    shortAnswer: "It sorts by the numeric column positions in the `SELECT` list. If someone reorders or adds columns in `SELECT`, the query sorts by unintended attributes without erroring.",
    explanation: "Always use explicit column names or aliases for maintainability.",
    hint: "Positional integer column sorting fragility.",
    level: "moderate",
    codeExample: "-- Fragile: ORDER BY 1, 2\n-- Robust: ORDER BY city ASC, first_name ASC"
  },
  {
    question: "How do you define a custom non-alphabetical sort sequence using MySQL's `FIELD()` function?",
    shortAnswer: "`ORDER BY FIELD(status, 'urgent', 'high', 'medium', 'low')`.",
    explanation: "`FIELD()` returns the 1-based index position of the value in the list, sorting rows by business priority.",
    hint: "FIELD() custom priority ordering.",
    level: "moderate",
    codeExample: "SELECT * FROM tickets ORDER BY FIELD(priority, 'critical', 'high', 'medium', 'low');"
  },
  {
    question: "How does `ORDER BY` handle NULL values in MySQL?",
    shortAnswer: "In `ASC` sort, NULLs appear first; in `DESC` sort, NULLs appear last.",
    explanation: "MySQL treats NULL as the minimum possible comparative value.",
    hint: "NULLs first in ASC, last in DESC.",
    level: "basic"
  },
  {
    question: "How can you sort in `ASC` order while forcing NULL values to appear last?",
    shortAnswer: "`ORDER BY (column IS NULL) ASC, column ASC`.",
    explanation: "`column IS NULL` evaluates to 0 for non-nulls and 1 for NULLs, placing non-nulls first.",
    hint: "Boolean NULL sorting trick.",
    level: "expert",
    codeExample: "SELECT * FROM students ORDER BY (phone_no IS NULL) ASC, phone_no ASC;"
  },
  {
    question: "Can an index with `(col_a ASC, col_b ASC)` optimize an `ORDER BY col_a ASC, col_b DESC` query in MySQL 5.7 vs 8.0?",
    shortAnswer: "In MySQL 5.7, no (it triggered filesort); in MySQL 8.0+, Descending Indexes are supported to match mixed sort directions directly.",
    explanation: "MySQL 8.0 introduced true descending index B-Trees (`CREATE INDEX idx ON t (a ASC, b DESC);`).",
    hint: "MySQL 8.0 descending indexes.",
    level: "expert"
  },
  {
    question: "How do you sort strings in a specific language dictionary order or case-sensitively?",
    shortAnswer: "By appending a `COLLATE` clause: `ORDER BY first_name COLLATE utf8mb4_bin`.",
    explanation: "Collation controls sorting weight rules.",
    hint: "COLLATE modifier in ORDER BY.",
    level: "moderate",
    codeExample: "SELECT * FROM students ORDER BY first_name COLLATE utf8mb4_bin ASC;"
  },
  {
    question: "Can you sort query results randomly in MySQL?",
    shortAnswer: "Yes, using `ORDER BY RAND() LIMIT N`.",
    explanation: "Warning: `RAND()` on large tables assigns random floats to all rows and performs a full table filesort. For large tables, use indexed random ID sampling.",
    hint: "ORDER BY RAND() and its performance cost.",
    level: "moderate",
    codeExample: "SELECT * FROM quiz_questions ORDER BY RAND() LIMIT 5;"
  },
  {
    question: "What is the difference between `ORDER BY col_a, col_b DESC` and `ORDER BY col_a DESC, col_b DESC`?",
    shortAnswer: "In `col_a, col_b DESC`, `col_a` is sorted `ASC` (by default) and `col_b` is sorted `DESC`. In the second, both are sorted `DESC`.",
    explanation: "The `DESC` keyword applies ONLY to the immediately preceding column name.",
    hint: "DESC keyword column specificity.",
    level: "basic"
  },
  {
    question: "Can you sort by a mathematical or string function directly in `ORDER BY`?",
    shortAnswer: "Yes: `ORDER BY LENGTH(first_name) DESC` or `ORDER BY ABS(balance) DESC`.",
    explanation: "MySQL evaluates the function for each row before sorting.",
    hint: "Sorting by function evaluations.",
    level: "basic",
    codeExample: "SELECT * FROM students ORDER BY LENGTH(first_name) DESC;"
  },
  {
    question: "What is the interaction between `ORDER BY` and `UNION` vs `UNION ALL`?",
    shortAnswer: "To sort the final combined result of a `UNION`, place a single `ORDER BY` clause at the very end of the entire query.",
    explanation: "Individual SELECT statements inside UNION cannot have an ORDER BY unless enclosed in parentheses with LIMIT.",
    hint: "Global ORDER BY at end of UNION.",
    level: "moderate",
    codeExample: "SELECT name, fee FROM branch_a\nUNION ALL\nSELECT name, fee FROM branch_b\nORDER BY fee DESC;"
  },
  {
    question: "How does `ORDER BY` interact with `GROUP BY` in MySQL 8.0?",
    shortAnswer: "In MySQL 8.0, `GROUP BY` no longer sorts results implicitly; you must write an explicit `ORDER BY` if sorted output is required.",
    explanation: "Older MySQL versions sorted by group keys automatically, which was removed for performance in 8.0.",
    hint: "Removal of implicit GROUP BY sorting in MySQL 8.0.",
    level: "expert"
  },
  {
    question: "What is the `sort_buffer_size` system variable in MySQL?",
    shortAnswer: "The amount of memory allocated per thread for performing in-memory filesorts before spilling to temporary disk files.",
    explanation: "Properly sizing this buffer avoids disk I/O during heavy sorting queries.",
    hint: "sort_buffer_size memory allocation.",
    level: "expert"
  },
  {
    question: "Can you sort by a column that is NOT included in the `SELECT` list?",
    shortAnswer: "Yes, as long as `DISTINCT` or `ONLY_FULL_GROUP_BY` restrictions are not violated.",
    explanation: "`SELECT first_name FROM students ORDER BY admission_fee DESC;` works cleanly.",
    hint: "Sorting by unprojected columns.",
    level: "basic",
    codeExample: "SELECT first_name, email FROM students ORDER BY admission_fee DESC;"
  },
  {
    question: "What happens if you combine `DISTINCT` with `ORDER BY unprojected_col`?",
    shortAnswer: "In strict SQL mode, MySQL rejects the query with Error 3065 because deduplicating rows makes unprojected column order ambiguous.",
    explanation: "Error 3065: 'Expression of ORDER BY clause is not in SELECT list'.",
    hint: "Error 3065 DISTINCT with unprojected ORDER BY.",
    level: "expert"
  },
  {
    question: "How do you sort alphanumeric codes naturally (Natural Sort: 'Item 2' before 'Item 10') in MySQL?",
    shortAnswer: "By sorting by the numeric extracted length and string: `ORDER BY LENGTH(code), code`.",
    explanation: "Overcomes standard ASCII lexicographical sorting where '10' precedes '2'.",
    hint: "Natural alphanumeric sorting trick.",
    level: "expert",
    codeExample: "SELECT * FROM chapters ORDER BY LENGTH(chapter_code), chapter_code;"
  },
  {
    question: "How do you sort boolean columns so that TRUE (1) rows appear first?",
    shortAnswer: "`ORDER BY is_active DESC`.",
    explanation: "Because TRUE is 1 and FALSE is 0, descending order puts 1 ahead of 0.",
    hint: "Boolean sorting with DESC.",
    level: "basic",
    codeExample: "SELECT * FROM students ORDER BY is_active DESC, first_name ASC;"
  },
  {
    question: "How does `ORDER BY` execute when paired with `LIMIT`?",
    shortAnswer: "MySQL uses a Priority Queue (heap sort) in memory to find only the top N rows without sorting the entire multi-million row dataset.",
    explanation: "Tremendous optimization for top-N queries.",
    hint: "Priority Queue optimization for ORDER BY + LIMIT.",
    level: "expert"
  },
  {
    question: "Can you use conditional `CASE WHEN` logic inside `ORDER BY`?",
    shortAnswer: "Yes: `ORDER BY CASE WHEN city = 'Barrackpore' THEN 1 ELSE 2 END, first_name ASC`.",
    explanation: "Allows pinning specific records (like the home branch) to the top of the list.",
    hint: "Record pinning using CASE in ORDER BY.",
    level: "moderate",
    codeExample: "SELECT * FROM students\nORDER BY CASE WHEN city = 'Barrackpore' THEN 0 ELSE 1 END, first_name ASC;"
  },
  {
    question: "What is the logical order of `ORDER BY` relative to `WHERE` and `HAVING`?",
    shortAnswer: "`WHERE` -> `GROUP BY` -> `HAVING` -> `SELECT` -> `ORDER BY` -> `LIMIT`.",
    explanation: "`ORDER BY` sorts the final projected result set immediately before row limits are applied.",
    hint: "Logical execution lifecycle position.",
    level: "basic"
  },
  {
    question: "How do you sort date strings formatted as 'DD-MM-YYYY' chronologically?",
    shortAnswer: "Convert them with `STR_TO_DATE(date_col, '%d-%m-%Y')` inside `ORDER BY`.",
    explanation: "Sorting string dates alphabetically fails; converting them to date types sorts chronologically.",
    hint: "STR_TO_DATE chronological conversion.",
    level: "moderate",
    codeExample: "SELECT * FROM events ORDER BY STR_TO_DATE(event_date_str, '%d-%m-%Y') ASC;"
  },
  {
    question: "What is an 'Index Sort' in MySQL EXPLAIN?",
    shortAnswer: "When `Extra` contains neither `Using filesort` nor `Using temporary`, proving the sort is fulfilled purely by index traversal.",
    explanation: "The gold standard for query sorting performance.",
    hint: "Zero filesort in EXPLAIN.",
    level: "expert"
  },
  {
    question: "Why does `ORDER BY created_at DESC` sometimes fail to use an index on `created_at`?",
    shortAnswer: "If the optimizer estimates that scanning the unindexed table directly is cheaper than secondary index lookups, or if the `WHERE` clause filters on a different unindexed column.",
    explanation: "A composite index on `(where_col, order_col)` fixes this.",
    hint: "Composite index for WHERE + ORDER BY.",
    level: "expert"
  },
  {
    question: "What is the result of `ORDER BY NULL` in MySQL?",
    shortAnswer: "It tells the query optimizer to disable all sorting entirely.",
    explanation: "In older MySQL versions, `GROUP BY col ORDER BY NULL` suppressed sorting overhead.",
    hint: "ORDER BY NULL suppresses sorting.",
    level: "expert"
  },
  {
    question: "What is the recommended checklist when writing `ORDER BY` queries in production?",
    shortAnswer: "1) Always specify `ORDER BY` when sequence matters. 2) Create composite indexes matching `(where_col, order_col)`. 3) Explicitly specify `ASC` / `DESC` for each column. 4) Use aliases or names rather than numeric positions. 5) Use `FIELD()` or `CASE` for custom priority sorting.",
    explanation: "Following these 5 rules eliminates filesort bottlenecks and guarantees deterministic output.",
    hint: "Explicit clause, Composite indexes, Column-specific DESC, No numeric positions, Custom CASE sorting.",
    level: "basic"
  }
];

export default questions;
