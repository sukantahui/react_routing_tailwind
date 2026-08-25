// topic9_files/topic9_questions.js

const questions = [
  {
    question: "Why is `SELECT *` considered a severe performance anti-pattern in high-concurrency systems?",
    shortAnswer: "`SELECT *` retrieves all columns (including large text/JSON blobs), breaks covering index optimizations, overflows memory sort buffers to disk, and wastes network bandwidth.",
    explanation: "Retrieving unused columns forces clustered table disk seeks and balloons memory usage per query.",
    hint: "Retrieves unnecessary data, destroys covering indexes, and causes memory spills.",
    level: "basic"
  },
  {
    question: "How does `SELECT *` affect sorting operations (`ORDER BY`)?",
    shortAnswer: "Wide rows consume more bytes in `sort_buffer_size`. When memory is exceeded, MySQL spills the sort operation to physical disk temporary files (`Using filesort`), drastically slowing execution.",
    explanation: "Selecting only required columns reduces row byte width, keeping sort operations in fast RAM.",
    hint: "Wider row payloads exceed sort_buffer_size and force disk-based sorting.",
    level: "expert"
  },
  {
    question: "What is the problem with Correlated Subqueries inside the `SELECT` column list?",
    shortAnswer: "They execute row-by-row for every single row produced by the outer query ($O(N)$ subquery invocations), causing severe CPU bottlenecks.",
    explanation: "A table with 10,000 rows will execute the inner subquery 10,000 separate times unless refactored into a set-based `LEFT JOIN`.",
    hint: "Executes row-by-row once for every outer row ($O(N)$ execution).",
    level: "basic",
    codeExample: "-- Bad:\nSELECT s.name, (SELECT COUNT(*) FROM exams e WHERE e.student_id = s.id) FROM students s;"
  },
  {
    question: "How should you refactor a correlated subquery in the `SELECT` list?",
    shortAnswer: "Refactor it into a set-based `LEFT JOIN` with an aggregated derived table or CTE.",
    explanation: "This allows MySQL to aggregate the joined table in a single batch pass rather than repeatedly querying it row-by-row.",
    hint: "Use a LEFT JOIN with a pre-aggregated subquery or CTE.",
    level: "basic",
    codeExample: "SELECT s.name, COALESCE(e.total_exams, 0)\nFROM students s\nLEFT JOIN (SELECT student_id, COUNT(*) AS total_exams FROM exams GROUP BY student_id) e ON s.id = e.student_id;"
  },
  {
    question: "Why can `WHERE col_a = 'X' OR col_b = 'Y'` cause a Full Table Scan even if both columns are indexed?",
    shortAnswer: "Because standard B+Tree indexes cannot satisfy an `OR` condition in a single probe. MySQL must either execute an `index_merge` or fall back to a Full Table Scan (`ALL`).",
    explanation: "If the optimizer calculates that merging multiple index bitmap trees is expensive, it defaults to scanning the entire table.",
    hint: "Standard B+Tree seeks cannot resolve disjoint OR predicates simultaneously.",
    level: "expert"
  },
  {
    question: "How do you refactor an inefficient `OR` query across different columns?",
    shortAnswer: "Split the query into two separate `SELECT` statements joined by `UNION ALL` (excluding duplicates in the second query).",
    explanation: "Each `SELECT` branch independently utilizes its dedicated index (`ref`/`range`), streaming results without table scans.",
    hint: "Use UNION ALL with separate indexed queries.",
    level: "expert",
    codeExample: "SELECT * FROM students WHERE city = 'Barrackpore'\nUNION ALL\nSELECT * FROM students WHERE department_id = 4 AND city != 'Barrackpore';"
  },
  {
    question: "What is the crucial performance difference between `UNION` and `UNION ALL`?",
    shortAnswer: "`UNION` executes an implicit `DISTINCT` pass to deduplicate rows (creating an internal temporary table and filesort); `UNION ALL` appends rows directly with zero sorting overhead.",
    explanation: "Always use `UNION ALL` unless business logic strictly requires unique row deduplication.",
    hint: "UNION performs a temporary table sort for deduplication; UNION ALL does not.",
    level: "basic"
  },
  {
    question: "Why is `WHERE id NOT IN (SELECT student_id FROM blacklist)` dangerous with NULLs?",
    shortAnswer: "If the subquery returns even a single `NULL` value, the `NOT IN` expression evaluates to `UNKNOWN`/`NULL` for all rows, returning an empty result set and forcing a full scan.",
    explanation: "SQL three-valued logic causes `NOT IN` to fail on NULLs. Use `NOT EXISTS` or `LEFT JOIN ... WHERE blacklist.student_id IS NULL` instead.",
    hint: "A single NULL in the subquery breaks NOT IN evaluation.",
    level: "expert"
  },
  {
    question: "How does MySQL 8.0 optimize `WHERE id IN (SELECT student_id FROM ...)`?",
    shortAnswer: "Via **Semi-Join Transformations** (such as FirstMatch, Materialization, LooseScan, or Duplicate Weedout), rewriting the `IN` subquery into an efficient join internally.",
    explanation: "The optimizer avoids row-by-row execution by converting the subquery into an inner join or hash lookup.",
    hint: "Semi-join transformation converts IN subqueries into join operations.",
    level: "expert"
  },
  {
    question: "What is the 'Duplicate Weedout' semi-join strategy?",
    shortAnswer: "MySQL joins the tables and uses an internal temporary table with a primary key to discard duplicate outer rows on the fly.",
    explanation: "Ensures that outer rows are returned at most once without needing a separate deduplication sort step.",
    hint: "Uses an internal temporary key to discard duplicates during joins.",
    level: "moderate"
  },
  {
    question: "Why is using `SELECT DISTINCT` to fix duplicate rows from bad `JOIN`s an anti-pattern?",
    shortAnswer: "`DISTINCT` masks the underlying cartesian product / join multiplication error and forces MySQL to create a temporary table and execute an expensive sort pass over all columns.",
    explanation: "Fix the join condition or use `EXISTS` rather than adding `DISTINCT` as a band-aid.",
    hint: "Masks broken join logic and adds temporary table sorting overhead.",
    level: "basic"
  },
  {
    question: "How do you refactor a query finding the 'Latest status per student' using Window Functions?",
    shortAnswer: "Use `ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY status_date DESC)` in a CTE and filter `WHERE rn = 1`.",
    explanation: "Replaces slow correlated subqueries or self-joins with a single linear window ranking pass.",
    hint: "Use ROW_NUMBER() with PARTITION BY in a CTE.",
    level: "expert",
    codeExample: "WITH Ranked AS (\n  SELECT *, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY status_date DESC) as rn\n  FROM status_history\n)\nSELECT * FROM Ranked WHERE rn = 1;"
  },
  {
    question: "How does `COUNT(*)` differ from `COUNT(column_name)` in performance and logic?",
    shortAnswer: "`COUNT(*)` counts all rows and can use the smallest secondary index tree; `COUNT(column)` must inspect column values to skip `NULL`s, potentially requiring base table reads.",
    explanation: "`COUNT(*)` is optimized by MySQL to scan the narrowest index leaf pages, making it faster than `COUNT(col)`.",
    hint: "COUNT(*) counts total rows using narrowest index; COUNT(col) filters out NULLs.",
    level: "basic"
  },
  {
    question: "What is Derived Table Condition Pushdown in MySQL 8.0?",
    shortAnswer: "An optimizer feature that pushes `WHERE` filters from the outer query directly inside the derived table (subquery in `FROM`), reducing the intermediate rows generated.",
    explanation: "Prevents materializing unnecessary intermediate rows by filtering before derived table creation.",
    hint: "Pushes outer WHERE conditions down into the FROM subquery.",
    level: "expert"
  },
  {
    question: "Why can `HAVING` clauses be slower than `WHERE` clauses?",
    shortAnswer: "`WHERE` filters rows *before* grouping and aggregation (reducing rows processed); `HAVING` filters rows *after* the entire grouping and aggregation pass has completed.",
    explanation: "Always filter non-aggregate conditions in `WHERE` rather than `HAVING`.",
    hint: "WHERE filters before grouping; HAVING filters after grouping.",
    level: "basic"
  },
  {
    question: "How do you refactor `WHERE status = 'A' OR status = 'B' OR status = 'C'`?",
    shortAnswer: "Use `IN ('A', 'B', 'C')` on the indexed column, enabling MySQL to execute an index range scan (index dive).",
    explanation: "`IN (...)` on a single indexed column is clean, sargable, and uses B+Tree range probing.",
    hint: "Replace single-column OR chains with IN (...).",
    level: "basic",
    codeExample: "SELECT * FROM students WHERE status IN ('A', 'B', 'C');"
  },
  {
    question: "What is Common Table Expression (CTE) Materialization vs Merging in MySQL 8.0?",
    shortAnswer: "MySQL can either merge a non-recursive CTE directly into the main query plan (like an inline view) or materialize it into a temporary table if referenced multiple times.",
    explanation: "Controlled via optimizer hints `/*+ MERGE(cte) */` or `/*+ NO_MERGE(cte) */`.",
    hint: "CTE can be merged into outer query or materialized in memory.",
    level: "expert"
  },
  {
    question: "Why should you avoid using `ORDER BY RAND()` on large tables?",
    shortAnswer: "`ORDER BY RAND()` assigns a random number to every row, generates an internal temporary table, and performs a full filesort over the entire table.",
    explanation: "To pick random rows, select random IDs programmatically or join on random Primary Keys.",
    hint: "Assigns random floats to every row and performs a full table filesort.",
    level: "basic"
  },
  {
    question: "How does pagination with `LIMIT / OFFSET` degrade as the offset grows?",
    shortAnswer: "MySQL must physically read and discard `OFFSET` rows before returning the `LIMIT` count, leading to high latency on deep pages.",
    explanation: "Refactor using Keysheet / Keyset Pagination (`WHERE id > last_seen_id LIMIT 20`) or Deferred Joins.",
    hint: "Reads and discards all preceding offset rows from disk/memory.",
    level: "basic"
  },
  {
    question: "What is Keyset Pagination (Cursor Pagination)?",
    shortAnswer: "A pagination technique that filters on the last fetched row's key (`WHERE id > 10500 ORDER BY id ASC LIMIT 20`) rather than using `OFFSET`.",
    explanation: "Executes as an instant $O(1)$ index range probe regardless of how deep into the dataset the user navigates.",
    hint: "Uses WHERE id > last_id instead of OFFSET for constant-time pagination.",
    level: "expert",
    codeExample: "SELECT id, name, gpa FROM students WHERE id > 10500 ORDER BY id ASC LIMIT 20;"
  },
  {
    question: "How do you refactor multiple `COUNT(CASE ...)` aggregations for performance?",
    shortAnswer: "Combine multiple conditional counts into a single `SELECT` pass over the table: `SELECT SUM(CASE WHEN status='A' THEN 1 ELSE 0 END), SUM(CASE WHEN status='B' THEN 1 ELSE 0 END)...`.",
    explanation: "Satisfies all category metrics in a single scan rather than executing separate queries for each status.",
    hint: "Use conditional SUM(CASE...) to compute all metrics in one table pass.",
    level: "basic"
  },
  {
    question: "Why can `JOIN` on expressions (e.g. `ON a.code = SUBSTRING(b.code, 1, 4)`) cause poor performance?",
    shortAnswer: "Joining on an expression disables index lookups on the joined table, forcing a Hash Join or Block Nested Loop with high CPU overhead.",
    explanation: "Store normalized join keys in dedicated columns and index them directly.",
    hint: "Joining on expressions prevents index lookups on join keys.",
    level: "expert"
  },
  {
    question: "What is the performance impact of `SELECT DISTINCT` with `ORDER BY` on un-selected columns?",
    shortAnswer: "MySQL is forced to include the sorting columns in the temporary table, increasing temporary table size and requiring an extra sort pass.",
    explanation: "Standard SQL requires `ORDER BY` columns to be present in `SELECT` when `DISTINCT` is used.",
    hint: "Increases temporary table size and causes extra sorting overhead.",
    level: "moderate"
  },
  {
    question: "How does `EXISTS` outperform `IN` when subquery tables have low selectivity?",
    shortAnswer: "`EXISTS` short-circuits immediately upon finding the first matching row in the index, whereas `IN` without semi-join optimization may evaluate all subquery rows.",
    explanation: "Short-circuiting stops the index probe at the very first matching leaf node.",
    hint: "EXISTS short-circuits immediately upon finding the first matching index entry.",
    level: "expert"
  },
  {
    question: "How should you refactor an inefficient `SELECT * FROM (SELECT ...) WHERE ...` query?",
    shortAnswer: "Flatten the nested derived query into a single `SELECT` statement and push the `WHERE` filters directly against the indexed base tables.",
    explanation: "Query flattening eliminates intermediate table materialization and enables direct index seeks.",
    hint: "Flatten nested queries into a single statement to enable index seeks.",
    level: "basic"
  },
  {
    question: "What is the effect of removing unused `LEFT JOIN`s from analytical queries?",
    shortAnswer: "It eliminates unnecessary join probe iterations, memory buffer allocations, and table locks, directly speeding up query execution.",
    explanation: "ORMs often generate unused left joins that burden the query execution plan.",
    hint: "Eliminates join overhead and buffer allocations.",
    level: "basic"
  },
  {
    question: "Why is `WHERE column IN (val1, val2... 5000 items)` problematic?",
    shortAnswer: "Massive IN-lists consume memory during index dives (`eq_range_index_dive_limit`), causing the optimizer to fall back to less accurate index statistics.",
    explanation: "Load large ID lists into a temporary table and execute an `INNER JOIN` instead.",
    hint: "Huge IN lists exhaust index dive limits and degrade plan accuracy.",
    level: "expert"
  },
  {
    question: "How does refactoring queries to be sargable and explicit benefit connection pooling?",
    shortAnswer: "Faster query execution reduces connection hold time, allowing high-concurrency connection pools to serve more requests per second without saturating server threads.",
    explanation: "Reducing query latency from 50ms to 1ms increases connection pool throughput by 50x.",
    hint: "Short query times free up pool connections faster, multiplying concurrency capacity.",
    level: "expert"
  },
  {
    question: "What is the recommended approach to reviewing slow queries before creating new indexes?",
    shortAnswer: "First refactor the query (eliminate `SELECT *`, convert correlated subqueries, fix sargability, split `OR`s). Often, clean SQL resolves the bottleneck without adding new index write overhead.",
    explanation: "Always optimize the SQL structure first before adding new secondary indexes.",
    hint: "Refactor SQL structure first before creating new indexes.",
    level: "basic"
  },
  {
    question: "What is the primary golden rule for query refactoring in enterprise MySQL systems?",
    shortAnswer: "Express business intent through set-based operations, project only necessary columns, and structure predicates so the optimizer can use clean, single-probe B+Tree access paths.",
    explanation: "Clean set-based SQL enables the MySQL optimizer to generate optimal physical execution plans with zero disk temporary tables.",
    hint: "Set-based logic, explicit column projection, and clean single-probe predicates.",
    level: "basic"
  }
];

export default questions;
