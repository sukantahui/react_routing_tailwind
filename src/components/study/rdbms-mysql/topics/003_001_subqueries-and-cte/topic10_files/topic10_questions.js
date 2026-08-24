// topic10_files/topic10_questions.js

const questions = [
  {
    question: "What is a Recursive Common Table Expression (CTE) in MySQL?",
    shortAnswer: "A CTE declared with `WITH RECURSIVE` that references its own intermediate output iteratively until a termination condition is met.",
    explanation: "Allows iterative data generation, graph traversal, and hierarchical tree processing in SQL.",
    hint: "A CTE declared with WITH RECURSIVE that references itself iteratively.",
    level: "basic"
  },
  {
    question: "Which keyword is mandatory when defining a recursive CTE in MySQL?",
    shortAnswer: "The `RECURSIVE` keyword: `WITH RECURSIVE cte_name AS (...)`.",
    explanation: "Required to signal the parser that self-referential queries are permitted.",
    hint: "The RECURSIVE keyword inside WITH RECURSIVE.",
    level: "basic"
  },
  {
    question: "What are the three essential anatomical components of a Recursive CTE?",
    shortAnswer: "1. Anchor Member (base case), 2. `UNION ALL` (or `UNION`), 3. Recursive Member with a Termination Condition.",
    explanation: "All three components are required for safe and valid recursion.",
    hint: "Anchor Member + UNION ALL + Recursive Member with Termination Condition.",
    level: "basic"
  },
  {
    question: "What is the role of the 'Anchor Member' in a recursive CTE?",
    shortAnswer: "It executes once during Iteration 0 to generate the initial starting result set (seed data) and determines output column types and data widths.",
    explanation: "Provides the base case for subsequent recursive iterations.",
    hint: "Executes once to provide initial seed data and establish column data types.",
    level: "basic"
  },
  {
    question: "What is the role of the 'Recursive Member' in a recursive CTE?",
    shortAnswer: "It is the query block that references the CTE name, evaluating iteratively on the rows produced by the PREVIOUS iteration only.",
    explanation: "Transforms intermediate rows step-by-step.",
    hint: "References the CTE name and transforms rows from the previous iteration.",
    level: "basic"
  },
  {
    question: "How does a Recursive CTE terminate gracefully?",
    shortAnswer: "When the Recursive Member's `WHERE` clause evaluates to false (producing an EMPTY SET / 0 rows), recursion halts automatically.",
    explanation: "Zero rows returned from an iteration ends the recursion loop.",
    hint: "Terminates when the recursive member produces an empty set (0 rows).",
    level: "basic"
  },
  {
    question: "What is the default maximum recursion depth in MySQL 8.0?",
    shortAnswer: "`1000` iterations (controlled by `cte_max_recursion_depth`).",
    explanation: "A safety limit to prevent runaway infinite recursion loops.",
    hint: "Default is 1000 iterations.",
    level: "basic"
  },
  {
    question: "What error is triggered if a recursive CTE exceeds `cte_max_recursion_depth`?",
    shortAnswer: "`Error 3636 (HY000): Recursive query aborted after 1001 iterations. Try increasing @@cte_max_recursion_depth to a larger value.`",
    explanation: "MySQL terminates runaway queries automatically.",
    hint: "Error 3636: Recursive query aborted after max iterations.",
    level: "moderate"
  },
  {
    question: "How do you increase the recursion depth limit for a specific database session?",
    shortAnswer: "`SET SESSION cte_max_recursion_depth = 10000;`",
    explanation: "Temporarily raises the iteration ceiling for large datasets.",
    hint: "SET SESSION cte_max_recursion_depth = N;",
    level: "moderate"
  },
  {
    question: "How do you set the recursion depth limit at the individual query level using an optimizer hint?",
    shortAnswer: "`SELECT /*+ SET_VAR(cte_max_recursion_depth = 5000) */ * FROM cte_name;`",
    explanation: "Scoped strictly to that single query without altering session variables.",
    hint: "Optimizer hint /*+ SET_VAR(cte_max_recursion_depth = N) */.",
    level: "expert"
  },
  {
    question: "Why is `UNION ALL` strongly preferred over `UNION` in recursive CTEs?",
    shortAnswer: "`UNION` performs an internal sort and deduplication on every iteration, adding massive CPU and memory overhead; `UNION ALL` concatenates intermediate streams directly.",
    explanation: "UNION ALL is significantly faster for sequence and hierarchy generation.",
    hint: "UNION ALL avoids expensive per-iteration sorting and deduplication.",
    level: "expert"
  },
  {
    question: "How does the MySQL internal execution engine maintain state during recursive CTE execution?",
    shortAnswer: "Using a temporary 'Working Table' that holds rows from the current iteration, and an 'Accumulator Table' that stores all accumulated output rows.",
    explanation: "The Working Table is emptied and repopulated on each iteration.",
    hint: "Working Table (current iteration) and Accumulator Table (total results).",
    level: "expert"
  },
  {
    question: "How do you generate an integer sequence from 1 to 100 using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE Nums AS (SELECT 1 AS n UNION ALL SELECT n + 1 FROM Nums WHERE n < 100) SELECT n FROM Nums;`",
    explanation: "Classic integer sequence generator.",
    hint: "Anchor: SELECT 1; Recursive: SELECT n + 1 WHERE n < 100.",
    level: "basic"
  },
  {
    question: "Why must you use `CAST()` on string columns in the Anchor Member of a recursive CTE?",
    shortAnswer: "Because the Anchor Member's column data type and string length fix the schema definition; if subsequent iterations produce longer strings without casting, string truncation occurs.",
    explanation: "E.g. `CAST('Root' AS CHAR(255))` accommodates expanding hierarchy paths.",
    hint: "Anchor column width fixes schema; CAST prevents string truncation downstream.",
    level: "expert"
  },
  {
    question: "Can a recursive member in a CTE contain aggregate functions like `SUM()` or `COUNT()` directly?",
    shortAnswer: "NO; SQL standard disallows aggregate functions (`SUM`, `AVG`, `MAX`), `GROUP BY`, and `ORDER BY` directly inside the recursive member query block.",
    explanation: "Recursive members must evaluate row-by-row transformations.",
    hint: "No, aggregate functions and GROUP BY are disallowed in recursive members.",
    level: "expert"
  },
  {
    question: "How do student cohorts for Mamata, Susmita, Abhronila, and Debangshu illustrate recursive CTE date generation?",
    shortAnswer: "By generating a continuous sequence of 30 consecutive academy exam calendar dates (`2026-09-01` to `2026-09-30`) and performing a `LEFT JOIN` against student attendance logs to detect missing dates.",
    explanation: "Generates continuous time-series calendar grids to find attendance gaps.",
    hint: "Generates continuous calendar date sequences to find missing student logs.",
    level: "basic"
  },
  {
    question: "How do you generate a series of dates for the month of September 2026 using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE Calendar AS (SELECT DATE('2026-09-01') AS dt UNION ALL SELECT DATE_ADD(dt, INTERVAL 1 DAY) FROM Calendar WHERE dt < '2026-09-30') SELECT dt FROM Calendar;`",
    explanation: "Date arithmetic in the recursive member.",
    hint: "Anchor: SELECT '2026-09-01'; Recursive: DATE_ADD(dt, INTERVAL 1 DAY) WHERE dt < '2026-09-30'.",
    level: "basic"
  },
  {
    question: "What happens if you accidentally write `WHERE n > 0` instead of `WHERE n < 100` in a number generator?",
    shortAnswer: "The termination condition is never satisfied, resulting in runaway infinite recursion until halted by `cte_max_recursion_depth` with Error 3636.",
    explanation: "Runaway recursion loop stopped by engine safeguards.",
    hint: "Causes infinite recursion until killed by cte_max_recursion_depth with Error 3636.",
    level: "basic"
  },
  {
    question: "Can a query declare both recursive and non-recursive CTEs under a single `WITH RECURSIVE` clause?",
    shortAnswer: "YES; writing `WITH RECURSIVE` allows you to declare any combination of recursive and non-recursive CTEs separated by commas.",
    explanation: "The RECURSIVE keyword enables recursion globally for the WITH block.",
    hint: "Yes, WITH RECURSIVE permits mixing recursive and non-recursive CTEs.",
    level: "moderate"
  },
  {
    question: "Can a recursive member reference the CTE more than once in the same query (e.g. self-joining the CTE inside its recursive member)?",
    shortAnswer: "NO; the recursive member can reference the CTE at most ONCE in its `FROM` clause (linear recursion only; non-linear recursion is not supported in MySQL).",
    explanation: "MySQL strictly supports linear recursive CTEs.",
    hint: "No, the CTE can only be referenced once in the recursive member.",
    level: "expert"
  },
  {
    question: "How do you calculate exponential powers of 2 ($2^0, 2^1, 2^2, 2^3 \\dots$) using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE PowersOfTwo AS (SELECT 1 AS val, 0 AS exp UNION ALL SELECT val * 2, exp + 1 FROM PowersOfTwo WHERE exp < 10) SELECT exp, val FROM PowersOfTwo;`",
    explanation: "Geometric progression generation.",
    hint: "Anchor: 1, 0; Recursive: val * 2, exp + 1 WHERE exp < 10.",
    level: "basic"
  },
  {
    question: "What is the difference between a Recursive Stored Procedure and a Recursive CTE?",
    shortAnswer: "A Recursive CTE generates a single declarative tabular result set in-memory in one SQL statement; a recursive stored procedure executes multiple procedural transactions and calls.",
    explanation: "CTEs are declarative set-based constructs.",
    hint: "CTE is declarative single-statement in-memory set; procedure is procedural routine.",
    level: "moderate"
  },
  {
    question: "What system variable limits the overall execution time of a runaway recursive query?",
    shortAnswer: "`max_execution_time` (measured in milliseconds).",
    explanation: "Kills queries that exceed the execution time threshold.",
    hint: "max_execution_time system variable.",
    level: "moderate"
  },
  {
    question: "Can a recursive CTE generate Fibonacci numbers?",
    shortAnswer: "`WITH RECURSIVE Fib (n, a, b) AS (SELECT 1, 0, 1 UNION ALL SELECT n + 1, b, a + b FROM Fib WHERE n < 15) SELECT n, a AS fibonacci_number FROM Fib;`",
    explanation: "Classic two-variable state accumulation in recursive CTEs.",
    hint: "Track pair (a, b) and compute next state (b, a + b).",
    level: "expert"
  },
  {
    question: "Can you use a recursive CTE in an `UPDATE` statement in MySQL 8.0?",
    shortAnswer: "YES; `WITH RECURSIVE Hierarchy AS (...) UPDATE employees e JOIN Hierarchy h ON e.id = h.id SET e.org_level = h.lvl;`",
    explanation: "Recursive CTEs can be joined in multi-table UPDATEs.",
    hint: "Yes, recursive CTEs can precede multi-table UPDATE statements.",
    level: "expert"
  },
  {
    question: "What is the maximum allowed value for `cte_max_recursion_depth`?",
    shortAnswer: "`4,294,967,295` (unsigned 32-bit integer maximum).",
    explanation: "Allows deep graph traversals when required.",
    hint: "Maximum is 4,294,967,295 iterations.",
    level: "expert"
  },
  {
    question: "What does `EXPLAIN` show for a recursive CTE in MySQL 8.0?",
    shortAnswer: "`select_type = RECURSIVE UNION` for the recursive member and `select_type = PRIMARY` or `DERIVED` for the overall query.",
    explanation: "Identifies the recursive evaluation operator in the plan.",
    hint: "Shows select_type = RECURSIVE UNION in EXPLAIN output.",
    level: "moderate"
  },
  {
    question: "How do you generate alphabetical letter sequences ('A' to 'Z') using a recursive CTE?",
    shortAnswer: "`WITH RECURSIVE Alphabet AS (SELECT 65 AS ascii_code, 'A' AS letter UNION ALL SELECT ascii_code + 1, CHAR(ascii_code + 1) FROM Alphabet WHERE ascii_code < 90) SELECT letter FROM Alphabet;`",
    explanation: "Character sequence generation via ASCII code increments.",
    hint: "Anchor: 65 ('A'); Recursive: ascii_code + 1 WHERE ascii_code < 90.",
    level: "basic"
  },
  {
    question: "Why should developers always test recursive CTE termination conditions on small limits first?",
    shortAnswer: "To prevent accidental runaway iterations, lock contention, or server RAM exhaustion before running at production scale.",
    explanation: "Defensive engineering practice for iterative queries.",
    hint: "Test on small limits first to verify termination condition works properly.",
    level: "basic"
  },
  {
    question: "What is the senior architect's summary rule for Recursive CTEs?",
    shortAnswer: "Structure with a solid Anchor base case, connect with `UNION ALL`, enforce a bulletproof `WHERE` termination condition in the Recursive Member, cast expanding columns in the Anchor, and rely on `cte_max_recursion_depth` safeguards.",
    explanation: "Authoritative architectural best practices for recursive SQL engineering.",
    hint: "Anchor base + UNION ALL + bulletproof termination condition + cast columns in anchor.",
    level: "expert"
  }
];

export default questions;
