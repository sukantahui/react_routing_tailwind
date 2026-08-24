// topic8_files/topic8_questions.js

const questions = [
  {
    question: "What does the `CUME_DIST()` window function calculate in MySQL 8.0?",
    shortAnswer: "The cumulative distribution: the fraction of rows in the partition with values less than or equal to the current row's value (Formula: $\\frac{\\text{NP}}{\\text{Total Rows}}$).",
    explanation: "Returns a value in the open interval (0.0, 1.0].",
    hint: "Fraction of rows with values less than or equal to current row.",
    level: "basic"
  },
  {
    question: "What does the `PERCENT_RANK()` window function calculate in MySQL 8.0?",
    shortAnswer: "The relative rank percentile: evaluates the rank of the current row minus 1 divided by the total partition rows minus 1 (Formula: $\\frac{\\text{RANK}-1}{N-1}$).",
    explanation: "Returns a value in the closed interval [0.0, 1.0].",
    hint: "(RANK - 1) / (Total Rows - 1)",
    level: "basic"
  },
  {
    question: "What value does `PERCENT_RANK()` always return for the very first row in any partition?",
    shortAnswer: "`0.0000` (because $(1-1)/(N-1) = 0$).",
    explanation: "The lowest/first row is anchored at percentile zero.",
    hint: "Always returns 0.0000 for the first row.",
    level: "basic"
  },
  {
    question: "What value does `CUME_DIST()` return for the very first row in a 4-row partition with unique values?",
    shortAnswer: "`0.2500` ($1/4 = 0.25$).",
    explanation: "Represents 25% of the partition.",
    hint: "1 / 4 = 0.2500 (25%).",
    level: "basic"
  },
  {
    question: "What happens if a partition contains only 1 single row for `PERCENT_RANK()`?",
    shortAnswer: "`PERCENT_RANK()` returns `0.0000`.",
    explanation: "Handles single-row edge partitions gracefully.",
    hint: "Returns 0.0000.",
    level: "moderate"
  },
  {
    question: "How do student scores for Mamata, Susmita, Abhronila, and Debangshu illustrate `CUME_DIST` vs `PERCENT_RANK`?",
    shortAnswer: "Sorted ascending: Debangshu (82.4%) gets `CUME_DIST = 0.25` and `PERCENT_RANK = 0.00`; Abhronila (96.2%) gets `CUME_DIST = 1.00` and `PERCENT_RANK = 1.00`.",
    explanation: "Demonstrates starting and ending boundary values.",
    hint: "Bottom student gets CUME_DIST 0.25 / PERCENT_RANK 0.0; Top student gets 1.0 for both.",
    level: "basic"
  },
  {
    question: "How do you filter for students in the Top 10th Percentile (Top 10%) using `PERCENT_RANK()`?",
    shortAnswer: "`WITH Pct AS (SELECT *, PERCENT_RANK() OVER (ORDER BY score ASC) AS pr FROM students) SELECT * FROM Pct WHERE pr >= 0.90;`",
    explanation: "Filters the top 10% performing cohort.",
    hint: "Wrap PERCENT_RANK() in CTE and filter WHERE pr >= 0.90.",
    level: "basic"
  },
  {
    question: "How are tied values handled by `CUME_DIST()`?",
    shortAnswer: "Tied rows receive the exact same cumulative distribution representing the highest position among the tied group divided by total rows.",
    explanation: "Peer rows share the upper boundary fraction.",
    hint: "Tied rows receive the same CUME_DIST corresponding to the last tied position.",
    level: "expert"
  },
  {
    question: "How are tied values handled by `PERCENT_RANK()`?",
    shortAnswer: "Tied rows receive the exact same percentage rank based on their shared `RANK()` value.",
    explanation: "Inherits tie behavior from standard RANK().",
    hint: "Tied rows share the identical PERCENT_RANK.",
    level: "expert"
  },
  {
    question: "Why should `ORDER BY` be sorted in ASCENDING order when calculating academic percentiles with `PERCENT_RANK()`?",
    shortAnswer: "Because standard percentile ranking measures how many students score *below* you, anchoring the lowest score at 0.0 and the topper at 1.0 (100th percentile).",
    explanation: "Ascending sort creates standard percentile semantics.",
    hint: "Ascending order anchors lowest score at 0.0 and top score at 1.0.",
    level: "expert"
  },
  {
    question: "Can `CUME_DIST()` and `PERCENT_RANK()` be partitioned by department?",
    shortAnswer: "YES; adding `PARTITION BY dept_id` computes percentiles independently within each department.",
    explanation: "Isolates percentile calculations per group.",
    hint: "Yes, use PARTITION BY dept_id inside the OVER clause.",
    level: "basic"
  },
  {
    question: "What is the range of output values for `CUME_DIST()`?",
    shortAnswer: "Greater than $0.0$ and up to $1.0$ (i.e. $0 < \\text{CUME\\_DIST} \\le 1.0$).",
    explanation: "Can never be 0 because at least 1 row exists.",
    hint: "Strictly greater than 0 up to 1.0.",
    level: "basic"
  },
  {
    question: "What is the range of output values for `PERCENT_RANK()`?",
    shortAnswer: "Between $0.0$ and $1.0$ inclusive (i.e. $0.0 \\le \\text{PERCENT\\_RANK} \\le 1.0$).",
    explanation: "Starts at exactly 0.0 and ends at 1.0.",
    hint: "From 0.0 to 1.0 inclusive.",
    level: "basic"
  },
  {
    question: "How do you calculate salary percentile distribution in an enterprise company?",
    shortAnswer: "`SELECT emp_name, salary, ROUND(PERCENT_RANK() OVER (ORDER BY salary ASC) * 100.0, 2) AS salary_percentile FROM employees;`",
    explanation: "Computes employee salary percentile on 0-100 scale.",
    hint: "ROUND(PERCENT_RANK() OVER (ORDER BY salary ASC) * 100.0, 2)",
    level: "basic"
  },
  {
    question: "Do `CUME_DIST()` and `PERCENT_RANK()` accept arguments inside their parentheses?",
    shortAnswer: "NO; both functions accept ZERO arguments (`CUME_DIST()`, `PERCENT_RANK()`); parameters are defined inside the `OVER()` clause.",
    explanation: "Column parameters are specified in OVER().",
    hint: "No, they take empty parentheses ().",
    level: "basic"
  },
  {
    question: "Can `CUME_DIST()` and `PERCENT_RANK()` accept window frame clauses (`ROWS`/`RANGE`)?",
    shortAnswer: "NO; distribution functions operate strictly on the full partition order and do NOT support window frame clauses (throws Error 3580).",
    explanation: "Frame clauses are prohibited on distribution functions.",
    hint: "No, window frame clauses are not supported.",
    level: "expert"
  },
  {
    question: "What index optimizes `PERCENT_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct ASC)`?",
    shortAnswer: "A composite B-Tree index on `(dept_id, exam_score_pct ASC)`.",
    explanation: "Streams rows in pre-sorted partition order with zero filesort.",
    hint: "Composite index on (dept_id, exam_score_pct ASC).",
    level: "expert"
  },
  {
    question: "How do you identify the bottom 25% underperforming cohort using `CUME_DIST()`?",
    shortAnswer: "`WITH Dist AS (SELECT *, CUME_DIST() OVER (ORDER BY exam_score_pct ASC) AS cd FROM students) SELECT * FROM Dist WHERE cd <= 0.25;`",
    explanation: "Filters the lower quartile.",
    hint: "Filter WHERE cd <= 0.25 in outer query of CTE.",
    level: "basic"
  },
  {
    question: "What is the difference between `NTILE(100)` and `PERCENT_RANK()`?",
    shortAnswer: "`NTILE(100)` assigns discrete integer bucket numbers from 1 to 100, whereas `PERCENT_RANK()` computes a continuous floating-point mathematical percentile from 0.0 to 1.0.",
    explanation: "Discrete integer buckets vs continuous floating-point rank fraction.",
    hint: "NTILE gives integer buckets (1-100); PERCENT_RANK gives continuous decimals (0.0-1.0).",
    level: "expert"
  },
  {
    question: "How does `PERCENT_RANK()` calculate when 3 students are tied for 2nd place in a 10-student class?",
    shortAnswer: "All 3 students get $\\text{RANK} = 2$, so $\\text{PERCENT\\_RANK} = (2-1)/(10-1) = 1/9 \\approx 0.1111$.",
    explanation: "Uses the tied standard rank in the numerator.",
    hint: "(2 - 1) / (10 - 1) = 1/9 = 0.1111.",
    level: "expert"
  },
  {
    question: "Can `CUME_DIST()` be combined with `CASE` statements to create academic letter grades?",
    shortAnswer: "YES; `CASE WHEN cd >= 0.9 THEN 'A+' WHEN cd >= 0.75 THEN 'A' WHEN cd >= 0.5 THEN 'B' ELSE 'C' END`.",
    explanation: "Norm-referenced grading on a bell curve.",
    hint: "Yes, use CASE with CUME_DIST for relative grading curves.",
    level: "moderate"
  },
  {
    question: "What happens if a column in `ORDER BY` contains `NULL` values when evaluating `PERCENT_RANK()` in ascending order?",
    shortAnswer: "In MySQL, `NULL` values sort first, receiving rank 1 and `PERCENT_RANK = 0.0000`.",
    explanation: "MySQL default NULL sorting behavior.",
    hint: "NULL values sort first, receiving percentile 0.0000.",
    level: "expert"
  },
  {
    question: "How do you calculate customer lifetime value (LTV) percentiles?",
    shortAnswer: "`SELECT customer_id, total_ltv, ROUND(PERCENT_RANK() OVER (ORDER BY total_ltv ASC) * 100.0, 2) AS ltv_percentile FROM customer_totals;`",
    explanation: "Segments customer base by lifetime spending percentile.",
    hint: "PERCENT_RANK() OVER (ORDER BY total_ltv ASC) * 100.0",
    level: "basic"
  },
  {
    question: "Can `CUME_DIST()` and `PERCENT_RANK()` share the same named window specification?",
    shortAnswer: "YES; `SELECT CUME_DIST() OVER w, PERCENT_RANK() OVER w FROM students WINDOW w AS (PARTITION BY dept_id ORDER BY score ASC);`",
    explanation: "Clean and reusable named window sharing.",
    hint: "Yes, share named window w declared with WINDOW clause.",
    level: "basic"
  },
  {
    question: "What is the time complexity of computing `PERCENT_RANK()` on $N$ rows in MySQL 8.0?",
    shortAnswer: "$O(N \\log N)$ using in-memory quicksort or $O(N)$ with a supporting index.",
    explanation: "High-performance single-pass evaluation.",
    hint: "O(N log N) in-memory sort or O(N) indexed stream.",
    level: "expert"
  },
  {
    question: "How do you calculate the 95th percentile value in a table without window functions vs with window functions?",
    shortAnswer: "Without window functions, you need complex self-joins and limit offsets; with window functions, compute `PERCENT_RANK()` in a CTE and filter `WHERE pr >= 0.95 LIMIT 1`.",
    explanation: "Massive simplification of percentile queries in MySQL 8.0.",
    hint: "Compute PERCENT_RANK in CTE and filter WHERE pr >= 0.95.",
    level: "moderate"
  },
  {
    question: "What error occurs if you try to use `PERCENT_RANK()` in a `WHERE` clause directly?",
    shortAnswer: "`Error 3593 (HY000): You cannot use the window function 'PERCENT_RANK' in this context.`",
    explanation: "Must wrap in a CTE or derived table.",
    hint: "Error 3593: Cannot use window function in WHERE directly.",
    level: "basic"
  },
  {
    question: "Can `PERCENT_RANK()` be used to normalize heterogeneous exam scores across different subjects?",
    shortAnswer: "YES; partitioning by subject (`PARTITION BY subject_id ORDER BY marks ASC`) converts raw exam marks from different difficulty tests into a standardized 0-1 scale.",
    explanation: "Standardized cross-subject normalization.",
    hint: "Yes, PARTITION BY subject_id standardizes tests of differing difficulty.",
    level: "expert"
  },
  {
    question: "Why should developers multiply `PERCENT_RANK()` by 100.0 when presenting results to business executives?",
    shortAnswer: "To convert fractional decimals (e.g. `0.9500`) into familiar percentage numbers (e.g. `95.00th Percentile`).",
    explanation: "Human-friendly presentation formatting.",
    hint: "Multiplies decimal (0.95) to create 95.00th percentile for user reports.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Distribution & Percentile Functions (`CUME_DIST`, `PERCENT_RANK`)?",
    shortAnswer: "Sort `ORDER BY` in ascending order to follow standard percentile conventions (lowest = 0.0, top = 1.0), use `PERCENT_RANK()` for competitive entrance cutoffs and salary benchmarks, use `CUME_DIST()` for cumulative distribution fractions ($\le x$), and index `(partition_col, sort_col ASC)` for sub-millisecond linear streaming.",
    explanation: "Authoritative architectural best practices for SQL distribution functions.",
    hint: "Ascending sort + PERCENT_RANK for percentiles + CUME_DIST for cumulative fraction + composite indexing.",
    level: "expert"
  }
];

export default questions;
