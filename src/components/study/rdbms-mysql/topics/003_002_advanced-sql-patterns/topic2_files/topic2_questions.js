// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is the primary difference between `RANK()` and `DENSE_RANK()` in MySQL 8.0?",
    shortAnswer: "`RANK()` leaves gaps in the ranking sequence after tied values ($1, 2, 2, 4$), whereas `DENSE_RANK()` assigns consecutive rank numbers without gaps ($1, 2, 2, 3$).",
    explanation: "DENSE_RANK preserves dense numerical continuity.",
    hint: "RANK skips ranks after ties (1, 2, 2, 4); DENSE_RANK does not skip ranks (1, 2, 2, 3).",
    level: "basic"
  },
  {
    question: "How does `ROW_NUMBER()` handle tied values in the `ORDER BY` column?",
    shortAnswer: "It assigns strictly unique consecutive integers ($1, 2, 3, 4$) to every row regardless of ties, making it completely tie-free.",
    explanation: "Guarantees unique numbering for pagination and deduplication.",
    hint: "Assigns unique sequential integers without ties (1, 2, 3, 4).",
    level: "basic"
  },
  {
    question: "What is the purpose of the `NTILE(n)` window function?",
    shortAnswer: "It divides the ordered rows of each partition into $n$ approximately equal-sized buckets or groups, assigning each row a bucket number from 1 to $n$.",
    explanation: "Used for quartiles, deciles, and performance percentiles.",
    hint: "Divides ordered partition rows into n equal-sized buckets.",
    level: "basic"
  },
  {
    question: "How does `NTILE(4)` distribute 10 rows across 4 buckets?",
    shortAnswer: "The first 2 buckets get 3 rows each, and the remaining 2 buckets get 2 rows each (Distribution: $3, 3, 2, 2$).",
    explanation: "MySQL places remainder rows into earlier buckets first.",
    hint: "Buckets 1 and 2 get 3 rows; buckets 3 and 4 get 2 rows.",
    level: "expert"
  },
  {
    question: "When is `DENSE_RANK()` preferred over `RANK()` in business reporting?",
    shortAnswer: "When querying Top-N entity levels (e.g. 'Top 3 highest salary tiers' or 'Top 3 examination scores'), ensuring exactly 3 distinct value tiers are returned.",
    explanation: "Prevents skipped ranks from omitting valid threshold tiers.",
    hint: "When finding Top N distinct value tiers without skipping numbers.",
    level: "basic"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu illustrate `ROW_NUMBER`, `RANK`, and `DENSE_RANK`?",
    shortAnswer: "If Mamata and Susmita both score 94.50%, `ROW_NUMBER()` assigns 1 and 2, `RANK()` assigns 1 and 1 (with Debangshu getting 3), and `DENSE_RANK()` assigns 1 and 1 (with Debangshu getting 2).",
    explanation: "Demonstrates exact tie handling across all 3 functions.",
    hint: "ROW_NUMBER gives 1, 2; RANK gives 1, 1, 3; DENSE_RANK gives 1, 1, 2.",
    level: "basic"
  },
  {
    question: "How do you deduplicate a table that contains duplicate email addresses using `ROW_NUMBER()`?",
    shortAnswer: "`WITH Numbered AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY created_at ASC) AS rn FROM users) DELETE FROM users WHERE id IN (SELECT id FROM Numbered WHERE rn > 1);`",
    explanation: "The standard SQL row deduplication pattern.",
    hint: "Partition by duplicate key, order by date, and filter rn > 1.",
    level: "expert"
  },
  {
    question: "How do you implement UI pagination (e.g. Page 2: records 11 to 20) using `ROW_NUMBER()`?",
    shortAnswer: "`WITH Paged AS (SELECT *, ROW_NUMBER() OVER (ORDER BY student_id) AS rn FROM students) SELECT * FROM Paged WHERE rn BETWEEN 11 AND 20;`",
    explanation: "Standard window-based row pagination.",
    hint: "Wrap ROW_NUMBER() in a CTE and filter WHERE rn BETWEEN 11 AND 20.",
    level: "moderate"
  },
  {
    question: "Can ranking functions be used WITHOUT an `ORDER BY` clause inside `OVER()`?",
    shortAnswer: "Technically yes for `ROW_NUMBER()`, but ranks will be assigned in non-deterministic physical storage order; `RANK()` and `DENSE_RANK()` require `ORDER BY` to be meaningful.",
    explanation: "Always provide an explicit ORDER BY clause for rankings.",
    hint: "Always provide ORDER BY for deterministic, meaningful rankings.",
    level: "moderate"
  },
  {
    question: "How do you find the 2nd highest salary in a company using `DENSE_RANK()`?",
    shortAnswer: "`WITH RankedSalaries AS (SELECT emp_name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM employees) SELECT salary FROM RankedSalaries WHERE rnk = 2 LIMIT 1;`",
    explanation: "Clean, NULL-safe N-th highest value query.",
    hint: "Compute DENSE_RANK() descending on salary and filter WHERE rnk = 2.",
    level: "basic"
  },
  {
    question: "What happens if `NTILE(n)` is called with an argument $n$ that is greater than the total number of rows in the partition (e.g. `NTILE(10)` on 4 rows)?",
    shortAnswer: "Each row receives its own bucket number ($1, 2, 3, 4$) and buckets 5 through 10 remain empty.",
    explanation: "Every available row is placed into bucket numbers 1 through N.",
    hint: "Each of the 4 rows gets bucket numbers 1, 2, 3, 4; higher buckets are empty.",
    level: "moderate"
  },
  {
    question: "Can `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` accept column arguments inside their parentheses (e.g. `RANK(score)`)?",
    shortAnswer: "NO; in MySQL 8.0, all ranking functions accept ZERO arguments inside their parentheses (`ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`).",
    explanation: "Column parameters are placed in the OVER() clause, not the function argument.",
    hint: "No, ranking functions take empty parentheses () in MySQL 8.0.",
    level: "basic"
  },
  {
    question: "How do you segment students into 4 performance quartiles (Q1 Top to Q4 Bottom)?",
    shortAnswer: "`SELECT student_name, exam_score_pct, NTILE(4) OVER (ORDER BY exam_score_pct DESC) AS quartile_bucket FROM students;`",
    explanation: "Q1 = Top 25%, Q2 = 50-75%, Q3 = 25-50%, Q4 = Bottom 25%.",
    hint: "NTILE(4) OVER (ORDER BY exam_score_pct DESC)",
    level: "basic"
  },
  {
    question: "How do you ensure that `ROW_NUMBER()` produces 100% deterministic results when scores are tied?",
    shortAnswer: "Add the primary key as a secondary tie-breaker in `ORDER BY`: `OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC, student_id ASC)`.",
    explanation: "Guarantees identical row numbers across repeated query executions.",
    hint: "Include primary key as secondary tie-breaker in ORDER BY.",
    level: "expert"
  },
  {
    question: "What is the ranking sequence for 5 scores `[100, 90, 90, 80, 70]` using `RANK()`?",
    shortAnswer: "`1, 2, 2, 4, 5` (Rank 3 is skipped due to the 2-way tie at rank 2).",
    explanation: "Standard sports competition ranking.",
    hint: "1, 2, 2, 4, 5 (skips rank 3).",
    level: "basic"
  },
  {
    question: "What is the ranking sequence for 5 scores `[100, 90, 90, 80, 70]` using `DENSE_RANK()`?",
    shortAnswer: "`1, 2, 2, 3, 4` (Zero numbers skipped).",
    explanation: "Dense ranking without numerical sequence gaps.",
    hint: "1, 2, 2, 3, 4 (no gaps).",
    level: "basic"
  },
  {
    question: "What is the ranking sequence for 5 scores `[100, 90, 90, 80, 70]` using `ROW_NUMBER()`?",
    shortAnswer: "`1, 2, 3, 4, 5` (Consecutive unique integers).",
    explanation: "Strictly unique sequential row numbers.",
    hint: "1, 2, 3, 4, 5 (unique integers).",
    level: "basic"
  },
  {
    question: "How do you find the Top 2 students with the highest scores in EACH department?",
    shortAnswer: "`WITH Ranked AS (SELECT *, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) AS rnk FROM students) SELECT * FROM Ranked WHERE rnk <= 2;`",
    explanation: "Top-N per category pattern.",
    hint: "Partition by dept_id, order by score DESC, and filter rnk <= 2 in CTE.",
    level: "moderate"
  },
  {
    question: "Can `NTILE()` be combined with `PARTITION BY` to calculate quartiles per department?",
    shortAnswer: "YES; `NTILE(4) OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC)` calculates 4 performance quartiles independently within each department.",
    explanation: "Calculates quartiles within each department boundary.",
    hint: "Yes, NTILE(4) with PARTITION BY dept_id calculates quartiles per department.",
    level: "basic"
  },
  {
    question: "What is the time complexity of evaluating `DENSE_RANK()` on $N$ rows in MySQL 8.0?",
    shortAnswer: "$O(N \\log N)$ using in-memory quicksort or $O(N)$ when supported by an index.",
    explanation: "Significantly faster than $O(N^2)$ correlated subqueries.",
    hint: "O(N log N) sorting in memory, or O(N) linear stream if indexed.",
    level: "expert"
  },
  {
    question: "Can you filter by `ROW_NUMBER() = 1` directly in the same SELECT statement without a subquery or CTE?",
    shortAnswer: "NO; because `ROW_NUMBER()` is evaluated at Phase 5, after the `WHERE` clause (Phase 2) has already executed.",
    explanation: "Must wrap in a CTE or derived table.",
    hint: "No, window functions cannot appear in the WHERE clause.",
    level: "basic"
  },
  {
    question: "How does `NTILE(10)` assist in Decile analysis for credit risk scoring?",
    shortAnswer: "It segments credit applicants into 10 equal-sized risk deciles (Decile 1 = lowest risk, Decile 10 = highest risk) based on credit scores.",
    explanation: "Standard credit risk modeling in banking databases.",
    hint: "Segments applicants into 10 risk deciles for credit underwriting.",
    level: "moderate"
  },
  {
    question: "What is the output of `RANK()` when all rows in a partition have identical values?",
    shortAnswer: "Every row receives rank `1`.",
    explanation: "All rows tie for first place.",
    hint: "All rows receive rank 1.",
    level: "basic"
  },
  {
    question: "What is the output of `ROW_NUMBER()` when all rows in a partition have identical values?",
    shortAnswer: "Rows receive sequential numbers `1, 2, 3, 4...` in arbitrary physical storage order.",
    explanation: "ROW_NUMBER never outputs duplicate numbers.",
    hint: "Rows receive 1, 2, 3, 4 sequentially without ties.",
    level: "basic"
  },
  {
    question: "How do you pick the latest status update for each student using `ROW_NUMBER()`?",
    shortAnswer: "`WITH LatestLogs AS (SELECT *, ROW_NUMBER() OVER (PARTITION BY student_id ORDER BY update_time DESC) AS rn FROM status_logs) SELECT * FROM LatestLogs WHERE rn = 1;`",
    explanation: "Picks the single newest record per entity.",
    hint: "Partition by student_id, order by update_time DESC, filter rn = 1.",
    level: "moderate"
  },
  {
    question: "What happens if a column in `ORDER BY` contains `NULL` values when ranking in ascending order in MySQL?",
    shortAnswer: "`NULL` values sort FIRST (lowest) by default in MySQL, receiving ranks 1, 2... unless `ORDER BY col IS NULL, col ASC` is specified.",
    explanation: "MySQL default NULL sorting behavior.",
    hint: "NULL values sort first in ascending order by default in MySQL.",
    level: "expert"
  },
  {
    question: "What happens if a column in `ORDER BY` contains `NULL` values when ranking in descending order in MySQL?",
    shortAnswer: "`NULL` values sort LAST (lowest) by default in MySQL.",
    explanation: "NULLs appear at the end of descending sorts.",
    hint: "NULL values sort last in descending order by default in MySQL.",
    level: "expert"
  },
  {
    question: "How do you rank students by exam score descending and then by submission time ascending for tie-breaking?",
    shortAnswer: "`DENSE_RANK() OVER (ORDER BY exam_score_pct DESC, submission_time ASC)`.",
    explanation: "Earlier submissions break score ties.",
    hint: "ORDER BY exam_score_pct DESC, submission_time ASC",
    level: "basic"
  },
  {
    question: "Can `DENSE_RANK()` be used inside a View definition?",
    shortAnswer: "YES; `CREATE VIEW v_student_ranks AS SELECT *, DENSE_RANK() OVER (...) FROM students;` is fully supported.",
    explanation: "Views can encapsulate ranking window functions.",
    hint: "Yes, Views can contain window ranking functions.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for Ranking Functions (`ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`)?",
    shortAnswer: "Use `ROW_NUMBER()` for unique pagination and deduplication, `RANK()` for competitive sports rankings with gaps, `DENSE_RANK()` for dense tier thresholds and Top-N queries, and `NTILE(n)` for percentile segmentation.",
    explanation: "Authoritative architectural best practices for SQL ranking function selection.",
    hint: "ROW_NUMBER for deduplication + RANK for sports gaps + DENSE_RANK for Top-N tiers + NTILE for percentiles.",
    level: "expert"
  }
];

export default questions;
