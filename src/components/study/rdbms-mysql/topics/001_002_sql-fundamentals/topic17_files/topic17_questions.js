// topic17_files/topic17_questions.js

const questions = [
  {
    question: "What is the purpose of the `LIMIT` and `OFFSET` clauses in MySQL?",
    shortAnswer: "To restrict the number of rows returned and skip a specified number of initial rows, enabling pagination in applications.",
    explanation: "`LIMIT` caps the maximum result count; `OFFSET` skips preceding rows.",
    hint: "Row restriction and pagination.",
    level: "basic",
    codeExample: "SELECT * FROM students ORDER BY student_id ASC LIMIT 10 OFFSET 20;"
  },
  {
    question: "What is the formula for calculating `OFFSET` given `page_number` (1-based) and `page_size`?",
    shortAnswer: "`offset = (page_number - 1) * page_size`.",
    explanation: "For Page 1: `(1 - 1) * 10 = 0`; for Page 2: `(2 - 1) * 10 = 10`.",
    hint: "Offset calculation formula.",
    level: "basic"
  },
  {
    question: "What is the difference between `LIMIT 10 OFFSET 20` and MySQL's 2-argument `LIMIT 20, 10` syntax?",
    shortAnswer: "They are functionally identical; in `LIMIT 20, 10`, the first number is `OFFSET` (20) and the second is `LIMIT` (10).",
    explanation: "Writing explicit `LIMIT count OFFSET skip` is preferred to prevent parameter inversion bugs.",
    hint: "Argument order in two-parameter LIMIT syntax.",
    level: "moderate",
    codeExample: "SELECT * FROM students LIMIT 20, 10; -- Skips 20, returns 10"
  },
  {
    question: "Why is executing `LIMIT` without an explicit `ORDER BY` clause dangerous in pagination?",
    shortAnswer: "Because relational table ordering is non-deterministic; without `ORDER BY`, page 2 may return duplicate rows already seen on page 1 or miss rows entirely.",
    explanation: "Deterministic sorting is mandatory for pagination consistency.",
    hint: "Non-deterministic row sequence without ORDER BY.",
    level: "basic"
  },
  {
    question: "What is the 'Deep Offset Problem' in relational databases?",
    shortAnswer: "To return `LIMIT 10 OFFSET 1000000`, MySQL must read, sort, and process all 1,000,010 candidate rows from disk and discard 1,000,000 of them, causing extreme query latency.",
    explanation: "Offset cost scales linearly with table size (O(N)), degrading response times on deep pages.",
    hint: "Linear cost of scanning and discarding skipped rows.",
    level: "expert"
  },
  {
    question: "What is Keyset (Cursor-Based) Pagination and why is it superior for large datasets?",
    shortAnswer: "Filtering by `WHERE id > last_seen_id ORDER BY id ASC LIMIT 10`, which uses B-Tree index seeks in O(log N) constant time regardless of page depth.",
    explanation: "Keyset pagination never reads or discards skipped rows; it jumps directly to the target B-Tree leaf node.",
    hint: "O(log N) constant time cursor navigation.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE student_id > 10500 ORDER BY student_id ASC LIMIT 10;"
  },
  {
    question: "What is a 'Deferred Join' and how does it optimize offset pagination?",
    shortAnswer: "A query that paginates only lightweight index keys in a subquery and joins the full table rows only for the final 10 matched IDs.",
    explanation: "Prevents reading full row data columns for rows that are subsequently discarded by OFFSET.",
    hint: "Deferred join index-only offset trick.",
    level: "expert",
    codeExample: "SELECT s.*\nFROM students s\nJOIN (\n    SELECT student_id FROM students ORDER BY admission_date DESC LIMIT 10 OFFSET 50000\n) p ON s.student_id = p.student_id;"
  },
  {
    question: "Can `LIMIT` be used in `UPDATE` and `DELETE` statements in MySQL?",
    shortAnswer: "Yes, MySQL supports `LIMIT row_count` (with optional `ORDER BY`) in UPDATE and DELETE statements to batch large data modifications safely.",
    explanation: "`DELETE FROM logs WHERE created_at < '2025-01-01' LIMIT 5000;` prevents long table lock spikes.",
    hint: "Batching writes with LIMIT.",
    level: "moderate",
    codeExample: "DELETE FROM old_logs ORDER BY log_id ASC LIMIT 1000;"
  },
  {
    question: "Does `OFFSET` work in `UPDATE` or `DELETE` statements in MySQL?",
    shortAnswer: "No, MySQL does not support `OFFSET` in UPDATE or DELETE statements (only single-argument `LIMIT row_count`).",
    explanation: "Offsetting updates is logically ambiguous.",
    hint: "OFFSET is disallowed in UPDATE/DELETE.",
    level: "moderate"
  },
  {
    question: "What does `LIMIT 1` do when searching for a single unique record?",
    shortAnswer: "It tells the query engine to terminate execution immediately upon finding the first matching row (early-exit short circuit).",
    explanation: "Prevents scanning the remainder of the table once the target row is located.",
    hint: "Early exit short circuit.",
    level: "basic",
    codeExample: "SELECT * FROM users WHERE email = 'mamata@codernaccotax.in' LIMIT 1;"
  },
  {
    question: "How does `LIMIT` optimize `ORDER BY` using an in-memory Priority Queue?",
    shortAnswer: "Instead of sorting the entire table, MySQL maintains a bounded heap of only `N` elements in memory, updating the top N during the table scan in O(N log K) time.",
    explanation: "Saves massive memory compared to full table sorting.",
    hint: "Bounded heap priority queue optimization.",
    level: "expert"
  },
  {
    question: "What is the `SQL_CALC_FOUND_ROWS` modifier and what is its status in MySQL 8.0?",
    shortAnswer: "It was a modifier used with `FOUND_ROWS()` to calculate total un-paginated rows, but it was deprecated in MySQL 8.0.17 due to severe performance drawbacks.",
    explanation: "Best practice is executing a separate `COUNT(*)` query or avoiding total page counts in mobile UI feeds.",
    hint: "Deprecated feature in MySQL 8.0.17.",
    level: "expert"
  },
  {
    question: "What happens if `OFFSET` exceeds the total number of matching rows in the table?",
    shortAnswer: "The query executes successfully and returns an empty result set (0 rows) with zero errors.",
    explanation: "Standard pagination end-of-feed behavior.",
    hint: "Empty set on out-of-range offset.",
    level: "basic"
  },
  {
    question: "Can parameters in `LIMIT ? OFFSET ?` be dynamically bound in Prepared Statements?",
    shortAnswer: "Yes, modern database drivers and MySQL prepared statements allow binding integer parameters to LIMIT and OFFSET.",
    explanation: "Prevents SQL injection in pagination endpoints.",
    hint: "Parameterized prepared statements for LIMIT.",
    level: "basic"
  },
  {
    question: "How do you achieve bidirectional Keyset Pagination (Previous / Next page)?",
    shortAnswer: "For 'Next Page': `WHERE id > last_seen_id ORDER BY id ASC LIMIT 10`; for 'Previous Page': `WHERE id < first_seen_id ORDER BY id DESC LIMIT 10`.",
    explanation: "Reversing the inequality and sort direction navigates backward with zero offset overhead.",
    hint: "Reversed inequality and sort direction.",
    level: "expert"
  },
  {
    question: "What is 'Pagination Drift' in offset-based pagination?",
    shortAnswer: "When rows are inserted or deleted while a user is paginating, causing records to be skipped or shown twice across page transitions.",
    explanation: "Keyset pagination eliminates pagination drift completely.",
    hint: "Drift caused by concurrent table mutations.",
    level: "moderate"
  },
  {
    question: "How can you return all rows from a specific offset to the end of the table in MySQL?",
    shortAnswer: "By passing an extremely large upper limit (e.g. `LIMIT 100, 18446744073709551615`).",
    explanation: "18446744073709551615 is maximum unsigned 64-bit integer.",
    hint: "Max unsigned bigint limit constant.",
    level: "expert",
    codeExample: "SELECT * FROM students LIMIT 100, 18446744073709551615;"
  },
  {
    question: "Can `LIMIT` be used inside subqueries in MySQL 8.0?",
    shortAnswer: "Yes, MySQL 8.0 supports `LIMIT` in subqueries used with `IN`, `EXISTS`, and scalar expressions.",
    explanation: "Expanded support for derived tables and CTEs.",
    hint: "Subquery LIMIT support.",
    level: "moderate",
    codeExample: "SELECT * FROM students WHERE admission_fee IN (SELECT fee FROM standard_fees LIMIT 5);"
  },
  {
    question: "What is the result of `LIMIT 0` in MySQL?",
    shortAnswer: "It instantly returns an empty result set (0 rows) while returning column metadata.",
    explanation: "Used by ORMs and tools to inspect column schema data without executing queries.",
    hint: "Schema metadata inspection with LIMIT 0.",
    level: "moderate",
    codeExample: "SELECT * FROM students LIMIT 0;"
  },
  {
    question: "How does `LIMIT` affect the optimizer's choice between Full Table Scan vs Index Scan?",
    shortAnswer: "With a small `LIMIT`, the optimizer often favors an index scan matching `ORDER BY` because finding a few rows early is faster than scanning the entire table.",
    explanation: "Small limits significantly influence execution plans.",
    hint: "Optimizer plan biasing with small LIMITs.",
    level: "expert"
  },
  {
    question: "How do you paginate composite sorted results using Keyset pagination (e.g. sorted by `created_at DESC, id DESC`)?",
    shortAnswer: "Using row constructor comparisons: `WHERE (created_at, id) < (last_created_at, last_id) ORDER BY created_at DESC, id DESC LIMIT 10`.",
    explanation: "Enables multi-column cursor pagination with index support.",
    hint: "Composite tuple cursor pagination.",
    level: "expert",
    codeExample: "SELECT * FROM orders\nWHERE (order_date, order_id) < ('2026-08-24 10:00:00', 500)\nORDER BY order_date DESC, order_id DESC LIMIT 10;"
  },
  {
    question: "What happens if negative values are passed into `LIMIT` or `OFFSET` (e.g. `LIMIT -5`)?",
    shortAnswer: "MySQL rejects the query with a syntax error (Error 1064).",
    explanation: "LIMIT and OFFSET must be non-negative integers.",
    hint: "Negative values throw syntax errors.",
    level: "basic"
  },
  {
    question: "Why should REST API endpoints always enforce a maximum `limit` ceiling (e.g. max 100)?",
    shortAnswer: "To prevent malicious or buggy clients from requesting `limit=1000000`, exhausting database memory and network bandwidth.",
    explanation: "Mandatory defense-in-depth API design rule.",
    hint: "Denial of service prevention.",
    level: "basic"
  },
  {
    question: "How do you select the single highest-paying student using `LIMIT`?",
    shortAnswer: "`SELECT * FROM students ORDER BY admission_fee DESC LIMIT 1;`.",
    explanation: "Descending sort combined with limit 1 retrieves the maximum record.",
    hint: "Top 1 maximum query pattern.",
    level: "basic",
    codeExample: "SELECT first_name, admission_fee FROM students ORDER BY admission_fee DESC LIMIT 1;"
  },
  {
    question: "How do you select the 2nd highest salary in a table?",
    shortAnswer: "`SELECT DISTINCT salary FROM employees ORDER BY salary DESC LIMIT 1 OFFSET 1;`.",
    explanation: "Skips the 1st highest salary and retrieves the 2nd distinct value.",
    hint: "Nth highest salary interview problem.",
    level: "moderate",
    codeExample: "SELECT DISTINCT admission_fee FROM students ORDER BY admission_fee DESC LIMIT 1 OFFSET 1;"
  },
  {
    question: "What is the difference between `LIMIT` in MySQL vs `TOP` in SQL Server vs `FETCH FIRST` in Oracle?",
    shortAnswer: "They perform the same record limiting; MySQL uses `LIMIT`, SQL Server uses `TOP(N)`, and Oracle/PostgreSQL support ANSI `FETCH FIRST N ROWS ONLY`.",
    explanation: "MySQL 8.0 also supports the ANSI `LIMIT` syntax.",
    hint: "Cross-database dialect equivalents.",
    level: "moderate"
  },
  {
    question: "Can `LIMIT` be used with `GROUP BY` and `HAVING`?",
    shortAnswer: "Yes; `LIMIT` executes as the final step after `GROUP BY` and `HAVING` have evaluated.",
    explanation: "Filters the final aggregated summary buckets.",
    hint: "Final lifecycle execution of LIMIT.",
    level: "basic",
    codeExample: "SELECT city, COUNT(*) AS total\nFROM students\nGROUP BY city\nHAVING total > 1\nORDER BY total DESC\nLIMIT 3;"
  },
  {
    question: "What is an 'Infinite Scroll' pagination implementation pattern?",
    shortAnswer: "Frontend loads next page via Keyset pagination whenever the user scrolls near the bottom of the feed, appending rows seamlessly.",
    explanation: "Standard pattern in modern mobile and web feeds.",
    hint: "Keyset cursor feed pattern.",
    level: "basic"
  },
  {
    question: "What is the return value of `LIMIT 5 OFFSET 0` vs `LIMIT 5`?",
    shortAnswer: "They are completely identical; omitting `OFFSET` defaults to `OFFSET 0`.",
    explanation: "Starting from the beginning of the result set.",
    hint: "Default zero offset.",
    level: "basic"
  },
  {
    question: "What is the recommended checklist when implementing pagination in production databases?",
    shortAnswer: "1) Always specify a deterministic `ORDER BY`. 2) Enforce maximum limit ceilings (e.g. max 100). 3) Use Keyset (Cursor) pagination for large datasets. 4) Use Deferred Joins for deep offset jumping. 5) Avoid total count queries on multi-million row feeds.",
    explanation: "Following these 5 rules eliminates server crashes, memory bloat, and slow query latency.",
    hint: "Deterministic ORDER BY, Limit ceiling, Keyset cursors, Deferred joins, Count avoidance.",
    level: "basic"
  }
];

export default questions;
