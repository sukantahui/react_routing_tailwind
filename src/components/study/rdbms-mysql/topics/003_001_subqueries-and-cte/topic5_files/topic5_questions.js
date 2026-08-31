// topic5_files/topic5_questions.js

const questions = [
  {
    question: "What does the `EXISTS` operator test in SQL?",
    shortAnswer: "It tests whether a subquery returns at least ONE row (evaluates to TRUE if 1+ rows exist, FALSE if 0 rows exist).",
    explanation: "EXISTS is an existential boolean operator.",
    hint: "Evaluates to TRUE if the subquery returns 1 or more rows; FALSE if empty.",
    level: "basic"
  },
  {
    question: "What does `NOT EXISTS` test in SQL?",
    shortAnswer: "It tests whether a subquery returns ZERO rows (evaluates to TRUE if 0 rows exist, FALSE if 1+ rows exist).",
    explanation: "The inverse boolean condition of EXISTS.",
    hint: "Evaluates to TRUE only if the subquery returns an empty set (0 rows).",
    level: "basic"
  },
  {
    question: "How does `EXISTS` achieve superior performance over `COUNT(*) > 0`?",
    shortAnswer: "Through Short-Circuit Evaluation: MySQL stops scanning the inner table as soon as the FIRST matching row is found, whereas `COUNT(*)` must count every matching row.",
    explanation: "Eliminates redundant scanning once existence is proven.",
    hint: "Short-circuits immediately upon finding the first match.",
    level: "basic"
  },
  {
    question: "Why do developers commonly write `SELECT 1` inside an `EXISTS` subquery?",
    shortAnswer: "As a stylistic convention to emphasize that the projected column data is irrelevant; MySQL ignores the projection list and checks only row existence.",
    explanation: "SELECT 1, SELECT *, and SELECT 'X' produce identical execution plans.",
    hint: "Stylistic convention; MySQL ignores the projection list in EXISTS.",
    level: "basic"
  },
  {
    question: "Does `SELECT *` inside an `EXISTS (SELECT * FROM ...)` fetch all table columns from disk?",
    shortAnswer: "NO; the optimizer recognizes the `EXISTS` context and disregards the projection list entirely, fetching only index key pointers.",
    explanation: "Optimizer strips unused projected columns in EXISTS blocks.",
    hint: "No, the optimizer ignores the SELECT list and only verifies row existence.",
    level: "moderate"
  },
  {
    question: "Why is `NOT EXISTS` immune to the 'NOT IN with NULL' poisoning trap?",
    shortAnswer: "Because `NOT EXISTS` tests boolean row presence (`TRUE` or `FALSE`), completely bypassing three-valued scalar logic (`val != NULL` → `UNKNOWN`).",
    explanation: "A candidate row with NULL values is still a valid row, returning TRUE for EXISTS.",
    hint: "Tests row presence directly, avoiding SQL three-valued logic UNKNOWN evaluations.",
    level: "expert"
  },
  {
    question: "How do you find all students who have enrolled in at least one course using `EXISTS`?",
    shortAnswer: "`SELECT s.student_name FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id);`",
    explanation: "Correlated existence check on `e.student_id = s.student_id`.",
    hint: "WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id)",
    level: "basic"
  },
  {
    question: "How do you find all students who have ZERO course enrollments using `NOT EXISTS`?",
    shortAnswer: "`SELECT s.student_name FROM students s WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id);`",
    explanation: "Safe anti-join pattern finding students without enrollments.",
    hint: "WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id)",
    level: "basic"
  },
  {
    question: "What is an Anti-Join in relational databases?",
    shortAnswer: "A relational operation that returns rows from the left table that have NO matching counterpart in the right table (commonly implemented via `NOT EXISTS` or `LEFT JOIN ... WHERE right.id IS NULL`).",
    explanation: "Finds unmatched, orphan, or inactive parent records.",
    hint: "Finds records in the left table that have no matching records in the right table.",
    level: "basic"
  },
  {
    question: "When does `IN` outperform `EXISTS` in MySQL?",
    shortAnswer: "When the inner subquery result set is very small and static (e.g. 5 values), allowing MySQL to materialize it into a fast hash table.",
    explanation: "Small sets are ideal for in-memory hash materialization.",
    hint: "When the subquery returns a small, static set of values.",
    level: "moderate"
  },
  {
    question: "When does `EXISTS` outperform `IN` in MySQL?",
    shortAnswer: "When the outer table is large and the inner table has a selective index on the correlation column, enabling instant short-circuit seeks.",
    explanation: "Leverages index lookups and stops on the first match.",
    hint: "When the outer table is large and the inner table has an index on the join key.",
    level: "moderate"
  },
  {
    question: "What is Relational Division in SQL?",
    shortAnswer: "A relational algebra operation used to query entities associated with ALL elements of a specified set (e.g. 'Which students enrolled in ALL core courses?').",
    explanation: "Answers universal quantification queries in relational databases.",
    hint: "Queries entities that match all elements in a target set (universal quantification).",
    level: "expert"
  },
  {
    question: "How is Relational Division written in SQL using `NOT EXISTS`?",
    shortAnswer: "Using a double-nested `NOT EXISTS`: 'Find students for whom there does NOT exist a course where there does NOT exist an enrollment for that student.'",
    explanation: "Classic double-negation pattern for universal quantification.",
    hint: "Double-nested NOT EXISTS (there exists no course that the student did not enroll in).",
    level: "expert"
  },
  {
    question: "What index is required on `enrollments` to optimize `WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id)`?",
    shortAnswer: "A B-Tree index on `enrollments(student_id)`.",
    explanation: "Allows the engine to verify existence via an instant index seek.",
    hint: "Index on enrollments(student_id).",
    level: "basic"
  },
  {
    question: "What does `EXPLAIN` show for an `EXISTS` subquery transformed by MySQL's optimizer?",
    shortAnswer: "In MySQL 8.0+, it is often transformed into a Semi-Join with `FirstMatch` or `Materialize` strategy.",
    explanation: "Semi-join transformation avoids iterative dependent subquery loops.",
    hint: "Shows Semi-Join with FirstMatch or Materialize strategy in EXPLAIN.",
    level: "expert"
  },
  {
    question: "Can `EXISTS` be used with non-correlated subqueries?",
    shortAnswer: "YES; `WHERE EXISTS (SELECT 1 FROM table WHERE condition)` evaluates to a global boolean condition: if true, all outer rows pass; if false, all fail.",
    explanation: "Functions as a global execution gate condition.",
    hint: "Yes, acts as a global table-level boolean gate condition.",
    level: "moderate"
  },
  {
    question: "How do you find departments that have at least one student scoring above 95%?",
    shortAnswer: "`SELECT d.dept_name FROM departments d WHERE EXISTS (SELECT 1 FROM students s WHERE s.dept_id = d.dept_id AND s.exam_score_pct > 95.00);`",
    explanation: "Correlated existence check with extra filtering predicate.",
    hint: "WHERE EXISTS (SELECT 1 FROM students s WHERE s.dept_id = d.dept_id AND s.score > 95)",
    level: "basic"
  },
  {
    question: "How do you delete orphan payment records that have no valid parent enrollment record?",
    shortAnswer: "`DELETE FROM fee_payments p WHERE NOT EXISTS (SELECT 1 FROM enrollments e WHERE e.enrollment_id = p.enrollment_id);`",
    explanation: "Safe orphan record pruning with NOT EXISTS.",
    hint: "DELETE FROM fee_payments WHERE NOT EXISTS (SELECT 1 FROM enrollments ...)",
    level: "moderate"
  },
  {
    question: "How do student records for Mamata, Susmita, Abhronila, and Debangshu illustrate `EXISTS` vs `NOT EXISTS`?",
    shortAnswer: "Mamata, Susmita, and Abhronila have verified fee payments (`EXISTS`), while a newly admitted student with zero payments is identified using `NOT EXISTS`.",
    explanation: "Demonstrates active versus pending student billing lifecycle audits.",
    hint: "EXISTS identifies students with fee payments; NOT EXISTS identifies unpaid new admissions.",
    level: "basic"
  },
  {
    question: "What is the result of `WHERE EXISTS (SELECT NULL)`?",
    shortAnswer: "It evaluates to `TRUE` because the subquery returns 1 row containing `NULL`; `EXISTS` tests the presence of rows, not whether column values are non-null.",
    explanation: "A row containing NULL is still a row.",
    hint: "Evaluates to TRUE because a 1-row result set was returned.",
    level: "expert"
  },
  {
    question: "Why should `LEFT JOIN ... WHERE right.id IS NULL` and `NOT EXISTS` be compared in query profiling?",
    shortAnswer: "Both express anti-joins, but MySQL's optimizer may generate different join plans depending on index availability; testing both with `EXPLAIN` ensures maximum throughput.",
    explanation: "Both are valid anti-join patterns with slight optimizer variances.",
    hint: "Both perform anti-joins; compare their EXPLAIN plans to pick the fastest.",
    level: "moderate"
  },
  {
    question: "Can `EXISTS` be used in a `CASE` statement?",
    shortAnswer: "YES; for example, `CASE WHEN EXISTS (SELECT 1 FROM fee_payments p WHERE p.student_id = s.student_id) THEN 'Paid' ELSE 'Pending' END`.",
    explanation: "Enables conditional dynamic classification based on existence.",
    hint: "Yes, valid inside CASE WHEN EXISTS (...) THEN ... END.",
    level: "moderate"
  },
  {
    question: "How do you update student account statuses to 'Verified' only if they have made at least one fee payment?",
    shortAnswer: "`UPDATE students s SET s.status = 'VERIFIED' WHERE EXISTS (SELECT 1 FROM fee_payments p JOIN enrollments e ON p.enrollment_id = e.enrollment_id WHERE e.student_id = s.student_id);`",
    explanation: "Conditional DML update based on existence.",
    hint: "UPDATE students SET status = 'VERIFIED' WHERE EXISTS (...)",
    level: "moderate"
  },
  {
    question: "What is the FirstMatch optimization in semi-joins for `EXISTS`?",
    shortAnswer: "When executing the semi-join, MySQL scans the inner table and halts as soon as the first matching record is found, immediately returning control to the outer loop.",
    explanation: "The engine-level implementation of short-circuiting.",
    hint: "Halts scanning the inner table on the first matching record.",
    level: "expert"
  },
  {
    question: "Why does `NOT EXISTS` never return `UNKNOWN`?",
    shortAnswer: "Because either rows exist (evaluating to FALSE) or no rows exist (evaluating to TRUE); existence is strictly binary in relational theory.",
    explanation: "Eliminates SQL three-valued logic ambiguity.",
    hint: "Existence is strictly binary: either rows exist (FALSE) or do not (TRUE).",
    level: "basic"
  },
  {
    question: "Can an `EXISTS` subquery contain `GROUP BY` or `ORDER BY` clauses?",
    shortAnswer: "It is syntactically allowed, but considered an anti-pattern: `GROUP BY` and `ORDER BY` waste CPU cycles because `EXISTS` only cares about the presence of any single row.",
    explanation: "Omit grouping and sorting inside EXISTS for optimal speed.",
    hint: "Allowed but wasteful; omit GROUP BY and ORDER BY inside EXISTS.",
    level: "basic"
  },
  {
    question: "How do you find all branches that currently offer all available IT courses using Relational Division?",
    shortAnswer: "Using double `NOT EXISTS`: `SELECT b.branch_name FROM branches b WHERE NOT EXISTS (SELECT c.course_id FROM courses c WHERE c.dept = 'IT' AND NOT EXISTS (SELECT 1 FROM branch_offerings bo WHERE bo.branch_id = b.branch_id AND bo.course_id = c.course_id));`",
    explanation: "Classic relational division implementation.",
    hint: "Double-nested NOT EXISTS testing that no IT course is missing from the branch.",
    level: "expert"
  },
  {
    question: "What happens if the table inside an `EXISTS` subquery is completely empty?",
    shortAnswer: "`EXISTS` evaluates to `FALSE` for all outer rows, and `NOT EXISTS` evaluates to `TRUE` for all outer rows.",
    explanation: "Empty inner tables return 0 rows.",
    hint: "EXISTS is FALSE; NOT EXISTS is TRUE.",
    level: "basic"
  },
  {
    question: "What index is best for a correlated subquery: `WHERE EXISTS (SELECT 1 FROM t WHERE t.fk = o.pk AND t.status = 'ACTIVE')`?",
    shortAnswer: "A composite index on `t (fk, status)`.",
    explanation: "Allows index seek directly to active rows matching the outer key.",
    hint: "Composite index on (fk, status).",
    level: "moderate"
  },
  {
    question: "What is the senior architect's summary rule for EXISTS and NOT EXISTS?",
    shortAnswer: "Leverage `EXISTS` for fast short-circuiting presence checks on indexed foreign keys, always prefer `NOT EXISTS` over `NOT IN` to prevent NULL poisoning in anti-joins, and omit unnecessary `ORDER BY`/`GROUP BY` clauses inside `EXISTS` blocks.",
    explanation: "Authoritative architectural best practices for existential SQL operators.",
    hint: "Short-circuiting presence checks + NOT EXISTS for NULL-safe anti-joins + composite index.",
    level: "expert"
  }
];

export default questions;
