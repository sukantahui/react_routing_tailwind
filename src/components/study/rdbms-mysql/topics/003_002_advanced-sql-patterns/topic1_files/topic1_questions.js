// topic1_files/topic1_questions.js

const questions = [
  {
    question: "What is the purpose of the `PARTITION BY` sub-clause inside the `OVER()` clause?",
    shortAnswer: "It divides the result set into independent logical partitions / groups; calculations reset at the start of each new partition.",
    explanation: "Allows calculating group-specific metrics while preserving individual rows.",
    hint: "Divides rows into independent groups where calculations reset.",
    level: "basic"
  },
  {
    question: "What happens if the `PARTITION BY` sub-clause is omitted from `OVER()`?",
    shortAnswer: "The window function treats the entire query result set as a single global partition.",
    explanation: "Computes global aggregates or table-wide rankings.",
    hint: "Treats the entire table as a single partition.",
    level: "basic"
  },
  {
    question: "What is the role of the `ORDER BY` sub-clause inside the `OVER()` clause?",
    shortAnswer: "It establishes the internal evaluation order of rows within each partition, determining ranking positions and running total progressions.",
    explanation: "Controls sequence for window computations.",
    hint: "Determines the internal row sequence for rankings and running totals.",
    level: "basic"
  },
  {
    question: "How does adding `ORDER BY` inside `OVER()` affect the default window frame for aggregate functions like `SUM()`?",
    shortAnswer: "Without `ORDER BY`, the frame covers the whole partition (`UNBOUNDED PRECEDING TO UNBOUNDED FOLLOWING`); with `ORDER BY`, the frame automatically shifts to `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`, producing a running total.",
    explanation: "A critical default framing rule in SQL standard window functions.",
    hint: "Adding ORDER BY changes a static whole-partition sum into a cumulative running total.",
    level: "expert"
  },
  {
    question: "Can you partition by multiple columns inside `OVER (PARTITION BY col1, col2)`?",
    shortAnswer: "YES; partitioning by multiple columns (e.g. `PARTITION BY branch_city, dept_id`) creates composite partitions, resetting calculations whenever either column value changes.",
    explanation: "Supports multi-dimensional grouping in analytical queries.",
    hint: "Yes, you can specify multiple comma-separated partition columns.",
    level: "basic"
  },
  {
    question: "Can you sort by multiple columns with mixed directions inside `OVER (ORDER BY col1 DESC, col2 ASC)`?",
    shortAnswer: "YES; multi-column sorting with mixed ascending/descending directions is fully supported.",
    explanation: "Provides precise tie-breaking and ordering control.",
    hint: "Yes, multi-column sorting with mixed ASC/DESC directions is valid.",
    level: "basic"
  },
  {
    question: "Does the `ORDER BY` inside `OVER()` change the final visual ordering of rows displayed to the user?",
    shortAnswer: "NO; `OVER (ORDER BY ...)` governs only the internal sequence for window calculations; the final output order is determined solely by the outer query's `ORDER BY` clause.",
    explanation: "Window sorting is isolated from final presentation sorting.",
    hint: "No, final output order is controlled strictly by the outer query's ORDER BY.",
    level: "moderate"
  },
  {
    question: "What is the purpose of the `WINDOW` clause in MySQL 8.0?",
    shortAnswer: "It defines reusable named window specifications at the end of the query, eliminating duplicate `OVER (PARTITION BY ...)` definitions across multiple SELECT columns.",
    explanation: "Follows the DRY (Don't Repeat Yourself) principle.",
    hint: "Declares reusable named window specifications to avoid repetitive code.",
    level: "moderate"
  },
  {
    question: "How do you write a query utilizing the `WINDOW` clause for multiple ranking metrics?",
    shortAnswer: "`SELECT student_id, RANK() OVER w, DENSE_RANK() OVER w, ROW_NUMBER() OVER w FROM students WINDOW w AS (PARTITION BY dept_id ORDER BY exam_score_pct DESC);`",
    explanation: "Reuses window definition `w` across three ranking functions.",
    hint: "Declare WINDOW w AS (PARTITION BY ... ORDER BY ...) and use OVER w.",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `PARTITION BY dept_id`?",
    shortAnswer: "CS students (Mamata, Susmita) are evaluated against the CS average of 91.25%, while IT students (Abhronila, Debangshu) are evaluated against the IT average of 89.30%, with calculations resetting between departments.",
    explanation: "Demonstrates independent partition evaluation boundaries.",
    hint: "Calculations reset between Computer Science and Information Tech partitions.",
    level: "basic"
  },
  {
    question: "What happens if two rows have identical values in the `ORDER BY` column when calculating running totals with default `RANGE` framing?",
    shortAnswer: "Tied rows receive the exact same accumulated sum up to the end of the tied range (peers are summed together), rather than advancing row-by-row.",
    explanation: "RANGE operates on value intervals, grouping peers together.",
    hint: "Tied rows receive the identical sum of all peers with the same value.",
    level: "expert"
  },
  {
    question: "How do you force strict row-by-row progression for running totals even when ties exist in the `ORDER BY` column?",
    shortAnswer: "Specify an explicit physical row frame: `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.",
    explanation: "`ROWS` treats every physical row individually regardless of duplicate values.",
    hint: "Use ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW.",
    level: "expert"
  },
  {
    question: "Can a query define multiple named windows in the `WINDOW` clause?",
    shortAnswer: "YES; multiple comma-separated named windows can be defined: `WINDOW w1 AS (PARTITION BY dept_id), w2 AS (PARTITION BY city ORDER BY date ASC)`.",
    explanation: "Permits declaring multiple distinct window specifications in one query.",
    hint: "Yes, separate multiple named window definitions with commas.",
    level: "basic"
  },
  {
    question: "Can a named window inherit from another named window in MySQL 8.0?",
    shortAnswer: "YES; for example, `WINDOW w1 AS (PARTITION BY dept_id), w2 AS (w1 ORDER BY exam_score_pct DESC)` allows `w2` to inherit `w1`'s partitioning.",
    explanation: "Window inheritance simplifies layered analytical specifications.",
    hint: "Yes, a named window can inherit partition specifications from an existing window.",
    level: "expert"
  },
  {
    question: "What is the performance impact of indexing columns used in `PARTITION BY` and `ORDER BY`?",
    shortAnswer: "A composite index on `(partition_col, order_col)` allows MySQL to evaluate window functions directly in index order without temporary filesort sorting.",
    explanation: "Eliminates 'Using filesort' in the query execution plan.",
    hint: "Composite index on (partition_col, order_col) avoids filesort overhead.",
    level: "expert"
  },
  {
    question: "What happens if you use `ROW_NUMBER()` with an `OVER()` clause that contains `PARTITION BY` but lacks `ORDER BY`?",
    shortAnswer: "`ROW_NUMBER()` assigns sequential numbers in arbitrary physical storage order, which is non-deterministic; `ORDER BY` is strongly recommended for meaningful ranking.",
    explanation: "Always provide ORDER BY for deterministic numbering.",
    hint: "Assigns non-deterministic arbitrary row numbers; ORDER BY is recommended.",
    level: "moderate"
  },
  {
    question: "How do you calculate the running total of student tuition fee collections month-by-month across the entire academy?",
    shortAnswer: "`SELECT payment_date, amount_paid_inr, SUM(amount_paid_inr) OVER (ORDER BY payment_date) AS running_fee_total FROM fee_payments;`",
    explanation: "Omission of PARTITION BY computes a global cumulative sum over time.",
    hint: "SUM(amount) OVER (ORDER BY payment_date)",
    level: "basic"
  },
  {
    question: "How do you calculate the running total of fee collections separately for each branch city?",
    shortAnswer: "`SELECT branch_city, payment_date, amount_paid_inr, SUM(amount_paid_inr) OVER (PARTITION BY branch_city ORDER BY payment_date) AS branch_running_total FROM fee_payments;`",
    explanation: "Resets the cumulative running total for each branch city.",
    hint: "SUM(amount) OVER (PARTITION BY branch_city ORDER BY payment_date)",
    level: "basic"
  },
  {
    question: "Can `PARTITION BY` reference expressions or functions (e.g. `PARTITION BY YEAR(payment_date)`)?",
    shortAnswer: "YES; partitioning by functional expressions like `YEAR(payment_date)` or `CASE` statements is fully supported.",
    explanation: "Expressions are evaluated before partition grouping.",
    hint: "Yes, expressions and functions are valid inside PARTITION BY.",
    level: "moderate"
  },
  {
    question: "Can `ORDER BY` inside `OVER()` reference expressions (e.g. `ORDER BY (marks_theory + marks_practical) DESC`)?",
    shortAnswer: "YES; any valid SQL expression can be used as a sorting expression inside `OVER()`.",
    explanation: "Supports calculated sorting keys.",
    hint: "Yes, calculated expressions are valid inside ORDER BY.",
    level: "basic"
  },
  {
    question: "What error is triggered if a named window references a non-existent window name?",
    shortAnswer: "`Error 3591 (HY000): Window 'w' is not defined.`",
    explanation: "Occurs when a window name is misspelled or undeclared.",
    hint: "Error 3591: Window is not defined.",
    level: "basic"
  },
  {
    question: "Where must the `WINDOW` clause be placed in the SQL statement hierarchy?",
    shortAnswer: "After the `HAVING` clause and before the final outer `ORDER BY`, `LIMIT`, and `FOR UPDATE` clauses.",
    explanation: "The standard clause positioning for WINDOW in MySQL 8.0.",
    hint: "After HAVING, before the final ORDER BY / LIMIT.",
    level: "expert"
  },
  {
    question: "How does the MySQL execution engine partition rows internally for Window Functions?",
    shortAnswer: "It sorts rows in memory by partition keys, evaluates window metrics sequentially within each partition, and flushes state when partition keys change.",
    explanation: "State resets on partition key transitions.",
    hint: "Sorts by partition key and evaluates sequentially, resetting state on key changes.",
    level: "expert"
  },
  {
    question: "What is the memory limit for in-memory window partition sorting in MySQL?",
    shortAnswer: "Bounded by `sort_buffer_size`; if partition sorting exceeds this buffer, MySQL creates on-disk temporary merge files.",
    explanation: "Proper sort_buffer_size sizing prevents disk sorting.",
    hint: "Controlled by sort_buffer_size; spills to disk if exceeded.",
    level: "expert"
  },
  {
    question: "Can a query combine Window Functions with both `GROUP BY` and `PARTITION BY` simultaneously?",
    shortAnswer: "YES; the `GROUP BY` executes first to produce aggregated summary rows, and the `OVER (PARTITION BY ...)` operates on those aggregated summary rows.",
    explanation: "Enables multi-tiered analytical processing.",
    hint: "Yes, GROUP BY aggregates base rows first, then Window Functions evaluate on grouped rows.",
    level: "expert"
  },
  {
    question: "What happens if a column inside `PARTITION BY` contains `NULL` values?",
    shortAnswer: "All `NULL` values are grouped together into a single distinct partition and evaluated as a valid partition group.",
    explanation: "Standard relational NULL partitioning behavior.",
    hint: "All NULL values are treated as belonging to a single partition group.",
    level: "moderate"
  },
  {
    question: "How do you calculate each student's rank within their department and their overall academy rank in the same query?",
    shortAnswer: "`SELECT student_name, exam_score_pct, DENSE_RANK() OVER (PARTITION BY dept_id ORDER BY exam_score_pct DESC) AS dept_rank, DENSE_RANK() OVER (ORDER BY exam_score_pct DESC) AS global_rank FROM students;`",
    explanation: "Combines a partitioned window with a global unpartitioned window.",
    hint: "Use DENSE_RANK() with PARTITION BY for dept rank and without PARTITION BY for global rank.",
    level: "moderate"
  },
  {
    question: "Can you modify a named window definition inside the `OVER` clause (e.g. `OVER (w ORDER BY date ASC)`)?",
    shortAnswer: "YES; if named window `w` specifies only `PARTITION BY`, you can append `ORDER BY` inside `OVER (w ORDER BY ...)`.",
    explanation: "Allows extending partial named window definitions.",
    hint: "Yes, you can extend a partition-only named window with an ORDER BY in OVER.",
    level: "expert"
  },
  {
    question: "Why should developers avoid writing duplicate `OVER (PARTITION BY dept_id ORDER BY score DESC)` across 5 different columns?",
    shortAnswer: "Because it creates code redundancy and makes schema updates error-prone; using a named window (`WINDOW w AS (...)`) improves maintainability and readability.",
    explanation: "Best practice for maintainable enterprise SQL.",
    hint: "Use the WINDOW clause to follow the DRY principle and improve maintainability.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for The OVER Clause (PARTITION BY and ORDER BY)?",
    shortAnswer: "Use `PARTITION BY` to define calculation boundaries that reset per group, understand that adding `ORDER BY` activates the cumulative running frame up to CURRENT ROW, use named `WINDOW` clauses to keep queries DRY, and index `(partition_col, order_col)` to eliminate filesort overhead.",
    explanation: "Authoritative architectural best practices for window specification design.",
    hint: "PARTITION BY sets boundaries + ORDER BY activates running frame + WINDOW clause for DRY + index partition and order columns.",
    level: "expert"
  }
];

export default questions;
