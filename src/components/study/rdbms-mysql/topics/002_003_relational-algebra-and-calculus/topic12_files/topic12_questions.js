// topic12_files/topic12_questions.js

const questions = [
  {
    question: "What is the Grouping and Aggregate Operator (𝒢 or γ) in Extended Relational Algebra?",
    shortAnswer: "A relational operator that partitions a relation into groups of tuples sharing identical values on grouping attributes and evaluates aggregate functions (COUNT, SUM, AVG, MIN, MAX) on each group.",
    explanation: "Core definition of the extended grouping and aggregate operator.",
    hint: "Operator that groups tuples and computes aggregate metrics per group.",
    level: "basic"
  },
  {
    question: "What is the general mathematical syntax of the Grouping Operator?",
    shortAnswer: "$${}_{G_1, G_2, \\dots, G_k} \\mathcal{G}_{F_1(A_1), F_2(A_2), \\dots, F_m(A_m)}(R)$$, where $G_i$ are grouping attributes and $F_j(A_j)$ are aggregate functions.",
    explanation: "Standard mathematical notation for grouping and aggregation.",
    hint: "_{G1..Gk} 𝒢_{F1(A1)..Fm(Am)}(R).",
    level: "basic"
  },
  {
    question: "What is Global Aggregation (Aggregation without grouping attributes) in Relational Algebra?",
    shortAnswer: "$$\\mathcal{G}_{F_1(A_1), \\dots, F_m(A_m)}(R)$$. It treats the entire relation as a single group, producing exactly ONE summary row.",
    explanation: "Global aggregation notation and semantics.",
    hint: "𝒢_{aggregates}(R) producing exactly 1 scalar summary row.",
    level: "basic"
  },
  {
    question: "What are the 5 standard aggregate functions supported in Relational Algebra and SQL?",
    shortAnswer: "1) `COUNT`, 2) `SUM`, 3) `AVG`, 4) `MIN`, and 5) `MAX`.",
    explanation: "The 5 core aggregate functions.",
    hint: "COUNT, SUM, AVG, MIN, MAX.",
    level: "basic"
  },
  {
    question: "What is the difference between `COUNT(*)` and `COUNT(attribute_name)`?",
    shortAnswer: "`COUNT(*)` counts all rows in the group regardless of contents; `COUNT(attribute_name)` counts only rows where `attribute_name` is NOT NULL.",
    explanation: "NULL counting behavior in SQL aggregates.",
    hint: "COUNT(*) counts all rows; COUNT(col) counts non-NULL values.",
    level: "basic"
  },
  {
    question: "How do `SUM()` and `AVG()` handle `NULL` values in SQL and Relational Algebra?",
    shortAnswer: "They completely ignore `NULL` values during calculation. If all values in a group are `NULL` (or the group is empty), `SUM()` and `AVG()` return `NULL`.",
    explanation: "NULL elimination in statistical aggregation.",
    hint: "They ignore NULL values; return NULL if no non-NULL values exist.",
    level: "basic"
  },
  {
    question: "How is SQL `HAVING` expressed in Relational Algebra?",
    shortAnswer: "As a Selection operator ($\\sigma$) applied on top of the Grouping operator ($\\mathcal{G}$): $$\\sigma_{\\text{aggregate\\_alias } > \\text{threshold}}({}_{G} \\mathcal{G}_{F(A) \→ \\text{aggregate\\_alias}}(R))$$.",
    explanation: "Relational algebra representation of SQL HAVING.",
    hint: "σ_{condition}(_{G} 𝒢_{F(A)}(R)).",
    level: "moderate"
  },
  {
    question: "What is the logical difference between `WHERE` and `HAVING` in SQL query execution?",
    shortAnswer: "`WHERE` filters raw individual rows BEFORE grouping and aggregation occurs; `HAVING` filters aggregated group summaries AFTER `GROUP BY` has completed.",
    explanation: "Query execution pipeline distinction between WHERE and HAVING.",
    hint: "WHERE filters rows before grouping; HAVING filters groups after aggregation.",
    level: "basic"
  },
  {
    question: "What is the MySQL `ONLY_FULL_GROUP_BY` SQL mode error (Error 1055)?",
    shortAnswer: "An error triggered when a query's `SELECT` list includes a column that is neither present in the `GROUP BY` clause nor wrapped in an aggregate function.",
    explanation: "Determinism enforcement in SQL grouping.",
    hint: "Error 1055: Selecting unaggregated columns not in the GROUP BY clause.",
    level: "moderate"
  },
  {
    question: "What is the degree (number of columns) of ${}_{G_1, \\dots, G_k} \\mathcal{G}_{F_1(A_1), \\dots, F_m(A_m)}(R)$?",
    shortAnswer: "$$k + m$$ (the sum of the number of grouping attributes $k$ and aggregate expressions $m$).",
    explanation: "Degree calculation of grouping operator.",
    hint: "k + m (grouping columns + aggregate columns).",
    level: "basic"
  },
  {
    question: "How do you calculate city-wise student count and total admission fee collected in Relational Algebra?",
    shortAnswer: "$${}_{\\text{city}} \\mathcal{G}_{\\text{COUNT}(*) \→ \\text{student\\_count}, \\text{SUM(fee)} \→ \\text{total\\_fee}}(\\text{Students})$$.",
    explanation: "City-wise multi-metric grouping.",
    hint: "_{city} 𝒢_{COUNT(*) → count, SUM(fee) → total}(Students).",
    level: "basic",
    codeExample: "SELECT city, COUNT(*) AS student_count, SUM(admission_fee) AS total_fee\nFROM students\nGROUP BY city;"
  },
  {
    question: "What is `COUNT(DISTINCT attribute)` and how is it noted in Extended Relational Algebra?",
    shortAnswer: "It counts unique non-NULL values within each group: $${}_{G} \\mathcal{G}_{\\text{COUNT-DISTINCT}(A) \→ \\text{unique\\_a}}(R)$$.",
    explanation: "Distinct value counting in grouping.",
    hint: "COUNT-DISTINCT(A).",
    level: "basic"
  },
  {
    question: "What happens if you execute `SELECT SUM(salary) FROM employees WHERE department = 'NonExistent'` on an empty result set?",
    shortAnswer: "`SUM()` returns `NULL`, while `COUNT(*)` returns `0`.",
    explanation: "Empty set aggregation contrast between SUM and COUNT.",
    hint: "SUM returns NULL; COUNT returns 0.",
    level: "moderate"
  },
  {
    question: "Why does `AVG(admission_fee)` produce a different result than `SUM(admission_fee) / COUNT(*)` if some fees are NULL?",
    shortAnswer: "Because `AVG()` divides by `COUNT(admission_fee)` (excluding NULLs), whereas `COUNT(*)` includes the NULL rows in the denominator, resulting in a lower average.",
    explanation: "NULL denominator bias in manual averages.",
    hint: "AVG divides by non-NULL count; COUNT(*) includes NULL rows in divisor.",
    level: "expert"
  },
  {
    question: "How do you filter for cities that have at least 2 enrolled students in SQL?",
    shortAnswer: "`SELECT city, COUNT(*) FROM students GROUP BY city HAVING COUNT(*) >= 2;`.",
    explanation: "HAVING threshold query in SQL.",
    hint: "GROUP BY city HAVING COUNT(*) >= 2.",
    level: "basic",
    codeExample: "SELECT city, COUNT(*) AS total_students\nFROM students\nGROUP BY city\nHAVING COUNT(*) >= 2;"
  },
  {
    question: "Can multiple grouping attributes be specified (e.g. grouping by `city` and `course_id`)?",
    shortAnswer: "Yes! Multi-attribute grouping partitions the relation into sub-groups sharing identical composite pairs: $${}_{\\text{city, course\\_id}} \\mathcal{G}_{\\text{COUNT}(*)}(\\text{Enrollments})$$.",
    explanation: "Composite multi-column grouping.",
    hint: "_{city, course_id} 𝒢_{COUNT(*)}(Enrollments).",
    level: "basic"
  },
  {
    question: "What is the maximum cardinality (number of rows) of ${}_{G_1, \\dots, G_k} \\mathcal{G}_{F}(R)$?",
    shortAnswer: "$$|R|$$ (when every single tuple in $R$ has a unique combination of grouping attributes).",
    explanation: "Maximum cardinality bound of grouping operator.",
    hint: "|R|.",
    level: "basic"
  },
  {
    question: "What is the minimum cardinality of ${}_{G_1, \\dots, G_k} \\mathcal{G}_{F}(R)$ if $|R| > 0$?",
    shortAnswer: "1 (when all tuples in $R$ share the exact same grouping attribute values).",
    explanation: "Minimum cardinality for non-empty relation.",
    hint: "1 row.",
    level: "basic"
  },
  {
    question: "What is the cardinality of Global Aggregation $\\mathcal{G}_{\\text{COUNT}(*)}(R)$ when relation $R$ is EMPTY ($|R| = 0$)?",
    shortAnswer: "Exactly 1 row (containing `COUNT(*) = 0`).",
    explanation: "Global aggregation on empty set returns 1 row with count 0.",
    hint: "Exactly 1 row with value 0.",
    level: "moderate"
  },
  {
    question: "What is the cardinality of Grouped Aggregation ${}_{G} \\mathcal{G}_{\\text{COUNT}(*)}(R)$ when relation $R$ is EMPTY ($|R| = 0$)?",
    shortAnswer: "0 rows (because there are zero groups to emit).",
    explanation: "Grouped aggregation on empty set returns 0 rows.",
    hint: "0 rows (no groups exist).",
    level: "expert"
  },
  {
    question: "How does the MySQL optimizer execute `GROUP BY` queries internally?",
    shortAnswer: "1) Loose Index Scan (if B-Tree index matches grouping prefix), 2) Tight Index Scan, or 3) In-Memory Temporary Hash Table aggregation.",
    explanation: "Physical execution engine algorithms for GROUP BY.",
    hint: "Loose index scan, Tight index scan, or Temporary hash table.",
    level: "expert"
  },
  {
    question: "Can an aggregate function be nested inside another aggregate function in standard SQL (e.g. `MAX(AVG(fee))` )?",
    shortAnswer: "NO! Nested aggregate functions are invalid in standard SQL; you must use a derived subquery or CTE to compute multi-level aggregations.",
    explanation: "SQL prohibition of nested aggregates.",
    hint: "No! Nested aggregates are illegal; use a subquery or CTE.",
    level: "moderate"
  },
  {
    question: "How do you find the city with the HIGHEST average admission fee in SQL?",
    shortAnswer: "`SELECT city, AVG(admission_fee) AS avg_fee FROM students GROUP BY city ORDER BY avg_fee DESC LIMIT 1;`.",
    explanation: "Top-1 grouped aggregate query.",
    hint: "GROUP BY city ORDER BY AVG(fee) DESC LIMIT 1.",
    level: "basic",
    codeExample: "SELECT city, AVG(admission_fee) AS avg_fee\nFROM students\nGROUP BY city\nORDER BY avg_fee DESC\nLIMIT 1;"
  },
  {
    question: "What is `GROUP_CONCAT()` in MySQL, and how does it relate to the Grouping operator?",
    shortAnswer: "A MySQL-specific string aggregation function that concatenates all string values within a group into a single comma-delimited string.",
    explanation: "MySQL string aggregation function.",
    hint: "Concatenates non-NULL strings within a group into a single list.",
    level: "moderate",
    codeExample: "SELECT city, GROUP_CONCAT(full_name ORDER BY full_name SEPARATOR ', ') AS student_list\nFROM students\nGROUP BY city;"
  },
  {
    question: "Does the Grouping operator preserve relational closure?",
    shortAnswer: "Yes! The output is always a relation where grouping columns and aggregated summary columns have well-defined domains and names.",
    explanation: "Relational closure preservation.",
    hint: "Yes, output is a valid relation.",
    level: "basic"
  },
  {
    question: "How do you express: 'Find departments where total salary expense exceeds ₹500,000' in Relational Algebra?",
    shortAnswer: "$$\\sigma_{\\text{total\\_sal } > 500000}({}_{\\text{dept\\_id}} \\mathcal{G}_{\\text{SUM(salary)} \→ \\text{total\\_sal}}(\\text{Employees}))$$.",
    explanation: "Selection over grouping aggregate.",
    hint: "σ_{total_sal > 500000}(_{dept_id} 𝒢_{SUM(salary) → total_sal}(Employees)).",
    level: "basic"
  },
  {
    question: "How does `GROUP BY NULL` behave in MySQL?",
    shortAnswer: "It computes global aggregates over the entire table without grouping, equivalent to omitting `GROUP BY` entirely.",
    explanation: "MySQL GROUP BY NULL behavior.",
    hint: "Treats the entire table as a single global group.",
    level: "expert"
  },
  {
    question: "Can the Selection operator be pushed below the Grouping operator: $\\sigma_{p}({}_{G} \\mathcal{G}_{F}(R))$?",
    shortAnswer: "Yes, IF predicate $p$ references ONLY grouping attributes in $G$. If $p$ references aggregate function outputs, it CANNOT be pushed down and must remain as a `HAVING` filter.",
    explanation: "Query optimization pushdown rule for grouping.",
    hint: "Can only be pushed down if predicate references grouping attributes only.",
    level: "expert"
  },
  {
    question: "What is the difference between SQL `ROLLUP` and standard `GROUP BY`?",
    shortAnswer: "`GROUP BY city WITH ROLLUP` calculates standard group aggregations plus super-aggregate sub-totals and a grand total row across the grouping hierarchy.",
    explanation: "SQL super-aggregate ROLLUP extension.",
    hint: "Adds hierarchical subtotals and grand totals to group summaries.",
    level: "moderate"
  },
  {
    question: "What is the master checklist for mastering Aggregate Functions & Grouping (𝒢)?",
    shortAnswer: "1) Use ${}_{G} \\mathcal{G}_{F(A)}(R)$ to partition and aggregate. 2) Remember `COUNT(*)` counts all rows; other aggregates ignore NULLs. 3) Apply `WHERE` for row filtering before grouping; `HAVING` for aggregate filtering after grouping. 4) Obey `ONLY_FULL_GROUP_BY` by never selecting unaggregated non-group columns. 5) Use composite indexes on grouping columns for fast execution.",
    explanation: "Following these 5 rules guarantees robust, deterministic aggregate query design.",
    hint: "Grouping syntax, NULL handling, WHERE vs HAVING, ONLY_FULL_GROUP_BY, Composite indexes.",
    level: "basic"
  }
];

export default questions;
