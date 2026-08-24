// topic2_files/topic2_questions.js

const questions = [
  {
    question: "What is a Multiple-Row Subquery?",
    shortAnswer: "An inner query that returns multiple rows of a single column (an $N \\times 1$ list of values).",
    explanation: "Because it returns a set of values, it requires multi-row operators like IN, NOT IN, ANY, or ALL.",
    hint: "Returns multiple rows of a single column (Nx1 value list).",
    level: "basic"
  },
  {
    question: "What does the `IN` operator do when used with a subquery?",
    shortAnswer: "It tests whether a value matches AT LEAST ONE element in the multi-row result set returned by the subquery.",
    explanation: "Equivalent to an OR chain of equality comparisons.",
    hint: "Evaluates to true if the value matches any item in the subquery list.",
    level: "basic"
  },
  {
    question: "What does `> ANY (subquery)` evaluate to in SQL?",
    shortAnswer: "It returns TRUE if the outer value is greater than the MINIMUM value in the subquery result set.",
    explanation: "If outer value > min_value, it is greater than at least one element.",
    hint: "Greater than the MINIMUM value of the subquery.",
    level: "basic"
  },
  {
    question: "What does `< ANY (subquery)` evaluate to in SQL?",
    shortAnswer: "It returns TRUE if the outer value is less than the MAXIMUM value in the subquery result set.",
    explanation: "If outer value < max_value, it is less than at least one element.",
    hint: "Less than the MAXIMUM value of the subquery.",
    level: "basic"
  },
  {
    question: "What is `= ANY (subquery)` exactly equivalent to?",
    shortAnswer: "`IN (subquery)`.",
    explanation: "Both operators check if the outer value matches any element in the list.",
    hint: "Exactly equivalent to IN (subquery).",
    level: "basic"
  },
  {
    question: "Is there any functional difference between `ANY` and `SOME` in MySQL?",
    shortAnswer: "NO; `ANY` and `SOME` are exact synonyms and behave identically in standard ANSI SQL and MySQL.",
    explanation: "Both keywords evaluate existential multi-row comparisons.",
    hint: "They are exact synonyms with identical behavior.",
    level: "basic"
  },
  {
    question: "What does `> ALL (subquery)` evaluate to in SQL?",
    shortAnswer: "It returns TRUE if the outer value is strictly greater than the MAXIMUM value in the subquery result set.",
    explanation: "Must exceed every single value in the returned set.",
    hint: "Greater than the MAXIMUM value of the subquery.",
    level: "basic"
  },
  {
    question: "What does `< ALL (subquery)` evaluate to in SQL?",
    shortAnswer: "It returns TRUE if the outer value is strictly less than the MINIMUM value in the subquery result set.",
    explanation: "Must be smaller than every single value in the returned set.",
    hint: "Less than the MINIMUM value of the subquery.",
    level: "basic"
  },
  {
    question: "What is `<> ALL (subquery)` exactly equivalent to?",
    shortAnswer: "`NOT IN (subquery)`.",
    explanation: "Both check that the outer value does not equal any value in the inner set.",
    hint: "Exactly equivalent to NOT IN (subquery).",
    level: "basic"
  },
  {
    question: "What is the deadly 'NOT IN with NULL' trap in SQL?",
    shortAnswer: "If the subquery returns even a single `NULL` value, `NOT IN` evaluates to `UNKNOWN` for all candidate rows, causing the outer query to return ZERO rows (empty set)!",
    explanation: "A classic SQL three-valued logic trap that causes silent data omission.",
    hint: "A single NULL in the subquery makes NOT IN evaluate to UNKNOWN, returning 0 rows.",
    level: "expert"
  },
  {
    question: "Why does `5 NOT IN (1, 2, NULL)` evaluate to `UNKNOWN`?",
    shortAnswer: "Because it expands to `(5 != 1) AND (5 != 2) AND (5 != NULL)` -> `TRUE AND TRUE AND UNKNOWN` -> `UNKNOWN`.",
    explanation: "In SQL, TRUE AND UNKNOWN evaluates to UNKNOWN (not TRUE).",
    hint: "AND chain with (5 != NULL) yields UNKNOWN.",
    level: "expert"
  },
  {
    question: "How do you defend against the 'NOT IN with NULL' trap in production queries?",
    shortAnswer: "1. Add `WHERE col IS NOT NULL` to the inner subquery, or 2. Rewrite using `NOT EXISTS`, which is completely immune to NULL poisoning.",
    explanation: "NOT EXISTS evaluates boolean row presence rather than three-valued scalar logic.",
    hint: "Add WHERE col IS NOT NULL or rewrite using NOT EXISTS.",
    level: "expert"
  },
  {
    question: "Does the `IN` operator suffer from the same NULL poisoning trap as `NOT IN`?",
    shortAnswer: "NO; `5 IN (1, 2, 5, NULL)` evaluates to `(5=1) OR (5=2) OR (5=5) OR (5=NULL)` -> `FALSE OR FALSE OR TRUE OR UNKNOWN` -> `TRUE`.",
    explanation: "Because OR with TRUE is always TRUE, matching rows are returned correctly.",
    hint: "No, because OR with TRUE yields TRUE.",
    level: "moderate"
  },
  {
    question: "How do you find all students whose tuition payment is greater than ANY student in the Kolkata branch?",
    shortAnswer: "`SELECT student_name, amount_paid_inr FROM students WHERE amount_paid_inr > ANY (SELECT amount_paid_inr FROM students WHERE branch_city = 'Kolkata');`",
    explanation: "Finds students whose payment exceeds the minimum Kolkata payment.",
    hint: "WHERE amount_paid_inr > ANY (SELECT amount_paid_inr FROM ...)",
    level: "basic"
  },
  {
    question: "How do you find all students whose tuition payment is greater than ALL students in the Kolkata branch?",
    shortAnswer: "`SELECT student_name, amount_paid_inr FROM students WHERE amount_paid_inr > ALL (SELECT amount_paid_inr FROM students WHERE branch_city = 'Kolkata');`",
    explanation: "Finds students whose payment exceeds the maximum Kolkata payment.",
    hint: "WHERE amount_paid_inr > ALL (SELECT amount_paid_inr FROM ...)",
    level: "basic"
  },
  {
    question: "What does MySQL do when optimizing an `IN (subquery)` predicate?",
    shortAnswer: "It transforms the subquery into a Semi-Join using Materialization (hash table lookup), FirstMatch, or LooseScan.",
    explanation: "Eliminates repeated subquery executions.",
    hint: "Converts to a Semi-Join with Materialization or FirstMatch.",
    level: "expert"
  },
  {
    question: "What is Semi-Join Materialization in MySQL 8.0+?",
    shortAnswer: "The query optimizer evaluates the inner subquery once, stores the distinct output in an in-memory hash table, and checks the outer rows against the hash table.",
    explanation: "Delivers fast $O(1)$ lookups per outer row.",
    hint: "Evaluates subquery once and creates an in-memory hash table for fast lookups.",
    level: "expert"
  },
  {
    question: "What happens if the subquery in `WHERE col > ALL (SELECT ...)` returns zero rows (`EMPTY SET`)?",
    shortAnswer: "It evaluates to `TRUE` for all outer rows (the condition is vacuously true).",
    explanation: "Because there are no values to violate the condition, all outer rows pass.",
    hint: "Evaluates to TRUE for all rows (vacuously true condition).",
    level: "expert"
  },
  {
    question: "What happens if the subquery in `WHERE col > ANY (SELECT ...)` returns zero rows (`EMPTY SET`)?",
    shortAnswer: "It evaluates to `FALSE` for all outer rows.",
    explanation: "Because no value exists to satisfy the condition, all outer rows fail.",
    hint: "Evaluates to FALSE for all rows.",
    level: "moderate"
  },
  {
    question: "How do you write a query to find all instructors who teach in 'Barrackpore' or 'Kolkata' using `IN`?",
    shortAnswer: "`SELECT instructor_name FROM instructors WHERE instructor_id IN (SELECT instructor_id FROM courses WHERE branch_city IN ('Barrackpore', 'Kolkata'));`",
    explanation: "Uses multi-row subquery with IN.",
    hint: "WHERE instructor_id IN (SELECT instructor_id FROM ...)",
    level: "basic"
  },
  {
    question: "How do student enrollments for Mamata, Susmita, Abhronila, and Debangshu illustrate `IN` vs `NOT IN`?",
    shortAnswer: "By finding students enrolled in active certification courses (`WHERE student_id IN (...)`) vs finding students who have zero active enrollments (`WHERE student_id NOT IN (...)`).",
    explanation: "Demonstrates relational inclusion and exclusion across student cohorts.",
    hint: "IN identifies enrolled students; NOT IN identifies students with zero enrollments.",
    level: "basic"
  },
  {
    question: "Can `IN` be used with composite row subqueries in MySQL?",
    shortAnswer: "YES; for example, `WHERE (branch_id, course_code) IN (SELECT branch_id, course_code FROM branch_offerings WHERE status = 'ACTIVE')`.",
    explanation: "Tuple matching with IN across multiple columns.",
    hint: "Yes, tuple matching like (colA, colB) IN (SELECT colA, colB ...).",
    level: "expert"
  },
  {
    question: "What is the performance advantage of `IN (subquery)` over a traditional `INNER JOIN` when duplicate keys exist in the inner table?",
    shortAnswer: "`IN (subquery)` prevents row multiplication because it acts as a semi-join, whereas an `INNER JOIN` duplicates outer rows for every matching inner row unless `DISTINCT` is added.",
    explanation: "Semi-joins eliminate the need for expensive DISTINCT post-processing.",
    hint: "Semi-join avoids row duplication caused by multiple matching inner rows.",
    level: "expert"
  },
  {
    question: "What is the LooseScan semi-join strategy in MySQL?",
    shortAnswer: "An optimization strategy where MySQL uses an index on the inner table to read only the first row for each distinct index value, skipping subsequent duplicate keys.",
    explanation: "Leverages index ordering to avoid duplicates.",
    hint: "Reads only the first matching index entry, skipping duplicate keys.",
    level: "expert"
  },
  {
    question: "How do you find all courses that have received zero student enrollments?",
    shortAnswer: "`SELECT course_title FROM courses WHERE course_id NOT IN (SELECT course_id FROM enrollments WHERE course_id IS NOT NULL);`",
    explanation: "Safe NOT IN anti-join filtering.",
    hint: "WHERE course_id NOT IN (SELECT course_id FROM enrollments WHERE course_id IS NOT NULL)",
    level: "basic"
  },
  {
    question: "What index is required to optimize `WHERE student_id IN (SELECT student_id FROM enrollments WHERE status = 'ACTIVE')`?",
    shortAnswer: "A secondary index on `enrollments (status, student_id)`.",
    explanation: "Enables index-only scans to generate the inner candidate list.",
    hint: "Composite index on enrollments(status, student_id).",
    level: "moderate"
  },
  {
    question: "Why should `SELECT *` never be used inside an `IN` subquery?",
    shortAnswer: "An `IN` subquery can only compare one column (or an explicit tuple of columns). Writing `IN (SELECT *)` causes Error 1241 (Operand should contain 1 column(s)).",
    explanation: "Subquery must project only the specific comparison column.",
    hint: "Causes Error 1241; must select only the matching column.",
    level: "basic"
  },
  {
    question: "Can `ANY` and `ALL` be used with subqueries in `HAVING` clauses?",
    shortAnswer: "YES; for example, `HAVING AVG(exam_score) > ALL (SELECT AVG(exam_score) FROM student_groups GROUP BY group_id)`.",
    explanation: "Enables comparative group-level filtering.",
    hint: "Yes, to filter aggregated groups against subquery sets.",
    level: "moderate"
  },
  {
    question: "What does `EXPLAIN` show for a query using Semi-Join Materialization?",
    shortAnswer: "`select_type = MATERIALIZED` and `table = <subquery1>` in the execution plan.",
    explanation: "Displays the materialization hash table lookup step.",
    hint: "Shows select_type = MATERIALIZED and table = <subqueryN>.",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for multiple-row subqueries?",
    shortAnswer: "Use `IN` and `ANY/ALL` for multi-row set matching, always guard `NOT IN` against NULL poisoning with `WHERE col IS NOT NULL` or `NOT EXISTS`, and rely on MySQL semi-join materialization for sub-millisecond execution.",
    explanation: "Authoritative best practices for multi-row subquery engineering.",
    hint: "Use IN/ANY/ALL + protect NOT IN from NULLs + utilize semi-join optimizations.",
    level: "expert"
  }
];

export default questions;
